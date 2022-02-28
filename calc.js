const calcApp = () => {
  'use strict';

  const screen = document.getElementById('screen');
  const resKey = document.querySelector('.res-key');
  const delKey = document.querySelector('.del-key');
  const resetKey = document.querySelector('.reset-key');

  const switchThemesHandler = () => {
    const bodyClasses = document.body.classList.value.split(' ');

    const currentTheme = bodyClasses.find(className => {
      return className.includes('theme');
    });

    let nextTheme = 'theme1';

    switch (currentTheme) {
      case undefined:
      case 'theme1':
        nextTheme = 'theme2';
        break;

      case 'theme2':
        nextTheme = 'theme3';
        break;
    }

    document.body.classList.replace(currentTheme, nextTheme);
  };

  // type => OPERAND | OPERATION | RESULT | ERROR
  const writeOnScreen = (data, type) => {
    switch (type) {
      case 'RESULT':
        screen.innerHTML = `<span id="result">${data}</span>`;
        break;
      case 'ERROR':
        screen.innerHTML = `<span id="error">${data}</span>`;
        break;
      case 'OPERAND':
        if (screen.querySelectorAll('#result, #error').length > 0) {
          screen.innerHTML = data;
        } else {
          screen.innerHTML += data;
          screen.scrollLeft = screen.scrollWidth;
        }
        break;
      case 'OPERATION':
        if (screen.querySelector('#error')) {
          screen.innerHTML = data;
        } else if (screen.querySelector('#result')) {
          screen.innerHTML = screen.querySelector('#result').innerText + data;
        } else {
          screen.innerHTML += data;
          screen.scrollLeft = screen.scrollWidth;
        }
        break;
      default:
        screen.innerHTML = data;
    }
  };

  const resultHandler = () => {
    if (screen.querySelectorAll('#result, #error').length > 0) {
      return;
    }

    const equation = screen.innerText;

    try {
      const result = eval(equation);
      writeOnScreen(result, 'RESULT');
    } catch (error) {
      writeOnScreen('Error', 'ERROR');
    }
  };

  const resetHandler = () => {
    writeOnScreen('');
  };

  const delHandler = () => {
    if (screen.querySelectorAll('#result, #error').length > 0) {
      resetHandler();
      return;
    }

    writeOnScreen(screen.innerText.substring(0, screen.innerText.length - 1));
  };

  const toggleBtn = document.getElementById('toggle-btn');

  toggleBtn.addEventListener('click', switchThemesHandler);

  const defKeys = document.getElementsByClassName('def-key');

  for (let idx = 0; idx < defKeys.length; idx++) {
    defKeys.item(idx).addEventListener('click', () => {
      writeOnScreen(
        defKeys.item(idx).dataset['operand'] ||
          defKeys.item(idx).dataset['operation'],
        defKeys.item(idx).dataset['operand'] ? 'OPERAND' : 'OPERATION'
      );
    });
  }

  resKey.addEventListener('click', resultHandler);
  delKey.addEventListener('click', delHandler);
  resetKey.addEventListener('click', resetHandler);
};

calcApp();
