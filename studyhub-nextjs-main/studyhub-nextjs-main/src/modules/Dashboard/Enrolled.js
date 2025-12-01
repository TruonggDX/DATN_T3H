import SingleCourseTwo from "@/components/Course/Two";
import Courses from "@/data/courses.json";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function DashboardEnrolled() {
	const [activeTab, setActiveTab] = useState("enrolled");

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
			<h5 className="title">Enrolleld Courses</h5>
			<ul className="nav nav-tabs" id="myTab" role="tablist">
				<li className="nav-item" role="presentation">
					<button 
						className={`nav-link ${activeTab === "enrolled" ? "active" : ""}`} 
						role="tab" 
						aria-selected={activeTab === "enrolled"}
						onClick={()=>{setActiveTab("enrolled")}}
					>
						Enrolled Courses
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button 
						className={`nav-link ${activeTab === "active" ? "active" : ""}`} 
						role="tab" 
						aria-selected={activeTab === "active"}
						onClick={()=>{setActiveTab("active")}}
					>
						Active Courses
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button 
						className={`nav-link ${activeTab === "completed" ? "active" : ""}`} 
						role="tab" 
						aria-selected={activeTab === "completed"}
						onClick={()=>{setActiveTab("completed")}}
					>
						Completed Courses
					</button>
				</li>
			</ul>
			<div className="tab-content mt--30">
				<div className={`tab-pane fade ${activeTab === "enrolled" ? "show active" : ""}`} role="tabpanel">
					<div className="row g-5">
						{
							Courses.map((course, index) => {
								return (
									<div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
										<SingleCourseTwo
											courseClass="single-course-style-three enroll-course"
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
											bestSeller={course.bestSeller}
											type="dashboard"
											completePercent={course.completePercent}
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
				<div className={`tab-pane fade ${activeTab === "active" ? "show active" : ""}`} role="tabpanel">
					<div className="row g-5">
						{
							Courses.map((course, index) => {
								return (
									<div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
										<SingleCourseTwo
											courseClass="single-course-style-three enroll-course"
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
											bestSeller={course.bestSeller}
											type="dashboard"
											completePercent={course.completePercent}
										/>
									</div>
								);
							}).slice(2,8)
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
				<div className={`tab-pane fade ${activeTab === "completed" ? "show active" : ""}`} role="tabpanel">
					<div className="row g-5">
						{
							Courses.map((course, index) => {
								return (
									<div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
										<SingleCourseTwo
											courseClass="single-course-style-three enroll-course"
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
											bestSeller={course.bestSeller}
											type="dashboard"
											completePercent={course.completePercent}
										/>
									</div>
								);
							}).slice(4,10)
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
