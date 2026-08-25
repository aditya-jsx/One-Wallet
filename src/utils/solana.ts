import { 
  Connection, 
  PublicKey, 
  ComputeBudgetProgram,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction} from "@solana/web3.js";

import * as bip39 from "bip39";
import { decryptVault } from "./crypto";
import { derivePath } from "ed25519-hd-key";

export const shortenKey = (publicKey: string) => {
  const short = `${publicKey.slice(0,4)}...${publicKey.slice(-4)}`;
  return short;
}

export const generateMnemonic = () => {
    return bip39.generateMnemonic();
}

export const validateAddress = (address: string) => {
    try{
        new PublicKey(address);
        return true;
    }
    catch(e){
        return false;
    }
}

export const getBalance = async (publicKey: string, rpcURL: string) => {
    try {
      const connection = new Connection(rpcURL, "confirmed");
      const pubKeyObj = new PublicKey(publicKey);
      const lamports = await connection.getBalance(pubKeyObj);
      const balance = lamports / 1e9;
      console.log(balance)
      return balance;
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
}

export const getPublicKey = async () => {
  let activeKey = "EJj7PyVa15YxwyHFxjsFXkhVypoJy7QBg6Y6vT9RhKBi";
  if (typeof chrome !== 'undefined' && chrome.storage) {
    const res: any = await chrome.storage.local.get(["one_wallet_data", "publicKey"]);
    if (res.publicKey) {
        activeKey = res.publicKey;
    }
  }else{
    activeKey = "EJj7PyVa15YxwyHFxjsFXkhVypoJy7QBg6Y6vT9RhKBi";
  }
  return activeKey;
}

export const checkIfBalanceIsEnough = async (balance: number, receipientAddress: PublicKey, sendingAmount: number, rpcUrl: string) => {

    let activeKey = new PublicKey("EJj7PyVa15YxwyHFxjsFXkhVypoJy7QBg6Y6vT9RhKBi");
    if (typeof chrome !== 'undefined' && chrome.storage) {
      const res: any = await chrome.storage.local.get(["one_wallet_data", "publicKey"]);
      if (res.publicKey) {
          activeKey = new PublicKey(res.publicKey);
      }
    }

    const userBalance = balance * LAMPORTS_PER_SOL;
    const amountToBeSent = Math.floor(sendingAmount * LAMPORTS_PER_SOL);
    const fee = await calculateTransactionFee(activeKey, receipientAddress, amountToBeSent, rpcUrl);

    let requiredAmount = fee + amountToBeSent;
    let isEnough = false;
    if(userBalance >= requiredAmount){
        isEnough = true;
        return {fee, isEnough};
    }
    return {fee, isEnough}
}


const calculateTransactionFee = async (senderKey: PublicKey, receiverKey: PublicKey, amount: number, rpcURL: string) => {

    const connection = new Connection(rpcURL, "confirmed");
    const { blockhash } = await connection.getLatestBlockhash();

    const sender = senderKey;
    const recipient = receiverKey;

    // transfer instruction
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: recipient,
      lamports: amount
    });

    // simulation instructions with placeholder compute unit limit
    const simulationInstructions = [
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 1_400_000 // High value for simulation
      }),
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1n
      }),
      transferInstruction
    ];

    // Create transaction for simulation
    const simulationTransaction = new VersionedTransaction(
      new TransactionMessage({
        instructions: simulationInstructions,
        payerKey: sender,
        recentBlockhash: blockhash
      }).compileToV0Message()
    );

    // Simulate transaction to get compute unit estimate
    const simulationResponse = await connection.simulateTransaction(
      simulationTransaction
    );

    const estimatedUnits = simulationResponse.value.unitsConsumed;
    console.log(`Estimated compute units: ${estimatedUnits}`);

    // Create final transaction with compute budget instructions
    const computeUnitLimitInstruction = ComputeBudgetProgram.setComputeUnitLimit({
      units: estimatedUnits!
    });

    const computeUnitPriceInstruction = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: 1n
    });

    // Build transaction with all instructions
    const messageV0 = new TransactionMessage({
      payerKey: sender,
      recentBlockhash: blockhash,
      instructions: [
        computeUnitPriceInstruction,
        computeUnitLimitInstruction,
        transferInstruction
      ]
    }).compileToV0Message();

    // Calculate fee
    try{
        const fees = await connection.getFeeForMessage(messageV0);
    
        if(!fees || fees.value === null){
            return 5000; 
        }
    
        return fees.value;
    }catch(e){
        return 5000;
    }
}

const getMnemonic = async (password: string) => {
  if (typeof chrome !== 'undefined' && chrome.storage) {
      const res: any = await chrome.storage.local.get(["one_wallet_data"]);
      const { vault } = res.one_wallet_data;

      const { encryptedData, salt, iv } = vault;

      const mnemonic = await decryptVault(encryptedData, password, salt, iv)

      const seed = bip39.mnemonicToSeedSync(mnemonic);

      const derivationPath = "m/44'/501'/0'/0'";
      const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
      const keypair = Keypair.fromSeed(derivedSeed);

      return keypair;
  }

  throw new Error("No wallet data found in storage");
}

export const sendSol = async (receiverKey: PublicKey, amount: number, rpcURL: string, password: string) => {

    const connection = new Connection(rpcURL, "confirmed");
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    const lamports = Math.floor(amount * LAMPORTS_PER_SOL);

    const keyPair = await getMnemonic(password);

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: keyPair.publicKey,
      toPubkey: receiverKey,
      lamports: lamports,
    });

    const messageV0 = new TransactionMessage({
      payerKey: keyPair.publicKey,
      recentBlockhash: blockhash,
      instructions: [transferInstruction],
    }).compileToV0Message();

    const transaction = new VersionedTransaction(messageV0);

    transaction.sign([keyPair]);

    const signature = await connection.sendTransaction(transaction);

    await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight
    });

    return signature;

}