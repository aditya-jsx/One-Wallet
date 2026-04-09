// import React, { useState } from 'react';
// import { ArrowLeft, Search } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const ReceiveAsset = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchTerm, setSearchTerm] = useState('');

//   // Extract the chain passed from the previous screen
//   // Type this properly based on your actual interface if using Typescript tightly
//   const selectedChain = location.state?.selectedChain;

//   // Mock data mapped to native tokens
//   const allAssets: Record<string, any[]> = {
//     ethereum: [
//       { id: 'eth', name: 'Ethereum', symbol: 'ETH', value: 0.312, icon: 'eth' },
//       { id: 'weth', name: 'Wrapped Ether', symbol: 'WETH', value: 0, icon: 'eth' },
//       { id: 'wsol', name: 'Wrapped SOL', symbol: 'WSOL', value: 10.2, icon: 'sol' },
//       { id: 'usdt', name: 'Tether USD', symbol: 'USDT', value: 0, icon: 'usdt' },
//     ],
//     solana: [
//       { id: 'sol', name: 'Solana', symbol: 'SOL', value: 1.245, icon: 'sol' },
//       { id: 'usdc', name: 'USDC', symbol: 'USDC', value: 50.12, icon: 'usdc' },
//     ],
//   };

//   // Gracefully handle if a user navigates here without selecting a chain (e.g., refresh)
//   if (!selectedChain) {
//     return (
//       <div className="flex flex-col items-center justify-center h-[600px] w-full bg-[#1C1C1C] text-white">
//         <p className="mb-4 text-gray-400">No network selected.</p>
//         <button onClick={() => navigate('/receive')} className="bg-[#AB9FF2] text-black px-4 py-2 rounded-lg font-semibold">
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const assets = selectedChain.nativeToken ? allAssets[selectedChain.nativeToken] || [] : [];

//   const getAssetLogo = (iconType: string) => {
//     switch (iconType) {
//       case 'eth':
//         return (
//           <div className="w-full h-full bg-[#627EEA] rounded-full p-1 flex items-center justify-center border border-gray-700">
//             <div className="w-full h-full bg-black rounded-full" />
//           </div>
//         );
//       case 'sol':
//         return <div className="w-full h-full bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded-full" />;
//       case 'usdt':
//         return <div className="w-full h-full bg-[#009393] rounded-full flex items-center justify-center font-bold text-white text-xs">T</div>;
//       case 'usdc':
//         return <div className="w-full h-full bg-[#2775CA] rounded-full flex items-center justify-center font-bold text-white text-xs">C</div>;
//       default:
//         return <div className="w-full h-full bg-gray-600 rounded-full" />;
//     }
//   };

//   const filteredAssets = assets.filter(
//     (asset) =>
//       asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col h-[600px] w-full bg-[#1C1C1C] text-white font-sans overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b border-[#2C2C2C]">
//         <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#2C2C2C] rounded-full transition-colors">
//           <ArrowLeft size={20} />
//         </button>
//         <div className="flex flex-col items-center">
//             <h1 className="text-lg font-semibold tracking-wide">Select Asset</h1>
//             <span className="text-xs text-purple-400 font-medium">{selectedChain.networks[0]}</span>
//         </div>
//         <div className="w-9" />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col p-5 gap-4 overflow-y-auto">
//         <div className="relative flex items-center mb-1">
//           <Search size={18} className="absolute left-4 text-gray-500" />
//           <input
//             type="text"
//             placeholder={`Search on ${selectedChain.networks[0]}`}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full bg-[#2A2A2B] border border-[#3A3A3B] rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
//           />
//         </div>

