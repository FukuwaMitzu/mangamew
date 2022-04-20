import {Swiper, SwiperSlide} from "swiper/react"
import UpdateMangaCard from "./UpdateMangaCard"

import "swiper/css"



export default function UpdateSwiperList({list}){
    return (
        <Swiper
            slidesPerView="auto"
            spaceBetween={20}
        >
            {
                list.map((item)=>{
                    return (
                        <SwiperSlide key={item.id} style={{width:"80%", maxWidth:300}}>
                            <UpdateMangaCard {...item}/>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    );
}