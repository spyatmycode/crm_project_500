import React, { useContext, useState } from 'react';
import { Link, Outlet, NavLink } from 'react-router-dom';
import {FaChevronCircleLeft,FaChevronCircleRight, FaDashcube, FaEnvelope, FaHome, FaListAlt, FaUser, FaUsers, FaArrowLeft} from 'react-icons/fa'
import Render from './Profile';
import { CustomersDb } from '../../providers/CustomerProvider';






const NavBar = () => {

   const {customer} = useContext(CustomersDb)
  
  const [navExpand, setNavExpand] = useState(false);

  const toggleFunc = () => {
    setNavExpand(!navExpand);
  };

  const sidebar =
    'dark:bg-[#23304d] bg-[#433e82]  h-full fixed left-0 pb-10 pl-7  top-0 transition-all duration-500 w-1/6 z-10 ';

  const sidebarClose =
    'dark:bg-[#23304d] bg-[#433e82] bg-[#E4E9F7] h-full pb-10 fixed left-0    top-0 transition-all duration-500 w-28  z-10';

  const handleSignOut = async () => {
    try {
      await signOut(auth).then(() => {
        navigate("/auth")
      })

    } catch (error) {
      toast.error(`${error.message}`)
    }
  }

  const [channel, setChannel] = useState(0)

  return (
    <>
      <div className='flex w-screen'>
        <nav className={` ${!navExpand ? sidebarClose : sidebar}`}>
          {/* header */}
          <header>
            <div className='pl-10'>
             
            </div>
            <button
              className='absolute right-3 top-14  translate-x-full rounded-full bg-blue-500 text-white flex items-center justify-center w-6 h-6 transition-all duration-300 cursor-pointer'
              onClick={toggleFunc}
            >
              {navExpand ? <FaChevronCircleLeft /> : <FaChevronCircleRight />}
            </button>
          </header>
          {/* menu bar */}
          <div className='flex flex-col h-screen pb-8 pt-6  w-full'>
            {/* bar beginning */}
            <div className='mt-10'>
              <ul className='flex flex-col  list-none justify-center dark:text-white'>
              
                <NavLink to={`/customer/${customer}`}>
                <li className='flex items-center list-none mt-10 px-10 pt-0 mb-10 h-10 pr-10  rounded-lg w-48' onClick={()=>setChannel(0)}>
                 
                 <FaUser size='20px' color='white' />
                 {navExpand ? (
                   <span className='ml-2 font-semibold opacity-1  transition-all duration-700 
                   text-white'>Profile</span>
                 ) : <span className='ml-2 font-semibold text-white opacity-0'>Profile</span>}
              
             </li>
                </NavLink>

               <NavLink to={`/customer/${customer}/history`}>
                 <li className='flex items-center list-none mt-10 px-10 pt-0 mb-10 h-10 pr-10  rounded-lg w-48' onClick={()=>setChannel(1)}>
                
                    <FaListAlt size='20px' color='white' />
                    {navExpand ? (
                      <span className='ml-2 font-semibold opacity-1  transition-all duration-700 text-white'>Purchase History</span>
                    ) : <span className='ml-2 font-semibold opacity-0 text-white'>Profile</span>}
                 
                </li>
               </NavLink>
               <NavLink to={`/customer/${customer}/messaging`}>
                 <li className='flex items-center list-none mt-10 px-10 pt-0 mb-10 h-10 pr-10  rounded-lg w-48' onClick={()=>setChannel(1)}>
                
                    <FaEnvelope size='20px' color='white' />
                    {navExpand ? (
                      <span className='ml-2 font-semibold opacity-1  transition-all duration-700 text-white'>Messaging</span>
                    ) : <span className='ml-2 font-semibold opacity-0 text-white'>Profile</span>}
                 
                </li>
               </NavLink>
               <NavLink to={`/`}>
                 <li className='flex items-center list-none mt-10 px-10 pt-0 mb-10 h-10 pr-10  rounded-lg w-48' onClick={()=>setChannel(1)}>
                
                    <FaArrowLeft size='20px' color='white' />
                    {navExpand ? (
                      <span className='ml-2 font-semibold opacity-1  transition-all duration-700 text-white'>Back to Home</span>
                    ) : <span className='ml-2 font-semibold opacity-0 text-white'>Profile</span>}
                 
                </li>
               </NavLink>
                </ul>
            </div>
          </div>
        </nav>
        <div className={navExpand === true? ' h-full w-5/6 bg-gray-200  transition-all duration-500 fixed overflow-hidden right-0': 'bg-[#f4f4f4] w-[calc(100%-7rem)] h-full dark:bg-gray-200  overflow-x-hidden fixed right-0 transition-all duration-500 '}>
            <nav className='w-full p-10  font-bold text-3xl'>

                Dashboard

            </nav>
            
          <Outlet />
        </div>
      </div>

      {<span className='hidden'><Render channel={channel}></Render></span>}
    </>
  );
};
//bg-[#FAFBFD]
export default NavBar;
