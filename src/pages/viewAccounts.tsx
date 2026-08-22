import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { useWalletSetup } from "../context/walletContext";
import { Keypair, PublicKey } from "@solana/web3.js";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import { getBalance, shortenKey } from "../utils/solana";
import { useNetwork } from "../context/networkContext";

const ViewAccounts = () => {
    const navigate = useNavigate();
    const [isSelected, setIsSelected] = useState(true);
    const {setupData} = useWalletSetup();
    const [publicKey, setPublicKey] = useState<string>();
    const rpcUrl = useNetwork();
    const [userBalance, setUserBalance] = useState<string>();

    useEffect(() => {
        fetchPubKeyAndBalance();
    }, [setupData.mnemonic])

    const fetchPubKeyAndBalance = async () => {
        if(setupData.mnemonic){            
            const seed = bip39.mnemonicToSeedSync(setupData.mnemonic, "");
            const path = "m/44'/501'/0'/0'";
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            
            const keypair = Keypair.fromSeed(derivedSeed);
            const pubKey = new PublicKey(keypair.publicKey);
            const shortKey = shortenKey(pubKey.toBase58());
            setPublicKey(shortKey);
            const balance = await getBalance(pubKey.toBase58(), rpcUrl.rpcUrl)
            setUserBalance(balance.toString());
        }
    }

    const toggleSelection = () => {
        setIsSelected(!isSelected);
    };

    

    return (
        <div className="h-[545px] w-[405px] bg-[#0a0a0a] flex flex-col items-center text-white rounded-2xl px-4 py-3 shadow-2xl relative">
            {/* Top Navigation */}
            <div className="flex items-center justify-between w-full mb-8">
                <button 
                    onClick={() => navigate(-1)} 
                    className="p-1 -ml-1 text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#a68aee]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#a68aee]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#a68aee]"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                </div>
                <div className="w-5 h-5 p-1 -mr-1"></div> {/* Spacer to balance flex-between */}
            </div>

            {/* Header */}
            <div className="flex flex-col items-center text-center px-2 mb-6">
                <h1 className="text-[22px] font-semibold mb-2">
                    Import Accounts
                </h1>
                <p className="text-[17px] text-zinc-300">
                    We found 1 account with activity
                </p>
            </div>

            {/* Main Content */}
            <div className="flex flex-col w-full gap-4">
                
                {/* Select All Box */}
                <div 
                    onClick={toggleSelection}
                    className="bg-[#1c1c1e] rounded-[14px] p-4 flex justify-between items-center cursor-pointer hover:bg-[#2c2c2e] transition-colors"
                >
                    <span className="font-semibold text-[15px] text-white">
                        {isSelected ? 1 : 0} accounts selected
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="text-[15px] text-zinc-300">Select All</span>
                        <div className={`flex items-center justify-center w-5 h-5 rounded-[6px] transition-colors ${isSelected ? 'bg-[#a68aee]' : 'border-2 border-zinc-500'}`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-black" strokeWidth={4} />}
                        </div>
                    </div>
                </div>

                {/* Account Details Box */}
                <div 
                    onClick={toggleSelection}
                    className="bg-[#1c1c1e] rounded-[14px] overflow-hidden flex flex-col cursor-pointer hover:bg-[#222224] transition-colors"
                >
                    <div className="p-4 flex justify-between items-center border-b border-zinc-800/80">
                        <span className="font-semibold text-[15px] text-white">Account 1</span>
                        <div className={`flex items-center justify-center w-5 h-5 rounded-[6px] transition-colors ${isSelected ? 'bg-[#a68aee]' : 'border-2 border-zinc-500'}`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-black" strokeWidth={4} />}
                        </div>
                    </div>
                    
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-[10px]">
                                {/* Solana Logo approximation */}
                                <svg width="20" height="18" viewBox="0 0 397 311" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" fill="black"/>
                                    <path d="M64.6 3.8C67 1.4 70.3 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" fill="black"/>
                                    <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" fill="black"/>
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-[16px] text-white">Solana</span>
                                <span className="text-[14px] text-zinc-400">{userBalance} SOL</span>
                            </div>
                        </div>
                        <span className="text-[15px] font-medium text-zinc-200">
                            {publicKey}
                        </span>
                    </div>
                </div>
            </div>

            {/* Find more accounts */}
            <button className="mt-6 text-[#a68aee] text-[15px] font-semibold hover:text-[#b8a0fa] transition-colors">
                {/* Find more accounts */}
            </button>

            {/* Bottom Action */}
            <div className="w-full mt-auto mb-2">
                <Link to="/createPassword" onClick={(e) => !isSelected && e.preventDefault()}>
                    <button 
                        disabled={!isSelected || !setupData}
                        className={`w-full font-semibold py-3.5 rounded-2xl transition-colors text-[16px] ${
                            isSelected 
                            ? "bg-[#a68aee] hover:bg-[#9b8df0] text-black cursor-pointer" 
                            : "bg-[#1c1c1e] text-zinc-500 cursor-not-allowed"
                        }`}
                    >
                        Continue
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ViewAccounts;