import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CountUp from "react-countup";
import ModalVideo from 'react-modal-video';

export default function About() {
    const [state, setState] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(!isOpen);

	return (
		<div className="about-area-start rts-section-gapBottom rts-section-gap">
			<ModalVideo channel='youtube' isOpen={isOpen} videoId='FdrNFEbcsRs' onClose={() => { openModal(); }} />	
			<div className="container">
				<div className="row align-items-center">
					<div className="col-xl-6 col-lg-12">
						{/* about-one-imagearea */}
						<div className="about-one-left-image">
							<div className="first-order">
								<div className="thumb-one">
									<Image src="/images/about/03.jpg" alt="about" width="215" height="107" />
									<div className="information">
										<div className="left">
											<h3 className="title"><span className="counter animated fadeInDownBig">
												2.<CountUp start={state ? 0 : 4} end={4} duration={10} onEnd= {()=> setState(false)} />	
											</span>k</h3>
											<span className="review">Positive Review</span>
										</div>
										<div className="right">
											<svg xmlns="http://www.w3.org/2000/svg" width="49" height="45" viewBox="0 0 49 45" fill="none">
												<path d="M48.8274 16.6142C48.9437 16.2489 48.6895 15.9121 48.347 15.8791L43.9873 15.4516C43.2272 14.0595 42.4698 12.6582 41.709 11.2689C41.5065 11.1576 41.2882 11.0795 41.0652 11.0189C40.7736 10.7695 40.3334 10.8874 40.1849 11.2263L38.2501 15.6537L33.5064 16.5701C33.0455 16.6585 32.8859 17.2398 33.237 17.5515L36.8497 20.7596L36.2555 25.5544C36.2134 25.8934 36.478 26.1914 36.8187 26.1914C37.1004 26.1914 36.9733 26.1592 41.2735 23.6691L45.6495 25.7162C46.0788 25.9151 46.545 25.5367 46.4444 25.0799L45.5377 20.9545C46.6626 19.6901 47.7911 18.4053 49 17.2246C48.9425 17.0212 48.8849 16.8177 48.8274 16.6142ZM41.4841 22.5141C41.3152 22.4357 41.1175 22.4431 40.9564 22.5392L37.5233 24.5523L38.0129 20.603C38.0362 20.4182 37.9663 20.2334 37.8267 20.1093L34.8506 17.4666L38.7582 16.7113C38.9419 16.6758 39.0959 16.5524 39.1706 16.3817L40.7643 12.7346L42.6898 16.2184C42.7799 16.3817 42.9451 16.4903 43.131 16.5081L47.0914 16.8968L44.374 19.8041C44.2465 19.9401 44.1941 20.1307 44.2343 20.3133L45.089 24.2005L41.4841 22.5141Z" fill="white" />
												<path d="M13.5127 43.6945C13.7226 44.09 13.9886 44.5051 14.2119 44.9073L34.4773 44.996C34.7177 44.6152 34.975 44.1581 35.2263 43.7281C35.6251 43.6329 35.7421 43.2581 35.6236 42.9743C35.2068 41.9737 34.1408 39.9902 33.3038 39.0198C32.0198 37.5315 30.8133 36.6313 29.2695 36.0098C29.0481 35.9208 28.7272 36.0088 28.5856 36.2204C27.7723 37.4376 26.2 38.2875 24.7623 38.2875C23.2957 38.2875 21.8878 37.5366 20.9962 36.2781C20.866 36.0945 20.5556 35.9924 20.3341 36.0748C19.4047 36.4229 18.5926 36.8161 17.9851 37.2115C15.9561 38.5299 14.4023 40.809 13.1497 42.8642C12.9682 43.1629 13.0779 43.5944 13.5127 43.6945ZM18.604 38.1633C19.0606 37.8662 19.6638 37.5677 20.3537 37.2886C21.4618 38.6279 23.0749 39.4226 24.7623 39.4226C26.4002 39.4226 28.1676 38.5368 29.2346 37.2323C31.6115 38.3184 33.0432 40.2861 34.211 42.6233L14.6562 42.5937C15.7392 40.9014 17.0336 39.1839 18.604 38.1633Z" fill="white" />
												<path d="M19.756 30.1313C19.9121 31.2014 20.2411 32.3617 20.9415 33.3687C23.2636 36.7061 28.2059 36.3779 29.2731 31.0068C29.3286 30.7913 29.3773 30.5797 29.4202 30.3691C30.9482 30.0657 31.047 27.9821 30.196 27.3302C31.2172 23.3953 27.9328 20.0259 24.4208 21.5083C24.5621 21.2392 24.4702 20.9047 24.2043 20.7529C23.9319 20.597 23.5857 20.6916 23.4294 20.9628C23.3404 21.1184 23.2721 21.2828 23.2136 21.4503C22.7494 21.2134 22.2332 21.6644 22.4455 22.1672C20.6248 22.2992 19.0325 24.0625 19.3937 27.0238C18.0892 27.4481 18.1645 29.458 19.756 30.1313ZM21.8734 32.7198C21.2197 31.7807 20.8677 30.5504 20.7771 28.8879C22.6569 28.9417 25.3019 27.7461 26.6844 26.1086C26.9802 27.206 27.4758 28.2307 28.3977 28.8893C28.3216 29.9825 28.2012 31.1223 27.7656 32.1427C27.3004 33.2335 26.4801 34.0427 25.5718 34.3065C24.1566 34.7196 22.6387 33.8202 21.8734 32.7198ZM20.4929 25.7383C20.6798 23.8314 22.1208 22.9441 23.2059 23.3957C23.4298 23.491 23.6892 23.4304 23.8503 23.2486C24.5808 22.4231 26.0156 22.0595 27.0458 22.4386C28.9851 23.1516 29.8257 25.6421 28.8327 27.7838C28.0116 27.0339 27.7037 25.7493 27.5055 24.4443C27.4135 23.8434 26.5697 23.7934 26.3995 24.3689C25.8715 26.1642 22.5556 27.8878 20.6781 27.7578C20.4984 26.9618 20.4358 26.3207 20.4929 25.7383Z" fill="white" />
												<path d="M32.7133 6.03677L28.0902 5.58264C26.927 3.95966 25.856 2.24302 24.9835 0.449742C24.6327 0.313532 24.2646 0.229653 23.8923 0.175012C23.6066 -0.120622 23.1245 -0.0259308 22.9645 0.340414L20.6004 5.75003L14.8036 6.86964C14.3427 6.95796 14.183 7.53929 14.5342 7.85106L18.9487 11.7715L18.2226 17.6312C18.1647 18.0979 18.6696 18.4285 19.0729 18.1899L24.1658 15.2028L29.5133 17.7044C29.9416 17.9032 30.409 17.5258 30.3082 17.0681L29.1998 12.0238C30.5803 10.5656 31.9653 9.05626 33.345 7.60783C33.2833 7.35989 33.2216 7.11199 33.1599 6.8641C33.348 6.50531 33.111 6.07503 32.7133 6.03677ZM24.3764 14.0477C24.2076 13.9694 24.0099 13.9768 23.8488 14.0729L19.4904 16.6291L20.1119 11.6149C20.1352 11.4301 20.0654 11.2454 19.9257 11.1212L16.1478 7.76607L21.1085 6.8083C21.2921 6.77283 21.4462 6.64941 21.5212 6.47796L23.5439 1.84801L25.9882 6.2703C26.0784 6.43362 26.2436 6.54225 26.4294 6.55999L31.4581 7.05366L28.008 10.7451C27.8805 10.881 27.828 11.0717 27.8683 11.2542L28.9528 16.1887L24.3764 14.0477Z" fill="white" />
												<path d="M3.20913 25.5542C3.1512 26.021 3.65611 26.3515 4.05937 26.1129L8.22707 23.669L12.6032 25.7161C13.0324 25.915 13.4986 25.5366 13.398 25.0798L12.6382 21.6227C13.7118 20.162 14.8738 18.6499 16.1916 17.426C16.0123 17.1823 15.8814 16.908 15.7777 16.6237C15.9023 16.2557 15.6466 15.9123 15.3006 15.879L11.3639 15.493C10.632 14.1393 9.93623 12.8115 9.19689 11.4525C8.80498 11.2269 8.37884 11.0633 7.93903 10.9583C7.65691 10.7944 7.27552 10.9135 7.13849 11.2262L5.20374 15.6536L0.459984 16.57C-0.000908753 16.6583 -0.160524 17.2397 0.190612 17.5514L3.8033 20.7595L3.20913 25.5542ZM1.80426 17.4664L5.71182 16.7112C5.89546 16.6757 6.04955 16.5523 6.12419 16.3816L7.71788 12.7345L9.6434 16.2182C9.73356 16.3816 9.89873 16.4902 10.0846 16.5079L14.045 16.8966L11.3276 19.8039C11.2001 19.9399 11.1477 20.1306 11.1879 20.3131L12.0426 24.2004L8.43769 22.5139C8.26882 22.4356 8.07113 22.443 7.91003 22.5391L4.47692 24.5521L4.96652 20.6028C4.9898 20.4181 4.91996 20.2333 4.78029 20.1092L1.80426 17.4664Z" fill="white" />
											</svg>
										</div>
									</div>
								</div>
								<div className="thumb-bottom">
									<Image src="/images/about/02.jpg" alt="about" width="215" height="366" />
								</div>
							</div>
							<div className="second-order">
								<Image src="/images/about/01.jpg" alt="about" width="470" height="493" />
								<div className="vedio-icone">
									<a className="video-play-button play-video popup-video" href="#" onClick={() => { openModal(); }}>
										<span></span>
									</a>
								</div>
							</div>
						</div>
						{/* about-one-imagearea end */}
					</div>
					<div className="col-xl-6 col-lg-12 pl--60 pl_lg--15 pl_md--10 pl_sm--10 pt_lg--50 pt_md--50 pt_sm--50">
						<div className="title-area-left-style">
							<div className="pre-title">
								<Image src="/images/banner/bulb.png" alt="icon" width="44" height="44" />
								<span>Gateway to Lifelong Learning</span>
							</div>
							<h2 className="title">Know Studyhub Empowering
								Learners Worldwide</h2>
							<p className="post-title">We are passionate about education and dedicated to providing high- <br /> quality learning resources for learners of all backgrounds.</p>
						</div>
						<div className="about-inner-right-one">
							<div className="what-you-get">
								{/* single-facilities */}
								<div className="single-facilityes">
									<div className="icon">
										<Image src="/images/about/icon/01.png" alt="icon-image" width="50" height="50" />
									</div>
									<div className="information">
										<h5 className="title">Learn with Expert </h5>
										<p>We are passionate education.</p>
									</div>
								</div>
								{/* single-facilities end */}
								{/* single-facilities */}
								<div className="single-facilityes">
									<div className="icon">
										<Image src="/images/about/icon/02.png" alt="icon-image" width="50" height="50" />
									</div>
									<div className="information">
										<h5 className="title">Expert Instructors</h5>
										<p>We are passionate about education</p>
									</div>
								</div>
								{/* single-facilities end */}
							</div>
							<div className="author-area">
								<div className="single-author-and-info">
									<Image src="/images/about/01.png" alt="about" width="50" height="50" />
									<div className="information">
										<a href="#">
											<h6 className="title">William James</h6>
										</a>
										<p className="desig">CEO, Studyhub Online Education</p>
									</div>
								</div>
								<Link href="about" className="rts-btn btn-primary">About Us</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
