import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardQuiz = dynamic(() => import('@/modules/Dashboard/Quiz'), {
  loading: () => <Preloader />,
});

export default function Quiz() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardQuiz />
		</DashboardLayout>
	)
}
