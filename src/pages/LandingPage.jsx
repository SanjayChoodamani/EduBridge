import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Video from '../assets/video.mp4'
import ReactPlayer from 'react-player'
import Footer from '../components/Footer';
import TestimonialCarousel from '../components/TestimonialCarousel';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigationLinks = [
    ];

    return (
        <div className="overflow-x-hidden bg-gray-50">
            <div className="py-4 md:py-6">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0 flex items-center">
                            <a href="#" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                                <img className="w-auto h-16 rounded-full" src="/logo.png" alt="Company Logo" />
                            </a>
                            <p className="ml-4 text-lg font-bold">EduBridge</p>
                        </div>

                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="text-gray-900 p-2"
                                onClick={toggleMenu}
                                aria-expanded={isMenuOpen}
                                aria-label="Toggle navigation menu"
                            >
                                {isMenuOpen ? (
                                    <X className="w-7 h-7" />
                                ) : (
                                    <Menu className="w-7 h-7" />
                                )}
                            </button>
                        </div>

                        <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10 xl:space-x-16">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={link.href}
                                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>

                        <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">

                            <a
                                href='/dashboard'
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                                Start Learning
                            </a>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <nav className="lg:hidden">
                            <div className="px-1 py-8">
                                <div className="grid gap-y-7">
                                    {navigationLinks.map((link) => (
                                        <a
                                            key={link.title}
                                            href={link.href}
                                            className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                                        >
                                            {link.title}
                                        </a>
                                    ))}
                                    <a
                                        href="#"
                                        className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                                    >
                                        Customer Login
                                    </a>
                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                    >
                                        Sign up
                                    </a>
                                </div>
                            </div>
                        </nav>
                    )}
                </div>
            </div>

            <section className="pt-12 bg-gray-50 sm:pt-16">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="px-6 text-lg text-gray-600 font-inter">
                            An AI-Powered Learning Portal for Rural Students
                        </h1>
                        <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
                            Engaging Learning Tools for
                            <span className="relative inline-flex sm:inline">
                                <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                                <span className="relative"> students </span>
                            </span>
                        </p>

                        <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">

                            <a
                                href="/dashboard"
                                className="inline-flex items-center justify-center w-full px-6 py-3 mt-4 text-lg font-bold text-gray-900 transition-all duration-200 border-2 border-gray-400 sm:w-auto sm:mt-0 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 focus:bg-gray-900 hover:text-white focus:text-white hover:border-gray-900 focus:border-gray-900"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    stroke="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.18003 13.4261C6.8586 14.3918 5 13.448 5 11.8113V5.43865C5 3.80198 6.8586 2.85821 8.18003 3.82387L12.5403 7.01022C13.6336 7.80916 13.6336 9.44084 12.5403 10.2398L8.18003 13.4261Z"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Start Learning Today
                            </a>
                        </div>

                    </div>
                </div>

                <div className="pb-12 bg-white">
                    <div className="relative">
                        <div className="absolute inset-0 h-2/3 bg-gray-50"></div>
                        <div className="relative mx-auto">
                            <div className="lg:max-w-6xl lg:mx-auto mx-4 md:mx-8 md:max-w-md">
                                <ReactPlayer
                                    className="w-3/12 mx-auto my-10 md:w-full"
                                    url={Video}
                                    playing={true}
                                    loop={true}
                                    controls={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <TestimonialCarousel />
            <Footer />
        </div>


    );
};

export default LandingPage;