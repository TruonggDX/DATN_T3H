import { useState } from "react";

export default function PricingArea() {
	const [monthlyPricing, setMonthlyPricing] = useState(false);

	function handleMonthlyPricing() {
		setMonthlyPricing(!monthlyPricing)
	}

	return (
		<div className="rts-pricing-area rts-section-gap">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="section-title-w-style-center">
							<h2 className="title">Our Membership Plan</h2>
							<p>provide information on pricing or guidance on how to determine pricing</p>
						</div>
					</div>
				</div>
				<div className="row mt--50">
					<div className="col-lg-12">
						<div className="toggle-tab-area-main">
							<div className="plan-toggle-wrap">
								<div className="toggle-inner">
									<input id="rts-toggle" type="checkbox" onClick={handleMonthlyPricing} checked={monthlyPricing} />
									<span className="custom-toggle"></span>
									<span className="t-month">Yearly</span>
									<span className="t-year">Monthly</span>
								</div>
								<div className="tab-content mt--50">
									{
										monthlyPricing ? 
										<div className="row g-5">
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
												{/* single pricing area start*/}
												<div className="single--pricing-area">
													<div className="top-area">
														<span className="type">Basic</span>
														<div className="price-area">
															<h3 className="title">Free/ <span>Month</span></h3>
														</div>
													</div>
													<a href="#" className="rts-btn btn-border">Get Started</a>
													<div className="access-area">
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Access to Studyhub course</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Limited Resources or Features</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Community Support</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Get 10+ Courses </span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Try for free, forever!</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Individual Course</span>
														</div>
													</div>
												</div>
												{/* single pricing area end */}
											</div>
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
												{/* single pricing area start*/}
												<div className="single--pricing-area active">
													<div className="top-area">
														<span className="type">Professional</span>
														<div className="price-area">
															<h3 className="title">$12.00/ <span>Month</span></h3>
														</div>
													</div>
													<a href="#" className="rts-btn btn-border">Get Started</a>
													<div className="access-area">
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Access to Studyhub course</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Limited Resources or Features</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Community Support</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Get 10+ Courses </span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Try for free, forever!</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Individual Course</span>
														</div>
													</div>
												</div>
												{/* single pricing area end */}
											</div>
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
												{/* single pricing area start*/}
												<div className="single--pricing-area">
													<div className="top-area">
														<span className="type">Business</span>
														<div className="price-area">
															<h3 className="title">$09.00/ <span>Month</span></h3>
														</div>
													</div>
													<a href="#" className="rts-btn btn-border">Get Started</a>
													<div className="access-area">
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Access to Studyhub course</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Limited Resources or Features</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Community Support</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Get 10+ Courses </span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Try for free, forever!</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Individual Course</span>
														</div>
													</div>
												</div>
												{/* single pricing area end */}
											</div>
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
												{/* single pricing area start*/}
												<div className="single--pricing-area">
													<div className="top-area">
														<span className="type">Premium</span>
														<div className="price-area">
															<h3 className="title">$99/ <span>Month</span></h3>
														</div>
													</div>
													<a href="#" className="rts-btn btn-border">Get Started</a>
													<div className="access-area">
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Access to Studyhub course</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Limited Resources or Features</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Community Support</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Get 10+ Courses </span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Try for free, forever!</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Individual Course</span>
														</div>
													</div>
												</div>
												{/* single pricing area end */}
											</div>
										</div> :
										<div className="row g-5">
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
												{/* single pricing area start*/}
												<div className="single--pricing-area">
													<div className="top-area">
														<span className="type">Basic</span>
														<div className="price-area">
															<h3 className="title">Free/ <span>Year</span></h3>
														</div>
													</div>
													<a href="#" className="rts-btn btn-border">Get Started</a>
													<div className="access-area">
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Access to Studyhub course</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Limited Resources or Features</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Community Support</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Get 10+ Courses </span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Try for free, forever!</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Individual Course</span>
														</div>
													</div>
												</div>
												{/* single pricing area end */}
											</div>
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
												{/* single pricing area start*/}
												<div className="single--pricing-area active">
													<div className="top-area">
														<span className="type">Professional</span>
														<div className="price-area">
															<h3 className="title">$99.00/ <span>Year</span></h3>
														</div>
													</div>
													<a href="#" className="rts-btn btn-border">Get Started</a>
													<div className="access-area">
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Access to Studyhub course</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Limited Resources or Features</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Community Support</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Get 10+ Courses </span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Try for free, forever!</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Individual Course</span>
														</div>
													</div>
												</div>
												{/* single pricing area end */}
											</div>
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
												{/* single pricing area start*/}
												<div className="single--pricing-area">
													<div className="top-area">
														<span className="type">Business</span>
														<div className="price-area">
															<h3 className="title">$29.00/ <span>Year</span></h3>
														</div>
													</div>
													<a href="#" className="rts-btn btn-border">Get Started</a>
													<div className="access-area">
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Access to Studyhub course</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Limited Resources or Features</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Community Support</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Get 10+ Courses </span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Try for free, forever!</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Individual Course</span>
														</div>
													</div>
												</div>
												{/* single pricing area end */}
											</div>
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
												{/* single pricing area start*/}
												<div className="single--pricing-area">
													<div className="top-area">
														<span className="type">Premium</span>
														<div className="price-area">
															<h3 className="title">$89.00/ <span>Year</span></h3>
														</div>
													</div>
													<a href="#" className="rts-btn btn-border">Get Started</a>
													<div className="access-area">
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Access to Studyhub course</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Limited Resources or Features</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Community Support</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Get 10+ Courses </span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Try for free, forever!</span>
														</div>
														<div className="single-access">
															<i className="fa-solid fa-check"></i>
															<span>Individual Course</span>
														</div>
													</div>
												</div>
												{/* single pricing area end */}
											</div>
										</div>
									}
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
