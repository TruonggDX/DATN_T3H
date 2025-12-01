import Image from 'next/image';
import Link from 'next/link';

export default function HeaderCategory(props) {
	
	return (
		<div className="category-area">
			<div className="category-btn">
				<Image src="/images/header/grid.png" alt="grid" width={15} height={15} />
				<span>Category</span>
				<i className="fa-sharp fa-regular fa-chevron-down"></i>
				<ul className="category-sub-menu">
					<li>
						<ul>
							<li>
								<Link href={`/course/?development`} className="menu-item">
									<Image src="/images/category/01.svg" alt="" width={60} height={64} />
									<div className="text">
										<h4>Development</h4>
										<p>130+ Courses</p>
									</div>
								</Link>
							</li>
							<li>
								<Link href={`/course/?academics`} className="menu-item">
									<Image src="/images/category/07.svg" alt="" width={60} height={64} />
									<div className="text">
										<h4>Academics</h4>
										<p>130+ Courses</p>
									</div>
								</Link>
							</li>
							<li>
								<Link href={`/course/?business`} className="menu-item">
									<Image src="/images/category/02.svg" alt="" width={60} height={64} />
									<div className="text">
										<h4>Business</h4>
										<p>150+ Courses</p>
									</div>
								</Link>
							</li>
							<li>
								<Link href={`/course/?design`} className="menu-item">
									<Image src="/images/category/03.svg" alt="" width={60} height={64} />
									<div className="text">
										<h4>Design & Art</h4>
										<p>120+ Courses</p>
									</div>
								</Link>
							</li>
						</ul>
						<ul>
							<li>
								<Link href={`/course/?marketing`} className="menu-item">
									<Image src="/images/category/04.svg" alt="" width={60} height={64} />
									<div className="text">
										<h4>Marketing</h4>
										<p>130+ Courses</p>
									</div>
								</Link>
							</li>
							<li>
								<Link href={`/course/?music`} className="menu-item">
									<Image src="/images/category/05.svg" alt="" width={60} height={64} />
									<div className="text">
										<h4>Music</h4>
										<p>100+ Courses</p>
									</div>
								</Link>
							</li>
							<li>
								<Link href={`/course/?photography`} className="menu-item">
									<Image src="/images/category/08.svg" alt="" width={60} height={64} />
									<div className="text">
										<h4>Photography</h4>
										<p>150+ Courses</p>
									</div>
								</Link>
							</li>
							<li>
								<Link href={`/course/?accounting`} className="menu-item">
									<Image src="/images/category/06.svg" alt="" width={60} height={64} />
									<div className="text">
										<h4>Accounting</h4>
										<p>150+ Courses</p>
									</div>
								</Link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	)
}
