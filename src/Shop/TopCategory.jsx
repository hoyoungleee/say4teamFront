import React from 'react';
import './TopCategory.css';

const TopCategory = () => {
  return (
    <div>
      {/* 카테고리의 1열 이미지들 클릭시 text에 따른 카테고리로 들어감*/}
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

      {/* 카테고리의 2열 이미지, 위와 기능은 동일 */}
      <div className='caterorysecondcontent'>
        <div className='buttoncatone'>
          <span>Mirrors</span>
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
