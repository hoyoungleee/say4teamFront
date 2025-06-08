import React, { useEffect, useState, useContext } from 'react';
import './OrderCheck.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import AuthContext from '../context/UserContext';
import axiosInstance from '../configs/axios-config';
import { API_BASE_URL, ORDER } from '../configs/host-config';

const OrderCheck = () => {
  const { userInfo, isInit } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 주문 상태를 한글로 변환하는 함수
  const getOrderStatusLabel = (status) => {
    switch (status) {
      case 'ORDERED':
        return '주문완료';
      case 'SHIPPED':
        return '배송중';
      case 'DELIVERED':
        return '배송완료';
      case 'CANCELLED':
        return '주문취소';
      case 'RETURNED':
        return '반품완료';
      default:
        return status;
    }
  };

  // 주문 취소 처리
  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm('정말 주문을 취소하시겠습니까?');
    if (!confirmCancel) return;

     try {
      await axiosInstance.delete(`${API_BASE_URL}${ORDER}/${orderId}/cancel`);
      alert('주문이 취소되었습니다.');
      
      // 최신 주문 내역 다시 불러오기
      const response = await axiosInstance.get(
        `${API_BASE_URL}${ORDER}/userOrder?email=${userInfo.email}`,
      );
      setOrders(response.data);
    } catch (error) {
      console.error('주문 취소 실패:', error);
      alert('주문 취소에 실패했습니다.');
    }
  };

  // 주문 내역 불러오기
  useEffect(() => {
    const fetchOrders = async () => {
      if (isInit && userInfo?.email) {
        try {
          const response = await axiosInstance.get(
            `${API_BASE_URL}${ORDER}/userOrder?email=${userInfo.email}`,
          );
          setOrders(response.data);
        } catch (error) {
          console.error('주문 내역 조회 실패:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo, isInit]);

  return (
    <>
      <Header />
      <div className='ordercheckmain'>
        <p className='ordercheckbigtitle'>Order list</p>

        <div className='topordertitle'>
          <p>주문내역 조회({orders.length}건)</p>
          <p>취소/교환/반품 내역</p>
        </div>

        <div>
          <div className='secondchecktitle'>
            <p>상태</p>
            <div className='secondmeum'>
              <p>전체 주문처리상태</p>
            </div>
          </div>

          <div className='daycheckmeum'>
            <p>기간</p>
            <div className='checkdays'>
              <p>오늘</p>
              <p>1개월</p>
              <p>3개월</p>
              <p>6개월</p>
              <p>기간설정</p>
            </div>
          </div>

          <div className='checklistblock'>
            <ul>
              <li>
                완료 후 15개월 이상 경과한 주문은 [과거주문내역]에서 확인할 수
                있습니다.
              </li>
              <li>
                취소/교환/반품 신청은 주문 완료일 기준 30일까지 가능합니다.
              </li>
            </ul>
          </div>

          {/* 주문 내역 리스트 */}
          <div className='thisischecklist'>
            {loading ? (
              <p>로딩 중...</p>
            ) : orders.length === 0 ? (
              <p>주문 내역이 없습니다.</p>
            ) : (
              <div className='order-list-container'>
                {orders.map((order) => (
                  <div key={order.orderId} className='order-item'>
                    <div className='order-summary'>
                      <p>
                        <strong>주문 ID:</strong> {order.orderId}
                      </p>
                      <p>
                        <strong>주문 날짜:</strong>{' '}
                        {new Date(order.orderedAt).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>주문 상태:</strong>{' '}
                        {getOrderStatusLabel(order.orderStatus)}
                      </p>
                      <p>
                        <strong>총 금액:</strong>{' '}
                        {order.totalPrice.toLocaleString()}원
                      </p>
                      {/* 주문 취소 버튼 */}
                      {order.orderStatus === 'ORDERED' && (
                        <button
                          className='cancel-order-btn'
                          onClick={() => handleCancelOrder(order.orderId)}
                        >
                          주문 취소
                        </button>
                      )}
                    </div>

                    <div className='order-products'>
                      {order.orderItems && order.orderItems.length > 0 ? (
                        order.orderItems.map((item) => (
                          <div
                            key={item.productId}
                            className='order-item-detail'
                          >
                            <img
                              src={item.mainImagePath}
                              alt={item.productName}
                              className='order-item-image'
                            />
                            <div className='order-item-info'>
                              <p className='product-name'>{item.productName}</p>
                              <p>수량: {item.quantity}</p>
                              <p>
                                단가: {item.unitPrice.toLocaleString()}원
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>주문 항목이 없습니다.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderCheck;
