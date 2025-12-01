import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardCourses = dynamic(() => import('@/modules/Dashboard/Courses'), {
  loading: () => <Preloader />,
});

export default function Courses() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardCourses />
		</DashboardLayout>
	)
}
