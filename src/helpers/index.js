function isValidSignupCredentials(payload) {
  return isValidUsername(payload) && isValidPassword(payload) && payload.key;
}

function isValidUsername({ username }) {
  const validUsernameRegex = /^([a-zA-Z ]){3,24}$/;
  return (
    typeof username !== 'undefined' &&
    payload.username.replace(/ /g, '').length >= 3 &&
    !payload.username.startsWith(' ') &&
    validUsernameRegex.test(payload.username)
  );
}

function isValidPassword({ password, confirmPassword }) {
  const validPasswordRegex = /^([A-Za-z\d$@$!%*?&]){8,50}$/;
  return (
    typeof password !== 'undefined' &&
    typeof confirmPassword !== 'undefined' &&
    password === confirmPassword &&
    validPasswordRegex.test(password)
  );
}

module.exports = {
  isValidSignupCredentials,
  isValidUsername,
  isValidPassword,
};
