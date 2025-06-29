import React, { useEffect, useState } from "react";
import axios from "axios";

const Publications = () => {
    const [groupedData, setGroupedData] = useState({});
    const [selectedType, setSelectedType] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    // Fixed publication types you want always shown
    const fixedTypes = [
        "Annual Reports",
        "Journals",
        "Newsletters",
        "Sustainability Reports",
        "Statistical Handbooks",
    ];

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_APP_API}/publications.php?action=getPublications`)
            .then((res) => {
                if (res.data.Status === "Success") {
                    const grouped = {};
                    res.data.Result.forEach((item) => {
                        if (!grouped[item.pub_type]) grouped[item.pub_type] = {};
                        if (!grouped[item.pub_type][item.year]) grouped[item.pub_type][item.year] = [];
                        grouped[item.pub_type][item.year].push(item);
                    });
                    setGroupedData(grouped);
                }
            })
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-sky-50 to-indigo-50 p-4 pt-20 flex flex-col">
            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-indigo-700 text-center mb-8 tracking-wide drop-shadow-md">
                Publications
                <span className="block h-1 w-24 bg-indigo-600 mx-auto mt-2 rounded-full"></span>
            </h1>

            <div className="flex flex-col md:flex-row flex-grow gap-6">
                {/* Left Sidebar */}
                <aside className="bg-white rounded-3xl shadow-lg p-6 overflow-y-auto md:w-1/3 md:max-h-[70vh] md:sticky md:top-32">
                    <h2 className="text-xl font-semibold text-indigo-700 mb-6 border-b border-indigo-300 pb-2 select-none">
                        Publication Types
                    </h2>

                    {/* Show message if no data at all */}
                    {Object.keys(groupedData).length === 0 && (
                        <p className="text-gray-500 text-sm">No publications available.</p>
                    )}

                    {/* Render fixed types as main buttons */}
                    {fixedTypes.map((type) => (
                        <div key={type} className="mb-4">
                            <button
                                onClick={() => {
                                    setSelectedYear(null);
                                    setSelectedType(type === selectedType ? null : type);
                                }}
                                className={`w-full text-left px-5 py-3 rounded-2xl font-semibold text-lg transition
                  ${selectedType === type
                                        ? "bg-indigo-600 text-white shadow-md"
                                        : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                                    }
                `}
                            >
                                {type}
                                {selectedType === type && (
                                    <span className="float-right text-xl select-none">▾</span>
                                )}
                            </button>

                            {/* Show years only if this type exists in groupedData */}
                            {selectedType === type && groupedData[type] && (
                                <div className="mt-3 ml-6 space-y-2">
                                    {Object.keys(groupedData[type]).map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => setSelectedYear(year)}
                                            className={`block px-4 py-1 rounded-lg text-sm w-full text-left font-medium transition
                        ${selectedYear === year
                                                    ? "bg-indigo-500 text-white shadow"
                                                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                                                }
                      `}
                                        >
                                            {year}
                                            {selectedYear === year && (
                                                <span className="float-right text-base select-none">→</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </aside>

                {/* Right Content Area */}
                <section className="bg-white rounded-3xl shadow-lg p-6 flex-grow md:w-2/3 md:max-h-[70vh] md:overflow-y-auto">
                    <h2 className="text-3xl font-bold text-indigo-800 mb-6 select-none">
                        {selectedType && selectedYear
                            ? `${selectedType} — ${selectedYear}`
                            : "Please select a publication type and year"}
                    </h2>

                    {selectedType && selectedYear ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedData[selectedType] &&
                                groupedData[selectedType][selectedYear] &&
                                groupedData[selectedType][selectedYear].map((pub, index) => (
                                    <article
                                        key={index}
                                        className="border border-indigo-200 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer bg-white flex flex-col"
                                    >
                                        {/* Cover Image */}
                                        <div className="w-full h-48 overflow-hidden rounded-t-xl">
                                            {pub.coverimge ? (
                                                <img
                                                    src={`${import.meta.env.VITE_APP_API}/${pub.coverimge}`}
                                                    alt="Cover"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-500 text-sm italic">
                                                    No Cover Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="text-lg font-semibold text-indigo-700">
                                                {pub.pub_name}
                                            </h3>
                                            <p className="mt-2 text-gray-700 text-sm flex-grow">{pub.desc}</p>

                                            {pub.file && (
                                                <a
                                                    href={`${import.meta.env.VITE_APP_API}/${pub.file}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-block mt-4 text-indigo-600 font-semibold hover:underline text-sm"
                                                >
                                                    View PDF
                                                </a>
                                            )}
                                        </div>
                                    </article>
                                ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">
                            Select a category and year to view publications.
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Publications;
