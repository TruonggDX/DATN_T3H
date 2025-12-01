import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardOrder = dynamic(() => import('@/modules/Dashboard/Order'), {
  loading: () => <Preloader />,
});

export default function Order() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardOrder />
		</DashboardLayout>
	)
}
