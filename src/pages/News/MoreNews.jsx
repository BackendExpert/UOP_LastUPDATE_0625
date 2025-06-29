import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoreNews = () => {
    const [newsdata, setNewsdata] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_API}/news.php`, {
                    params: { action: "getallNEWS" },
                    headers: { "Content-Type": "application/json" },
                });

                if (res.data.Result && Array.isArray(res.data.Result)) {
                    const filtered = res.data.Result.filter(
                        (item) => item.is_active === 1 || item.is_active === '1'
                    );

                    const sorted = filtered.slice().sort((a, b) => {
                        return new Date(b.notice_date) - new Date(a.notice_date);
                    });

                    setNewsdata(sorted);
                } else {
                    setNewsdata([]);
                }
            } catch (err) {
                console.error('Error fetching news:', err);
                setNewsdata([]);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="my-32 px-4 md:px-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#7c340c]">Latest News</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {newsdata.map((data, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
                    >
                        {/* Remove image if not available */}
                        <img
                            src={`${import.meta.env.VITE_APP_API}/${data.news_img || 'default-image.jpg'}`}
                            alt={data.notice_title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-[#7c340c] mb-2">{data.notice_title}</h3>
                            <p className="text-gray-600 text-sm line-clamp-3">{data.notice_desc}</p>
                            <a
                                href={`/ViewOneNews/${data.id}`}
                                rel="noopener noreferrer"
                                className="inline-block mt-3 text-[#e5bc11] font-medium hover:underline"
                            >
                                Read more →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MoreNews;
