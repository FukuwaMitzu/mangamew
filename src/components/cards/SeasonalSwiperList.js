import {Swiper, SwiperSlide} from "swiper/react"
import SeasonalMangaCard from "./SeasonalMangaCard"

import "swiper/css"

export default function SeasonalSwiperList({list}){
    return (
        <Swiper
            slidesPerView="auto"     
        >
            {
                list.map((item)=>{
                    return (
                        <SwiperSlide key={item.id} style={{width: "80%",maxWidth:"550px", paddingRight:50}}>
                            <SeasonalMangaCard {...item}/>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    );
}