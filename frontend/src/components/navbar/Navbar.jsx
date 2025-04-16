import { BrowserRouter } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-scroll";

const Navbar = () => {

    const menus = [
        { title: "Home", url: "#home" },
        { title: "Services", url: "#services" },
        { title: "About Us", url: "#about" },
    ];

    return (
        <BrowserRouter>
            <nav className="flex flex-col md:flex-row justify-between items-center px-4 md:px-[140px] py-5">

                <a href="" className="flex items-center gap-2 mb-4 md:mb-0">
                    <img src={logo} alt="" className="w-10 h-10 md:w-15 md:h-14" />
                    <h4 className="text-white text-[14px] md:text-[16px]">Country View</h4>
                </a>

                <div className="bg-[#4A8087] bg-opacity-[70%] py-2 px-6 md:px-[80px] rounded-[20px] md:rounded-[40px]">
                    <ul className="flex flex-wrap justify-center md:flex-nowrap text-white text-[12px] md:text-[14px] font-bold uppercase gap-6 md:gap-[120px]">
                        {menus.map((menu, i) => (
                            <li key={i}>
                                <Link 
                                    to={menu.url} spy={true} smooth={true} offset={50} duration={500} delay={500} 
                                    className="hover:border-b-2 border-white transform duration-150 cursor-pointer">
                                    {menu.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </BrowserRouter>
    );
};

export default Navbar;