import SingleCourseList from "@/components/Course/List";
import SingleCourseTwo from "@/components/Course/Two";
import Courses from "@/data/courses.json";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function CourseThreeArea() {
	const paginatePerPage = 6;
	
	const [ activeTab, setActiveTab ] = useState('grid');
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
		<div className="rts-course-default-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-12">
						<div className="filter-small-top-full">
							<div className="left-filter">
								<span>Short By</span>
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
								<ul className="nav nav-tabs" id="myTab" role="tablist">
									<li className="nav-item">
										<button 
											className={`nav-link ${activeTab === "grid" && 'active'}`}
											onClick={()=> {handleTab('grid')}}
										>
											<i className="fas fa-th-large"></i>
											<span>Grid</span>
										</button>
									</li>
									<li className="nav-item">
										<button 
											className={`nav-link ${activeTab === "list" && 'active'}`}
											onClick={()=> {handleTab('list')}}
										>
											<i className="fa-light fa-list"></i>
											<span> List</span>
										</button>
									</li>
								</ul>
							</div>
						</div>
						<div className="row g-5 mt--10">
							{
								activeTab === "grid" ?
								Courses.map((course, index) => {
									return (
										<div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
											<SingleCourseTwo
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
											/>
										</div>
									);
								}).slice(startItemCount,endItemCount) :
								<div className="col-lg-12">
								{
									Courses.map((course) => {
										<SingleCourseList
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
										/>
									}).slice(startItemCount,endItemCount)
								}
							</div>
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
		</div>
	)
}
