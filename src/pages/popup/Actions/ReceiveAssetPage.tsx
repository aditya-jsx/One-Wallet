import { useEffect, useState } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPublicKey } from '../../../utils/solana';
import { useNetwork } from '../../../context/networkContext';
import { QRCodeSVG } from "qrcode.react";

const ReceiveQR = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedChain = location.state?.selectedChain || { id: 'solana', name: 'Solana' };
  const [copied, setCopied] = useState(false);
  const [address, setAddress] = useState("");
  const {network} = useNetwork();  

  useEffect(() => {
    const fetchkey = async () => {
      const key = await getPublicKey();
      setAddress(key);
    }
    fetchkey();
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render the correct chain logo
  const getChainLogo = (chainId: string) => {
    switch (chainId) {
      case 'solana':
        return <div className="w-full h-full" >
          <img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" alt="" className='rounded-xl' />
        </div>;
      case 'arbitrum':
        return <div className="w-full h-full bg-[#12AAFF] rounded-full flex items-center justify-center font-bold text-black text-xs">Ar</div>;
      case 'base':
        return <div className="w-full h-full bg-[#0052FF] rounded-full flex items-center justify-center font-bold text-white text-xs">B</div>;
      case 'polygon':
        return <div className="w-full h-full bg-[#8247E5] rounded-full flex items-center justify-center font-bold text-white text-xs">P</div>;
      case 'ethereum':
        return (
          <div className="w-full h-full bg-[#627EEA] rounded-full p-1 flex items-center justify-center border border-gray-700">
             <div className="w-full h-full bg-black rounded-full" />
          </div>
        );
      default:
        return <div className="w-full h-full bg-gray-600 rounded-full" />;
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full bg-[#1C1C1C] text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#2C2C2C] rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold tracking-wide">Receive Address</h1>
        <div className="w-9" /> {/* Spacer for flex centering */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-2 pb-6 overflow-y-auto">
        
        {/* QR Code Container */}
        <div className="bg-white p-2 rounded-lg relative flex items-center justify-center mb-6 shadow-lg shadow-black/20">
          <div className="w-[160px] h-[160px] bg-white rounded-xl flex items-center justify-center">
             {address ? (
               <QRCodeSVG value={address} size={180} />
             ) : (
               <div className="w-full h-full animate-pulse bg-gray-200 rounded-xl" />
             )}
          </div>
          
          {/* Center Logo Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 p-1 shadow-md flex items-center justify-center">
              <div className="w-full h-full">
                {getChainLogo(selectedChain.id)}
              </div>
            </div>
          </div>
        </div>

        {/* Network Indicator Pill */}
        <div className="flex flex-col items-center gap-2  px-4 py-2 rounded-full mb-1">
          <div className="w-full h-5 rounded-full flex items-center justify-center text-lg">
             Your Solana {network === 'mainnet-beta' ? "main-net" : "devnet"} Address
          </div>
        </div>

        {/* Address Display */}
        <div className="w-full flex flex-col items-center border border-zinc-700 rounded-xl">
          <div className='py-3  px-2 bg-[#20202197]'>
            <p className="text-center text-lg font-medium text-gray-200 break-all leading-tight">
              {address}
            </p>
          </div>
          
          <div className='flex justify-center w-full bg-[#20202197] hover:bg-[#2e2e2f6d] border-t cursor-pointer border-zinc-950 py-2'>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 text-white px-6 text-lg rounded-full font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Warning Information Box */}
        <div className="w-full p-4 flex gap-3 mt-2 items-start">
          {/* <div className="bg-[#3A3A3B] p-1.5 rounded-full text-gray-400 shrink-0 mt-0.5">
            <Info size={16} />
          </div> */}
          <p className="text-sm text-zinc-400 text-center leading-snug">
            Use to receive tokens on the {selectedChain.name} {network === 'mainnet-beta' ? "main-net" : "devnet"} network only.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ReceiveQR;