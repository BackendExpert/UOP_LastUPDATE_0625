import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('query')?.trim() || '';

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) {
            setResults([]);
            setError(null);
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(import.meta.env.VITE_APP_API + '/search.php', {
                    params: {
                        action: 'search',
                        query: query,
                    },
                    signal: controller.signal,
                });

                if (response.data.error) {
                    setError(response.data.error);
                    setResults([]);
                } else if (Array.isArray(response.data)) {
                    setResults(response.data);
                } else {
                    setError('Unexpected response format.');
                    setResults([]);
                }
            } catch (err) {
                if (axios.isCancel(err)) {
                    // Request was cancelled, no need to update state
                    return;
                }
                setError('Failed to fetch search results.');
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();

        return () => {
            controller.abort(); // Cancel request on component unmount or query change
        };
    }, [query]);

    return (
        <main className="p-6 my-24 mx-auto max-w-5xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                Search results for: <span className="text-indigo-600">"{query}"</span>
            </h1>

            {loading && (
                <p role="status" aria-live="polite" className="text-center text-gray-500 text-lg">
                    Loading results...
                </p>
            )}

            {!loading && error && (
                <p role="alert" className="text-center text-red-500 text-lg">
                    {error}
                </p>
            )}

            {!loading && !error && results.length === 0 && query && (
                <p className="text-center text-gray-500 text-lg">No results found.</p>
            )}

            {!loading && !error && results.length > 0 && (
                <ul className="space-y-6">
                    {results.map(({ title, link, snippet }, index) => (
                        <li
                            key={index}
                            className="p-6 rounded-2xl border shadow hover:shadow-lg transition bg-white"
                        >
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="text-xl font-semibold text-indigo-700 hover:underline break-words"
                            >
                                {title}
                            </a>
                            {snippet && <p className="text-gray-700 mt-2 text-base">{snippet}</p>}
                            <p className="mt-1 text-sm text-gray-500 break-words">{link}</p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default SearchResults;
