import React, { useEffect, useState } from 'react'
import useNEWSData from '../../components/News/News'
import { MdDateRange } from "react-icons/md";

const News = () => {
    const newsdata = useNEWSData()
    const [visibleNEWS, setVisibleNEWS] = useState([]);

    useEffect(() => {
        const updateVisibleNEWS = () => {
            const screenWidth = window.innerWidth;

            // Get the last 6 records (most recent first)
            const lastSixNews = newsdata.slice(0, 6);

            // Filter active news and (temporarily disable date filter)
            const today = new Date();

            const filteredNews = lastSixNews.filter(news => {

                if (news.is_active == 1) {
                    const newsDate = new Date(news.news_date);
                    
                    // Disable date filter temporarily to debug:
                    // return newsDate <= today;
                    return true; // Show all active news ignoring date for now
                }
                return false;
            });

            if (screenWidth >= 1280) { // Extra-large screens (desktop)
                setVisibleNEWS(filteredNews);
            } else if (screenWidth < 768) { // Mobile screens
                setVisibleNEWS(filteredNews.slice(0, 1));
            } else { // Medium screens (tablet)
                setVisibleNEWS(filteredNews);
            }
        };

        updateVisibleNEWS();
        window.addEventListener('resize', updateVisibleNEWS);

        return () => window.removeEventListener('resize', updateVisibleNEWS);
    }, [newsdata]);


    return (
        <div className='px-4'>
            <h1 className="font-semibold text-2xl text-[#560606] mb-1 mt-4">NEWS</h1>
            <div className="xl:flex">
                <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4">
                    {
                        visibleNEWS.map((news, index) => (
                            <div data-aos="zoom-in" className={`${index !== 0 ? 'hidden md:block' : ''} bg-white my-2 p-4 rounded shadow-xl`} key={index}>
                                <div className="">
                                    <div
                                        className="mb-2 h-60 w-auto bg-cover bg-center"
                                        style={{ backgroundImage: `url(${import.meta.env.VITE_APP_API}/${news.news_img})` }}
                                    ></div>
                                    <div className="w-full xl:my-0 my-2">
                                        <h1 className="font-semibold text-xl">{news.news_title}</h1>
                                        <div className="flex justify-between pt-2">
                                            <div className="flex">
                                                <div className=""><MdDateRange className='h-4 w-auto fill-gray-500' /></div>
                                                <p className="text-sm text-gray-500 pl-2">{news.news_date}</p>
                                            </div>
                                            <div className="">
                                                <a
                                                    href={`/ViewOneNews/${news.id}`}
                                                    rel="noopener noreferrer"
                                                    className="inline-block mt-3 text-[#e5bc11] font-medium hover:underline"
                                                >
                                                    Read more →
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="">
                <center>
                    <a href="/News">
                        <button className='bg-[#e8b910] py-2 px-8 rounded font-semibold duration-500 hover:px-4'>All NEWS</button>
                    </a>
                </center>
            </div>
        </div>
    )
}

export default News;
