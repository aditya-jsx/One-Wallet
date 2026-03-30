import { Link, useNavigate } from 'react-router-dom';

const CreateWallet = () => {
    const navigate = useNavigate();
    return(
        <div className="h-[482px] w-[420px] bg-zinc-950 flex flex-col items-center justify-center gap-8 text-white rounded-2xl p-5 shadow-2xl">
            <div className='flex flex-col gap-4 items-center justify-center h-[90%] w-full'>
                <div className='flex gap-2 relative top-[-90px] left-[-160px]'>
                    <h1>⇤</h1>
                    <Link to="/" className="text-white hover:text-gray-300">
                        Back
                    </Link>
                </div>
                <div className='flex items-center'>
                    <img src="/wallet.png" alt="" className='h-15'/>
                    <h1 className="text-5xl font-bold text-center">
                        one wallet
                    </h1>
                </div>
                <div className='flex'>
                    <h1 className='text-center text-xl'>
                        To get started, create a new wallet or import an existing one.
                    </h1>
                </div>
            </div>
            <div className='flex h-[10%] w-full'>
                <div className="flex flex-col w-full justify-end items-center gap-2"> 
                    <button onClick={() => navigate('/createPassword')} className="bg-[#aca0f2] text-black w-full py-2.5 text-center rounded-2xl text-lg hover:bg-[#9b8df0] cursor-pointer">Create a Recovery Phrase Wallet</button>
                </div>
            </div>
       </div>
    )
}

export default CreateWallet;