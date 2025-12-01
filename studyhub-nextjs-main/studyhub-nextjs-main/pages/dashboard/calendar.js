import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardCalendar = dynamic(() => import('@/modules/Dashboard/Calendar'), {
  loading: () => <Preloader />,
});

export default function Calendar() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardCalendar />
		</DashboardLayout>
	)
}
