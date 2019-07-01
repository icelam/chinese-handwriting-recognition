import axios from 'axios';

const recognizeHandwriting = (size, strokes, maxResult = 10, callback) => {
  axios.post('https://inputtools.google.com/request?ime=handwriting', {
    options: 'enable_pre_space',
    requests: [{
      writing_guide:
      {
        writing_area_width: size.width,
        writing_area_height: size.height
      },
      max_num_results: maxResult,
      max_completions: 10,
      language: 'zh',
      ink: strokes
    }]
  }).then(({ data }) => {
    const [status, result] = data;
    if (data[0] === 'SUCCESS') {
      const [, possibleResult] = result[0];
      if (callback && typeof callback === 'function') {
        callback(possibleResult);
      }
    } else {
      callback(`API error:${status}`);
    }
  }).catch((error) => {
    callback(error);
  });
};

export default recognizeHandwriting;
