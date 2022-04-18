import {Swiper, SwiperSlide} from "swiper/react"
import SeasonalMangaCard from "./SeasonalMangaCard"

import "swiper/css"

export default function SeasonalSwiperList({list}){
    return (
        <Swiper
            slidesPerView="auto"
            spaceBetween={50}
            
        >
            {
                list.map((item)=>{
                    return (
                        <SwiperSlide key={item.id} style={{width: "80%",maxWidth:"550px"}}>
                            <SeasonalMangaCard {...item}/>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    );
}