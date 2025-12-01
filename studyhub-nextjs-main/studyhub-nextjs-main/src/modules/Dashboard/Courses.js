import SingleCourse from "@/components/Course";
import Courses from "@/data/courses.json";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function DashboardCourses() {
	const [activeTab, setActiveTab] = useState("published");

	const paginatePerPage = 6;
	
	const [ totalPaginate, setTotalPaginate ] = useState( Courses.length );
	const [ startItemCount, setStartItemCount ] = useState( 0 );
	const [ endItemCount, setEndItemCount ] = useState( paginatePerPage );
	const [ paginationKey, setPaginationKey ] = useState(Date.now());
	const [ forcePage, setForcePage ] = useState( 0 );


	function handleTab(tab) {
		setActiveTab(tab);
	}
	const handlePageChange = ( event ) => {
		const selectedPage = event.selected + 1;
		setStartItemCount( selectedPage * paginatePerPage - paginatePerPage );
		setEndItemCount( selectedPage * paginatePerPage );
	};

	const handlePaginateReset = () =>{
		setPaginationKey(Date.now());
		handlePageChange({ selected: 0 });
	}

	return (
		<div className="exrolled-course-wrapper-dashed">
			<h5 className="title">My Courses</h5>
			<ul className="nav nav-tabs" id="myTab" role="tablist">
				<li className="nav-item" role="presentation">
					<button 
						className={`nav-link ${activeTab === "published" ? "active" : ""}`} 
						role="tab" 
						aria-selected={activeTab === "published"}
						onClick={()=>{setActiveTab("published")}}
					>
						Published (26)
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button 
						className={`nav-link ${activeTab === "pending" ? "active" : ""}`} 
						role="tab" 
						aria-selected={activeTab === "pending"}
						onClick={()=>{setActiveTab("pending")}}
					>
						Pending (12)
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button 
						className={`nav-link ${activeTab === "draft" ? "active" : ""}`} 
						role="tab" 
						aria-selected={activeTab === "draft"}
						onClick={()=>{setActiveTab("draft")}}
					>
						Draft (10)
					</button>
				</li>
			</ul>
			<div className="tab-content mt--30">
				<div className={`tab-pane fade ${activeTab === "published" ? "show active" : ""}`} role="tabpanel">
					<div className="row g-5">
						{
							Courses.map((course, index) => {
								return (
									<div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
										<SingleCourse
											Slug={course.slug}
											Img={course.img}
											Category={course.category}
											lessonCount={course.lessonCount}
											studentCount={course.studentCount}
											Title={course.title}
											Author={course.authorName}
											ratingCount={course.ratingCount}
											prevPrice={course.prevPrice}
											Price={course.price}
											imgWidth={course.imgWidth}
											imgHeight={course.imgHeight}
											type="dashboard"
										/>
									</div>
								);
							}).slice(startItemCount,endItemCount)
						}
					</div>
					<div className="row mt--30">
						<div className="col-lg-12">
							<div className="rts-pagination-area-2">
								<ReactPaginate
									key={`${activeTab}-${paginationKey}`}
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
				<div className={`tab-pane fade ${activeTab === "pending" ? "show active" : ""}`} role="tabpanel">
					<div className="row g-5">
						{
							Courses.map((course, index) => {
								return (
									<div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
										<SingleCourse
											Slug={course.slug}
											Img={course.img}
											Category={course.category}
											lessonCount={course.lessonCount}
											studentCount={course.studentCount}
											Title={course.title}
											Author={course.authorName}
											ratingCount={course.ratingCount}
											prevPrice={course.prevPrice}
											Price={course.price}
											imgWidth={course.imgWidth}
											imgHeight={course.imgHeight}
											type="dashboard"
										/>
									</div>
								);
							}).slice(startItemCount,endItemCount)
						}
					</div>
					<div className="row mt--30">
						<div className="col-lg-12">
							<div className="rts-pagination-area-2">
								<ReactPaginate
									key={`${activeTab}-${paginationKey}`}
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
				<div className={`tab-pane fade ${activeTab === "draft" ? "show active" : ""}`} role="tabpanel">
					<div className="row g-5">
						{
							Courses.map((course, index) => {
								return (
									<div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
										<SingleCourse
											Slug={course.slug}
											Img={course.img}
											Category={course.category}
											lessonCount={course.lessonCount}
											studentCount={course.studentCount}
											Title={course.title}
											Author={course.authorName}
											ratingCount={course.ratingCount}
											prevPrice={course.prevPrice}
											Price={course.price}
											imgWidth={course.imgWidth}
											imgHeight={course.imgHeight}
											type="dashboard"
										/>
									</div>
								);
							}).slice(startItemCount,endItemCount)
						}
					</div>
					<div className="row mt--30">
						<div className="col-lg-12">
							<div className="rts-pagination-area-2">
								<ReactPaginate
									key={`${activeTab}-${paginationKey}`}
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
			</div>
		</div>
	)
}
