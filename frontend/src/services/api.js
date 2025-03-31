export async function login(phone_number) {
    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ phone_number }),
      credentials: "include", // Важно, чтобы куки отправлялись и сохранялись
    });
  
    const data = await response.json();
    return data;
  }
  
  export async function checkAuth() {
    const response = await fetch("http://localhost:8000/api/check-auth/", {
      credentials: "include", // Важно, чтобы куки отправлялись и сохранялись
    });
  
    const data = await response.json();
    return data;
  }
  