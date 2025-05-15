import { useState } from 'react';
import './RecommendedProducts.css';

const ReviewSortDropdown = ({ sortOrder, setSortOrder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSortOrder(value);
    setIsOpen(false);
  };

  return (
    <div className='review-sort-container'>
      <button className='review-sort-button' onClick={() => setIsOpen(!isOpen)}>
        {sortOrder} <span className='arrow'>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <ul className='review-sort-options'>
          <li
            onClick={() => handleSelect('추천순')}
            className={sortOrder === '추천순' ? 'active' : ''}
          >
            추천순
          </li>
          <li
            onClick={() => handleSelect('최신순')}
            className={sortOrder === '최신순' ? 'active' : ''}
          >
            최신순
          </li>
          <li className='disabled'>리뷰 정렬 기준</li>
        </ul>
      )}
    </div>
  );
};

export default ReviewSortDropdown;
