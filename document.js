/*!
 * Fontfont.js 
 * @itorr <https://lab.magiconch.com/>
 * 2022-04-12
 */


var shiftCharCode = Δ => c => String.fromCharCode(c.charCodeAt(0) + Δ);
var toFullWidth = str => str.replace(/[!-~]/g, shiftCharCode(0xFEE0));
var toHalfWidth = str => str.replace(/[！-～]/g, shiftCharCode(-0xFEE0));



const toastEl = document.createElement('div');
toastEl.className = 'toast-box h';
const toast = text => {
	toastEl.innerHTML = text;
	document.body.appendChild(toastEl);

	clearTimeout(toast.T);
	requestAnimationFrame(_=>{
		toastEl.classList.remove('h');
		toast.T = setTimeout(_ => {
			toastEl.classList.add('h');
			clearTimeout(toast.T);
			toast.T = setTimeout(_=>document.body.removeChild(toastEl),500);
		},2000);
	});
};

let textDefault = `神奇
海螺

「字符字」
〔生成器〕

『吹响吧!
 上低音号』

卜卜口
=@#$%^&*()
ABCxyz
114伍壹肆`;

const isMac = /Macintosh/.test(navigator.userAgent);

const data = {
	text:'',
	runing:false,
	fontName: fonts[0].name,
	output:'',
	isMac,
	xpix:1,
	zoom: document.body.offsetWidth < 1000 ? 0.5 : 1
};


const app = new Vue({
	el: '.app',
	data,
	methods: {
		generate(){
			this.runing = true;
			clearTimeout(generate.T);
			generate.T = setTimeout(_ => {
				const text = this.text.trim() || textDefault;
				if(!text) return outputEl.innerHTML = '';

				const fontName = this.fontName;
				const xpix = this.xpix;

				loadFont(fontName,font=>{
					// console.log(/loaded/,font,font.fontFace.loaded)
					this.output = text.split(/\n/g).map(text=>generate({text,fontName,xpix})).join('').replace(/^<br>/,'');
					this.runing = false;
				});
			},300);
		},
		copyOutput(){
			let preEl = document.querySelector('.output-box pre');
			let range = document.createRange();
			range.setStart(preEl, 0);
			range.setEnd(preEl, preEl.childNodes.length);
			document.getSelection().removeAllRanges();
			document.getSelection().addRange(range);
			document.execCommand('Copy');
			document.getSelection().removeAllRanges();
			toast('复制成功');
			// this.copy(this.output.replace(/<br>/g,'\n'));
			
		}
	},
	watch: {
		fontName(){
			this.generate();
		},
		text(){
			this.generate();
		},
		xpix(){
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