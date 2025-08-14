import React from 'react'
import {Link} from "react-router"
import type { reactRouter } from '@react-router/dev/vite'

function Navbar() {
  return (
    <nav className='navbar'>
        <Link to="/">
        <p className='text-2xl font-bold text-gradient'>ResuX</p>
        </Link>
        <div className='flex gap-4'>
          <Link to="/upload" className='primary-button w-fit'>
        Upload Resume
        </Link>
        <Link to="/prevresume" className='primary-button w-fit'>
        View Previous
        </Link>
        </div>
    </nav>
  )
}

export default Navbar
