import { Link } from "react-router-dom";
import Heading from "../../Utilities/Heading";
import { GoArrowRight } from "react-icons/go";

const categories = [
    { name: "HeadPhone", path: "/headphone", img: "headphone.png" },
    { name: "Speakers", path: "/speakers", img: "Speakers.png" },
    { name: "Earbud", path: "/earbud", img: "Earbud.png" },
    { name: "Gaming", path: "/gaming", img: "Gaming.png" },
];

const OurAudio = () => {
    return (
        <section className="dark:bg-[#212020] py-5 md:py-10">
            <div className="container mx-auto md:px-4 px-2">
                <Heading Head="Our Audio Does It All" />
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-2 sm:gap-5 gap-2 ">
                    {categories.map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            className="rounded-xl shadow-sm text-center group"
                        >
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full sm:h-72 h-44 object-cover rounded-t-xl"
                            />
                            <div className="py-7 text-base text-black dark:text-white flex gap-1 justify-center items-center group-hover:text-brand transition">
                                <p>{item.name}</p>
                                <GoArrowRight />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurAudio;
