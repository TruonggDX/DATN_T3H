import useShapeMove from "@/hooks/useShapeMove";
import Image from "next/image";
import { useRef } from 'react';

import Categories from "@/data/categories.json";
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import SingleCategory from "@/components/Category";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);

export default function Category() {
	const shapeMoveRef = useRef(null);
  	useShapeMove(shapeMoveRef);

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
			1366: {
				slidesPerView: 6,
				spaceBetween: 20,
			},
			1200: {
				slidesPerView: 5,
			},
			992: {
				slidesPerView: 4,
			},
			767: {
				slidesPerView: 3,
			},
			575: {
				slidesPerView: 2,
			},
			0: {
				slidesPerView: 1,
			},
		},
	};

	return (
		<div className="category-area-style-one shape-move rts-section-gap bg_image" ref={shapeMoveRef}>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-area-center-style">
							<div className="pre-title">
								<Image src="/images/banner/bulb.png" alt="icon" width="44" height="44" />
								<span>Top Category</span>
							</div>
							<h2 className="title">Explore 2000+ Free Online Courses</h2>
							<p className="post-title">You'll find something to spark your curiosity and enhance</p>
						</div>
					</div>
				</div>
				<div className="row mt--50">
					<div className="col-lg-12">
						<div className="category-swiper-wrapper">
							<Swiper {...sliderOptions} className="mySwiper-category-1">
								{
									Categories.map((category, index) => {
										return (
											<SwiperSlide key={index}>
												<SingleCategory
													Slug={category.slug}
													Img={category.img}
													Title={category.title}
													categoryCount={category.categoryCount}
													imgWidth={category.imgWidth}
													imgHeight={category.imgHeight}
												/>
											</SwiperSlide>
										);
									}).slice(0, 10)
								}
								<div className="swiper-button-next">
									<i className="fa-solid fa-chevron-right"></i>
								</div>
								<div className="swiper-button-prev">
									<i className="fa-solid fa-chevron-left"></i>
								</div>
							</Swiper>
						</div>
					</div>
				</div>
			</div>
			<div className="shape-image">
				<div className="shape one" data-speed="0.04" data-revert="true">
					<Image src="/images/banner/15.png" alt="" width="59" height="48" />
				</div>
				<div className="shape two" data-speed="0.04">
					<Image src="/images/banner/shape/banner-shape02.svg" alt="" width="49" height="74" />
				</div>
				<div className="shape three" data-speed="0.04">
					<Image src="/images/banner/shape/banner-shape03.svg" alt="" width="37" height="40" />
				</div>
			</div>
		</div>
	)
}
