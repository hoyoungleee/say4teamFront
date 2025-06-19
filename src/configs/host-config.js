const clientHostName = window.location.hostname;

let backendHostName;

if (clientHostName === 'localhost') {
  backendHostName = 'http://localhost:8000';
} else if (
  clientHostName === 'say4team.shop' ||
  clientHostName === 'say4teamadmin.shop'
) {
  // 배포서버 아이피
  backendHostName = 'https://api.say4team.shop';
}

export const API_BASE_URL = backendHostName;
export const USER = '/user-service/user';
export const PROD = '/product-service/product';
export const REVIEW = '/product-service/review';
export const ORDER = '/ordering-service/orders';
export const CART = '/ordering-service/cart';

export const CATEGORY = '/product-service/category';
