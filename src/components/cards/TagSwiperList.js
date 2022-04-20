import {Swiper, SwiperSlide} from "swiper/react"
import TagCard from "./TagCard"

import "swiper/css"


export default function TagwiperList({list}){
    return (
        <Swiper
            slidesPerView="auto"
            spaceBetween={20}
        >
            {
                list.map((item)=>{
                    return (
                        <SwiperSlide key={item.id} style={{width:"80%", maxWidth:300}}>
                            <TagCard {...item}/>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    );
}