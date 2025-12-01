import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Assignments from "@/data/assignments.json";
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
 
const AssignmentDetailsModules = dynamic(() => import('@/modules/AssignmentDetails'), {
  loading: () => <Preloader />,
});

export default function AssignmentDetails() {
	useAuthRedirect();
	const router = useRouter();
	const { asPath } = router;
	const assignmentSlug = asPath.split('/')[3];

	const singleAssignment = Assignments.find((assignment) => {
        return assignment.slug === assignmentSlug;
    });

	return (
		<main>
			<Header />

			<AssignmentDetailsModules item={singleAssignment} />

			<Footer 
				CTAEnable="one"
			/>
		</main>
	)
}
