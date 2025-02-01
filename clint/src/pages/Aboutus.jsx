// Aboutus
import React from "react";
import Home from "./Home";
import { Link } from "react-router-dom";
const Aboutus = () => {
    return (
        <div className="min-h-screenflex items-center justify-center">
            <div className=" p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
                    About Us
                </h1>
                <p className="text-gray-700 text-center mb-6">
                    Welcome to our platform, where creativity meets technology! We specialize in transforming your text into stunning images, making your ideas come to life.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Section 1: Our Mission */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Our Mission
                        </h2>
                        <p className="text-gray-600">
                            At our core, we aim to empower creators, designers, and dreamers by providing them with an intuitive tool to generate high-quality visuals effortlessly. Whether you're a professional or a hobbyist, we’re here to make your vision a reality.
                        </p>
                    </div>
                    {/* Section 2: How It Works */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            How It Works
                        </h2>
                        <p className="text-gray-600">
                            Simply input a description of your desired image, and our cutting-edge AI technology will generate a visual representation tailored to your imagination. From abstract art to realistic scenes, the possibilities are endless.
                        </p>
                    </div>
                    {/* Section 3: Why Choose Us */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Why Choose Us
                        </h2>
                        <ul className="list-disc pl-5 text-gray-600">
                            <li>High-quality, AI-driven image generation.</li>
                            <li>Easy-to-use interface for all skill levels.</li>
                            <li>Quick results to save you time and effort.</li>
                            <li>Customizable options for unique creations.</li>
                        </ul>
                    </div>
                    {/* Section 4: Join Us */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Join Us
                        </h2>
                        <p className="text-gray-600">
                            Be part of our growing community of creators and innovators. Let’s redefine the boundaries of creativity together. Start generating your unique images today!
                        </p>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <Link to='/'>
                    <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition">
                        Get Started
                    </button>

                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default Aboutus;
