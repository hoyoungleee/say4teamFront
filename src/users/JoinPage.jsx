import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinPage.css';
import axios from 'axios';

const JoinPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone1: '010',
    phone2: '',
    phone3: '',
    email: '',
    birthDate: '',
    address: '',
    termsAgree: false,
    privacyAgree: false,
    allAgree: false,
    marketingAgree: false,
  });

  const openPostCode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address;
        setForm((prevForm) => ({
          ...prevForm,
          address: fullAddress,
        }));
      },
    }).open();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'allAgree') {
        setForm((prev) => ({
          ...prev,
          allAgree: checked,
          termsAgree: checked,
          privacyAgree: checked,
          marketingAgree: checked,
        }));
      } else {
        const updated = {
          ...form,
          [name]: checked,
        };

        if (!checked && (name === 'termsAgree' || name === 'privacyAgree')) {
          updated.allAgree = false;
        }

        if (
          updated.termsAgree &&
          updated.privacyAgree &&
          updated.marketingAgree
        ) {
          updated.allAgree = true;
        }

        setForm(updated);
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.termsAgree || !form.privacyAgree) {
      alert('필수 약관에 동의해주세요.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    axios
      .post('/user-service/user/create', {
        email: form.email,
        password: form.password,
        name: form.name,
        phone: `${form.phone1}-${form.phone2}-${form.phone3}`,
        address: form.address,
        birthDate: form.birthDate,
      })
      .then((res) => {
        console.log('회원가입 성공:', res.data);
        navigate('/member/join-complete');
      })
      .catch((err) => {
        console.error('회원가입 실패:', err.response?.data || err);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      });

    navigate('/member/join-complete');
  };

  return (
    <div className='join-container'>
      <h2>Join</h2>
      <div className='join-steps'>
        <span>정보입력</span>
        <span>가입완료</span>
      </div>
      <form className='join-form' onSubmit={handleSubmit}>
        <div className='form-row'>
          <label>본인인증</label>
          <button type='button'>휴대폰인증</button>
        </div>
        <span>이메일</span>
        <input name='email' value={form.email} onChange={handleChange} />
        <span>비밀번호</span>
        <span className='small'>
          (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16자)
        </span>
        <input
          type='password'
          name='password'
          value={form.password}
          onChange={handleChange}
        />
        <span>비밀번호 확인</span>
        <input
          type='password'
          name='confirmPassword'
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <span>이름</span>
        <input name='name' value={form.name} onChange={handleChange} />
        <label>휴대전화</label>
        <div className='form-row'>
          <select name='phone1' value={form.phone1} onChange={handleChange}>
            <option value='010'>010</option>
            <option value='011'>011</option>
          </select>
          <input name='phone2' value={form.phone2} onChange={handleChange} />
          <input name='phone3' value={form.phone3} onChange={handleChange} />
        </div>
        <span>주소</span>
        <div className='form-row address-row'>
          <input
            type='text'
            name='address'
            className='form-control'
            value={form.address}
            onChange={handleChange}
            placeholder='주소를 입력하세요'
            readOnly
          />
          <button type='button' className='postcode-btn' onClick={openPostCode}>
            우편번호
          </button>
        </div>
        <span>생년월일</span>
        <input
          type='date'
          name='birthDate'
          value={form.birthDate}
          onChange={handleChange}
        />
        <div className='terms-wrapper'>
          <label className='terms-all-agree'>
            <input
              type='checkbox'
              name='allAgree'
              checked={form.allAgree}
              onChange={handleChange}
            />
            <span>
              <strong>전체 동의</strong> 이용약관 및 개인정보수집 및 이용,
              쇼핑정보 수신(선택)에 모두 동의합니다.
            </span>
          </label>

          <div className='terms-item'>
            <label>
              <input
                type='checkbox'
                name='termsAgree'
                checked={form.termsAgree}
                onChange={handleChange}
              />
              <span>이용약관 동의 (필수)</span>
            </label>
            <span className='toggle'>+</span>
          </div>

          <div className='terms-item'>
            <label>
              <input
                type='checkbox'
                name='privacyAgree'
                checked={form.privacyAgree}
                onChange={handleChange}
              />
              <span>개인정보처리방침 동의 (필수)</span>
            </label>
            <span className='toggle'>+</span>
          </div>

          <div className='terms-item'>
            <label>
              <input
                type='checkbox'
                name='marketingAgree'
                checked={form.marketingAgree}
                onChange={handleChange}
              />
              <span>쇼핑정보 수신 동의 (선택)</span>
            </label>
            <span className='toggle'>+</span>
          </div>

          <button className='terms-confirm' onClick={handleSubmit}>
            확인
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinPage;
