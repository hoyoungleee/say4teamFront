import React, { useRef } from 'react';
import './ReviewModal.css';

const ReviewModal = ({
  onClose,
  onSubmit,
  content,
  setContent,
  image,
  setImage,
}) => {
  const fileInputRef = useRef();

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal-box'>
        <h2 className='modal-title'>리뷰 작성</h2>

        <textarea
          className='modal-textarea'
          placeholder='리뷰를 입력하세요...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className='image-upload-section'>
          <label htmlFor='imageUpload' className='image-upload-label'>
            이미지 첨부
          </label>
          <div className='image-upload-wrapper'>
            <label htmlFor='imageUpload' className='upload-button'>
              이미지 선택
            </label>
            <span className='file-name'>
              {image ? image.name : '선택된 파일 없음'}
            </span>
          </div>
          <input
            type='file'
            accept='image/*'
            id='imageUpload'
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt='미리보기'
              className='image-preview'
            />
          )}
        </div>

        <div className='modal-actions'>
          <button className='submit-button' onClick={onSubmit}>
            작성하기
          </button>
          <button className='cancel-button' onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
