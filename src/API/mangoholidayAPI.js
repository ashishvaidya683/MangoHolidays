// src/api/mangoholidaysApi.js

// ✅ Use your PHP proxy endpoint
const PROXY_URL = "https://mangoholidays.in/proxy.php";

/**
 * Utility to call PHP proxy.
 * @param {string} endpoint - API endpoint name (e.g. "GetProductListBySectorForWebsite")
 * @param {object} params - Query params
 */
async function fetchFromProxy(endpoint, params = {}) {
    const url = `${PROXY_URL}?endpoint=${encodeURIComponent(endpoint)}&params=${encodeURIComponent(
        JSON.stringify(params)
    )}`;

    console.log("🌐 FETCH VIA PROXY:", url);

    try {
        const response = await fetch(url, { method: "GET" });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Proxy Error: ${response.status} ${response.statusText} | ${text}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("❌ fetchFromProxy Error:", err);
        throw err;
    }
}

// --- 1️⃣ Get Product List ---
export async function getProductList(params) {
    // console.log("📦 Calling GetProductListBySectorForWebsite with params:", params);
    return await fetchFromProxy("GetProductListBySectorForWebsite", params);
}

// --- 2️⃣ Get Product Details ---
export async function getProductDetails(productID, productCode) {
    const params = { ProductID: productID, ProductCode: productCode };
    // console.log("🧾 Calling GetProductForWebsite with params:", params);
    return await fetchFromProxy("GetProductForWebsite", params);
}

// --- 3️⃣ Get Tour Pricing Details ---
export async function getTourPricingDetails(tourDetailID, tourCode) {
    const params = { TourDetailID: tourDetailID, TourCode: tourCode };
    // console.log("💰 Calling GetTourPricingDetailForWebsite with params:", params);
    return await fetchFromProxy("GetTourPricingDetailForWebsite", params);
}