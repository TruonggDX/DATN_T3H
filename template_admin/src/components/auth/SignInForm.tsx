import {useState} from "react";
import {Link, useNavigate} from "react-router";
import {ChevronLeftIcon, EyeCloseIcon, EyeIcon} from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import {decodeToken, login} from "../../service/AuthService.ts";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập email và mật khẩu");
      return;
    }
    try {
      const result = await login(email, password);
      console.log("Đăng nhập thành công:", result);
      localStorage.setItem("jwtToken", result.token);
      const decoded = await decodeToken();
      console.log('decode', decoded);
      const roles = decoded.roles || [];
      const isAdmin = roles.some((r: any) => r.code === "ADMIN");
      if (isAdmin) {
        navigate("/dashboard");
      }else {
        navigate("/error");
      }
    } catch (err) {
      console.error("Đăng nhập thất bại:", err);
      alert("Sai email hoặc mật khẩu");
    }
  };


  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Đăng nhập
            </h1>
          </div>
          <div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder="info@gmail.com" />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">

                    </span>
                  </div>
                </div>
                <div>
                  <Button
                      onClick={handleLogin}
                      className="w-full" size="sm">
                    Đăng nhập
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
