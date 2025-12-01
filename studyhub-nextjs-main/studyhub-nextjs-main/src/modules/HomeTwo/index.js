import Banner from "./Banner";
import Category from "./Category";
import Course from "./Course";
import JoinTeam from "./JoinTeam";
import Offer from "./Offer";
import WhyChooseUs from "./WhyChooseUs";

import Counter from "@/components/Counter";
import ScrollTop from "@/components/ScrollTop";
import Course2 from "@/modules/HomeTwo/Course2";
import Course3 from "@/modules/HomeTwo/Course3";

export default function HomeTwoModule() {
	return (
		<main>
			<Banner />
			<Category />
			{/*<Offer />*/}
			<Course />
			<Course2 />
			<Course3 />
			{/*<WhyChooseUs />*/}
			{/*<JoinTeam />*/}
			{/*<Counter />*/}
			{/*<ScrollTop />*/}
		</main>
	)
}
