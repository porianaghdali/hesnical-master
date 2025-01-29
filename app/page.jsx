import Link from 'next/link';

const Home = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">به سایت ما خوش آمدید</h1>
      <Link href="/login" className="mt-4 inline-block bg-blue-600 text-white p-2 rounded">ورود به حساب</Link>
    </div>
  );
};

export default Home;
