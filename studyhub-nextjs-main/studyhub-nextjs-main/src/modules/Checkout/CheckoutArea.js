import Image from "next/image";
import {useEffect, useState} from "react";
import auth from "@/service/auth";
import cartService from "@/service/cartService";
import {formatCurrency} from "@/utils/utils";
import paymentService from "@/service/paymentService";
import orderService from "@/service/orderService";
import {useCart} from "@/hooks/CartContext";
import {useRouter} from "next/router";

export default function CheckoutArea() {

    const [account, setAccount] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [total, setTotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const {removeAllData} = useCart();
    const router = useRouter();

    useEffect(() => {
        auth.getUser()
            .then((response) => setAccount(response.data))
            .catch((e) => console.error(e));

        cartService.getAllCart().then((response) => {
            setSelectedCourses(response.content || []);
        });
    }, []);

    /* ================== TÍNH TOTAL CÓ DISCOUNT ================== */
    useEffect(() => {
        const totalAmount = selectedCourses.reduce((sum, item) => {
            const price = item.variant.price;
            const discount = item.variant.discount || 0;
            const finalPrice = discount > 0
                ? price * (1 - discount / 100)
                : price;
            return sum + finalPrice * item.number;
        }, 0);
        setTotal(totalAmount);
    }, [selectedCourses]);

    const [newObject, setNewObject] = useState({
        status: "Chờ xác nhận",
        address: "",
        notes: "",
        ship: 30000
    });

    const handlePayment = async (e) => {
        e.preventDefault();

        if (paymentMethod === "VNPay") {
            try {
                const response = await paymentService.createVNPay(total, "NCB");
                if (response?.paymentUrl) {
                    window.location.href = response.paymentUrl;
                }
            } catch (error) {
                console.error(error);
            }

        } else if (paymentMethod === "MoMo") {
            try {
                const amount = Number(total) + 30000;
                const res = await paymentService.createMomo({amount});
                localStorage.setItem('orderId', res.orderId);
                window.location.href = res.payUrl;
            } catch (e) {
                console.error(e);
            }

        } else if (paymentMethod === "ZaloPay") {
            try {
                const res = await paymentService.createZaloPay({amount: total});
                window.location.href = res.order_url;
            } catch (e) {
                console.error(e);
            }

        } else if (paymentMethod === "Tiền mặt") {
            try {
                const response = await orderService.createBill(newObject);
                const orderId = response.data.id;

                const obj = {
                    paymentMethod,
                    orderId
                };

                const orderDetailPromises = selectedCourses.map((item) => {
                    const price = item.variant.price;
                    const discount = item.variant.discount || 0;
                    const finalPrice = discount > 0
                        ? price * (1 - discount / 100)
                        : price;

                    return orderService.createBillDetails({
                        orderId,
                        productId: item.product.id,
                        variantId: item.variant.id,
                        quantity: item.number,
                        price: finalPrice,
                    });
                });

                await Promise.all(orderDetailPromises);
                await paymentService.createPaymentMethod(obj);

                const cartItemIds = selectedCourses.map(item => item.id);
                await removeAllData(cartItemIds);

                if (response?.code === 200 || response?.data) {
                    router.push('/success2');
                }
            } catch (e) {
                console.error(e);
            }

        } else {
            alert("Vui lòng chọn phương thức thanh toán !!!");
        }
    };

    return (
        <div className="ms-main">
            <div className="ms-page-content">
                <header className="ms-sp--header container">
                    <h1 className="ms-sp--title">Thanh toán</h1>
                </header>

                <div className="ms-default-page container entry-content">
                    <div className="woocommerce">
                        <form
                            name="checkout"
                            method="post"
                            className="checkout woocommerce-checkout ms-woocommerce-checkout"
                            noValidate
                        >
                            <div className="row">
                                {/* ================= LEFT ================= */}
                                <div className="col-lg-7">
                                    <div className="full-grid">
                                        <div className="billing-fields">
                                            <div className="checkout-title">
                                                <h3 className="animated fadeIn">Chi tiết thanh toán</h3>
                                            </div>

                                            <div className="form-content-box">
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <label>Họ tên</label>
                                                            <input
                                                                value={account?.fullname || ""}
                                                                className="form-control-mod"
                                                                type="text"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <label>Số điện thoại</label>
                                                            <input
                                                                value={account?.phone || ""}
                                                                className="form-control-mod"
                                                                type="text"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input
                                                            value={account?.email || ""}
                                                            className="form-control-mod"
                                                            type="text"
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="form-group">
                                                        <label>Địa chỉ nhận hàng</label>
                                                        <input
                                                            className="form-control-mod"
                                                            type="text"
                                                            required
                                                            value={newObject.address}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                setNewObject(prev => ({...prev, address: value}));
                                                                localStorage.setItem("address", value);
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="form-group">
                                                        <label>Ghi chú</label>
                                                        <textarea
                                                            className="form-control-mod"
                                                            rows={5}
                                                            value={newObject.notes}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                setNewObject(prev => ({...prev, notes: value}));
                                                                localStorage.setItem("notes", value);
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label>Phương thức thanh toán</label>
                                                            <select
                                                                className="d-block"
                                                                style={{height: '60px'}}
                                                                required
                                                                value={paymentMethod}
                                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                            >
                                                                <option value="">Chọn phương thức thanh toán</option>
                                                                <option value="Tiền mặt">Tiền mặt</option>
                                                                <option value="MoMo">MoMo</option>
                                                                {/*<option value="VNPay">VNPay</option>*/}
                                                                {/*<option value="ZaloPay">ZaloPay</option>*/}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ================= RIGHT ================= */}
                                <div className="col-lg-5 pl--30 pl_sm--15 pl_md--15">
                                    <h3 id="order_review_heading" className="animated fadeIn">
                                        Đơn hàng của bạn
                                    </h3>

                                    <div id="order_review" className="woocommerce-checkout-review-order">
                                        <table
                                            className="ms-checkout-review-order-table shop_table woocommerce-checkout-review-order-table">
                                            <tbody>
                                            {selectedCourses.map((course) => {
                                                const price = course.variant.price;
                                                const discount = course.variant.discount || 0;
                                                const finalPrice = discount > 0
                                                    ? price * (1 - discount / 100)
                                                    : price;

                                                return (
                                                    <tr key={course.id} className="cart_item">
                                                        <td colSpan="2">
                                                            <div
                                                                className="ms-checkout-product"
                                                                style={{
                                                                    display: 'flex',
                                                                    gap: '10px',
                                                                    alignItems: 'center'
                                                                }}
                                                            >

                                                                {/* IMAGE + DISCOUNT */}
                                                                <div
                                                                    className="ms-checkout-product__thumbnail"
                                                                    style={{
                                                                        flexShrink: 0,
                                                                        position: "relative"
                                                                    }}
                                                                >
                                                                    {discount > 0 && (
                                                                        <div
                                                                            style={{
                                                                                position: "absolute",
                                                                                top: 6,
                                                                                right: 6,
                                                                                background: "#ff3b30",
                                                                                color: "#fff",
                                                                                fontSize: 12,
                                                                                fontWeight: 600,
                                                                                padding: "4px 8px",
                                                                                borderRadius: 6,
                                                                                zIndex: 2,
                                                                            }}
                                                                        >
                                                                            -{discount}%
                                                                        </div>
                                                                    )}

                                                                    <Image
                                                                        src={course.product.imageDtos?.[0]?.url}
                                                                        alt="product-thumb"
                                                                        width={100}
                                                                        height={100}
                                                                        style={{
                                                                            borderRadius: '6px',
                                                                            objectFit: 'cover'
                                                                        }}
                                                                    />
                                                                </div>

                                                                {/* CONTENT */}
                                                                <div
                                                                    className="ms-checkout-product__content"
                                                                    style={{
                                                                        flex: 1,
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        gap: '4px'
                                                                    }}
                                                                >
                                                                    <h5
                                                                        title={course.product.name}
                                                                        style={{
                                                                            margin: 0,
                                                                            fontSize: '16px',
                                                                            fontWeight: 600,
                                                                            lineHeight: '1.2',
                                                                            display: '-webkit-box',
                                                                            WebkitLineClamp: 1,
                                                                            WebkitBoxOrient: 'vertical',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                        }}
                                                                    >
                                                                        {course.product.name}
                                                                    </h5>

                                                                    <div
                                                                        style={{
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                            gap: "4px",
                                                                            fontSize: 14
                                                                        }}
                                                                    >
                                                                        <span>Số lượng: <b>{course.number}</b></span>

                                                                        {discount > 0 ? (
                                                                            <span>
                                                                                Giá:
                                                                                <span
                                                                                    style={{
                                                                                        textDecoration: "line-through",
                                                                                        color: "#999",
                                                                                        marginLeft: 6,
                                                                                        marginRight: 6
                                                                                    }}
                                                                                >
                                                                                    {formatCurrency(price)}
                                                                                </span>
                                                                                <b style={{color: "#e11d48"}}>
                                                                                    {formatCurrency(finalPrice)}
                                                                                </b>
                                                                            </span>
                                                                        ) : (
                                                                            <span>Giá: <b>{formatCurrency(price)}</b></span>
                                                                        )}

                                                                        <span>
                                                                            Thuộc tính: {course.variant.attributeValues?.map(a => a.value).join(" - ")}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>

                                            <tfoot>
                                            <tr className="cart-subtotal">
                                                <th>Tổng tiền hàng</th>
                                                <td>
                                                    <span className="woocommerce-Price-amount amount"
                                                          style={{color: "black"}}>
                                                        <b>{formatCurrency(total)}</b>
                                                    </span>
                                                </td>
                                            </tr>

                                            <tr className="cart-subtotal">
                                                <th>Phí ship</th>
                                                <td>
                                                    <span className="woocommerce-Price-amount amount"
                                                          style={{color: "black"}}>
                                                        <b>{formatCurrency(30000)}</b>
                                                    </span>
                                                </td>
                                            </tr>

                                            <tr className="cart-subtotal">
                                                <th>Tổng tiền</th>
                                                <td>
                                                    <span className="woocommerce-Price-amount amount"
                                                          style={{color: "black"}}>
                                                        <b>{formatCurrency(Number(total) + 30000)}</b>
                                                    </span>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>

                                        <div id="payment" className="woocommerce-checkout-payment">
                                            <div className="form-row place-order">
                                                <div className="ms-proceed-to-checkout wc-proceed-to-checkout">
                                                    <button
                                                        type="button"
                                                        onClick={handlePayment}
                                                        className="rts-btn btn-primary button"
                                                    >
                                                        Thanh toán
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
    );
}
