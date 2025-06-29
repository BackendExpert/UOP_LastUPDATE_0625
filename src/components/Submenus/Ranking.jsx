import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

// Images (adjust path as needed)
import img1 from '../../assets/rank1.jpg';
import img2 from '../../assets/rank2.jpeg';
import img3 from '../../assets/rank3.jpg';
import img4 from '../../assets/rank4.jpg';

// Register Swiper modules
SwiperCore.use([Autoplay, Navigation]);

const rankingsData = {
  title: "University Rankings",
  description:
    "University of Peradeniya, the oldest, largest and most comprehensive university with nine faculties catering to nearly 14000 undergraduates and over 6000 postgraduates has been ranked number one in the country by the Times Higher Education Rankings over the last four consecutive years.",
  tableData: [
    { type: "Times Higher Education University Rankings", islandRank: 2, asiaRank: "NA", worldRank: "1001-1200" },
    { type: "Times Higher Education Impact Rankings", islandRank: 1, asiaRank: 93, worldRank: "601-800" },
    { type: "U.S. News & World Report University Rankings", islandRank: 1, asiaRank: 360, worldRank: 1121 },
    { type: "QS University Rankings", islandRank: 2, asiaRank: 350, worldRank: "1201-1400" },
    { type: "Webometrics Ranking of World Universities", islandRank: 2, asiaRank: 696, worldRank: 2016 },
    { type: "UI GreenMetric World University Rankings", islandRank: 1, asiaRank: 101, worldRank: 192 }
  ],
  highlights: [
    { text: "University of Peradeniya has been able to secure # 01 in Normalized citation impact." },
    { text: "University of Peradeniya has been ranked number 2 in Sri Lanka by Webometrics Ranking 2023." },
    { text: "University of Peradeniya received the Gold Award for the best Annual Report and Accounts 2020 in the University category." }
  ],
  sliderImages: [img1, img2, img3]
};

const RankingsPage = () => {
  return (
    <div className="container max-w-6xl px-4 py-10 mx-auto mt-16">
      <h1 className="text-4xl font-bold text-center text-indigo-800">{rankingsData.title}</h1>
      <p className="mt-4 text-lg text-justify text-gray-700">{rankingsData.description}</p>

      {/* Table */}
      <div className="mt-10 overflow-x-auto rounded-lg shadow-xl animate-fadeInUp">
        <table className="min-w-full overflow-hidden bg-white border border-gray-200 rounded-md">
          <thead>
            <tr className="text-white bg-gradient-to-r from-blue-500 to-indigo-600">
              <th className="px-6 py-3 text-sm font-bold text-left">Type of Ranking</th>
              <th className="px-6 py-3 text-sm font-bold text-left">Island Rank</th>
              <th className="px-6 py-3 text-sm font-bold text-left">Asia Rank</th>
              <th className="px-6 py-3 text-sm font-bold text-left">World Rank</th>
            </tr>
          </thead>
          <tbody>
            {rankingsData.tableData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50 hover:bg-blue-50' : 'bg-white hover:bg-blue-50'}
              >
                <td className="px-6 py-4 text-sm text-gray-800">{row.type}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{row.islandRank}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{row.asiaRank}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{row.worldRank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Highlights */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-center text-indigo-700">Ranking Highlights</h2>
        <ul className="mt-6 space-y-4 text-lg text-gray-700">
          {rankingsData.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-3 text-xl text-green-600"> *</span>
              <p>{highlight.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Slider */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-center text-indigo-700">Research Highlights</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          navigation={true}
          autoplay={{ delay: 4000 }}
          className="max-w-lg mx-auto mt-6"
        >
          {rankingsData.sliderImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Research Highlight ${index + 1}`}
                // className="object-cover w-full h-48 rounded-md shadow-md"
                className="mt-6 w-full max-w-10xl h-[300px] mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RankingsPage;
