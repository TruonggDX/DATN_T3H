import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';
 
const ContactModule = dynamic(() => import('@/modules/Contact'), {
  loading: () => <Preloader />,
});

export default function Contact() {
	return (
		<main>
			<Header 
				headerClass= "header-one v-2 header--sticky" 
				topbarEnable= {true} 
				menuItemsLeft = {true}
			/>

			<ContactModule />
			
			<div className="rts-section-gap"></div>

			<Footer 
				footerClass="footer-callto-action-area bg-light-1"
				CTAEnable="one"
			/>
		</main>
	)
}
