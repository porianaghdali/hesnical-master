self.onmessage = async function (event) {
    console.log("Worker دریافت داده را شروع کرد! 🚀");
  
    const { apiUrl, token } = event.data;
  
    if (!token) {
      console.log("Worker: هیچ توکنی دریافت نشد ❌");
      self.postMessage({ error: "No token provided" });
      return;
    }
  
    try {
      console.log("Worker: درخواست API ارسال شد... ⏳");
  
      const [accountRes, tradeRes, profitRes] = await Promise.all([
        fetch(apiUrl + "/api/identity/account/GetAccountDetail", {
          headers: { Authorization: `Bearer ${token}` },
        }).then(res => res.json()),
        fetch(apiUrl + "/api/v1/TradeDeal/GetAll", {
          headers: { Authorization: `Bearer ${token}` },
        }).then(res => res.json()),
        fetch(apiUrl + "/api/v1/TradeDeal/NetDailyPprfitAndLoss", {
          headers: { Authorization: `Bearer ${token}` },
        }).then(res => res.json()),
      ]);
  
      console.log("Worker: داده‌ها با موفقیت دریافت شد ✅");
  
      self.postMessage({
        success: true,
        userData: accountRes,
        userActivities: tradeRes,
        userDailyProfit: profitRes,
      });
    } catch (error) {
      console.log("Worker: خطا در دریافت داده ❌", error);
      self.postMessage({ error: "Error fetching user data" });
    }
  };
  