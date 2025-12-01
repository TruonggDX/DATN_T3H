import Preloader from '@/components/Preloader';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import DashboardLayout from '@/layout/Dashboard';
import dynamic from 'next/dynamic';
 
const DashboardHome = dynamic(() => import('@/modules/Dashboard/Home'), {
  loading: () => <Preloader />,
});

export default function Dashboard() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardHome />
		</DashboardLayout>
	)
}
