import IRegistrationPayload from "../models/IRegistrationPayload";

function isValidSignupCredentials({
  username,
  password,
  confirmPassword,
  key,
}: IRegistrationPayload) {
  return (
    isValidUsername(username) &&
    isValidPassword({ password, confirmPassword }) &&
    typeof key === "string"
  );
}

function isValidUsername(username?: string) {
  const validUsernameRegex = /^([a-zA-Z ]){3,24}$/;
  return (
    typeof username === "string" &&
    username.replace(/ /g, "").length >= 3 &&
    !username.startsWith(" ") &&
    validUsernameRegex.test(username)
  );
}

function isValidPassword({ password, confirmPassword }:
  {
    password?: string,
    confirmPassword?: string,
  }) {
  const validPasswordRegex = /^([A-Za-z\d$@$!%*?&]){8,50}$/;
  return (
    typeof password === "string" &&
    typeof confirmPassword === "string" &&
    password === confirmPassword &&
    validPasswordRegex.test(password)
  );
}

function isAdmin(role: number) {
  return role >= 5;
}

function isModerator(role: number) {
  return role >= 4;
}

export { isValidSignupCredentials, isValidUsername, isValidPassword, isAdmin, isModerator };
