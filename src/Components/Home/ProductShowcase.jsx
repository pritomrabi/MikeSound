export default function ProductShowcase() {
    return (
        <div className="flex flex-col gap-12 pt-12 pb-8 min-h-screen px-4 md:px-20">

            {/* Smart Speaker */}
            <div className="flex flex-col md:flex-row items-center w-full gap-6">
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <img
                        src="SmartSpeaker.jpg"
                        alt="Smart Speaker"
                        className="w-full max-w-sm h-auto rounded-2xl object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl text-primary font-Lato font-bold">Smart Speaker</h2>
                    <p className="text-gray-600 text-lg md:text-xl font-Nunito-font font-medium mt-2 md:mt-3">High-fidelity audio with voice control</p>
                    <p className="text-xl md:text-2xl font-semibold mt-3 md:mt-4">Starting at $199</p>
                </div>
            </div>

            {/* Wireless Headphones */}
            <div className="flex flex-col md:flex-row-reverse items-center w-full gap-6">
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    <img
                        src="WirelessHeadphone.jpg"
                        alt="Wireless Headphones"
                        className="w-full max-w-sm h-auto rounded-2xl object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-right">
                    <h2 className="text-2xl md:text-3xl text-primary font-Lato font-bold">Wireless Headphones</h2>
                    <p className="text-gray-600 text-lg md:text-xl font-Nunito-font font-medium mt-2 md:mt-3">Immersive sound, perfect fit</p>
                    <p className="text-xl md:text-2xl font-semibold mt-3 md:mt-4">Starting at $299</p>
                </div>
            </div>

            {/* Portable Speaker */}
            <div className="flex flex-col md:flex-row items-center w-full gap-6">
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <img
                        src="PortableSpeaker.jpg"
                        alt="Portable Speaker"
                        className="w-full max-w-sm h-auto rounded-2xl object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl text-primary font-Lato font-bold">Portable Speaker</h2>
                    <p className="text-gray-600 text-lg md:text-xl font-Nunito-font font-medium mt-2 md:mt-3">Powerful sound on the go</p>
                    <p className="text-xl md:text-2xl font-semibold mt-3 md:mt-4">Starting at $99</p>
                </div>
            </div>

        </div>
    );
}
