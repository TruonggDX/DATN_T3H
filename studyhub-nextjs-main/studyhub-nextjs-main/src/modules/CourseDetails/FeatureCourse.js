import SingleCourseTwo from "@/components/Course/Two";
import Courses from "@/data/courses.json";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';

export default function FeatureCourse(props) {
	let {type, item} = props;
	if (!item) {
		item = Courses[0]
	}

	const featuredCourse = Courses.filter(course => course?.category === item?.category && course?.id !== item?.id);
	console.log('featuredCourse : ', featuredCourse );

	const sliderOptions = {
		slidesPerView: 6,
		spaceBetween: 30,
		centeredSlides: false,
		loop: true,
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

	return (
		featuredCourse.length > 0 &&
		<div className="rts-section-gapBottom rts-feature-course-area">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-between-area">
							<div className="title-area-left-style">
								<div className="pre-title">
									<Image src="/images/banner/bulb.png" width={22} height={22} alt="icon" />
									<span>More Similar Courses</span>
								</div>
								<h2 className="title">Related Courses</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt--50 ">
					<div className="col-lg-12">
						<Swiper {...sliderOptions} className="mySwiper-category-1 swiper-float-right-course">
							{
								featuredCourse.map((course, index) => {
									return (
										<SwiperSlide key={index}>
											<SingleCourseTwo
												Slug={course?.slug}
												Img={course?.img}
												Category={course?.category}
												lessonCount={course?.lessonCount}
												studentCount={course?.studentCount}
												Title={course?.title}
												Author={course?.authorName}
												ratingCount={course?.ratingCount}
												prevPrice={course?.prevPrice}
												Price={course?.price}
												imgWidth={course?.imgWidth}
												imgHeight={course?.imgHeight}
											/>
										</SwiperSlide>
									);
								}).slice(0,10)
							}
						</Swiper>
					</div>
				</div>
			</div>
		</div>
	)
}
