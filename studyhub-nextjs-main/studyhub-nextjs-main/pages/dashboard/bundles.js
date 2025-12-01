import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardBundles = dynamic(() => import('@/modules/Dashboard/Bundles'), {
  loading: () => <Preloader />,
});

export default function Bundles() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardBundles />
		</DashboardLayout>
	)
}
