const GIFEncoder = require('gifencoder');
const { createCanvas , Image} = require('canvas');
const fs = require('fs');
var gifFrames = require('gif-frames');

const width = 218;
const height = 120; 
const repeat = -1;
const delay = 500;
const quality = 10;
const target = './gifTest/images/test/test.gif';
const imageList = [
    './gifTest/images/test/1.jpg',
    './gifTest/images/test/2.jpg',
    './gifTest/images/test/3.jpg'
];

//이미지 리스트 gif 변경 저장 하기
const encoder = new GIFEncoder(width, height);
encoder.createReadStream().pipe(fs.createWriteStream(target));
encoder.start();
encoder.setRepeat(repeat);   
encoder.setDelay(delay);  
encoder.setQuality(quality); 
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');
imageList.map(imgUrl => {
    var img = new Image();
    img.src = imgUrl;
    ctx.drawImage(img, 0, 0, width, height);
    encoder.addFrame(ctx);
});
 
encoder.finish();
//이미지 리스트 gif 변경 저장 하기 끝

// gif 원레 원레 이미지로 되돌리기 (확장자 상관없이 outputType 에 입력된 확장자로 떨굼)
gifFrames(
{ url: target, frames: '0-2', outputType: 'png', cumulative: true },
function (err, frameData) {
    if (err) {
    throw err;
    }
    console.log(frameData);
    frameData.forEach(function (frame) {
    frame.getImage().pipe(fs.createWriteStream(
        './gifTest/images/test/copy_' + frame.frameIndex + '.png'
    ));
    });
}
);
// gif 원레 원레 이미지로 되돌리기 끝