import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';
 
const AboutTwoModule = dynamic(() => import('@/modules/AboutTwo'), {
  loading: () => <Preloader />,
});

export default function AboutTwo() {
	return (
		<main>
			<Header 
				headerClass= "header-one v-2 header--sticky" 
				topbarEnable= {true} 
				menuItemsLeft = {true}
			/>

			<AboutTwoModule />

			<Footer 
				footerClass="footer-callto-action-area bg-light-1"
				CTAEnable="one"
			/>
		</main>
	)
}
