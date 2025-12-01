import Image from "next/image";

export default function TopServices() {
    const services = [
        {
            icon: "/images/icons/giaohangnhanh.png",        // thay bằng đường dẫn icon của bạn
            title: "Giao hàng siêu nhanh",
            desc: "Miễn phí nội thành - Nhận hàng trong 2h",
        },
        {
            icon: "/images/icons/chinhsach_4.png",
            title: "Đổi trả dễ dàng",
            desc: "Đổi trả miễn phí trong 30 ngày",
        },
        {
            icon: "/images/icons/hotro.png",
            title: "Hỗ trợ 24/7",
            desc: "Tư vấn nhiệt tình mọi lúc",
        },
        {
            icon: "/images/icons/thanhtoan.png",
            title: "Thanh toán linh hoạt",
            desc: "COD, thẻ, trả góp 0% lãi suất",
        },
    ];

    return (
        <div className="top-category-area rts-section-gap" style={{ background: "#f8f9fa" }}>
            <div className="container">
                {/* Tiêu đề */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="title-area-center-style">
                            <div className="pre-title">
                                <Image src="/images/banner/bulb.png" alt="icon" width={44} height={44} />
                                <span>Dịch vụ nổi bật</span>
                            </div>
                            <h2 className="title">Tại sao khách hàng chọn chúng tôi?</h2>
                            <p className="post-title">Cam kết mang đến trải nghiệm mua sắm tốt nhất</p>
                        </div>
                    </div>
                </div>

                {/* 4 ô dịch vụ - chắc chắn nằm ngang 1 hàng */}
                <div className="row g-5 mt--30 justify-content-center">
                    {services.map((service, index) => (
                        <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <div
                                className="single-category-two"
                                style={{
                                    textAlign: "center",
                                    padding: "30px 20px",
                                    background: "#fff",
                                    borderRadius: "16px",
                                    boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
                                    transition: "all 0.3s",
                                    height: "100%",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                            >
                                <div className="icon" style={{ marginBottom: "20px" }}>
                                    <Image
                                        src={service.icon}
                                        alt={service.title}
                                        width={80}
                                        height={80}
                                        style={{ margin: "0 auto" }}
                                    />
                                </div>
                                <h5 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px", color: "#222" }}>
                                    {service.title}
                                </h5>
                                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                                    {service.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}