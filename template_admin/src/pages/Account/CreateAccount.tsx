import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button.tsx";
import Label from "../../components/form/Label.tsx";
import Input from "../../components/form/input/InputField.tsx";
import FileInput from "../../components/form/input/FileInput.tsx";
import DatePicker from "../../components/form/date-picker.tsx";
import {useState, useEffect} from "react";
import {createAccount} from "../../service/AccountService.ts";
import {getAllRole} from "../../service/RoleService.ts";
import {Role} from "../../core/Role.ts";
import {useNavigate} from "react-router-dom";

export default function CreateAccount() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<Role[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedRoleId, setSelectedRoleId] = useState<number | "">("");

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        birthday: "",
    });

    useEffect(() => {
        getAllRole(0, 100)
            .then((res) => setRoles(res.content))
            .catch(() => console.error("Không tải được danh sách quyền"));
    }, []);

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            console.error("Ảnh không được quá 5MB");
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fullname || !formData.email || !formData.password || !selectedRoleId) {
            console.error("Vui lòng điền đầy đủ các trường có dấu (*)");
            return;
        }

        setLoading(true);
        try {
            const dataToSend = {
                ...formData,
                roleIds: selectedRoleId ? [selectedRoleId] : [],
            };

            await createAccount(dataToSend, selectedFile || undefined);

            alert("Tạo tài khoản thành công!");
            navigate("/list-account");
        } catch (error: any) {
            console.error("Lỗi tạo tài khoản:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageMeta title="Thêm mới tài khoản" description="Tạo tài khoản quản trị mới"/>
            <PageBreadcrumb pageTitle="Thêm mới tài khoản"/>

            <div className="space-y-6">
                <div className="rounded-3xl bg-white shadow-2xl dark:bg-gray-900">
                    <div className="px-8 py-10 lg:px-16 lg:py-12">
                        <h2 className="mb-10 text-3xl font-bold text-gray-800 dark:text-white text-center lg:text-left">
                            Tạo tài khoản mới
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                                <div className="flex flex-col items-center justify-start pt-8">
                                    <div className="relative group mb-6">
                                        <div
                                            className="w-56 h-56 rounded-full overflow-hidden border-8 border-dashed border-gray-300 dark:border-gray-700 shadow-2xl">
                                            <img
                                                src={previewImage || "/images/user/owner.jpg"}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div
                                            className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M3 9a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <FileInput onChange={handleFileChange} className="max-w-xs"/>
                                </div>

                                <div className="lg:col-span-2 space-y-7">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <Label>Họ và tên *</Label>
                                            <Input value={formData.fullname}
                                                   onChange={e => handleInputChange("fullname", e.target.value)}
                                                   placeholder="Nguyễn Văn A"/>
                                        </div>
                                        <div>
                                            <Label>Email *</Label>
                                            <Input type="email" value={formData.email}
                                                   onChange={e => handleInputChange("email", e.target.value)}
                                                   placeholder="example@gmail.com"/>
                                        </div>
                                        <div>
                                            <Label>Mật khẩu *</Label>
                                            <Input type="password" value={formData.password}
                                                   onChange={e => handleInputChange("password", e.target.value)}
                                                   placeholder="••••••••"/>
                                        </div>
                                        <div>
                                            <Label>Số điện thoại</Label>
                                            <Input value={formData.phone}
                                                   onChange={e => handleInputChange("phone", e.target.value)}
                                                   placeholder="0901234567"/>
                                        </div>
                                        <div>
                                            <Label>Địa chỉ</Label>
                                            <Input value={formData.address}
                                                   onChange={e => handleInputChange("address", e.target.value)}
                                                   placeholder="123 Đường ABC, TP.HCM"/>
                                        </div>
                                        <div>
                                            <Label>Ngày sinh</Label>
                                            <DatePicker
                                                id="birthday-create"
                                                placeholder="dd/MM/yyyy"
                                                defaultDate={formData.birthday}
                                                onChange={(_, dateStr) => handleInputChange("birthday", dateStr || "")}
                                            />
                                        </div>
                                    </div>

                                    {/* Quyền hạn - full width */}
                                    <div>
                                        <Label>Quyền hạn *</Label>
                                        <div className="relative">
                                            <select
                                                value={selectedRoleId}
                                                onChange={(e) => setSelectedRoleId(e.target.value ? Number(e.target.value) : "")}
                                                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-5 pr-10 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none cursor-pointer"
                                                required
                                            >
                                                <option value="">Chọn quyền hạn</option>
                                                {roles.map((role) => (
                                                    <option key={role.id} value={role.id}>
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div
                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M19 9l-7 7-7-7"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="flex justify-end gap-4 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    disabled={loading}
                                >
                                    Hủy
                                </Button>                                <Button size="sm" type="submit" disabled={loading}>
                                    {loading ? "Đang tạo..." : "Tạo tài khoản"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}