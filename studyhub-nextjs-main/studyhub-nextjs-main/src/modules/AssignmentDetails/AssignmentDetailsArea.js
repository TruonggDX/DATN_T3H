import SingleInstructor from "@/components/Instructor";
import Assignments from "@/data/assignments.json";
import Instructors from "@/data/instructors.json";
import Image from "next/image";

export default function AssignmentDetailsArea({item}) {
	if (!item) {
		item = Assignments[0]
	}

	const { description, topic, marks, submit } = item;

	return (
		<>
			<div className="rts-events-area rts-section-gap">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="rts-events-details-area-information quiz-details">
								<h5 className="title">About The Assignment</h5>
								<p className="disc">
									{description || "Join us for the Future Minds Symposium, a thought-provoking educational event designed to inspire and empower individuals to navigate the challenges and opportunities of tomorrow's world. This symposium brings together leading experts, visionaries, and innovators from various fields to explore cutting-edge ideas and share insights on shaping the future."}
								</p>
							</div>
						</div>
						<div className="col-lg-4 rts-sticky-column-item">
							<div className="events-information-wrapper">
								<h4 className="title">Assignment Information</h4>
								<div className="single-information">
									<div className="icon">
										<Image src="/images/events/icon/01.png" width="50" height="50" alt="icon" />
										<span>Topic:</span>
									</div>
									<span>{topic || "Assignments Topic"}</span>
								</div>
								<div className="single-information">
									<div className="icon">
										<Image src="/images/events/icon/02.png" width="50" height="50" alt="icon" />
										<span>Total Marks:</span>
									</div>
									<span>{marks || "100"}</span>
								</div>
								<div className="single-information pb-0 no-border">
									<div className="icon">
										<Image src="/images/events/icon/03.png" width="50" height="50" alt="icon" />
										<span>Submitted By:</span>
									</div>
									<span>{submit || '54'}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="instructor-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="title-between-area">
								<div className="title-area-left-style">
									<h2 className="title">Assignment Instructors</h2>
								</div>
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

			<div className="rts-section-gap"></div>
		</>
	)
}
