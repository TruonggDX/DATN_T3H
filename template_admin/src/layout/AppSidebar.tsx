import {useCallback, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router";

import {
    BoxCubeIcon,
    CalenderIcon,
    ChevronDownIcon,
    GridIcon,
    HorizontaLDots,
    PieChartIcon, PlugInIcon,
    UserCircleIcon,
} from "../icons";
import {useSidebar} from "../context/SidebarContext";

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
    { icon: <GridIcon />, name: "Dashboard", path: "/dashboard" },
    {
        icon: <UserCircleIcon />,
        name: "Tài khoản",
        subItems: [
            { name: "Thêm tài khoản", path: "/create-account" },
            { name: "Danh sách tài khoản", path: "/list-account" },
        ],
    },
    { icon: <PlugInIcon />, name: "Quyền", path: "/roles" },
    { icon: <BoxCubeIcon />, name: "Danh mục", path: "/categories" },
    { icon: <CalenderIcon />, name: "Thương hiệu", path: "/brand" },
    {
        icon: <GridIcon />,
        name: "Sản phẩm",
        subItems: [
            { name: "Thêm sản phẩm", path: "/add-product" },
            { name: "Danh sách sản phẩm", path: "/list-product" },
        ],
    },
    {
        icon: <HorizontaLDots />,
        name: "Biến thể",
        subItems: [
            { name: "Danh sách thuộc tính", path: "/list-attribute" },
            { name: "Danh sách giá trị", path: "/list-attribute-value" },
        ],
    },
    { icon: <PieChartIcon />, name: "Đơn hàng", path: "/orders" },
    { icon: <UserCircleIcon />, name: "Đánh giá", path: "/reviews" },
    { icon: <BoxCubeIcon />, name: "Blogs", path: "/blogs" },
];


const AppSidebar: React.FC = () => {
    const {isExpanded, isMobileOpen, isHovered, setIsHovered} = useSidebar();
    const location = useLocation();

    const [openSubmenu, setOpenSubmenu] = useState<{ index: number } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const isActive = useCallback(
        (path: string) => location.pathname === path,
        [location.pathname]
    );

    useEffect(() => {
        let matched = false;
        navItems.forEach((nav, index) => {
            nav.subItems?.forEach((subItem) => {
                if (isActive(subItem.path)) {
                    setOpenSubmenu({index});
                    matched = true;
                }
            });
        });
        if (!matched) setOpenSubmenu(null);
    }, [location, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prev) => ({
                    ...prev,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenu((prev) => (prev?.index === index ? null : {index}));
    };

    const renderMenuItems = (items: NavItem[]) => (
        <ul className="flex flex-col gap-4">
            {items.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index)}
                            className={`menu-item group cursor-pointer ${
                                openSubmenu?.index === index
                                    ? "menu-item-active"
                                    : "menu-item-inactive"
                            } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                        >
                            <span
                                className={`menu-item-icon-size ${
                                    openSubmenu?.index === index
                                        ? "menu-item-icon-active"
                                        : "menu-item-icon-inactive"
                                }`}
                            >
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className="menu-item-text">{nav.name}</span>
                            )}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <ChevronDownIcon
                                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                        openSubmenu?.index === index ? "rotate-180 text-brand-500" : ""
                                    }`}
                                />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                to={nav.path}
                                className={`menu-item group ${
                                    isActive(nav.path)
                                        ? "menu-item-active"
                                        : "menu-item-inactive"
                                }`}
                            >
                                <span
                                    className={`menu-item-icon-size ${
                                        isActive(nav.path)
                                            ? "menu-item-icon-active"
                                            : "menu-item-icon-inactive"
                                    }`}
                                >
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className="menu-item-text">{nav.name}</span>
                                )}
                            </Link>
                        )
                    )}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => (subMenuRefs.current[`${index}`] = el)}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                                height:
                                    openSubmenu?.index === index
                                        ? `${subMenuHeight[`${index}`]}px`
                                        : "0px",
                            }}
                        >
                            <ul className="mt-2 space-y-1 ml-9">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            to={subItem.path}
                                            className={`menu-dropdown-item ${
                                                isActive(subItem.path)
                                                    ? "menu-dropdown-item-active"
                                                    : "menu-dropdown-item-inactive"
                                            }`}
                                        >
                                            {subItem.name}
                                            <span className="flex items-center gap-1 ml-auto">
                                                {subItem.new && (
                                                    <span
                                                        className={`ml-auto ${
                                                            isActive(subItem.path)
                                                                ? "menu-dropdown-badge-active"
                                                                : "menu-dropdown-badge-inactive"
                                                        } menu-dropdown-badge`}
                                                    >
                                                        new
                                                    </span>
                                                )}
                                                {subItem.pro && (
                                                    <span
                                                        className={`ml-auto ${
                                                            isActive(subItem.path)
                                                                ? "menu-dropdown-badge-active"
                                                                : "menu-dropdown-badge-inactive"
                                                        } menu-dropdown-badge`}
                                                    >
                                                        pro
                                                    </span>
                                                )}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
            ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`py-8 flex ${
                    !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                }`}
            >
                <Link to="/">
                    {isExpanded || isHovered || isMobileOpen ? (
                        <>
                            <img
                                className="dark:hidden"
                                src="/images/logo/logo.svg"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                            <img
                                className="hidden dark:block"
                                src="/images/logo/logo-dark.svg"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                        </>
                    ) : (
                        <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32}/>
                    )}
                </Link>
            </div>
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <h2
                            className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                                !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                            }`}
                        >
                            {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots className="size-6"/>}
                        </h2>
                        {renderMenuItems(navItems)}
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
