// Helper to convert string to ArrayBuffer
const enc = new TextEncoder();
const dec = new TextDecoder();

// Derive a strong key from the user's password using PBKDF2
const getPasswordKey = async (password: string, salt: Uint8Array) => {
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};

// Encrypt the Mnemonic
export const encryptVault = async (mnemonic: string, password: string) => {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await getPasswordKey(password, salt);

  const encryptedContent = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    enc.encode(mnemonic)
  );

  // Return base64 encoded strings to easily store in chrome.storage.local
  return {
    encryptedData: btoa(String.fromCharCode(...new Uint8Array(encryptedContent))),
    salt: btoa(String.fromCharCode(...salt)),
    iv: btoa(String.fromCharCode(...iv)),
  };
};

// Decrypt the Mnemonic
export const decryptVault = async (encryptedBase64: string, password: string, saltBase64: string, ivBase64: string) => {
  try {
    const encryptedData = new Uint8Array(atob(encryptedBase64).split("").map((c) => c.charCodeAt(0)));
    const salt = new Uint8Array(atob(saltBase64).split("").map((c) => c.charCodeAt(0)));
    const iv = new Uint8Array(atob(ivBase64).split("").map((c) => c.charCodeAt(0)));

    const key = await getPasswordKey(password, salt);
    
    const decryptedContent = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      key,
      encryptedData
    );

    return dec.decode(decryptedContent);
  } catch (error) {
    throw new Error("Invalid password");
  }
};