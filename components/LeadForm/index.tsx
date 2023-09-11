'use client'
import React, { useState } from 'react'

function LeadForm() {

    const [display, setDisplay] = useState(true);
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    function onClose () {
        setDisplay(false)
    }

    return (
    <div className={`${display? 'visible': 'hidden'} fixed inset-0 flex items-center justify-center z-50 `}>
            <div className="absolute inset-0 backdrop-blur-md "></div>

            <div className="relative bg-opacity-30 bg-gradient-to-b from-white via-pink-200 to-purple-500 rounded-lg p-8 max-w-md w-full">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Sign up and Get 20%Off!</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        {/* <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label> */}
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-2  rounded-md focus:ring focus:ring-purple-500 border-0 border-b-2  focus:border-darkblue p-2 focus:border-transparent focus:outline-none ring-0  bg-transparent autofill-neutral"
                            placeholder="Name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        {/* <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label> */}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2  rounded-md focus:ring focus:ring-purple-500 border-0 border-b-2  focus:border-darkblue p-2 focus:border-transparent focus:outline-none ring-0  bg-transparent autofill-neutral"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-opacity-30  bg-gradient-to-r from-white via-white to-purple-800 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500"
                    >
                        Subscribe
                    </button>
                </form>

                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default LeadForm