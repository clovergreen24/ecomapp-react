
"use client";
import { Navbar } from "flowbite-react";


const MyNavbar = () =>  {
  return (
    <div className="absolute top-0 left-0 right-0">
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">My cart</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default MyNavbar;
