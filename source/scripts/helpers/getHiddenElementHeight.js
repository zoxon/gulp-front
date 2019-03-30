const getHiddenElementHeight = element => {
  let clone = element.cloneNode(true);
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
  element.parentElement.appendChild(clone);
  height = clone.clientHeight;
  element.parentElement.removeChild(clone);

  return height;
};

export default getHiddenElementHeight;
