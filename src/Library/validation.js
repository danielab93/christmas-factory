const hasProductNameMinLength = (name, stringLength) => 
name.length > stringLength;

  const isPriceGreaterThanZero = (price) => price > 0;
  const hasValidCategory = (category) => category !== '';
  const isValidEmail = (email) => email.includes('@');

  const isProductValid = (product) => // hier keine geschweiften Klammern notwendig
  hasProductNameMinLength(product.name, 3)
  && isPriceGreaterThanZero(product.price)
  && hasValidCategory(product.category)
  && isValidEmail(product.contactEmail);


  export default isProductValid;