import SingleInstructorTwo from "@/components/Instructor/Two";
import Instructors from "@/data/instructors.json";

export default function CourseInstructor({}) {

	return (
		<>
			{
				Instructors.map((instructor) => {
					<SingleInstructorTwo 
						Slug={instructor.slug}
						Img={instructor.img}
						Name={instructor.name}
						Position={instructor.position}
						ratingCount={instructor.ratingCount}
						lectureCount={instructor.lectureCount}
						studentCount={instructor.studentCount}
					/>
				}).slice(0, 2)
			}
		</>
							
	)
}
