'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// internal
import urban_thali_logo from '@assets/img/logo/urban-thali-logo.png';
import { CartTwo, Menu, Search } from '@/svg';
import Menus from './header-com/menus';
import useSticky from '@/hooks/use-sticky';
import SearchBar from './header-com/search-bar';
import OffCanvas from '@/components/common/off-canvas';
import CartMiniSidebar from '@/components/common/cart-mini-sidebar';
import useCartInfo from '@/hooks/use-cart-info';
import { openCartMini } from '@/redux/features/cartSlice';
import TopNavbar from './header-com/top-navbar';
import UserDropdown from '@/components/common/user-dropdown';

const HeaderThree = ({ fixed = true, hideNavbar = false }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  if (hideNavbar) {
    return null;
  }

  // Mobile responsive styles
  const headerStyles = {
    position: 'fixed',
    top: '35px', // Position below the top navbar
    left: 0,
    right: 0,
    zIndex: 1000,
    width: '100%',
    minHeight: '60px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderBottom: '1px solid #f0f0f0'
  };

  return (
    <>
      <header>
        {/* Top Navbar */}
        <TopNavbar />
        
        <div id="header-sticky" className={`tp-header-area tp-header-style-transparent-white tp-header-transparent tp-header-sticky has-dark-logo tp-header-height ${sticky ? 'header-sticky' : ''}`} style={headerStyles}>
          <div className="tp-header-bottom-3" style={{ 
            padding: '10px 20px', 
            minHeight: '60px', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Logo */}
            <div className="logo" style={{ 
              display: 'flex', 
              alignItems: 'center',
              flex: '0 0 auto',
              minWidth: '150px'
            }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                <Image 
                  src={urban_thali_logo} 
                  alt="Urban Thali Logo" 
                  style={{ 
                    height: 'auto', 
                    width: '100%', 
                    maxWidth: '200px',
                    maxHeight: '55px',
                    objectFit: 'contain'
                  }} 
                />
              </Link>
            </div>
            
            {/* Desktop Menu - Hidden on mobile */}
            <div className="d-none d-lg-block" style={{ 
              flex: '1', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '0 20px'
            }}>
              <div className="main-menu menu-style-3 p-relative d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                <nav className="tp-main-menu-content">
                  <Menus />
                </nav>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="tp-header-action d-flex align-items-center" style={{ 
              gap: '8px', 
              flex: '0 0 auto',
              minWidth: '100px',
              justifyContent: 'flex-end'
            }}>
              {/* Cart - Always visible */}
              <div className="tp-header-action-item" style={{ display: 'flex', alignItems: 'center' }}>
                <button 
                  onClick={() => dispatch(openCartMini())} 
                  type="button" 
                  className="tp-header-action-btn cartmini-open-btn"
                  style={{
                    padding: '6px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    minWidth: '36px',
                    minHeight: '36px'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <CartTwo />
                  <span className="tp-header-action-badge" style={{
                    position: 'absolute',
                    top: '-1px',
                    right: '-1px',
                    backgroundColor: '#FCB53B',
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>
                    {quantity}
                  </span>
                </button>
              </div>
              
              {/* User dropdown - Hidden on mobile */}
              <div className="tp-header-action-item d-none d-sm-block" style={{ display: 'flex', alignItems: 'center' }}>
                <UserDropdown />
              </div>
              
              {/* Mobile menu button - Visible on mobile and tablet */}
              <div className="tp-header-action-item d-lg-none" style={{ display: 'flex', alignItems: 'center' }}>
                <button 
                  onClick={() => setIsCanvasOpen(true)} 
                  type="button" 
                  className="tp-header-action-btn tp-offcanvas-open-btn"
                  style={{
                    padding: '6px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    minWidth: '36px',
                    minHeight: '36px'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <Menu />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* search bar start */}
      <SearchBar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      {/* search bar end */}

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <OffCanvas isOffCanvasOpen={isOffCanvasOpen} setIsCanvasOpen={setIsCanvasOpen} categoryType="beauty" />
      {/* off canvas end */}
    </>
  );
};

export default HeaderThree;