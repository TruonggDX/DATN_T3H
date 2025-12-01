import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showLoadingThenExecute = async (
    action,
    successMessage = "Thành công!",
    errorMessage = "Có lỗi xảy ra, vui lòng thử lại.",
    redirectUrl,
    delay = 2000
) => {
    try {
        MySwal.fire({
            title: "Đang xử lý...",
            text: "Vui lòng chờ giây lát!",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        await new Promise((resolve) => setTimeout(resolve, delay));
        await action();
        await MySwal.fire({
            icon: "success",
            title: successMessage,
            showConfirmButton: false,
            timer: 1000,
        });

        if (redirectUrl) {
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1000);
        }
    } catch (error) {
        console.error(error);
        await MySwal.fire("Lỗi!", errorMessage, "error");
    }
};
