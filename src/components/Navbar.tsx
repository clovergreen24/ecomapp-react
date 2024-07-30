
"use client";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";


const MyNavbar = () =>  {
  return (
    
    <Navbar  className=" mb-4">
      <Navbar.Brand>
        <Link to="/" className="flex flex-row items-center">
        <img src="/logo.png" className="mr-3 h-16" alt="Kawaii Store Logo" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white text-pink-500">Kawaii Store</span>
        </Link>
      </Navbar.Brand>
      
      <Navbar.Collapse>
        <Navbar.Link href="#" className="flex flex-row text-pink-500 self-center items-center mr-8 font-semibold tracking-wide text-base">
          <img src="/shopping-cart.png" className="mr-3 h-8" alt="Cart" />
          My cart
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
   
  );
}

export default MyNavbar;
