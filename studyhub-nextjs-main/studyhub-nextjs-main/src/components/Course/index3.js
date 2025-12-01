import Image from "next/image";
import Link from "next/link";

export default function SingleCourse3( props ) {
    const { courseClass, Slug, Img, Title, Category, ratingCount, lessonCount, studentCount, Author, prevPrice, Price, imgWidth, imgHeight, type  } = props;

    return (
        <div className={courseClass || 'single-course-style-three'}>
            <div style={{position: "relative", display: "inline-block", overflow: "hidden", borderRadius: "8px"}}>
                <Link href={`/course/${Slug || 'details'}`}>
                    <Image
                        src={Img || '/images/course/01.jpg'}
                        width={imgWidth || 290}
                        height={imgHeight || 280}
                        alt={Title || "course"}
                        style={{
                            objectFit: "cover",
                            width: `${imgWidth || 290}px`,
                            height: `${imgHeight || 280}px`,
                            transition: "transform 0.3s",
                        }}
                    />
                </Link>
                {Category && (
                    <span
                        style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            backgroundColor: "#284bbc",
                            color: "#fff",
                            fontSize: "12px",
                            fontWeight: "600",
                            padding: "2px 6px",
                            borderRadius: "6px",
                            zIndex: 10,
                        }}
                    >
                        {Category}
                    </span>
                )}
            </div>
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
