import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className=" p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Contact Us
        </h1>
        <p className="text-gray-700 mb-6">
          We are here to assist you with any questions, concerns, or feedback you may have. 
          Please don't hesitate to reach out to us. Our team is dedicated to providing prompt 
          and reliable support to ensure your satisfaction.
        </p>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Email</h2>
            <p className="text-gray-600">
              For inquiries, you can email us at:{" "}
              <a
                href="mailto:kushwaha9654abc@gmail.com"
                className="text-blue-600 hover:underline"
              >
                kushwaha9654abc@gmail.com
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Phone</h2>
            <p className="text-gray-600">
              Reach us by phone at:{" "}
              <a
                href=""
                className="text-blue-600 hover:underline"
              >
                9454-603-952
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800">We Value Your Feedback</h2>
          <p className="text-gray-600">
            Your feedback helps us improve our services. Feel free to get in
            touch with us anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
