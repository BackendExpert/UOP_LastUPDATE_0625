import React, { useState } from 'react';
import { programData } from '../../components/ProgramData/ProgramData';
import HorizontalScroll from './HorizontalScorll';

const Programmes = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-white py-8 xl:px-24 px-4 relative">

      <div data-aos="zoom-in" className="xl:mb-0 mb-8 w-full xl:px-16 px-8 xl:flex items-center justify-center">
        <div>
          <h1 className="uppercase text-center text-[#560606] font-semibold text-3xl mb-8">
            Study at Peradeniya
          </h1>
          <p className="mb-4 font-semibold text-center">
            The University of Peradeniya welcomes both Sri Lankan and international students to experience globally recognized education, pioneering research, and a dynamic campus environment.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mb-4 justify-between gap-2" data-aos="zoom-in">
        <div className="w-full">
          <a href="https://www.pdn.ac.lk/academics__trashed/university-admissions/">
            <button className="bg-gradient-to-r from-[#9980e5] via-[#b0a0f0] to-[#cbc3f0] text-[#000080] font-bold py-2 rounded w-full transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:bg-gradient-to-l hover:from-[#DDD6FE] hover:via-[#C4B5FD] hover:to-[#A78BFA]">
              Admission to Programmes Through the UGC
            </button>
          </a>
        </div>
        <div className="w-full">
          <a href="https://uop-inter-test.vercel.app/">
            <button className="bg-gradient-to-r from-[#9980e5] via-[#b0a0f0] to-[#cbc3f0] text-[#000080] font-bold py-2 rounded w-full transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:bg-gradient-to-l hover:from-[#DDD6FE] hover:via-[#C4B5FD] hover:to-[#A78BFA]">
              Programmes for International Students
            </button>
          </a>
        </div>
      </div>

      <div>
        {programData.map((program, index) => (
          <div key={index} className='mb-10'>
            <div className='grid xl:grid-cols-5 md:grid-cols-2 gap-6'>
              <div className='w-full h-full flex rounded-lg'>
                <div data-aos='zoom-in' className='w-full p-6 shadow-2xl text-center bg-gray-100 rounded-lg'>
                  <h1 className='uppercase text-[#560606] font-semibold text-center py-4 text-xl'>{program.name}</h1>
                  <p className='text-sm text-gray-700'>{program.desc}</p>
                </div>
              </div>
              {program.courses.map((course, courseIndex) => (
                <div
                  key={courseIndex}
                  data-aos="zoom-in"
                  className="rounded-lg w-full bg-white shadow-md transition-shadow duration-300 transform cursor-pointer overflow-hidden flex flex-col"
                  style={{ transition: 'transform 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-12px) scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                >
                  {/* Image on top - increased height */}
                  <div
                    style={{ backgroundImage: `url(${course.img})` }}
                    className="h-60 bg-cover bg-center rounded-t-lg shadow-md"
                  ></div>

                  {/* Text below */}
                  <div className="p-5 flex flex-col flex-grow">
                    {course.link ? (
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#560606] font-semibold text-lg mb-2 hover:underline"
                      >
                        {course.name}
                      </a>
                    ) : (
                      <h1 className="text-[#560606] font-semibold text-lg mb-2">{course.name}</h1>
                    )}
                    <p className="text-sm flex-grow text-gray-700">{course.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h1 className="pb-4 uppercase font-semibold text-[#560606] text-center text-2xl">
          Upcoming Programmes and Events
        </h1>
        <HorizontalScroll setSelectedImage={setSelectedImage} />
      </div>

      {selectedImage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-50">
          <button
            className="absolute top-4 right-4 text-white text-4xl font-bold z-50"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <img
            src={selectedImage}
            alt="Selected Event"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}

    </div>
  );
};

export default Programmes;
