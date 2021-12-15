// [엘리먼트 변수]
// 여기에 querySelector를 이용해 상호작용을 해야 하는 모든 엘리먼트를 전역변수로 지정하세요
const btnSignup = document.querySelector('#btn-signup')
const formId = document.querySelector('#input-id')
const formPassword = document.querySelector('#input-pw')
const formPasswordRe = document.querySelector('#input-pw-re')

const inputId = document.querySelector('#input-id input')
const inputPassword = document.querySelector('#input-pw input')
const inputPasswordRe = document.querySelector('#input-pw-re input')

// [이벤트 핸들러]
function handleInputIdChange() {
  let valid = moreThanLength(inputId.value, 4)
  if (valid) {
    setAsValid('#input-id')
  }
  else {
    displayErrorMessage('#input-id', '아이디는 4자 이상을 입력하세요')
  }
}

function handleInputPwChange() {
  let valid = strongPassword(inputPassword.value)
  if (valid) {
    setAsValid('#input-pw')
  }
  else {
    displayErrorMessage('#input-pw', '최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함입니다')
  }
}

function handleInputPwReChange() {
  let valid = isPasswordMatches(inputPassword.value, inputPasswordRe.value)
  if (valid) {
    setAsValid('#input-pw-re')
  }
  else {
    displayErrorMessage('#input-pw-re', '비밀번호가 서로 다릅니다')
  }
}

function handleBtnSignupClick() {
  let validId = moreThanLength(inputId.value, 4)
  let validPw = strongPassword(inputPassword.value)
  let validPwRe = isPasswordMatches(inputPassword.value, inputPasswordRe.value)

  if (validId && validPw && validPwRe) {
    hideInvalidMessage()
  }
  else {
    showInvalidMessage('필요한 정보를 다 입력하지 않았어요');
  }
}

// [유효성 검증 함수]
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}

function isPasswordMatches(pw, pwre) {
  return pw === pwre
}

function moreThanLength(str, n) {
  return str.length >= n; // 항상 true 또는 false로 리턴하게 만드는 게 좋습니다.
}

// [시각적 피드백]
function displayErrorMessage(selector, text) {
  let form = document.querySelector(selector) // label.input-form
  form.classList.remove('valid')
  form.classList.add('invalid')

  let icon = form.querySelector('.fa') // label.input-form 아래에서 .fa를 찾게 됩니다.
  icon.classList.add('fa-times') // x자 아이콘
  icon.classList.remove('fa-check-circle') // 체크표시 아이콘

  let msg = form.querySelector('.message')
  msg.textContent = text;
}

function setAsValid(selector) {
  let form = document.querySelector(selector)
  form.classList.remove('invalid')
  form.classList.add('valid')

  let icon = form.querySelector('.fa')
  icon.classList.remove('fa-times')
  icon.classList.add('fa-check-circle')

  let msg = form.querySelector('.message')
  msg.textContent = ''
}

function showInvalidMessage(text) {
  let div = document.querySelector('#invalid-message')
  div.classList.add('show')
  div.textContent = text
}

function hideInvalidMessage() {
  let div = document.querySelector('#invalid-message')
  div.classList.remove('show')
}

// [엘리먼트와 이벤트 핸들러의 연결]
btnSignup.onclick = handleBtnSignupClick;
formId.onkeyup = handleInputIdChange;
formPassword.onkeyup = handleInputPwChange;
formPasswordRe.onkeyup = handleInputPwReChange;
