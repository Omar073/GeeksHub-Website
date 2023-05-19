import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Features from './components/Features';
import Pricing from './components/Pricing';

function LandingPage() {
    return (
        <div className="bg-gray-100">
            <Header />
            <section className="py-16 px-4 bg-gradient-to-br from-indigo-500 to-purple-600 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between">
                        <img className="h-12" src="../logoalt.png" alt="Logo" />
                        <div className="text-right">
                            <Link
                                to="/signup"
                                className="px-6 py-3 text-lg font-medium text-white bg-indigo-700 rounded-md shadow-md hover:bg-indigo-800"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/login"
                                className="px-6 py-3 ml-4 text-lg font-medium text-white transition duration-300 border border-white rounded-md shadow-md hover:bg-white hover:text-indigo-700"
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
                            Join the hub of innovation and collaboration at{' '}
                            <span className=" to-blue-400 text-indigo-300 transition-all duration-300 hover:text-white hover:text-7xl hover">
                                Geeks Hub
                            </span>

                        </h1>
                        <p className="mt-6 max-w-xl mx-auto text-xl text-white">
                            Geeks Hub is a co-working space that caters to tech enthusiasts seeking a collaborative and innovative workspace. It provides all necessary amenities for a productive work environment, including high-speed internet, comfortable workstations, and private meeting rooms.
                        </p>
                    </div>
                </div>

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-blue-600 bg-opacity-5 pointer-events-none"></div>

            </section>
            <section className="relative">
                <div className="max-w-5xl mx-auto py-16">
                    <div className="flex items-center justify-center">
                        <img
                            className="w-full max-w-7xl shadow-md rounded-lg shadow-md"
                            src="../place.png"
                            alt="Workspace"
                        />
                    </div>
                    <p className="mt-8 text-xl text-center text-gray-600">Work smarter, not harder at Geeks Hub</p>
                </div>
            </section>
            <Features />
            <Pricing />
            <Footer />
        </div>
    );
}

export default LandingPage;
