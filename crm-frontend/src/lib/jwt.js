export function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      decodeURIComponent(
        atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      )
    );
    return decoded;
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const decoded = decodeJwt(token);
  if (!decoded?.exp) return false;
  return Date.now() >= decoded.exp * 1000;
}
