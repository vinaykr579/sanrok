export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const required = value =>
  value ? undefined : 'This field is required.';

export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const isNumber = value =>
  !isNaN(value) ? undefined : 'Should be a valid number.';

export const validMobileNo = value => {
  let validMobileNoExpr = /^[6-9]\d{9}$/;
  return validMobileNoExpr.test(value) === true
    ? undefined
    : 'Should be a valid mobile no.';
};
