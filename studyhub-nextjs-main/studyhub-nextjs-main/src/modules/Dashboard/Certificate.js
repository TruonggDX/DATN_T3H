import Image from "next/image";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function DashboardCertificate() {
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
		<>
			<div className="certificates-wrapper-dashed">
				<div className="create-certificates-top-main-wrapper">
					<div className="left">
						<h5 className="title">Create Your Certificate In 3 Steps</h5>
						<p className="disc">
							Add instructor, Benefits, Requirements/Instructions, Targeted Audience, Materials Included
						</p>
						<a href="#" className="rts-btn btn-primary"><i className="fa-sharp fa-regular fa-file-certificate"></i> Create Certificate</a>
					</div>
					<div className="right">
						<div className="certificates">
							<Image src="/images/dashboard/02.png" width={187} height={143} alt="dashboard" />
						</div>
					</div>
				</div>
				<h5 className="title mt--30">All Certificate</h5>
				<div className="all-certificates-main-wrapper-dashed mt--25">
					{/* single certificates- */}
					<div className="single-certificates">
						<div className="left">
							<Image src="/images/dashboard/certificates/01.png" width={139} height={97} alt="dsds" />
							<h5 className="title">Machine Learning by Studyhub</h5>
						</div>
						<div className="right">
							<a href="#" className="draft-btn">
								<i className="fa-solid fa-file-arrow-up"></i>
								<span>Draft</span>
								<i className="fa-regular fa-eye-slash"></i>
							</a>
							<i className="fa-regular fa-pen-to-square"></i>
							<a href="#" className="delete-btn">
								<i className="fa-regular fa-trash"></i>
							</a>
						</div>
					</div>
					{/* single certificates-end */}
					{/* single certificates- */}
					<div className="single-certificates">
						<div className="left">
							<Image src="/images/dashboard/certificates/02.png" width={139} height={97} alt="dsds" />
							<h5 className="title">Machine Learning by Studyhub</h5>
						</div>
						<div className="right">
							<a href="#" className="draft-btn published-btn">
								<i className="fa-solid fa-file-arrow-up"></i>
								<span>Published</span>
								<i className="fa-regular fa-eye-slash"></i>
							</a>
							<i className="fa-regular fa-pen-to-square"></i>
							<a href="#" className="delete-btn">
								<i className="fa-regular fa-trash"></i>
							</a>
						</div>
					</div>
					{/* single certificates-end */}
					{/* single certificates- */}
					<div className="single-certificates">
						<div className="left">
							<Image src="/images/dashboard/certificates/03.png" width={139} height={97} alt="dsds" />
							<h5 className="title">Machine Learning by Studyhub</h5>
						</div>
						<div className="right">
							<a href="#" className="draft-btn published-btn">
								<i className="fa-solid fa-file-arrow-up"></i>
								<span>Published</span>
								<i className="fa-regular fa-eye-slash"></i>
							</a>
							<i className="fa-regular fa-pen-to-square"></i>
							<a href="#" className="delete-btn">
								<i className="fa-regular fa-trash"></i>
							</a>
						</div>
					</div>
					{/* single certificates-end */}
					{/* single certificates- */}
					<div className="single-certificates">
						<div className="left">
							<p>Untitled Template</p>
						</div>
						<div className="right">
							<a href="#" className="draft-btn">
								<i className="fa-solid fa-file-arrow-up"></i>
								<span>Draft</span>
								<i className="fa-regular fa-eye-slash"></i>
							</a>
							<i className="fa-regular fa-pen-to-square"></i>
							<a href="#" className="delete-btn">
								<i className="fa-regular fa-trash"></i>
							</a>
						</div>
					</div>
					{/* single certificates-end */}
					{/* single certificates- */}
					<div className="single-certificates">
						<div className="left">
							<p>Untitled Template</p>
						</div>
						<div className="right">
							<a href="#" className="draft-btn">
								<i className="fa-solid fa-file-arrow-up"></i>
								<span>Draft</span>
								<i className="fa-regular fa-eye-slash"></i>
							</a>
							<i className="fa-regular fa-pen-to-square"></i>
							<a href="#" className="delete-btn">
								<i className="fa-regular fa-trash"></i>
							</a>
						</div>
					</div>
					{/* single certificates-end */}
					{/* single certificates- */}
					<div className="single-certificates">
						<div className="left">
							<p>Untitled Template</p>
						</div>
						<div className="right">
							<a href="#" className="draft-btn">
								<i className="fa-solid fa-file-arrow-up"></i>
								<span>Draft</span>
								<i className="fa-regular fa-eye-slash"></i>
							</a>
							<i className="fa-regular fa-pen-to-square"></i>
							<a href="#" className="delete-btn">
								<i className="fa-regular fa-trash"></i>
							</a>
						</div>
					</div>
					{/* single certificates-end */}
					{/* single certificates- */}
					<div className="single-certificates">
						<div className="left">
							<p>Untitled Template</p>
						</div>
						<div className="right">
							<a href="#" className="draft-btn">
								<i className="fa-solid fa-file-arrow-up"></i>
								<span>Draft</span>
								<i className="fa-regular fa-eye-slash"></i>
							</a>
							<i className="fa-regular fa-pen-to-square"></i>
							<a href="#" className="delete-btn">
								<i className="fa-regular fa-trash"></i>
							</a>
						</div>
					</div>
					{/* single certificates-end */}
					{/* single certificates- */}
					<div className="single-certificates">
						<div className="left">
							<p>Untitled Template</p>
						</div>
						<div className="right">
							<a href="#" className="draft-btn">
								<i className="fa-solid fa-file-arrow-up"></i>
								<span>Draft</span>
								<i className="fa-regular fa-eye-slash"></i>
							</a>
							<i className="fa-regular fa-pen-to-square"></i>
							<a href="#" className="delete-btn">
								<i className="fa-regular fa-trash"></i>
							</a>
						</div>
					</div>
					{/* single certificates-end */}
				</div>
			</div>

			<div className="pagination-full-width no-border">
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
		</>
	)
}
