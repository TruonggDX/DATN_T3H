import Link from "next/link";

export default function BreadCrumbs( props ) {
	const { Img, Title, subTitle  } = props;

	const breadCrumbsStyle = {
		backgroundImage: `url(${Img ? Img : "/images/breadcrumb/01.jpg"})`
	}

	return (
		<div className="rts-bread-crumbarea-1 rts-section-gap bg_image" style={breadCrumbsStyle}>
			<div className="container">
				<div className="row ">
					<div className="col-md-12">
						<div className="breadcrumb-main-wrapper">
							<h1 className="title">{Title ? Title : 'Chi tiết sản phẩm'}</h1>
							{/* breadcrumb pagination area */}
							<div className="pagination-wrapper">
								<Link href="/">Trang chủ</Link>
								<i className="fa-regular fa-chevron-right"></i>
								<Link href="#" className="active">{subTitle ? subTitle : 'Chi tiết sản phẩm'}</Link>
							</div>
							{/* breadcrumb pagination area end */}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
