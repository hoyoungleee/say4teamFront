const clientHostName = window.location.hostname;

let backendHostName;

if (clientHostName === 'localhost') {
  backendHostName = 'http://localhost:8000';
} else if (
  clientHostName ===
  'http://orderservice-prod-image31145.s3-website.ap-northeast-2.amazonaws.com'
) {
  backendHostName = 'http://3.38.153.241:8000';
}

export const API_BASE_URL = backendHostName;
export const USER = '/user-service/user';
export const PROD = '/product-service/product';
export const REVIEW = '/product-service/review';
export const ORDER = '/ordering-service/orders';
export const CART = '/ordering-service/cart';

export const CATEGORY = '/product-service/category';
