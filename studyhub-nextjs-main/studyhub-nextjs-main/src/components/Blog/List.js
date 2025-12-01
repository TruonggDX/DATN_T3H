import Image from "next/image";
import Link from "next/link";

export default function SingleBlogList(props) {
    const {blogClass, Slug, Img, Title, Description, Author, Tag, publishedDate, imgWidth, imgHeight} = props;

    return (
        <div className={blogClass || 'single-blog-list-wrapper'}>

            <Link href={`/blog?tag=${Tag || "business"}`} className="thumbnail">
                <Image
                    src={Img || "/images/blog/01.jpg"} width={imgWidth || "306"}
                    height={imgHeight || "260"}
                    alt={Title || "Blog"}
                />
            </Link>


            <div className="information-blog">
                <div className="tag">
                    <span>{Tag || "Marketing"}</span>
                </div>
                <Link href={`${Slug || "details"}`}>
                    <h5 className="title">{Title || "Azure AI Fundamentals: How to Pass the AI Exam"}</h5>
                </Link>
                <p
                    className="disc"
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >
                    {Description || "You'll find something to spark your curiosity and enhance"}
                </p>
                <div className="author-date">
                    <div className="author-area">
                        <i className="fa-regular fa-user"></i>
                        <span>{Author || "Jonathon Lopez"}</span>
                    </div>
                    <div className="calender">
                        <i className="far fa-calendar-alt"></i>
                        <span>{publishedDate || "14 June 2023"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
