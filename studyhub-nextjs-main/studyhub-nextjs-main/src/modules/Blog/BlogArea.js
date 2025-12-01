import BlogSidebar from "@/components/Blog/BlogSidebar";
import SingleBlogTwo from "@/components/Blog/Two";
import Blogs from "@/data/blogs.json";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function BlogArea() {
	const paginatePerPage = 3;
	
	const [ totalPaginate, setTotalPaginate ] = useState( Blogs.length );
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

	return (
		<div className="rts-blog-list-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					{/*  rts blog post area */}
					<div className="col-xl-8 col-md-12 col-sm-12 col-12">
						<div className="row g-5">
							{	
								Blogs.map((blog, index) => {
									return (
										<div key={index} className="col-lg-12">
											<SingleBlogTwo
												Slug={blog.slug}
												Img={blog.image}
												detailsImg={blog.detailsImg}
												Category={blog.category}
												Tag={blog.tag}
												Author={blog.author}
												Title={blog.title}
												publishedDate={blog.publishedDate}
												btnText={blog.btnText}
											/>
										</div>
									);
								}).slice(startItemCount,endItemCount)
							}
							<div className="col-lg-12">
								<div className="rts-elevate-pagination">
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
					<div className="col-xl-4 col-md-12 col-sm-12 col-12 rts-sticky-column-item">
						<BlogSidebar />
					</div>
				</div>
			</div>
      	</div>
	)
}
