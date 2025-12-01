import { useState } from "react";

export default function DashboardSettings() {
	const [ activeTab, setActiveTab ] = useState('profile');

	function handleTab(tab) {
		setActiveTab(tab);
	}

	return (
		<div className="settings-wrapper-dashed">
			<h5 className="title">Settings</h5>
			<ul className="nav nav-pills mb-3 tab-buttons" id="pills-tab" role="tablist">
				<li className="nav-item" role="presentation">
					<button 
						className={`nav-link ${activeTab === "profile" ? "active" : ""}`} 
						type="button" 
						aria-selected={activeTab === "profile"}
						onClick={()=>{handleTab("profile")}}
					>
						Profile
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button 
						className={`nav-link ${activeTab === "password" ? "active" : ""}`} 
						type="button" 
						aria-selected={activeTab === "password"}
						onClick={()=>{handleTab("password")}}
					>
						Password
					</button>
				</li>
			</ul>
			<div className="tab-content" id="pills-tabContent">
				<div 
					className={`tab-pane fade ${activeTab === "profile" ? "show active" : ""}`}
				>
					<div className="social-profile-link-wrapper">
						<h5 className="title">Social Profile Link</h5>
						<div className="single-profile-wrapper">
							<div className="left">
								<div className="icon">
									<i className="fa-brands fa-facebook-f"></i>
									<span>Facebook</span>
								</div>
							</div>
							<div className="right">
								<input type="text" placeholder="https://www.facebook.com/username" />
							</div>
						</div>
						<div className="single-profile-wrapper">
							<div className="left">
								<div className="icon">
									<i className="fa-brands fa-skype"></i>
									<span>Skype</span>
								</div>
							</div>
							<div className="right">
								<input type="text" placeholder="https://www. skype.com/username" />
							</div>
						</div>
						<div className="single-profile-wrapper">
							<div className="left">
								<div className="icon">
									<i className="fa-brands fa-linkedin"></i>
									<span>LinkedIn </span>
								</div>
							</div>
							<div className="right">
								<input type="text" placeholder="https://www.linkedin.com/username" />
							</div>
						</div>
						<div className="single-profile-wrapper">
							<div className="left">
								<div className="icon">
									<i className="fa-brands fa-pinterest"></i>
									<span>Pinterest</span>
								</div>
							</div>
							<div className="right">
								<input type="text" placeholder="https://www.pinterest.com/username" />
							</div>
						</div>
						<div className="single-profile-wrapper">
							<div className="left">
								<div className="icon">
									<i className="fa-brands fa-github"></i>
									<span>Github</span>
								</div>
							</div>
							<div className="right">
								<input type="text" placeholder="https://www.github.com/username" />
							</div>
						</div>
						<a href="#" className="rts-btn btn-primary">Update Profile</a>
					</div>
				</div>
				<div 
					className={`tab-pane fade ${activeTab === "password" ? "show active" : ""}`}
				>
					<div className="setting-change-password-area">
						<form action="#" className="form-password-area">
							<div className="single-input">
								<label for="current">Current Password</label>
								<input id="current" type="password" placeholder="Current Password" required />
							</div>
							<div className="single-input">
								<label for="new">New Password</label>
								<input id="new" type="password" placeholder="New Password" required />
							</div>
							<div className="single-input">
								<label for="Current">Re-type New Password</label>
								<input type="password" placeholder="Re-type New Password" />
							</div>
							<button className="rts-btn btn-primary">Reset Password</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
