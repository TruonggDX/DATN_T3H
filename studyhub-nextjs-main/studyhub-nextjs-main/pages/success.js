import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import paymentService from "@/service/paymentService";
import orderService from "@/service/orderService";
import cartService from "@/service/cartService";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { useCart } from "@/hooks/CartContext";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { removeAllData } = useCart();

    const isProcessing = useRef(false);

    const getSelectedCourses = async () => {
        try {
            const res = await cartService.getAllCart();
            return res.content || [];
        } catch (err) {
            console.error("Lỗi lấy giỏ hàng:", err);
            return [];
        }
    };

    const createOrder = async (paymentMethod = {}) => {
        if (isProcessing.current) return;
        isProcessing.current = true;

        try {
            const selectedCourses = await getSelectedCourses();
            if (selectedCourses.length === 0) {
                console.warn("Giỏ hàng rỗng");
                return;
            }
            const newAddress = localStorage.getItem('address');
            const newNotes = localStorage.getItem('notes');
            const billRes = await orderService.createBill({
                status: "Chờ xác nhận",
                address: newAddress,
                notes: newNotes,
                ship: 30000,
            });
            const orderId = billRes.data.id;
            const detailPromises = selectedCourses.map((item) => {
                return orderService.createBillDetails({
                    orderId: orderId,
                    productId: item.product.id,
                    variantId: item.variant.id,
                    quantity: item.number,
                    price: item.variant.price,
                });
            });
            await Promise.all(detailPromises);

            await paymentService.createPaymentMethod({
                paymentMethod: paymentMethod,
                orderId: orderId
            });

            const cartItemIds = selectedCourses.map(item => item.id);
            await removeAllData(cartItemIds);
            localStorage.removeItem('orderId');
            localStorage.removeItem('address');
            localStorage.removeItem('notes');
            console.log("Đơn hàng tạo thành công:", orderId);
        } catch (err) {
            console.error("Lỗi tạo đơn hàng:", err);
        } finally {
            isProcessing.current = false;
        }
    };

    // VNPay
    useEffect(() => {
        const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
        if (vnp_ResponseCode === '00') {
            paymentService.handleVNPayReturn(searchParams)
                .then(() => createOrder("VNPay"))
                .catch(console.error);
        } else if (vnp_ResponseCode) {
            router.replace('/result_payment?status=failed');
        }
    }, [searchParams]);

    // MoMo
    useEffect(() => {
        const orderId = localStorage.getItem('orderId');
        if (!orderId) return;

        const checkMoMo = async () => {
            try {
                const res = await paymentService.codeMomoReturn(orderId);
                if (res.resultCode === 0) {
                    await createOrder("MoMo");
                } else {
                    router.replace('/result_payment?status=failed');
                }
            } catch (err) {
                console.error(err);
            }
        };
        checkMoMo();
    }, []);

    // ZaloPay
    useEffect(() => {
        const apptransid = searchParams.get('apptransid');
        if (!apptransid) return;

        paymentService.statusZaloPay(apptransid)
            .then((result) => {
                if (result.return_code === 1) {
                    createOrder("ZaloPay");
                } else {
                    router.replace('/result_payment?status=failed');
                }
            })
            .catch(() => {
                router.replace('/result_payment?status=failed');
            });
    }, [searchParams]);

    // Tiền mặt (COD) – chuyển từ CheckoutArea sang đây
    // useEffect(() => {
    //     const isCod = searchParams.get('cod') === '1';
    //     if (isCod) {
    //         createOrder("Tiền mặt", {
    //             address: searchParams.get('address') || "",
    //             notes: searchParams.get('notes') || "",
    //         });
    //     }
    // }, [searchParams]);

    return (
        <main>
            <Header headerClass="header-one v-2 header--sticky" topbarEnable={true} menuItemsLeft={true} />

            <div className="payment-success-container">
                <div className="payment-success-box">
                    <img
                        src="https://png.pngtree.com/png-vector/20240705/ourmid/pngtree-green-tick-mark-green-tick-png-image_12888798.png"
                        alt="success"
                        className="success-icon"
                    />
                    <h2 className="success-title">Thanh toán thành công!</h2>
                    <p className="success-description">
                        Cảm ơn bạn đã mua sản phẩm. Đơn hàng của bạn đang được xử lý.
                    </p>
                    <a href="/" className="success-btn">
                        Tiếp tục mua sắm
                    </a>
                </div>
            </div>

            <Footer footerClass="footer-callto-action-area bg-light-1" footerLogo="/images/logo/logo-1.svg" />

            <style jsx>{`
                .payment-success-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 70vh;
                    background-color: #f9fafb;
                    padding: 20px;
                }
                .payment-success-box {
                    text-align: center;
                    background-color: #fff;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    max-width: 500px;
                    width: 100%;
                }
                .success-icon { width: 80px; height: 80px; margin-bottom: 20px; }
                .success-title { font-size: 28px; color: #2d3748; margin-bottom: 12px; font-weight: bold; }
                .success-description { font-size: 18px; color: #4a5568; margin-bottom: 20px; }
                .success-btn {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #4CAF50;
                    color: #fff;
                    border-radius: 8px;
                    text-decoration: none;
                    font-size: 16px;
                    font-weight: 500;
                }
                .success-btn:hover { background-color: #45a049; }
            `}</style>
        </main>
    );
}