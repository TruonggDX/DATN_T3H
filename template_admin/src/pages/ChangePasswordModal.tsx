import { useEffect, useState } from "react";
import { Modal } from "../components/ui/modal";
import Input from "../components/form/input/InputField";
import Label from "../components/form/Label";
import Button from "../components/ui/button/Button";
import { Account } from "../core/Account.ts";
import { getAccount, changePassword } from "../service/AccountService.ts";
import {useNavigate} from "react-router"; // thêm changePassword

export default function ChangePasswordModal({
                                                isOpen,
                                                onClose,
                                            }: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<Account | null>(null);
    const [error, setError] = useState<string>("");

    // Lấy thông tin user (có id)
    useEffect(() => {
        if (isOpen) {
            getAccount()
                .then((res) => {
                    setUser(res.data);
                })
                .catch(() => {
                    setError("Không thể tải thông tin tài khoản!");
                });
        }
    }, [isOpen]);

    const navigate = useNavigate();
    const handleSave = async () => {
        setError("");

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("Vui lòng điền đầy đủ các trường!");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }

        if (newPassword.length < 8) {
            setError("Mật khẩu mới phải có ít nhất 8 ký tự!");
            return;
        }

        if (!user?.id) {
            setError("Không tìm thấy ID người dùng!");
            return;
        }

        setLoading(true);
        try {
            await changePassword(user.id, {
                oldPassword,
                newPassword,
                confirmPassword,
            });

            alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại");
            localStorage.removeItem("jwtToken");
            navigate('/')
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            onClose();
        } catch (err: any) {
            console.error("Change password error:", err);
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Đổi mật khẩu thất bại! Kiểm tra lại mật khẩu cũ.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
            <div className="relative w-full rounded-3xl bg-white p-6 dark:bg-gray-900">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Đổi mật khẩu
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Nhập mật khẩu cũ và đặt mật khẩu mới.
                </p>

                {/* Hiển thị lỗi */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    <div>
                        <Label>Mật khẩu cũ</Label>
                        <Input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Nhập mật khẩu cũ"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <Label>Mật khẩu mới</Label>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nhập mật khẩu mới"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <Label>Nhập lại mật khẩu mới</Label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Nhập lại mật khẩu mới"
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-6">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Hủy
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleSave}
                        loading={loading}
                        disabled={loading}
                    >
                        {loading ? "Đang lưu..." : "Đổi mật khẩu"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}