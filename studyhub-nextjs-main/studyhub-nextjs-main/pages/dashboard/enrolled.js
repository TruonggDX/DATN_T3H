import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardEnrolled = dynamic(() => import('@/modules/Dashboard/Enrolled'), {
  loading: () => <Preloader />,
});

export default function Enrolled() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardEnrolled />
		</DashboardLayout>
	)
}
