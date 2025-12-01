import Link from 'next/link';
import { useState } from 'react';

export default function MobileMenuItems(props) {

	const [home, setHome] = useState(false)
	const [page, setPage] = useState(false)
	const [zoom, setZoom] = useState(false)
	const [shop, setShop] = useState(false)
	const [menuEvent, setMenuEvent] = useState(false)
	const [course, setCourse] = useState(false)
	const [dashboard, setDashboard] = useState(false)
	const [blog, setBlog] = useState(false)

	const openMobileMenu = menu => {

		if (menu === 'home') {
			setHome(!home)
			setPage(false)
			setZoom(false)
			setShop(false)
			setMenuEvent(false)
			setCourse(false)
			setDashboard(false)
			setBlog(false)
		}
		else if (menu === 'page') {
			setHome(false)
			setPage(!page)
			setShop(false)
			setZoom(false)
			setMenuEvent(false)
			setCourse(false)
			setDashboard(false)
			setBlog(false)
		}
		else if (menu === 'zoom') {
			setHome(false)
			setPage(true)
			setZoom(!zoom)
			setShop(false)
			setMenuEvent(false)
			setCourse(false)
			setDashboard(false)
			setBlog(false)
		}
		else if (menu === 'shop') {
			setHome(false)
			setPage(true)
			setZoom(false)
			setShop(!shop)
			setMenuEvent(false)
			setCourse(false)
			setDashboard(false)
			setBlog(false)
		}
		else if (menu === 'menuEvent') {
			setHome(false)
			setPage(true)
			setZoom(false)
			setShop(false)
			setMenuEvent(!menuEvent)
			setCourse(false)
			setDashboard(false)
			setBlog(false)
		}
		else if (menu === 'course') {
			setHome(false)
			setPage(false)
			setShop(false)
			setZoom(false)
			setMenuEvent(false)
			setCourse(!course)
			setDashboard(false)
			setBlog(false)
		}
		else if (menu === 'dashboard') {
			setHome(false)
			setPage(false)
			setShop(false)
			setZoom(false)
			setMenuEvent(false)
			setCourse(false)
			setDashboard(!dashboard)
			setBlog(false)
		}
		else if (menu === 'blog') {
			setHome(false)
			setPage(false)
			setShop(false)
			setZoom(false)
			setMenuEvent(false)
			setCourse(false)
			setDashboard(false)
			setBlog(!blog)
		}
	};
	
	return (
		<>
			<div className="mobile-menu-main">
				<nav className="nav-main mainmenu-nav mt--30">
					<ul className="mainmenu metismenu" id="mobile-menu-active">
						<li className={`has-droupdown ${home && 'mm-active'}`}>
							<a href="#" className="main" onClick={() => { openMobileMenu('home'); }}>Home</a>
							<ul className={`submenu mm-collapse ${home && 'mm-show'}`}>
								<li><Link className="mobile-menu-link" href="/pages/home">Main Home</Link></li>
								<li><Link className="mobile-menu-link" href="/pages/home">Online Course</Link></li>
							</ul>
						</li>
						<li className={`has-droupdown ${page && 'mm-active'}`}>
							<a href="#" className="main" onClick={() => { openMobileMenu('page'); }}>Pages</a>
							<ul className={`submenu mm-collapse ${page && 'mm-show'}`}>
								<li><Link className="mobile-menu-link" href="/about">About Us</Link></li>
								<li><Link className="mobile-menu-link" href="/about/two">About Us Two</Link></li>
								<li><Link className="mobile-menu-link" href="/instructor/1">Profile</Link></li>
								<li><Link className="mobile-menu-link" href="/contact">Contact</Link></li>
								<li className={`has-droupdown third-lvl ${zoom && 'mm-active'}`}>
									<Link className="main" href="#" onClick={() => { openMobileMenu('zoom'); }}>Zoom</Link>
									<ul className={`submenu-third-lvl mm-collapse ${zoom && 'mm-show'}`}>
										<li><Link href="/meeting"></Link>Zoom Meeting</li>
										<li><a href="/meeting/details"></a>Zoom Details</li>
									</ul>
								</li>
								<li className={`has-droupdown third-lvl ${menuEvent && 'mm-active'}`}>
									<Link className="main" href="#" onClick={() => { openMobileMenu('menuEvent'); }}>Event</Link>
									<ul className={`submenu-third-lvl mm-collapse ${menuEvent && 'mm-show'}`}>
										<li><a href="/event"></a>Event</li>
										<li><a href="/event/two"></a>Event Two</li>
										<li><a href="/event/details"></a>Event Details</li>
									</ul>
								</li>
							</ul>
						</li>
						<li className={`has-droupdown ${course && 'mm-active'}`}>
							<a href="#" className="main" onClick={() => { openMobileMenu('course'); }}>Course</a>
							<ul className={`submenu mm-collapse ${course && 'mm-show'}`}>
								<li><a href="#" className="tag">Courses</a></li>
								<li><Link className="mobile-menu-link" href="/course">Courses</Link></li>
								<li><Link className="mobile-menu-link" href="/course/two">Course Two</Link></li>
								<li><Link className="mobile-menu-link" href="/course/three">Course Three</Link></li>
								<li><Link className="mobile-menu-link" href="/course/four">Course Four</Link></li>
							</ul>
							<ul className={`submenu mm-collapse ${course && 'mm-show'}`}>
								<li><a href="#" className="tag">Courses Details</a></li>
								<li><Link className="mobile-menu-link" href="/course/single">Courses Details</Link></li>
								<li><Link className="mobile-menu-link" href="/course/details/two">Courses Details V2</Link></li>
								<li><Link className="mobile-menu-link" href="/course/details/three">Courses Details V3</Link></li>
								<li><Link className="mobile-menu-link" href="/course/details/four">Courses Details V4</Link></li>
								<li><Link className="mobile-menu-link" href="/course/details/five">Courses Details V5</Link></li>
							</ul>
							<ul className={`submenu mm-collapse ${course && 'mm-show'}`}>
								<li><a href="#" className="tag">Others</a></li>
								<li><Link className="mobile-menu-link" href="/instructor/registration">Become an Instructor</Link></li>
								<li><Link className="mobile-menu-link" href="/instructor/1">Instructor Profile</Link></li>
								<li><Link className="mobile-menu-link" href="/instructor">Instructor</Link></li>
								<li><Link className="mobile-menu-link" href="/pricing">Membership Plan</Link></li>
								<li><Link className="mobile-menu-link" href="/signin">Đăng nhập</Link></li>
								<li><Link className="mobile-menu-link" href="/signup">Registration</Link></li>
							</ul>
						</li>
						<li className={`has-droupdown ${dashboard && 'mm-active'}`}>
							<a href="#" className="main" onClick={() => { openMobileMenu('dashboard'); }}>Dashboard</a>
							<ul className={`submenu mm-collapse ${dashboard && 'mm-show'}`}>
								<li><Link className="mobile-menu-link" href="dashboard">Dashboard</Link></li>
								<li><Link className="mobile-menu-link" href="my-profile">My Profile</Link></li>
								<li><Link className="mobile-menu-link" href="enroll-course">Enroll Course</Link></li>
								<li><Link className="mobile-menu-link" href="wishlist">Wishlist</Link></li>
								<li><Link className="mobile-menu-link" href="reviews">Reviews</Link></li>
								<li><Link className="mobile-menu-link" href="quick-attempts">Quick Attempts</Link></li>
								<li><Link className="mobile-menu-link" href="order-history">Order History</Link></li>
								<li><Link className="mobile-menu-link" href="question-answer">Question Answer</Link></li>
								<li><Link className="mobile-menu-link" href="calender">Calender</Link></li>
								<li><Link className="mobile-menu-link" href="my-course">My Course</Link></li>
								<li><Link className="mobile-menu-link" href="announcement">Announcement</Link></li>
								<li><Link className="mobile-menu-link" href="assignments">Assignments</Link></li>
								<li><Link className="mobile-menu-link" href="certificate">Certificate</Link></li>
							</ul>
						</li>
						<li className={`has-droupdown ${blog && 'mm-active'}`}>
							<a href="#" className="main" onClick={() => { openMobileMenu('blog'); }}>Blog</a>
							<ul className={`submenu mm-collapse ${blog && 'mm-show'}`}>
								<li><Link className="mobile-menu-link" href="blog-list">Blog List</Link></li>
							</ul>
						</li>
					</ul>
				</nav>

				<div className="buttons-area">
					<Link href="/signin" className="rts-btn btn-border">Đăng nhập</Link>
					<Link href="/signup" className="rts-btn btn-primary">Đăng ký</Link>
				</div>

				<div className="rts-social-style-one pl--20 mt--50">
					<ul>
						<li>
							<a href="#">
								<i className="fa-brands fa-facebook-f"></i>
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fa-brands fa-twitter"></i>
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fa-brands fa-youtube"></i>
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fa-brands fa-linkedin-in"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	)
}
