import React from "react";

const Subscription = () => {
  return (
    <div className="my-4 w-full max-w-6xl mx-auto px-4">
      <h1 className="text-2xl md:text-3xl font-bold font-roboto text-gray-800 mb-4">
        Subscription Status
      </h1>

      <div className="bg-gradient-to-r from-slate-50 to-purple-100 border border-purple-300 rounded-xl shadow-md p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-gray-700 text-base md:text-lg font-roboto">
            You’re currently on the <span className="font-semibold text-primary">free plan</span>. 
            Unlock powerful features and elevate your experience by upgrading to a premium plan.
          </p>
        </div>

        <button className="bg-primary hover:bg-primary-dark transition-colors text-white font-medium font-roboto text-sm md:text-base px-5 py-2 rounded-lg shadow">
          View Plans
        </button>
      </div>
    </div>
  );
};

export default Subscription;
