import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Announcements from "@/data/announcements.json";
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
 
const AnnouncementsDetailsModules = dynamic(() => import('@/modules/AnnouncementDetails'), {
  loading: () => <Preloader />,
});

export default function AnnouncementsDetails() {
	useAuthRedirect();
	const router = useRouter();
	const { asPath } = router;
	const announcementSlug = asPath.split('/')[3];

	const singleAnnouncements = Announcements.find((announcement) => {
        return announcement.slug === announcementSlug;
    });

	return (
		<main>
			<Header />

			<AnnouncementsDetailsModules item={singleAnnouncements} />

			<Footer 
				CTAEnable="one"
			/>
		</main>
	)
}
