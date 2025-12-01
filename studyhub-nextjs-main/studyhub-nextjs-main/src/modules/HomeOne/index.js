import About from "./About";
import Banner from "./Banner";
import Blog from "./Blog";
import Brand from "./Brand";
import Category from "./Category";
import Course from "./Course";
import Events from "./Events";
import Instructor from "./Instructor";
import Testimonial from "./Testimonial";
import WhyChooseUs from "./WhyChooseUs";

import Counter from "@/components/Counter";
import ScrollTop from "@/components/ScrollTop";


export default function HomeOneModule() {
	return (
		<main>
			<Banner />
			<Brand />
			<About />
			<Category />
			<Course />
			<WhyChooseUs />
			<Events />
			<Counter />
			<Instructor />
			<Testimonial />
			<Blog />
			<ScrollTop />
		</main>
	)
}
