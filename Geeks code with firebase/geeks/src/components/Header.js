import { useState, useEffect } from "react";
import {  useNavigate } from 'react-router-dom';


export default function Header() {
  const navigate = useNavigate()

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  

  return (
    <header className="w-full sticky-nav">
      <div className="flex flex-col flex-wrap max-w-5xl p-2.5 mx-auto md:flex-row">
        <div className="flex flex-row items-center justify-between p-2 md:p-1">
          <img
              src="../geeks.png"
              alt="Image description"
              className="w-12 h-auto rounded-lg hover:shadow-lg object-contain"
          />
          <a href="/" className="mb-4 text-2xl font-medium  p-4 inline-block text-black transition duration-300 hover:text-gray-300 dark:text-gray-300 dark:hover:text-white md:mb-0">
          
              Geeks Hub
           
          </a>
        
          <button
            className="px-3 py-1 pb-4 ml-auto text-black outline-none dark:text-gray-300 md:hidden"
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="3" y1="6" y2="6" x2="21"></line>
              <line x1="3" y1="12" y2="12" x2="21"></line>
              <line x1="3" y1="18" y2="18" x2="21"></line>
            </svg>
          </button>
        </div>
        <div
          className={
            "md:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <div className="flex flex-wrap items-center justify-center pt-1 pl-2 ml-1 space-x-8 md:space-x-16 md:mx-auto md:pl-14">
            <a
              href="/#features"
              className="text-black transition duration-300 dark:text-gray-300 hover:text-gray-300"
            >
              Features
            </a>
            <a
              href="/#pricing"
              className="text-black transition duration-300 dark:text-gray-300 hover:text-gray-300"
            >
              Pricing
            </a>
            <a href={"contact"} className="text-black transition duration-300 dark:text-gray-300 hover:text-gray-300"  >
              
                Contact
             
            </a>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="invisible dark:hover:border-gray-500 hover:shadow-md transition duration-300 mr-4 text-black border px-3 py-1.5 rounded dark:text-gray-300 md:visible"
          >
            Sign in
          </button>

          <a
            href="signup"
            rel="noopener noreferrer"
            className="invisible md:visible px-3 py-1.5 transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black bg-black dark:bg-white rounded"
          >
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}
