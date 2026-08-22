import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useWalletSetup } from "../context/walletContext";

const ImportSeed = () => {
    const navigate = useNavigate();
    const [ words, setWords ] = useState<string[]>(Array(12).fill(""));
    const [ mnemonic, setMnemonic ] = useState<string>("");
    const { updateSetup } = useWalletSetup();

    const handleWordChange = (index: number, value: string) => {
        // Handle pasting multiple words at once
        const pastedWords = value.trim().split(/\s+/);
        if (pastedWords.length > 1) {
            const newWords = [...words];
            pastedWords.forEach((word, i) => {
                if (index + i < 12) {
                    newWords[index + i] = word;
                }
            });
            setWords(newWords);
        } else {
            const newWords = [...words];
            newWords[index] = value;
            setWords(newWords);
        }
    };

    const handleImport = () => {
        if (!mnemonic) return;
        updateSetup({mnemonic: mnemonic});
        navigate("/findAccount");
    }

    useEffect(() => {
        // Check if all 12 boxes are filled
        if (words.every(word => word.trim().length > 0)) {
            const fullMnemonic = words.map(w => w.trim()).join(" ");
            setMnemonic(fullMnemonic);
            // You can now access `mnemonic` state which holds the space-separated string
        } else {
            setMnemonic("");
        }
    }, [words]);

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
                    <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                </div>
                <button className="p-1 -mr-1 text-zinc-400 hover:text-white transition-colors">
                    <Info className="w-5 h-5" />
                </button>
            </div>

            {/* Header */}
            <div className="flex flex-col items-center text-center px-2 mb-6">
                <h1 className="text-lg mb-2">
                    Recovery Phrase
                </h1>
                <p className="text-[19px] text-zinc-400 leading-relaxed">
                    Import an existing wallet with your 12 recovery phrase.
                </p>
            </div>

            {/* Seed Phrase Grid */}
            <div className="grid grid-cols-3 gap-2.5 w-full mb-3">
                {words.map((word, i) => (
                    <div key={i} className="flex items-center bg-[#141414] border border-zinc-800/60 rounded-lg px-3 py-2.5 focus-within:border-zinc-500 transition-colors">
                        <span className="text-zinc-400 text-[14px] w-6 shrink-0 select-none">{i + 1}.</span>
                        <input 
                            type="text" 
                            className="bg-transparent outline-none text-white w-full text-[14px] font-medium"
                            value={word}
                            onChange={(e) => handleWordChange(i, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            {/* 24-word toggle */}
            <button className="text-zinc-400 text-[17px] font-medium hover:text-[#AB9FF2] transition-colors mb-auto">
                {/* I have a 24-word recovery phrase */}
            </button>

            {/* Actions */}
            <div className="flex flex-col w-full mb-2 gap-3">
                <Link to="/findAccount">
                    <button 
                        onClick={handleImport}
                        disabled={!mnemonic}
                        className={`w-full font-semibold py-3.5 rounded-2xl transition-colors text-[16px] ${
                            mnemonic 
                            ? "bg-[#a68aee] text-black hover:bg-[#9b8df0] cursor-pointer" 
                            : "bg-[#1c1c1e] text-zinc-500 cursor-not-allowed"
                        }`}
                        >
                        Import Wallet
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ImportSeed;