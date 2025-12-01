import Image from "next/image";
import Link from "next/link";
import blogsService from "@/service/blogsService";
import { useEffect, useState } from "react";

export default function BlogSidebar() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        blogsService.getBlogsNew()
            .then(res => {
                const data = res.data || [];
                const latestBlogs = data
                    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                    .slice(0, 3);
                setBlogs(latestBlogs);
            })
            .catch(e => console.error(e));
    }, []);

    return (
        <div className="blog-sidebar theiaStickySidebar">
            <div className="rts-single-wized Recent-post">
                <div className="wized-header">
                    <h5 className="title">Bài viết gần đây</h5>
                </div>
                <div className="wized-body">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="recent-post-single">
                            <div className="thumbnail">
                                <Link href={`/blog/${blog.id || "details"}`}>
                                    <Image
                                        src={blog.imageUrl || "/images/course/01.jpg"}
                                        width={290}
                                        height={210}
                                        alt={blog.title}
                                        style={{
                                            width: "100px",
                                            height: "70px",
                                            objectFit: "cover",
                                            borderRadius: "4px"
                                        }}
                                    />
                                </Link>
                            </div>
                            <div className="content-area text-start">
                                <div className="user">
                                    <i className="fal fa-clock"></i>
                                    <span>{blog.createdDate ? new Date(blog.createdDate).toLocaleDateString('vi-VN') : "Vừa xong"}</span>
                                </div>
                                <Link href={`/blog/${blog.id || "details"}`} className="post-title">
                                    <h6 className="title">{blog.title}</h6>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
