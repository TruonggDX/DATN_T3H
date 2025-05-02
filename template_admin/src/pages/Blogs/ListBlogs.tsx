import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../components/ui/table";
import Button from "../../components/ui/button/Button.tsx";
import {Building, Eye, Pencil, RefreshCcw, Search, Tag, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import {getAllBlogs} from "../../service/BlogsService.ts";
import {Blogs} from "../../core/Blogs.ts";

export default function ListBlogs() {
    const [blogs, setBlogs] = useState<Blogs[]>([])
    useEffect(() => {
        getAllBlogs(0, 10).then((res) => {
            setBlogs(res.content)
        })
    }, []);
    const handleShow = (id: number) => {
        console.log("id show : " + id)
    }
    const handleUpdate = (id: number) => {
        console.log("id update : " + id)
    }
    const handleDelete = (id: number) => {
        console.log("id delete : " + id)
    }

    return (
        <>
            <PageMeta
                title="Dashbroad Admin"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Danh sách blogs"/>
            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
                    <div className="relative flex-1 min-w-[230px]">
                        <Tag
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            size={20}
                        />
                        <input
                            type="text"
                            name="name"
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Tiêu đề"
                        />
                    </div>

                    <div className="relative flex-1 min-w-[250px]">
                        <Building
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            size={20}
                        />
                        <input
                            type="text"
                            name="aim"
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Danh mục"
                        />
                    </div>

                    <button
                        className="flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-lg font-semibold"
                    >
                        <RefreshCcw size={20}/>
                        Làm mới
                    </button>

                    <button
                        // onClick={handleSearch}
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
                                        Tiêu đề
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Mô tả ngắn
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Ảnh
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Danh mục
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Người đăng
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
                                {blogs.map((blog, index) => (
                                    <TableRow key={blog.id}>
                                        <TableCell
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                            {blog.code}
                                        </TableCell>
                                        <TableCell
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                            {blog.title}
                                        </TableCell>
                                        <TableCell
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                            {blog.sortDescription}
                                        </TableCell>
                                        <TableCell
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                            <img
                                                width={60}
                                                height={60}
                                                src={blog.imageUrl}
                                                alt={blog.imageUrl}
                                            />
                                        </TableCell>
                                        <TableCell
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                            {blog.categoryName}
                                        </TableCell>
                                        <TableCell
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                            {blog.accountName}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" startIcon={<Eye size={16}/>}
                                                        onClick={() => handleShow(blog.id)}>

                                                </Button>
                                                <Button size="sm" variant="outline" startIcon={<Pencil size={16}/>}
                                                        onClick={() => handleUpdate(blog.id)}>

                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    startIcon={<Trash2 size={16}/>}
                                                    className="text-red-500 hover:text-red-600"
                                                    onClick={() => handleDelete(blog.id)}
                                                >
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}
