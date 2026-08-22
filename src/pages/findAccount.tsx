import { useEffect, useState } from "react";
import { useWalletSetup } from "../context/walletContext";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useNetwork } from "../context/networkContext";
import { ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const FindAccount = () => {
    const navigate = useNavigate();
    const { setupData } = useWalletSetup();
    const { rpcUrl } = useNetwork();
    const [publicKey, setPublicKey] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [accountCount, setAccountCount] = useState<number>(0);

    useEffect(() => {
        const mnemonic = setupData?.mnemonic as string;
        if (!mnemonic) {
            setLoading(false);
            return;
        }

        const seed = bip39.mnemonicToSeedSync(mnemonic, "");

        const path = "m/44'/501'/0'/0'";
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        
        const keypair = Keypair.fromSeed(derivedSeed);
        const pubKey = new PublicKey(keypair.publicKey);
        setPublicKey(pubKey.toBase58());
        console.log(`Public Key: ${pubKey.toBase58()}`);
    }, [setupData]);

    useEffect(() => {
        if (publicKey) {
            findUserAccount();
        }
    }, [publicKey, rpcUrl]);

    const findUserAccount = async () => {
        try {
            const connection = new Connection(rpcUrl, "confirmed");
            const accountPubKey = new PublicKey(publicKey);
            const accountInfo = await connection.getAccountInfo(accountPubKey);
            console.log("Account Info:", accountInfo);
            
            // If accountInfo exists, it has activity/funds. If null, it's 0.
            if (accountInfo) {
                setAccountCount(1);
            } else {
                setAccountCount(0); // If you want to force 1 for the mockup, change this to 1.
            }
        } catch (err) {
            console.error("Error fetching account:", err);
            setAccountCount(0);
        } finally {
            // Adding a small minimum delay so the loading animation is visible and smooth
            setTimeout(() => {
                setLoading(false);
            }, 800);
        }
    };

    return (
        <div className="h-[545px] w-[405px] bg-[#0a0a0a] flex flex-col items-center text-white rounded-2xl px-4 py-3 shadow-2xl relative">
            {/* Top Navigation */}
            <div className="flex items-center justify-between w-full mb-12">
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

            {/* Dynamic Content */}
            <div className="flex flex-col items-center justify-center flex-1 w-full -mt-12">
                {loading ? (
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative flex items-center justify-center w-[84px] h-[84px] mb-2">
                            <div className="absolute inset-0 rounded-full border-[6px] border-[#a68aee] opacity-40"></div>
                            <div className="absolute inset-0 rounded-full border-[6px] border-[#a68aee] border-t-transparent animate-spin"></div>
                            <div className="w-14 h-14 bg-white rounded-full"></div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="text-xl font-semibold text-white">Import Accounts</h1>
                            <p className="text-zinc-400 text-[16px]">Finding Accounts with Activity</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6 w-full mt-4">
                        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[#0a2e15] mb-2">
                            <Check className="w-12 h-12 text-[#00c896]" strokeWidth={4} />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="text-xl font-semibold text-white">Import Accounts</h1>
                            <p className="text-zinc-400 text-[16px]">
                                We found {accountCount} account{accountCount !== 1 ? 's' : ''} with activity
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            {!loading && (
                <div className="flex flex-col w-full gap-3 mt-auto mb-2">
                    <Link to="/viewAccounts">
                        <button className="w-full bg-[#1c1c1e] hover:bg-[#2c2c2e] text-white font-semibold py-3.5 rounded-2xl transition-colors text-[16px]">
                            View Accounts
                        </button>
                    </Link>
                    <Link to="/createPassword">
                    <button className="w-full bg-[#a68aee] hover:bg-[#9b8df0] text-black font-semibold py-3.5 rounded-2xl transition-colors text-[16px]">
                        Continue
                    </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default FindAccount;