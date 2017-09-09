const code = document.querySelectorAll('pre.code > code');

Array.prototype.forEach.call(code, element => {
  const lines = element.innerHTML.split('\n');
  let code = '';
  const linesCount = lines.length;

  lines.forEach((line, index) => {
    const wrapLine = line => '<div class="code__line">' + line + '</div>';

    if (line.length > 0) {
      code += wrapLine(line);
    }
    else {
      if (linesCount !== index + 1) {
        code += wrapLine(' ');
      }
    }
  });

  element.innerHTML = code;
});
