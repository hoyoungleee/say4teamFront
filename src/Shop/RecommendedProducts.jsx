import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './RecommendedProducts.css';
import ReviewSortDropdown from './ReviewSortDropdown';
import { useEffect, useState } from 'react';
import axiosInstance from '../configs/axios-config';
import { API_BASE_URL, PROD, REVIEW } from '../configs/host-config';
import ReviewModal from './ReviewModal';
import { useNavigate } from 'react-router-dom';

const RecommendedSlider = ({ productId }) => {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [sortOrder, setSortOrder] = useState('추천순');
  const [keyword, setKeyword] = useState('');

  const isLoggedIn = !!localStorage.getItem('ACCESS_TOKEN');
  const navigate = useNavigate();

  // 클릭 시 상세페이지 이동 함수
  const handleClick = (id) => {
    navigate(`/product/detail/${id}`);
  };

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const params = {
          page: 0,
          size: 8,
          sort: 'stockQuantity,asc',
        };
        const response = await axiosInstance.get(
          `${API_BASE_URL}${PROD}/list`,
          { params },
        );
        setRecommendedItems(response.data.result);
      } catch (error) {
        console.error('추천 상품 로딩 실패:', error);
      }
    };
    fetchRecommended();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_BASE_URL}${REVIEW}/list/${productId}`,
        );
        const result = response.data?.result;

        if (Array.isArray(result)) {
          setReviews(result);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error('리뷰 목록 불러오기 실패:', error);
        setReviews([]);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('내용을 입력하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      if (editingReview) {
        await axiosInstance.patch(
          `${API_BASE_URL}${REVIEW}/update/${editingReview.reviewId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
            },
          },
        );
        alert('리뷰가 수정되었습니다.');
        setContent('');
        setImage(null);
        setShowForm(false);
        setEditingReview(null);
      } else {
        await axiosInstance.post(`${API_BASE_URL}${REVIEW}/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          },
        });
        alert('리뷰가 작성되었습니다.');
      }

      setContent('');
      setImage(null);
      setEditingReview(null);
      setShowForm(false);

      const response = await axiosInstance.get(
        `${API_BASE_URL}${REVIEW}/list/${productId}`,
      );
      setReviews(response.data.result);
    } catch (err) {
      console.error('리뷰 등록/수정 실패', err);
      // --- 여기를 수정합니다 ---
      if (err.response && err.response.data) {
        const errorMessage = err.response.data; // 백엔드에서 보낸 에러 메시지 (String)

        if (errorMessage === '구매한 상품만 리뷰 작성 가능합니다.') {
          alert('⚠️ 구매 이력이 있는 상품만 리뷰를 작성할 수 있습니다.');
        } else if (
          errorMessage === '배송 완료된 상품만 리뷰 작성 가능합니다.'
        ) {
          alert('⚠️ 배송이 완료된 상품에 대해서만 리뷰를 작성할 수 있습니다.');
        } else {
          // 그 외의 다른 400 Bad Request 에러나 알 수 없는 에러
          alert(`리뷰 등록/수정 실패: ${errorMessage}`); // 상세 에러 메시지를 보여줄 수 있음
        }
      } else {
        // 네트워크 오류, 서버 응답 없음 등 (err.response가 없을 때)
        alert('리뷰 등록/수정 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleEditClick = (review) => {
    setEditingReview(review);
    setContent(review.content);
    setImage(null);
    setShowForm(true);
  };

  const handleDelete = async (reviewEmail) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await axiosInstance.delete(
        `${API_BASE_URL}${REVIEW}/delete/${reviewEmail}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          },
        },
      );

      alert('리뷰가 삭제되었습니다.');

      const refreshed = await axiosInstance.get(
        `${API_BASE_URL}${REVIEW}/list/${productId}`,
      );
      setReviews(refreshed.data.result);
    } catch (err) {
      console.error('리뷰 삭제 실패', err);
      alert('삭제 실패');
    }
  };

  const getSortedReviews = () => {
    const sorted = [...reviews];
    if (sortOrder === '최신순') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === '추천순') {
      sorted.sort((a, b) => b.likes - a.likes); // likes 없으면 삭제 가능
    }
    return sorted;
  };

  const getFilteredReviews = () => {
    return getSortedReviews().filter((review) =>
      review.content.toLowerCase().includes(keyword.toLowerCase()),
    );
  };

  return (
    <div className='recommended-wrapper' style={{ marginTop: '50px' }}>
      <h3 className='recommended-title'>추천 상품</h3>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={60}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        loop={false}
        className='recommended-swiper'
        slidesPerGroup={4}
      >
        {recommendedItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className='recommended-card'
              onClick={() => handleClick(item.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={item.thumbnailPath || item.imgUrl}
                alt={item.name}
                className='recommended-image'
              />
              <div className='recommended-name'>{item.name}</div>
              <div className='recommended-price'>
                {item.price.toLocaleString()}원
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='review-section'>
        <div className='review-header'>
          <h3 className='review-title'>
            REVIEW ({Array.isArray(reviews) ? reviews.length : 0})
          </h3>
          <div className='review-actions'>
            {isLoggedIn && (
              <button
                className='review-button'
                onClick={() => setShowForm(true)}
              >
                상품 리뷰 작성하기
              </button>
            )}
            {showForm && (
              <ReviewModal
                onClose={() => setShowForm(false)}
                onSubmit={handleSubmit}
                content={content}
                setContent={setContent}
                image={image}
                setImage={setImage}
              />
            )}
          </div>
        </div>
        <h1></h1>
        <div className='review-empty'>
          {getFilteredReviews().length === 0 ? (
            <div className='review-empty'>
              <p>리뷰가 없습니다.</p>
              <strong>리뷰를 작성해 보세요!</strong>
            </div>
          ) : (
            <ul className='review-list'>
              {getFilteredReviews().map((review) => (
                <li key={review.reviewId} className='review-item'>
                  <p>{review.content}</p>
                  {review.mediaUrl && (
                    <img
                      src={review.mediaUrl}
                      alt='리뷰 이미지'
                      className='review-image'
                    />
                  )}
                  <span className='review-user'>{review.name}</span>

                  {localStorage.getItem('USER_EMAIL')?.trim() ===
                    review.email?.trim() && (
                    <div className='review-buttons'>
                      <button onClick={() => handleEditClick(review)}>
                        수정
                      </button>
                      <button onClick={() => handleDelete(review.reviewId)}>
                        삭제
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedSlider;
