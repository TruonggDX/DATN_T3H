import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';
 
const MeetingModule = dynamic(() => import('@/modules/Meeting'), {
  loading: () => <Preloader />,
});

export default function Meeting() {
	return (
		<main>
			<Header 
				headerClass= "header-one v-2 header--sticky" 
				topbarEnable= {true} 
				menuItemsLeft = {true}
			/>

			<MeetingModule />

			<div className="rts-section-gap"></div>

			<Footer 
				footerClass="footer-callto-action-area bg-light-1"
				footerLogo="/images/logo/logo-1.svg"
				CTAEnable="one"
			/>
		</main>
	)
}
