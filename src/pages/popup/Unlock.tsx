import { useState } from "react";
import { decryptVault } from "../../utils/crypto"

const unlock = ({ onUnlock }: {onUnlock: () => void}) => {

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false)

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnlocking(true);
    setError('');

    try{
      const data = await new Promise<any>((resolve) => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
          chrome.storage.local.get(["one_wallet_data"], (res) => resolve(res.one_wallet_data));
        } else {
          resolve(JSON.parse(localStorage.getItem("one_wallet_data") || "{}"));
        }
      });

      // Decrypting data
      const {encryptedData, salt, iv} = data.vault;
      const mnemonic = await decryptVault(encryptedData, password, salt, iv);

      if(mnemonic){
        onUnlock();
      }
    }catch(e){
      setError("Incorrect Password")
    }finally{
      setIsUnlocking(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <img src="/wallet.png" alt="Logo" className="w-20 h-20 mb-6" />
      <h1 className="text-3xl font-bold mb-8">Welcome Back</h1>
      
      <form onSubmit={handleUnlock} className="w-full flex flex-col gap-4">
        <input 
          type="password" 
          placeholder="Unlock password"
          className={`w-full bg-[#1e1e1e] border ${error ? 'border-red-500' : 'border-zinc-700'} rounded-xl p-3 outline-none focus:border-[#aca0f2] transition-colors`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        <button 
          disabled={!password || isUnlocking}
          className="w-full mt-2 py-3 bg-[#aca0f2] text-black rounded-xl text-lg font-semibold hover:bg-[#9b8df0] disabled:bg-[#292929] disabled:text-zinc-500 transition-colors"
        >
          {isUnlocking ? 'Unlocking...' : 'Unlock'}
        </button>
      </form>
      <button className="text-sm text-zinc-500 mt-6 hover:text-zinc-300">
        Forgot password?
      </button>
    </div>
  )
}

export default unlock