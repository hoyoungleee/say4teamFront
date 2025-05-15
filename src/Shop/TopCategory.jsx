import React from 'react';
import './TopCategory.css';

const TopCategory = ({ onSelectCategory }) => {
  return (
    <div className='category-wrapper'>
      {/* 카테고리 1열 */}
      <div className='categoryfirstcontent'>
        <div className='topcatone' onClick={() => onSelectCategory(2)}>
          <span>É</span>
        </div>
        <div className='topcattwo' onClick={() => onSelectCategory(3)}>
          <span>Textiles</span>
        </div>
        <div className='topcatthree' onClick={() => onSelectCategory(4)}>
          <span>Homedeco</span>
        </div>
      </div>

      {/* 카테고리 2열 */}
      <div className='caterorysecondcontent'>
        <div className='buttoncatone' onClick={() => onSelectCategory(5)}>
          <span>Mirror</span>
        </div>
        <div className='buttoncattwo' onClick={() => onSelectCategory(6)}>
          <span>Lighting</span>
        </div>
        <div className='buttoncatthree' onClick={() => onSelectCategory(7)}>
          <span>Lifestyle</span>
        </div>
        <div className='buttoncatfour' onClick={() => onSelectCategory(8)}>
          <span>Goods</span>
        </div>
      </div>
    </div>
  );
};

export default TopCategory;
