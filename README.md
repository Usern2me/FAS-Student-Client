# FAS-Student-Client

人脸考勤系统 学生端

1. 在 chrome 使用 WebRTC 相机 GetUserMedia()要用 HTTPS =>
   [使用 OpenSSL 在 local 上运行 https](https://codeburst.io/running-local-development-server-on-https-c3f80197ac4f)  
    [如何使用 HTML5 实现拍照上传应用](https://www.oschina.net/question/89964_48549)  
    还有一种方法是设置 input type=file accept="image/\*"(video)可以捕获视频或照片  
    但是是直接调起本地相机 体验不是很好
2. 调起摄像头图片比例不对且有些机型照片方向不对，调照片方向可以用一个库解决，调比例我这里手动解决，注意 canvas 里面的坐标系.  
   [canvas 图像旋转与翻转姿势解锁](https://aotu.io/notes/2017/05/25/canvas-img-rotate-and-flip/index.html)
3. 跨域问题的解决后端设置 Access-Control-Allow-Origin 和各种需要的方法,post,patch,delete,put,
   复杂请求的 OPTIONS 请求里浏览器先发 origin 和 access-control-request-headers 和请求方法，然后服务端回复已经设置好的请求的方法和 acao，max-age 之类，状态码为 204。第二次就可以开始正式请求。
4. 图片转 base64 太大，在后端的 app.use 里使用 bodyParse 的时候传入一下参数，调整大小，默认是 1m
5. class的方法里面this指向undefined?? this.fn提示找不到这个方法，在构造函数里Bind也没用，解决办法，在class外面变量声明声明函数，class里面的函数直接用方法变量名调用。
