import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CountUp from "react-countup";

export default function DashboardHome() {
    const [state, setState] = useState(true);

	return (
		<div className="right-sidebar-dashboard">
			<div className="row g-5">
				<div className="col-lg-4 col-md-6 col-sm-6 col-12">
					{/* single dashboard-card */}
					<div className="single-dashboard-card">
						<div className="icon">
							<i className="fa-light fa-book-open"></i>
						</div>
						<h5 className="title"><span className="counter animated fadeInDownBig">
							<CountUp start={state ? 0 : 30} end={30} duration={10} onEnd= {()=> setState(false)} />		
						</span></h5>
						<p>Enrolled Courses</p>
					</div>
					{/* single dashboard-card end */}
				</div>
				<div className="col-lg-4 col-md-6 col-sm-6 col-12">
					{/* single dashboard-card */}
					<div className="single-dashboard-card">
						<div className="icon">
							<i className="fa-regular fa-graduation-cap"></i>
						</div>
						<h5 className="title"><span className="counter animated fadeInDownBig">
							<CountUp start={state ? 0 : 10} end={10} duration={10} onEnd= {()=> setState(false)} />	
						</span></h5>
						<p>Active Courses</p>
					</div>
					{/* single dashboard-card end */}
				</div>
				<div className="col-lg-4 col-md-6 col-sm-6 col-12">
					{/* single dashboard-card */}
					<div className="single-dashboard-card">
						<div className="icon">
							<i className="fa-light fa-trophy"></i>
						</div>
						<h5 className="title"><span className="counter animated fadeInDownBig">
							<CountUp start={state ? 0 : 36} end={36} duration={10} onEnd= {()=> setState(false)} />	
						</span></h5>
						<p>Completed Courses</p>
					</div>
					{/* single dashboard-card end */}
				</div>
				<div className="col-lg-4 col-md-6 col-sm-6 col-12">
					{/* single dashboard-card */}
					<div className="single-dashboard-card">
						<div className="icon">
							<i className="fa-light fa-user"></i>
						</div>
						<h5 className="title"><span className="counter animated fadeInDownBig">
							<CountUp start={state ? 0 : 41} end={41} duration={10} onEnd= {()=> setState(false)} />		
						</span></h5>
						<p>Total Students</p>
					</div>
					{/* single dashboard-card end */}
				</div>
				<div className="col-lg-4 col-md-6 col-sm-6 col-12">
					{/* single dashboard-card */}
					<div className="single-dashboard-card">
						<div className="icon">
							<i className="fa-light fa-book"></i>
						</div>
						<h5 className="title"><span className="counter animated fadeInDownBig">
							<CountUp start={state ? 0 : 28} end={28} duration={10} onEnd= {()=> setState(false)} />	
						</span></h5>
						<p>Total Courses</p>
					</div>
					{/* single dashboard-card end */}
				</div>
				<div className="col-lg-4 col-md-6 col-sm-6 col-12">
					{/* single dashboard-card */}
					<div className="single-dashboard-card">
						<div className="icon">
							<i className="fa-sharp fa-solid fa-dollar-sign"></i>
						</div>
						<h5 className="title">$<span className="counter animated fadeInDownBig">
							<CountUp start={state ? 0 : 2900} end={2900} duration={10} onEnd= {()=> setState(false)} />		
						</span></h5>
						<p>Total Earning</p>
					</div>
					{/* single dashboard-card end */}
				</div>
			</div>
			<div className="row mt--40">
				<div className="col-lg-12">
					{/* in progress course area */}
					<div className="in-progress-course-wrapper">
						<h5 className="title">In Progress Courses</h5>
					</div>
					{/* in progress course area end */}
					{/* single progress area start */}
					<div className="single-progress-course">
						<Link href="/course/single-course" className="thumbnail">
							<Image src="/images/dashboard/02.jpg" width={290} height={192} alt="Image" />
						</Link>
						<div className="information-progress-course">
							<div className="rating-area">
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<span>(0)</span>
							</div>
							<Link href="/course/single-course">
								<h5 className="title">User Experience The Ultimate Guide to Usability and UX</h5>
							</Link>
							<span className="comp">Completed Lessons: 0 of 1 lesson</span>
							<div className="progress-wrapper-lesson-compleate">
								<div className="progress">
									<div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{"width": "25%"}}>
									</div>
								</div>
								<div className="end">
									<span>0% Complete</span>
								</div>
							</div>
						</div>
					</div>
					{/* single progress area end */}
					{/* single progress area start */}
					<div className="single-progress-course">
						<Link href="/course/single-course" className="thumbnail">
							<Image src="/images/dashboard/03.jpg" width={290} height={192} alt="Image" />
						</Link>
						<div className="information-progress-course">
							<div className="rating-area">
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<span>(0)</span>
							</div>
							<Link href="/course/single-course">
								<h5 className="title">Front-End Course With Bootstrap 5</h5>
							</Link>
							<span className="comp">Completed Lessons: 5 of 7 lesson</span>
							<div className="progress-wrapper-lesson-compleate">
								<div className="progress">
									<div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{"width": "55%"}}>
									</div>
								</div>
								<div className="end">
									<span>80% Complete</span>
								</div>
							</div>
						</div>
					</div>
					{/* single progress area end */}
					{/* single progress area start */}
					<div className="single-progress-course">
						<Link href="/course/single-course" className="thumbnail">
							<Image src="/images/dashboard/04.jpg" width={290} height={192} alt="Image" />
						</Link>
						<div className="information-progress-course">
							<div className="rating-area">
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<span>(0)</span>
							</div>
							<Link href="/course/single-course">
								<h5 className="title">PHP Basic to Advance Full Course In English</h5>
							</Link>
							<span className="comp">Completed Lessons: 3 of 6 lesson</span>
							<div className="progress-wrapper-lesson-compleate">
								<div className="progress">
									<div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{"width": "75%"}}>
									</div>
								</div>
								<div className="end">
									<span>50% Complete</span>
								</div>
							</div>
						</div>
					</div>
					{/* single progress area end */}
				</div>
			</div>
			<div className="row mt--40">
				<div className="col-lg-12">
					{/* in progress course area */}
					<div className="in-progress-course-wrapper  title-between-dashboard mb--10">
						<h5 className="title">My Courses</h5>
						<a href="#" className="more">View All</a>
					</div>
					{/* in progress course area end */}

					{/* my course enroll wrapper */}
					<div className="my-course-enroll-wrapper-board">
						{/* single course inroll */}
						<div className="single-course-inroll-board head">
							<div className="name">
								<p>My Course</p>
							</div>
							<div className="enroll">
								<p>Enrolled</p>
							</div>
							<div className="rating">
								<p>Rating</p>
							</div>
						</div>
						{/* single course inroll end */}
						{/* single course inroll */}
						<div className="single-course-inroll-board">
							<div className="name">
								<p>New Course</p>
							</div>
							<div className="enroll">
								<p>2</p>
							</div>
							<div className="rating">
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
							</div>
						</div>
						{/* single course inroll end */}
						{/* single course inroll */}
						<div className="single-course-inroll-board">
							<div className="name">
								<p>My Course</p>
							</div>
							<div className="enroll">
								<p>0</p>
							</div>
							<div className="rating">
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
							</div>
						</div>
						{/* single course inroll end */}
						{/* single course inroll */}
						<div className="single-course-inroll-board">
							<div className="name">
								<p>Test New Course</p>
							</div>
							<div className="enroll">
								<p>2</p>
							</div>
							<div className="rating">
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
							</div>
						</div>
						{/* single course inroll end */}
						{/* single course inroll */}
						<div className="single-course-inroll-board">
							<div className="name">
								<p>New Course</p>
							</div>
							<div className="enroll">
								<p>2</p>
							</div>
							<div className="rating">
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
								<i className="fa-light fa-star"></i>
							</div>
						</div>
						{/* single course inroll end */}
					</div>
					{/* my course enroll wrapper end */}
				</div>
			</div>
		</div>
	)
}
