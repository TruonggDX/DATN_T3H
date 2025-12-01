import Assignments from '@/data/assignments.json';
import Link from 'next/link';
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function DashboardAssignments() {

	const paginatePerPage = 8;

	const [ totalPaginate, setTotalPaginate ] = useState( Assignments.length );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ totalPage, setTotalPage ] = useState( Math.ceil(totalPaginate/paginatePerPage) );
	const [ startItemCount, setStartItemCount ] = useState( 0 );
	const [ endItemCount, setEndItemCount ] = useState( paginatePerPage );
	const [ paginationKey, setPaginationKey ] = useState(Date.now());
	const [ forcePage, setForcePage ] = useState( 0 );

	const handlePageChange = ( event ) => {
		const selectedPage = event.selected + 1;
		setCurrentPage(selectedPage);
		setStartItemCount( selectedPage * paginatePerPage - paginatePerPage );
		setEndItemCount( selectedPage * paginatePerPage );
	};

	const handlePaginateReset = () =>{
		setPaginationKey(Date.now());
		handlePageChange({ selected: 0 });
	}

	return (
		<div className="announcements-wrapper-dashed rts-reviewd-area-dashed table-responsive">
			<h5 className="title">Assignment</h5>
			<div className="course-short-by-date-wrapper">
				<div className="single-course-filter">
					<span>Course</span>
					<select className="nice-select" name="price">
						<option>Read (12)</option>
						<option value="asc">Stars (30)</option>
						<option value="desc">Comments(42)</option>
						<option value="pop">Popularity (20)</option>
						<option value="low">Questions & Ans (10)</option>
						<option value="high">Stars (52)</option>
					</select>
				</div>
				<div className="single-course-filter short-by">
					<span>Course</span>
					<select className="nice-select" name="price">
						<option>Read (12)</option>
						<option value="asc">Stars (30)</option>
						<option value="desc">Comments(42)</option>
						<option value="pop">Popularity (20)</option>
						<option value="low">Questions & Ans (10)</option>
						<option value="high">Stars (52)</option>
					</select>
				</div>
				<div className="single-course-filter short-by">
					<span>Date</span>
					<div className="date-picker-area">
						<input placeholder="Select your date" type="date" name="checkIn" id="datepicker" className="calendar" />
						<i className="far fa-calendar-alt"></i>
					</div>
				</div>
			</div>
			<table className="table-reviews quiz mt--30">
				<thead>
					<tr>
						<th>Assignment Name</th>
						<th>Total Marks</th>
						<th>Total Submit</th>
					</tr>
				</thead>
				<tbody>
					{	
						Assignments.map((assignment, index) => {
							return (
								<tr key={index}>
									<td>
										<div className="information-quiz">
											<p className="quiz">{assignment.title}</p>
											<p>Course: <span>{assignment.topic}</span></p>
										</div>
									</td>
									<td>
										<span className="questions">{assignment.marks}</span>
									</td>
									<td>
										<div className="betweena-area-assignment">
											<span className="marks">{assignment.submit}</span>
											<Link href={`assignments/${assignment.slug || "details"}`} className="rts-btn btn-border">Details</Link>
										</div>
									</td>
								</tr>
							);
						}).slice(startItemCount, endItemCount)
					}
				</tbody>
			</table>
			<div className="pagination-full-width">
				<span>Page {currentPage} of {totalPage}</span>
				<div className="pagination">
					<ReactPaginate
						key={paginationKey}
						breakLabel="..."
						onPageChange={ handlePageChange }
						nextLabel={ <i className="fa-solid fa-chevron-right"></i> }
						previousLabel={ <i className="fa-solid fa-chevron-left"></i> }
						pageRangeDisplayed={ 3 }
						forcePage={ forcePage }
						pageCount={ Math.ceil(
							totalPaginate / paginatePerPage
						) }
						renderOnZeroPageCount={ null }
					/>
				</div>
			</div>
		</div>
	)
}
