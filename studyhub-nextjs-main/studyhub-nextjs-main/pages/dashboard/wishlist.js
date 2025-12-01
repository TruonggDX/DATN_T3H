import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardWishlist = dynamic(() => import('@/modules/Dashboard/Wishlist'), {
  loading: () => <Preloader />,
});

export default function Wishlist() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardWishlist />
		</DashboardLayout>
	)
}
