import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import api from "@/service/blogsService";

const BlogDetailsModules = dynamic(() => import('@/modules/BlogDetails'), {
  loading: () => <Preloader />,
});

export default function BlogDetails() {
	const router = useRouter();
	const { slug } = router.query;
	const [data, setData] = useState();

	useEffect(() => {
		if (slug) {
			api.getBlog(slug)
				.then(res => {
					setData(res.data);
				})
				.catch(err => console.error(err));
		}
	}, [slug]);
	return (
		<main>
			<Header />
			<BlogDetailsModules item={data} />
			<Footer />
		</main>
	)
}
