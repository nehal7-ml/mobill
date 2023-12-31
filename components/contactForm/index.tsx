'use client'
import { AlertCircle, Mail, PlaneIcon, Send } from "lucide-react";
import React, { useEffect, useState } from 'react';
import Dots from '@/public/dotMatrix.svg'
import LoadingCircle from "../shared/icons/loading-circle";
import Balancer from "react-wrap-balancer";

function ContactForm() {

    const [showForm, setShowForm] = useState(true);
    const [showThanks, setShowThanks] = useState(false);
    const [showError, setShowError] = useState(false);
    const [selectedInterest, setSelectedInterest] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleInterestClick = (interest: string) => {
        setSelectedInterest(interest);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here, you can handle form submission, e.g., sending data to a server.
        console.log('Form submitted:', { selectedInterest, name, email, message });

        if (name && email && message) {
            let res = await fetch(`/api/marketing/contact`, { method: "POST", body: JSON.stringify({ name, email, subject: selectedInterest, message }) })
            setShowForm(false)
            if (res.status === 200) {
                setShowThanks(true)
            }
            else {
                setShowError(true)
            }

        }
    };

    return (
        <div className="w-full lg:  h-fit mx-auto p-6 bg-neutral-300 rounded-lg shadow-lg">
            <div className="absolute -z-10 w-40 h-20 top-1/3  -translate-x-1/2   fill-darkblue"><Dots className="fill-white" /></div>

            {showForm&& isClient && <form className="h-full w-full flex flex-col justify-center lg:block p-6" onSubmit={handleSubmit}>
                <div className="mb-4 h-2/6">
                    <p className="mb-2 text-center lg:text-left font-bold h-1/6">I am interested in ...</p>
                    <div className="flex justify-center lg:justify-start flex-wrap gap-5 h-5/6">
                        {['Auto Detailing', 'Mobile Charging', 'Becoming a Partner', 'Investing', 'Other'].map((interest, index) => (
                            <button
                                key={index}
                                onClick={() => handleInterestClick(interest)}
                                className={`h-fit w-fit rounded-lg px-4 py-2 border-2 border-opacity-30 border-purple-800 focus:outline-none ${selectedInterest === interest
                                    ? 'bg-darkblue text-white'
                                    : 'bg-transparent hover:bg-blue-200  text-opacity-30 text-purple-800'
                                    }`}
                            >
                                {interest}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-4 h-1/6">
                    <label
                        htmlFor="name"
                        className="transition-all duration-300 ease-in-out text-gray-500 text-sm"
                    >
                        Name :
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="border-0 border-b-2  focus:border-darkblue p-2 focus:border-transparent focus:outline-none ring-0  bg-transparent w-full outline-none autofill-neutral"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block">Your Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="border-0 border-b-2  focus:border-darkblue p-2 focus:border-transparent focus:outline-none ring-0  bg-transparent w-full autofill-neutral"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="mb-2 block">Message:</label>
                    <textarea
                        id="message"
                        rows={4}
                        className="border-0 border-b-2  focus:border-darkblue focus:border-none focus:border-b-2 foucs:ring-0 p-2 focus:outline-none bg-transparent w-full autofill-neutral"
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-darkblue text-white rounded-lg py-4 px-8 hover:bg-blue-900 flex items-center justify-center"
                >
                    <Send color="white" className="mx-2" />
                    <span className="mx-2">Send Message</span>
                </button>
            </form>}

            {!showForm && !showThanks && !showError &&
                <>
                    <LoadingCircle></LoadingCircle>
                </>}

            {showThanks &&
                <>
                    <div className="w-full flex flex-col justify-center items-center p-10 text-center">
                        <Mail />
                        <Balancer>Check you email</Balancer>
                    </div>
                </>}

            {showError &&
                <>
                    <div className="w-full flex flex-col justify-center items-center p-10 text-center">
                        <AlertCircle color="red" />
                        <Balancer>An error occurred</Balancer>
                    </div>
                </>
            }
        </div>
    );
}

export default ContactForm;
