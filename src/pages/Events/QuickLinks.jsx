import React from 'react'
import { quickLinks } from '../../components/Footer/FooterData'
import { FaLink, FaSquareFacebook, FaXTwitter, FaYoutube, FaLinkedin } from "react-icons/fa6";


const QuickLinks = () => {
    const icons = [
        { 
            Component: FaSquareFacebook, 
            defaultColor: "text-blue-600", 
            link: "https://www.facebook.com/UniversityOfPeradeniya" 
        },
        { 
            Component: FaXTwitter, 
            defaultColor: "text-black", 
            link: "https://www.twitter.com" 
        },
        { 
            Component: FaYoutube, 
            defaultColor: "text-red-600", 
            link: "https://www.youtube.com/@webteamuop2944/videos" 
        },
        { 
            Component: FaLinkedin, 
            defaultColor: "text-blue-700", 
            link: "https://www.linkedin.com" 
        }
    ];
    
    return (
        <div>
            <h1 className="text-center text-2xl font-semibold uppercase text-[#560606] ">Quick Links</h1>
            {/* <div className="flex justify-around my-8">
                {icons.map(({ Component, defaultColor, link }, index) => (
                    <div key={index} className="group">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <Component className={`h-8 w-auto ${defaultColor} group-hover:text-[#560606] transition-colors duration-300`} />
                        </a>
                    </div>
                ))}  
            </div> */}


            <div data-aos="zoom-in" className="my-4 mx-4 shadow-xl">
                {
                    quickLinks.map((quicklink, index) => {
                        return (
                            <div className="" key={index}>
                                <a href={quicklink.link} className=''>
                                    <div data-tooltip-target="tooltip-top" data-tooltip-placement="top" className="bg-white rounded-xl flex p-4 border-b border-[#560606]/20 duration-500 hover:bg-[#e8b910] hover:text-[#560606]" >
                                        <div className="mt-2"><FaLink className='h-4 w-auto' /> </div>
                                        <h1 className="text-lg pl-2">{quicklink.name} </h1>
                                    </div>
                                </a>

                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default QuickLinks