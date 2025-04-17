import "../header/Header.css";
import { useContext } from "react";
import Slider from "../../utils/slider/Slider";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { MyContext } from "../../context/AppContext";

const contentData = [
    {
        country: "Sri Lanka",
        title: "Explore Sri Lanka",
    },
    {
        country: "Australia",
        title: "Explore Australia",
    },
    {
        country: "Japan",
        title: "Explore Japan",
    },
    {
        country: "Thailand",
        title: "Explore Thailand",
    },
    {
        country: "New Zealand",
        title: "Explore New Zealand",
    },
];

const Header = () => {

    const {activeSlideIndex} = useContext(MyContext);

    const handleClass = (activeSlideIndex) => {
        const {country, title} = contentData[activeSlideIndex] || {};

        if(country && title) {
            return(
                <div>
                    <h1 className="text-[80px] text-white font-Montserrate font-[800] leading-[100px]">
                        Explore <br/>
                    <span className={`country ${country}`} data-country={country}> {country}</span>
                    </h1>
                    <p className="text-white mt-[-70px] p-2 w-[110%] font-semibold">
                    Welcome to our country exploration platform, your ultimate guide to uncovering the world's hidden gems. 
                    Dive into diverse cultures, breathtaking landscapes, and captivating histories as you navigate through an array of travel destinations and local traditions. 
                    Whether you're planning your next adventure or simply fueling your curiosity, let us bring the beauty and wonder of the world directly to your screen.
                    </p>
                </div>
            )
        }

        return null;
    };

    const classChange = handleClass(activeSlideIndex)

    return(
        <div className="flex items-cemter mt-[40px]">
            {/* text content */}
            <div className="w-1/2 pl-[140px]">
             {classChange}
             <div className="mt-[100px] flex gap-12">
                <button className="border-2 border-[#00A1B9] text-[20px] px-6 py-2 font-semibold text-white hover:text-[#00A1B9]">
                    Get Start
                </button>

             </div>
            </div>


            <div className="w-1/2 flex flex-col items-end justify-end relative mr-10">
            <div>
                <Slider/>
            </div>
            <div className="flex gap-4 text-xl text-white absolute bottom-[-30px] right-[50px]">
                <FaYoutube className="hover:cursor-pointer hover:text-[#00A1B9]"/>
                <FiInstagram className="hover:cursor-pointer hover:text-[#00A1B9]"/>
                <BsWhatsapp className="hover:cursor-pointer hover:text-[#00A1B9]"/>
                <FaFacebook className="hover:cursor-pointer hover:text-[#00A1B9]"/>
            </div>
            </div>
        </div>
    )
}

export default Header;