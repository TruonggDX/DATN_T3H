// components/ProductImageCarousel.js
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductImageCarousel({ images = [] }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    if (images.length === 0) images = [{ url: "/images/no-image.jpg" }];

    return (
        <>
            {/* Ảnh chính */}
            <Swiper
                style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff" }}
                loop
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="main-swiper rounded"
            >
                {images.map((img, i) => (
                    <SwiperSlide key={i}>
                        <div className="position-relative bg-white" style={{ paddingTop: "100%" }}>
                            <Image
                                src={img.url}
                                alt={`Ảnh sản phẩm ${i + 1}`}
                                fill
                                className="object-contain p-8"
                                priority={i === 0}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnail nhỏ */}
            {images.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode
                    watchSlidesProgress
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="thumb-swiper mt-3"
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <div className="border rounded overflow-hidden cursor-pointer">
                                <Image src={img.url} width={80} height={80} alt="" className="object-cover w-100 h-100" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </>
    );
}