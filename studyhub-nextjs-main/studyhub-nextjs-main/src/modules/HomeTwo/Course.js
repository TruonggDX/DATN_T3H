import Courses from "@/data/courses.json";
import Image from "next/image";
import Link from "next/link";
import SwiperCore from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';


import SingleCourse from "@/components/Course";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);
import productService from "@/service/productService";
import {useEffect, useState} from "react";

export default function Course() {

    const sliderOptions = {
        slidesPerView: 6,
        spaceBetween: 30,
        centeredSlides: false,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            clickable: true,
        },
        breakpoints: {
            1240: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            740: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
        },
    };
    const [products, setProducts] = useState([]);
    useEffect(() => {
        productService.getAllProducts().then((data) => {
            setProducts(data.content)
        })
    }, []);
    return (
        <div className="course-area-two rts-section-gapBottom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="title-between-area align-items-end">
                            <div className="title-area-left-style">
                                <h2 className="title mb--5">Sản phẩm</h2>
                            </div>
                            <Link href="/course" className="rts-btn with-arrow p-0">Xem tất cả sản phẩm<i
                                className="fa-light fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
                <div className="row g-5 mt--20">
                    <Swiper {...sliderOptions} className="mySwiper-category-1 swiper-float-right-course">
                        {
                            products.map((course, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <SingleCourse
                                            Slug={course.id}
                                            Img={course.imageDtos[0]?.url }
                                            Category={course.categoryName}
                                            lessonCount={course.code}
                                            studentCount={course.brandName}
                                            Title={course.name}
                                            Author={course.authorName}
                                            ratingCount={course.ratingCount}
                                            prevPrice={course.prevPrice}
                                            Price={course.price}
                                            imgWidth={course.imgWidth}
                                            imgHeight={course.imgHeight}
                                        />
                                    </SwiperSlide>
                                )
                            }).slice(0, 5)
                        }
                        <div className="swiper-button-next"><i className="fa-solid fa-chevron-right"></i></div>
                        <div className="swiper-button-prev"><i className="fa-solid fa-chevron-left"></i></div>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
