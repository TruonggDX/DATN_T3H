import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default function ResultPaymentFail() {
    return (
        <main>
            <Header
                headerClass="header-one v-2 header--sticky"
                topbarEnable={true}
                menuItemsLeft={true}
            />

            <div className="payment-fail-container">
                <div className="payment-fail-box">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/190/190406.png"
                        alt="failure"
                        className="fail-icon"
                    />
                    <h2 className="fail-title">Thanh toán thất bại!</h2>
                    <p className="fail-description">
                        Rất tiếc, đã có lỗi xảy ra trong quá trình thanh toán.
                        Vui lòng thử lại sau hoặc liên hệ với bộ phận hỗ trợ.
                    </p>
                    <a href="/" className="fail-btn">
                        Thử lại
                    </a>
                </div>
            </div>

            <Footer
                footerClass="footer-callto-action-area bg-light-1"
                footerLogo="/images/logo/logo-1.svg"
            />

            <style jsx>{`
               .payment-fail-container {
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   min-height: 70vh;
                   background-color: #fef2f2;
                   padding: 20px;
               }
               .payment-fail-box {
                   text-align: center;
                   background-color: #ffffff;
                   padding: 40px;
                   border-radius: 12px;
                   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                   max-width: 500px;
                   width: 100%;
               }
               .fail-icon {
                   width: 80px;
                   height: 80px;
                   margin-bottom: 20px;
               }
               .fail-title {
                   font-size: 28px;
                   color: #b91c1c;
                   margin-bottom: 12px;
                   font-weight: bold;
               }
               .fail-description {
                   font-size: 18px;
                   color: #7f1d1d;
                   margin-bottom: 20px;
               }
               .fail-btn {
                   display: inline-block;
                   padding: 12px 24px;
                   background-color: #dc2626;
                   color: #ffffff;
                   border-radius: 8px;
                   text-decoration: none;
                   font-size: 16px;
                   font-weight: 500;
                   transition: background-color 0.2s ease-in-out;
               }
               .fail-btn:hover {
                   background-color: #b91c1c;
               }
           `}</style>
        </main>
    );
}
