import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletSetup } from '../context/walletContext';

const CreatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const { updateSetup } = useWalletSetup();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirm && isChecked && password.length >= 8) {
      updateSetup({ password });
      navigate('/recoveryPhrase');
    }
  };

  const isButtonDisabled = password !== confirm || password.length < 8 || !isChecked;

  return (
    <div className="w-[420px] flex flex-col text-white bg-zinc-950 rounded-2xl p-8 shadow-2xl">
        <div className='flex items-center mb-6'>    
            <button 
              onClick={() => navigate(-1)} 
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>   
            <div className="flex-1 flex justify-center space-x-2 mb-2">
               <div className="w-2 h-2 rounded-full bg-[#aca0f2]"></div>
               <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
            </div>
            <div className="w-7"></div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">Create a password</h1>
        <p className="text-zinc-400 mb-8 text-center">You will use this to unlock your wallet.</p>  
        <form onSubmit={handleContinue} className="flex flex-col gap-4">
          <input 
            type="password" placeholder="Password (8 or more characters)"
            className="bg-[#1e1e1e] border border-zinc-700 rounded-lg p-3 outline-none focus:border-[#aca0f2] transition-colors"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type="password" placeholder="Confirm password"
            className="bg-[#1e1e1e] border border-zinc-700 rounded-lg p-3 outline-none focus:border-[#aca0f2] transition-colors"
            value={confirm} onChange={(e) => setConfirm(e.target.value)}
          />    
          <div className="flex items-center gap-3 mt-4">
            <input type="checkbox" id="terms" className="w-5 h-5 accent-[#aca0f2]" 
              checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
            <label htmlFor="terms" className="text-sm text-zinc-400">
              I agree to the Terms of Service
            </label>
          </div>    
          <button 
            disabled={isButtonDisabled}
          //   onClick={isButtonDisabled? "" : navigate('/')}
            className={`mt-6 py-3 rounded-xl text-lg font-semibold transition-colors ${
              isButtonDisabled ? 'bg-[#292929] text-zinc-500 cursor-not-allowed' : 'bg-[#aca0f2] text-black hover:bg-[#9b8df0]'
            }`}
          >
            Continue
          </button>
        </form>
    </div>
  );
};

export default CreatePassword;