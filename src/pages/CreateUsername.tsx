import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useWalletSetup } from "../context/walletContext";
import { encryptVault } from "../utils/crypto";

const CreateUsername = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const { setupData } = useWalletSetup();
  const [isFinished, setIsFinished] = useState(false);
  const [isEncrypting, setisEncrypting] = useState(false);


  const handleFinalize = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!username.trim() || !setupData.password || !setupData.mnemonic) return;

    setisEncrypting(true);

    try{
      const vault = await encryptVault(setupData.mnemonic, setupData.password);

      const finalWalletData = {
        username: username,
        vault: vault,
        isInitialized: true,
      }

      if(typeof chrome !== 'undefined' && chrome.storage){
        chrome.storage.local.set({"one_wallet_data": finalWalletData}, () => {
          setIsFinished(true);
        })
      }
    }catch(e){
      console.log("Encryption failed");
    }finally{
      setisEncrypting(false);
    }
  }

  if(isFinished){
    return (
      <>
        <div className="w-[420px] flex flex-col items-center justify-center text-white bg-zinc-950 rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-20 h-20 bg-[#aca0f2] rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="black" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">You're all set!</h1>
        <p className="text-zinc-400 mb-8">
          Your wallet has been created successfully. Pin the extension to your browser toolbar to access it easily.
        </p>
        <button 
          onClick={() => window.close()} // This closes the onboarding tab
          className="w-full py-3 bg-[#aca0f2] text-black rounded-xl text-lg font-semibold hover:bg-[#9b8df0]"
        >
          Close this tab
        </button>
      </div>
      </>
    )
  }

  return (
    <div className="w-[420px] flex flex-col text-white bg-zinc-950 rounded-2xl p-8 shadow-2xl">
        <div className='flex items-center mb-4'>    
            <button 
              onClick={() => navigate(-1)} 
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>   
            <div className="flex-1 flex justify-center space-x-2 mb-2">
               <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
               <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
               <div className="w-2 h-2 rounded-full bg-[#aca0f2]"></div>
            </div>
            <div className="w-7"></div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-center">Name your wallet</h1>
        <p className="text-zinc-400 mb-8 text-center">Give your wallet a name so you can easily identify it.</p>  
        
        <form onSubmit={handleFinalize} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Wallet 1"
            className="bg-[#1e1e1e] border border-zinc-700 rounded-lg p-3 outline-none focus:border-[#aca0f2] transition-colors"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <button 
            disabled={username.length === 0}
            className={`mt-6 py-3 rounded-xl text-lg font-semibold transition-colors ${
              username.length === 0 ? 'bg-[#292929] text-zinc-500 cursor-not-allowed' : 'bg-[#aca0f2] text-black hover:bg-[#9b8df0] cursor-pointer'
            }`}
          >
            Finish Setup
          </button>
        </form>
    </div>
  )
}

export default CreateUsername