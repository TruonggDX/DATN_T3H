import Announcements from "@/data/announcements.json";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function DashboardAnnouncements() {
    const [showDropdown, setShowDropdown] = useState(null);
	const [ activeModal, setActiveModal ] = useState(false)

	const paginatePerPage = 8;

	const [ totalPaginate, setTotalPaginate ] = useState( Announcements.length );
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

	function handleEdit(id) {
		console.log('Edit Clicked', id)
	}
	function handleDelete(id) {
		console.log('Delete Clicked', id)
	}

    function toggleDropdown(id) {
        setShowDropdown(prevState => (prevState === id ? null : id));
    }
	
	return (
		<>
			<div className="announcements-wrapper-dashed">
				<div className="top-announcement-wrapper">
					<div className="left-wrapper">
						<div className="icon">
							<Image src="/images/dashboard/announcement/01.png" width={60} height={60} alt="announcement" />
						</div>
						<div className="information">
							<span>Create Announcement</span>
							<p>Notify all students of your course</p>
						</div>
					</div>
					<div className="right">
						<button 
							type="button" 
							className="rts-btn btn-primary" 
							data-bs-toggle="modal" 
							data-bs-target="#exampleModal" 
							onClick={()=>{setActiveModal(true)}}
						>
							Add New Announcement
						</button>
					</div>
				</div>
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
				<div className="rts-reviewd-area-dashed table-responsive">
					<table className="table-reviews quiz announcement">
						<thead>
							<tr>
								<th>Date</th>
								<th>Announcements</th>
							</tr>
						</thead>
						<tbody>
							{	
								Announcements.map((announcement, index) => {
									return (
										<tr key={index}>
											<td>
												<div className="information-quiz">
													<span>{announcement.date}</span>
													<p className="quiz">{announcement.time}</p>
												</div>
											</td>
											<td className="announcement-1">
												<div className="left">
													<p>{announcement.title}</p>
													<span>{announcement.topic}</span>
												</div>
												<div className="right">
													<Link href={`announcements/${announcement.slug || "details"}`} className="rts-btn btn-primary">Details</Link>
													<i
														className="fa-regular fa-ellipsis-vertical"
														onClick={() => toggleDropdown(announcement.id)}
													></i>
													{showDropdown === announcement.id && (
														<ul className="action-dropdown">
															<li>
																<button onClick={() => handleEdit(announcement.id)}>Edit</button>
															</li>
															<li>
																<button onClick={() => handleDelete(announcement.id)}>Delete</button>
															</li>
														</ul>
													)}
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
			</div>
			<div className={`modal announcement fade ${activeModal ? "show" : ""}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Create Announcement
							</h5>
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
									<select name="price">
										<option>Select New Topic</option>
										<option value="asc">Recently Update Web Design </option>
										<option value="desc">Web Design Course</option>
										<option value="pop">Update Web Design</option>
										<option value="low">Recently Update Web</option>
										<option value="high">Course: New Courses</option>
									</select>
								</div>
								<div className="single-input mt--20">
									<label htmlFor="course">Announcement Title</label>
									<input id="course" type="text" placeholder="Announcement title" />
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
