/*!
 * Fontfont.js 
 * @itorr <https://lab.magiconch.com/>
 * 2022-04-12
 */


const shiftCharCode = Δ => c => String.fromCharCode(c.charCodeAt(0) + Δ);
const toFullWidth = str => str.replace(/[!-~]/g, shiftCharCode(0xFEE0));
const toHalfWidth = str => str.replace(/[！-～]/g, shiftCharCode(-0xFEE0));


const canvas = document.createElement('canvas');

canvas.width = 600;
canvas.height = 50;
document.body.appendChild(canvas);
// const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const fonts = [
	{
		size: 12,
		height: 12,
		name: 'Zpix',
		url: 'zpix.woff2'
	},
	{
		size: 8,
		height: 8,
		name: 'Guanzhi8px',
		url: 'guanzhi8px.woff'
	},
];
const Fonts = {};

fonts.forEach(async font=>{
	Fonts[font.name] = font;
});

const loadFont = async (fontName,callback) => {
	const font = Fonts[fontName];
	const fontFace = new FontFace(font.name, `url(${font.url})`);
	fontFace.load().then(fontFace => {
		document.fonts.add(fontFace);
		font.fontFace = fontFace;
		callback(font);
	});
}

const getTextWidth = text=>{
	return ctx.measureText(text).width;
}
const generate = ({text,fontName,xpix = 1,braille = false})=>{

	const font = Fonts[fontName];
	// console.log(font)
	const fontSize = font.size * 2;
	const fontHeight = font.height * 2;

	const fontStyle = `${fontSize}px ${fontName},sans-serif`; ///${fontHeight}px

	console.log(/fontStyle/,fontStyle);

	ctx.fillStyle = '#000';
	ctx.font = fontStyle;
	ctx.textAlign = 'left';
	ctx.direction = 'ltr,start';
	ctx.textBaseline = 'top';

	if(!braille) text = text.replace(' ','　');

	let _width = Math.ceil(getTextWidth(text)/2)*2;

	if(!_width) return new Array(Math.floor(fontSize/2/1.4/braille?3:1)).fill('<br>').join('');

	let _height = fontHeight;

	ctx.clearRect( 0, 0, _width, _height );
	ctx.fillText(text, 0, 0);

	ctx.clearRect(0 , 30 ,_width / 2 * xpix , _height / 2);
	ctx.drawImage(canvas, 0, 0, _width, _height , 0 , 30 ,_width / 2 * xpix , _height / 2 );

	// console.log(0,30, _width / 2, _height / 2)
	const pixel = ctx.getImageData(0,30, _width / 2 * xpix, _height / 2);

	const pixelData = pixel.data;

	const max = _width * _height /2 /2 * xpix;


	if(braille){
		return imageToBraille(pixelData,_width/2 * xpix,_height/2);
	}

	let texti = 1;
	const textl = text.length;
	const textWidths = [];
	for(;texti<textl;texti++){
		textWidths.push(Math.floor(getTextWidth(text.slice(0,texti)) / 2 * xpix));
	}
	textWidths.push(_width / 2 * xpix);

	const monoText = toFullWidth(text)

	const getFont = width=>{
		for(let i = 0;i<textWidths.length;i++){
			if(width<textWidths[i]){
				return monoText[i];
			}
		}
	}
	const rs = [];

	for(let pixelNum = 0; pixelNum < max; pixelNum++){
		const i = pixelNum * 4;

		const a = pixelData[i+3];
		// console.log(a);

		const _font = getFont(pixelNum % Math.floor(_width/2 * xpix) );

		const spaceWidth = Math.floor(getTextWidth(_font)/2 * xpix);

		const isMono = (fontHeight/2) === spaceWidth;
		let t = _font;

		// if(!isMono){
		// 	t = '等';
		// 	console.log(spaceWidth)
		// 	// console.log(/这不是一个等宽字符/,spaceWidth,_font);
		// }

		rs.push(a<128?'　':t);

		if( pixelNum % (_width/2 * xpix) === (_width/2 * xpix) - 1) rs.push('<br>');
	}

	return rs.join('').replace(/　+?<br>/g,'\n')//.replace(/^<br>/,'')
	
};