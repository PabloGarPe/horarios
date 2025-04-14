import './styles/mainBtn.css'

export const MainBtn = ({ label, isActive, onClick }) => {

    return (
        <button className="bg-black rounded-none mx-2" onClick={onClick}>
            <span className={` block lg:px-4 lg:py-2 px-3 py-1.5 truncate
   border-black border-2 rounded-none lg:text-xl text-base hover:translate-x-0 hover:translate-y-0 transition-all font-mono font-bold -translate-x-2 -translate-y-2 cursor-pointer ${isActive ? "btn-clicked" : "bg-white"} dark:text-white dark:bg-gray-700`}>
                {label}
            </span>
        </button>
    )
}