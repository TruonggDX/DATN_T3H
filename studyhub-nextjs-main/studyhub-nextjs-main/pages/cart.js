import Preloader from '@/components/Preloader';
import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import dynamic from 'next/dynamic';
 
const CartModules = dynamic(() => import('@/modules/Cart'), {
  loading: () => <Preloader />,
});

export default function Cart() {
	return (
		<main>
			<Header 
				headerClass= "header-one v-2 header--sticky" 
				topbarEnable= {true} 
				menuItemsLeft = {true}
			/>

			<CartModules />
			
			<Footer 
				footerClass="footer-callto-action-area bg-light-1"
				footerLogo="/images/logo/logo-1.svg"
			/>
		</main>
	)
}