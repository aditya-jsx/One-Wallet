import { 
  Connection, 
  PublicKey, 
  ComputeBudgetProgram,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction, 
  Transaction,
  sendAndConfirmTransaction} from "@solana/web3.js";

import * as bip39 from "bip39";
import { decryptVault } from "./crypto";
import { derivePath } from "ed25519-hd-key";

const RPC_URL = import.meta.env.VITE_RPC_URL || "https://api.devnet.solana.com";
const connection = new Connection(RPC_URL, "confirmed");

export const generateMnemonic = () => {
    return bip39.generateMnemonic();
}

export const validateAddress = (address: string) => {
    try{
        const key = new PublicKey(address);
        return true;
    }
    catch(e){
        return false;
    }
}

export const getBalance = async (publicKey: string) => {
    try {
      const connection = new Connection(RPC_URL, "confirmed");
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
    const res = await chrome.storage.local.get(["one_wallet_data", "publicKey"]);
    if (res.publicKey) {
        activeKey = res.publicKey;
    }
  }else{
    activeKey = "EJj7PyVa15YxwyHFxjsFXkhVypoJy7QBg6Y6vT9RhKBi";
  }
  return activeKey;
}

export const checkIfBalanceIsEnough = async (balance: number, receipientAddress: PublicKey, sendingAmount: number) => {

    let activeKey = new PublicKey("EJj7PyVa15YxwyHFxjsFXkhVypoJy7QBg6Y6vT9RhKBi");
    if (typeof chrome !== 'undefined' && chrome.storage) {
      const res = await chrome.storage.local.get(["one_wallet_data", "publicKey"]);
      if (res.publicKey) {
          activeKey = new PublicKey(res.publicKey);
      }
    }

    const userBalance = balance * LAMPORTS_PER_SOL;
    const amountToBeSent = sendingAmount * LAMPORTS_PER_SOL;
    const fee = await calculateTransactionFee(activeKey, receipientAddress, amountToBeSent);

    let requiredAmount = fee + amountToBeSent;
    let isEnough = false;
    if(userBalance >= requiredAmount){
        isEnough = true;
        return {fee, isEnough};
    }
    return {fee, isEnough}
}


const calculateTransactionFee = async (senderKey: PublicKey, receiverKey: PublicKey, amount: number) => {

    const { blockhash } = await connection.getLatestBlockhash();

    const sender = senderKey;
    const recipient = receiverKey;
    // console.log(`Created sender account: ${sender.publicKey.toString()}`);
    // console.log(`Created recipient account: ${recipient.publicKey.toString()}`);

    // // Request and confirm airdrop
    // const airdropSignature = await connection.requestAirdrop(
    //   sender.publicKey,
    //   LAMPORTS_PER_SOL
    // );

    // await connection.confirmTransaction({
    //   signature: airdropSignature,
    //   blockhash,
    //   lastValidBlockHeight
    // });

    // Create a transfer instruction
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: recipient,
      lamports: amount
    });

    // Create simulation instructions with placeholder compute unit limit
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
    
        if(fees.value === null){
            return 5000; 
        }
        // console.log(`Transaction fee: ${fees.value} lamports`);
    
        return fees.value;
    }catch(e){
        return 5000;
    }
}

const getMnemonic = async () => {
  if (typeof chrome !== 'undefined' && chrome.storage) {
      const res = await chrome.storage.local.get(["one_wallet_data"]);
      const { username, vault, isInitialized } = res.one_wallet_data;

      const { encryptedData, salt, iv } = vault;

      // for development
      const password = "Aditya@3003"

      const mnemonic = await decryptVault(encryptedData, password, salt, iv)

      const seed = bip39.mnemonicToSeedSync(mnemonic);

      const derivationPath = "m/44'/501'/0'/0'";
      const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
      const keypair = Keypair.fromSeed(derivedSeed);

      return keypair;
  }

  return "not found"
}

export const sendSol = async (receiverKey: PublicKey, amount: number) => {
    const { blockhash } = await connection.getLatestBlockhash();
    const user = await getPublicKey();
    const userKey = new PublicKey(user);
    const lamports = amount * LAMPORTS_PER_SOL;

    const keyPair = await getMnemonic();


    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: userKey,
        toPubkey: receiverKey,
        lamports: lamports
      })
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transferTransaction,
      [keyPair]
  );
}