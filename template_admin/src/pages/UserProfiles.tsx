import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import {useModal} from "../hooks/useModal.ts";
import {Account} from "../core/Account.ts";
import {getAccount, updateAccount} from "../service/AccountService.ts";
import {Modal} from "../components/ui/modal";
import FileInput from "../components/form/input/FileInput.tsx";
import Label from "../components/form/Label.tsx";
import Input from "../components/form/input/InputField.tsx";
import DatePicker from "../components/form/date-picker.tsx";
import Button from "../components/ui/button/Button.tsx";
import ChangePasswordModal from "./ChangePasswordModal.tsx";


export default function UserProfiles() {
    const { isOpen, openModal, closeModal } = useModal();
    const [account, setAccount] = useState<Account | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getAccount()
            .then((res) => {
                const data = res.data;
                setAccount(data);
                if (data?.imageUrl) {
                    setPreviewImage(data.imageUrl);
                }
            })
            .catch((err) => {
                console.error("Lỗi tải thông tin tài khoản:", err);
                toast.error("Không tải được thông tin cá nhân");
            });
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Ảnh không được quá 5MB");
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (field: keyof Account, value: string) => {
        setAccount((prev) => (prev ? { ...prev, [field]: value } : null));
    };

    const handleSave = async () => {
        if (!account?.id) {
            toast.error("Không tìm thấy ID tài khoản");
            return;
        }

        setLoading(true);
        try {
            const updatedData = {
                fullname: account.fullname,
                phone: account.phone,
                address: account.address,
                birthday: account.birthday,
                roleIds: account.roles?.map((role) => role.id) || [],
            };

            const response = await updateAccount(account.id, updatedData, selectedFile || undefined);

            setAccount((prev) => (prev ? { ...prev, ...response } : null));
            if (response.imageUrl) {
                setPreviewImage(response.imageUrl);
            }
            alert("Cập nhật thông tin cá nhân thành công!")
            closeModal();
        } catch (error: any) {
            console.error("Cập nhật thất bại:", error);
        } finally {
            setLoading(false);
        }
    };
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

    return (
        <>
            <PageMeta
                title="Admin Dashboard"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Thông tin cá nhân" />

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Thông tin
                </h3>

                <div className="space-y-6">
                    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex flex-col items-center w-100 gap-6 xl:flex-row">
                                <div
                                    className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                                    <img
                                        src={previewImage || "/images/user/owner.jpg"}
                                        alt={account?.fullname || "User"}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                <div className="order-3 xl:order-2">
                                    <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                                        {account?.fullname || "Đang tải..."}
                                    </h4>
                                    <div
                                        className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {account?.birthday || "--"}
                                        </p>
                                        <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {account?.address || "--"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-3">
                                {/* Nút Edit */}
                                <button
                                    onClick={openModal}
                                    className="flex w-full lg:w-auto items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path
                                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                                    </svg>
                                    Edit
                                </button>

                                {/* Nút Đổi mật khẩu */}
                                <button
                                    onClick={() => setPasswordModalOpen(true)}
                                    className="flex w-full lg:w-auto items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path
                                            d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-7V7a6 6 0 10-12 0v3H4v12h16V10h-2zm-8 0V7a4 4 0 018 0v3H10z"/>
                                    </svg>
                                    Đổi mật khẩu
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Thông tin cá nhân
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Họ và
                                    tên</p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{account?.fullname || "--"}</p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Email</p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{account?.email || "--"}</p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Số điện
                                    thoại</p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{account?.phone || "--"}</p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Địa chỉ</p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{account?.address || "--"}</p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Ngày sinh</p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{account?.birthday || "--"}</p>
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
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Cập nhật thông tin chi tiết để giữ cho hồ sơ của bạn được cập nhật.
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSave();
                        }}
                        className="flex flex-col"
                    >
                        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                            <div className="mt-7">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2 flex flex-col items-center gap-4">
                                        <div className="w-32 h-32 overflow-hidden border-4 border-dashed border-gray-300 rounded-full dark:border-gray-700 shadow-xl relative group">
                                            <img
                                                src={previewImage || "/images/user/owner.jpg"}
                                                alt="Avatar"
                                                className="object-cover w-full h-full"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <FileInput onChange={handleFileChange} className="max-w-xs" />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Họ và tên</Label>
                                        <Input
                                            type="text"
                                            value={account?.fullname || ""}
                                            onChange={(e) => handleInputChange("fullname", e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Email</Label>
                                        <Input type="text" value={account?.email || ""} readOnly className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed" />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Số điện thoại</Label>
                                        <Input
                                            type="text"
                                            value={account?.phone || ""}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Địa chỉ</Label>
                                        <Input
                                            type="text"
                                            value={account?.address || ""}
                                            onChange={(e) => handleInputChange("address", e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <DatePicker
                                            id="birthday-picker"
                                            label="Ngày sinh"
                                            placeholder="dd/MM/yyyy"
                                            defaultDate={account?.birthday || ""}
                                            onChange={(selectedDates, dateStr) => {
                                                handleInputChange("birthday", dateStr);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={closeModal} disabled={loading}>
                                Hủy
                            </Button>
                            <Button size="sm" type="submit" disabled={loading}>
                                {loading ? "Đang lưu..." : "Lưu thay đổi"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
            />

        </>
    );
}