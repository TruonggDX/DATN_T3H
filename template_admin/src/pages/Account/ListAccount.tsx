import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Button from "../../components/ui/button/Button.tsx";
import { Building, List, Pencil, RefreshCcw, Search, Tag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Account } from "../../core/Account.ts";
import { deleteAccount, getAccountById, getAllAccount, updateAccount } from "../../service/AccountService.ts";
import { getAllRole } from "../../service/RoleService.ts";
import { Role } from "../../core/Role.ts";
import { Modal } from "../../components/ui/modal";
import FileInput from "../../components/form/input/FileInput.tsx";
import Label from "../../components/form/Label.tsx";
import Input from "../../components/form/input/InputField.tsx";
import DatePicker from "../../components/form/date-picker.tsx";
import { useModal } from "../../hooks/useModal.ts";

export default function ListAccount() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [roleCode, setRoleCode] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [roles, setRoles] = useState<Role[]>([]);

    // Modal state
    const { isOpen, openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState<Account | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);

    useEffect(() => {
        renderData();
    }, [page]);

    const renderData = () => {
        getAllAccount(page, size, code, email, roleCode).then(res => {
            setAccounts(res.content);
            setTotalPages(res.totalPages);
        });

        getAllRole(0, 100).then((res) => {
            setRoles(res.content);
        });
    };

    const handleSearch = () => { setPage(0); renderData(); };
    const handleReset = () => { setCode(""); setEmail(""); setRoleCode(""); setPage(0); renderData(); };

    const handleUpdate = (id: number) => {
        getAccountById(id).then((response) => {
            const data = response.data;
            setAccount(data);
            setPreviewImage(data.imageUrl || null);
            setSelectedRoleIds(data.roles?.map((r: Role) => r.id) || []);
            openModal();
        }).catch(() => {
            console.error("Không tải được thông tin tài khoản");
        });
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
            deleteAccount(id).then(() => {
                alert("Xóa thành công!");
                renderData();
            }).catch(() => console.error("Xóa thất bại"));
        }
    };

    // Xử lý chọn ảnh mới
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            console.error("Ảnh không được quá 5MB");
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // Thay đổi input
    const handleInputChange = (field: keyof Account, value: string) => {
        setAccount(prev => prev ? { ...prev, [field]: value } : null);
    };

    // Lưu thay đổi - ĐÃ SỬA ĐÚNG API MỚI
    const handleSave = async () => {
        if (!account?.id) return;

        setLoading(true);
        try {
            const updatedData = {
                fullname: account.fullname,
                phone: account.phone,
                address: account.address,
                birthday: account.birthday,
                roleIds: selectedRoleIds, // Gửi mảng roleIds
            };

            // GỌI ĐÚNG API: PUT /update/{id}
            await updateAccount(account.id, updatedData, selectedFile || undefined);

            alert("Cập nhật thành công!");
            closeModal();
            renderData();
        } catch (error: any) {
            console.error(error?.response?.data?.message || "Cập nhật thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageMeta title="Dashbroad Admin" description="Danh sách tài khoản quản trị" />
            <PageBreadcrumb pageTitle="Danh sách tài khoản" />

            {/* PHẦN TÌM KIẾM - GIỮ NGUYÊN 100% */}
            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
                    <div className="relative flex-1 min-w-[230px]">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Mã tài khoản"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="relative flex-1 min-w-[250px]">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="relative flex-1 min-w-[250px]">
                        <List className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <select
                            value={roleCode}
                            onChange={(e) => setRoleCode(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">Tất cả quyền</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.code}>{role.name}</option>
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

                {/* BẢNG DANH SÁCH */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">STT</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Mã tài khoản</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Tên tài khoản</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Ảnh</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Số điện thoại</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Quyền</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Action</TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {accounts.map((acc, index) => (
                                    <TableRow key={acc.id}>
                                        <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                            {index + 1 + page * size}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{acc.code}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{acc.fullname}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <img src={acc.imageUrl || "/images/user/owner.jpg"} alt="avatar"
                                                 className="w-12 h-12 rounded-full object-cover" />
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{acc.phone || "--"}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {acc.roles?.map(r => r.name).join(", ") || "--"}
                                        </TableCell>
                                        <TableCell className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" startIcon={<Pencil size={16} />}
                                                        onClick={() => handleUpdate(acc.id)} />
                                                <Button size="sm" variant="outline" startIcon={<Trash2 size={16} />}
                                                        className="text-red-500 hover:text-red-600"
                                                        onClick={() => handleDelete(acc.id)} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="flex justify-end mt-4 p-4">
                            <div className="flex gap-4 items-center">
                                <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
                                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Previous</button>
                                <span className="text-gray-700 font-medium">Trang {page + 1} / {totalPages}</span>
                                <button disabled={page + 1 >= totalPages} onClick={() => setPage(p => p + 1)}
                                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Chỉnh sửa thông tin cá nhân
                        </h4>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="flex flex-col">
                        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                            <div className="mt-7">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                                    {/* Ảnh + preview */}
                                    <div className="col-span-2 flex flex-col items-center gap-4">
                                        <div className="w-32 h-32 overflow-hidden border-4 border-dashed border-gray-300 rounded-full dark:border-gray-700 shadow-xl relative group">
                                            <img
                                                src={previewImage || account?.imageUrl || "/images/user/owner.jpg"}
                                                alt="Avatar"
                                                className="object-cover w-full h-full"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <FileInput onChange={handleFileChange} className="max-w-xs" />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Họ và tên</Label>
                                        <Input type="text" value={account?.fullname || ""} onChange={(e) => handleInputChange("fullname", e.target.value)} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Email</Label>
                                        <Input type="text" value={account?.email || ""} readOnly className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed" />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Số điện thoại</Label>
                                        <Input type="text" value={account?.phone || ""} onChange={(e) => handleInputChange("phone", e.target.value)} />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Địa chỉ</Label>
                                        <Input type="text" value={account?.address || ""} onChange={(e) => handleInputChange("address", e.target.value)} />
                                    </div>

                                    <div className="col-span-2">
                                        <DatePicker
                                            id="birthday-picker"
                                            label="Ngày sinh"
                                            placeholder="dd/MM/yyyy"
                                            defaultDate={account?.birthday || ""}
                                            onChange={(_, dateStr) => handleInputChange("birthday", dateStr)}
                                        />
                                    </div>

                                    {/* Quyền hạn - select đơn + mũi tên đẹp */}
                                    <div className="col-span-2">
                                        <Label>Quyền hạn</Label>
                                        <div className="relative">
                                            <select
                                                value={selectedRoleIds[0] || ""}
                                                onChange={(e) => setSelectedRoleIds(e.target.value ? [Number(e.target.value)] : [])}
                                                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-5 pr-10 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none cursor-pointer"
                                            >
                                                <option value="">Chọn quyền</option>
                                                {roles.map((role) => (
                                                    <option key={role.id} value={role.id}>
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={closeModal} disabled={loading}>Hủy</Button>
                            <Button size="sm" type="submit" disabled={loading}>
                                {loading ? "Đang lưu..." : "Lưu thay đổi"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}