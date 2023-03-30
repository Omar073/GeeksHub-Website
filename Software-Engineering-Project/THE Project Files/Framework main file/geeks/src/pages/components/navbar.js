import React from "react";
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import Link from "next/link";


function Navbar(){
    const login = () => { <Link href="/sign/signin"></Link> }


    return(
        <nav className="navbar navbar-expand-lg bg-white"  >
  <div className="container-fluid">
    <Link className="navbar-brand" href="/landingpage/home">
      <Image src={"/logo geeks.png"} alt="Geeks Hub" width={100} height={100} />
    </Link>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
        <Link href="/landingpage/home" className="nav-link" >Home</Link>
        </li>
        <li className="nav-item">
        <Link href="/landingpage/contact" className="nav-link" >Contact</Link>
        </li>
        <li className="nav-item">
            <Link href="/landingpage/about" className="nav-link" >About us</Link>
        </li>
        <button type="button" className="btn btn-outline-dark" ><Link href="/sign/signin" className="text-reset text-decoration-none">Login</Link></button>
        <button type="button" className="btn btn-outline-dark" ><Link href="/sign/signup" className="text-reset text-decoration-none">Sign up</Link></button>
        
      </ul>
    </div>
  </div>
</nav>
    )
}

export default Navbar;