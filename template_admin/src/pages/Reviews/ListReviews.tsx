import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../components/ui/table";
import Button from "../../components/ui/button/Button.tsx";
import {Building, RefreshCcw, Search, Tag, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import {Review} from "../../core/Review.ts";
import {deleteReview, getAllReview} from "../../service/ReviewService.ts";

export default function ListReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [code, setCode] = useState("");
    const [nameProduct, setNameProduct] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        renderData();
    }, [page]);


    function renderData() {
        getAllReview(page, size, code, nameProduct).then((res) => {
            setReviews(res.content);
            setTotalPages(res.totalPages);
        });
    }

    const handleRemove = (id: number) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa đánh giá này không?");
        if (isConfirmed) {
            deleteReview(id).then(() => {
                renderData()
                alert("Xóa thành công!");
            })
        }
    }
    const handleSearch = () => {
        setPage(0);
        renderData();
    };

    const handleReset = () => {
        setCode("");
        setNameProduct("");
        renderData();
    };

    return (
        <>
            <PageMeta
                title="Dashbroad Admin"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Danh sách đánh giá"/>

            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
                    <div className="relative flex-1 min-w-[230px]">
                        <Tag
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            size={20}
                        />
                        <input
                            type="text"
                            name="code"
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Mã đánh giá"
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
                        />
                    </div>

                    <div className="relative flex-1 min-w-[250px]">
                        <Building
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            size={20}
                        />
                        <input
                            type="text"
                            name="nameProduct"
                            value={nameProduct}
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Tên sản phẩm"
                            onChange={(e) => setNameProduct(e.target.value)}

                        />
                    </div>

                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-lg font-semibold"
                    >
                        <RefreshCcw size={20}/>
                        Làm mới
                    </button>

                    <button
                        onClick={handleSearch}
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg font-semibold"
                    >
                        <Search size={20}/>
                        Tìm kiếm
                    </button>
                </div>

                <div
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        STT
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Mã
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Sản phẩm
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Số sao
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Nội dung
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Người đánh giá
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {reviews.map((review, index) => (
                                    <TableRow key={review.id}>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">                                            {review.code}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 max-w-[300px]">
                                            {review.productName}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {review.rating}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {review.comment}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {review.accountName}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    onClick={() => handleRemove(review.id)}
                                                    size="sm"
                                                    variant="outline"
                                                    startIcon={<Trash2 size={16}/>}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex justify-end mt-4">
                            <div className="flex gap-4 items-center">
                                <button
                                    disabled={page === 0}
                                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                                    onClick={() => setPage(page - 1)}
                                >
                                    Previous
                                </button>

                                <span className="text-gray-700 font-medium">
                                    Trang {page + 1} / {totalPages}
                                </span>

                                <button
                                    disabled={page + 1 >= totalPages}
                                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
