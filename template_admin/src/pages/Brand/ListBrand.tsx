import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../components/ui/table";
import Button from "../../components/ui/button/Button.tsx";
import {Building, Pencil, RefreshCcw, Search, Tag, Trash2} from "lucide-react";
import {ChangeEvent, useEffect, useState} from "react";
import {createBrand, deleteBrand, getAllBrand, updateBrand} from "../../service/BrandService.ts";
import {Brand} from "../../core/Brand.ts";
import {BoxIcon} from "../../icons";
import FileInput from "../../components/form/input/FileInput.tsx";

export default function ListBrand() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const [openModal, setOpenModal] = useState(false);
    const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
    const [brandName, setBrandName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        renderData();
    }, [page]);

    const renderData = () => {
        getAllBrand(page, size, code, name).then(res => {
            setBrands(res.content);
            setTotalPages(res.totalPages);
        });
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
        if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này không?")) {
            deleteBrand(id).then(() => {
                renderData();
                alert("Xóa thành công!");
            });
        }
    };

    const handleOpenModal = (brand?: Brand) => {
        if (brand) {
            setCurrentBrand(brand);
            setBrandName(brand.name);
            setDescription(brand.description || "");
            setFile(null);
        } else {
            setCurrentBrand(null);
            setBrandName("");
            setDescription("");
            setFile(null);
        }
        setOpenModal(true);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!brandName) return alert("Tên thương hiệu không được để trống");

        try {
            if (currentBrand && currentBrand.id) {
                await updateBrand(currentBrand.id, brandName, description, file || undefined);
                alert("Cập nhật thành công!");
            } else {
                await createBrand(brandName, description, file || undefined);
                alert("Thêm mới thành công!");
            }
            setOpenModal(false);
            renderData();
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra!");
        }
    };

    return (
        <>
            <PageMeta
                title="Dashboard Admin"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Danh sách thương hiệu"/>

            <div className="space-y-6">
                {/* Search Panel */}
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
                    <div className="relative flex-1 min-w-[230px]">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20}/>
                        <input
                            type="text"
                            name="code"
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Mã thương hiệu"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    <div className="relative flex-1 min-w-[250px]">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20}/>
                        <input
                            type="text"
                            name="name"
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Tên thương hiệu"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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

                {/* Add Button */}
                <Button size="sm" variant="outline" startIcon={<BoxIcon/>} onClick={() => handleOpenModal()}>
                    Thêm mới
                </Button>

                {/* Table */}
                <div
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">STT</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Mã thương
                                        hiệu</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Tên thương
                                        hiệu</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Logo</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Mô tả</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Action</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {brands.map((brand, index) => (
                                    <TableRow key={brand.id}>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{index + 1}</TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{brand.code}</TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{brand.name}</TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <img width={60} height={60} src={brand.imageUrl} alt={brand.name}/>
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400
             w-74 max-w-74 break-words overflow-hidden"
                                            style={{wordWrap: 'break-word'}}
                                        >
                                            {brand.description}
                                        </TableCell>

                                        <TableCell
                                            className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    startIcon={<Pencil size={16}/>}
                                                    onClick={() => handleOpenModal(brand)}
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    startIcon={<Trash2 size={16}/>}
                                                    className="text-red-500 hover:text-red-600"
                                                    onClick={() => handleDelete(brand.id)}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
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

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4 overflow-auto">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            {currentBrand ? "Cập nhật thương hiệu" : "Thêm mới thương hiệu"}
                        </h2>

                        {currentBrand && (
                            <>
                                <label className="text-gray-700 font-medium">Mã thương hiệu:</label>
                                <input
                                    type="text"
                                    value={currentBrand.code}
                                    readOnly
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-4 mb-3"
                                />
                            </>
                        )}

                        <label className="text-gray-700 font-medium">Tên thương hiệu:</label>
                        <input
                            type="text"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-3 pl-4 mb-3"
                        />

                        <label className="text-gray-700 font-medium">Mô tả:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            className="w-full rounded-lg border border-gray-300 py-3 pl-4 mb-3"
                        />

                        <label className="text-gray-700 font-medium">Logo:</label>

                        <div className="flex justify-center mb-3">
                            {currentBrand?.imageUrl && !file && (
                                <img
                                    src={currentBrand.imageUrl}
                                    alt="Logo hiện tại"
                                    className="w-32 h-32 object-cover rounded border"
                                />
                            )}
                            {file && (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Ảnh mới"
                                    className="w-32 h-32 object-cover rounded border"
                                />
                            )}
                        </div>

                        <FileInput
                            onChange={handleFileChange}
                            className="w-full"
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <Button variant="outline" onClick={() => setOpenModal(false)}>Cancel</Button>
                            <Button onClick={handleSubmit}>Save</Button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
