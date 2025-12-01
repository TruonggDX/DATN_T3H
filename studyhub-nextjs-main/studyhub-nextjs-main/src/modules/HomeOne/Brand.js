import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

export default function Brand() {
	const brandOptions = {
		slidesPerView: 6,
		spaceBetween: 30,
		centeredSlides: false,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
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
			0: {
				slidesPerView: 2,
			},
		},
	};

	return (
		<div className="brand-area-one ptb--100">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="brand-style-one ">
							<div className="left-title">
								<h6 className="title">Trusted by:</h6>
							</div>
							<Swiper {...brandOptions}>
								<SwiperSlide key="1">
									<div className="brand-area">
										<Image src="/images/brand/08.svg" alt="brand" width="117" height="87" />
									</div>
								</SwiperSlide>
								<SwiperSlide key="2">
									<div className="brand-area">
										<Image src="/images/brand/09.svg" alt="brand" width="117" height="87" />
									</div>
								</SwiperSlide>
								<SwiperSlide key="3">
									<div className="brand-area">
										<Image src="/images/brand/10.svg" alt="brand" width="117" height="87" />
									</div>
								</SwiperSlide>
								<SwiperSlide key="4">
									<div className="brand-area">
										<Image src="/images/brand/11.svg" alt="brand" width="117" height="87" />
									</div>
								</SwiperSlide>
								<SwiperSlide key="5">
									<div className="brand-area">
										<Image src="/images/brand/12.svg" alt="brand" width="117" height="87" />
									</div>
								</SwiperSlide>
								<SwiperSlide key="6">
									<div className="brand-area">
										<Image src="/images/brand/13.svg" alt="brand" width="117" height="87" />
									</div>
								</SwiperSlide>
								<SwiperSlide key="7">
									<div className="brand-area">
										<Image src="/images/brand/10.svg" alt="brand" width="117" height="87" />
									</div>
								</SwiperSlide>
								<SwiperSlide key="8">
									<div className="brand-area">
										<Image src="/images/brand/11.svg" alt="brand" width="117" height="87" />
									</div>
								</SwiperSlide>
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
