import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "../slider/Slider.css"
import { useRef, useContext, useEffect } from 'react';
import { MyContext } from '../../context/AppContext';
import { Pagination } from 'swiper/modules';         
import sigiriya from "../../assets/Sigiriya.jpg";
import operaHouse from "../../assets/OperaHouse.jpg";
import fuji from "../../assets/Fuji.jpg";
import Kandersteg from "../../assets/Kandersteg.jpg";
import Krabi from "../../assets/Krabi.jpg"; 

const Slider = () => {
   
    const swiperRef = useRef(null);
    const {activeSlideIndex, setActiveSlideIndex} = useContext(MyContext);

    const handleSlideChange = (swiper) => {
        const currentIndex = swiper.activeIndex;
        setActiveSlideIndex(currentIndex);
    };

    useEffect(() => {
        if(swiperRef.current) {
            const swiper = swiperRef.current.swiper;
            swiper.on('slideChange', () => handleSlideChange(swiper));
        }
    });

    const places = [
        {name: "Sri Lanka", img: sigiriya},
        {name: "Australia", img: operaHouse},
        {name: "Japan", img: fuji},
        {name: "Thailand", img: Krabi},
        {name: "New Zealand", img: Kandersteg},
    ]

    return(
        <div className='mr-[14] shadow-xl'>
           <Swiper
           slidesPerView={1.5} keyboard={true} spaceBetween={-150} pagination={{clickable:true}} modules={[Pagination]} ref={swiperRef} initialSlide={activeSlideIndex} centeredSlides={true} 
           className='pl-[90px] pt-6'>
            {
                places.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className='relative'>
                           <img src={item.img} alt='' className='object-cover shadow-xl '/>
                           <div>
                            sample text
                           </div>
                        </div>
                    </SwiperSlide>
                ))
            }
           </Swiper>
        </div>
    )
}

export default Slider;