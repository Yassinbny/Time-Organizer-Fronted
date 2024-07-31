import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import { useState } from "react";
import { GrCircleQuestion, GrLogout, GrSearch } from "react-icons/gr";
import { LuUser2 } from "react-icons/lu";

const Header = () => {
  const { currentUser, signOut } = useAuth();
  //const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="text-white  flex flex-row justify-end  items-center p-5 font-bold sm:h-[6vh] md:h-[7vh] lg:h-[8vh]">
      <img
        className="absolute -top-6 -left-2 sm:-top8  sm:left-1 sm:w-[18vh] md:w-[20vh] lg:w-[22vh]"
        src="images\superLetteringMultBlanco-removebg-preview2.png"
        alt="logo"
      />
      <nav>
        <ul className="flex flex-row justify-evenly  md:justify-items-center sm:w-[50vw] md:w-[49vw] sm:h-6 md:h-8 lg:h-10 sm:text-base md:text-xl lg:text-3xl">
          {!currentUser ? (
            <>
              <li>
                <NavLink to="/login">INICIAR SESIÓN</NavLink>
              </li>
              <li>
                <NavLink to="/signup">REGISTRARSE</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/calendar">CALENDARIOS</NavLink>
              </li>
              <li>
                <NavLink to="/listas"> LISTAS</NavLink>
              </li>
              <li>
                <GrSearch
                className="sm:w-6 lg:w-9 sm:h-6 lg:h-10" />
              </li>
              <li>
                <NavLink to="/help"> <GrCircleQuestion
                className="sm:w-8 lg:w-10 sm:h-8 lg:h-10" /> </NavLink>
              </li>
              <li>
                <NavLink to="/user-profile"> <LuUser2
                className="sm:w-7 lg:w-10 sm:h-7 lg:h-10" /> </NavLink>
              </li>
              <li
                onClick={() => {
                  signOut();
                }}
              >
                <GrLogout className="sm:w-7 lg:w-10 sm:h-7 lg:h-10" />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
