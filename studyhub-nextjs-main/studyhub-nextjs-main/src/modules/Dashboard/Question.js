import Questions from "@/data/questions.json";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function DashboardQuestion() {
	const paginatePerPage = 10;

    const [showDropdown, setShowDropdown] = useState(null);
	const [ totalPaginate, setTotalPaginate ] = useState( Questions.length );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ totalPage, setTotalPage ] = useState( Math.ceil(totalPaginate/paginatePerPage) );
	const [ startItemCount, setStartItemCount ] = useState( 0 );
	const [ endItemCount, setEndItemCount ] = useState( paginatePerPage );
	const [ paginationKey, setPaginationKey ] = useState(Date.now());
	const [ forcePage, setForcePage ] = useState( 0 );

	const handlePageChange = ( event ) => {
		const selectedPage = event.selected + 1;
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

	 // Utility function to calculate the difference in days between today and the question date
	 function calculateDaysDifference(dateString) {
        const questionDate = new Date(dateString);
        const today = new Date();

        // Calculate the difference in time (milliseconds)
        const differenceInTime = today - questionDate;

        // Convert time difference from milliseconds to days
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

        return differenceInDays;
    }
	
	return (
		<div className="rts-reviewd-area-dashed table-responsive">
			<h5 className="title">Question & Answer</h5>
			<div className="short-by--category-sash">
				<span>Sort By:</span>
				<select className="nice-select" name="price" style={{"flex": "1", "max-width": "250px"}}>
					<option>Read (12)</option>
					<option value="asc">Stars (30)</option>
					<option value="desc">Comments(42)</option>
					<option value="pop">Popularity (20)</option>
					<option value="low">Questions & Ans (10)</option>
					<option value="high">Stars (52)</option>
				</select>
			</div>
			<table className="table-reviews quiz">
				<thead>
					<tr>
						<th style={{"width": "25%"}}>Student</th>
						<th style={{"width": "30%"}}>Question</th>
						<th style={{"width": "15%"}}>Reply</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody className="questions-answer">
					{	
						Questions.map((question, index) => {
							const daysAgo = calculateDaysDifference(question.date);
							return (
								<tr key={index}>
									<td>
										<div className="students-questions">
											<Image src={`/images/dashboard/reviews/${question.img}`} width={50} height={50} alt="review" />
											<div className="information-q">
												<p>{question.author}</p>
												<span>{daysAgo} Days</span>
											</div>
										</div>
									</td>
									<td>
										<span className="questions">{question.title}</span>
										<span>{question.topic}</span>
									</td>
									<td>
										<span className="marks">{question.marks}</span>
									</td>
									<td>
										<div className="status-btn-wrapper">
											<i className="fa-light fa-circle-check"></i>
											<div className="button-area">
												<Link href={`course/${question.slug}`} className="rts-btn btn-primary">Replay</Link>
												<i
													className="fa-regular fa-ellipsis-vertical"
													onClick={() => toggleDropdown(question.id)}
												/>
												{showDropdown === question.id && (
													<ul className="action-dropdown">
														<li>
															<button onClick={() => handleEdit(question.id)}>Edit</button>
														</li>
														<li>
															<button onClick={() => handleDelete(question.id)}>Delete</button>
														</li>
													</ul>
												)}
											</div>
										</div>
									</td>
								</tr>
							);
						}).slice(startItemCount,endItemCount)
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
