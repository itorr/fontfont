/*!
 * Fontfont.js 
 * @itorr <https://lab.magiconch.com/>
 * 2022-04-12
 */






// const canvas = document.createElement('canvas');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const outputEl = document.querySelector('.output-box');
const inputEl = document.querySelector('textarea');

const myFont = new FontFace('ZpixReviewLocal', 'url(./zpix.woff2)')
myFont.load().then(font => {
	document.fonts.add(font)
}).then(_ => {
	// text = text.split('').join(String.fromCharCode(8202));

	canvas.style.letterSpacing = '-1px';
	ctx.fillStyle = '#000';
	ctx.font = '12px/14px ZpixReviewLocal,sans-serif';
	ctx.textAlign = 'left';
	ctx.direction = 'ltr,start';
	ctx.textBaseline = 'top';

	const getTextWidth = text=>{
		return ctx.measureText(text).width;
	}
	const generate = text=>{

		const _width = getTextWidth(text);
		const _height = 14;
	
		ctx.clearRect( 0, 0, _width, _height );
		ctx.fillText(text, 0, 0);
	
		const pixel = ctx.getImageData(0,0,_width,_height);
	
		const pixelData = pixel.data;
		window.pixelData = pixelData;
	
		const max = _width * _height;
	
		const fonts = [];
		
		for(let pixelNum = 0; pixelNum < max; pixelNum++){
			const i = pixelNum * 4;
	
			const a = pixelData[i+3];
			// console.log(a);
			const font = text[Math.floor(( pixelNum % _width ) / _width * text.length)];
			const spaceWidth = getTextWidth(font);
			console.log();
			const isMono = 12 === spaceWidth;
			if(!isMono){
				console.log(/这不是一个等宽字符/,spaceWidth);
			}
			fonts.push(a<128?'　':font);
			if( pixelNum % _width === _width - 1) fonts.push('<br>');
		}
	
		outputEl.innerHTML = fonts.join('');
	}
	inputEl.oninput = _=>{
		const text = inputEl.value;
		generate(text);
	}
});























const loadScript = (src,el) =>{
	el = document.createElement('script');
	el.src = src;
	document.body.appendChild(el);
};

window._hmt = [];
window.dataLayer = [
    ['js', new Date()],
    ['config', 'G-13BQC1VDD8']
];
window.gtag = function(){dataLayer.push(arguments)};
setTimeout(_=>{
	loadScript('//hm.baidu.com/hm.js?f4e477c61adf5c145ce938a05611d5f0');
	loadScript('//www.googletagmanager.com/gtag/js?id=G-13BQC1VDD8');
},400);