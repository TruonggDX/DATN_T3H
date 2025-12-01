import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';

const HomeTwoModule = dynamic(() => import('@/modules/HomeTwo'), {
	loading: () => <Preloader />,
});

export default function HomeTwo() {
	return (
		<main>
			<Header
				headerClass= "header-one v-2 header--sticky"
				topbarEnable= {true}
				menuItemsLeft = {true}
			/>

			<HomeTwoModule />

			<Footer
				footerClass="footer-callto-action-area bg-dark-footer-1"
				footerLogo="/images/logo/logo-2.svg"
				CTAEnable="two"
			/>
		</main>
	)
}
