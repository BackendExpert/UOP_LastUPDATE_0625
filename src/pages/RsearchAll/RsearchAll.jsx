import React from 'react'
import BarChart from '../../components/Charts/BarChart'
import { researchstats } from './ResearchStatus'
import useResData from '../../components/ReseachSection/ResearchAllData'
import { FaCheck } from "react-icons/fa";

const RsearchAll = () => {
    const researchdata = useResData()


    return (
        <div className='px-4 mt-16 bg-gray-200 xl:px-24'>
            <div className="py-16">
                <h1 className="text-3xl uppercase font-semibold text-[#560606] text-center mb-4">research and innovation</h1>

                <div className="h-full p-16 bg-white shadow-xl rounded-xl">
                    <div className="grid gap-6 xl:grid-cols-7 md:grid-cols-3">
                        {
                            researchstats.map((data, index) => {
                                return (
                                    <div className="" key={index}>
                                        <center>
                                            <data.icon className='h-12 w-full fill-[#560606]' />
                                            <a href={data.link}>
                                                <h1 className="mt-8 text-xl text-gray-500 font-semibold duration-500 hover:text-[#e8b910]">{data.name}</h1>
                                            </a>
                                        </center>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


                <div className="mt-4 md:flex">
                    <div className="p-4 mr-2 bg-white shadow-xl md:w-1/2 rounded-xl">
                        <h1 className="text-2xl font-semibold text-[#560606]">Research highlights</h1>
                        <p className='mt-2 text-gray-500'>
                            
                        </p>

                        <div className="hidden mt-4 md:block">
                            <BarChart />
                        </div>
                    </div>
                    <div className="mt-4 md:w-1/2 md:ml-2 md:mt-0">
                        <div className="p-4 bg-white shadow-md md:p-8 rounded-xl">
                            <table className='w-full text-gray-500'>
                            <thead className="text-center">
                                    <h1 className="text-2xl font-semibold text-[#560606]">Research highlights - 2024</h1>
                            </thead>
                            <tbody>
                                {[
                                 { label: 'Research Journals', value: '11', link: 'https://www.pdn.ac.lk/journals/'},
                                    { label: 'Research Publications', value: '' },
                                    { label: 'Citations', value: '' },
                                    { label: 'Research Ranking', value: '' },
                                    { label: 'Top 2% of World Scientists (2023)', value: '9' },
                                    { label: 'Annual Research Conferences', value: '5+' },
                                    { label: 'Annual Research Collaborations', value: '' },
                                    { label: 'Research Awards and Recognitions', value: '' },
                                    { label: 'Annual Workshops/Seminars', value: '' },
                                    { label: 'Capital grants for Research', value: '' },
                                ].map((item, index) => (
                                    <tr key={index}>
                                        <td className='flex items-center font-semibold'>
                                            <FaCheck className="mr-2 text-green-600" />
                                            {item.label}
                                        </td>
                                        <td>{item.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>



                <div className="grid gap-8 mt-8 xl:grid-cols-3 md:grid-cols-2">
                    {
                        researchdata.map((research, index) => {
                            return (
                                <div data-aos="zoom-in" className="max-h-full bg-white shadow-xl rounded-xl max-h-auto" key={index}>
                                    <img src={`${import.meta.env.VITE_APP_API}/${research.res_img}`} alt="" className='w-full h-60 rounded-t-xl' />

                                    <div className="p-4">
                                        <h1 className="font-semibold uppercase text-[#560606] pb-2">{research.res_titile}</h1>
                                        <p className="text-gray-500">{research.res_desc}</p>

                                        <div className="flex justify-between mt-4">
                                            <div className="w-full">
                                                <a href={research.link}>
                                                    <button className='bg-[#560606] py-2 px-4 text-white rounded-full shadow-xl duration-500 hover:px-6'>Read More</button>
                                                </a>
                                            </div>
                                            <div className="w-full mt-2">
                                                <p className="text-gray-500 duration-500 hover:text-[#560606] hover:font-semibold">{research.res_faculty}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default RsearchAll