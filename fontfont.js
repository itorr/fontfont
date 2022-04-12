/*!
 * Fontfont.js 
 * @itorr <https://lab.magiconch.com/>
 * 2022-04-12
 */


var shiftCharCode = Δ => c => String.fromCharCode(c.charCodeAt(0) + Δ);
var toFullWidth = str => str.replace(/[!-~]/g, shiftCharCode(0xFEE0));
var toHalfWidth = str => str.replace(/[！-～]/g, shiftCharCode(-0xFEE0));



const canvas = document.createElement('canvas');

canvas.width = 600;
canvas.height = 20;
document.body.appendChild(canvas);
// const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const fonts = [
	{
		size: 12,
		height: 13,
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
const generate = (text,fontName)=>{

	const font = Fonts[fontName];
	// console.log(font)
	const fontSize = font.size;
	const fontStyle = `${fontSize}px/${font.height}px ${font.name},sans-serif`;

	// console.log(/fontStyle/,fontStyle);

	ctx.fillStyle = '#000';
	ctx.font = fontStyle;
	ctx.textAlign = 'left';
	ctx.direction = 'ltr,start';
	ctx.textBaseline = 'top';

	
	text = text.replace(' ','　');

	const _width = Math.ceil(getTextWidth(text));
	if(!_width) return new Array(fontSize).fill('<br>').join('');
	// console.log(_width)

	const _height = font.height;

	ctx.clearRect( 0, 0, _width, _height );
	ctx.fillText(text, 0, 0);

	const pixel = ctx.getImageData(0,0,_width,_height);

	const pixelData = pixel.data;

	const max = _width * _height;


	let texti = 1;
	const textl = text.length;
	const textWidths = [];
	for(;texti<textl;texti++){
		textWidths.push(Math.floor(getTextWidth(text.slice(0,texti))));
	}
	textWidths.push(_width);

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

		const _font = getFont(pixelNum % _width);

		const spaceWidth = Math.floor(getTextWidth(_font));

		const isMono = font.height === spaceWidth;
		let t = _font;

		// if(!isMono){
		// 	t = '等';
		// 	console.log(spaceWidth)
		// 	// console.log(/这不是一个等宽字符/,spaceWidth,_font);
		// }

		rs.push(a<128?'　':t);
		if( pixelNum % _width === _width - 1) rs.push('<br>');
	}

	return rs.join('');
	
};