"use client"

import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // باید این را به صورت امن در محیط‌های واقعی ذخیره کنید

export async function POST(req) {
  const { username, password } = await req.json();

  // در اینجا شما باید داده‌ها را از دیتابیس چک کنید
  // برای سادگی از اطلاعات ثابت استفاده می‌کنیم
  if (username === 'user' && password === 'password') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    return new Response(
      JSON.stringify({ token }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ message: 'نام کاربری یا رمز عبور اشتباه است' }),
    { status: 401, headers: { 'Content-Type': 'application/json' } }
  );
}
