import HandwritingCanvas from '@js/handwriting';
import recognizeHandwriting from '@js/recognize';

const resultAreaElem = document.querySelector('.js-result-area');

/* Input Canvas init */
const InputHandwrite = new HandwritingCanvas('.js-paper-canvas');
InputHandwrite.init();

/* Clear Canvas */
document.querySelector('.js-canvas-clear').addEventListener('click', () => {
  InputHandwrite.resetHandwriting();
  resultAreaElem.value = '';
});

/* Recognize text draw on canvas */
const displayResult = (result) => {
  resultAreaElem.value = (Array.isArray(result) ? result.join(', ') : result);
};

document.querySelector('.js-canvas-submit').addEventListener('click', () => {
  const strokeData = InputHandwrite.getStrokes();
  const canvasSize = InputHandwrite.getCanvasSize();
  recognizeHandwriting(canvasSize, strokeData, 10, displayResult);
});
