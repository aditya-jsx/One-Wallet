import { registerWallet } from '@wallet-standard/core';
import { OneWalletStandard } from './wallet.ts';

console.log("OneWallet: inpage script starting");
try {
  const oneWallet = new OneWalletStandard();
  registerWallet(oneWallet);
  // @ts-ignore
  window.solana = oneWallet;
  console.log("OneWallet: Wallet registered successfully");
} catch(e) {
  console.error("OneWallet: Error registering wallet", e);
}