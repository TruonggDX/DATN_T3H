import BreadCrumbs from "@/components/BreadCrumbs";
import ScrollTop from "@/components/ScrollTop";
import BlogDetailsArea from "./BlogDetailsArea";

export default function BlogDetailsModules(data) {
    return (
        <main>
            <BreadCrumbs
                Title="Chi tiết blog"
                subTitle={"Chi tiết blog"}
            />
            <BlogDetailsArea item={data.item}/>
            <ScrollTop/>
        </main>
    )
}
