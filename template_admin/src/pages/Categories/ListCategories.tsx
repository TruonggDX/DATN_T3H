import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Button from "../../components/ui/button/Button.tsx";
import Label from "../../components/form/Label.tsx";
import Input from "../../components/form/input/InputField.tsx";
import { Building, Pencil, RefreshCcw, Search, Tag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Categories } from "../../core/Categories.ts";
import {
    deleteCategory,
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory
} from "../../service/CategoriesService.ts";
import { BoxIcon } from "../../icons";

export default function ListCategories() {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    // Modal states
    const [openModal, setOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<Categories>({
        id: 0,
        code: "",
        name: "",
        description: ""
    });

    useEffect(() => {
        renderData();
    }, [page]);

    const renderData = () => {
        getAllCategories(page, size, code, name)
            .then(res => {
                setCategories(res.content);
                setTotalPages(res.totalPages || 1);
            })
            .catch(() => console.error("Không tải được danh sách danh mục"));
    };

    const handleSearch = () => {
        setPage(0);
        renderData();
    };

    const handleReset = () => {
        setCode("");
        setName("");
        setPage(0);
        renderData();
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
            deleteCategory(id)
                .then(() => {
                    alert("Xóa danh mục thành công!");
                    renderData();
                })
                .catch(() => console.error("Xóa thất bại"));
        }
    };

    // Mở modal tạo mới
    const handleOpenCreate = () => {
        setIsEditMode(false);
        setFormData({ id: 0, code: "", name: "", description: "" });
        setOpenModal(true);
    };

    // Mở modal sửa
    const handleEdit = (id: number) => {
        getCategory(id)
            .then((res) => {
                setFormData(res.data);
                setIsEditMode(true);
                setOpenModal(true);
            })
            .catch(() => console.error("Không tải được thông tin danh mục"));
    };

    // Xử lý lưu (Thêm hoặc Sửa)
    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            console.error("Vui lòng nhập tên danh mục!");
            return;
        }

        setLoading(true);
        try {
            if (isEditMode) {
                await updateCategory(formData.id, formData);
                alert("Cập nhật danh mục thành công!");
            } else {
                await createCategory(formData);
                alert("Tạo danh mục thành công!");
            }
            setOpenModal(false);
            renderData();
        } catch (error: any) {
            console.error(error?.response?.data?.message || "Thao tác thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageMeta title="Danh mục sản phẩm" description="Quản lý danh mục sản phẩm" />
            <PageBreadcrumb pageTitle="Danh sách danh mục" />

            <div className="space-y-6">

                {/* Tìm kiếm */}
                <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-xl shadow-md">
                    <div className="relative flex-1 min-w-[230px]">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Mã danh mục"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="relative flex-1 min-w-[250px]">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Tên danh mục"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-lg font-semibold"
                    >
                        <RefreshCcw size={20} /> Làm mới
                    </button>

                    <button
                        onClick={handleSearch}
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg font-semibold"
                    >
                        <Search size={20} /> Tìm kiếm
                    </button>
                </div>

                {/* Add Button */}
                <Button size="sm" variant="outline"  startIcon={<BoxIcon/>} onClick={handleOpenCreate}>
                    Thêm mới
                </Button>

                {/* Bảng danh sách */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-4 text-start">STT</TableCell>
                                    <TableCell isHeader className="px-5 py-4 text-start">Mã danh mục</TableCell>
                                    <TableCell isHeader className="px-5 py-4 text-start">Tên danh mục</TableCell>
                                    <TableCell isHeader className="px-5 py-4 text-start">Mô tả</TableCell>
                                    <TableCell isHeader className="px-5 py-4 text-start">Hành động</TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {categories.map((cat, index) => (
                                    <TableRow key={cat.id}>
                                        <TableCell className="px-5 py-3 text-gray-600">
                                            {index + 1 + page * size}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{cat.code}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{cat.name}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {cat.description || "--"}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    startIcon={<Pencil size={16} />}
                                                    onClick={() => handleEdit(cat.id)}
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    startIcon={<Trash2 size={16} />}
                                                    className="text-red-500 hover:text-red-600"
                                                    onClick={() => handleDelete(cat.id)}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Phân trang */}
                        <div className="flex justify-end p-4">
                            <div className="flex items-center gap-3">
                                <button
                                    disabled={page === 0}
                                    onClick={() => setPage(p => p - 1)}
                                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition"
                                >
                                    Previous
                                </button>
                                <span className="font-medium text-gray-700">
                                    Trang {page + 1} / {totalPages}
                                </span>
                                <button
                                    disabled={page + 1 >= totalPages}
                                    onClick={() => setPage(p => p + 1)}
                                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
                        <div className="border-b border-gray-200 bg-gradient-to-r px-8 py-6">
                            <h2 className="text-xl font-bold text-black">
                                {isEditMode ? "Cập nhật danh mục" : "Thêm mới danh mục"}
                            </h2>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                            <div className="space-y-7">

                                {isEditMode && (
                                    <div>
                                        <Label>Mã danh mục</Label>
                                        <Input value={formData.code} readOnly className="bg-gray-100 dark:bg-gray-800" />
                                    </div>
                                )}

                                <div>
                                    <Label>Tên danh mục <span className="text-red-500">*</span></Label>
                                    <Input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="Nhập tên danh mục"
                                    />
                                </div>

                                <div>
                                    <Label>Mô tả</Label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}                                        rows={6}
                                        className="w-full px-5 py-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Nhập mô tả chi tiết về danh mục..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className="border-t border-gray-200 bg-gray-50 px-8 py-6 dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex justify-end gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setOpenModal(false)}
                                    disabled={loading}
                                >
                                    Hủy bỏ
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="min-w-40 bg-blue-600 hover:bg-blue-700"
                                >
                                    {loading ? "Đang lưu..." : (isEditMode ? "Cập nhật" : "Lưu")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}