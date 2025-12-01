import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ArrowLeftIcon} from "@heroicons/react/24/solid";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

import {getAllCategories} from "../../service/CategoriesService.ts";
import {getAllBrand} from "../../service/BrandService.ts";
import {createProduct} from "../../service/ProductService.ts"; // Đảm bảo bạn đã có hàm này
import {Categories} from "../../core/Categories.ts";
import {Brand} from "../../core/Brand.ts";

export default function AddProduct() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState<Categories[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        sortDescription: "",
        description: "",
        categoryId: null as number | null,
        brandId: null as number | null,
    });

    // Ảnh mới
    const [newImages, setNewImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, brandRes] = await Promise.all([
                    getAllCategories(0, 100),
                    getAllBrand(0, 100),
                ]);

                setCategories(catRes.data || catRes.content || []);
                setBrands(brandRes.data || brandRes.content || []);
                setLoading(false);
            } catch (err) {
                console.error("Lỗi tải dữ liệu:", err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setNewImages(prev => [...prev, ...files]);
        const previews = files.map(f => URL.createObjectURL(f));
        setImagePreviews(prev => [...prev, ...previews]);
    };

    const removeImage = (index: number) => {
        URL.revokeObjectURL(imagePreviews[index]);
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setNewImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            alert("Vui lòng nhập tên sản phẩm!");
            return;
        }
        if (!formData.categoryId || !formData.brandId) {
            alert("Vui lòng chọn danh mục và thương hiệu!");
            return;
        }
        if (newImages.length === 0) {
            if (!confirm("Bạn chưa chọn ảnh sản phẩm. Vẫn tiếp tục?")) return;
        }

        setSaving(true);
        try {
            const productDto = {
                code: formData.code || `SP-${Date.now()}`, // tự sinh nếu để trống
                name: formData.name,
                sortDescription: formData.sortDescription || "",
                description: formData.description || "",
                categoryId: formData.categoryId,
                brandId: formData.brandId,
            };

            await createProduct(productDto, newImages);

            alert("Thêm sản phẩm thành công!");
            navigate("/list-product");
        } catch (error: any) {
            console.error("Lỗi khi tạo sản phẩm:", error);
            alert("Thêm sản phẩm thất bại: " + (error.response?.data?.message || "Lỗi không xác định"));
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-lg text-gray-600">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageMeta title="Thêm sản phẩm mới" description="Tạo sản phẩm mới cho cửa hàng" />
            <PageBreadcrumb pageTitle="Thêm sản phẩm mới" />

            <div className="space-y-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    Quay lại danh sách
                </button>

                <div className="bg-white border rounded-xl shadow-sm overflow-hidden p-6 space-y-10">
                    {/* Thông tin + Ảnh */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Form trái */}
                        <div className="lg:col-span-7 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên sản phẩm <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Áo thun"
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Danh mục <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.categoryId || ""}
                                        onChange={e => setFormData(prev => ({ ...prev, categoryId: Number(e.target.value) || null }))}
                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Thương hiệu <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.brandId || ""}
                                        onChange={e => setFormData(prev => ({ ...prev, brandId: Number(e.target.value) || null }))}
                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="">Chọn thương hiệu</option>
                                        {brands.map(b => (
                                            <option key={b.id} value={b.id}>{b.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                                <input
                                    type="text"
                                    value={formData.sortDescription}
                                    onChange={e => setFormData(prev => ({ ...prev, sortDescription: e.target.value }))}
                                    placeholder="Sản phẩm chính hãng, bảo hành 12 tháng"
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* Ảnh */}
                        <div className="lg:col-span-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ảnh sản phẩm <span className="text-red-500">(bắt buộc ít nhất 1 ảnh)</span>
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg px-3 py-2 bg-white
                                               file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0
                                               file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                                               hover:file:bg-blue-100"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto p-2 border rounded-lg bg-gray-50">
                                {imagePreviews.map((preview, i) => (
                                    <div key={i} className="relative group">
                                        <img
                                            src={preview}
                                            alt={`Preview ${i + 1}`}
                                            className="w-full h-32 object-cover rounded-lg border-2 border-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-red-700 transition shadow-lg"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {imagePreviews.length === 0 && (
                                <div className="h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-500 bg-gray-50">
                                    Chưa chọn ảnh sản phẩm
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mô tả dài */}
                    <div className="border-t pt-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả chi tiết</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={6}
                            className="w-full px-5 py-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Nhập thông tin chi tiết: cấu hình, tính năng, chính sách bảo hành..."
                        />
                    </div>

                    {/* Nút hành động */}
                    <div className="flex justify-end gap-4 pt-6 border-t">
                        <button
                            type="button"
                            onClick={() => navigate("/list-product")}
                            className="px-8 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={saving}
                            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Đang tạo...
                                </>
                            ) : (
                                "Tạo sản phẩm"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}