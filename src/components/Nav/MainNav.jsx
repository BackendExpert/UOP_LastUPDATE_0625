import React, { useState } from 'react';
import Modal from 'react-modal';
import UopLogo from '../../assets/uoplogo.png';
import { MainNavData } from './DataNav';
import { FaFacebook, FaLinkedinIn, FaSearch, FaYoutube } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaX } from 'react-icons/fa6';

// Set the app element for accessibility
Modal.setAppElement('#root');

const MainNav = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSearchQuery('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Redirect to search page with query param
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            closeModal();
        }
    };

    return (
        <div className='xl:px-20 px-4 py-4 bg-[#560606] text-white'>
            <div className="flex justify-between">
                <div>
                    <a href="/">
                        <img src={UopLogo} alt="UOP Logo" className='xl:h-20 h-12 w-auto' />
                    </a>
                </div>
                <div className="py-6">
                    <div className="xl:block hidden">
                        <div className="flex items-center space-x-4">
                            {MainNavData.map((item, index) => (
                                <div className="font-semibold" key={index}>
                                    <a href={item.link} className="text-white">{item.name}</a>
                                    {item.id === 7 ? null : <span className="mx-2">|</span>}
                                </div>
                            ))}

                            <div className="xl:block hidden">
                                <div className="flex justify-end space-x-4 ">
                                    <a href="" target="_blank" rel="noopener noreferrer">
                                        <FaFacebook className='h-5 w-auto' />
                                    </a>
                                    <a href="" target="_blank" rel="noopener noreferrer">
                                        <FaX className='h-5 w-auto' />
                                    </a>
                                    <a href="" target="_blank" rel="noopener noreferrer">
                                        <FaYoutube className='h-5 w-auto' />
                                    </a>
                                    <a href="" target="_blank" rel="noopener noreferrer">
                                        <FaLinkedinIn className='h-5 w-auto' />
                                    </a>
                                </div>
                            </div>
                            <FaSearch className='h-6 w-auto cursor-pointer' onClick={openModal} />

                            
                        </div>
                    </div>


                </div>
            </div>

            {/* Search Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className='w-full h-full outline-none'
                overlayClassName='fixed inset-0 bg-black bg-opacity-60 z-50'
                closeTimeoutMS={200}
            >
                <div className='w-full px-4 mt-[80px] flex justify-center'>
                    <form
                        onSubmit={handleSubmit}
                        className='bg-white max-w-4xl w-full rounded-lg shadow-lg p-6'
                    >
                        <h2 className='text-xl font-semibold mb-4'>Search</h2>
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search...'
                            className='text-gray-800 h-10 w-full mb-4 p-2 border rounded'
                            autoFocus
                        />
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default MainNav;
