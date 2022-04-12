/*!
 * Fontfont.js 
 * @itorr <https://lab.magiconch.com/>
 * 2022-04-12
 */


var shiftCharCode = Δ => c => String.fromCharCode(c.charCodeAt(0) + Δ);
var toFullWidth = str => str.replace(/[!-~]/g, shiftCharCode(0xFEE0));
var toHalfWidth = str => str.replace(/[！-～]/g, shiftCharCode(-0xFEE0));




const outputEl = document.querySelector('.output-box');
const inputEl = document.querySelector('textarea');


const text = `神奇★海螺
「字符字」
〔生成器〕
★★★★★
一二三四五
上山打老虎

『吹响吧!
 上低音号』
卜卜口=@#$%^&*()

lab.magiconch.com/
Fontfont`;



const isMac = /Macintosh/.test(navigator.userAgent);

const data = {
	text,
	runing:false,
	fontName: fonts[0].name,
	output:'',
	isMac,
	zoom: document.body.offsetWidth < 1200 ? 0.5 : 1
};


const app = new Vue({
	el: '.app',
	data,
	methods: {
		generate(){
			clearTimeout(generate.T);
			generate.T = setTimeout(_ => {
				const text = this.text.trim();
				if(!text) return outputEl.innerHTML = '';

				const fontName = app.fontName;

				loadFont(fontName,font=>{
					// console.log(/loaded/,font,font.fontFace.loaded)
					this.output = text.split(/\n/g).map(text=>generate(text,fontName)).join('');
				});
			},300);
		},
		copy(text){
			let inputEl= document.createElement('input');
			inputEl.value = text;
			document.body.appendChild(inputEl);
			inputEl.select();
			document.execCommand('Copy'); 
			inputEl.remove()
		},
		copyOutput(){
			this.copy(this.output.replace(/<br>/g,'\n'))
		}
	},
	watch: {
		fontName(){
			this.generate();
		},
		text(){
			this.generate();
		}
	}
});


app.generate();












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