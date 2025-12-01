import ScrollTop from "@/components/ScrollTop";
import Link from "next/link";
import { useState } from "react";

export default function LessonDetailsModule() {
	const [ activeSidebar, setActiveSidebar ] = useState(true)
	const [ activeTab, setActiveTab ] = useState("intro")
	const [ activeTopic, setActiveTopic ] = useState(1)

	return (
		<>
			<div className={`rts-lession-details-area-start ${activeTopic}`}>
				<div className="rts-lession-content-wrapper">
					{
						activeSidebar &&
						<div className="rts-lession-left">
							<div className="content-wrapper">
								<div className="inner-content">
									<input type="text" placeholder="Search Courses" />
									<i className="fa-solid fa-magnifying-glass"></i>
								</div>
							</div>
							{/* course content accordion area */}
							<div className="course-content-wrapper-main mt--40">
								<div className="accordion mt--30" id="accordionExample">
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingOne">
											<button 
												className="accordion-button" 
												id="home-tab" 
												aria-expanded={activeTab === "intro"}
												onClick={()=> {setActiveTab("intro")}}
											>
												<span>Introduction</span>
												<span>29 min</span>
											</button>
										</h2>
										<div className={`accordion-collapse collapse ${activeTab === "intro" && "show"}`
										}>
											<div className="accordion-body">
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 1 ? "active" : ""}`} onClick={()=>{setActiveTopic(1)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Introduction To</span>
													</div>
													<div className="right">
														<span className="play">Preview</span>
														<span>9 min</span>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 2 ? "active" : ""}`} onClick={()=>{setActiveTopic(2)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Fundation to the course</span>
													</div>
													<div className="right">
														{/* <span className="play">Preview</span> */}
														<span>9 min</span>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 3 ? "active" : ""}`} onClick={()=>{setActiveTopic(3)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Main Module</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingTwo">
											<button 
												className="accordion-button" 
												id="home-tab" 
												aria-expanded={activeTab === "story"}
												onClick={()=> {setActiveTab("story")}}
											>
												<span>Learn to Storyboard</span>
												<span>7 L .120 min</span>
											</button>
										</h2>
										<div className={`accordion-collapse collapse ${activeTab === "story" && "show"}`
										}>
											<div className="accordion-body">
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 4 ? "active" : ""}`} onClick={()=>{setActiveTopic(4)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Become a storyboard artist</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 5 ? "active" : ""}`} onClick={()=>{setActiveTopic(5)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>storyboard artist</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 6 ? "active" : ""}`} onClick={()=>{setActiveTopic(6)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Introduction PHP</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 7 ? "active" : ""}`} onClick={()=>{setActiveTopic(7)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Learning Fundamentsl Elementor</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 8 ? "active" : ""}`} onClick={()=>{setActiveTopic(8)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Enter to the course</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 9 ? "active" : ""}`} onClick={()=>{setActiveTopic(9)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Main Part of the course</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 10 ? "active" : ""}`} onClick={()=>{setActiveTopic(10)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Function About PHP</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingThree">
											<button 
												className="accordion-button" 
												id="home-tab" 
												aria-expanded={activeTab === "application"}
												onClick={()=> {setActiveTab("application")}}
											>
												<span>Digital application</span>
												<span>7 L . 83 min</span>
											</button>
										</h2>
										<div className={`accordion-collapse collapse ${activeTab === "application" && "show"}`
										}>
											<div className="accordion-body">
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 11 ? "active" : ""}`} onClick={()=>{setActiveTopic(11)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Become a storyboard artist</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 12 ? "active" : ""}`} onClick={()=>{setActiveTopic(12)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>storyboard artist</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 13 ? "active" : ""}`} onClick={()=>{setActiveTopic(13)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Introduction PHP</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 14 ? "active" : ""}`} onClick={()=>{setActiveTopic(14)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Learning Fundamentsl Elementor</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 15 ? "active" : ""}`} onClick={()=>{setActiveTopic(15)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Enter to the course</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 16 ? "active" : ""}`} onClick={()=>{setActiveTopic(16)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Main Part of the course</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 17 ? "active" : ""}`} onClick={()=>{setActiveTopic(17)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Function About PHP</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingFour">
											<button 
												className="accordion-button" 
												id="home-tab" 
												aria-expanded={activeTab === "drawing"}
												onClick={()=> {setActiveTab("drawing")}}
											>
												<span>Digital drawing</span>
												<span>7 L . 72 min</span>
											</button>
										</h2>
										<div className={`accordion-collapse collapse ${activeTab === "drawing" && "show"}`
										}>
											<div className="accordion-body">
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 18 ? "active" : ""}`} onClick={()=>{setActiveTopic(18)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Become a storyboard artist</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 19 ? "active" : ""}`} onClick={()=>{setActiveTopic(19)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>storyboard artist</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 20 ? "active" : ""}`} onClick={()=>{setActiveTopic(20)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Introduction PHP</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 21 ? "active" : ""}`} onClick={()=>{setActiveTopic(21)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Learning Fundamentsl Elementor</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 22 ? "active" : ""}`} onClick={()=>{setActiveTopic(22)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Enter to the course</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 23 ? "active" : ""}`} onClick={()=>{setActiveTopic(23)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Main Part of the course</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 24 ? "active" : ""}`} onClick={()=>{setActiveTopic(24)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Function About PHP</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingFive">
											<button 
												className="accordion-button" 
												id="home-tab" 
												aria-expanded={activeTab === "point"}
												onClick={()=> {setActiveTab("point")}}
											>
												<span>1-point and perspective</span>
												<span>7L . 90 min</span>
											</button>
										</h2>
										<div className={`accordion-collapse collapse ${activeTab === "point" && "show"}`
										}>
											<div className="accordion-body">
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 25 ? "active" : ""}`} onClick={()=>{setActiveTopic(25)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Become a storyboard artist</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 26 ? "active" : ""}`} onClick={()=>{setActiveTopic(26)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>storyboard artist</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 27 ? "active" : ""}`} onClick={()=>{setActiveTopic(27)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Introduction PHP</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 28 ? "active" : ""}`} onClick={()=>{setActiveTopic(28)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Learning Fundamentsl Elementor</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 29 ? "active" : ""}`} onClick={()=>{setActiveTopic(29)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Enter to the course</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 30 ? "active" : ""}`} onClick={()=>{setActiveTopic(30)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Main Part of the course</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
												{/* play single area start */}
												<a href="#" className={`play-vedio-wrapper ${activeTopic === 31 ? "active" : ""}`} onClick={()=>{setActiveTopic(31)}}>
													<div className="left">
														<i className="fa-light fa-circle-play"></i>
														<span>Function About PHP</span>
													</div>
													<div className="right">
														<i className="fa-regular fa-lock"></i>
													</div>
												</a>
												{/* play single area end */}
											</div>
										</div>
									</div>
								</div>
								{/* course content accordion area end */}
							</div>
						</div>
					}
					<div className="rts-lession-right">
						<div className="lesson-top-bar">
							<div className="left-area">
								<div 
									className={`toggle-class ${!activeSidebar && "sidebar-hide"}`} 
									id="toggle-left-back"
									onClick={()=>{setActiveSidebar(!activeSidebar)}}
								>
									<i className="fa-light fa-chevron-left"></i>
								</div>
								<span>Course Content</span>
							</div>
							<div className="right">
								<Link href="/course/two"><i className="fa-solid fa-x"></i></Link>
							</div>
						</div>
						<iframe src="https://www.youtube.com/embed/uuuvttP4b_w?si=KIBa9e-IpuRnun8L" title="YouTube video player"></iframe>
						<div className="lesson-bottom-area">
							<h5 className="title mb--10">About Lesson</h5>
							<p className="disc">
								If filmmaking is your passion but you never went to film school you’ve come to the right place. Here, you will get hands-on
								experience and acquire skills that you never would’ve elsewhere like learning how to make feature films on your own, making do with any equipment, and doing it all faster and better.
							</p>
						</div>
						<div className="next-prev-area">
							<div 
								className={`prev ${activeTopic <= 1 ? "disable" : ""}`}
								onClick={()=>{setActiveTopic(activeTopic > 1 && activeTopic - 1)}}
							>
								<i className="fa-sharp fa-solid fa-play"></i>
								Prev
							</div>
							<div 
								className="next"
								onClick={()=>{setActiveTopic(activeTopic + 1)}}
							>
								Next
								<i className="fa-sharp fa-solid fa-play"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<ScrollTop />
		</>
	)
}
