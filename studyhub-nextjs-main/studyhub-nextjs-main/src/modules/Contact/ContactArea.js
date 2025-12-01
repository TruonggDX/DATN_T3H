import Image from "next/image";

export default function ContactArea() {

    return (
        <div className="rts-contact-area rts-section-gapTop">
            <div className="container">
                <div className="row g-5">
                    <div className="col-xl-5">
                        {/* contact left area start */}
                        <div className="contact-left-area-start">
                            <div className="title-area-left-style">
                                <h2 className="title">
                                    Chúng tôi luôn lắng nghe bạn <br/>
                                    <span>Hãy liên hệ với chúng tôi!</span>
                                </h2>
                            </div>
                            <form action="mailer.php" method="post" className="contact-page-form" id="contact-form">
                                <div className="single-input">
                                    <label htmlFor="name">Họ và tên*</label>
                                    <input id="name" name="name" type="text" placeholder="Nguyễn Văn A..." required/>
                                </div>
                                <div className="single-input">
                                    <label htmlFor="email">Email*</label>
                                    <input id="email" name="email" type="email" placeholder="example@gmail.com"/>
                                </div>
                                <div className="single-input">
                                    <label htmlFor="message">Nội dung*</label>
                                    <textarea id="message" name="message"
                                              placeholder="Hãy viết điều bạn muốn chia sẻ..."></textarea>
                                </div>
                                <button type="submit" className="rts-btn btn-primary">Gửi liên hệ</button>
                            </form>
                            <div id="form-messages" className="mt--20"></div>
                        </div>
                        {/* contact left area end */}
                    </div>
                    <div className="col-xl-7 pl--40 pl_lg--15 pl_md--15 pl_sm--15 pb_md--100 pb_sm--100">
                        <div className="contact-map-area-start">
                            <div className="single-maptop-info">
                                <div className="icon">
                                    <Image src="/images/contact/02.png" width={40} height={40} alt="contact"/>
                                </div>
                                <p className="disc">
                                    Quận Hoàn Kiếm, <br/>
                                    Hà Nội, Việt Nam
                                </p>
                            </div>

                            <div className="single-maptop-info">
                                <div className="icon">
                                    <Image src="/images/contact/03.png" width={40} height={40} alt="contact"/>
                                </div>
                                <a href="tel:+84333378901">+84 33 337 8901</a> <br/>
                                <a href="tel:+84888888888">+84 88 888 8888</a>
                            </div>

                            <div className="single-maptop-info">
                                <div className="icon">
                                    <Image src="/images/contact/04.png" width={40} height={40} alt="contact"/>
                                </div>
                                <div style={{lineHeight: '1.8', fontSize: '15px'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '260px'}}>
                                        <span>Thứ 2 – Thứ 6:</span>
                                        <span style={{color: '#555'}}>9:00 – 18:00</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '260px'}}>
                                        <span>Thứ 7:</span>
                                        <span style={{color: '#555'}}>9:00 – 16:00</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="map-bottom-area mt--30">
                            <div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden'}}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.097862648308!2d105.84987937601895!3d21.028825880619347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9c27511%3A0x1daf20544126f9c1!2sHoan%20Kiem%20District%2C%20Hanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1732500000000!5m2!1sen!2s"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 0
                                    }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
