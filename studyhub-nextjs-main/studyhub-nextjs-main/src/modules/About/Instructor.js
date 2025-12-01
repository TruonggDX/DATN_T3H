import SingleInstructor from "@/components/Instructor";
import Instructors from "@/data/instructors.json";
import Image from "next/image";
import Link from "next/link";

export default function Instructor() {

	return (
		<div className="instrustor-area rts-section-gap">
			<div className="container pb--120">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-between-area align-items-end">
							<div className="title-area-left-style">
								<div className="pre-title">
									<Image src="/images/banner/bulb.png" alt="icon" width="44" height="44" />
									<span>Instructor</span>
								</div>
								<h2 className="title">Our Professional Instructor</h2>
								<p className="post-title">You'll find something to spark your curiosity and enhance</p>
							</div>
							<Link href="/instructor" className="rts-btn btn-primary with-arrow">View All Teacher <i className="fa-light fa-arrow-right"></i></Link>
						</div>
					</div>
				</div>
				<div className="row g-5 mt--10">
					{
						Instructors.map((instructor, index) => {
							return (
								<div key={index} className="col-lg-3 col-md-6 col-sm-12 col-12">
									<SingleInstructor 
										Slug={instructor.slug}
										Img={instructor.img}
										Name={instructor.name}
										Position={instructor.position}
										imgWidth={instructor.imgWidth}
										imgHeight={instructor.imgHeight}
									/>
								</div>
							);
						}).slice(0, 4)
					}
				</div>
			</div>
		</div>
	)
}
