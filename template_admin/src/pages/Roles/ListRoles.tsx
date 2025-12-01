import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../components/ui/table";
import Button from "../../components/ui/button/Button.tsx";
import {Pencil, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import {Role} from "../../core/Role.ts";
import {createRole, deleteRole, getAllRole, updateRole} from "../../service/RoleService.ts";
import {BoxIcon} from "../../icons";

export default function ListRoles() {
    const [roles, setRoles] = useState<Role[]>([])
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [editRole, setEditRole] = useState<Role | null>(null);
    const [editName, setEditName] = useState("");
    const [code, setCode] = useState("");


    useEffect(() => {
        renderData();
    }, [page]);

    function renderData() {
        getAllRole(page, size).then((res) => {
            setRoles(res.content);
            setTotalPages(res.totalPages);
        });
    }
    const handleOpenAdd = () => {
        setIsEdit(false);
        setEditName("");
        setCode("");
        setEditRole(null);
        setOpenModal(true);
    };

    const handleOpenEdit = (role: Role) => {
        setIsEdit(true);
        setEditRole(role);
        setEditName(role.name);
        setCode(role.code || "");
        setOpenModal(true);
    };

    // Thêm mới
    const handleAdd = () => {
        if (!editName.trim()) return alert("Tên role không được để trống");

        const newRole: Role = {
            id: 0,
            name: editName
        };

        createRole(newRole)
            .then(() => {
                alert("Thêm mới thành công");
                setOpenModal(false);
                renderData();
            })
            .catch(() => alert("Thêm mới thất bại"));
    };

    // Update
    const handleUpdate = () => {
        if (!editRole) return;
        if (!editName.trim()) return alert("Tên role không được để trống");

        const updated: Role = {
            ...editRole,
            name: editName
        };

        updateRole(editRole.id, updated)
            .then(() => {
                alert("Cập nhật thành công");
                setOpenModal(false);
                renderData();
            })
            .catch(() => alert("Cập nhật thất bại"));
    };

    const handleDelete = (id: number) => {
        if (!confirm("Bạn có chắc muốn xóa không?")) return;
        deleteRole(id).then(() => renderData());
    };

    return (
        <>
            <PageMeta
                title="Dashbroad Admin"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Danh sách quyền"/>
            <div className="space-y-6">
                <Button
                    onClick={handleOpenAdd}
                    size="sm"
                    variant="outline"
                    startIcon={<BoxIcon className="size-5" />}
                >
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
                                        Mã quyền
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Tên quyền
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
                                {roles.map((role, index) => (
                                    <TableRow key={role.id}>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {role.code}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {role.name}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" startIcon={<Pencil size={16}/>}
                                                        onClick={() => handleOpenEdit(role)}>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    startIcon={<Trash2 size={16}/>}
                                                    className="text-red-500 hover:text-red-600"
                                                    onClick={() => handleDelete(role.id)}
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
            {openModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">
                            {isEdit ? "Cập nhật Role" : "Thêm mới Role"}
                        </h3>

                        <div className="mb-4">
                            <label className="font-medium">Tên Role</label>
                            <input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full border p-2 rounded mt-1"
                                placeholder="Nhập tên role"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button className="bg-gray-400" onClick={() => setOpenModal(false)}>
                                Hủy
                            </Button>
                            {isEdit ? (
                                <Button className="bg-blue-600" onClick={handleUpdate}>
                                    Cập nhật
                                </Button>
                            ) : (
                                <Button className="bg-green-600" onClick={handleAdd}>
                                    Thêm mới
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
