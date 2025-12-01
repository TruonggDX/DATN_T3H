import { useState } from "react";

export default function CourseBuilder() {
	const [ activeTab, setActiveTab ] = useState(false)
	const [ activeModal, setActiveModal ] = useState(false)

	function handleFormSubmit() {
		console.log('Form Submitted')
		setActiveModal(false)
	}

	return (
		<>
			<div className="accordion" id="accordionExampls3">
				{/* single accordion nitem area start */}
				<div className="accordion-item">
					<h2 className="accordion-header" id="headingThree">
						<button 
							className="accordion-button" 
							aria-expanded={activeTab} 
							aria-controls="collapseOne"
							onClick={()=>{setActiveTab(!activeTab)}}
						>
							Course Builder
						</button>
					</h2>
					<div id="collapseThree" className={`accordion-collapse collapse ${activeTab && "show"}`}>
						<div className="accordion-body">
							<button 
								className="rts-btn btn-primary" 
								data-bs-toggle="modal" 
								data-bs-target="#exampleModal"
								onClick={()=>{setActiveModal(true)}}
							>
								Add new Topic <i className="fa-regular fa-circle-plus"></i>
							</button>
						</div>
					</div>
				</div>
				{/* single accordion item area end */}
			</div>
			<div className={`modal announcement fade ${activeModal ? "show" : ""}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Add New Topic</h5>
							<button 
								type="button"
								className="btn-close" 
								data-bs-dismiss="modal" 
								aria-label="Close"
								onClick={()=>{setActiveModal(false)}}
							/>
						</div>
						<div className="modal-body">
							<form action="#" className="modal-form">
								<div className="nice-select-wrap">
									<select className="nice-select" name="price">
										<option>Select New Topic</option>
										<option value="asc">Recently Update Web Design </option>
										<option value="desc">Web Design Course</option>
										<option value="pop">Update Web Design</option>
										<option value="low">Recently Update Web</option>
										<option value="high">Course: New Courses</option>
									</select>
								</div>
								<div className="single-input mt--20">
									<label htmlFor="course">Topic Title</label>
									<input id="course" type="text" placeholder="Topic title" />
								</div>
								<div className="single-input">
									<label htmlFor="message">Summary</label>
									<textarea id="message" placeholder="Summary..."></textarea>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button 
								type="button" 
								className="rts-btn btn-primary"
								onClick={()=>{handleFormSubmit()}}
							>
								Publish
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
