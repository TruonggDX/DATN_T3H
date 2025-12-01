import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardSettings = dynamic(() => import('@/modules/Dashboard/Settings'), {
  loading: () => <Preloader />,
});

export default function Settings() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardSettings />
		</DashboardLayout>
	)
}
