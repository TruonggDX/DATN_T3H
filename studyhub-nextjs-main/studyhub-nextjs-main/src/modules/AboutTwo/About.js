import Image from "next/image";
import Link from "next/link";

export default function About() {

	return (
		<div className="about-area-start style-two">
			<div className="container">
				<p className="paragraph">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text. Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from characteristic words etc.</p>
				<div className="row align-items-center">
					<div className="col-xl-6 col-lg-12">
						{/* about-one-imagearea */}
						<div className="about-one-left-image">
							<div className="second-order">
								<Image src="/images/about/08.jpg" alt="about" width="1532" height="828" />
							</div>
						</div>
						{/* about-one-imagearea end */}
					</div>
					<div className="col-xl-6 col-lg-12 pl--60 pl_lg--15 pl_md--10 pl_sm--10 pt_lg--50 pt_md--50 pt_sm--50">
						<div className="title-area-left-style">
							<h2 className="title">Know Studyhub Empowering
								Learners Worldwide</h2>
						</div>
						<div className="about-inner-right-two">
							<div className="what-you-get">
								{/* single-facilities */}
								<div className="single-facilityes">
									<div className="icon">
										<Image src="/images/about/icon/06.png" alt="icon-image" width="50" height="50" />
									</div>
									<div className="information">
										<h5 className="title">Wide Range </h5>
										<p>We are passionate education.</p>
									</div>
								</div>
								{/* single-facilities end */}
								{/* single-facilities */}
								<div className="single-facilityes">
									<div className="icon">
										<Image src="/images/about/icon/07.png" alt="icon-image" width="50" height="50" />
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
