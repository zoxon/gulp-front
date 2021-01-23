const getHiddenElementHeight = (element) => {
  const clone = element.cloneNode(true);
  let height = 0;
  const style = `
    display: block;
    width: ${element.clientWidth}px;
    position: absolute;
    top: 0;
    left: -999rem;
    max-height: none !important;
    height: auto;
    visibility: hidden;
`;

  clone.setAttribute("style", style);
  element.parentElement.append(clone);
  height = clone.clientHeight;
  clone.remove();

  return height;
};

export default getHiddenElementHeight;
