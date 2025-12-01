import Testimonials from "@/data/testimonials.json";
import useShapeMove from "@/hooks/useShapeMove";
import Image from "next/image";
import { useRef } from 'react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import SingleTestimonial from "@/components/Testimonial";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);

export default function Testimonial() {

	const shapeMoveRef = useRef(null);
  	useShapeMove(shapeMoveRef);

	  const sliderOptions = {
		slidesPerView: 1,
		spaceBetween: 20,
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
			575: {
				pagination: {
					clickable: true,
				},
			},
			0: {
				pagination: false,
			},
		},
	};
	
	return (
		<div className="rts-feedback-area rts-section-gap bg-light-1 shape-move" ref={shapeMoveRef}>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-area-center-style">
							<div className="pre-title">
								<Image src="/images/banner/bulb.png" alt="icon" width="44" height="44" />
								<span>Student Review</span>
							</div>
							<h2 className="title">Our Students Feedback</h2>
							<p className="post-title">You'll find something to spark your curiosity and enhance</p>
						</div>
					</div>
				</div>
				<div className="row mt--50">
					<div className="col-lg-12">
						<div className="students-feedback-wrapper-1 bg_image">
							<Swiper {...sliderOptions} className="mySwiper-testimonials-1">
								{
									Testimonials.map((testimonial, index) => {
										return (
											<SwiperSlide key={index}>
												<SingleTestimonial
													Img={testimonial.img}
													Avatar={testimonial.avatar}
													Content={testimonial.content}
													Author={testimonial.author}
													Position={testimonial.position}
												/>
											</SwiperSlide>
										);
									}).slice(0, 3)
								}
								<div className="swiper-button-next">
									<i className="fa-solid fa-chevron-right"></i>
								</div>
								<div className="swiper-button-prev">
									<i className="fa-solid fa-chevron-left"></i>
								</div>
							</Swiper>
							<div className="shape-image">
								<div className="shape one" data-speed="0.04" data-revert="true">
									<Image src="/images/banner/18.png" alt="" width="71" height="82" />
									</div>
								<div className="shape three" data-speed="0.04">
									<Image src="/images/banner/17.png" alt="" width="55" height="47" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
