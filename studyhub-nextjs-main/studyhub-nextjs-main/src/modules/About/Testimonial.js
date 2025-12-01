import Testimonials from "@/data/testimonials.json";
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import SingleTestimonialTwo from "@/components/Testimonial/Two";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);

export default function Testimonial() {

	  const sliderOptions = {
		slidesPerView: 3,
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
			1200: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 2,
			},
			0: {
				slidesPerView: 1,
			},
		},
	};
	
	return (
		<div className="rts-students-feedback-area rts-section-gap">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="section-title-w-style-center">
							<h2 className="title">My Students Feedback</h2>
							<p>You'll find something to spark your curiosity and enhance</p>
						</div>
					</div>
				</div>
				<div className="row mt--50">
					<div className="col-lg-12">
						<div className="swiper-feedback-wrapper-5">
							<Swiper {...sliderOptions} className="mySwiper-testimonials-1">
								{
									Testimonials.map((testimonial, index) => {
										return (
											<SwiperSlide key={index}>
												<SingleTestimonialTwo
													Img={testimonial.avatar}
													Avatar={testimonial.avatar}
													Content={testimonial.content}
													Author={testimonial.author}
													Position={testimonial.position}
													QuoteIcon={testimonial.quoteIcon}
													imgWidth="50"
													imgHeight="50"
													testimonialClass="single-students-feedback-5"
												/>
											</SwiperSlide>
										);
									}).slice(3, 7)
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
		</div>
	)
}
