import React, { useState } from 'react'

const Description = () => {
  const [activeTab, setActiveTab] = useState("specs");

  return (
    <div className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 font-Lato">
      <div className="mx-auto shadow-sm rounded-xl p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900">

        {/* Header */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center font-Nunito-font text-black dark:text-white mb-6">
          Arabic Aura Watch
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 font-Nunito-font text-sm">
          {["specs", "desc", "review"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 shadow-sm rounded-lg font-medium cursor-pointer ${activeTab === tab
                ? "bg-brand text-white"
                : "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                }`}
            >
              {tab === "specs" ? "Specification" : tab === "desc" ? "Description" : "Review"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "specs" && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
              <tbody>
                {[
                  ["Brand", "Apple"],
                  ["Model", "iPad Air M3 - 2025"],
                  ["Body", "247.6 x 178.5 x 6.1 mm | Weight: 400 grams"],
                  ["Display", "11-inch Liquid Retina, 2360x1640 resolution, 500 nits brightness"],
                  ["Processor", "Apple M3 Chip | Octa-core CPU | Apple GPU"],
                  ["Main Camera", "12MP Wide camera"],
                  ["Selfie Camera", "12MP Ultra Wide front camera"],
                  ["Sound", "Stereo speakers, dual microphones"],
                  ["Battery", "28.6-watt-hour rechargeable battery | USB-C charging"],
                ].map(([key, value], idx) => (
                  <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <td className="p-2 sm:p-3 font-semibold text-xs sm:text-sm md:text-base w-36 sm:w-40">{key}</td>
                    <td className="p-2 sm:p-3 text-[10px] text-xs md:text-sm">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "desc" && (
          <div className="mt-4 sm:mt-6">
            <img
              src="home.jpg"
              alt="iPad Air"
              className="w-full sm:w-96 h-48 sm:h-60 rounded-xl mb-4 sm:mb-6 shadow-md object-cover mx-auto"
            />
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-Nunito-font text-center sm:text-left">
              iPad Air M3 - 2025
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base text-center sm:text-left">
              Go beyond ordinary with the Apple iPad Air M3. One of the thinnest designs
              with premium colors, blazing-fast M3 chip, and enhanced AI features.
            </p>
            <h3 className="text-md sm:text-lg font-semibold mb-2 font-Nunito-font">Features:</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm sm:text-base">
              <li>Stunning visuals with Liquid Retina display</li>
              <li>Blazing-fast Apple M3 chip with Neural Engine</li>
              <li>12MP Wide + 12MP Ultra Wide cameras</li>
              <li>All-day battery life with USB-C fast charging</li>
              <li>Support for Apple Pencil Pro and Magic Keyboard</li>
            </ul>
          </div>
        )}

        {activeTab === "review" && (
          <div className="mt-4 sm:mt-6 font-Nunito-font">
            <h2 className="text-lg sm:text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Customer Reviews</h2>

            {/* Review List */}
            <div className="space-y-4 h-56 sm:h-60 overflow-y-auto px-2 sm:px-5 mb-4">
              <div className="p-3 sm:p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-green-500 text-sm sm:text-base">★★★★★</span>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">By Riyadh · May, 2025</p>
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                  Best Gamepad, it's been 6 years still running solid.
                </p>
              </div>
            </div>

            {/* Review Form */}
            <h3 className="text-md sm:text-lg font-bold mb-3">Your Review</h3>
            <form className="space-y-3 sm:space-y-4">
              {/* Rating Stars */}
              <div className="flex gap-1 text-xl sm:text-2xl text-gray-400 cursor-pointer">
                ★ ★ ★ ★ ★
              </div>

              {/* Name Input */}
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-lg outline-none text-sm sm:text-base"
              />

              {/* Review Textarea */}
              <textarea
                rows="4"
                placeholder="Write your review..."
                className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-lg outline-none text-sm sm:text-base"
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-brand hover:bg-brand/90 cursor-pointer text-white px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}

export default Description
