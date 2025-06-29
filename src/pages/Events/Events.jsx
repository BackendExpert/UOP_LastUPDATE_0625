import React, { useState, useEffect } from 'react';
import useEventData from '../../components/Events/EventData';

const Events = () => {
    const eventdata = useEventData();
    const [visibleEvents, setVisibleEvents] = useState([]);

    useEffect(() => {
        const updateVisibleEvents = () => {
            const screenWidth = window.innerWidth;
            const today = new Date();
            today.setHours(0, 0, 0, 0); // normalize

            const acceptedAndUpcomingEvents = eventdata.filter(event => {
                const eventDate = new Date(event.event_date);
                eventDate.setHours(0, 0, 0, 0); // normalize
                const accepted = Number(event.is_accepted) === 1;
                const isFuture = eventDate >= today;

                return accepted && isFuture;
            });

            const sorted = [...acceptedAndUpcomingEvents].sort(
                (a, b) => new Date(b.event_date) - new Date(a.event_date)
            );

            if (screenWidth >= 1280) {
                setVisibleEvents(sorted.slice(0, 6));
            } else if (screenWidth < 768) {
                setVisibleEvents(sorted.slice(0, 1));
            } else {
                setVisibleEvents(sorted.slice(0, 6));
            }
        };

        updateVisibleEvents();
        window.addEventListener('resize', updateVisibleEvents);
        return () => window.removeEventListener('resize', updateVisibleEvents);
    }, [eventdata]);

    return (
        <div>
            <h1 className="text-2xl font-semibold uppercase text-[#560606] mt-4">Events</h1>

            {visibleEvents.length === 0 ? (
                <div className="text-center text-gray-600 mt-8">No upcoming events available.</div>
            ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
                    {visibleEvents.map((event, index) => {
                        const date = new Date(event.event_date);
                        const year = date.getFullYear();
                        const month = date.toLocaleString("en-US", { month: "long" });
                        const day = date.getDate();

                        return (
                            <div
                                key={index}
                                data-aos="zoom-in"
                                className="relative group rounded shadow-xl overflow-hidden h-96"
                            >
                                <div
                                    style={{ backgroundImage: `url(${import.meta.env.VITE_APP_API}/${event.event_img})` }}
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                ></div>

                                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-70 transition duration-500"></div>

                                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 transition-opacity duration-500 group-hover:opacity-0">
                                    <h2 className="text-white text-xl font-bold">{event.event_title}</h2>
                                </div>

                                <div className="absolute inset-0 flex items-center z-20">
                                    <div className="transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-black bg-opacity-80 text-white p-6 w-full h-full flex flex-col justify-center">
                                        <p className="text-sm mb-2">{`${day} ${month}, ${year}`}</p>
                                        <p className="text-sm mb-4">{event.envet_desc}</p>
                                        <a
                                            href={event.event_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-yellow-300 font-semibold text-sm hover:underline"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <center>
                <a href="/AllEvents">
                    <button className="bg-[#e8b910] py-2 px-8 rounded font-semibold duration-500 hover:px-4 hidden xl:block mt-8">
                        More Events
                    </button>
                </a>
            </center>
        </div>
    );
};

export default Events;
