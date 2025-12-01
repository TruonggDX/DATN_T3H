import Link from 'next/link';
import {useSelector} from 'react-redux';

export default function MenuItems(props) {
	const isLoggedIn = useSelector((state) => state.user.admin);
	
	return (
		<div className="main-nav-one">
			<nav>
				<ul>
					<li style={{position: 'static'}}>
						<Link className="nav-link" href="/">Trang chủ</Link>
					</li>


					<li style={{position: 'static'}}>
						<Link className="nav-link" href="/course">Sản phẩm</Link>
						<ul className="megamenu-hub min-mega shape-move">
						</ul>
					</li>

					{/*{*/}
					{/*	isLoggedIn &&*/}
					{/*	<li className="has-dropdown">*/}
					{/*		<Link className="nav-link" href="/home">Dashboard</Link>*/}
					{/*		<ul className="submenu">*/}
					{/*			<li><Link href="/dashboard">Dashboard</Link></li>*/}
					{/*			<li><Link href="/dashboard/profile">My Profile</Link></li>*/}
					{/*			<li><Link href="/dashboard/enrolled">Enrolled Course</Link></li>*/}
					{/*			<li><Link href="/dashboard/wishlist">Wishlist</Link></li>*/}
					{/*			<li><Link href="/dashboard/reviews">Reviews</Link></li>*/}
					{/*			<li><Link href="/dashboard/quiz">Quiz Attempts</Link></li>*/}
					{/*			<li><Link href="/dashboard/order">Order History</Link></li>*/}
					{/*			<li><Link href="/dashboard/question">Question Answer</Link></li>*/}
					{/*			<li><Link href="/dashboard/calender">Calender</Link></li>*/}
					{/*			<li><Link href="/dashboard/course">My Course</Link></li>*/}
					{/*			<li><Link href="/dashboard/announcements">Announcement</Link></li>*/}
					{/*			<li><Link href="/dashboard/assignments">Assignments</Link></li>*/}
					{/*			<li><Link href="/dashboard/certificate">Certificate</Link></li>*/}
					{/*		</ul>*/}
					{/*	</li>*/}
					{/*}*/}
					<li>
						<Link className="nav-link" href="/contact">Liên hệ</Link>
					</li>
					<li>
						<Link className="nav-link" href="/blog/list">Blog</Link>
					</li>

				</ul>
			</nav>
		</div>
	)
}
