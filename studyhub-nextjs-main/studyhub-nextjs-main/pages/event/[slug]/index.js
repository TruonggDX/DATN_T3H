import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Events from "@/data/events";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
 
const EventDetailsModules = dynamic(() => import('@/modules/EventDetails'), {
  loading: () => <Preloader />,
});

export default function EventDetails() {
	const router = useRouter();
	const { asPath } = router;
	const eventSlug = asPath.split('/')[2];

	const singleEvent = Events.find((Event) => {
        return Event.slug === eventSlug;
    });

	return (
		<main>
			<Header />

			<EventDetailsModules item={singleEvent} />

			<div className="rts-section-gap"></div>

			<Footer 
				CTAEnable="one"
				footerClass="footer-callto-action-area bg-light-1 pt_md--50 pt_sm--70"
			/>
		</main>
	)
}
