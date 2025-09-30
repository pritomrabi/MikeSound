import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Header = () => {
    return (
        <header className="w-full hidden md:block bg-gray-800 text-white px-6 py-[1px]">
            <div className="container mx-auto flex items-center justify-between">

                <div className="text-xs font-Nunito-font font-normal text-white">
                    <a href="mailto:yourmail@gmail.com" className="hover:underline">
                        yourmail@gmail.com
                    </a>
                </div>
                <div className="flex space-x-4 text-xs">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        <FaFacebook className="hover:text-blue-500" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                        <FaTwitter className="hover:text-blue-400" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <FaLinkedin className="hover:text-blue-600" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                        <FaInstagram className="hover:text-pink-500" />
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header