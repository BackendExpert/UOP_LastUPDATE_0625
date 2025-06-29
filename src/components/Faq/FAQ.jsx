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
    <div className="max-w-7xl mx-auto px-8 py-20 space-y-14">
      <h1 className="text-5xl font-extrabold text-center text-[#032B44] tracking-wide">
        Frequently Asked Questions
        <span className="block mt-3 text-xl font-normal text-gray-600">
          Get answers to your questions!
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Ask a Question */}
        <section className="bg-white shadow-xl rounded-2xl p-10 flex flex-col transition-transform hover:scale-[1.02] duration-300">
          <h2 className="text-3xl font-semibold text-[#032B44] mb-8 flex items-center gap-4">
            <i className="fas fa-robot text-[#044A8F] text-2xl"></i> Ask a Question
          </h2>
          <input
            type="text"
            className="w-full rounded-xl border border-gray-300 px-6 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#044A8F] transition shadow-sm"
            placeholder="Type your question here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleBotSearch()}
            aria-label="Ask a question"
          />
          <button
            onClick={handleBotSearch}
            className="mt-7 bg-[#044A8F] hover:bg-[#032B44] text-white font-semibold rounded-xl py-4 text-lg transition flex justify-center items-center gap-3 shadow-lg"
            aria-label="Submit question"
          >
            <i className="fas fa-paper-plane"></i> Ask
          </button>
          {response && (
            <div className="mt-8 bg-[#E6F0FA] border border-[#044A8F] rounded-xl p-6 text-[#032B44] shadow-md flex items-start gap-3">
              <i className="fas fa-comment-alt text-[#044A8F] text-xl mt-1"></i>
              <p className="whitespace-pre-line">{response}</p>
            </div>
          )}
        </section>

        {/* Search FAQs */}
        <section className="bg-white shadow-xl rounded-2xl p-10 flex flex-col transition-transform hover:scale-[1.02] duration-300">
          <h2 className="text-3xl font-semibold text-[#032B44] mb-8 flex items-center gap-4">
            <i className="fas fa-search text-[#044A8F] text-2xl"></i> Search FAQs
          </h2>
          <input
            type="text"
            className="w-full rounded-xl border border-gray-300 px-6 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#044A8F] transition shadow-sm"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search FAQs"
          />
          {searchTerm && filteredFAQs.length === 0 && (
            <p className="mt-6 text-gray-500 italic text-center">No FAQs found matching your search.</p>
          )}
        </section>
      </div>

      {/* FAQ List */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredFAQs.map((faq, index) => (
          <article
            key={faq.id}
            onClick={() => handleCardClick(index)}
            className={`relative bg-white rounded-2xl shadow-xl cursor-pointer p-8 border transition
              hover:shadow-2xl hover:border-[#044A8F] ${
                activeIndex === index ? "border-[#044A8F]" : "border-transparent"
              }`}
            aria-expanded={activeIndex === index}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleCardClick(index);
            }}
          >
            <h3 className="flex items-center gap-4 text-[#032B44] font-semibold text-xl">
              <i className="fas fa-question-circle text-[#044A8F]"></i> {faq.question}
            </h3>

            <div
              className={`mt-5 text-gray-700 max-h-0 overflow-hidden transition-[max-height] duration-400 ease-in-out
                ${activeIndex === index ? "max-h-[24rem]" : ""}`}
              aria-hidden={activeIndex !== index}
            >
              <p className="whitespace-pre-line leading-relaxed">{faq.answer}</p>
            </div>

            <span
              className={`absolute top-8 right-8 text-[#044A8F] transition-transform duration-300 ease-in-out select-none pointer-events-none ${
                activeIndex === index ? "rotate-45" : ""
              }`}
              aria-hidden="true"
            >
              <i className="fas fa-plus fa-lg"></i>
            </span>
          </article>
        ))}
      </section>
    </div>
  );
}
