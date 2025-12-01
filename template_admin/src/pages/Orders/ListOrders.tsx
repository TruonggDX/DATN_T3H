import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../components/ui/table";
import Button from "../../components/ui/button/Button.tsx";
import {Code, Eye, RefreshCcw, Search, Tag, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import {deleteOrder, getAllOrder, getOrder, getOrderDetail, updateOrder} from "../../service/OrderService.ts";
import {Order} from "../../core/Order.ts";
import {OrderDetail} from "../../core/OrderDetail.ts";

export default function ListOrders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [code, setCode] = useState("");
    const [status, setStatus] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const [openModal, setOpenModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const [newStatus, setNewStatus] = useState("");
    const [ordersDetails, setOrdersDetails] = useState<OrderDetail[]>([])
    useEffect(() => {
        renderData();
    }, [page]);

    function renderData() {
        getAllOrder(page, size, code, status).then((res) => {
            setOrders(res.content);
            setTotalPages(res.totalPages);
        });
    }

    const handleDelete = (id: number) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?");
        if (isConfirmed) {
            deleteOrder(id).then(() => {
                renderData();
                alert("Xóa thành công!");
            })
        }
    }

    const handleSearch = () => {
        setPage(0);
        renderData();
    };

    const handleReset = () => {
        setCode("");
        setStatus("");
        renderData();
    };

    const handleOpenModal = (id:number) => {
        getOrder(id).then((res) => {
            setCurrentOrder(res.data);
            setNewStatus(res.data.status || "");
        }).catch((e) => console.error(e));
        getOrderDetail(id).then((res) => {
            setOrdersDetails(res.data);
        }).catch((e) => console.error(e));
        setOpenModal(true);
    };

    const handleUpdateStatus = async (id:number) => {
        if (!currentOrder) return;
        try {
            await updateOrder(id, newStatus);
            alert("Cập nhật trạng thái thành công!");
            setOpenModal(false);
            renderData();
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra khi cập nhật trạng thái!");
        }
    };

    return (
        <>
            <PageMeta
                title="Dashbroad Admin"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Danh sách đơn hàng"/>
            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
                    <div className="relative flex-1 min-w-[230px]">
                        <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20}/>
                        <input
                            type="text"
                            name="code"
                            value={code}
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Mã đơn hàng"
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className="relative flex-1 min-w-[230px]">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20}/>
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">-- Chọn trạng thái --</option>
                            <option value="Chờ xác nhận">Chờ xác nhận</option>
                            <option value="Đã xác nhận">Đã xác nhận</option>
                            <option value="Đang giao hàng">Đang giao hàng</option>
                            <option value="Hoàn thành">Hoàn thành</option>
                            <option value="Đã hủy">Đã hủy</option>
                        </select>
                    </div>

                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-lg font-semibold"
                    >
                        <RefreshCcw size={20}/> Làm mới
                    </button>

                    <button
                        onClick={handleSearch}
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg font-semibold"
                    >
                        <Search size={20}/> Tìm kiếm
                    </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">STT</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Mã đơn hàng</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Trạng thái</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Tên tài khoản</TableCell>
                                    <TableCell isHeader className="px-5 py-4 sm:px-6 text-start">Action</TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {orders.map((order, index) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{index + 1}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.code}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.status}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.accountName}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" startIcon={<Eye size={16}/>} onClick={() => handleOpenModal(order.id)}/>
                                                <Button onClick={() => handleDelete(order.id)} size="sm" variant="outline" startIcon={<Trash2 size={16}/>} className="text-red-500 hover:text-red-600"/>
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

            {openModal && currentOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl p-6 overflow-y-auto max-h-[90vh]">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Chi tiết đơn hàng</h2>
                            <button
                                className="text-gray-400 hover:text-gray-600 transition"
                                onClick={() => setOpenModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form thông tin đơn hàng chia 2 cột */}
                        <div className="flex flex-wrap gap-6 mb-6">
                            {/* Cột trái */}
                            <div className="flex-1 min-w-[250px] space-y-4">
                                <div>
                                    <label className="block font-medium text-gray-600 mb-1">Mã đơn hàng</label>
                                    <input type="text" value={currentOrder.code} readOnly
                                           className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 bg-gray-100"/>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-600 mb-1">Trạng thái</label>
                                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                                        <option value="Đã xác nhận">Đã xác nhận</option>
                                        <option value="Đang giao hàng">Đang giao hàng</option>
                                        <option value="Hoàn thành">Hoàn thành</option>
                                        <option value="Đã hủy">Đã hủy</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-600 mb-1">Địa chỉ</label>
                                    <input type="text" value={currentOrder.address} readOnly
                                           className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 bg-gray-100"/>
                                </div>
                            </div>

                            {/* Cột phải */}
                            <div className="flex-1 min-w-[250px] space-y-4">
                                <div>
                                    <label className="block font-medium text-gray-600 mb-1">Ghi chú</label>
                                    <input type="text" value={currentOrder.notes || "-"} readOnly
                                           className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 bg-gray-100"/>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-600 mb-1">Phí vận chuyển</label>
                                    <input type="text" value={currentOrder.ship?.toLocaleString() + " ₫"} readOnly
                                           className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 bg-gray-100"/>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-600 mb-1">Tên tài khoản</label>
                                    <input type="text" value={currentOrder.accountName} readOnly
                                           className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 bg-gray-100"/>
                                </div>
                            </div>
                        </div>

                        {/* Danh sách sản phẩm */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Danh sách sản phẩm</h3>
                            <div className="overflow-x-auto max-h-64">
                                <table className="w-full table-auto border border-gray-200 rounded-lg">
                                    <thead className="bg-gray-100 sticky top-0">
                                    <tr>
                                        <th className="px-2 py-2 border-b w-[50px]">STT</th>
                                        <th className="px-2 py-2 border-b w-[300px]">Tên sản phẩm</th>
                                        <th className="px-2 py-2 border-b w-[160px]">Biến thể</th>
                                        <th className="px-2 py-2 border-b w-[120px]">Giá</th>
                                        <th className="px-2 py-2 border-b w-[100px]">Số lượng</th>
                                        <th className="px-2 py-2 border-b w-[150px]">Thành tiền</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {ordersDetails.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-2 py-2 border-b text-center">
                                                {index + 1}
                                            </td>
                                            <td className="px-2 py-2 border-b max-w-[300px]">
                                                {item.productName}
                                            </td>
                                            <td className="px-2 py-2 border-b text-gray-700">
                                                {item.variant?.attributeValues?.length > 0 ? (
                                                    item.variant.attributeValues.map(attr => attr.value).join(" - ")
                                                ) : (
                                                    <span className="text-gray-400 italic">Không có</span>
                                                )}
                                            </td>


                                            <td className="px-2 py-2 border-b text-center">
                                                {item.price.toLocaleString()} ₫
                                            </td>
                                            <td className="px-2 py-2 border-b text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="px-2 py-2 border-b text-center">
                                                {(item.price * item.quantity).toLocaleString()} ₫
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline" onClick={() => setOpenModal(false)}>Hủy</Button>
                            <Button onClick={() => handleUpdateStatus(currentOrder?.id)}>Lưu</Button>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
}
