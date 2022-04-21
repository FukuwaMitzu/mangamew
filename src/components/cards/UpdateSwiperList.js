import {Swiper, SwiperSlide} from "swiper/react"
import UpdateMangaCard from "./UpdateMangaCard"

import "swiper/css"



export default function UpdateSwiperList({list}){
    return (
        <Swiper
            slidesPerView="auto"
        >
            {
                list.map((item)=>{
                    return (
                        <SwiperSlide key={item.id} style={{width:"80%", maxWidth:300, paddingRight:20}}>
                            <UpdateMangaCard {...item}/>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    );
}