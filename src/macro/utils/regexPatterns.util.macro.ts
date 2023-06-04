const regexPatterns = {
  passwordValidation: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,128}$/g,
  excludeCommaSpaceHyphen: /[^a-zA-Z0-9-, ]/g,
  excludeCommaSpaceDollar: /[^a-zA-Z0-9$, ]/g,
  excludeSpecialCharacter: /[^a-zA-Z0-9]/g,
  excludeIllegalSpecialCharacter: /[^a-zA-Z0-9$,\\[\]-]/g
};
export default regexPatterns;
