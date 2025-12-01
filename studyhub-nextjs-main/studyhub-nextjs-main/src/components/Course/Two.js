import Image from "next/image";
import Link from "next/link";

export default function SingleCourseTwo(props) {
    const {
        courseClass,
        Slug,
        Img,
        Title,
        Category,
        ratingCount,
        lessonCount,
        studentCount,
        Author,
        bestSeller,
        prevPrice,
        Price,
        imgWidth,
        imgHeight,
        type,
        completePercent
    } = props;

    return (
		<div className={courseClass || 'single-course-style-three'}>
			<Link href={`/course/${Slug || 'details'}`} className="thumbnail">
				<Image
					src={Img || '/images/course/01.jpg'}
					width={imgWidth || 290}
					height={imgHeight || 270}
					alt="course"
					style={{
						objectFit: "cover",
						width: "290px",
						height: "270px",
						borderRadius: "8px"
					}}
				/>

			</Link>
			<div className="body-area p-3 flex flex-col gap-1">
				{/* Mã và Thương hiệu */}
				<div className="lesson-students text-sm text-gray-500 flex flex-col gap-0.5">
					<div>Mã: {lessonCount}</div>
					<div>Thương hiệu: {studentCount}</div>
				</div>

				<Link href={`/course/${Slug || 'details'}`}>
					<h5
						className="title font-semibold text-lg mt-1"
						style={{
							display: "-webkit-box",
							WebkitLineClamp: 1,
							WebkitBoxOrient: "vertical",
							overflow: "hidden"
						}}
					>
						{Title || 'The Complete Web Developer in 2023: Zero to Mastery'}
					</h5>


				</Link>
			</div>

		</div>
	)
}
