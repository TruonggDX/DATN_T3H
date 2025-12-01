import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Meetings from "@/data/meetings";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
 
const MeetingDetailsModules = dynamic(() => import('@/modules/MeetingDetails'), {
  loading: () => <Preloader />,
});

export default function MeetingDetails() {
	const router = useRouter();
	const { asPath } = router;
	const MeetingSlug = asPath.split('/')[2];

	const singleMeeting = Meetings.find((meeting) => {
        return meeting.slug === MeetingSlug;
    });

	return (
		<main>
			<Header />

			<MeetingDetailsModules item={singleMeeting} />

			<Footer 
				CTAEnable="one"
			/>
		</main>
	)
}
