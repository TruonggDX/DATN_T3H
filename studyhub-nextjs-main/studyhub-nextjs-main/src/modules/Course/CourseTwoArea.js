
import SingleCourseThree from "@/components/Course/Three";
import Courses from "@/data/courses.json";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function CourseTwoArea() {
	const paginatePerPage = 6;
	
	const [ activeTab, setActiveTab ] = useState('grid');
	const [ activeFilter, setActiveFilter ] = useState(false);
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

	
	function handleFilter(){
		setActiveFilter( !activeFilter )
	}

	return (
		<div className="rts-course-default-area rts-section-gap">
			<div className="container">
				<div className="filter-small-top-full">
					<div className="left-filter">
						<span>Sort By</span>
						<div className="nice-select-wrap">
							<select className="nice-select" name="price">
								<option>All Category</option>
								<option value="asc">Design</option>
								<option value="desc">Development</option>
								<option value="pop">Popularity</option>
								<option value="low">Price</option>
								<option value="high">Stars</option>
							</select>
						</div>
					</div>
					<div className="right-filter">
						<span>Showing 1-9 of 19 results</span>
						<ul className="nav nav-tabs">
							<li className="nav-item">
								<button 
									className={`nav-link discover-filter-button ${activeFilter && 'discover-filter-activation open'}`}
									onClick={handleFilter}
								>
									<i className="fa-regular fa-filter"></i>
									<span> Filter</span>
								</button>
							</li>
						</ul>
					</div>
				</div>
				{
					activeFilter &&
					<div className="row mt--30">
						<div className="col-lg-12">
							<div className="default-exp-wrapper">
								<div className="course-filter-top-wrapper">
									<div className="rts-course-filter-area">
										{/* single filter wized */}
										<div className="single-filter-left-wrapper">
											<h6 className="title">Type</h6>
											<div className="checkbox-filter filter-body">
												<div className="checkbox-wrapper">
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="type-1" />
															<label htmlFor="type-1">Course</label><br />
														</div>
														<span className="number">(20,000)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="type-2" />
															<label htmlFor="type-2">Bundle</label><br />
														</div>
														<span className="number">(20,000)</span>
													</div>
													{/* single check box end */}
												</div>
											</div>
										</div>
										{/* single filter wized end */}
										{/* single filter wized */}
										<div className="single-filter-left-wrapper">
											<h6 className="title">Category</h6>
											<div className="checkbox-filter filter-body">
												<div className="checkbox-wrapper">
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="category-1" />
															<label htmlFor="category-1">Web Development</label><br />
														</div>
														<span className="number">(130)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="category-2" />
															<label htmlFor="category-2">Film &amp; Video</label><br />
														</div>
														<span className="number">(85)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="category-3" />
															<label htmlFor="category-3">Illustration</label><br />
														</div>
														<span className="number">(210)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="category-4" />
															<label htmlFor="category-4">Music &amp; Art</label><br />
														</div>
														<span className="number">(45)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="category-5" />
															<label htmlFor="category-5">Photography</label><br />
														</div>
														<span className="number">(35)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="category-6" />
															<label htmlFor="category-6">Business</label><br />
														</div>
														<span className="number">(66)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="category-7" />
															<label htmlFor="category-7">Design &amp; UI/UX</label><br />
														</div>
														<span className="number">(95)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="category-8" />
															<label htmlFor="category-8">Web Design</label><br />
														</div>
														<span className="number">(150)</span>
													</div>
													{/* single check box end */}
												</div>
											</div>
										</div>
										{/* single filter wized end */}
										{/* single filter wized */}
										<div className="single-filter-left-wrapper">
											<h6 className="title">Level</h6>
											<div className="checkbox-filter filter-body">
												<div className="checkbox-wrapper">
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="lavel-1" />
															<label htmlFor="lavel-1">All Levels</label><br />
														</div>
														<span className="number">(130)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="lavel-2" />
															<label htmlFor="lavel-2">Beginner</label><br />
														</div>
														<span className="number">(85)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="lavel-3" />
															<label htmlFor="lavel-3">Intermediate</label><br />
														</div>
														<span className="number">(210)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="lavel-4" />
															<label htmlFor="lavel-4">Expert</label><br />
														</div>
														<span className="number">(45)</span>
													</div>
													{/* single check box end */}
												</div>
											</div>
										</div>
										{/* single filter wized end */}
										{/* single filter wized */}
										<div className="single-filter-left-wrapper">
											<h6 className="title">Author</h6>
											<div className="checkbox-filter filter-body">
												<div className="checkbox-wrapper">
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="author-1" />
															<label htmlFor="author-1">Admin</label><br />
														</div>
														<span className="number">(130)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="author-2" />
															<label htmlFor="author-2">Sean Kaye</label><br />
														</div>
														<span className="number">(85)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="author-3" />
															<label htmlFor="author-3">David Travis</label><br />
														</div>
														<span className="number">(210)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="author-4" />
															<label htmlFor="author-4">Dr. Angela Yu</label><br />
														</div>
														<span className="number">(45)</span>
													</div>
													{/* single check box end */}
												</div>
											</div>
										</div>
										{/* single filter wized end */}
										{/* single filter wized */}
										<div className="single-filter-left-wrapper">
											<h6 className="title">Tage</h6>
											<div className="checkbox-filter filter-body">
												<div className="checkbox-wrapper">
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="Tage-1" />
															<label htmlFor="Tage-1">Course</label><br />
														</div>
														<span className="number">(10)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="Tage-2" />
															<label htmlFor="Tage-2">Education</label><br />
														</div>
														<span className="number">(85)</span>
													</div>
													{/* single check box end */}
													{/* single check box */}
													<div className="single-checkbox-filter">
														<div className="check-box">
															<input type="checkbox" id="Tage-3" />
															<label htmlFor="Tage-3">LMS</label><br />
														</div>
														<span className="number">(21)</span>
													</div>
													{/* single check box end */}
												</div>
											</div>
										</div>
										{/* single filter wized end */}
									</div>
								</div>
							</div>
						</div>
					</div>
				}
				<div className="row g-5 mt--10">
					{
						Courses.map((course, index) => {
							return (
								<div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
									<SingleCourseThree
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
										Level={course.level}
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
	)
}
