"use client"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Navbar = () => {
  
  const router = useRouter();

  const handleLogout = () => {
    // حذف توکن‌ها از کوکی
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("user_role");
    Cookies.remove("refresh_token_expiry");

    // هدایت به صفحه ورود
    router.push("/login");
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="text-xl font-bold">MyBrand</div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/dashboard" className="hover:text-gray-200">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/widgets" className="hover:text-gray-200">
              Widgets
            </a>
          </li>
          <li>
            <a href="/settings" className="hover:text-gray-200">
              Settings
            </a>
          </li>
          <li>
          <button onClick={handleLogout} className="logout-button">
              خروج
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
