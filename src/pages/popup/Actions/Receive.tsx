import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Receive = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for blockchains
  const blockchains = [
    { id: 'solana', name: 'Solana', networks: ['Solana'], symbol: 'SOL', value: 1.245, nativeToken: 'solana' },
    { id: 'arbitrum', name: 'Arbitrum', networks: ['Arbitrum'], symbol: 'ARB', value: 0, nativeToken: null },
    { id: 'base', name: 'Base', networks: ['Base Mainnet'], symbol: 'BASE', value: 0, nativeToken: null },
    { id: 'polygon', name: 'Polygon', networks: ['Polygon Mainnet'], symbol: 'MATIC', value: 0, nativeToken: null },
    { id: 'ethereum', name: 'Ethereum', networks: ['Ethereum'], symbol: 'ETH', value: 0.312, nativeToken: 'ethereum' },
  ];

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
          <div className="w-full h-full bg-black rounded-full p-1.5 flex items-center justify-center border border-gray-700">
            <div className="w-full h-full bg-[#627EEA] rounded-full" />
          </div>
        );
      default:
        return <div className="w-full h-full bg-gray-600 rounded-full" />;
    }
  };

  const filteredChains = blockchains.filter(
    (chain) =>
      chain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chain.networks.some(n => n.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-[600px] w-full bg-[#1C1C1C] text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#2C2C2C]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#2C2C2C] rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold tracking-wide">Receive</h1>
        <div className="w-9" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-5 gap-4 overflow-y-auto">
        <div className="relative flex items-center mb-1">
          <Search size={18} className="absolute left-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search for a network"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#2A2A2B] border border-[#3A3A3B] rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
          />
        </div>

        {/* Blockchain List */}
        <div className="flex flex-col gap-3">
          {filteredChains.map((chain) => (
            <button
              key={chain.id}
              // THIS IS THE NAVIGATION LINE:
              // Navigates to your second page and passes the `chain` object in the state
              onClick={() => navigate('/receive-asset', { state: { selectedChain: chain } })}
              className="flex items-center justify-between bg-[#2A2A2B] p-4 rounded-xl hover:bg-[#333334] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black border border-gray-700 p-1 flex items-center justify-center">
                  {getChainLogo(chain.id)}
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-base">{chain.name}</span>
                  {chain.networks.map((network, index) => (
                    <span key={index} className="text-xs text-gray-400">
                      {network}
                    </span>
                  ))}
                </div>
              </div>
              
              {chain.value > 0 && (
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-base">{chain.value} {chain.symbol}</span>
                  <span className="text-xs text-gray-400">Main Account</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Receive;