import Link from "next/link";

export default function ErrorPage() {
	return (
		<div className="rts-404-area-start">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="inner-content">
							<h1 className="title">404</h1>
							<h2 className="title">PAGE NOT FOUND
							</h2>
							<p className="disc">Sorry, the page you seems looking for,
								has been moved, redirected or removed permanently.</p>
							<Link href="/" className="rts-btn btn-primary">GO BACK HOME</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}