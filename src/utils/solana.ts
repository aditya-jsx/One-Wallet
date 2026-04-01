import * as bip39 from "bip39";

export const generateMnemonic = () => {
    return bip39.generateMnemonic();
}