import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faTwitter,
    faYoutube,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';

function NavBar() {
    return (
        <header>
            <div className="bg-[#002147] text-white py-3 px-6 flex flex-wrap items-center justify-between">
                {/* Left: Logo & Institute Name */}
                <div className="flex items-center space-x-4">
                    <img src="/manit_sm.png" alt="MANIT Logo" className="h-10 w-auto" />
                    <div>
                        <h1 className="text-lg font-semibold">MANIT BHOPAL</h1>
                        <p className="text-xs md:text-sm">
                            Maulana Azad National Institute of Technology
                        </p>
                    </div>
                </div>
                {/* Right: External Link */}
                <div className="flex items-center space-x-6 mt-2 md:mt-0">
                    <a
                        href="https://www.manit.ac.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center text-yellow-400 hover:text-blue-200 transition-colors duration-200"
                    >
                        <span>MANIT</span>
                        {/* Lucide External Link Icon */}
                        <i data-lucide="external-link" className="ml-1" width="14" height="14"></i>
                    </a>
                </div>
            </div>
            {/* Optional Tagline (currently commented out) */}
            {/*
      <div className="flex justify-center items-center bg-[#1F3C5D] text-yellow-400 font-semibold text-sm tracking-wide py-4 md:text-center">
        Analyze, Automate & Generate
      </div>
      */}
        </header>
    );
}

function Footer() {
    return (
        <footer className="bg-gradient-to-b from-black to-[#1a1a1a] text-white pt-5 pb-1 text-xs relative">
            <div
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-50"
            ></div>

            <div className="container mx-auto px-2 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                    {/* CONTACT US */}
                    <div className="transform hover:scale-105 transition-transform duration-300">
                        <h2 className="text-base font-bold mb-1 text-blue-400 tracking-wide">
                            CONTACT US
                        </h2>
                        <div className="space-y-1 text-gray-300 hover:text-white transition-colors duration-200">
                            <p className="flex flex-col sm:flex-row items-start">
                                <i data-lucide="map-pin" className="w-3.5 h-3.5 mr-1 flex-shrink-0"></i>
                                <span>
                                    Link Road Number 3, Near Kali Mata Mandir, Bhopal, Madhya Pradesh, India 462003
                                </span>
                            </p>
                            <p className="flex items-center">
                                <i data-lucide="phone" className="w-3.5 h-3.5 mr-1"></i>
                                <span>+91 755 4051000, 4052000</span>
                            </p>
                            <p className="flex items-center">
                                <i data-lucide="printer" className="w-3.5 h-3.5 mr-1"></i>
                                <span>+91-755 2670562</span>
                            </p>
                        </div>
                    </div>
                    {/* GET IN TOUCH */}
                    <div className="transform hover:scale-105 transition-transform duration-300">
                        <h2 className="text-base font-bold mb-1 text-blue-400 tracking-wide">
                            GET IN TOUCH
                        </h2>
                        <div className="space-y-1 text-gray-300 hover:text-white transition-colors duration-200">
                            <p className="flex items-center">
                                <i data-lucide="mail" className="w-3.5 h-3.5 mr-1"></i>
                                <span>pro[at]manit[dot]ac[dot]in</span>
                            </p>
                            <p className="flex items-center">
                                <i data-lucide="at-sign" className="w-3.5 h-3.5 mr-1"></i>
                                <span>officeofdirector[at]manit[dot]ac[dot]in</span>
                            </p>
                            <p className="flex items-center">
                                <i data-lucide="globe" className="w-3.5 h-3.5 mr-1"></i>
                                <a
                                    href="https://www.manit.ac.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline"
                                >
                                    www.manit.ac.in
                                </a>
                            </p>
                        </div>
                    </div>
                    {/* FOLLOW US */}
                    <div className="text-center md:text-left">
                        <h2 className="text-base font-bold mb-1 text-blue-400 tracking-wide">
                            FOLLOW US
                        </h2>
                        <div className="flex justify-center md:justify-start space-x-3">
                            <a
                                href="https://www.facebook.com/people/MANIT-Bhopal/100057525636119/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center transform hover:scale-110 hover:bg-blue-500 transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={faFacebookF} className="text-white text-xs" />
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UCXzZC99puUZuJDiQ09p72cw"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center transform hover:scale-110 hover:bg-red-500 transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={faYoutube} className="text-white text-xs" />
                            </a>
                            <a
                                href="https://twitter.com/manitbpl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center transform hover:scale-110 hover:bg-blue-300 transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={faTwitter} className="text-white text-xs" />
                            </a>
                            <a
                                href="https://www.instagram.com/manitbhopl/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center transform hover:scale-110 hover:from-purple-500 hover:to-pink-400 transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={faInstagram} className="text-white text-xs" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-1 mt-1 border-t border-gray-700/50 text-center">
                    <p className="text-yellow-400 hover:text-white transition-colors duration-200">
                        © {new Date().getFullYear()} MANIT Bhopal. All Rights Reserved |{' '}
                        <a href="#" className="ml-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                            Terms
                        </a>{' '}
                        and{' '}
                        <a href="#" className="ml-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                            Privacy
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

function Landing() {
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize Lucide icons after the component mounts.
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, []);

    // Function to handle navigation to login page
    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main
                className="flex-1 flex flex-col items-center justify-center relative"
                style={{
                    backgroundImage: 'url("/bg1.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 text-center text-white mb-16 px-4">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">WELCOME TO MANIT</h1>
                    <h2 className="text-4xl md:text-5xl font-semibold mb-2">ATTENDANCE</h2>
                    <h3 className="text-3xl md:text-4xl font-semibold">MANAGEMENT PORTAL</h3>
                </div>

                <div className="relative z-10 flex flex-wrap gap-8 justify-center">
                    <div
                        onClick={goToLogin}
                        className="bg-black/70 hover:bg-black/80 backdrop-blur-sm border border-white/20 p-6 rounded-lg shadow-lg transition-all duration-300 w-64 text-center cursor-pointer"
                    >
                        <h3 className="text-2xl font-semibold text-white mb-2">
                            Attendance Management
                        </h3>
                    </div>
                    <div
                        onClick={goToLogin}
                        className="bg-black/70 hover:bg-black/80 backdrop-blur-sm border border-white/20 p-6 rounded-lg shadow-lg transition-all duration-300 w-64 text-center cursor-pointer"
                    >
                        <h3 className="text-2xl font-semibold text-white mb-2">
                            Attendance Report Generation
                        </h3>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Landing;
