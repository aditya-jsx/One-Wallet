chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.target !== 'one-wallet-content') return false;

    (async () => {
        try {
            switch (message.method) {
                case 'connect': {
                    const data: any = await chrome.storage.local.get(["publicKey"]);
                    if (data.publicKey) {
                        sendResponse({ result: { publicKey: data.publicKey } });
                    } else {
                        sendResponse({ error: "Wallet not initialized or unlocked" });
                    }
                    break;
                }
                case 'signAndSendTransaction': {
                    sendResponse({ error: "Not implemented in background script yet" });
                    break;
                }
                case 'signTransaction': {
                    sendResponse({ error: "Not implemented in background script yet" });
                    break;
                }
                case 'signMessage': {
                    sendResponse({ error: "Not implemented in background script yet" });
                    break;
                }
                default: {
                    sendResponse({ error: `Unknown method: ${message.method}` });
                    break;
                }
            }
        } catch (error: any) {
            sendResponse({ error: error.message });
        }
    })();

    return true;
});
