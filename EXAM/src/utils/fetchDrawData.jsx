const fethcDrawData = async () => {
  try {
    const response = await fetch("http://localhost:5000/v1/draw/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: "hello",
        token: sessionStorage.getItem("token"), // ✅ Get token properly
      },
    });

    const res = await response.json();

    if (!res.success) {
      throw new Error(res.message || "Failed to fetch account data");
    }

    return res.data; // ✅ Return fetched data instead of using useState
  } catch (err) {
    console.error("Fetch error:", err.message);
    return null; // ✅ Return `null` if there is an error
  }
};

export default fethcDrawData;
