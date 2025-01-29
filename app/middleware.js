// app/middleware.js

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  // چک کردن وجود کوکی‌های access_token
  const token = request.cookies.get('access_token');
  
  // اگر توکن موجود باشد، کاربر به صفحه داشبورد هدایت می‌شود
  if (token) {
    try {
      // دیکد کردن توکن و بررسی صحت آن
      const decoded = jwt.decode(token);
      
      // اگر توکن معتبر باشد، به صفحه داشبورد هدایت می‌شود
      if (decoded) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  // اگر توکن وجود ندارد، اجازه دسترسی به صفحه ورود داده می‌شود
  return NextResponse.next();
}

// تعریف مسیرهایی که این Middleware باید روی آنها اعمال شود
export const config = {
  matcher: ['/login'], // فقط برای صفحه ورود اعمال می‌شود
};
