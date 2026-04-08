import { type LucideIcon } from "lucide-react"

interface ActionButtonProps {
    action: string,
    icon: LucideIcon,
    onClick: () => void
}

const ActionButton = ({ action, icon: Icon, onClick }: ActionButtonProps) => {
  return (
    <>
        <button onClick={onClick} className="flex flex-col items-center gap-1 cursor-pointer text-[#aca0f2] bg-zinc-800 group rounded-2xl px-5.5 py-3">
            <Icon size={24} className=""/>
            <h1 className="text-md text-gray-400">{action}</h1>
        </button>
    </>
  )
}

export default ActionButton