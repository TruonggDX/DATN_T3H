import Image from "next/image";
import {useEffect, useState} from "react";
import auth from "@/service/auth";
import cartService from "@/service/cartService";
import {formatCurrency} from "@/utils/utils";
import paymentService from "@/service/paymentService";
import orderService from "@/service/orderService";
import {useCart} from "@/hooks/CartContext";
import {router} from "next/client";

export default function CheckoutArea() {

    const [account, setAccount] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [total, setTotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const {removeAllData} = useCart();

    useEffect(() => {
        auth.getUser().then((response) => {
            setAccount(response.data);
        }).catch((e) => console.error(e));
        cartService.getAllCart().then((response) => {
            setSelectedCourses(response.content);
        })
    }, []);

    useEffect(() => {
        const totalAmount = selectedCourses.reduce((item, course) => item + course.variant.price * course.number * (1), 0);
        setTotal(totalAmount)
    }, [selectedCourses]);

    const [newObject, setNewObject] = useState({
        status: "Chờ xác nhận",
        address: "",
        notes: "",
        ship: 30000
    });
    const handlePayment = async (e) => {
        e.preventDefault()
        if (paymentMethod === "VNPay") {
            try {
                const response = await paymentService.createVNPay(total, "NCB");
                if (response && response.paymentUrl) {
                    window.location.href = response.paymentUrl;
                } else {
                    console.error(response);
                }
            } catch (error) {
                console.error(error);
            }
        } else if (paymentMethod === "MoMo") {
            try {
                const amount = Number(total) + 30000
                const req = {amount}
                const res = await paymentService.createMomo(req);
                localStorage.setItem('orderId', res.orderId);
                window.location.href = res.payUrl;
            } catch (e) {
                console.error(e);
            }
        } else if (paymentMethod === "ZaloPay") {
            try {
                const amount = {
                    "amount": total
                }
                const res = await paymentService.createZaloPay(amount);
                window.location.href = res.order_url;
            } catch (e) {
                console.error(e);
            }
        } else if (paymentMethod === "Tiền mặt") {
            try {
                const response = await orderService.createBill(newObject);
                const orderId = response.data.id;
                const obj = {
                    paymentMethod: paymentMethod,
                    orderId: orderId
                }
                const orderDetailPromises = selectedCourses.map((item) => {
                    const orderDetail = {
                        orderId: orderId,
                        productId: item.product.id,
                        variantId: item.variant.id,
                        quantity: item.number,
                        price: item.variant.price,
                    };
                    return orderService.createBillDetails(orderDetail);
                });
                await Promise.all(orderDetailPromises);
                paymentService.createPaymentMethod(obj).then().catch((e) => console.error(e));
                const cartItemIds = selectedCourses.map(item => item.id);
                try {
                    await removeAllData(cartItemIds);
                } catch (e) {
                    console.error(e);
                }
                if (response && response.code === 200) {
                   router.push('/success2')
                } else {
                    console.error("Lỗi tạo đơn:", response);
                }
            } catch (e) {
                console.error(e)
            }
        } else {
            alert("Vui lòng chọn phương thức thanh toán !!!")
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
                        <div className="woocommerce-notices-wrapper"></div>
                        <form name="checkout" method="post"
                              className="checkout woocommerce-checkout ms-woocommerce-checkout" action="#"
                              enctype="multipart/form-data" novalidate="novalidate">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="full-grid">
                                        <div className="billing-fields">
                                            <div className="checkout-title">
                                                <h3 className="animated fadeIn">Chi tiết thanh toán</h3>
                                            </div>
                                            <div className="form-content-box">
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                                        <div className="form-group">
                                                            <label>Họ tên</label>
                                                            <input id="fname" name="fname" value={account?.fullname}
                                                                   className="form-control-mod"
                                                                   type="text" required=""/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                                        <div className="form-group">
                                                            <label>Số điện thoại </label>
                                                            <input id="fname" name="fname" value={account?.phone}
                                                                   className="form-control-mod"
                                                                   type="text" required=""/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <label>Email </label>
                                                        <input id="lname" name="lname" value={account?.email}
                                                               className="form-control-mod"
                                                               type="text" required=""/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <label>Địa chỉ nhận hàng </label>
                                                        <input id="address" name="address"
                                                               className="form-control-mod"
                                                               type="text" required=""
                                                               value={newObject.address}
                                                               onChange={(e) => {
                                                                   const value = e.target.value;
                                                                   setNewObject(prev => ({ ...prev, address: value }));
                                                                   localStorage.setItem("address", value);
                                                               }}
                                                               // onChange={(e) =>
                                                               //     setNewObject({...newObject, address: e.target.value})
                                                               // }

                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <label>Ghi chú </label>
                                                        <textarea id="notes" name="notes"
                                                                  className="form-control-mod"
                                                                  rows={5} required=""
                                                                  value={newObject.notes}
                                                                  onChange={(e) => {
                                                                      const value = e.target.value;
                                                                      setNewObject(prev => ({ ...prev, notes: value }));
                                                                      localStorage.setItem("notes", value);
                                                                  }}
                                                                  // onChange={(e) =>
                                                                  //     setNewObject({
                                                                  //         ...newObject,
                                                                  //         notes: e.target.value
                                                                  //     })
                                                                  // }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                                        <div className="form-group">
                                                            <label>Phương thức thanh toán</label>
                                                            <select
                                                                className="d-block"
                                                                style={{height: '60px'}}
                                                                required=""
                                                                value={paymentMethod}
                                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                            >
                                                                <option value="">Chọn phương thức thanh toán</option>
                                                                <option value="Tiền mặt">Tiền mặt</option>
                                                                {/*<option value="VNPay">VN Pay</option>*/}
                                                                <option value="MoMo">Momo</option>
                                                                {/*<option value="ZaloPay">ZaloPay</option>*/}
                                                            </select>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 pl--30 pl_sm--15 pl_md--15">
                                    <h3 id="order_review_heading" className="animated fadeIn">Đơn hàng của bạn</h3>
                                    <div id="order_review" className="woocommerce-checkout-review-order">
                                        <table
                                            className="ms-checkout-review-order-table shop_table woocommerce-checkout-review-order-table">
                                            <tbody>
                                            {selectedCourses.map((course) => {
                                                return (
                                                    <tr key={course.id} className="cart_item">
                                                        <td colSpan="2">
                                                            <div className="ms-checkout-product" style={{
                                                                display: 'flex',
                                                                gap: '10px',
                                                                alignItems: 'center'
                                                            }}>

                                                                {/* Ảnh sản phẩm */}
                                                                <div className="ms-checkout-product__thumbnail"
                                                                     style={{flexShrink: 0}}>
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

                                                                {/* Nội dung sản phẩm */}
                                                                <div className="ms-checkout-product__content" style={{
                                                                    flex: 1,
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    gap: '4px'
                                                                }}>
                                                                    {/* Tên sản phẩm */}
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

                                                                    <div style={{
                                                                        display: "flex",
                                                                        flexDirection: "column",
                                                                        gap: "4px"
                                                                    }}>
                                                                        <span>Số lượng: <b>{course.number}</b></span>
                                                                        <span>Tiền: <b>{formatCurrency(course.variant.price)}</b></span>
                                                                        <span>
                                                                            Thuộc tính: {course.variant.attributeValues?.map(a => a.value).join(" - ")}
                                                                        </span>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                            <tfoot>
                                            <tr className="cart-subtotal">
                                                <th>Tổng tiền hàng</th>
                                                <td>
                                                   <span
                                                       className="woocommerce-Price-amount amount"
                                                       style={{color: "black"}}
                                                   >
                                                    <b>{formatCurrency(total.toFixed(2))}</b>
                                                </span>


                                                </td>
                                            </tr>
                                            <tr className="cart-subtotal">
                                                <th>Phí ship</th>
                                                <td>
                                                   <span
                                                       className="woocommerce-Price-amount amount"
                                                       style={{color: "black"}}
                                                   >
                                                    <b>{formatCurrency(30000)}</b>
                                                </span>


                                                </td>
                                            </tr>
                                            <tr className="cart-subtotal">
                                                <th>Tổng tiền</th>
                                                <td>
                                                   <span
                                                       className="woocommerce-Price-amount amount"
                                                       style={{color: "black"}}
                                                   >
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
                                                        className="rts-btn btn-primary button">
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
    )
}
