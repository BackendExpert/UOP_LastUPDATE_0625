import React, { useState } from 'react'
import Events from './Events'
import QuickLinks from './QuickLinks'
import Notice from './Notice'
import News from '../News/News'
import Services from './Services'
import { FaLink } from 'react-icons/fa'

const AllComponent = () => {
    const [menuflex, setMenuflex] = useState("Events")

    const handleMenuFlex = ({ name }) => {
        setMenuflex(name)
    }

    return (
        <div className="px-4 py-16 bg-gray-50 xl:px-16">
            <div className="flex flex-col xl:flex-row xl:space-x-6">
                {/* Main content */}
                <div className="flex-1">
                    {/* Menu Tabs */}
                    <div className="mb-6">
                        {/* Center tabs horizontally, reduce spacing */}
                        <div className="flex justify-center space-x-10 overflow-x-auto no-scrollbar text-[#560606] font-semibold">
                            {["Events", "News", "Notice"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => handleMenuFlex({ name: item })}
                                    className={`whitespace-nowrap text-xl sm:text-2xl cursor-pointer py-2 border-b-4 transition-colors duration-300
                    ${menuflex === item
                                            ? "border-[#560606]"
                                            : "border-transparent"
                                        }
                  `}
                                    aria-current={menuflex === item ? "page" : undefined}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        {menuflex === "Events" && <Events />}
                        {menuflex === "News" && <News />}
                        {menuflex === "Notice" && <Notice />}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="mt-10 xl:mt-0 xl:w-1/3 flex-shrink-0">
                    <div className="mx-0 xl:mx-4 mb-4 grid grid-cols-2 xl:grid-cols-1 gap-2">
                        <a href="https://ipgss.pdn.ac.lk/" className="block h-full">
                            <div className="flex items-center justify-center h-full min-h-[80px] p-4 bg-gradient-to-r from-purple-500 to-sky-400 text-white border-b border-transparent hover:from-blue-600 hover:to-sky-500 hover:border-blue-500 rounded cursor-pointer transition text-center">
                                <FaLink className="h-5 w-5 mr-2" />
                                <h1 className="text-lg font-semibold">ONLINE PAYMENTS</h1>
                            </div>
                        </a>
                        <a href="#" className="block h-full">
                            <div className="flex items-center justify-center h-full min-h-[80px] p-4 bg-gradient-to-r from-pink-500 to-sky-400 text-white border-t border-transparent hover:from-blue-600 hover:to-sky-500 hover:border-blue-500 rounded cursor-pointer transition text-center">
                                <FaLink className="h-5 w-5 mr-2" />
                                <h1 className="text-lg font-semibold">Donate Now</h1>
                            </div>
                        </a>
                    </div>


                    <div className="relative z-10">
                        <Services />
                    </div>

                    <div className="my-6 relative z-0">
                        <QuickLinks />
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default AllComponent
