import Users from "@/data/users.json";
import { setUserData } from '@/redux/user/actionCreator';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function InstructorSignUpArea() {
	const [ activeTab, setActiveTab ] = useState('instructor');
	const [users, setUsers] = useState(Users);
	const [formData, setFormData] = useState({
		name: '',
		username: '',
		email: '',
		password: '',
		rePassword: '',
	});
	const [message, setMessage] = useState('');
	const dispatch = useDispatch();
	const router = useRouter();
  
	const admin = useSelector((state) => state.user.admin);

	function handleTab(tab) {
		setActiveTab(tab);
	}

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [id]: value }));
	};

	const handleSignUp = (e) => {
		e.preventDefault();

		// Check if passwords match
		if (formData.password !== formData.rePassword) {
			setMessage('Passwords do not match.');
			console.error('Error: Passwords do not match');
			return;
		}

		// Check if email already exists
		const emailExists = users.some(user => user.email === formData.email);
		if (emailExists) {
			setMessage('Email is already registered.');
			console.error('Error: Email is already registered');
			return;
		}

		// Check if username already exists
		const usernameExists = users.some(user => user.username === formData.username);
		if (usernameExists) {
			setMessage('Username is already taken.');
			console.error('Error: Username is already taken');
			return;
		}

		// Add new instructor to users array
		const newUser = {
			id: users.length + 1,  // Simple ID generation
			registration: new Date().toLocaleString(),  // Current date as registration date
			firstName: formData.name.split(' ')[0],
			lastName: formData.name.split(' ')[1] || '',
			username: formData.username,
			password: formData.password,
			email: formData.email,
			phone: '',
			designation: '',
			biography: '',
			role: 'instructor',  // Role set to instructor
		};

		setUsers([...users, newUser]);
		dispatch(setUserData(newUser));
		setMessage('Instructor registration successful!');
		
		router.push('/dashboard');
	};

	useEffect(() => {
	  if (admin) {
		setMessage('You are already logged in.');
		router.push('/dashboard');
	  }
	}, []);

	return (
		<div className="rts-section-gap">
			<div className="container-2">
				<div className="row">
					<div className="col-lg-12">
						{/* becoming instructor area start */}
						<div className="becomeinstructor--wrapper">
							<div className="title-top-wrapper mb--50 mb--50">
								<h2 className="title">How to Become an Instructor</h2>
								<p className="disc">
									Becoming an instructor involves a series of steps that may vary depending on the type of instruction you're interested
								</p>
							</div>
							<div className="large-image-thumb">
								<Image src="/images/instructor/14.jpg" width={1195} height={630} alt="instructor" />
							</div>
						</div>
						{/* becoming instructor area end */}

						{/* become a instructor tabs  */}
						<div className="becom-instructor-tabs-area-wrapper mt--50">
							<ul className="nav nav-tabs" id="myTab" role="tablist">
								<li className="nav-item" role="presentation">
									<button 
										className={`nav-link ${activeTab === "instructor" && "active"}`}
										onClick={()=>{handleTab('instructor')}}
									>
										<i className="fa-regular fa-user"></i>
										Become an Instructor
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button 
										className={`nav-link ${activeTab === "rules" && "active"}`}
										onClick={()=>{handleTab('rules')}}
									>
										<i className="fa-light fa-list"></i>
										Instructor Rules
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button 
										className={`nav-link ${activeTab === "course" && "active"}`}
										onClick={()=>{handleTab('course')}}
									>
										<i className="fa-regular fa-box"></i>
										Start with Courses
									</button>
								</li>
							</ul>
							<div className="tab-content" id="myTabContent">
								<div className={`tab-pane fade ${activeTab === "instructor" && "active show"}`}>
									<div className="becom-instructor-tabs-content">
										<div className="">
											<p className="disc">
												Becoming an instructor involves a series of steps that may vary depending on the type of instruction you're interested in (e.g., academic teaching, corporate training, online courses). Here's a general guide to help you become an instructor:
											</p>
											<h6 className="title">Identify Your Area of Expertise:</h6>
											<p className="disc">
												Determine the subject or skill in which you have expertise and are passionate about teaching.
											</p>
											<h6 className="title">Educational Qualifications:</h6>
											<p className="disc">
												Obtain the necessary educational qualifications for the level and type of instruction you are aiming for. This may include a bachelor's degree.
											</p>
										</div>
										<div className="right-side">
											<div className="thumbnail">
												<Image src="/images/instructor/15.jpg" width={420} height={318} alt="instructor" />
											</div>
										</div>
									</div>
								</div>
								<div className={`tab-pane fade ${activeTab === "rules" && "active show"}`}>
									<div className="becom-instructor-tabs-content">
										<div className="">
											<p className="disc">
												Becoming an two instructor involves a series of steps that may vary depending on the type of instruction you're interested in (e.g., academic teaching, corporate training, online courses). Here's a general guide to help you become an instructor:
											</p>
											<h6 className="title">Identify Your Area of Expertise:</h6>
											<p className="disc">
												Determine the subject or skill in which you have expertise and are passionate about teaching.
											</p>
											<h6 className="title">Educational Qualifications:</h6>
											<p className="disc">
												Obtain the necessary educational qualifications for the level and type of instruction you are aiming for. This may include a bachelor's degree.
											</p>
										</div>
										<div className="right-side">
											<div className="thumbnail">
												<Image src="/images/instructor/15.jpg" width={420} height={318} alt="instructor" />
											</div>
										</div>
									</div>
								</div>
								<div className={`tab-pane fade ${activeTab === "course" && "active show"}`}>
									<div className="becom-instructor-tabs-content">
										<div className="">
											<p className="disc">
												Becoming an three instructor involves a series of steps that may vary depending on the type of instruction you're interested in (e.g., academic teaching, corporate training, online courses). Here's a general guide to help you become an instructor:
											</p>
											<h6 className="title">Identify Your Area of Expertise:</h6>
											<p className="disc">
												Determine the subject or skill in which you have expertise and are passionate about teaching.
											</p>
											<h6 className="title">Educational Qualifications:</h6>
											<p className="disc">
												Obtain the necessary educational qualifications for the level and type of instruction you are aiming for. This may include a bachelor's degree.
											</p>
										</div>
										<div className="right-side">
											<div className="thumbnail">
												<Image src="/images/instructor/15.jpg" width={420} height={318} alt="instructor" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* become a instructor tabs end */}

						<div className="becom-an-instructor-form-area rts-section-gapTop pl--120 pr--120 pl_sm--10 pr_sm--10">
							<div className="title-instructor-wrapper">
								<h2 className="title">Become an Instructor Today</h2>
								<p className="disc">
									Join the world's largest online learning marketplace.
									Start teaching today
								</p>
							</div>
							<form onSubmit={handleSignUp} className="instructor-form">
								<input
									id="name"
									type="text"
									placeholder="Enter Your Name"
									value={formData.name}
									onChange={handleChange}
									required
								/>
								<input
									id="username"
									type="text"
									placeholder="Enter User Name"
									value={formData.username}
									onChange={handleChange}
									required
								/>
								<input
									id="email"
									type="email"
									placeholder="Enter Your Email"
									value={formData.email}
									onChange={handleChange}
									required
								/>
								<input
									id="password"
									type="password"
									placeholder="Password"
									value={formData.password}
									onChange={handleChange}
									required
								/>
								<input
									id="rePassword"
									type="password"
									placeholder="Re Password"
									value={formData.rePassword}
									onChange={handleChange}
									required
								/>
								<div className="single-checkbox-filter">
									<div className="check-box">
										<input type="checkbox" id="type-1" required />
										<label htmlFor="type-1">Accept the Terms and Privacy Policy</label><br />
									</div>
								</div>
								<button type="submit" className="rts-btn btn-primary">Đăng ký</button>
								<p>Already have an account? <Link href="/signin">Đăng nhập</Link></p>
							</form>

							{message && <p aria-live="polite">{message}</p>}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
