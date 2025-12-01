import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Quizes from "@/data/quizes.json";
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
 
const QuizDetailsModules = dynamic(() => import('@/modules/QuizDetails'), {
  loading: () => <Preloader />,
});

export default function QuizDetails() {
	useAuthRedirect();
	const router = useRouter();
	const { asPath } = router;
	const quizSlug = asPath.split('/')[3];

	const singleQuiz = Quizes.find((quiz) => {
        return quiz.slug === quizSlug;
    });

	return (
		<main>
			<Header />

			<QuizDetailsModules item={singleQuiz} />

			<Footer 
				CTAEnable="one"
			/>
		</main>
	)
}
