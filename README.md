# Chinese handwriting recognition experiment using Google IME API #
:warning: **This project is developed for fun. Please avoid using Google IME API in your production environment as it is not open for public use, and may change at anytime.**

### Description ###
Experiment of Chinese handwriting recognition using Google IME API which is not released for public use. The API endpoint can be found in [Google Translate](https://translate.google.com).

### API endpoint ###
```https://inputtools.google.com/request?ime=handwriting```

### Minimum data to form a valid payload (as of 2019-07-01) ###
```
{
  "options": "enable_pre_space",
  "requests": [
  {
    "writing_guide":
    {
      "writing_area_width": 280,
      "writing_area_height": 280
    },
    "max_num_results": 10,
    "max_completions": 0,
    "language": "zh",
    "ink": [
      [
        [53, 53, 55, 58, 61, 65, 71, 77, 89, 97, 101, 110, 118, 126, 135, 142, 149, 156, 162, 168, 173, 177, 182, 186, 190, 192, 195, 197, 200, 201, 202, 203, 204, 205, 205, 205, 206, 206, 207, 209, 210, 212, 214, 217, 219, 221, 223, 225, 226, 227, 228, 229, 230, 230, 230, 231, 231, 231],
        [153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 153, 153, 153, 153, 153, 153, 153, 153, 153, 154, 154, 154, 154, 154, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        []
      ]
    ]
  }]
}
```

### Node version ###
* Node >= 9

### Run project ###
* `npm install`
* `npm run dev`

### Build production ###
* `npm run build`
