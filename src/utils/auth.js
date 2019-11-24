export function checkIfLoggedIn() {
  if (localStorage.getItem('userData')) {
    return true;
  }
  return false;
}

export function getUserData() {
  return JSON.parse(localStorage.getItem('userData'));
}

export function saveUserData(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}
