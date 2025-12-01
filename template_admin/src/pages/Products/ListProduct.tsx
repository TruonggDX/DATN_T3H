import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../components/ui/table";
import Button from "../../components/ui/button/Button.tsx";
import {Building, Pencil, RefreshCcw, Search, Tag, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import {Product} from "../../core/Product.ts";
import {deleteProduct, getAllProduct} from "../../service/ProductService.ts";
import {getAllBrand} from "../../service/BrandService.ts";
import {Categories} from "../../core/Categories.ts";
import {Brand} from "../../core/Brand.ts";
import {getAllCategories} from "../../service/CategoriesService.ts";
import {useNavigate} from "react-router";

export default function ListProduct() {
    const [products, setProducts] = useState<Product[]>([])
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [cateId, setCateId] = useState<number | undefined>(undefined);
    const [brandId, setBrandId] = useState<number | undefined>(undefined);

    const [categories, setCategories] = useState<Categories[]>([])
    const [brands, setBrands] = useState<Brand[]>([])


    useEffect(() => {
        renderData();
    }, [page]);


    const renderData = () => {
        getAllProduct(page, size, code, name, cateId, brandId).then(res => {
            setProducts(res.content);
            setTotalPages(res.totalPages);
        });

        getAllCategories(0, 100).then(res => {
            setCategories(res.content);
        })

        getAllBrand(0, 100).then(res => {
            setBrands(res.content);
        })
    };
    const handleSearch = () => {
        setPage(0);
        renderData();
    };

    const handleReset = () => {
        setCode("");
        setName("");
        setCateId(undefined);
        setBrandId(undefined);
        setPage(0);
        renderData()
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            deleteProduct(id).then(() => {
                renderData();
                alert("Xóa thành công!");
            });
        }
    }
    const navigate = useNavigate();
    const handleEdit = (productId: number) => {
        navigate(`/update-product/${productId}`);
    };
    return (
        <>
            <PageMeta
                title="Dashbroad Admin"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Danh sách sản phẩm"/>
            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
                    <div className="relative flex-1 min-w-[230px]">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20}/>
                        <input
                            type="text"
                            name="code"
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Mã sản phẩm"
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
                            placeholder="Tên sản phẩm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="relative flex-1 min-w-[250px]">
                        <Building
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            size={20}
                        />

                        <select
                            name="cateId"
                            value={cateId ?? ""}
                            onChange={(e) => setCateId(e.target.value ? Number(e.target.value) : undefined)}
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">-- Chọn danh mục --</option>

                            {categories.map((cate) => (
                                <option key={cate.id} value={cate.id}>
                                    {cate.name}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="relative flex-1 min-w-[250px]">
                        <Building
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            size={20}
                        />

                        <select
                            name="brandId"
                            value={brandId ?? ""}
                            onChange={(e) => setBrandId(e.target.value ? Number(e.target.value) : undefined)}
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">-- Chọn thương hiệu --</option>

                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>

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
                                        Mã sản phẩm
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Tên sản phẩm
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Ảnh
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Danh mục
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-4 sm:px-6 text-start"
                                    >
                                        Thương hiệu
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
                                {products.map((product, index) => (
                                    <TableRow key={product.id}>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {product.code}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {product.name}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <img
                                                width={60}
                                                height={60}
                                                src={product.imageDtos[0]?.url}
                                                alt={product.imageDtos[0]?.url}
                                            />
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {product.categoryName}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {product.brandName}
                                        </TableCell>
                                        <TableCell
                                            className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    onClick={() => handleEdit(product.id)}
                                                    size="sm" variant="outline" startIcon={<Pencil size={16}/>}>

                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    startIcon={<Trash2 size={16}/>}
                                                    className="text-red-500 hover:text-red-600"
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                </Button>
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

        </>
    );
}
