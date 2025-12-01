import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardQuestion = dynamic(() => import('@/modules/Dashboard/Question'), {
  loading: () => <Preloader />,
});

export default function Question() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardQuestion />
		</DashboardLayout>
	)
}