//         {/* Asset List */}
//         <div className="flex flex-col gap-3">
//           {filteredAssets.length > 0 ? (
//             filteredAssets.map((asset) => (
//               <button
//                 key={asset.id}
//                 onClick={() => console.log('Final Asset Selected:', asset)} // Final action here
//                 className="flex items-center justify-between bg-[#2A2A2B] p-4 rounded-xl hover:bg-[#333334] transition-colors group"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 rounded-full bg-black border border-gray-700 p-1 flex items-center justify-center">
//                     {getAssetLogo(asset.icon)}
//                   </div>
//                   <div className="flex flex-col items-start">
//                     <span className="font-semibold text-base">{asset.name}</span>
//                     <span className="text-xs text-gray-400">
//                         {asset.symbol}
//                     </span>
//                   </div>
//                 </div>
                
//                 {asset.value > 0 && (
//                   <div className="flex flex-col items-end">
//                     <span className="font-semibold text-base">{asset.value} {asset.symbol}</span>
//                   </div>
//                 )}
//               </button>
//             ))
//           ) : (
//             <div className="text-center text-gray-500 mt-6 text-sm">
//               No assets found for this network.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReceiveAsset;















import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Info } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReceiveQR = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedChain = location.state?.selectedChain;
  const [copied, setCopied] = useState(false);

  // Fallback state if accessed directly without routing
  if (!selectedChain) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] w-full bg-[#1C1C1C] text-white">
        <p className="mb-4 text-gray-400">No network selected.</p>
        <button onClick={() => navigate('/receive')} className="bg-[#AB9FF2] text-black px-4 py-2 rounded-lg font-semibold">
          Go Back
        </button>
      </div>
    );
  }

  // Mock address - in reality, pull this from your wallet context based on the chain
  const walletAddress = "311BuK5Lz45oX9t7Fntd8iS2yR1K3w51Gz31kM1q2gWe";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render the correct chain logo
  const getChainLogo = (chainId: string) => {
    switch (chainId) {
      case 'solana':
        return <div className="w-full h-full bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded-full" />;
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
        <h1 className="text-lg font-semibold tracking-wide">Receive</h1>
        <div className="w-9" /> {/* Spacer for flex centering */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-6 overflow-y-auto">
        
        {/* QR Code Container */}
        <div className="bg-white p-4 rounded-3xl relative flex items-center justify-center mb-6 shadow-lg shadow-black/20">
          {/* Note: Use a library like `react-qr-code` or `qrcode.react` here in production.
              This is a visual placeholder to match your screenshot layout perfectly. */}
          <div className="w-48 h-48 bg-black grid grid-cols-5 grid-rows-5 gap-1 p-2 rounded-xl">
             {/* Mocking a QR code pattern visually for the UI */}
             {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`bg-white ${i % 2 === 0 ? 'opacity-0' : 'opacity-100'}`} />
             ))}
          </div>
          
          {/* Center Logo Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full p-1 shadow-md flex items-center justify-center">
              <div className="w-full h-full">
                {getChainLogo(selectedChain.id)}
              </div>
            </div>
          </div>
        </div>

        {/* Network Indicator Pill */}
        <div className="flex items-center gap-2 bg-[#2A2A2B] px-4 py-2 rounded-full mb-8">
          <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
             {getChainLogo(selectedChain.id)}
          </div>
          <span className="text-sm font-medium">{selectedChain.name}</span>
        </div>

        {/* Address Display */}
        <div className="w-full flex flex-col items-center gap-4 mb-auto">
          <p className="text-center text-lg font-medium text-gray-200 break-all leading-tight px-4">
            {walletAddress}
          </p>
          
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 bg-[#2A2A2B] hover:bg-[#333334] text-white px-6 py-2.5 rounded-full font-semibold transition-colors border border-[#3A3A3B]"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Warning Information Box */}
        <div className="w-full bg-[#2A2A2B] rounded-2xl p-4 flex gap-3 mt-8 items-start border border-[#3A3A3B]/50">
          <div className="bg-[#3A3A3B] p-1.5 rounded-full text-gray-400 shrink-0 mt-0.5">
            <Info size={16} />
          </div>
          <p className="text-sm text-gray-300 leading-snug">
            This address can only be used to receive compatible tokens and NFTs on {selectedChain.name}.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ReceiveQR;