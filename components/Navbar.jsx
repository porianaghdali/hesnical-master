"use client"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
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
      <div className="text-xl font-bold"><Image
          
          height={60}
          width={60}
          sizes="40px"
          className="rounded-circle"
          src="/assets/Hesnical_Logo.png"
          alt="user@email.com"
        /></div>
      <nav>
        <ul className="flex space-x-4">
        
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
