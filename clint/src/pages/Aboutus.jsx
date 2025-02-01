// Aboutus
import React from "react";
import Home from "./Home";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Aboutus = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">About Us</h1>
        <p className="text-gray-700 mb-6">
          Welcome to our platform, where creativity meets technology! We
          specialize in transforming your text into stunning images, making your
          ideas come to life.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Section 1: Our Mission */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              At our core, we aim to empower creators, designers, and dreamers
              by providing them with an intuitive tool to generate high-quality
              visuals effortlessly. Whether you're a professional or a hobbyist,
              we’re here to make your vision a reality.
            </p>
          </div>
          {/* Section 2: How It Works */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">
              Simply input a description of your desired image, and our
              cutting-edge AI technology will generate a visual representation
              tailored to your imagination. From abstract art to realistic
              scenes, the possibilities are endless.
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
              Be part of our growing community of creators and innovators. Let’s
              redefine the boundaries of creativity together. Start generating
              your unique images today!
            </p>
          </div>
        </div>
        {/* Developer Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Meet the Developer
          </h2>
          <div className="flex flex-col items-center">
            <img
              src={assets.developer}
              alt="Developer"
              width={100}
              height={100}
              className="rounded-lg mb-2"
            />
            <p className="text-gray-800 font-semibold">Arjun Maurya</p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600 mb-2">
              I am a full-stack developer working on creating a text-to-image
              application, which allows users to generate images from textual
              descriptions. The goal is to provide a seamless and interactive
              experience, where creativity meets technology.
            </p>
            <p className="text-gray-600 mb-2">
              Learn more:
              <a
                href="https://www.linkedin.com/in/arjun-maurya-8b1716299/"
                className="text-blue-500 hover:underline"
              >
                Developer Portfolio
              </a>
            </p>
           
            <div className="mt-4">
              <a
                href="https://www.linkedin.com/in/arjun-maurya-8b1716299/"
                className="text-blue-500 hover:underline mr-4"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/arjun__maurya_11/"
                className="text-blue-500 hover:underline mr-4"
              >
                Instagram
              </a>
              <a
                href="https://github.com/arjun-901"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link to="/">
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
