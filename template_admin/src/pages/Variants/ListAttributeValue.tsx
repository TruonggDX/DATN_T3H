import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../components/ui/table";
import Button from "../../components/ui/button/Button.tsx";
import {Pencil, RefreshCcw, Search, Tag, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import {AttributeValue} from "../../core/AttributeValue.ts";
import {
    createAttributeValue,
    deleteAttributeValue,
    getAllAttributeValue,
    updateAttributeValue
} from "../../service/AttributeValueService.ts";
import {BoxIcon} from "../../icons";
import {Attribute} from "../../core/Attribute.ts";
import {getAllAttribute} from "../../service/AttributeService.ts";

export const ListAttributeValue = () => {
    const [attributeValue, setAttributeValue] = useState<AttributeValue[]>([])
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [value, setValue] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentAttributeValue, setCurrentAttributeValue] = useState<AttributeValue | null>(null);
    const [newValue, setNewValue] = useState("");
    const [colorCode, setColorCode] = useState("");
    const [attributeId, setAttributeId] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [attribute, setAttribute] = useState<Attribute[]>([])


    useEffect(() => {
        renderData();
    }, [page]);

    const renderData = () => {
        getAllAttributeValue(page, size, value).then(res => {
            setAttributeValue(res.content);
            setTotalPages(res.totalPages);
        });
    };

    const handleDelete = (id: number) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa giá trị thuộc tính này không?");
        if (isConfirmed) {
            deleteAttributeValue(id).then(() => {
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
        setValue("");
        setPage(0);
        renderData();
    };
    const handleOpenModal = (attributeValue1?: AttributeValue) => {
        getAllAttribute(0, 100).then((res) => {
            setAttribute(res.content)
        })
        if (attributeValue1) {
            setCurrentAttributeValue(attributeValue1);
            setColorCode(attributeValue1.colorCode);
            setAttributeId(attributeValue1.attributeId);
            setNewValue(attributeValue1.value || "");
        } else {
            setCurrentAttributeValue(null);
            setColorCode("");
            setNewValue("");
            setAttributeId(0);
        }
        setOpenModal(true);
    };

    const handleSubmit = async () => {
        if (!newValue) return alert("Giá trị không được để trống");

        try {
            const obj: AttributeValue = {
                id: currentAttributeValue?.id || 0,
                value: newValue,
                colorCode: colorCode,
                attributeId: attributeId
            };

            if (currentAttributeValue && currentAttributeValue.id) {
                // Update
                await updateAttributeValue(currentAttributeValue.id, obj);
                alert("Cập nhật thành công!");
            } else {
                // Add
                await createAttributeValue(obj);
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
                title="Dashbroad Admin"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Danh sách giá trị thuộc tính"/>
            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
                    <div className="relative flex-1 min-w-[230px]">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20}/>
                        <input
                            type="text"
                            name="code"
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Nhập giá trị thuộc tính cần tìm"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
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
                <Button size="sm" variant="outline" startIcon={<BoxIcon/>} onClick={() => handleOpenModal()} >
                    Thêm mới
                </Button>

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
                                        Giá trị thuộc tính
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
                                {attributeValue.map((attr, index) => (
                                    <TableRow key={attr.id}>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {attr.value}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" startIcon={<Pencil size={16}/>}
                                                        onClick={() => handleOpenModal(attr)}>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    startIcon={<Trash2 size={16}/>}
                                                    className="text-red-500 hover:text-red-600"
                                                    onClick={() => handleDelete(attr.id)}
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
            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-[400px]">
                        <h2 className="text-xl font-semibold mb-4">{currentAttributeValue ? "Cập nhật giá trị" : "Thêm mới giá trị"}</h2>

                        <label className="text-gray-700 font-medium">Giá trị:</label>
                        <input
                            type="text"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-3 pl-4 mb-3"
                        />
                        <label className="text-gray-700 font-medium">Thuộc tính:</label>
                        <select
                            value={attributeId}
                            onChange={(e) => setAttributeId(Number(e.target.value))}
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value={0}>-- Chọn thuộc tính --</option>
                            {attribute.map((attr) => (
                                <option key={attr.id} value={attr.id}>
                                    {attr.name}
                                </option>
                            ))}
                        </select>

                        <label className="text-gray-700 font-medium">Mã màu</label>
                        <input
                            type="text"
                            value={colorCode}
                            onChange={(e) => setColorCode(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-3 pl-4 mb-3"
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <Button variant="outline" onClick={() => setOpenModal(false)}>Cancel</Button>
                            <Button onClick={handleSubmit}>Save</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}