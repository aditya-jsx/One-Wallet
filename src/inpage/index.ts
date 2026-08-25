import { registerWallet } from '@wallet-standard/core';
import { OneWalletStandard } from './wallet';

console.log("OneWallet: inpage script starting");
try {
  const oneWallet = new OneWalletStandard();
  registerWallet(oneWallet);
  (window as any).solana = oneWallet;
  console.log("OneWallet: Wallet registered successfully");
} catch(e) {
  console.error("OneWallet: Error registering wallet", e);
}