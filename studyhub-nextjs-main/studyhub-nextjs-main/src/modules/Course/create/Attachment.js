import { useState } from "react";

export default function CourseAttachment() {
	const [ activeTab, setActiveTab ] = useState(false)

	return (
		<div className="accordion" id="accordionExampls5">
			{/* single accordion nitem area start */}
			<div className="accordion-item">
				<h2 className="accordion-header" id="headingFive">
					<button 
						className="accordion-button" 
						aria-expanded={activeTab} 
						aria-controls="collapseOne"
						onClick={()=>{setActiveTab(!activeTab)}}
					>
						Course Attachments
					</button>
				</h2>
				<div id="collapseFive" className={`accordion-collapse collapse ${activeTab && "show"}`}>
					<div className="accordion-body">
						<button className="rts-btn btn-border"><i className="fa-solid fa-paperclip"></i> Upload Attachments</button>
					</div>
				</div>
			</div>
			{/* single accordion nitem area end */}
		</div>
	)
}
