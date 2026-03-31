import * as bip39 from "bip39";

export const mnemonic = bip39.generateMnemonic();
console.log(mnemonic);
