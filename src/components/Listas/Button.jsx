const Button = ({onClick, children}) => {
    return (
      <button onClick={onClick} className="h-[45px] w-full px-1 border-solid border-2 border-black rounded-lg bg-[#473a2b] text-white text-[16px] cursor-pointer flex justify-center items-center [transition:all_0.2s]">
        {children}
      </button>
    )
  }
  
  export default Button