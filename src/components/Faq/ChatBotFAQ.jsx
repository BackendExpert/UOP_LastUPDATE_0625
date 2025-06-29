import { useState } from "react";
import { faqData } from "../Faq/faqData";

export default function ChatBotFAQ() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);

  const handleSearch = () => {
    const match = faqData.find(faq =>
      faq.question.toLowerCase().includes(query.toLowerCase())
    );
    setResponse(match ? match.answer : "Sorry, I couldn't find an answer to that.");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Ask our FAQ Bot</h2>
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        placeholder="Type your question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Ask
      </button>
      {response && <p className="mt-3 text-gray-800">{response}</p>}
    </div>
  );
}
