import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default function Success2() {

    return (
        <main>
            <Header
                headerClass="header-one v-2 header--sticky"
                topbarEnable={true}
                menuItemsLeft={true}
            />

            <div className="payment-success-container">
                <div className="payment-success-box">
                    <img
                        src="https://png.pngtree.com/png-vector/20240705/ourmid/pngtree-green-tick-mark-green-tick-png-image_12888798.png"
                        alt="success"
                        className="success-icon"
                    />
                    <h2 className="success-title">Thanh toán thành công!</h2>
                    <p className="success-description">
                        Cảm ơn bạn đã mua sản phẩm
                    </p>
                    <a href="/" className="success-btn">
                        Tiếp tục mua sắm
                    </a>
                </div>
            </div>

            <Footer
                footerClass="footer-callto-action-area bg-light-1"
                footerLogo="/images/logo/logo-1.svg"
            />

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
                    background-color: #ffffff;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    max-width: 500px;
                    width: 100%;
                }

                .success-icon {
                    width: 80px;
                    height: 80px;
                    margin-bottom: 20px;
                }

                .success-title {
                    font-size: 28px;
                    color: #2d3748;
                    margin-bottom: 12px;
                    font-weight: bold;
                }

                .success-description {
                    font-size: 18px;
                    color: #4a5568;
                    margin-bottom: 20px;
                }

                .success-btn {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #4CAF50;
                    color: #ffffff;
                    border-radius: 8px;
                    text-decoration: none;
                    font-size: 16px;
                    font-weight: 500;
                    transition: background-color 0.2s ease-in-out;
                }

                .success-btn:hover {
                    background-color: #45a049;
                }
            `}</style>
        </main>
    );

}