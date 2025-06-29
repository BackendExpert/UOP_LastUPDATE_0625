import React from 'react'
import UopLogo from '../../assets/uoplogo.png'
import { mainNavigation, informationFor, quickLinks } from './FooterData'
import FB from '../../assets/FB.png'
import X from '../../assets/X.png'
import Youtube from '../../assets/Youtube.png'
import Linkedin from '../../assets/Linked.png'
import footerimg from '../../assets/newfooter.jpg'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <div
            className="relative block px-4 py-10 text-white bg-center bg-cover xl:px-28"
            style={{ backgroundImage: `url(${footerimg})` }}
        >
            {/* The dark overlay */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', pointerEvents: 'none' }}
            />

            {/* Content container */}
            <div className="relative max-w-[1280px] mx-auto">
                <div className="py-12 xl:py-20">
                    <div className="flex flex-wrap xl:flex-nowrap gap-10">
                        {/* Left block */}
                        <div className="w-full xl:w-1/3 flex-shrink-0">
                            <img src={UopLogo} alt="University of Peradeniya Logo" className="w-auto h-20 sm:h-24 mx-auto xl:mx-0" />

                            <div className="mt-6 text-center xl:text-left font-sans text-base tracking-wide leading-relaxed text-gray-200">
                                <p className="font-semibold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                    University of Peradeniya
                                </p>
                                <p>Peradeniya</p>
                                <p>20400</p>
                                <p>Sri Lanka</p>
                            </div>

                            <div className="mt-8 font-medium text-sm text-gray-400 space-y-1 text-center xl:text-left">
                                <p>
                                    Phone: <span className="text-yellow-400 font-semibold">+94 81 238 8301</span>
                                </p>
                                <p>
                                    Fax: <span className="text-yellow-400 font-semibold">+94 81 238 8102</span>
                                </p>
                            </div>
                        </div>

                        {/* Right block */}
                        <div className="w-full xl:w-2/3">
                            <div className="grid gap-8 xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
                                {/* Main Navigation + Location */}
                                <div className="flex flex-col justify-between">
                                    <div className="mb-8 xl:mb-0">
                                        <h2 className="text-xl font-extrabold uppercase tracking-wide bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                            Main Navigation
                                        </h2>
                                        <hr className="w-20 border-yellow-400 my-4" />
                                        <div className="space-y-3">
                                            {mainNavigation.map((item, idx) => (
                                                <ul key={idx} className="ml-6 xl:ml-0">
                                                    <a
                                                        href={item.link}
                                                        className="relative inline-block text-lg font-semibold text-gray-300 transition-all duration-300 ease-in-out hover:text-yellow-400"
                                                    >
                                                        {item.name}
                                                        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 scale-x-0 origin-left transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
                                                    </a>
                                                </ul>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-extrabold uppercase tracking-wide bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                            Location
                                        </h2>
                                        <hr className="w-20 border-yellow-400 my-4" />
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.8760289680417!2d80.59481527558846!3d7.254947514230262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae368deaaaaaaab%3A0xb5476b88282d47fb!2sUniversity%20of%20Peradeniya!5e0!3m2!1sen!2slk!4v1738049825365!5m2!1sen!2slk"
                                            className="w-full max-w-[300px] h-[190px] rounded-xl border-2 border-yellow-400 shadow-xl mx-auto xl:mx-0"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="University of Peradeniya Location"
                                        />
                                    </div>
                                </div>

                                {/* Information For */}
                                <div>
                                    <h2 className="text-xl font-extrabold uppercase tracking-wide bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                        Information For
                                    </h2>
                                    <hr className="w-20 border-yellow-400 my-4" />
                                    <div className="space-y-3 mt-6">
                                        {informationFor.map((item, idx) => (
                                            <ul key={idx} className="ml-6 xl:ml-0">
                                                <a
                                                    href={item.link}
                                                    className="relative inline-block text-lg font-semibold text-gray-300 transition-all duration-300 ease-in-out hover:text-yellow-400"
                                                >
                                                    {item.name}
                                                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 scale-x-0 origin-left transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
                                                </a>
                                            </ul>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div>
                                    <h2 className="text-xl font-extrabold uppercase tracking-wide bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                        Quick Links
                                    </h2>
                                    <hr className="w-20 border-yellow-400 my-4" />
                                    <div className="space-y-3 mt-6">
                                        {quickLinks.map((item, idx) => (
                                            <ul key={idx} className="ml-6 xl:ml-0">
                                                <a
                                                    href={item.link}
                                                    className="relative inline-block text-lg font-semibold text-gray-300 transition-all duration-300 ease-in-out hover:text-yellow-400"
                                                >
                                                    {item.name}
                                                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 scale-x-0 origin-left transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
                                                </a>
                                            </ul>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social links */}
                <div className="flex flex-col items-center space-y-6 mb-8 xl:flex-row xl:justify-center xl:space-x-12 xl:space-y-0">
                    {[{
                        href: "https://www.facebook.com/UniversityOfPeradeniya",
                        imgSrc: FB,
                        alt: "Facebook",
                        label: "Facebook",
                    },
                    {
                        href: "https://www.twitter.com",
                        imgSrc: X,
                        alt: "X Twitter",
                        label: "X",
                    },
                    {
                        href: "https://www.youtube.com/@webteamuop2944/videos",
                        imgSrc: Youtube,
                        alt: "YouTube",
                        label: "YouTube",
                    },
                    {
                        href: "https://www.linkedin.com",
                        imgSrc: Linkedin,
                        alt: "LinkedIn",
                        label: "LinkedIn",
                    },
                    ].map(({ href, imgSrc, alt, label }, idx) => (
                        <a
                            key={idx}
                            href={href}
                            className="flex items-center gap-4 transition-transform duration-300 ease-in-out hover:text-yellow-400 hover:scale-110 hover:drop-shadow-lg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={imgSrc} alt={alt} className="w-auto h-10" />
                            <span className="font-semibold text-lg tracking-wide">{label}</span>
                        </a>
                    ))}
                </div>

                {/* Footer bottom */}
                <div className="py-4 px-6 border-t border-yellow-400 text-center text-gray-300 text-base font-light tracking-wide xl:text-left">
                    <div className="max-w-[1280px] mx-auto">
                        <div>&copy; {currentYear} University of Peradeniya. All rights reserved.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
