export const formatCurrency = (price, raw = false) => {
    if (raw) return Number(price); // Trả về số khi raw = true
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
};
