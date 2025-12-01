import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';
 
const BlogModule = dynamic(() => import('@/modules/Blog'), {
  loading: () => <Preloader />,
});

export default function Blog() {
	return (
		<main>
			<Header 
				headerClass= "header-one v-2 header--sticky" 
				topbarEnable= {true} 
				menuItemsLeft = {true}
			/>

			<BlogModule />

			<Footer 
				footerClass="footer-callto-action-area bg-light-1"
				footerLogo="/images/logo/logo-1.svg"
			/>
		</main>
	)
}
