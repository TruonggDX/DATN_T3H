import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';
 
const LessonDetailsModule = dynamic(() => import('@/modules/LessonDetails'), {
  loading: () => <Preloader />,
});

export default function Pricing() {
	return (
		<main>
			<LessonDetailsModule />
		</main>
	)
}
