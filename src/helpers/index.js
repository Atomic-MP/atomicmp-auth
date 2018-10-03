function isValidSignupCredentials({
  username,
  password,
  confirmPassword,
  key,
}) {
  return (
    isValidUsername(username) &&
    isValidPassword({ password, confirmPassword }) &&
    key
  );
}

function isValidUsername(username) {
  const validUsernameRegex = /^([a-zA-Z ]){3,24}$/;
  return (
    typeof username !== 'undefined' &&
    username.replace(/ /g, '').length >= 3 &&
    !username.startsWith(' ') &&
    validUsernameRegex.test(username)
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
