import { useEffect, useState } from 'react';
import { ArrowLeft, Copy, QrCode, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPublicKey, shortenKey } from '../../../utils/solana';


const Receive = () => {
  const navigate = useNavigate();
  // const [searchTerm, setSearchTerm] = useState('');
  const [userMinifiedKey, setUserMinifiedKey] = useState("")
  const [userKey, setUserKey] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const fetchUserKey = async () => {
      const key = await getPublicKey();
      setUserKey(key)
      const miniKey = shortenKey(key);
      setUserMinifiedKey(miniKey);
    }
    fetchUserKey();
  }, [])

  // Mock data for blockchains
  const blockchains = [
    { id: 'solana', name: 'Solana', networks: ['Solana'], imgUrl: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', value: userMinifiedKey, nativeToken: 'solana' },
    // { id: 'arbitrum', name: 'Arbitrum', networks: ['Arbitrum'], symbol: 'ARB', value: 0, nativeToken: null },
    // { id: 'base', name: 'Base', networks: ['Base Mainnet'], symbol: 'BASE', value: 0, nativeToken: null },
    // { id: 'polygon', name: 'Polygon', networks: ['Polygon Mainnet'], symbol: 'MATIC', value: 0, nativeToken: null },
    // { id: 'ethereum', name: 'Ethereum', networks: ['Ethereum'], symbol: 'ETH', value: 0.312, nativeToken: 'ethereum' },
  ];

  const getChainLogo = (chainId: string) => {
    switch (chainId) {
      case 'solana':
        return <img src={blockchains[0].imgUrl} alt="" className='rounded-all h-9 w-9' />;
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

  // const filteredChains = blockchains.filter(
  //   (chain) =>
  //     chain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     chain.networks.some(n => n.toLowerCase().includes(searchTerm.toLowerCase()))
  // );

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
        {/* <div className="relative flex items-center mb-1">
          <Search size={18} className="absolute left-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search for a network"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#2A2A2B] border border-[#3A3A3B] rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
          />
        </div> */}

        {/* Blockchain List */}
        <div className="flex flex-col gap-3">
          {blockchains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => navigate('/receive-asset', { state: { selectedChain: chain } })}
              className="w-full flex items-center justify-between bg-[#2A2A2B] p-4 rounded-3xl hover:bg-[#333334] transition-colors group text-left"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-black border border-gray-700 p-1 flex items-center justify-center">
                  {getChainLogo(chain.id)}
                </div>
                <div className='flex flex-col items-start truncate'>
                  <span className="font-semibold text-base">{chain.name}</span>
                  <div className="h-5 flex items-center">
                    {isCopied ? (
                      <span className='text-green-500 text-sm font-medium'>Copied!</span>
                    ) : (
                      <span className="text-sm text-zinc-400 truncate">{chain.value}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex gap-2 shrink-0 z-10 ml-4'>
                <button
                  onClick={() => {
                    navigate('/receive-asset', { state: { selectedChain: chain } });
                  }} 
                  className='bg-zinc-950 hover:bg-[#9b8df0] hover:text-black p-3 rounded-full transition-colors'
                >
                  <QrCode size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(userKey);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }} 
                  className='bg-zinc-950 hover:bg-[#9b8df0] hover:text-black p-3 rounded-full transition-colors'
                >
                  <Copy size={18}/>
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Receive;