import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardCertificate = dynamic(() => import('@/modules/Dashboard/Certificate'), {
  loading: () => <Preloader />,
});

export default function Certificate() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardCertificate />
		</DashboardLayout>
	)
}
