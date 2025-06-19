import React, { useState, useRef } from 'react'; // useRef 추가
import { useNavigate } from 'react-router-dom';
import './JoinPage.css';
import axios from 'axios';
import axiosInstance from '../configs/axios-config';
import { API_BASE_URL, USER } from '../configs/host-config';

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

  // 유효성 검사 오류 메시지를 저장할 상태
  const [errors, setErrors] = useState({});

  // phone2, phone3 input 엘리먼트에 접근하기 위한 ref
  const phone2Ref = useRef(null);
  const phone3Ref = useRef(null);

  const openPostCode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address;
        setForm((prevForm) => ({
          ...prevForm,
          address: fullAddress,
        }));
        // 주소 필드 유효성 검사 오류 초기화
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: '',
        }));
      },
    }).open();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // 특정 필드에 대한 오류 메시지 초기화
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
      ...(name === 'password' || name === 'confirmPassword'
        ? { password: '', confirmPassword: '' }
        : {}), // 비밀번호 관련 오류 초기화
      ...(name === 'termsAgree' || name === 'privacyAgree'
        ? { termsAgree: '', privacyAgree: '' }
        : {}), // 약관 관련 오류 초기화
      ...(name === 'phone2' || name === 'phone3' ? { phone: '' } : {}), // 전화번호 관련 오류 초기화
    }));

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

        // 'termsAgree', 'privacyAgree', 'marketingAgree' 모두 체크되면 'allAgree'도 체크
        if (
          updated.termsAgree &&
          updated.privacyAgree &&
          updated.marketingAgree
        ) {
          updated.allAgree = true;
        } else {
          updated.allAgree = false; // 하나라도 체크 해제되면 전체 동의 해제
        }

        setForm(updated);
      }
    } else {
      // 휴대전화 필드 숫자만 입력 및 자동 넘김 처리
      if (name === 'phone2' || name === 'phone3') {
        const numericValue = value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
        let nextFieldRef = null;

        if (name === 'phone2' && numericValue.length >= 4) {
          // 4자리 입력 시 다음 칸으로
          nextFieldRef = phone3Ref;
        } else if (name === 'phone3' && numericValue.length >= 4) {
          // phone3이 4자리를 넘으면 더 이상 이동할 필드가 없으므로, 필요시 다른 로직 추가
        }

        setForm((prev) => ({
          ...prev,
          [name]: numericValue.slice(0, 4), // 4자리까지만 유지
        }));

        if (nextFieldRef && nextFieldRef.current && numericValue.length >= 4) {
          nextFieldRef.current.focus();
        }
      } else {
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  // 폼 유효성 검사 함수
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // 이메일 유효성 (간단한 형식 검사)
    if (!form.email) {
      newErrors.email = '이메일을 입력해주세요.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다.';
      isValid = false;
    }

    // 비밀번호 유효성 검사 (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16자)
    const password = form.password;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const charTypeCount = [hasLetter, hasNumber, hasSpecial].filter(
      Boolean,
    ).length;

    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.';
      isValid = false;
    } else if (password.length < 8 || password.length > 16) {
      newErrors.password = '비밀번호는 8~16자여야 합니다.';
      isValid = false;
    } else if (charTypeCount < 2) {
      newErrors.password =
        '영문 대소문자/숫자/특수문자 중 2가지 이상을 조합해야 합니다.';
      isValid = false;
    }

    // 비밀번호 확인
    if (!form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
      isValid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    // 이름 유효성
    if (!form.name) {
      newErrors.name = '이름을 입력해주세요.';
      isValid = false;
    }

    // 휴대전화 유효성 (phone2는 3~4자리, phone3는 4자리여야 함)
    if (!form.phone2 || form.phone2.length < 3 || form.phone2.length > 4) {
      newErrors.phone = '휴대전화 중간 번호 3~4자리를 입력해주세요.';
      isValid = false;
    } else if (!form.phone3 || form.phone3.length !== 4) {
      newErrors.phone = '휴대전화 마지막 번호 4자리를 입력해주세요.';
      isValid = false;
    }

    // 주소 유효성
    if (!form.address) {
      newErrors.address = '주소를 입력해주세요.';
      isValid = false;
    }

    // 생년월일 유효성
    if (!form.birthDate) {
      newErrors.birthDate = '생년월일을 입력해주세요.';
      isValid = false;
    }

    // 필수 약관 동의
    if (!form.termsAgree) {
      newErrors.termsAgree = '이용약관에 동의해야 합니다.';
      isValid = false;
    }
    if (!form.privacyAgree) {
      newErrors.privacyAgree = '개인정보처리방침에 동의해야 합니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사 수행
    const isValid = validateForm();

    if (isValid) {
      axiosInstance
        // .post('/user-service/user/create', {
        .post(`${API_BASE_URL}${USER}/create`, {
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
    } else {
      console.log('유효성 검사 실패', errors);
      // alert('입력 정보를 확인해주세요.'); // 모든 에러가 하단에 표시되므로 불필요
    }
  };

  return (
    <div className='join-container'>
      <h2>Join</h2>
      <div className='join-steps'>
        <span>정보입력</span>
        <span> / </span>
        <span>가입완료</span>
      </div>
      <form className='join-form' onSubmit={handleSubmit}>
        <span>이메일</span>
        <input
          name='email'
          value={form.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''} // 빨간 테두리
        />
        {errors.email && <p className='error-message'>{errors.email}</p>}{' '}
        {/* 에러 메시지 */}
        <span>비밀번호</span>
        <span className='small'>
          (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16자)
        </span>
        <input
          type='password'
          name='password'
          value={form.password}
          onChange={handleChange}
          className={errors.password ? 'input-error' : ''} // 빨간 테두리
        />
        {errors.password && <p className='error-message'>{errors.password}</p>}{' '}
        {/* 에러 메시지 */}
        <span>비밀번호 확인</span>
        <input
          type='password'
          name='confirmPassword'
          value={form.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? 'input-error' : ''} // 빨간 테두리
        />
        {errors.confirmPassword && (
          <p className='error-message'>{errors.confirmPassword}</p> // 에러 메시지
        )}
        <span>이름</span>
        <input
          name='name'
          value={form.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''} // 빨간 테두리
        />
        {errors.name && <p className='error-message'>{errors.name}</p>}{' '}
        {/* 에러 메시지 */}
        <label>휴대전화</label>
        <div className='form-row'>
          <select name='phone1' value={form.phone1} onChange={handleChange}>
            <option value='010'>010</option>
            <option value='011'>011</option>
            <option value='016'>016</option>
            <option value='017'>017</option>
            <option value='018'>018</option>
            <option value='019'>019</option>
          </select>
          <input
            name='phone2'
            value={form.phone2}
            onChange={handleChange}
            ref={phone2Ref} // ref 추가
            maxLength='4' // 4자리 이상 입력 방지
            className={errors.phone ? 'input-error' : ''} // 빨간 테두리
          />
          <input
            name='phone3'
            value={form.phone3}
            onChange={handleChange}
            ref={phone3Ref} // ref 추가
            maxLength='4' // 4자리 이상 입력 방지
            className={errors.phone ? 'input-error' : ''} // 빨간 테두리
          />
        </div>
        {errors.phone && <p className='error-message'>{errors.phone}</p>}{' '}
        {/* 에러 메시지 */}
        <span>주소</span>
        <div className='form-row address-row'>
          <input
            type='text'
            name='address'
            className={`form-control ${errors.address ? 'input-error' : ''}`} // 빨간 테두리
            value={form.address}
            onChange={handleChange}
            placeholder='주소를 입력하세요'
            readOnly
          />
          <button type='button' className='postcode-btn' onClick={openPostCode}>
            우편번호
          </button>
        </div>
        {errors.address && <p className='error-message'>{errors.address}</p>}{' '}
        {/* 에러 메시지 */}
        <span>생년월일</span>
        <input
          type='date'
          name='birthDate'
          value={form.birthDate}
          onChange={handleChange}
          className={errors.birthDate ? 'input-error' : ''} // 빨간 테두리
        />
        {errors.birthDate && (
          <p className='error-message'>{errors.birthDate}</p>
        )}{' '}
        {/* 에러 메시지 */}
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
          {errors.termsAgree && (
            <p className='error-message'>{errors.termsAgree}</p> // 에러 메시지
          )}

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
          {errors.privacyAgree && (
            <p className='error-message'>{errors.privacyAgree}</p> // 에러 메시지
          )}

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

          <button type='submit' className='terms-confirm'>
            {' '}
            {/* type="submit" 추가 */}
            확인
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinPage;
