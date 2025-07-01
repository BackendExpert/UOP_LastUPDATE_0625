import React, { useEffect, useState } from "react";
import axios from "axios";

const Publications = () => {
    const [groupedData, setGroupedData] = useState({});
    const [selectedType, setSelectedType] = useState(null);

    const fixedTypes = [
        "Annual Reports",
        "Journals",
        "Newsletters",
        "Sustainability Reports",
        "Statistical Handbooks",
        "Digital Library",
        "University Calendar",
        "Centenary Development Plan",
        "Action Plan"
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
            <h1 className="text-4xl font-extrabold text-[#560606] text-center mb-8 tracking-wide drop-shadow-md">
                Publications
                <span className="block h-1 w-24 bg-[#560606] mx-auto mt-2 rounded-full"></span>
            </h1>

            <div className="flex flex-col md:flex-row flex-grow gap-6">
                {/* Left Sidebar */}
                <div className="bg-white rounded-3xl shadow-lg p-6 md:w-1/3 md:sticky md:top-32">
                    <h2 className="text-xl font-semibold text-[#560606] mb-6 border-b border-[#560606] pb-2 select-none">
                        Publication Types
                    </h2>

                    {Object.keys(groupedData).length === 0 && (
                        <p className="text-gray-500 text-sm">No publications available.</p>
                    )}

                    {fixedTypes.map((type) => (
                        <div key={type} className="mb-4">
                            <button
                                onClick={() => {
                                    setSelectedType(type === selectedType ? null : type);
                                }}
                                className={`w-full text-left px-5 py-3 rounded-2xl font-semibold text-lg transition
                                    ${selectedType === type
                                        ? "bg-[#560606] text-white shadow-md"
                                        : "bg-[#f5eaea] text-[#560606] hover:bg-[#eddada]"
                                    }
                                `}
                            >
                                {type}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right Content Area */}
                <section className="bg-white rounded-3xl shadow-lg p-6 flex-grow md:w-2/3 md:max-h-[70vh] md:overflow-y-auto">
                    <h2 className="text-3xl font-bold text-[#560606] mb-6 select-none">
                        {selectedType
                            ? selectedType
                            : "Please select a publication type"}
                    </h2>

                    {selectedType ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedData[selectedType] &&
                                Object.values(groupedData[selectedType])
                                    .flat()
                                    .map((pub, index) => (
                                        <article
                                            key={index}
                                            className="border border-[#e0bcbc] rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer bg-white flex flex-col"
                                        >
                                            <div className="w-full h-64 overflow-hidden rounded-t-xl">
                                                {pub.coverimge ? (
                                                    <img
                                                        src={`${import.meta.env.VITE_APP_API}/${pub.coverimge}`}
                                                        alt="Cover"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-[#f7e5e5] flex items-center justify-center text-[#560606] text-sm italic">
                                                        No Cover Image
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-4 flex flex-col flex-grow">
                                                <a href={`${import.meta.env.VITE_APP_API}/${pub.file}`}
                                                    target="_blank"
                                                >
                                                    <h3 className="text-lg font-semibold text-[#560606] hover:underline">
                                                        {pub.pub_name} - {pub.year}
                                                    </h3>
                                                </a>
                                                <p className="text-right text-sm mt-4 text-[#560606]">{pub.upload_at}</p>
                                            </div>
                                        </article>
                                    ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">
                            Select a category to view publications.
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Publications;
