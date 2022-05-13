import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import SeasonalMangaCard from "./SeasonalMangaCard"

import "swiper/css";
import "swiper/css/pagination";
export default function SeasonalSwiperList({ list }) {
    return (
        <Swiper
            slidesPerView="auto"
            modules={[Pagination]}
            pagination={{
                clickable: true,
                el: "#seasonal-pagination",
                type: "bullets",
                horizontalClass: "w-fit m-auto",
                bulletActiveClass: "list-pagination-active",
                bulletClass: "list-pagination"
            }}
        >
            {
                list.map((item) => {
                    return (
                        <SwiperSlide key={item.id} style={{ width: "95%", maxWidth: "550px", paddingRight: 20 }}>
                            <SeasonalMangaCard {...item} />
                        </SwiperSlide>
                    )
                })
            }
            <div className="mt-3 hidden sm:block" slot="container-end">
                <div id="seasonal-pagination"></div>
            </div>
        </Swiper>
    );
}