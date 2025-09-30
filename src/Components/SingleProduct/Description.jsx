import React, { useState } from 'react'

const Description = () => {
    const [activeTab, setActiveTab] = useState("specs");
  return (
    <div className=" py-10 px-6 font-Lato">
      <div className=" mx-auto  shadow-sm rounded-xl p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center font-Nunito-font text-black mb-6">
          iPad Air M3 - 2025
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6 font-Nunito-font">
          <button
            onClick={() => setActiveTab("specs")}
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer ${
              activeTab === "specs"
                ? "bg-brand text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Specification
          </button>
          <button
            onClick={() => setActiveTab("desc")}
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer ${
              activeTab === "desc"
                ? "bg-brand text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("warranty")}
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer ${
              activeTab === "warranty"
                ? "bg-brand text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Warranty
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
        {activeTab === "warranty" && (
          <div>
            <h2 className="text-xl font-bold mb-3 font-Nunito-font">Warranty</h2>
            <p className="text-gray-700 leading-relaxed">
              Explore our
              page for detailed information about our warranty coverage.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Description