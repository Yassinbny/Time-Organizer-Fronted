const Button = ({onClick, children}) => {
    return (
      <button onClick={onClick} className="h-[45px] w-full px-1 rounded-xl bg-gradient-to-r from-amber-900 via-amber-700 to-amber-500 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 shadow-lg shadow-amber-500/50 dark:shadow-lg dark:shadow-amber-800/80 text-white text-[16px] cursor-pointer flex justify-center items-center [transition:all_0.2s]">
        {children}
      </button>
    )
  }
  
 // 
 //text-white border-solid border-gray-900 border-1 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 shadow-lg shadow-amber-500/50 dark:shadow-lg dark:shadow-amber-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
  export default Button