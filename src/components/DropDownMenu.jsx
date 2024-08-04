import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";
import {
  GrSearch,
  GrCircleQuestion,
  GrUserAdmin,
  GrLogout,
} from "react-icons/gr";
import { LuUser2 } from "react-icons/lu";
import useAuth from "../hooks/useAuth.jsx";

export default function DropDownMenu() {
  const { currentUser, signOut } = useAuth();
  return (
    <Menu as="div" className="relative sm:hidden inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-black">
          <Bars3Icon aria-hidden="true" className="h-5 w-5 text-white" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute flex flex-col  items-center text-center  -right-5 z-10 mt-2 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {!currentUser ? (
            <>
              <MenuItem>
                <NavLink to="/login" className={`block px-4 py-2 text-sm `}>
                  INICIAR SESIÓN
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/signup" className={`block px-4 py-2 text-sm `}>
                  REGISTRARSE
                </NavLink>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <NavLink to="/calendar" className={`block px-4 py-2 text-sm `}>
                  CALENDARIOS
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/listas" className={`block px-4 py-2 text-sm `}>
                  LISTAS
                </NavLink>
              </MenuItem>
              <MenuItem>
                <div className="px-4 flex flex-col  items-center py-2">
                  <GrSearch className="sm:w-6  lg:w-9 sm:h-6 lg:h-10" />
                </div>
              </MenuItem>
              <MenuItem>
                <NavLink
                  to="/help"
                  className={` flex flex-col  items-center px-4 py-2 text-sm `}
                >
                  <GrCircleQuestion className="sm:w-8 lg:w-10 sm:h-8 lg:h-10" />
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink
                  to={
                    currentUser.role === "admin"
                      ? "/admin-profile"
                      : "/user-profile"
                  }
                  className={` flex flex-col  items-center px-4 py-2 text-sm `}
                >
                  {currentUser.role === "admin" ? (
                    <GrUserAdmin className="w-6 md:w-7 lg:w-10 h-4 md:h-7 lg:h-10" />
                  ) : (
                    <LuUser2 className="w-6 md:w-8 lg:w-10 h-5 md:h-8 lg:h-10" />
                  )}
                </NavLink>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={signOut}
                  className="flex flex-col  items-center w-full px-4 py-2 text-left text-sm text-white data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  <GrLogout className="sm:w-7 lg:w-10 sm:h-7 lg:h-10" />
                </button>
              </MenuItem>
            </>
          )}
        </div>
      </MenuItems>
    </Menu>
  );
}
