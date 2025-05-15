const clientHostName = window.location.hostname;

let backendHostName;

if (clientHostName === 'localhost') {
  backendHostName = 'http://localhost:8000';
} else if (
  clientHostName ===
  'playdata-orderservice4908.s3-website.ap-northeast-2.amazonaws.com'
) {
  backendHostName =
    'https://playdata-orderservice4908.s3-website.ap-northeast-2.amazonaws.com';
}

export const API_BASE_URL = backendHostName;
export const USER = '/user-service/user';
export const PROD = '/product-service/product';
export const ORDER = '/ordering-service/orders';
export const CART = '/ordering-service/cart';
