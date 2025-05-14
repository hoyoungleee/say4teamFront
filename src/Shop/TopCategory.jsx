import React from 'react';
import './TopCategory.css';

const TopCategory = () => {
  return (
    <div className='category-wrapper'>
      {/* 카테고리 1열 */}
      <div className='categoryfirstcontent'>
        <div className='topcatone'>
          <span>É</span>
        </div>
        <div className='topcattwo'>
          <span>Textiles</span>
        </div>
        <div className='topcatthree'>
          <span>Homedeco</span>
        </div>
      </div>

      {/* 카테고리 2열 */}
      <div className='caterorysecondcontent'>
        <div className='buttoncatone'>
          <span>Mirror</span>
        </div>
        <div className='buttoncattwo'>
          <span>Lighting</span>
        </div>
        <div className='buttoncatthree'>
          <span>Lifestyle</span>
        </div>
        <div className='buttoncatfour'>
          <span>Goods</span>
        </div>
      </div>
    </div>
  );
};

export default TopCategory;
