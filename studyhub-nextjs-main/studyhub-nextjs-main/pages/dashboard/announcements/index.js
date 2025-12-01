import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardAnnouncements = dynamic(() => import('@/modules/Dashboard/Announcements'), {
  loading: () => <Preloader />,
});

export default function Announcements() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardAnnouncements />
		</DashboardLayout>
	)
}
