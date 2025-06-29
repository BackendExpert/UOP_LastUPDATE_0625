import { useState, useEffect } from "react";
import axios from "axios";

export default function FAQ() {
  const [faqData, setFaqData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API}/faq.php`, {
          params: { action: "getallfaqs" },
          headers: { "Content-Type": "application/json" },
        });

        if (res.data.Status === "Success") {
          setFaqData(res.data.Result);
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      }
    };

    fetchFAQs();
  }, []);

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBotSearch = () => {
    const match = faqData.find((faq) =>
      faq.question.toLowerCase().includes(query.toLowerCase())
    );
    setResponse(match ? match.answer : "Sorry, I couldn't find an answer to that.");
  };

  const handleCardClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center text-[#032B44] mt-12 mb-8">
        Frequently Asked Questions... <span className="text-[#333]">Get answers to your questions!</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-[#C5E1F5] to-[#F7F7F7] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#333] mb-4">
            <i className="fas fa-question-circle"></i> Ask a Question
          </h2>
          <input
            type="text"
            className="w-full p-3 border-2 rounded-md border-[#ddd]"
            placeholder="Type your question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleBotSearch}
            className="w-full bg-[#032B44] text-white py-2 rounded-md hover:bg-[#044A8F] transition mt-2"
          >
            <i className="fas fa-search"></i> Ask
          </button>
          {response && (
            <p className="mt-4 text-[#333]">
              <i className="fas fa-check-circle"></i> {response}
            </p>
          )}
        </div>

        <div className="bg-gradient-to-r from-[#C5E1F5] to-[#F7F7F7] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#333] mb-4">
            <i className="fas fa-search"></i> Search FAQs
          </h2>
          <input
            type="text"
            className="w-full p-3 border-2 rounded-md border-[#ddd]"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
        {filteredFAQs.map((faq, index) => (
          <div
            key={faq.id}
            className={`bg-gradient-to-r from-[#bcdfec] to-[#8bc1ee] rounded-lg shadow-lg p-6 cursor-pointer ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => handleCardClick(index)}
          >
            <h3 className="text-lg font-bold text-[#032B44] mb-2">
              <i className="fas fa-question-circle"></i> {faq.question}
            </h3>
            {activeIndex === index && (
              <p className="text-[#333] bg-white p-4 rounded-lg shadow-md">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
