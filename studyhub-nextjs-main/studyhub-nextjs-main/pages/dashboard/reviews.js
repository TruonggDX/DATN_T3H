import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardReviews = dynamic(() => import('@/modules/Dashboard/Reviews'), {
  loading: () => <Preloader />,
});

export default function Reviews() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardReviews />
		</DashboardLayout>
	)
}
