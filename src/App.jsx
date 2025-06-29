import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HomePage from "./pages/HomePage/HomePage";
import SecNav from "./components/Nav/SecNav";
import MainNav from "./components/Nav/MainNav";
import Footer from "./components/Footer/Footer";
import ResearchAll from "./pages/RsearchAll/RsearchAll";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import InternationalPro from "./pages/InterNationalP/InternationalPro";
import DiplomaProgrammes from "./components/ProgramData/DiplomaProgrammes";
import CertificatesWorkshops from "./components/ProgramData/CertificatesWorkshops";
import AllEvents from "./pages/Events/AllEvents";
import Society from "./pages/Society/Society";

import FAQ from "./components/Faq/FAQ";

import Vacancies from './pages/Vacancies/Vacancies'

import History from "./components/Submenus/History";
import Crest from "./components/Submenus/Crest";
import Vission from "./components/Submenus/Vission1";
import Organization from "./components/Submenus/Organization";
import Ranking from "./components/Submenus/Ranking";
import SearchPage from "./components/Search/SearchPage";

import MoreNotice from './pages/Events/MoreNotice'
import MoreNews from './pages/News/MoreNews'
import ViewOneNews from './pages/News/ViewOneNews'
import Publications from "./pages/Publications/Publications";



function AppContent() {
  const [showNavBar, setShowNavBar] = useState(true);
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // 🔁 Scroll detection
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }

    setIsTopOfPage(currentScrollY === 0);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ✅ AOS Initialization on route change
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, [location]);

  const shouldShowNavBar = !location.pathname.startsWith("/Dashboard");
  const shouldShowFooter = !location.pathname.startsWith("/Dashboard");

  return (
    <>
      <div className="hidden xl:block">
        <MainNav />
      </div>

      {shouldShowNavBar && (
        <div
          className={`fixed top-0 w-full z-50 transition-transform duration-300 ${showNavBar ? "translate-y-0" : "-translate-y-full"
            } ${isTopOfPage ? "xl:mt-28" : "shadow-md"}`}
        >
          <SecNav />
        </div>
      )}

      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/RsearchAll" element={<ResearchAll />} />
        <Route path="/InternationalProgrammes" element={<InternationalPro />} />
        <Route path="/diplomas" element={<DiplomaProgrammes />} />
        <Route path="/certificates" element={<CertificatesWorkshops />} />
        <Route path="/AllEvents" element={<AllEvents />} />
        <Route path="/Societies" element={<Society />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/History" element={<History />} />
        <Route path="/Crest" element={<Crest />} />
        <Route path="/Vission" element={<Vission />} />
        <Route path="/Organization" element={<Organization />} />
        <Route path="/Ranking" element={<Ranking />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/Vacancies" element={<Vacancies />} />
        <Route path="/Notices" element={<MoreNotice />} />
        <Route path="/News" element={<MoreNews />} />
        <Route path="/ViewOneNews/:id" element={<ViewOneNews />} />
        <Route path="/Publications" element={<Publications /> } />
      </Routes>

      {shouldShowFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
