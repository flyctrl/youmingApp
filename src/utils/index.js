/*
* @Author: baosheng
* @Date:   2018-04-02 22:28:51
* @Last Modified by:   baosheng
* @Last Modified time: 2018-04-02 22:33:05
*/
let baseUrl = 'http://api.yaque365.com'
let imgPrefix = 'http://dx-image-test.itangchao.me/'
let videoPrefix = 'http://dx-video-test.itangchao.me/'

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://api.yaque365.com'
  imgPrefix = 'https://image.youxiangtv.com/'
  videoPrefix = 'https://video.youxiangtv.com/'
  if (TEST) {
    console.log('in TEST')
    baseUrl = 'http://api.yaque365.com'
    imgPrefix = 'http://dx-image-test.itangchao.me/'
    videoPrefix = 'http://dx-video-test.itangchao.me/'
  }
  if (PRE) {
    console.log('in PRE')
    baseUrl = 'http://api.yaque365.com'
  }
}

export { baseUrl, imgPrefix, videoPrefix }
