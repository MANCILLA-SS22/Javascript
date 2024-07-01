function getAuthToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) return "EXPIRED";
    return token
};

function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export { getAuthToken, getTokenDuration }