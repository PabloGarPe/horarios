import './styles/mainBtn.css'

export const MainBtn = ({ label, isActive, onClick }) => {

    return (
        <button className="bg-black rounded-none mx-2" onClick={onClick}>
            <span className={` block px-4 py-2  truncate
   border-black border-2 rounded-none text-xl  hover:translate-x-0 hover:translate-y-0 transition-all font-mono font-bold -translate-x-2 -translate-y-2 ${isActive ? "btn-clicked" : "bg-white"} dark:text-white dark:bg-gray-700`}>
                {label}
            </span>
        </button>
    )
}