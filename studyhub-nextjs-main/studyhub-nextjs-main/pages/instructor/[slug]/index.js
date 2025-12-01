import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Instructors from "@/data/instructors";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
 
const InstructorDetailsModules = dynamic(() => import('@/modules/InstructorDetails'), {
  loading: () => <Preloader />,
});

export default function InstructorDetails() {
	const router = useRouter();
	const { asPath } = router;
	const instructorSlug = asPath.split('/')[2];

	const singleInstructor = Instructors.find((instructor) => {
        return instructor.slug === instructorSlug;
    });

	return (
		<main>
			<Header />

			<InstructorDetailsModules item={singleInstructor} />

			<Footer />
		</main>
	)
}
