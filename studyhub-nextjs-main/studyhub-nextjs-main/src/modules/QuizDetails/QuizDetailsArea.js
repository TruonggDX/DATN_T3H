import SingleInstructor from "@/components/Instructor";
import Instructors from "@/data/instructors.json";
import Quizes from "@/data/quizes.json";
import Image from "next/image";

export default function QuizDetailsArea({item}) {
	if (!item) {
		item = Quizes[0]
	}

	const { description, date, studentsParticipated, questions } = item;

	return (
		<>
			<div className="rts-events-area rts-section-gap">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="rts-events-details-area-information quiz-details">
								<h5 className="title">About The Quiz</h5>
								<p className="disc">
									{description || "Join us for the Future Minds Symposium, a thought-provoking educational event designed to inspire and empower individuals to navigate the challenges and opportunities of tomorrow's world. This symposium brings together leading experts, visionaries, and innovators from various fields to explore cutting-edge ideas and share insights on shaping the future."}
								</p>
								{/* quiz question area start */}
								{
									questions && questions.length > 0 && questions.map((question, key) => {
										return (
											<div className={`question-details-single-area ${question.isCorrect ? 'correct-answer' : 'wrong-answer'}`}>
												<div className="icon">
													{question.questionId}.
												</div>
												<div className="information">
													<h6 className="title">{question.questionText}</h6>
													<div className="question-answers">
														<div className="single-answer">
															<span><strong>Correct Answer:</strong></span>
															<span className="correct">{question.correctAnswer}</span>
														</div>
														<div className="single-answer">
															<span><strong>Answered:</strong></span>
															<span className="answered">{question.answered}</span>
														</div>
														<div className="single-answer">
															<span><strong>Result:</strong></span>
															<span className="result">{question.answerisCorrected ? 'Correct' : 'Wrong'}</span>
														</div>
													</div>
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
						<div className="col-lg-4 rts-sticky-column-item">
							<div className="events-information-wrapper">
								<h4 className="title">Quiz Information</h4>
								<div className="single-information">
									<div className="icon">
										<Image src="/images/events/icon/02.png" width="50" height="50" alt="icon" />
										<span>Date:</span>
									</div>
									<span>{date || "December 26, 2023"}</span>
								</div>
								<div className="single-information pb-0 no-border">
									<div className="icon">
										<Image src="/images/events/icon/03.png" width="50" height="50" alt="icon" />
										<span>Participated:</span>
									</div>
									<span>{studentsParticipated || '54'}</span>
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
									<h2 className="title">Quiz Instructors</h2>
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
