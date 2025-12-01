import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';
 
const BlogListModule = dynamic(() => import('@/modules/Blog/List'), {
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

			<BlogListModule />
			
			<Footer 
				CTAEnable="one"
				footerClass="footer-callto-action-area bg-light-1 pt_md--50 pt_sm--70"
			/>
		</main>
	)
}
