const checkFormValidity = inputs => {
  const invalidFields = [].slice.call(inputs).filter(element => {
    element.checkValidity();
    return !element.validity.valid;
  });

  return invalidFields.length === 0;
};

export default checkFormValidity;
