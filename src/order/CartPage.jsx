import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../configs/axios-config';
import { API_BASE_URL, CART } from '../configs/host-config';
import './CartPage.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CartItem from './CartItem';
import CartTotal from './CartTotal';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState({});

  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}${CART}/details`); // 사용자의 장바구니 조회
      setCart(res.data);

      const initialSelected = {};
      res.data.items.forEach((item) => {
        initialSelected[item.productId] = true;
      });
      setSelectedItems(initialSelected);
    } catch (err) {
      console.error('장바구니 조회 실패', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleSelect = (productId, checked) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: checked,
    }));
  };

  const handleItemQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await handleDelete(productId);
      return;
    }

    try {
      await axiosInstance.patch(
        `${API_BASE_URL}${CART}/items/${productId}/quantity`, // 사용자 -> 장바구니에서 상품 수량 수정
        { quantity: newQuantity },
      );

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      }));
    } catch (err) {
      alert('수량 변경에 실패했습니다.');
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axiosInstance.delete(`${API_BASE_URL}${CART}/items/${productId}`); // 사용자 -> 장바구니에서 상품 삭제
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.productId !== productId),
      }));

      setSelectedItems((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
    } catch (err) {
      alert('삭제 실패했습니다.');
    }
  };

  const getSelectedCartItems = () => {
    if (!cart || !cart.items) return [];
    return cart.items.filter((item) => selectedItems[item.productId]);
  };

  const handleCheckout = () => {
    const selected = getSelectedCartItems();
    if (selected.length === 0) {
      alert('주문할 상품을 선택해주세요.');
      return;
    }

    const totalPrice = selected.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );

    const cartItemIds = selected.map((item) => item.cartItemId);

    navigate('/order', {
      state: {
        cartItems: selected,
        totalPrice,
        cartItemIds,
      },
    });
  };

  if (loading) return <div>Loading...</div>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <>
        <Header />
        <div className='cart-container empty-cart'>
          <h2>Your Cart</h2>
          <hr />
          <div className='empty-message'>Your Cart is Empty!</div>
          <hr />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className='cart-container'>
        <h2>Your Cart</h2>
        {cart.items.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onQuantityChange={handleItemQuantityChange}
            onDelete={handleDelete}
            onSelect={handleSelect}
            isSelected={!!selectedItems[item.productId]}
          />
        ))}
        <hr />
        <CartTotal
          cart={{ items: getSelectedCartItems() }}
          onCheckout={handleCheckout}
        />
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
