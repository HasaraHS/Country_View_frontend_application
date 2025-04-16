import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import "./Home.css"

const Home = () => {
  return (
    <div className={`h-[1080px] overflow-hidden`} id="home">
      <Navbar/>
      <Header/>
    </div>
  )
}

export default Home;