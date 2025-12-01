import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';
 
const AboutModule = dynamic(() => import('@/modules/About'), {
  loading: () => <Preloader />,
});

export default function About() {
	return (
		<main>
			<Header 
				headerClass= "header-one v-2 header--sticky" 
				topbarEnable= {true} 
				menuItemsLeft = {true}
			/>

			<AboutModule />

			<Footer 
				footerClass="footer-callto-action-area bg-light-1"
				CTAEnable="one"
			/>
		</main>
	)
}
