import Image from "next/image";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function DashboardReviews() {
	const paginatePerPage = 10;

	const [ totalPaginate, setTotalPaginate ] = useState( 20 );
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
		<div className="rts-reviewd-area-dashed table-responsive">
			<h5 className="title">Reviews</h5>
			<table className="table-reviews">
				<thead>
					<tr>
						<th>Student</th>
						<th>Date</th>
						<th>Feedback</th>
					</tr>
				</thead>
				<tbody className="">
					<tr>
						<td>
							<div className="author-area">
								<div className="profile-picture">
									<Image src="/images/dashboard/reviews/01.png" width={50} height={50} alt="reviews" />
								</div>
								<p>Christopher</p>
							</div>
						</td>
						<td>
							<span className="date">October 29, 2023</span>
						</td>
						<td>
							<span className="name">Course: UI/UX Design for Expert</span>
							<div className="stars">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star-half"></i>
								<span>(10 Review)</span>
							</div>
						</td>
					</tr>
					<tr className="odd">
						<td>
							<div className="author-area">
								<div className="profile-picture">
									<Image src="/images/dashboard/reviews/02.png" width={50} height={50} alt="reviews" />
								</div>
								<p>Christopher</p>
							</div>
						</td>
						<td>
							<span className="date">November 28, 2023</span>
						</td>
						<td>
							<span className="name">Course: Speaking Korean for Beginners</span>
							<div className="stars">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star-half"></i>
								<span>(10 Review)</span>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div className="author-area">
								<div className="profile-picture">
									<Image src="/images/dashboard/reviews/03.png" width={50} height={50} alt="reviews" />
								</div>
								<p>Christopher</p>
							</div>
						</td>
						<td>
							<span className="date">December 12, 2023</span>
						</td>
						<td>
							<span className="name">Course: How to play the Guitar</span>
							<div className="stars">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star-half"></i>
								<span>(10 Review)</span>
							</div>
						</td>
					</tr>
					<tr className="odd">
						<td>
							<div className="author-area">
								<div className="profile-picture">
									<Image src="/images/dashboard/reviews/04.png" width={50} height={50} alt="reviews" />
								</div>
								<p>Daniel John</p>
							</div>
						</td>
						<td>
							<span className="date">January 04, 2024</span>
						</td>
						<td>
							<span className="name">Course: Speaking Korean for Beginners</span>
							<div className="stars">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star-half"></i>
								<span>(10 Review)</span>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div className="author-area">
								<div className="profile-picture">
									<Image src="/images/dashboard/reviews/05.png" width={50} height={50} alt="reviews" />
								</div>
								<p>Jennifer Linda</p>
							</div>
						</td>
						<td>
							<span className="date">October 29, 2023</span>
						</td>
						<td>
							<span className="name">Course: UI/UX Design for Expert</span>
							<div className="stars">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star-half"></i>
								<span>(10 Review)</span>
							</div>
						</td>
					</tr>
					<tr className="odd">
						<td>
							<div className="author-area">
								<div className="profile-picture">
									<Image src="/images/dashboard/reviews/06.png" width={50} height={50} alt="reviews" />
								</div>
								<p>Jennifer Linda</p>
							</div>
						</td>
						<td>
							<span className="date">October 29, 2023</span>
						</td>
						<td>
							<span className="name">Course: UI/UX Design for Expert</span>
							<div className="stars">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star-half"></i>
								<span>(10 Review)</span>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div className="author-area">
								<div className="profile-picture">
									<Image src="/images/dashboard/reviews/07.png" width={50} height={50} alt="reviews" />
								</div>
								<p>Daniel Jonh</p>
							</div>
						</td>
						<td>
							<span className="date">January 04, 2024</span>
						</td>
						<td>
							<span className="name">Course: UI/UX Design for Expert</span>
							<div className="stars">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star-half"></i>
								<span>(10 Review)</span>
							</div>
						</td>
					</tr>
					<tr className="odd">
						<td>
							<div className="author-area">
								<div className="profile-picture">
									<Image src="/images/dashboard/reviews/08.png" width={50} height={50} alt="reviews" />
								</div>
								<p>James Robert</p>
							</div>
						</td>
						<td>
							<span className="date">October 29, 2023</span>
						</td>
						<td>
							<span className="name">Course: UI/UX Design for Expert</span>
							<div className="stars">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star-half"></i>
								<span>(10 Review)</span>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div className="author-area">
								<div className="profile-picture">
									<Image src="/images/dashboard/reviews/09.png" width={50} height={50} alt="reviews" />
								</div>
								<p>Daniel Jonh</p>
							</div>
						</td>
						<td>
							<span className="date">October 29, 2023</span>
						</td>
						<td>
							<span className="name">Course: UI/UX Design for Expert</span>
							<div className="stars">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star-half"></i>
								<span>(10 Review)</span>
							</div>
						</td>
					</tr>
					<tr className="odd">
						<td>
							<div className="author-area">
								<div className="profile-picture">
									<Image src="/images/dashboard/reviews/10.png" width={50} height={50} alt="reviews" />
								</div>
								<p>James Robert</p>
							</div>
						</td>
						<td>
							<span className="date">October 29, 2023</span>
						</td>
						<td>
							<span className="name">Course: UI/UX Design for Expert</span>
							<div className="stars">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star-half"></i>
								<span>(10 Review)</span>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div className="author-area">
								<div className="profile-picture">
									<Image src="/images/dashboard/reviews/11.png" width={50} height={50} alt="reviews" />
								</div>
								<p>James Robert</p>
							</div>
						</td>
						<td>
							<span className="date">October 29, 2023</span>
						</td>
						<td>
							<span className="name">Course: UI/UX Design for Expert</span>
							<div className="stars">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star-half"></i>
								<span>(10 Review)</span>
							</div>
						</td>
					</tr>
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
