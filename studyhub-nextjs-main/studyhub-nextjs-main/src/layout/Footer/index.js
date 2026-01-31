import Link from "next/link"

export default function Footer(props) {
    const {footerLogo, footerClass, CTAEnable} = props

    return (
        <footer className={footerClass || 'footer-callto-action-area bg-light-1'}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {/* footer main wrapper */}
                        <div className="footer-one-main-wrapper ptb--100">
                            {/* single sized  footer  */}
                            <div className="footer-singl-wized left-logo">
                                <div className="head">
                                    <h6 className="title">Địa chỉ</h6>
                                </div>
                                <div className="body">
                                    <ul className="wrapper-list">
                                        <li><i className="fa-regular fa-location-dot"></i>Quận Hoàn Kiếm, Hà Nội, Việt
                                            Nam
                                        </li>
                                        <li><i className="fa-regular fa-phone"></i><a href="tel:+84333378901">+84 33 337
                                            8901</a></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Quick Links – Các trang khách hay vào nhất */}
                            <div className="footer-singl-wized">
                                <div className="head">
                                    <h6 className="title">Mua sắm</h6>
                                </div>
                                <div className="body">
                                    <ul className="menu">
                                        <li><Link href="/collections/new">Hàng mới về</Link></li>
                                        <li><Link href="/collections/sale">Sale lên đến 50%</Link></li>
                                        <li><Link href="/collections/best-seller">Best Seller</Link></li>
                                        <li><Link href="/size-chart">Bảng size & Hướng dẫn chọn size</Link></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Explore – Hỗ trợ & thông tin shop */}
                            <div className="footer-singl-wized">
                                <div className="head">
                                    <h6 className="title">Hỗ trợ</h6>
                                </div>
                                <div className="body">
                                    <ul className="menu">
                                        <li><Link href="/shipping">Chính sách giao hàng</Link></li>
                                        <li><Link href="/returns">Đổi trả & Hoàn tiền</Link></li>
                                        <li><Link href="/payment">Hướng dẫn thanh toán</Link></li>
                                        <li><Link href="/faq">Câu hỏi thường gặp</Link></li>
                                        <li><Link href="/contact">Liên hệ & Chỉ đường</Link></li>
                                    </ul>
                                </div>
                            </div>
                            {/* single sized  footer  */}
                            <div className="footer-singl-wized input-area">
                                <div className="head">
                                    <h6 className="title">Bản tin</h6>
                                </div>
                                <div className="body">
                                    <p className="disc">Đăng ký nhận bản tin của chúng tôi để cập nhật sản phẩm mới của
                                        chúng tôi</p>
                                    <form action="#">
                                        <div className="input-area-fill">
                                            <input type="email" placeholder="Nhập email của bạn" required/>
                                            <button> Subscribe</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/* single sized  footer end */}
                        </div>
                        {/* footer main wrapper end */}
                    </div>
                </div>
            </div>
            {/*<script> window.chtlConfig = {chatbotId: "1795957373"} </script>*/}
            <script async data-id="1795957373" id="chtl-script" type="text/javascript"
                    src="https://chatling.ai/js/embed.js"></script>
            {/*<script async data-id="2473613459" id="chatling-embed-script" type="text/javascript"*/}
            {/*        src="https://chatling.ai/js/embed.js"></script>*/}

        </footer>
    )
}
