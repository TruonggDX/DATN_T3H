import { useState } from "react";

export default function CourseVideo() {
	const [ activeTab, setActiveTab ] = useState(false)

	return (
		<div className="accordion" id="accordionExampls2">
			{/* single accordion nitem area start */}
			<div className="accordion-item">
				<h2 className="accordion-header" id="headingTwo">
					<button 
						className="accordion-button" 
						aria-expanded={activeTab} 
						aria-controls="collapseOne"
						onClick={()=>{setActiveTab(!activeTab)}}
					>
						Course Video
					</button>
				</h2>
				<div id="collapseTwo" className={`accordion-collapse collapse ${activeTab && "show"}`}>
					<div className="accordion-body">
						<h6 className="title">Course Title</h6>
						<div className="course-info-video-link">
							<select className="nice-select" name="price">
								<option>Select Video Source</option>
								<option value="asc">External URL</option>
								<option value="desc">Youtube Video</option>
								<option value="pop">Vimeo Video</option>
							</select>
							<input type="text" placeholder="Please Enter your Video Link" />
						</div>
					</div>
				</div>
			</div>
			{/* single accordion nitem area end */}
		</div>
	)
}
