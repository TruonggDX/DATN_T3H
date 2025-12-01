import {useEffect, useState} from "react";
import api from '../../service/orderService';
import {Pencil, Trash2} from "lucide-react";
import {formatCurrency} from "@/utils/utils";
import paymentService from "@/service/paymentService";
import {toast} from "react-toastify";
import Link from "next/link";
export default function DashboardOrder() {
    const [orders, setOrders] = useState([]);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState(null);
    const [ordersDetails, setOrdersDetails] = useState([]);
    const [editData, setEditData] = useState({
        id: null,
        address: "",
        notes: ""
    });
    const [methodPayment, setPaymentMethod] = useState({});
    useEffect(() => {
        renderData()
    }, []);
    function renderData() {
        api.getAllOrders().then(response => {
            setOrders(response.content);
        });
    }
    const handleShow = async (id) => {
        try {
            const [orderRes, detailsRes] = await Promise.all([
                api.getOrderById(id),
                api.getOrderDetailsByOrderId(id)
            ]);

            paymentService.getPaymentMethodByOrderId(id).then(response => {
                setPaymentMethod(response.data);
            })
            const order = orderRes.data;
            setData(order);
            setOrdersDetails(detailsRes.data || []);

            setEditData({
                id: order.id,
                address: order.address || "",
                notes: order.notes || ""
            });

            setModal(true);
        } catch (err) {
            alert("Lỗi tải chi tiết đơn hàng!");
        }
    };

    const handleClose = () => {
        setModal(false);
        setData(null);
        setOrdersDetails([]);
        setEditData({id: null, address: "", notes: ""});
    };

    const isPending = (status) => status === "Chờ xác nhận";


    const handleSave = async () => {
        if (!editData.address.trim()) {
            alert("Vui lòng nhập địa chỉ giao hàng!");
            return;
        }

        try {
            const payload = {
                address: editData.address,
                notes: editData.notes
            };
            await api.updateCustomerOrders(editData.id, payload);

            alert("Cập nhật đơn hàng thành công!");
            setModal(false);

            setData(prev => ({
                ...prev,
                address: editData.address,
                notes: editData.notes
            }));

        } catch (error) {
            console.error("Lỗi cập nhật:", error);
            alert("Cập nhật thất bại! Vui lòng thử lại.");
        }
    };

    const handleCancel = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
            try {
                await api.cancelOrders(id);
                toast.success("Hủy thành công!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    closeButton: false,
                    style: {
                        padding: "5px",
                        width: "180px"
                    }
                });
                await renderData();
            } catch (e) {
                console.error(e);

                toast.error("Hủy thất bại!", {
                    position: "top-right",
                    autoClose: 1500
                });
            }
        }
    };


    return (
        <div className="rts-reviewd-area-dashed table-responsive">
            <h5 className="title">Đơn hàng đã mua</h5>
            <table className="table-reviews quiz mb--0">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã đơn hàng</th>
                    <th>Ngày đặt</th>
                    <th>Trạng thái</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => {
                    const canCancel = isPending(order.status);

                    return (
                        <tr key={order.id}>
                            <td><p className="quiz">#{index + 1}</p></td>
                            <td><span className="questions">{order.code}</span></td>
                            <td><span className="marks">
                                {order.createdDate ? new Date(order.createdDate).toLocaleDateString('vi-VN') : "N/A"}
                            </span></td>
                            <td>
                                <span
                                    style={{
                                        backgroundColor:
                                            order.status === "Chờ xác nhận" ? "#FACC15" :
                                                order.status === "Đã xác nhận" ? "#3B82F6" :
                                                    order.status === "Đang giao hàng" ? "#6366F1" :
                                                        order.status === "Hoàn thành" ? "#22C55E" :
                                                            order.status === "Đã hủy" ? "#EF4444" : "#9CA3AF",
                                        color: order.status === "Chờ xác nhận" ? "black" : "white",
                                        padding: "2px 8px",
                                        borderRadius: "9999px",
                                        fontSize: "15px",
                                        fontWeight: 500,
                                    }}
                                >
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                <div style={{display: "flex", gap: "8px", justifyContent: "center"}}>
                                    {/* Nút xem chi tiết - luôn hiện */}
                                    <button
                                        onClick={() => handleShow(order.id)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "6px",
                                            borderRadius: "8px",
                                            backgroundColor: "transparent",
                                            cursor: "pointer",
                                            transition: "all 0.15s",
                                        }}
                                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E0F2FE")}
                                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                        title="Xem chi tiết"
                                    >
                                        <Pencil style={{width: "20px", height: "20px", color: "#0284C7"}}/>
                                    </button>

                                    {/* Nút HỦY ĐƠN HÀNG - CHỈ HIỆN KHI "Chờ xác nhận" */}
                                    {canCancel && (
                                        <button
                                            onClick={() => handleCancel(order.id)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: "6px",
                                                borderRadius: "8px",
                                                backgroundColor: "transparent",
                                                cursor: "pointer",
                                                transition: "all 0.15s",
                                            }}
                                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FEE2E2")}
                                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                            title="Hủy đơn hàng"
                                        >
                                            <Trash2 style={{width: "20px", height: "20px", color: "#DC2626"}}/>
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

            {/* ==================== MODAL CHI TIẾT ĐƠN HÀNG ==================== */}
            {modal && data && (
                <>
                    {/* Overlay */}
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            zIndex: 1000,
                        }}
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#fff",
                            borderRadius: "12px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                            zIndex: 1001,
                            width: "1000px",
                            maxWidth: "95%",
                            maxHeight: "85vh",
                            overflowY: "auto",
                            padding: "30px",
                        }}
                    >
                        <h2 style={{fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#000"}}>
                            Chi tiết đơn hàng
                        </h2>

                        {/* Xác định có được phép chỉnh sửa không */}
                        {(() => {
                            const canEdit = isPending(data.status);

                            return (
                                <>
                                    {/* 2 cột thông tin */}
                                    <div style={{display: "flex", gap: "20px", marginBottom: "20px"}}>
                                        {/* Cột trái */}
                                        <div style={{flex: 1, display: "flex", flexDirection: "column", gap: "15px"}}>
                                            <div>
                                                <label style={{
                                                    display: "block",
                                                    fontWeight: "bold",
                                                    color: "#000",
                                                    marginBottom: "5px"
                                                }}>
                                                    Mã đơn hàng
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data?.code || ""}
                                                    readOnly
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px",
                                                        borderRadius: "6px",
                                                        border: "1px solid #ccc",
                                                        backgroundColor: "#f9f9f9"
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{
                                                    display: "block",
                                                    fontWeight: "bold",
                                                    color: "#000",
                                                    marginBottom: "5px"
                                                }}>Địa chỉ</label>
                                                <input
                                                    type="text"
                                                    value={editData.address}
                                                    onChange={(e) => setEditData(prev => ({
                                                        ...prev,
                                                        address: e.target.value
                                                    }))}
                                                    readOnly={!canEdit}
                                                    disabled={!canEdit}
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px",
                                                        borderRadius: "6px",
                                                        border: "1px solid #ccc",
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{
                                                    display: "block",
                                                    fontWeight: "bold",
                                                    color: "#000",
                                                    marginBottom: "5px"
                                                }}>
                                                    Ngày đặt
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data?.createdDate ? new Date(data.createdDate).toLocaleDateString("vi-VN") : "N/A"}
                                                    readOnly
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px",
                                                        borderRadius: "6px",
                                                        border: "1px solid #ccc",
                                                        backgroundColor: "#f9f9f9"
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Cột phải */}
                                        <div style={{flex: 1, display: "flex", flexDirection: "column", gap: "15px"}}>
                                            <div>
                                                <label style={{
                                                    display: "block",
                                                    fontWeight: "bold",
                                                    color: "#000",
                                                    marginBottom: "5px"
                                                }}>
                                                    Trạng thái
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data?.status || ""}
                                                    readOnly={!canEdit}
                                                    disabled={!canEdit}
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px",
                                                        borderRadius: "6px",
                                                        border: "1px solid #ccc",
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{
                                                    display: "block",
                                                    fontWeight: "bold",
                                                    color: "#000",
                                                    marginBottom: "5px"
                                                }}>
                                                    Khách hàng
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data?.accountName || ""}
                                                    readOnly
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px",
                                                        borderRadius: "6px",
                                                        border: "1px solid #ccc",
                                                        backgroundColor: "#f9f9f9"
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{
                                                    display: "block",
                                                    fontWeight: "bold",
                                                    color: "#000",
                                                    marginBottom: "5px"
                                                }}>
                                                    Phone
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data?.phone || ""}
                                                    readOnly
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px",
                                                        borderRadius: "6px",
                                                        border: "1px solid #ccc",
                                                        backgroundColor: "#f9f9f9"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ghi chú */}
                                    <div>
                                        <label style={{
                                            display: "block",
                                            fontWeight: "bold",
                                            color: "#000",
                                            marginBottom: "5px"
                                        }}>Ghi chú</label>
                                        <textarea
                                            rows={3}
                                            value={editData.notes}
                                            onChange={(e) => setEditData(prev => ({...prev, notes: e.target.value}))}
                                            readOnly={!canEdit}
                                            disabled={!canEdit}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                borderRadius: "6px",
                                                border: "1px solid #ccc",
                                                resize: "vertical"
                                            }}
                                        />
                                    </div>

                                    {/* Bảng sản phẩm */}
                                    <div style={{marginTop: "20px"}}>
                                        <label style={{
                                            display: "block",
                                            fontWeight: "bold",
                                            color: "#000",
                                            marginBottom: "10px"
                                        }}>
                                            Danh sách sản phẩm
                                        </label>
                                        <div style={{overflowX: "auto"}}>
                                            <table style={{
                                                width: "100%",
                                                borderCollapse: "collapse",
                                                border: "1px solid #ccc"
                                            }}>
                                                <thead style={{backgroundColor: "#f3f3f3"}}>
                                                <tr>
                                                    <th style={{
                                                        border: "1px solid #ccc",
                                                        padding: "8px",
                                                        textAlign: "left",
                                                        fontWeight: "bold",
                                                        color: "#000"
                                                    }}>STT
                                                    </th>
                                                    <th style={{
                                                        border: "1px solid #ccc",
                                                        padding: "8px",
                                                        textAlign: "left",
                                                        fontWeight: "bold",
                                                        color: "#000"
                                                    }}>Tên sản phẩm
                                                    </th>
                                                    <th style={{
                                                        border: "1px solid #ccc",
                                                        padding: "8px",
                                                        textAlign: "left",
                                                        fontWeight: "bold",
                                                        color: "#000"
                                                    }}>Thuộc tính
                                                    </th>
                                                    <th style={{
                                                        border: "1px solid #ccc",
                                                        padding: "8px",
                                                        textAlign: "left",
                                                        fontWeight: "bold",
                                                        color: "#000"
                                                    }}>Số lượng
                                                    </th>
                                                    <th style={{
                                                        border: "1px solid #ccc",
                                                        padding: "8px",
                                                        textAlign: "left",
                                                        fontWeight: "bold",
                                                        color: "#000"
                                                    }}>Giá
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {ordersDetails.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td style={{
                                                            border: "1px solid #ccc",
                                                            padding: "8px",
                                                            width: '50px',
                                                            textAlign: "center",
                                                        }}>{index + 1}</td>

                                                        <td
                                                            style={{
                                                                border: "1px solid #ccc",
                                                                padding: "8px",
                                                                width: '450px'
                                                            }}
                                                        >
                                                            <a
                                                                href={`/course/${item.productId}`}
                                                                style={{color: "#007bff", textDecoration: "none"}}
                                                            >
                                                                {item.productName}
                                                            </a>
                                                        </td>

                                                        <td style={{
                                                            border: "1px solid #ccc",
                                                            padding: "8px",
                                                            width: '200px'
                                                        }}>
                                                            {item.variant.attributeValues.map(attr => attr.value).join(", ")}
                                                        </td>

                                                        <td style={{
                                                            border: "1px solid #ccc",
                                                            padding: "8px",
                                                            width: '105px',
                                                            textAlign: "center",
                                                        }}>{item.quantity}</td>
                                                        <td style={{
                                                            border: "1px solid #ccc",
                                                            padding: "8px"
                                                        }}>{formatCurrency(item.price)}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Tổng tiền */}
                                    <div style={{marginTop: "30px", textAlign: "right"}}>
                                        <div style={{marginBottom: "12px", fontSize: "16px"}}>
                                            <span style={{display: "inline-block", minWidth: "140px", color: "#555"}}>Tổng tiền sản phẩm :</span>
                                            <span style={{marginLeft: "20px", fontWeight: "bold", color: "#000"}}>
                                                {formatCurrency(ordersDetails.reduce((total, item) => total + item.price * item.quantity, 0))}
                                            </span>
                                        </div>

                                        <div style={{marginBottom: "12px", fontSize: "16px"}}>
                                            <span style={{display: "inline-block", minWidth: "140px", color: "#555"}}>Phí vận chuyển:</span>
                                            <span style={{marginLeft: "20px", fontWeight: "bold", color: "#000"}}>
                                                {formatCurrency(data?.ship || 30000)}
                                            </span>
                                        </div>
                                        <div style={{marginBottom: "12px", fontSize: "16px"}}>
                                            <span style={{display: "inline-block", minWidth: "140px", color: "#555"}}>Phương thức thanh toán:</span>
                                            <span style={{marginLeft: "20px", fontWeight: "bold", color: "#000"}}>
                                                {methodPayment.paymentMethod}
                                            </span>
                                        </div>
                                        <div style={{
                                            fontSize: "18px",
                                            paddingTop: "12px",
                                            borderTop: "2px solid #e5e7eb"
                                        }}>
                                            <span style={{
                                                display: "inline-block",
                                                minWidth: "140px",
                                                fontWeight: "bold",
                                                color: "#000"
                                            }}>
                                                Tổng thanh toán:
                                            </span>
                                            <span style={{
                                                marginLeft: "20px",
                                                fontSize: "22px",
                                                fontWeight: "bold",
                                                color: "#dc2626"
                                            }}>
                                                {formatCurrency(
                                                    ordersDetails.reduce((total, item) => total + item.price * item.quantity, 0) + (data?.ship || 30000)
                                                )}
                                            </span>
                                        </div>

                                    </div>

                                    {/* Nút hành động */}
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginTop: "20px",
                                        gap: "10px"
                                    }}>
                                        <button
                                            onClick={handleClose}
                                            style={{
                                                padding: "8px 16px",
                                                borderRadius: "6px",
                                                backgroundColor: "#dc2626",
                                                color: "#fff",
                                                fontWeight: "bold",
                                                border: "none",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                            }}
                                        >
                                            Đóng
                                        </button>

                                        {/* Chỉ hiện nút Lưu khi đang "Chờ xác nhận" */}
                                        {canEdit && (
                                            <button
                                                onClick={handleSave}
                                                style={{
                                                    padding: "8px 16px",
                                                    borderRadius: "6px",
                                                    backgroundColor: "#2563eb",
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Lưu thay đổi
                                            </button>
                                        )}
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </>
            )}
        </div>
    );
}