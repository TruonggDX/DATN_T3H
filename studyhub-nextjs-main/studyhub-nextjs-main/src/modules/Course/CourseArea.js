import CourseSidebar from "@/components/Course/CourseSidebar";
import SingleCourseList from "@/components/Course/List";
import SingleCourseTwo from "@/components/Course/Two";
import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {useSelector} from "react-redux";
import productService from "@/service/productService";

export default function CourseArea() {
    const paginatePerPage = 9;

    const [products, setProducts] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const filterData = useSelector((state) => state.filter.data || {});

    const fetchProducts = async (page = 0) => {
        setLoading(true);
        try {
            const res = await productService.getAllProducts(
                "",
                filterData.search || "",
                filterData.category?.[0] ?? null,
                filterData.brand?.[0] ?? null,
                page,
                paginatePerPage,
                "id,desc"
            );

            setProducts(res.content || []);
            setTotalElements(res.totalElements || 0);
            setTotalPages(res.totalPages || 0);
            setCurrentPage(res.pageNumber || res.number || 0);
        } catch (err) {
            console.error(err);
            setProducts([]);
            setTotalElements(0);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(0);
    }, [filterData]);

    const handlePageChange = ({selected}) => {
        fetchProducts(selected);
    };


    return (
        <div className="rts-course-default-area rts-section-gap">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-3">
                        <CourseSidebar/>
                    </div>

                    <div className="col-lg-9">
                        <div className="row g-5">
                            {products.map((product, index) => (
                                <div
                                    key={product.id || index}
                                    className="col-lg-4 col-md-6 col-sm-12 col-12"
                                >
                                    <SingleCourseTwo
                                        Slug={product.id}
										Img={product.imageDtos?.[0]?.url || "/placeholder.jpg"}
                                        Category={product.categoryName || "Uncategorized"}
                                        Title={product.name}
                                        Price={product.price}
                                        lessonCount={product.code}
                                        studentCount={product.brandName}
                                        prevPrice={product.oldPrice || product.price}
                                        bestSeller={product.bestSeller || false}
                                    />
                                </div>
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <div className="row mt--30">
                                <div className="col-lg-12">
                                    <div className="rts-pagination-area-2">
                                        <ReactPaginate
                                            previousLabel={<i className="fa-solid fa-chevron-left"></i>}
                                            nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                                            breakLabel="..."
                                            pageCount={totalPages}
                                            pageRangeDisplayed={3}
                                            onPageChange={handlePageChange}
                                            forcePage={currentPage}
                                            renderOnZeroPageCount={null}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}