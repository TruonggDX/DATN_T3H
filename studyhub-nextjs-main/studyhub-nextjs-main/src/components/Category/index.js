import Image from "next/image";
import Link from "next/link";

export default function SingleCategory( props ) {
	const { categoryClass, Slug, Img, Title, categoryCount, imgWidth, imgHeight  } = props;

	return (
		<Link href={`/course/:id?cat=${Slug || 'development'}`} className={categoryClass || 'category-style-one'}>
			<div className="icon">
				<Image src={Img || '/images/category/01.svg'} alt="brand" width={imgWidth || 60} height={imgHeight || 64} />
			</div>
			<h5 className="title">{Title || 'Development'}</h5>
			<span>{categoryCount || '130'}+ Courses</span>
		</Link>
	)
}
