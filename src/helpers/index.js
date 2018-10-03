const isValidSignupCredentials = payload => {
  const validUsernameRegex = /^([a-zA-Z ]){3,24}$/;
  const validPasswordRegex = /^([A-Za-z\d$@$!%*?&]){8,50}$/;
  return (
    payload.username &&
    payload.password &&
    payload.confirmPassword &&
    payload.key &&
    payload.password === payload.confirmPassword &&
    payload.username.replace(/ /g, '').length >= 3 &&
    !payload.username.startsWith(' ') &&
    validUsernameRegex.test(payload.username) &&
    validPasswordRegex.test(payload.password)
  );
};

module.exports = {
  isValidSignupCredentials
}