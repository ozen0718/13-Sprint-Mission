document.addEventListener("DOMContentLoaded", () => {
  // 전역 변수로 각 필드 유효성 상태 저장
  let emailValid = false;
  let nickValid = false;
  let pwValid = false;
  let pwConfirmValid = false;

  // 이메일 유효성 검증 함수
  function validateEmail(email) {
    const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
  }

  // DOM 요소 선택
  const loginFrm = document.getElementById("login");
  const signupFrm = document.getElementById("signup");
  const emailInp = document.getElementById("email");
  const nickInp = document.getElementById("nick");
  const pwInp = document.getElementById("pw");
  const pwConfirmInp = document.getElementById("pwConfirm");
  const submitBtn = document.querySelector('.auth-wrap form button[type="submit"]');

  // 오류 메시지 표시 함수
  function showErr(inp, errId) {
    const errElem = document.getElementById(errId);
    errElem.style.display = "block";
    inp.style.border = "1px solid #f74747";
  }

  // 오류 메시지 숨기기 함수
  function hideErr(inp, errId) {
    const errElem = document.getElementById(errId);
    errElem.style.display = "none";
    inp.style.border = "none";
  }

  // 이메일 유효성 검증 및 오류 처리
  function checkEmail() {
    const emailVal = emailInp.value.trim();
    emailValid = false;
    hideErr(emailInp, "emailErrEmpty");
    hideErr(emailInp, "emailErrInvalid");

    if (!emailVal) {
      showErr(emailInp, "emailErrEmpty");
    } else if (!validateEmail(emailVal)) {
      showErr(emailInp, "emailErrInvalid");
    } else {
      emailValid = true;
    }
    updateSubmitState();
  }

  // 닉네임 유효성 검증 및 오류 처리
  function checkNick() {
    const nickVal = nickInp.value.trim();
    nickValid = false;
    hideErr(nickInp, "nickErrEmpty");

    if (!nickVal) {
      showErr(nickInp, "nickErrEmpty");
    } else {
      nickValid = true;
    }
    updateSubmitState();
  }

  // 비밀번호 유효성 검증 및 오류 처리
  function checkPw() {
    const pwVal = pwInp.value.trim();
    pwValid = false;
    hideErr(pwInp, "pwErrEmpty");
    hideErr(pwInp, "pwErrInvalid");

    if (!pwVal) {
      showErr(pwInp, "pwErrEmpty");
    } else if (pwVal.length < 8) {
      showErr(pwInp, "pwErrInvalid"); 
    } else {
      pwValid = true;
    }
    updateSubmitState();

    if (signupFrm) {
      checkPwConfirm();
    }
  }

  // 비밀번호 확인 유효성 검증 및 오류 처리
  function checkPwConfirm() {
    const pwConfirmVal = pwConfirmInp.value.trim();
    pwConfirmValid = false;
    hideErr(pwConfirmInp, "pwConfirmInitErr");
    hideErr(pwConfirmInp, "pwConfirmErr");

    if (!pwValid) {
      showErr(pwConfirmInp, "pwConfirmInitErr");
    } else if (pwConfirmVal !== pwInp.value.trim()) {
      showErr(pwConfirmInp, "pwConfirmErr");
    } else {
      pwConfirmValid = true;
    }
    updateSubmitState(); 
  }

  // 제출 버튼 활성화 상태 업데이트
  function updateSubmitState() {
    let formValid = emailValid && pwValid; 
    if (signupFrm) {
      formValid = formValid && nickValid && pwConfirmValid; 
    }
    submitBtn.disabled = !formValid; 
  }

  // 비밀번호 표시/숨기기 토글
  function togglePwVisibility(e) {
    const btn = e.currentTarget; 
    const inp = btn.parentElement.querySelector("input"); 
    const icon = btn.querySelector(".pw-toggle-icon"); 
    const isVisible = inp.type === "text"; 

    // 비밀번호 입력 필드 타입 및 아이콘 변경
    inp.type = isVisible ? "password" : "text";
    icon.src = isVisible ? "images/icon/invisible.svg" : "images/icon/visible.svg";
    icon.alt = isVisible ? "비밀번호 숨김 상태 아이콘" : "비밀번호 표시 상태 아이콘";
    btn.setAttribute(
      "aria-label",
      isVisible ? "비밀번호 보기" : "비밀번호 숨기기"
    );
  }

  // 이벤트 리스너 등록
  if (emailInp) emailInp.addEventListener("focusout", checkEmail); 
  if (nickInp) nickInp.addEventListener("focusout", checkNick); 
  if (pwInp) pwInp.addEventListener("input", checkPw); 
  if (pwConfirmInp) pwConfirmInp.addEventListener("input", checkPwConfirm); 

  const toggleBtns = document.querySelectorAll(".pw-toggle-btn"); 
  toggleBtns.forEach((btn) => btn.addEventListener("click", togglePwVisibility)); 

  // 로그인 폼 제출 시 페이지 이동
  if (loginFrm) {
    loginFrm.addEventListener("submit", (e) => {
      e.preventDefault(); 
      window.location.href = "items.html"; 
    });
  }

  // 회원가입 폼 제출 시 페이지 이동
  if (signupFrm) {
    signupFrm.addEventListener("submit", (e) => {
      e.preventDefault(); 
      window.location.href = "signup.html"; 
    });
  }

  updateSubmitState(); 
});

