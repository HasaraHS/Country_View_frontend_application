import { BrowserRouter } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-scroll";

const Navbar = () => {

    const menus = [
        {title: "Home", url: "#home"},
        {title: "Services", url: "#services"},
        {title: "About Us", url: "#about"},
    ]

    return (
        <BrowserRouter>
            <nav className="flex justify-between items-center px-[140px] py-5">
                <a href="">
                    <img src={logo} alt="" className="w-15 h-14 pl-4"/>
                    <h4 className="text-white text-[15px]">Country View</h4>
                </a>
        
                <div className="bg-[#4A8087] bg-opacity-[70%] py-2 px-[80px] rounded-[40px]">
                    <ul className="flex text-white text-[14px] font-bold uppercase gap-[120px]">
                        {
                            menus.map((menu,i) => (
                                <li key={i}>
                                    <Link to={menu.url} spy={true} smooth={true} offset={50} duration={500} delay={500}
                                    className="hover:border-b-2 border-white transform duration-150 cursor-pointer">
                                    {menu.title}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>

            </nav>
        </BrowserRouter>
    )
}

export default Navbar;