import BreadCrumbs from "@/components/BreadCrumbs";
import ScrollTop from "@/components/ScrollTop";
import QuizDetailsArea from "./QuizDetailsArea";

export default function QuizDetailsModules(singleQuiz) {
	
	return (
		<main>
			<BreadCrumbs
				Title="Quiz Details"
				subTitle={singleQuiz.item?.quizName || "Quiz Details"}
			/>
			<QuizDetailsArea item={singleQuiz.item} />
			<ScrollTop />
		</main>
	)
}
