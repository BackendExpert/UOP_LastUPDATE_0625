import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, AlertCircle } from 'lucide-react';

const Vacancies = () => {
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedId, setExpandedId] = useState(null); // Track which vacancy is expanded

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + "/vacancies.php", {
            params: { action: "getallVacancies" },
            headers: { "Content-Type": "application/json" },
        })
            .then(res => {
                if (res.data.Result) {
                    setVacancies(res.data.Result);
                } else {
                    setVacancies([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load vacancies.");
                setVacancies([]);
                setLoading(false);
            });
    }, []);

    // Helper to strip numeric timestamp prefix from filename
    const removePrefix = (filename) => {
        if (!filename) return "";
        return filename.replace(/^\d+_/, "");
    };

    const toggleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 mt-12">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Current Vacancies</h1>

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="animate-spin text-gray-500 w-6 h-6" />
                    <span className="ml-2 text-gray-500">Loading...</span>
                </div>
            ) : error ? (
                <div className="flex justify-center items-center text-red-500">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {error}
                </div>
            ) : vacancies.length === 0 ? (
                <p className="text-center text-gray-600">No vacancies available at this time.</p>
            ) : (
                <div className="grid gap-6">
                    {vacancies.map((vacancy) => (
                        <div
                            key={vacancy.id}
                            className="border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition cursor-pointer"
                            onClick={() => toggleExpand(vacancy.id)}
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{vacancy.title}</h2>
                            <p className="text-sm text-gray-600 mt-2">
                                <strong>Closing Date:</strong> {new Date(vacancy.closingdate).toLocaleDateString()}
                            </p>

                            {expandedId === vacancy.id && (
                                <div className="mt-4 border-t border-gray-300 pt-4 text-gray-700">
                                    <p className="whitespace-pre-wrap mb-4">{vacancy.desc || "No description available."}</p>

                                    <div className="space-x-4">
                                        {vacancy.notice ? (
                                            <a
                                                href={`${import.meta.env.VITE_APP_API}/uploads/${removePrefix(vacancy.notice)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline text-sm"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                Download Notice
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 text-sm">No Notice available</span>
                                        )}

                                        {vacancy.application ? (
                                            <a
                                                href={`${import.meta.env.VITE_APP_API}/uploads/${removePrefix(vacancy.application)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline text-sm"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                Download Application
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 text-sm">No Application available</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Vacancies;
