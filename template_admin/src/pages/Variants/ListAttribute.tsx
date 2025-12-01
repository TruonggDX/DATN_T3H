import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Button from "../../components/ui/button/Button.tsx";
import { Pencil, RefreshCcw, Search, Tag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Attribute } from "../../core/Attribute.ts";
import { createAttribute, deleteAttribute, getAllAttribute, getAttribute, updateAttribute } from "../../service/AttributeService.ts";
import { BoxIcon } from "../../icons";

export const ListAttribute = () => {
    const [attribute, setAttribute] = useState<Attribute[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [name, setName] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentAttribute, setCurrentAttribute] = useState<Attribute | null>(null);
    const [newName, setNewName] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        renderData();
    }, [page]);

    const renderData = () => {
        getAllAttribute(page, size, name).then(res => {
            setAttribute(res.content);
            setTotalPages(res.totalPages);
        });
    };

    const handleEdit = (id: number) => {
        getAttribute(id).then((res) => {
            setCurrentAttribute(res.data);
            setNewName(res.data.name);
            setOpenModal(true);
        });
    }

    const handleDelete = (id: number) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa thuộc tính này không?");
        if (isConfirmed) {
            deleteAttribute(id).then(() => {
                renderData();
                alert("Xóa thành công!");
            });
        }
    }

    const handleSearch = () => {
        setPage(0);
        renderData();
    };

    const handleReset = () => {
        setName("");
        setPage(0);
        renderData();
    };

    const handleOpenModal = () => {
        setCurrentAttribute(null);
        setNewName("");
        setOpenModal(true);
    }

    const handleSubmit = async () => {
        if (!newName.trim()) return alert("Tên thuộc tính không được để trống");

        try {
            if (currentAttribute && currentAttribute.id) {
                await updateAttribute(currentAttribute.id, { id: currentAttribute.id, name: newName });
                alert("Cập nhật thành công!");
            } else {
                await createAttribute({ id: 0, name: newName });
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
            <PageBreadcrumb pageTitle="Danh sách thuộc tính"/>
            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
                    <div className="relative flex-1 min-w-[230px]">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20}/>
                        <input
                            type="text"
                            name="code"
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Nhập tên thuộc tính cần tìm"
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

                <Button size="sm" variant="outline" startIcon={<BoxIcon/>} onClick={handleOpenModal}>
                    Thêm mới
                </Button>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">STT</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Tên thuộc tính</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Action</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {attribute.map((attr, index) => (
                                    <TableRow key={attr.id}>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{index + 1}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{attr.name}</TableCell>
                                        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" startIcon={<Pencil size={16}/>} onClick={() => handleEdit(attr.id)} />
                                                <Button size="sm" variant="outline" startIcon={<Trash2 size={16}/>} className="text-red-500 hover:text-red-600" onClick={() => handleDelete(attr.id)} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="flex justify-end mt-4">
                            <div className="flex gap-4 items-center">
                                <button disabled={page === 0} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" onClick={() => setPage(page - 1)}>Previous</button>
                                <span className="text-gray-700 font-medium">Trang {page + 1} / {totalPages}</span>
                                <button disabled={page + 1 >= totalPages} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" onClick={() => setPage(page + 1)}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-[400px]">
                        <h2 className="text-xl font-semibold mb-4">{currentAttribute ? "Cập nhật thuộc tính" : "Thêm mới thuộc tính"}</h2>

                        <label className="text-gray-700 font-medium">Tên thuộc tính:</label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
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
