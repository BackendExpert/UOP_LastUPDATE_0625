import React, { useEffect, useState } from 'react';
import useNoticeData from '../../components/Notice/NoticeData';
import DefaultBtn from '../../components/Buttons/DefaultBtn';

const Notice = () => {
    const noticedata = useNoticeData();

    // Filter accepted notices only
    const acceptedNotices = noticedata.filter(
        notice => notice.is_accepted === 1 || notice.is_accepted === "1"
    );

    const [visibleNotice, setVisibleNotice] = useState([]);

    useEffect(() => {
        const updateVisibleNotice = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth >= 1280) { // Extra-large screens (desktop)
                setVisibleNotice(acceptedNotices.slice(0, 5)); // Show first 5 accepted notices
            } else if (screenWidth < 768) { // Mobile screens
                setVisibleNotice(acceptedNotices.slice(0, 1)); // Show only 1 accepted notice
            } else { // Medium screens (tablet)
                setVisibleNotice(acceptedNotices.slice(0, 5)); // Show first 5 accepted notices
            }
        };

        updateVisibleNotice();
        window.addEventListener('resize', updateVisibleNotice);

        return () => window.removeEventListener('resize', updateVisibleNotice);
    }, [acceptedNotices]);

    return (
        <div className="mx-auto px-4 my-6">
            <h1 className="text-2xl font-bold uppercase text-[#560606] mb-6  pb-2">
                Notices
            </h1>

            <div className="flex flex-col space-y-6">
                {
                    visibleNotice.map((notice, index) => (
                        <div
                            data-aos="zoom-in"
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-transparent hover:border-[#560606]/40"
                        >
                            <h2 className="text-xl font-semibold text-[#2c3e50] mb-2">
                                {notice.notice_title}
                            </h2>

                            <p className="mb-2 ">
                                {notice.notice_desc}
                            </p>

                            <div className="flex justify-between items-center">
                                <a href={notice.notice_link} target="_blank" rel="noopener noreferrer">
                                    <DefaultBtn
                                        type="button"
                                        btnvalue="Read More"
                                        className="bg-[#560606] hover:bg-[#78350f] text-white px-5 py-2 rounded-md font-semibold"
                                    />
                                </a>
                                <span className="text-sm text-red-600 font-medium">
                                    {notice.notice_date}
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="text-center mt-10">
                <a href="/Notices">
                    <button className="bg-[#e8b910] hover:bg-[#d4a308] transition-colors duration-300 py-3 px-10 rounded-full font-semibold text-[#2c3e50] shadow-md">
                        More Notices
                    </button>
                </a>
            </div>
        </div>
    );
}

export default Notice;
