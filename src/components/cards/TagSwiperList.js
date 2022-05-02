import {Swiper, SwiperSlide} from "swiper/react";
import TagCard from "./TagCard"

import "swiper/css"


export default function TagwiperList({list}){
    return (
        <Swiper
            slidesPerView="auto"
        >
            {
                list.map((item)=>{
                    return (
                        <SwiperSlide key={item.id} style={{width:"85%", maxWidth:300, paddingRight:20}}>
                            <TagCard {...item}/>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    );
}