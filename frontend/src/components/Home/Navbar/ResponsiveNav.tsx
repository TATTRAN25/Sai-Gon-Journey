"use client";
import { useEffect, useState } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'

const ResponsiveNav = () => {
    const [showNav, setShowNav] = useState(false);
    const handleNavShow = () => setShowNav(true);
    const handleCloseNav = () => setShowNav(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShowNav(true);
        }
    }, []);

  return (
    <div>
        <Nav openNav={handleNavShow}/>
        <MobileNav showNav={showNav} closeNav={handleCloseNav}/>
    </div>
  )
}

export default ResponsiveNav
