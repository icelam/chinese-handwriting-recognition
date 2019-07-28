const handwritingCanvas = (canvasSelector, lineWidthOption = 3, lineJoinOption = 'round', lineCapOption = 'round', strokeStyleOption = '#000000') => {
  const canvas = canvasSelector ? document.querySelector(canvasSelector) : null;
  let ctx;
  let canvasWidth;
  let canvasHeight;

  /* Draw status */
  let drawing = false;
  let drawStartTime; // Timestamp of first interaction
  let strokes = []; // history of current stroke;
  let currentStroke = [[], [], []]; // 0: [Samples of position X], 1: [Samples of position Y], 2: [millseconds since first stroke start] <optional>

  /* Set canvas context */
  const _setContext = () => {
    ctx = canvas.getContext('2d');
  };

  /* Set Canvas Width */
  const _setCanvasWidth = (w) => {
    canvasWidth = w;
  };

  /* Set Canvas Height */
  const _setCanvasHeight = (h) => {
    canvasHeight = h;
  };

  /* Set line join style of canvas */
  const _setLineJoinStyle = (style) => {
    ctx.lineJoin = style;
  };

  /* Set line cap style of canvas */
  const _setLineCapStyle = (style) => {
    ctx.lineCap = style;
  };

  /* Set line cap style of canvas */
  const _setLineWidth = (w) => {
    ctx.lineWidth = w;
  };

  /* Set stroke style of canvas */
  const _setStrokeStyle = (style) => {
    ctx.strokeStyle = style;
  };

  /* Get time from stroke start */
  const _getMillsecondFromStrokeStart = () => {
    if (drawStartTime !== undefined) {
      return new Date().getTime() - drawStartTime;
    }

    drawStartTime = new Date().getTime();

    return 0;
  };

  /* Get mouse pointer position */
  const _getMousePosition = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return { x, y };
  };

  /* Get mobile touch position */
  const _getTouchPosition = (e) => {
    const rootElem = document.documentElement;
    const rect = canvas.getBoundingClientRect();

    const top = rect.top + window.pageYOffset - rootElem.clientTop;
    const left = rect.left + window.pageXOffset - rootElem.clientLeft;

    const touch = e.targetTouches[0] || e.changedTouches[0];
    const touchX = touch.pageX - left;
    const touchY = touch.pageY - top;

    return { touchX, touchY };
  };

  /* Put current stroke to stroke history */
  const _saveStrokeStep = () => {
    strokes.push(currentStroke);
    currentStroke = [[], [], []];
  };

  /* Mouse Down function */
  const _canvasMouseDown = (e) => {
    // Reset status
    currentStroke = [[], [], []];
    drawing = true;

    const ms = _getMillsecondFromStrokeStart();
    const { x, y } = _getMousePosition(e);

    ctx.beginPath();
    ctx.moveTo(x, y);

    currentStroke[0].push(x);
    currentStroke[1].push(y);
    currentStroke[2].push(ms);
  };

  /* Mouse Move function */
  const _canvasMouseMove = (e) => {
    if (drawing) {
      const ms = _getMillsecondFromStrokeStart();
      const { x, y } = _getMousePosition(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      currentStroke[0].push(x);
      currentStroke[1].push(y);
      currentStroke[2].push(ms);
    }
  };

  /* Mouse Up function */
  const _canvasMouseUp = (e) => {
    // End Drawing
    const { x, y } = _getMousePosition(e);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Save stroke and reset status
    _saveStrokeStep();
    drawing = false;
  };

  /* Touch Start function */
  const _canvasTouchStart = (e) => {
    e.preventDefault();

    if (!drawing) {
      // Reset status
      currentStroke = [[], [], []];
      drawing = true;

      const ms = _getMillsecondFromStrokeStart();
      const { touchX, touchY } = _getTouchPosition(e);
      ctx.beginPath();
      ctx.moveTo(touchX, touchY);
      currentStroke[0].push(touchX);
      currentStroke[1].push(touchY);
      currentStroke[2].push(ms);
    }
  };

  /* Touch Move function */
  const _canvasTouchMove = (e) => {
    e.preventDefault();

    if (drawing) {
      const ms = _getMillsecondFromStrokeStart();
      const { touchX, touchY } = _getTouchPosition(e);
      ctx.lineTo(touchX, touchY);
      ctx.stroke();
      currentStroke[0].push(touchX);
      currentStroke[1].push(touchY);
      currentStroke[2].push(ms);
    }
  };

  /* Touch End function */
  const _canvasTouchEnd = (e) => {
    // End Drawing
    const { touchX, touchY } = _getTouchPosition(e);
    ctx.lineTo(touchX, touchY);
    ctx.stroke();

    // Save stroke and reset status
    _saveStrokeStep();
    drawing = false;
  };

  /* Reset canvas */
  const _resetHandwriting = () => {
    if (ctx !== undefined) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawing = false;
      strokes = [];
      drawStartTime = undefined;
    } else {
      console.log('Context undefined');
    }
  };

  /* Get stroke data */
  const _getStrokes = () => (strokes.length ? strokes : [[[], [], []]]);

  /* Get canvas size */
  const _getCanvasSize = () => ({
    width: canvasWidth,
    height: canvasHeight
  });

  /* Init canvas */
  const _init = () => {
    if (canvas !== null && typeof canvas === 'object' && canvas.tagName.toLowerCase() === 'canvas') {
      // Canvas size
      _setCanvasWidth(canvas.width);
      _setCanvasHeight(canvas.height);

      _setContext();

      if (ctx !== undefined) {
        // Set styles
        _setLineCapStyle(lineCapOption);
        _setLineJoinStyle(lineJoinOption);
        _setLineWidth(lineWidthOption);
        _setStrokeStyle(strokeStyleOption);

        // Listeners
        canvas.addEventListener('mousedown', _canvasMouseDown);
        canvas.addEventListener('mousemove', _canvasMouseMove);
        canvas.addEventListener('mouseup', _canvasMouseUp);
        canvas.addEventListener('touchstart', _canvasTouchStart);
        canvas.addEventListener('touchmove', _canvasTouchMove);
        canvas.addEventListener('touchend', _canvasTouchEnd);
      } else {
        console.log('Context undefined');
      }
    } else {
      console.log('Canvas not found.');
    }
  };

  return {
    init: _init,
    resetHandwriting: _resetHandwriting,
    getStrokes: _getStrokes,
    getCanvasSize: _getCanvasSize
  };
};

export default handwritingCanvas;
