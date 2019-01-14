const tools = {
  verifyMobile: (mobile) => {
    const regMobile = /^1[3, 5, 6, 7, 8, 9]\d{9}$/;
    return regMobile.test(mobile)
  }
}

export default tools;