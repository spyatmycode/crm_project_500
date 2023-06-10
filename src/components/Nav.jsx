import React, { useState } from 'react';
import { Link, Outlet, NavLink, useNavigate } from 'react-router-dom';
import {FaBars, FaCartArrowDown, FaChevronCircleLeft,FaChevronCircleRight, FaHome, FaSignOutAlt, FaUsers} from 'react-icons/fa'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseconfig';
import { toast } from 'react-hot-toast';







const NavBar = () => {
  

  const navigate = useNavigate()
  
  const [navExpand, setNavExpand] = useState(false);

  const toggleFunc = () => {
    setNavExpand(!navExpand);
  };

  const sidebar =
    'dark:bg-[#21334C] bg-[#E4E9F7]  h-full fixed left-0 pb-10 pl-7  top-0 transition-all duration-500 w-1/6 z-10 ';

  const sidebarClose =
    'dark:bg-[#21334C] bg-[#E4E9F7] h-full pb-10 fixed left-0    top-0 transition-all duration-500 w-28  z-10';

  const handleSignOut = async () => {
    try {
      await signOut(auth).then(() => {
        navigate("/auth")
        localStorage.removeItem("staff")
      })

    } catch (error) {
      toast.error(`${error.message}`)
    }
  }

  return (
    <>
      <div className='flex w-screen'>
        <nav className={` ${!navExpand ? sidebarClose : sidebar}`}>
          {/* header */}
          <header>
            <div className='pl-10'>
             
            </div>
            <button
              className=' lg:hidden absolute right-3 top-14  translate-x-full rounded-full bg-blue-500 text-white flex items-center justify-center w-6 h-6 transition-all duration-300 cursor-pointer'
              onClick={toggleFunc}
            >
              {navExpand ? <FaChevronCircleLeft /> : <FaChevronCircleRight />}
            </button>
          </header>
          {/* menu bar */}
          <div className='flex flex-col h-screen pb-8 pt-6  w-full'>
            {/* bar beginning */}
            <div className='mt-10'>
              <ul className='flex flex-col w-full list-none justify-center dark:text-white'>
              
                {<li className='flex items-center list-none mt-10 px-10 pt-0 mb-10 h-10 pr-10  rounded-lg w-48' onClick={toggleFunc}>
                 
                    <FaBars size='20px' />
                    {navExpand ? (
                      <span className='ml-2 font-semibold opacity-1  transition-all duration-700'></span>
                    ) : <span className='ml-2 font-semibold opacity-0'></span>}
                 
                </li>}
                {<li className='flex items-center list-none mt-10 px-10 pt-0 mb-10 h-10 pr-10  rounded-lg w-48'>
                  <NavLink
                    to='/customers'
                    className=' flex items-center h-full no-underline rounded-md transition-all duration-200 w-full'
                  >
                    <FaUsers size='20px' />
                    {navExpand ? (
                      <span className='ml-2 font-semibold opacity-1  transition-all duration-700'>Customers</span>
                    ) : <span className='ml-2 font-semibold opacity-0'>Home</span>}
                  </NavLink>
                </li>}
                <li className='flex items-center list-none mt-10 px-10 pt-0 mb-10 h-10 pr-10  rounded-lg w-48' >
                  <NavLink
                    to='/products'
                    className=' flex items-center h-full no-underline rounded-md transition-all duration-200 w-full'
                  >
                    <FaCartArrowDown size='20px' />
                    {navExpand ? (
                      <span className='ml-2 font-semibold opacity-1  transition-all duration-700'>Products</span>
                    ) : <span className='ml-2 font-semibold opacity-0'>Sign Out</span>}
                  </NavLink>
                </li>
                <li className='flex items-center list-none mt-10 px-10 pt-0 mb-10 h-10 pr-10  rounded-lg w-48' onClick={handleSignOut}>
                  <NavLink
                    to='/'
                    className=' flex items-center h-full no-underline rounded-md transition-all duration-200 w-full'
                  >
                    <FaSignOutAlt size='20px' />
                    {navExpand ? (
                      <span className='ml-2 font-semibold opacity-1  transition-all duration-700'>Sign Out</span>
                    ) : <span className='ml-2 font-semibold opacity-0'>Sign Out</span>}
                  </NavLink>
                </li>
                </ul>
            </div>
          </div>
        </nav>
        <div className={navExpand === true? ' h-full w-5/6 bg-gray-200  transition-all duration-500 fixed overflow-hidden right-0': 'w-[calc(100%-112px)] h-full bg-gray-200  overflow-x-hidden fixed right-0 transition-all duration-500 '}>
            <nav className='w-full p-4 sticky font-bold text-3xl'>

                Dashboard

            </nav>
          <Outlet />
        </div>
      </div>
    </>
  );
};
//bg-[#FAFBFD]
export default NavBar;
