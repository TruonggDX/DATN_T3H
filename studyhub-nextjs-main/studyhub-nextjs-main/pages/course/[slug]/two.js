import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Courses from "@/data/courses";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
 
const CourseDetailsModulesTwo = dynamic(() => import('@/modules/CourseDetails/Two'), {
  loading: () => <Preloader />,
});

export default function CourseDetails() {
	const router = useRouter();
	const { asPath } = router;
	const courseSlug = asPath.split('/')[2];

	const singleCourse = Courses.find((course) => {
        return course?.slug === courseSlug;
    });

	console.log('singleCourse chk: ', singleCourse, courseSlug );

	return (
		<main>
			<Header />

			<CourseDetailsModulesTwo item={singleCourse} />

			<Footer />
		</main>
	)
}
