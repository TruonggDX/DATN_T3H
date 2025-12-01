import { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

export default function DashboardCalendar() {
	const [value, onChange] = useState(new Date());

	return (
		<div className="calender-area-wrapper">
			<h5 className="title">Calendar</h5>
			<div className="calender-dash-wrapper" id="calender-active">
				{/* calender */}
				<div className="wrapper">

					<div className="container-calendar">
						<div className="footer-container-calendar">
							<select id="month">
								<option value="0">Jan</option>
								<option value="1">Feb</option>
								<option value="2">Mar</option>
								<option value="3">Apr</option>
								<option value="4">May</option>
								<option value="5">Jun</option>
								<option value="6">Jul</option>
								<option value="7">Aug</option>
								<option value="8">Sep</option>
								<option value="9">Oct</option>
								<option value="10">Nov</option>
								<option value="11">Dec</option>
							</select>
							<select id="year">
								<option value="2010">2010</option>
								<option value="2011">2011</option>
								<option value="2012">2012</option>
								<option value="2013">2013</option>
								<option value="2014">2014</option>
								<option value="2015">2015</option>
								<option value="2016">2016</option>
								<option value="2017">2017</option>
								<option value="2018">2018</option>
								<option value="2019">2019</option>
								<option value="2020">2020</option>
								<option value="2021">2021</option>
							</select>
						</div>
						
						<Calendar onChange={onChange} value={value} className="table-calendar" />
					</div>
				</div>
				{/* calender */}
			</div>
			<div className="search-area-calender-inner">
				<input type="text" placeholder="Search..." />
				<i className="fa-solid fa-magnifying-glass"></i>
			</div>

			{/* assignments-area saert */}
			<div className="assignment-list-wrapper-calender">
				{/* single assignments area wrapper */}
				<div className="single-assignments-wrapper">
					<div className="top-wrapper">
						<i className="far fa-calendar"></i>
						<span>October 4, 2023</span>
					</div>
					<div className="assignment-list">
						<div className="left">
							<i className="far fa-calendar"></i>
							<p>Assignment:</p>
							<span>My Quiz Attempts</span>
						</div>
						<div className="right">
							<span>Deadline: No Limit</span>
						</div>
					</div>
					<div className="assignment-list mt--20">
						<div className="left">
							<i className="far fa-calendar"></i>
							<p>Assignment:</p>
							<span>My Quiz Attempts</span>
						</div>
						<div className="right">
							<span>Deadline: No Limit</span>
						</div>
					</div>
				</div>
				{/* single assignments area wrapper end */}
				{/* single assignments area wrapper */}
				<div className="single-assignments-wrapper mt--50">
					<div className="top-wrapper">
						<i className="far fa-calendar"></i>
						<span>October 29, 2023</span>
					</div>
					<div className="assignment-list">
						<div className="left">
							<i className="far fa-calendar"></i>
							<p>Assignment:</p>
							<span>My Quiz Attempts</span>
						</div>
						<div className="right">
							<span>Deadline: No Limit</span>
						</div>
					</div>
					<div className="assignment-list mt--20">
						<div className="left">
							<i className="far fa-calendar"></i>
							<p>Assignment:</p>
							<span>My Quiz Attempts</span>
						</div>
						<div className="right">
							<span>Deadline: No Limit</span>
						</div>
					</div>
					<div className="assignment-list mt--20">
						<div className="left">
							<i className="far fa-calendar"></i>
							<p>Assignment:</p>
							<span>My Quiz Attempts</span>
						</div>
						<div className="right">
							<span>Deadline: No Limit</span>
						</div>
					</div>
					<div className="assignment-list mt--20">
						<div className="left">
							<i className="far fa-calendar"></i>
							<p>Assignment:</p>
							<span>My Quiz Attempts</span>
						</div>
						<div className="right">
							<span>Deadline: No Limit</span>
						</div>
					</div>
				</div>
				{/* single assignments area wrapper end */}
			</div>
			{/* assignments-area end */}
		</div>
	)
}
