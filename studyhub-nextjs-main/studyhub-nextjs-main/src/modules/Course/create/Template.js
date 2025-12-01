import Image from "next/image";
import { useState } from "react";

export default function CourseTemplate() {
	const [ activeTab, setActiveTab ] = useState(false)
	const [ activeTemplate, setActiveTemplate ] = useState("landscape")

	return (
		<div className="accordion" id="accordionExampls7">
			{/* single accordion nitem area start */}
			<div className="accordion-item">
				<h2 className="accordion-header" id="headingSeven">
					<button 
						className="accordion-button" 
						aria-expanded={activeTab} 
						aria-controls="collapseOne"
						onClick={()=>{setActiveTab(!activeTab)}}
					>
						Certificate Template
					</button>
				</h2>
				<div id="collapseSeven" className={`accordion-collapse collapse ${activeTab && "show"}`}>
					<div className="accordion-body">
						<ul className="nav nav-tabs certificate-template-tabs" id="myTab" role="tablist">
							<li className="nav-item" role="presentation">
								<button 
									className={`nav-link ${activeTemplate === "landscape" && "active"}`}
								 	aria-selected="true"
									onClick={()=>{setActiveTemplate("landscape")}}
								>
									<i className="fa-sharp fa-light fa-file"></i> Landscape
								</button>
							</li>
							<li className="nav-item" role="presentation">
								<button 
									className={`nav-link ${activeTemplate === "portrait" && "active"}`}
								 	aria-selected="false"
									onClick={()=>{setActiveTemplate("portrait")}}
								>
									<i className="fa-sharp fa-light fa-file"></i> Portrait
								</button>
							</li>
						</ul>
						<div className="tab-content certificates-checkbox-tabs" id="myTabContent">
							<div className={`tab-pane fade ${activeTemplate === "landscape" && "show active"}`} id="homes" role="tabpanel" aria-labelledby="home-tabs">
								<div className="row g-5 mt--15">
									<div className="col-lg-4 col-md-6 col-sm-6 col-12">
										<div className="rts-image-check-box">
											<input type="radio" id="number1" name="radio-group" value="number1" />
											<label for="number1">
												<Image src="/images/dashboard/certificates/04.png" alt="Certificate Image" width={279} height={204} />
											</label>
										</div>
									</div>
									<div className="col-lg-4 col-md-6 col-sm-6 col-12">
										<div className="rts-image-check-box">
											<input type="radio" id="number2" name="radio-group" value="number2" />
											<label for="number2">
												<Image src="/images/dashboard/certificates/05.png" alt="Certificate Image" width={279} height={204} />
											</label>
										</div>
									</div>
									<div className="col-lg-4 col-md-6 col-sm-6 col-12">
										<div className="rts-image-check-box">
											<input type="radio" id="number3" name="radio-group" value="number3" />
											<label for="number3">
												<Image src="/images/dashboard/certificates/06.png" alt="Certificate Image" width={279} height={204} />
											</label>
										</div>
									</div>
									<div className="col-lg-4 col-md-6 col-sm-6 col-12">
										<div className="rts-image-check-box">
											<input type="radio" id="number4" name="radio-group" value="number4" />
											<label for="number4">
												<Image src="/images/dashboard/certificates/07.png" alt="Certificate Image" width={279} height={204} />
											</label>
										</div>
									</div>
									<div className="col-lg-4 col-md-6 col-sm-6 col-12">
										<div className="rts-image-check-box">
											<input type="radio" id="number5" name="radio-group" value="number5" />
											<label for="number5">
												<Image src="/images/dashboard/certificates/08.png" alt="Certificate Image" width={279} height={204} />
											</label>
										</div>
									</div>
									<div className="col-lg-4 col-md-6 col-sm-6 col-12">
										<div className="rts-image-check-box">
											<input type="radio" id="number6" name="radio-group" value="number6" />
											<label for="number6">
												<Image src="/images/dashboard/certificates/09.png" alt="Certificate Image" width={279} height={204} />
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className={`tab-pane fade ${activeTemplate === "portrait" && "show active"}`} id="profiles" role="tabpanel" aria-labelledby="profile-tab">
								<div className="row g-5 mt--15">
									<div className="col-lg-4 col-md-6 col-sm-6 col-12">
										<div className="rts-image-check-box">
											<input type="radio" id="number7" name="radio-group" value="number7" />
											<label for="number7">
												<Image src="/images/dashboard/certificates/11.png" alt="Certificate Image" width={279} height={320} />
											</label>
										</div>
									</div>
									<div className="col-lg-4 col-md-6 col-sm-6 col-12">
										<div className="rts-image-check-box">
											<input type="radio" id="number8" name="radio-group" value="number8" />
											<label for="number8">
												<Image src="/images/dashboard/certificates/12.png" alt="Certificate Image" width={279} height={320} />
											</label>
										</div>
									</div>
									<div className="col-lg-4 col-md-6 col-sm-6 col-12">
										<div className="rts-image-check-box">
											<input type="radio" id="number9" name="radio-group" value="number9" />
											<label for="number9">
												<Image src="/images/dashboard/certificates/13.png" alt="Certificate Image" width={279} height={320} />
											</label>
										</div>
									</div>
									<div className="col-lg-4 col-md-6 col-sm-6 col-12">
										<div className="rts-image-check-box">
											<input type="radio" id="number10" name="radio-group" value="number10" />
											<label for="number10">
												<Image src="/images/dashboard/certificates/14.png" alt="Certificate Image" width={279} height={320} />
											</label>
										</div>
									</div>
									<div className="col-lg-4 col-md-6 col-sm-6 col-12">
										<div className="rts-image-check-box">
											<input type="radio" id="number11" name="radio-group" value="number11" />
											<label for="number11">
												<Image src="/images/dashboard/certificates/15.png" alt="Certificate Image" width={279} height={320} />
											</label>
										</div>
									</div>
									<div className="col-lg-4 col-md-6 col-sm-6 col-12">
										<div className="rts-image-check-box">
											<input type="radio" id="number12" name="radio-group" value="number12" />
											<label for="number12">
												<Image src="/images/dashboard/certificates/16.png" alt="Certificate Image" width={279} height={320} />
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-12">
								<div className="preview-course-button-area">
									<button className="rts-btn btn-primary"> <i className="fa-light fa-eye"></i>Preview</button>
									<button className="rts-btn btn-border">Publish <i className="fa-light fa-arrow-right"></i></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* single accordion nitem area end */}
		</div>
	)
}
