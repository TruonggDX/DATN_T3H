import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, DocumentCheckIcon } from "@heroicons/react/24/solid";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Select from "react-select";
import Button from "../../components/ui/button/Button.tsx";
import { BoxIcon } from "../../icons";

import { getProduct, updateProduct } from "../../service/ProductService.ts";
import { getAllCategories } from "../../service/CategoriesService.ts";
import {deleteBrand, getAllBrand} from "../../service/BrandService.ts";
import {createVariant, deleteVariant, getVariantByProduct, updateVariant} from "../../service/VariantService.ts";
import { getAllAttributeValue } from "../../service/AttributeValueService.ts";

import { Product } from "../../core/Product.ts";
import { Categories } from "../../core/Categories.ts";
import { Brand } from "../../core/Brand.ts";
import { Variant } from "../../core/Variant.ts";
import { AttributeValue } from "../../core/AttributeValue.ts";
import { UpdateVariant } from "../../core/UpdateVariant.ts";
import {TrashIcon} from "lucide-react";

export default function UpdateProduct() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [attributeValues, setAttributeValues] = useState<AttributeValue[]>([]);
    const [loading, setLoading] = useState(true);
    const [dataReady, setDataReady] = useState(false);

    // Quản lý ảnh mới (khi lưu sẽ thay thế toàn bộ ảnh cũ)
    const [newImages, setNewImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    useEffect(() => {
        renderData()
    }, [id]);

    function renderData(){
        const fetchAllData = async () => {
            try {
                const [
                    productRes,
                    categoriesRes,
                    brandsRes,
                    variantsRes,
                    attributeRes,
                ] = await Promise.all([
                    getProduct(Number(id)),
                    getAllCategories(0, 100),
                    getAllBrand(0, 100),
                    getVariantByProduct(Number(id)),
                    getAllAttributeValue(0, 100),
                ]);

                setProduct(productRes.data);
                setCategories(categoriesRes.data || categoriesRes.content || []);
                setBrands(brandsRes.data || brandsRes.content || []);
                setVariants(variantsRes.data || []);
                setAttributeValues(attributeRes.content || attributeRes.data || []);

                setDataReady(true);
                setLoading(false);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu:", err);
                setLoading(false);
            }
        };
        fetchAllData();
    }

    // Upload ảnh mới
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setNewImages(prev => [...prev, ...files]);
        const previews = files.map(f => URL.createObjectURL(f));
        setImagePreviews(prev => [...prev, ...previews]);
    };

    const removeNewImage = (index: number) => {
        URL.revokeObjectURL(imagePreviews[index]);
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setNewImages(prev => prev.filter((_, i) => i !== index));
    };

    // Lưu sản phẩm + ảnh mới (ảnh mới sẽ thay thế hoàn toàn ảnh cũ)
    const handleSave = async () => {
        if (!product) return;

        try {
            const productDto = {
                code: product.code,
                name: product.name,
                sortDescription: product.sortDescription || "",
                description: product.description || "",
                categoryId: product.categoryId,
                brandId: product.brandId,
            };

            // Gửi productDto + ảnh mới → backend sẽ tự xóa hết ảnh cũ và thêm ảnh mới
            await updateProduct(
                Number(id),
                productDto,
                newImages.length > 0 ? newImages : [] // gửi mảng rỗng nếu không có ảnh mới
            );

            alert("Cập nhật sản phẩm thành công!");
            navigate("/list-product");
        } catch (error: any) {
            console.error("Lỗi cập nhật:", error);
            alert("Cập nhật thất bại: " + (error.response?.data?.message || error.message));
        }
    };

    const handleSaveVariant = async (variant: UpdateVariant) => {
        if (!variant.id) return;
        try {
            await updateVariant(variant.id, {
                code: variant.code,
                price: variant.price,
                quantity: variant.quantity,
                discount: variant.discount,
                productId: variant.productId,
                attributeValuesId: variant.attributeValuesId || [],
            });
            alert("Đã lưu biến thể thành công!");
        } catch (error: any) {
            alert("Lưu biến thể thất bại!");
        }
    };

    // Thêm vào phần state của component
    const [isAddVariantModalOpen, setIsAddVariantModalOpen] = useState(false);
    const [newVariant, setNewVariant] = useState({
        code: "",
        price: 0,
        quantity: 0,
        discount:0,
        attributeValuesId: [] as number[],
    });
    const [addingVariant, setAddingVariant] = useState(false);
    const handleCreateVariant = async () => {

        if (newVariant.price <= 0) {
            alert("Giá phải lớn hơn 0!");
            return;
        }
        if (newVariant.attributeValuesId.length === 0) {
            alert("Vui lòng chọn ít nhất 1 thuộc tính!");
            return;
        }

        setAddingVariant(true);
        try {
            const variantToCreate = {
                ...newVariant,
                productId: product!.id,
            } as Variant;

            const createdVariant = await createVariant(variantToCreate);
            renderData()
            // Thêm vào danh sách hiển thị ngay lập tức
            setVariants(prev => [...prev, createdVariant]);

            alert("Thêm biến thể thành công!");

            // Reset form + đóng modal
            setNewVariant({ code: "", price: 0, quantity: 0, attributeValuesId: [] });
            setIsAddVariantModalOpen(false);
        } catch (error: any) {
            console.error("Lỗi khi tạo biến thể:", error);
            alert(
                "Thêm biến thể thất bại: " +
                (error.response?.data?.message || error.message || "Lỗi không xác định")
            );
        } finally {
            setAddingVariant(false);
        }
    };

    const handleDeleteVariant = (id:number) =>{
        if (window.confirm("Bạn có chắc chắn muốn xóa biến thể này không?")) {
            deleteVariant(id).then(() => {
                renderData();
                alert("Xóa thành công!");
            });
        }
    }
    if (loading || !product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-lg text-gray-600">Đang tải sản phẩm...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageMeta title={`Cập nhật sản phẩm #${product.id}`} description="Chỉnh sửa thông tin sản phẩm" />
            <PageBreadcrumb pageTitle="Cập nhật sản phẩm" />

            <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mã sản phẩm</label>
                                <input type="text" value={product.code} readOnly className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 text-gray-600" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                                <input
                                    type="text"
                                    value={product.name}
                                    onChange={e => setProduct(prev => prev ? { ...prev, name: e.target.value } : null)}
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                                    <select
                                        value={product.categoryId || ""}
                                        onChange={e => setProduct(prev => prev ? { ...prev, categoryId: Number(e.target.value) } : null)}
                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Thương hiệu</label>
                                    <select
                                        value={product.brandId || ""}
                                        onChange={e => setProduct(prev => prev ? { ...prev, brandId: Number(e.target.value) } : null)}
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
                                    value={product.sortDescription || ""}
                                    onChange={e => setProduct(prev => prev ? { ...prev, sortDescription: e.target.value } : null)}
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* Ảnh - khi lưu sẽ thay thế toàn bộ */}
                        <div className="lg:col-span-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ảnh sản phẩm mới (sẽ thay thế toàn bộ ảnh cũ khi lưu)
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
                                {/* Ảnh cũ - chỉ để xem */}
                                {product.imageDtos?.map(img => (
                                    <div key={img.id} className="relative group">
                                        <img src={img.url} alt="Cũ" className="w-full h-32 object-cover rounded-lg border opacity-70" />
                                    </div>
                                ))}

                                {/* Ảnh mới */}
                                {imagePreviews.map((preview, i) => (
                                    <div key={`new-${i}`} className="relative group">
                                        <img src={preview} alt="Mới" className="w-full h-32 object-cover rounded-lg border-2 border-blue-500" />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(i)}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-red-700 transition shadow-lg"
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {product.imageDtos?.length === 0 && imagePreviews.length === 0 && (
                                <div className="h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-500">
                                    Chưa có ảnh sản phẩm
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mô tả dài */}
                    <div className="border-t pt-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả dài</label>
                        <textarea
                            value={product.description || ""}
                            onChange={e => setProduct(prev => prev ? { ...prev, description: e.target.value } : null)}
                            rows={5}
                            className="w-full px-5 py-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Nhập mô tả chi tiết sản phẩm..."
                        />
                    </div>

                    {/* Biến thể */}
                    <div className="border-t pt-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">Các biến thể</h3>
                            <Button
                                size="sm"
                                variant="outline"
                                startIcon={<BoxIcon className="size-5"/>}
                                type="button"
                                onClick={() => setIsAddVariantModalOpen(true)}
                            >
                                Thêm biến thể
                            </Button>
                        </div>

                        <div className="space-y-6">
                            {variants.length === 0 ? (
                                <p className="text-gray-500 italic">Chưa có biến thể nào.</p>
                            ) : !dataReady ? (
                                <div className="text-center py-8">
                                    <div
                                        className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : (
                                variants.map(variant => (
                                    <div
                                        key={variant.id}
                                        className="flex flex-col lg:flex-row gap-6 p-6 border rounded-xl bg-white shadow-sm"
                                    >
                                        {/* LEFT SIDE */}
                                        <div className="flex-1 space-y-4">
                                            {/* Row 1 */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Mã biến thể
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={variant.code}
                                                        readOnly
                                                        className="w-full px-4 py-2.5 border rounded-lg bg-gray-100"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Giá
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={variant.price}
                                                        onChange={e =>
                                                            setVariants(prev =>
                                                                prev.map(v =>
                                                                    v.id === variant.id
                                                                        ? {...v, price: Number(e.target.value) || 0}
                                                                        : v
                                                                )
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                        min="0"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Số lượng
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={variant.quantity}
                                                        onChange={e =>
                                                            setVariants(prev =>
                                                                prev.map(v =>
                                                                    v.id === variant.id
                                                                        ? {...v, quantity: Number(e.target.value) || 0}
                                                                        : v
                                                                )
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                        min="0"
                                                    />
                                                </div>
                                            </div>

                                            {/* Row 2 */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Giảm giá
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={variant.discount}
                                                        onChange={e =>
                                                            setVariants(prev =>
                                                                prev.map(v =>
                                                                    v.id === variant.id
                                                                        ? {...v, discount: Number(e.target.value) || 0}
                                                                        : v
                                                                )
                                                            )
                                                        }
                                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                        min="0"
                                                    />
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Thuộc tính
                                                    </label>
                                                    <Select
                                                        isMulti
                                                        options={attributeValues.map(av => ({
                                                            value: av.id,
                                                            label: av.value,
                                                        }))}
                                                        value={attributeValues
                                                            .filter(av => variant.attributeValuesId?.includes(av.id))
                                                            .map(av => ({value: av.id, label: av.value}))}
                                                        onChange={selected => {
                                                            const ids = selected
                                                                ? (selected as any).map((s: any) => s.value)
                                                                : [];
                                                            setVariants(prev =>
                                                                prev.map(v =>
                                                                    v.id === variant.id
                                                                        ? {...v, attributeValuesId: ids}
                                                                        : v
                                                                )
                                                            );
                                                        }}
                                                        placeholder="Chọn màu, size..."
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* RIGHT SIDE - BUTTONS */}
                                        <div
                                            className="flex lg:flex-col gap-3 justify-end lg:justify-center min-w-[120px]">
                                            <button
                                                type="button"
                                                onClick={() => handleSaveVariant(variant)}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                                            >
                                                <DocumentCheckIcon className="w-5 h-5"/>
                                                Lưu
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDeleteVariant(variant.id)}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm"
                                            >
                                                <TrashIcon className="w-5 h-5"/>
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

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
                            onClick={handleSave}
                            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </div>
            {/* Modal Thêm biến thể mới */}
            {isAddVariantModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">Thêm biến thể mới</h3>
                            <button
                                onClick={() => setIsAddVariantModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Giá <span
                                        className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        value={newVariant.price || ""}
                                        onChange={e => setNewVariant(prev => ({
                                            ...prev,
                                            price: Number(e.target.value) || 0
                                        }))}
                                        min="0"
                                        placeholder="0"
                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
                                    <input
                                        type="number"
                                        value={newVariant.quantity || ""}
                                        onChange={e => setNewVariant(prev => ({
                                            ...prev,
                                            quantity: Number(e.target.value) || 0
                                        }))}
                                        min="0"
                                        placeholder="0"
                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Giảm giá %</label>
                                <input
                                    type="number"
                                    value={newVariant.discount || ""}
                                    onChange={e => setNewVariant(prev => ({
                                        ...prev,
                                        discount: Number(e.target.value) || 0
                                    }))}
                                    min="0"
                                    placeholder="0"
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Thuộc tính (màu sắc, dung lượng...) <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    isMulti
                                    options={attributeValues.map(av => ({value: av.id, label: av.value}))}
                                    value={attributeValues
                                        .filter(av => newVariant.attributeValuesId.includes(av.id))
                                        .map(av => ({value: av.id, label: av.value}))}
                                    onChange={selected => {
                                        const ids = selected ? (selected as any[]).map(s => s.value) : [];
                                        setNewVariant(prev => ({...prev, attributeValuesId: ids}));
                                    }}
                                    placeholder="Chọn màu sắc, dung lượng, kích thước..."
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    noOptionsMessage={() => "Không có thuộc tính nào"}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                type="button"
                                onClick={() => setIsAddVariantModalOpen(false)}
                                className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                                disabled={addingVariant}
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateVariant}
                                disabled={addingVariant}
                                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {addingVariant ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    strokeWidth="4" fill="none"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                        </svg>
                                        Đang thêm...
                                    </>
                                ) : (
                                    "Thêm biến thể"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}