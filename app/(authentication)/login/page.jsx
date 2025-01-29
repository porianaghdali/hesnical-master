
import Login from "./login";
const Page = () => {
 return (
    < >
      {/* <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl mb-4">ورود به حساب</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            نام کاربری
          </label>
          <input
            id="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            رمز عبور
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <a href="/register">ثبت نام</a>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          // type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onSubmit={handleLogin}
        >
          ورود
        </button>
      </form> */}
      <Login/>
    </>
  );
};

export default Page;
