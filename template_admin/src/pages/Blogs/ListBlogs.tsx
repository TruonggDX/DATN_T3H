import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Button from "../../components/ui/button/Button.tsx";
import { Building, Code, Pencil, RefreshCcw, Search, Tag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createBlog, deleteBlogs, getAllBlogs, getBlogsById, updateBlog } from "../../service/BlogsService.ts";
import { Blogs } from "../../core/Blogs.ts";
import Label from "../../components/form/Label.tsx";
import Input from "../../components/form/input/InputField.tsx";
import DropzoneComponent from "../../components/form/form-elements/DropZone.tsx";
import TextArea from "../../components/form/input/TextArea.tsx";
import { Categories } from "../../core/Categories.ts";
import { getAllCategories } from "../../service/CategoriesService.ts";
import { BoxIcon } from "../../icons";

export default function ListBlogs() {
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [category, setCategory] = useState<Categories[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [nameCate, setNameCate] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Loading khi lưu

    // State modal
    const [openModal, setOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // true = sửa, false = thêm

    const [data, setData] = useState({
        id: 0,
        code: '',
        title: '',
        sortDescription: '',
        description: '',
        categoryId: 0,
        imageUrl: ''
    });

    useEffect(() => {
        renderData();
        getAllCategories(0, 100).then((res) => {
            setCategory(res.content);
        });
    }, [page]);

    function renderData() {
        getAllBlogs(page, size, code, title, nameCate).then((res) => {
            setBlogs(res.content);
            setTotalPages(res.totalPages);
        });
    }

    // Mở modal thêm mới
    const handleAddNew = () => {
        setIsEditMode(false);
        setData({
            id: 0,
            code: '',
            title: '',
            sortDescription: '',
            description: '',
            categoryId: 0,
            imageUrl: ''
        });
        setSelectedFile(null);
        setOpenModal(true);
    };

    // Mở modal chỉnh sửa
    const handleEdit = (id: number) => {
        setIsEditMode(true);
        getBlogsById(id).then((res) => {
            setData(res.data);
            setSelectedFile(null); // không giữ file cũ
            setOpenModal(true);
        });
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa blogs này không?")) {
            deleteBlogs(id).then(() => {
                renderData();
                alert("Xóa thành công!");
            });
        }
    };

    const handleSearch = () => {
        setPage(0);
        renderData();
    };

    const handleReset = () => {
        setCode("");
        setTitle("");
        setNameCate("");
        renderData();
    };

    // Xử lý lưu (thêm hoặc sửa)
    const handleSave = async () => {
        if (!data.title || data.categoryId === 0) {
            alert("Vui lòng nhập đầy đủ Tiêu đề và chọn Danh mục!");
            return;
        }
        if (!isEditMode && !selectedFile) {
            alert("Vui lòng chọn ảnh cho blog mới!");
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("code", data.code);
        formData.append("title", data.title);
        formData.append("sortDescription", data.sortDescription || "");
        formData.append("description", data.description || "");
        formData.append("categoryId", data.categoryId.toString());
        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        try {
            if (isEditMode) {
                await updateBlog(data.id, formData);
                alert("Cập nhật thành công!");
            } else {
                await createBlog(formData);
                alert("Thêm blog thành công!");
            }
            setOpenModal(false);
            renderData();
        } catch (err) {
            console.error(err);
            alert("Lỗi khi lưu blog!");
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        setSelectedFile(null);
        setIsLoading(false);
    };

    return (
        <>
            <PageMeta title="Dashbroad Admin" />
            <PageBreadcrumb pageTitle="Danh sách blogs" />
            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
                    <div className="relative flex-1 min-w-[230px]">
                        <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input type="text" value={code} onChange={(e) => setCode(e.target.value)}
                               className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                               placeholder="Mã blog" />
                    </div>
                    <div className="relative flex-1 min-w-[230px]">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                               className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                               placeholder="Tiêu đề" />
                    </div>
                    <div className="relative flex-1 min-w-[250px]">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <select value={nameCate} onChange={(e) => setNameCate(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                            <option value="">-- Chọn danh mục --</option>
                            {category.map((cate) => (
                                <option key={cate.id} value={cate.name}>{cate.name}</option>
                            ))}
                        </select>
                    </div>

                    <button onClick={handleReset}
                            className="flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-lg font-semibold">
                        <RefreshCcw size={20} /> Làm mới
                    </button>
                    <button onClick={handleSearch}
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg font-semibold">
                        <Search size={20} /> Tìm kiếm
                    </button>
                </div>

                {/* Add Button */}
                <Button size="sm" variant="outline" startIcon={<BoxIcon/>} onClick={handleAddNew}>
                    Thêm mới
                </Button>
                {/* Bảng danh sách */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">STT</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Mã</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Tiêu đề</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Ảnh</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Danh mục</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Người đăng</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Action</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {blogs.map((blog, index) => (
                                    <TableRow key={blog.id}>
                                        <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                            {index + 1 + page * size}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{blog.code}</TableCell>
                                        <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{blog.title}</TableCell>
                                        <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                            <img width={60} height={60} src={blog.imageUrl} alt={blog.title} className="rounded" />
                                        </TableCell>
                                        <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{blog.categoryName}</TableCell>
                                        <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{blog.accountName}</TableCell>
                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" startIcon={<Pencil size={16} />} onClick={() => handleEdit(blog.id)} />
                                                <Button size="sm" variant="outline" startIcon={<Trash2 size={16} />} className="text-red-500 hover:text-red-600" onClick={() => handleDelete(blog.id)} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="flex justify-end mt-4 p-4">
                            <div className="flex gap-4 items-center">
                                <button disabled={page === 0} onClick={() => setPage(page - 1)}
                                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Previous</button>
                                <span className="text-gray-700 font-medium">Trang {page + 1} / {totalPages}</span>
                                <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}
                                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL CHUNG - THÊM & SỬA */}
            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm" style={{ marginTop: 80 }}>
                    <div className="relative bg-white rounded-xl shadow-xl w-full max-w-5xl p-8 animate-fade-in-up transition-all duration-300 max-h-[90vh] overflow-y-auto max-h-[75vh] pr-2 scrollbar-none">
                        <button onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            {isEditMode ? "Chỉnh sửa Blog" : "Thêm Blog mới"}
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {isEditMode && (
                                    <div>
                                        <Label htmlFor="blogCode">Mã</Label>
                                        <Input
                                            id="blogCode"
                                            type="text"
                                            value={data.code || ''}
                                            readOnly={true}
                                            placeholder="Mã được hệ thống tự sinh"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed transition"
                                        />
                                    </div>
                                )}
                                <div>
                                    <Label htmlFor="title">Tiêu đề</Label>
                                    <Input id="title" type="text" value={data.title}
                                           onChange={(e) => setData({ ...data, title: e.target.value })}
                                           placeholder="Nhập tiêu đề"
                                           className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Danh mục</label>
                                    <select value={data.categoryId}
                                            onChange={(e) => setData({ ...data, categoryId: Number(e.target.value) })}
                                            className="w-full px-4 py-2 bg-white dark:bg-dark-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100 transition">
                                        <option value={0} disabled>-- Chọn danh mục --</option>
                                        {category.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Label>Mô tả ngắn</Label>
                                    <TextArea rows={4} value={data.sortDescription}
                                              onChange={(v) => setData({ ...data, sortDescription: v })}
                                              placeholder="Nhập mô tả ngắn về blog"
                                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition" />
                                </div>
                                <div>
                                    <Label>Mô tả chi tiết</Label>
                                    <TextArea rows={6} value={data.description}
                                              onChange={(v) => setData({ ...data, description: v })}
                                              placeholder="Nhập mô tả chi tiết về blog"
                                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label>Ảnh</Label>
                                    <div className="max-h-[900px]">
                                        <DropzoneComponent
                                            defaultImageUrl={isEditMode ? data.imageUrl : undefined}
                                            onFileChange={(file: File) => setSelectedFile(file)}
                                        />
                                    </div>
                                    {!isEditMode && !selectedFile && (
                                        <p className="text-red-500 text-sm mt-2">Vui lòng chọn ảnh!</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 text-right">
                            <button type="button" onClick={handleSave} disabled={isLoading}
                                    className="relative px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-lg disabled:opacity-70">
                                {isLoading ? (
                                    <>
                                        <span className="opacity-0">Lưu</span>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    </>
                                ) : (
                                    isEditMode ? "Cập nhật" : "Thêm mới"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}