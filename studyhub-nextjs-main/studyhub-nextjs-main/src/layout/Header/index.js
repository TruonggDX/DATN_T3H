import {clearUserData} from '@/redux/user/actionCreator';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import HeaderCategory from './Category';
import MenuItems from './MenuItems';
import MobileMenuItems from './MobileMenuItems';
import api from "/src/service/auth"
import {useRouter} from "next/router";
import {formatCurrency} from "@/utils/utils";
import {useCart} from "@/hooks/CartContext";
import productService from "@/service/productService";

export default function Header(props) {
    const {headerClass, headerLogo, topbarEnable, categoryEnable, menuItemsLeft, authenticationHeader} = props;
    const [isVisible, setIsVisible] = useState(false);
    const [menuModalOpen, setMenuModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const [cartModalOpen, setCartModalOpen] = useState(false);
    const [authorDropdown, setAuthorDropdown] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [check, setCheck] = useState(0);
    const router = useRouter();
    const dispatch = useDispatch();

    const {cartData, removeData} = useCart();

    const handleRemoveProduct = (id) => {
        removeData(id)
    };
    const handleLogout = () => {
        dispatch(clearUserData());
        localStorage.removeItem('jwtToken');
        router.push('/signin');
    };
    useEffect(() => {
        const a = localStorage.getItem('jwtToken')
        if (a != null) {
            setCheck(1)
        }
    }, [])


    function handleCartToggle() {
        setCartModalOpen(!cartModalOpen);
        setModalOpen(!modalOpen);
    }

    function handleMenuToggle() {
        setMenuModalOpen(!menuModalOpen);
        setModalOpen(!modalOpen);
    }

    function handleSearchToggle() {
        setSearchModal(!cartModalOpen);
        setModalOpen(!modalOpen);
    }

    function closeModal() {
        setModalOpen(false)
        setMenuModalOpen(false)
        setSearchModal(false)
        setCartModalOpen(false)
    }

    useEffect(() => {
        setAuthorDropdown(false);
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const [account, setAccount] = useState(null);
    useEffect(() => {
        api.getUser().then((response) => {
            setAccount(response.data)
        }).catch((e) => console.error(e))
    }, []);
    useEffect(() => {
        const total = cartData.reduce(
            (sum, course) => sum + course.variant.price * course.number,
            0
        );
        setTotalPrice(total);
    }, [cartData]);


    const [filter, setFilter] = useState({name: ''});
    const [courses, setCourses] = useState([]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setFilter({ name: value });
        if (value.trim() !== '') {
            productService.getCourseByName({ keyword: value }).then((response) => {
                setCourses(response);
            });
        } else {
            setCourses([]);
        }
    };

    return (
        <>
            <header className={`${headerClass || "header-one header--sticky"} ${isVisible ? 'sticky' : ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="header-one-wrapper">
                                <div className="left-side-header">
                                    <Link href="/" className="logo-area">
                                        <Image
                                            src={headerLogo || "/images/logo/logo-1.png"}
                                            alt="logo"
                                            width={144}
                                            height={28}
                                            style={{
                                                objectFit: "contain",
                                                width:'100px',
                                                height:'70px'
                                            }}
                                        />

                                    </Link>

                                    {
                                        categoryEnable && <HeaderCategory/>
                                    }

                                    {
                                        menuItemsLeft && <MenuItems/>
                                    }

                                </div>

                                {
                                    !menuItemsLeft && <MenuItems/>
                                }

                                {
                                    !authenticationHeader &&
                                    <div className="header-right-area-one">
                                        <div className="actions-area">
                                            <div className="search-btn" id="search" onClick={handleSearchToggle}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                     viewBox="0 0 22 22" fill="none">
                                                    <path
                                                        d="M19.9375 18.9652L14.7454 13.7732C15.993 12.2753 16.6152 10.3542 16.4824 8.40936C16.3497 6.46453 15.4722 4.64575 14.0326 3.33139C12.593 2.01702 10.7021 1.30826 8.75326 1.35254C6.8044 1.39683 4.94764 2.19075 3.56924 3.56916C2.19083 4.94756 1.39691 6.80432 1.35263 8.75317C1.30834 10.702 2.0171 12.5929 3.33147 14.0325C4.64584 15.4721 6.46461 16.3496 8.40944 16.4823C10.3543 16.6151 12.2754 15.993 13.7732 14.7453L18.9653 19.9374L19.9375 18.9652ZM2.75 8.93742C2.75 7.71365 3.11289 6.51736 3.79278 5.49983C4.47267 4.4823 5.43903 3.68923 6.56965 3.22091C7.70026 2.7526 8.94436 2.63006 10.1446 2.86881C11.3449 3.10756 12.4474 3.69686 13.3127 4.56219C14.1781 5.42753 14.7674 6.53004 15.0061 7.7303C15.2449 8.93055 15.1223 10.1747 14.654 11.3053C14.1857 12.4359 13.3926 13.4022 12.3751 14.0821C11.3576 14.762 10.1613 15.1249 8.9375 15.1249C7.29703 15.1231 5.72427 14.4706 4.56429 13.3106C3.4043 12.1506 2.75182 10.5779 2.75 8.93742Z"
                                                        fill="#553CDF"/>
                                                </svg>
                                            </div>
                                            <div className="cart cart-icon" onClick={handleCartToggle}>
                                                <i className="fa-regular fa-cart-shopping"></i>
                                                {
                                                    cartData.length > 0 &&
                                                    <span className="quantity">{cartData.length}</span>
                                                }
                                            </div>
                                        </div>
                                        {
                                            check != 1 ?
                                                <div className="buttons-area">
                                                    <Link href="/signin" className="rts-btn btn-border">Đăng nhập</Link>
                                                    <Link href="/signup" className="rts-btn btn-primary">Đăng ký</Link>
                                                </div> :
                                                <div className="studyhub__header__quickaction__item">
                                                    <button
                                                        className="studyhub__header__quickaction__link"
                                                        onClick={() => setAuthorDropdown(!authorDropdown)}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "55px",
                                                                height: "55px",
                                                                borderRadius: "10px",
                                                                overflow: "hidden",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center"
                                                            }}
                                                        >
                                                            <Image
                                                                src={account?.imageUrl || "/images/avatar/user.svg"}
                                                                width={55}
                                                                height={55}
                                                                alt="user"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit: "cover",
                                                                    borderRadius: "15px"
                                                                }}
                                                            />
                                                        </div>
                                                    </button>
                                                    {
                                                        authorDropdown &&
                                                        <div
                                                            className="studyhub__header__popup studyhub__header__popup--author">
                                                            <div className="studyhub__header__popup__header">
                                                                <div className="studyhub__header__popup__header__img"
                                                                     style={{
                                                                         width: "55px",
                                                                         height: "55px",
                                                                         borderRadius: "10px",
                                                                         overflow: "hidden",
                                                                         display: "flex",
                                                                         justifyContent: "center",
                                                                         alignItems: "center"
                                                                     }}
                                                                >
                                                                    <Image
                                                                        src={account?.imageUrl || "/images/avatar/user.svg"}
                                                                        width={55}
                                                                        height={55}
                                                                        alt="user"
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            objectFit: "cover",
                                                                            borderRadius: "15px"
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div
                                                                    className="studyhub__header__popup__header__content">
                                                                    <h3 className="studyhub__header__popup__header__title">{account?.fullname}</h3>
                                                                    <span
                                                                        className="studyhub__header__popup__header__subtitle">{account?.email}</span>
                                                                </div>
                                                            </div>

                                                            <div className="studyhub__header__popup__content">
                                                                <ul className="studyhub__header__popup__items">
                                                                    <li className="studyhub__header__popup__item">
                                                                        <Link className="studyhub__header__popup__link"
                                                                              href="/dashboard/profile">
                                                                            <i className="uil uil-user"></i>
                                                                            Thông tin
                                                                        </Link>
                                                                    </li>
                                                                    <li className="studyhub__header__popup__item">
                                                                        <Link className="studyhub__header__popup__link"
                                                                              href="/dashboard/order">
                                                                            <i className="uil uil-receipt"></i>
                                                                            Đơn hàng
                                                                        </Link>
                                                                    </li>
                                                                    {/*<li className="studyhub__header__popup__item">*/}
                                                                    {/*    <Link className="studyhub__header__popup__link"*/}
                                                                    {/*          href="/dashboard/enrolled">*/}
                                                                    {/*        <i className="uil uil-books"></i>*/}
                                                                    {/*        Lớp*/}
                                                                    {/*    </Link>*/}
                                                                    {/*</li>*/}

                                                                </ul>
                                                            </div>
                                                            <div className="studyhub__header__popup__footer">
                                                                <button
                                                                    className="studyhub__header__popup__footer__link"
                                                                    onClick={handleLogout}
                                                                >
                                                                    <i className="uil uil-arrow-up-left"></i> Đăng xuất
                                                                </button>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                        }

                                        <div className="menu-btn" id="menu-btn" onClick={handleMenuToggle}>
                                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <rect y="14" width="20" height="2" fill="#1F1F25"></rect>
                                                <rect y="7" width="20" height="2" fill="#1F1F25"></rect>
                                                <rect width="20" height="2" fill="#1F1F25"></rect>
                                            </svg>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div id="side-bar" className={`side-bar header-two ${menuModalOpen ? "show" : ""}`}>
                <button className="close-icon-menu" onClick={closeModal}>
                    <i className="far fa-times"></i>
                </button>

                {/* inner menu area desktop start */}
                <div className="inner-main-wrapper-desk">
                    <div className="thumbnail">
                        <Image src="/images/banner/04.jpg" alt="elevate" width="574" height="342"/>
                    </div>
                    <div className="inner-content">
                        <h4 className="title">We Build Building and Great Constructive Homes.</h4>
                        <p className="disc">
                            We successfully cope with tasks of varying complexity, provide long-term guarantees and
                            regularly master new technologies.
                        </p>
                        <div className="footer">
                            <h4 className="title">Got a project in mind?</h4>
                            <a href="contact" className="rts-btn btn-primary">Let's talk</a>
                        </div>
                    </div>
                </div>

                <MobileMenuItems/>
            </div>

            {/* cart area start */}
            <div className={`cart-bar ${cartModalOpen ? 'show' : ''}`}>
                <div className="cart-header">
                    <h3 className="cart-heading">Giỏ hàng ({cartData.length} khóa học)</h3>
                    <div className="close-cart" onClick={closeModal}>
                        <i className="fal fa-times"></i>
                    </div>
                </div>
                <div className="product-area">

                    {cartData.map((course) => {
                        return (
                            <div key={course.id} className="product-item">
                                <div className="product-detail">
                                    <div className="product-thumb" style={{maxWidth: '90px', position: 'relative'}}>
                                        <Image
                                            src={course.product.imageDtos?.[0]?.url || "/placeholder.jpg"}
                                            alt="product-thumb"
                                            width={90}
                                            height={90}
                                        />

                                    </div>
                                    <div className="item-wrapper">
                                        <Link
                                            className="product-name"
                                            href={`/course/${course.product.id}`}
                                            style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {course.product.name}
                                        </Link>

                                        <div className="item-wrapper">
                                            <span className="product-qnty">Số lượng : {course.number}</span>
                                            <p className="product-price">Tổng tiền
                                                : {formatCurrency(course.variant.price)}</p>
                                        </div>
                                        <div className="item-wrapper">
                                            <span className="product-qnty">
                                              Thuộc tính: {course.variant.attributeValues.map(a => a.value).join(", ")}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="cart-edit">
                                    <div className="item-wrapper d-flex mr--5 align-items-center">
                                        <button
                                            className="delete-cart"
                                            onClick={() => handleRemoveProduct(course.id)}
                                        >
                                            <i className="fal fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="cart-bottom-area">
                    <span className="total-price">Tổng tiền: <span
                        className="price">{formatCurrency(totalPrice)}</span></span>
                    <Link href="/checkout" className="checkout-btn cart-btn">Thanh toán</Link>
                    <Link href="/cart" className="view-btn cart-btn">Giỏ hàng</Link>
                </div>
            </div>
            {/* cart area end */}

            {/* Search Modal Start */}
            <div className={`search-input-area ${searchModal ? 'show' : ''}`}>
                <div className="container">
                    <div className="search-input-inner" style={{position: 'relative'}}>
                        <div className="input-div">
                            <input
                                onChange={handleSearch}
                                className="search-input autocomplete"
                                type="text"
                                placeholder="Nhập tên sản phẩm cần tìm"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    outline: 'none',
                                    fontSize: '16px',
                                }}
                            />
                            <button>
                                <i className="far fa-search"></i>
                            </button>
                        </div>

                        {filter.name && (
                            <div
                                className="search-results"
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 138,
                                    width: '80%',
                                    zIndex: 10,
                                    backgroundColor: '#fff',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                    marginTop: '5px',
                                    padding: '10px'
                                }}
                            >
                                {courses.length > 0 ? (
                                    courses.map((course) => (
                                        <Link href={`/course/${course.id || 'details'}`} className="thumbnail">
                                            <div
                                                key={course.id}
                                                className="search-item"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '12px',
                                                    borderBottom: '1px solid #eee',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.2s',
                                                    gap: '12px',
                                                }}
                                            >
                                                <img
                                                    src={course.imageDtos[0].url || '/default-book.jpg'}
                                                    alt={course.name}
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        objectFit: 'cover',
                                                        borderRadius: '5px',
                                                        backgroundColor: '#f9f9f9',
                                                    }}
                                                />
                                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                                    <div className="book-title" style={{
                                                        fontWeight: 'bold',
                                                        fontSize: '16px',
                                                        color: '#333',
                                                    }}>
                                                        {course.name}
                                                    </div>
                                                    <div className="book-author" style={{
                                                        fontSize: '14px',
                                                        color: '#666',
                                                        marginTop: '4px',
                                                    }}>Mã sản phẩm : {course.code}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div style={{
                                        padding: '12px',
                                        textAlign: 'center',
                                        color: '#999'
                                    }}>
                                        Không có sản phẩm phù hợp nào
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div id="close" className="search-close-icon" onClick={closeModal}>
                    <i className="far fa-times"></i>
                </div>
            </div>
            {/* Search Modal End */}


            <div id="anywhere-home" className={modalOpen ? 'bgshow' : ""} onClick={closeModal}></div>

        </>
    )
}
