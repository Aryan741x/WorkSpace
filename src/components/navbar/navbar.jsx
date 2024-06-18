'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import exsvg from '../../../public/figure-svgrepo-com.svg'
import styles from '../../styles/navbar.module.css'
import Link from 'next/link'
import Cookies from 'js-cookie';
export default function Navbar() {
  const isEmployee = Cookies.get('role') == 'employee';
  const [r,setr] = useState(false);
  useEffect(() => {
    if (!isEmployee) {
      setr(true);
    }
  }, []);
  return (
    <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
      <div className="md:h-16 h-29 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="text-indigo-500 md:order-1">
          <Image src={exsvg} className={styles.container}
            stroke="currentColor" alt='Buisness-logo'>
          </Image>
        </div>
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2" style={{ marginLeft: '-60%', position:'relative',fontSize:'18px' }}>
          <ul className="flex font-semibold justify-between">
            <li className="md:px-4 md:py-2 text-indigo-500"><h2>Work Space</h2></li>
            {r && (
              <Link href="/add-work">
                <li className="md:px-4 md:py-2 hover:text-indigo-400">Add Work</li>
              </Link>
            )}
            <Link href={'./about'}><li className="md:px-4 md:py-2 hover:text-indigo-400">About</li></Link>
          </ul>
        </div>
  
        <div className="order-2 md:order-3">
          <Link href={'./'}><button  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-50 rounded-xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Logout</span>
          </button></Link>
        </div>
      </div>
    </nav>
  )
}