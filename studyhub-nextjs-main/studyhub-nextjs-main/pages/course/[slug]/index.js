// pages/course-details/index.js → giữ nguyên đường dẫn (sau này đổi tên folder cũng được)
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import CourseDetailsBreadcrumbs from "@/components/Breadcrumbs";
import CourseDetailsArea from "@/modules/CourseDetails/CourseDetailsArea";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import Preloader from "@/components/Preloader";
import productService from "@/service/productService";
import variantService from "@/service/variantService";

export default function CourseDetails() {
	const router = useRouter();
	const { slug } = router.query;
	const [product, setProduct] = useState(null);
	const [variants, setVariants] = useState([]);
	useEffect(() => {
		if (slug) {
			if (slug) {
				productService.getProduct(slug)
					.then(res => {
						setProduct(res.data);
					})
					.catch(err => console.error(err));
				variantService.getVariantByProductId(slug).then(res => {
					setVariants(res.data);
				})

			}
		}
	}, [slug]);

	if (!product) return <Preloader />;

	return (
		<main>
			<Header />
			<CourseDetailsBreadcrumbs product={product} />
			<CourseDetailsArea product={product} variants={variants} />
			<Footer />
		</main>
	);
}