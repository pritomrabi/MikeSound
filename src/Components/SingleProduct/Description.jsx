import React, { useState } from 'react'

const Description = () => {
  const [activeTab, setActiveTab] = useState("specs");
  return (
    <div className=" py-10 px-6 font-Lato">
      <div className=" mx-auto  shadow-sm rounded-xl p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center font-Nunito-font text-black mb-6">
          Arabic Aura Watch
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6 font-Nunito-font text-sm">
          <button
            onClick={() => setActiveTab("specs")}
            className={`px-4 py-2 shadow-sm rounded-lg font-medium cursor-pointer ${activeTab === "specs"
              ? "bg-brand text-white"
              : "bg-gray-50 text-gray-800"
              }`}
          >
            Specification
          </button>
          <button
            onClick={() => setActiveTab("desc")}
            className={`px-4 py-2 shadow-sm rounded-lg font-medium cursor-pointer ${activeTab === "desc"
              ? "bg-brand text-white"
              : "bg-gray-50 text-gray-800"
              }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`px-4 py-2 shadow-sm rounded-lg font-medium cursor-pointer ${activeTab === "review"
              ? "bg-brand text-white"
              : "bg-gray-50 text-gray-800"
              }`}
          >
            Review
          </button>
        </div>
        {/* Tab Content */}
        {activeTab === "specs" && (
          <div className="overflow-x-auto">
            <table className="w-full  border-gray-300 rounded-lg">
              <tbody>
                <tr className="">
                  <td className="p-3 font-semibold w-40">Brand</td>
                  <td className="p-3">Apple</td>
                </tr>
                <tr className="">
                  <td className="p-3 font-semibold">Model</td>
                  <td className="p-3">iPad Air M3 - 2025</td>
                </tr>
                <tr className="">
                  <td className="p-3 font-semibold">Body</td>
                  <td className="p-3">247.6 x 178.5 x 6.1 mm | Weight: 400 grams</td>
                </tr>
                <tr className="">
                  <td className="p-3 font-semibold">Display</td>
                  <td className="p-3">
                    11-inch Liquid Retina, 2360x1640 resolution, 500 nits brightness
                  </td>
                </tr>
                <tr className="">
                  <td className="p-3 font-semibold">Processor</td>
                  <td className="p-3">Apple M3 Chip | Octa-core CPU | Apple GPU</td>
                </tr>
                <tr className="">
                  <td className="p-3 font-semibold">Main Camera</td>
                  <td className="p-3">12MP Wide camera</td>
                </tr>
                <tr className="">
                  <td className="p-3 font-semibold">Selfie Camera</td>
                  <td className="p-3">12MP Ultra Wide front camera</td>
                </tr>
                <tr className="">
                  <td className="p-3 font-semibold">Sound</td>
                  <td className="p-3">Stereo speakers, dual microphones</td>
                </tr>
                <tr className="">
                  <td className="p-3 font-semibold">Battery</td>
                  <td className="p-3">
                    28.6-watt-hour rechargeable battery | USB-C charging
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "desc" && (
          <div>
            <img
              src="home.jpg"
              alt="iPad Air"
              className="rounded-xl mb-6 shadow-md w-96 h-60 object-cover"
            />
            <h2 className="text-xl font-bold mb-3 font-Nunito-font">iPad Air M3 - 2025</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Go beyond ordinary with the Apple iPad Air M3. One of the thinnest designs
              with premium colors, blazing-fast M3 chip, and enhanced AI features.
            </p>
            <h3 className="text-lg font-semibold mb-2 font-Nunito-font">Features:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Stunning visuals with Liquid Retina display</li>
              <li>Blazing-fast Apple M3 chip with Neural Engine</li>
              <li>12MP Wide + 12MP Ultra Wide cameras</li>
              <li>All-day battery life with USB-C fast charging</li>
              <li>Support for Apple Pencil Pro and Magic Keyboard</li>
            </ul>
          </div>
        )}
        {activeTab === "review" && (
          <div className="font-Nunito-font">
            <h2 className="text-xl font-bold mb-4 border-b border-secandari pb-2">Customer Reviews</h2>

            {/* Review List */}
            <div className="space-y-4 h-60 overflow-y-scroll px-5 mb-6">
              {/* Single Review */}
              <div className="p-4 rounded-lg shadow-sm bg-gray-50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-green-500">★★★★★</span>
                  <p className="text-sm text-gray-600">By Riyadh · May, 2025</p>
                </div>
                <p className="text-gray-800">
                  Best Gamepad, it's been 6 years still running solid.
                </p>
              </div>
            </div>

            {/* Review Form */}
            <h3 className="text-xl font-bold mb-3">Your Review</h3>
            <form className="space-y-4">
              {/* Rating Stars */}
              <div className="flex gap-1 text-2xl text-gray-400 cursor-pointer">
                ★ ★ ★ ★ ★
              </div>

              {/* Name Input */}
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-secandari rounded-lg outline-none"
              />

              {/* Review Textarea */}
              <textarea
                rows="4"
                placeholder="Write your review..."
                className="w-full p-3 border border-secandari rounded-lg outline-none"
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-brand cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-brand/90"
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