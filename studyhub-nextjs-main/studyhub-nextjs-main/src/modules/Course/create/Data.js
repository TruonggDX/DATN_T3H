import { useState } from "react";

export default function CourseData() {
	const [ activeTab, setActiveTab ] = useState(false)

	return (
		<div className="accordion" id="accordionExampls6">
			{/* single accordion nitem area start */}
			<div className="accordion-item">
				<h2 className="accordion-header" id="headingSix">
					<button 
						className="accordion-button" 
						aria-expanded={activeTab} 
						aria-controls="collapseOne"
						onClick={()=>{setActiveTab(!activeTab)}}
					>
						Additional Data
					</button>
				</h2>
				<div id="collapseSix" className={`accordion-collapse collapse ${activeTab && "show"}`}>
					<div className="accordion-body">
						<form action="#" className="additional-data-form">
							{/* single input form */}
							<div className="single-input-area">
								<label for="learn">What Will I Learn?</label>
								<textarea id="learn" placeholder="Write here the course benefits (One per line)"></textarea>
							</div>
							{/* single input form end */}
							{/* single input form */}
							<div className="single-input-area mt--25">
								<label for="target">Targeted Audience</label>
								<textarea id="target" placeholder="Specify the target audience that will benefit the most from the course. (One line per target audience.)"></textarea>
							</div>
							{/* single input form end */}
							<div className="course-duration-input-area">
								<div className="half-single-input">
									<p>Total Course Duration</p>
									<input id="hour" type="number" placeholder="00" />
									<label for="hour">Hour</label>
								</div>
								<div className="half-single-input">
									<input id="min" type="number" placeholder="00" />
									<label for="min">Min</label>
								</div>
							</div>
							<div className="single-input-area mt--25">
								<label for="meterials">Materials Included</label>
								<textarea id="meterials" placeholder="A list of assets you will be providing for the students in this course (One Per line)"></textarea>
							</div>
							<div className="single-input-area mt--25">
								<label for="meterials-2">Requirements/Instructions</label>
								<textarea id="meterials-2" placeholder="Additional requirements of special instructions for the students (one per line) "></textarea>
							</div>
							<div className="single-input-area mt--25">
								<label for="tags">Course Tag</label>
								<textarea id="tags" placeholder="Search Course Tags ex. Design , Development, Business"></textarea>
							</div>
						</form>
					</div>
				</div>
			</div>
			{/* single accordion nitem area end */}
		</div>
	)
}
