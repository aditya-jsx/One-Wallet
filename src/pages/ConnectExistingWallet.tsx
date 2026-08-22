import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, AtSign, Key, Wallet } from "lucide-react";

const ConnectExistingWallet = () => {
    const navigate = useNavigate();

    return (
        <div className="h-[545px] w-[420px] bg-[#0a0a0a] flex flex-col items-center text-white rounded-2xl py-4 px-5 shadow-2xl relative">
            {/* Top Navigation */}
            <div className="flex items-center justify-between w-full mb-8">
                <button 
                    onClick={() => navigate(-1)} 
                    className="p-1 -ml-1 text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#a68aee]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                </div>
                <div className="w-5 h-5"></div> {/* Spacer for balance */}
            </div>

            {/* Header */}
            <div className="flex flex-col items-center text-center px-4 mb-5">
                <h1 className="text-lg mb-2">
                    Import a wallet
                </h1>
                <p className="text-[19px] text-zinc-400 leading-relaxed">
                    Import an existing wallet with your email, recovery phrase, private key, or hardware wallet.
                </p>
            </div>

            {/* Options List */}
            <div className="flex flex-col gap-2 w-full">
                {/* Option 1: Email */}
                <Link to="/">
                    <button className="flex items-center gap-4 w-full bg-[#1c1c1e] hover:bg-[#2c2c2e] transition-colors rounded-[20px] px-6 py-3 text-left cursor-pointer">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700/50 bg-[#252525] shrink-0 text-zinc-300">
                            <AtSign className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[16px]  text-white">Connect Email Wallet</span>
                            <span className="text-[14px] text-zinc-400">Use your Apple ID or Google account</span>
                        </div>
                    </button>
                </Link>

                {/* Option 2: Recovery Phrase */}
                <Link to="/importSeed">
                    <button className="flex items-center gap-4 w-full bg-[#1c1c1e] hover:bg-[#2c2c2e] transition-colors rounded-[20px] px-6 py-3 text-left cursor-pointer">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700/50 bg-[#252525] shrink-0 text-zinc-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
                                <line x1="7" y1="10" x2="11" y2="10"></line>
                                <line x1="7" y1="14" x2="17" y2="14"></line>
                                <line x1="13" y1="10" x2="17" y2="10"></line>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[16px]  text-white">Import Recovery Phrase</span>
                            <span className="text-[14px] text-zinc-400">Import accounts from another wallet</span>
                        </div>
                    </button>
                </Link>

                {/* Option 3: Private Key */}
                <button className="flex items-center gap-4 w-full bg-[#1c1c1e] hover:bg-[#2c2c2e] transition-colors rounded-[20px] px-6 py-3 text-left cursor-pointer">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700/50 bg-[#252525] shrink-0 text-zinc-300">
                        <Key className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[16px]  text-white">Import Private Key</span>
                        <span className="text-[14px] text-zinc-400">Import a single-chain account</span>
                    </div>
                </button>

                {/* Option 4: Hardware Wallet */}
                <button className="flex items-center gap-4 w-full bg-[#1c1c1e] hover:bg-[#2c2c2e] transition-colors rounded-[20px] px-6 py-3 text-left cursor-pointer">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700/50 bg-[#252525] shrink-0 text-zinc-300">
                        <Wallet className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[16px]  text-white">Connect Hardware Wallet</span>
                        <span className="text-[14px] text-zinc-400">Use your Ledger hardware wallet</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default ConnectExistingWallet;