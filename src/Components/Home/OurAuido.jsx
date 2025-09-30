import { Link } from "react-router-dom"
import Heading from "../../Utilities/Heading"
import { GoArrowRight } from "react-icons/go";
const OurAuido = () => {
    return (
        <section className="dark:bg-[#212020] py-10">
            <div className="container mx-auto md:px-4 px-1">
                <Heading Head="Our Audio Does It All" />
                <div className="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-2 px-5 gap-2">
                    <Link to="/headphone" className="rounded-xl shadow-sm text-center">
                        <img src="home.jpg" alt="home" className="w-full h-40 object-cover" />
                        <div className="py-5 text-base text-black dark:text-white flex gap-1 justify-center items-center" >
                            <p>HeadPhone</p>
                            <GoArrowRight />
                        </div>
                    </Link>
                    <Link to="/speakers" className="rounded-xl shadow-sm text-center">
                        <img src="home.jpg" alt="home" className="w-full h-40 object-cover" />
                        <div className="py-5 text-base text-black dark:text-white flex gap-1 justify-center items-center" >
                            <p>Speakers</p>
                            <GoArrowRight />
                        </div>
                    </Link>
                    <Link to="/earbud" className="rounded-xl shadow-sm text-center">
                        <img src="home.jpg" alt="home" className="w-full h-40 object-cover" />
                        <div className="py-5 text-base text-black dark:text-white flex gap-1 justify-center items-center" >
                            <p>Earbud</p>
                            <GoArrowRight />
                        </div>
                    </Link>
                    <Link to="/gaming" className="rounded-xl shadow-sm text-center">
                        <img src="home.jpg" alt="home" className="w-full h-40 object-cover" />
                        <div className="py-5 text-base text-black dark:text-white flex gap-1 justify-center items-center" >
                            <p>Gaming</p>
                            <GoArrowRight />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default OurAuido