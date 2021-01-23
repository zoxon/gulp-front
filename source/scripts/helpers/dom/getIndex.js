function getIndex(element) {
  let index = 0;

  if (!element) {
    return -1;
  }

  do {
    index++;
  } while ((element = element.previousElementSibling));

  return index;
}

export default getIndex;
