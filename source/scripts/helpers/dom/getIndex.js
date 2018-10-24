function getIndex(element) {
  let i = 0;

  if (!element) {
    return -1;
  }

  do {
    i++;
  } while ((element = element.previousElementSibling));

  return i;
}

export default getIndex;
