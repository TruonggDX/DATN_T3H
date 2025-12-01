import {clearUserData} from '@/redux/user/actionCreator';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';

export default function DashboardSidebar() {
    const router = useRouter();
    const {asPath} = router;
    const dashboardSlug = asPath.split('/')[1];
    const dashboardItemSlug = asPath.split('/')[2];

    const dispatch = useDispatch();

    function handleLogout() {
        console.log('Logout Successfully ! ');
        dispatch(clearUserData());
    }

    return (
        <div className="left-sindebar-dashboard theiaStickySidebar">
            {/*<div className="dashboard-left-single-wrapper">*/}
                {/* single item */}
                {/*<Link*/}
                {/*	href="/dashboard" */}
                {/*	className={`single-item ${dashboardSlug === "dashboard" && dashboardItemSlug === undefined ? "active" : ""}`}*/}
                {/*>*/}
                {/*	<i className="fa-light fa-house"></i>*/}
                {/*	<p>Dashboard</p>*/}
                {/*</Link>*/}
                {/* single item end */}
                {/* single item */}
                {/*<Link*/}
                {/*    href="/dashboard/profile"*/}
                {/*    className={`single-item ${dashboardItemSlug === "profile" ? "active" : ""}`}*/}
                {/*>*/}
                {/*    <i className="fa-regular fa-user"></i>*/}
                {/*    <p>Thông tin cá nhân</p>*/}
                {/*</Link>*/}
                {/* single item end */}
                {/* single item */}
                {/*<Link*/}
                {/*	href="/dashboard/enrolled" */}
                {/*	className={`single-item ${dashboardItemSlug === "enrolled" ? "active" : ""}`}*/}
                {/*>*/}
                {/*	<i className="fa-light fa-graduation-cap"></i>*/}
                {/*	<p>Enrolled Courses</p>*/}
                {/*</Link>*/}
                {/* single item end */}
                {/* single item */}
                {/*<Link*/}
                {/*    href="/dashboard/wishlist"*/}
                {/*    className={`single-item ${dashboardItemSlug === "wishlist" ? "active" : ""}`}*/}
                {/*>*/}
                {/*    <i className="fa-sharp fa-light fa-bookmark"></i>*/}
                {/*    <p>Wishlist</p>*/}
                {/*</Link>*/}
                {/* single item end */}
                {/* single item */}
                {/*<Link*/}
                {/*	href="/dashboard/reviews" */}
                {/*	className={`single-item ${dashboardItemSlug === "reviews" ? "active" : ""}`}*/}
                {/*>*/}
                {/*	<i className="fa-regular fa-star"></i>*/}
                {/*	<p>Reviews</p>*/}
                {/*</Link>*/}
                {/* single item end */}
                {/* single item */}
                {/*<Link*/}
                {/*	href="/dashboard/quiz" */}
                {/*	className={`single-item ${dashboardItemSlug === "quiz" ? "active" : ""}`}*/}
                {/*>*/}
                {/*	<i className="fa-sharp fa-light fa-bullseye-pointer"></i>*/}
                {/*	<p>My Quiz Attempts</p>*/}
                {/*</Link>*/}
                {/* single item end */}
                {/* single item */}
                {/*<Link*/}
                {/*    href="/dashboard/order"*/}
                {/*    className={`single-item ${dashboardItemSlug === "order" ? "active" : ""}`}*/}
                {/*>*/}
                {/*    <i className="fa-sharp fa-light fa-bag-shopping"></i>*/}
                {/*    <p>Order History</p>*/}
                {/*</Link>*/}
                {/* single item end */}
                {/* single item */}
                {/*<Link*/}
                {/*	href="/dashboard/question" */}
                {/*	className={`single-item ${dashboardItemSlug === "question" ? "active" : ""}`}*/}
                {/*>*/}
                {/*	<i className="fa-regular fa-circle-question"></i>*/}
                {/*	<p>Question &amp; Answer</p>*/}
                {/*</Link>*/}
                {/* single item end */}
                {/* single item */}
                {/*<Link*/}
                {/*	href="/dashboard/calendar" */}
                {/*	className={`single-item ${dashboardItemSlug === "calendar" ? "active" : ""}`}*/}
                {/*>*/}
                {/*	<i className="fa-light fa-calendar-days"></i>*/}
                {/*	<p>Calendar</p>*/}
                {/*</Link>*/}
                {/* single item end */}
            {/*</div>*/}
            {/*<div className="dashboard-left-single-wrapper mt--40">*/}
            {/*	<h4 className="title mb--5">Instructor</h4>*/}
            {/*	/!* single item *!/*/}
            {/*	<Link*/}
            {/*		href="/dashboard/courses" */}
            {/*		className={`single-item ${dashboardItemSlug === "courses" ? "active" : ""}`}*/}
            {/*	>*/}
            {/*		<i className="fa-light fa-book"></i>*/}
            {/*		<p>My Courses</p>*/}
            {/*	</Link>*/}
            {/* single item end */}
            {/* single item */}
            {/*<Link*/}
            {/*	href="/dashboard/bundles" */}
            {/*	className={`single-item ${dashboardItemSlug === "bundles" ? "active" : ""}`}*/}
            {/*>*/}
            {/*	<i className="fa-sharp fa-regular fa-layer-group"></i>*/}
            {/*	<p>My Bundles</p>*/}
            {/*</Link>*/}
            {/* single item end */}
            {/* single item */}
            {/*<Link*/}
            {/*	href="/dashboard/announcements" */}
            {/*	className={`single-item ${dashboardItemSlug === "announcements" ? "active" : ""}`}*/}
            {/*>*/}
            {/*	<i className="fa-solid fa-megaphone"></i>*/}
            {/*	<p>Announcements</p>*/}
            {/*</Link>*/}
            {/* single item end */}
            {/* single item */}
            {/*<Link*/}
            {/*	href="/dashboard/withdrawals" */}
            {/*	className={`single-item ${dashboardItemSlug === "withdrawals" ? "active" : ""}`}*/}
            {/*>*/}
            {/*	<i className="fa-regular fa-box"></i>*/}
            {/*	<p>Withdrawals</p>*/}
            {/*</Link>*/}
            {/* single item end */}
            {/* single item */}
            {/*<Link*/}
            {/*	href="/dashboard/assignments" */}
            {/*	className={`single-item ${dashboardItemSlug === "assignments" ? "active" : ""}`}*/}
            {/*>*/}
            {/*	<i className="fa-regular fa-file"></i>*/}
            {/*	<p>Assignments</p>*/}
            {/*</Link>*/}
            {/* single item end */}
            {/* single item */}
            {/*<Link*/}
            {/*	href="/dashboard/certificate" */}
            {/*	className={`single-item ${dashboardItemSlug === "certificate" ? "active" : ""}`}*/}
            {/*>*/}
            {/*	<i className="fa-sharp fa-light fa-file-certificate"></i>*/}
            {/*	<p>Certificate</p>*/}
            {/*</Link>*/}
            {/* single item end */}
            {/*</div>*/}
            {/*<div className="dashboard-left-single-wrapper bbnone mt--40">*/}
            {/*<h4 className="title mb--5">User</h4>*/}
            {/* single item */}
            {/*<Link*/}
            {/*	href="/dashboard/settings" */}
            {/*	className={`single-item ${dashboardItemSlug === "settings" ? "active" : ""}`}*/}
            {/*>*/}
            {/*	<i className="fa-sharp fa-regular fa-gear"></i>*/}
            {/*	<p>Settings</p>*/}
            {/*</Link>*/}
            {/* single item end */}
            {/* single item */}
            {/*<button*/}
            {/*	className="single-item"*/}
            {/*	onClick={()=>{handleLogout()}}*/}
            {/*>*/}
            {/*	<i className="fa-light fa-right-from-bracket"></i>*/}
            {/*	<p>Logout</p>*/}
            {/*</button>*/}
            {/* single item end */}
            {/*</div>*/}
        </div>
    )
}
