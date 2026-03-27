import { Link } from 'react-router-dom';

const CreateWallet = () => {
    return(
        <div className="h-[482px] w-[420px] bg-zinc-950 flex flex-col items-center justify-center gap-8 text-white rounded-2xl p-5 shadow-2xl">
            <div className='flex flex-col gap-4 items-center justify-center h-[90%] w-full'>
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
                  <Link to="/createWallet" className="bg-[#aca0f2] text-black w-full py-2.5 text-center rounded-2xl text-lg">Create a new Wallet</Link>
                  <Link to="/importSeed" className="bg-[#292929] text-white w-full py-2.5 text-center rounded-2xl text-lg">I Already Have a Wallet</Link>
                </div>
            </div>
       </div>
    )
}

export default CreateWallet;