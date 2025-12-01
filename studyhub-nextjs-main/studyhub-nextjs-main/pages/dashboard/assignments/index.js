import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardAssignments = dynamic(() => import('@/modules/Dashboard/Assignments'), {
  loading: () => <Preloader />,
});

export default function Assignments() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardAssignments />
		</DashboardLayout>
	)
}
