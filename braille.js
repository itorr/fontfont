
// https://github.com/505e06b2/Image-to-Braille/blob/master/braille.js
function pixelsToCharacter(pixels_lo_hi) { //expects an array of 8 bools
	//Codepoint reference - https://www.ssec.wisc.edu/~tomw/java/unicode.html#x2800
	const shift_values = [0, 1, 2, 6, 3, 4, 5, 7]; //correspond to dots in braille chars compared to the given array
	let codepoint_offset = 0;
	for(const i in pixels_lo_hi) {
		codepoint_offset += (+pixels_lo_hi[i]) << shift_values[i];
	}

	// if(codepoint_offset === 0 ) { //pixels were all blank
	// 	codepoint_offset = 4; //0x2800 is a blank braille char, 0x2804 is a single dot
	// }
    return String.fromCharCode(0x2800 + codepoint_offset);
}
const imageToBraille = (pixelData,width,height) => {
	let output = '';
	for(let imgy = 0; imgy < height; imgy += 4) {
		for(let imgx = 0; imgx < width - 1; imgx += 2) {
			const braille_info = [0,0,0,0,0,0,0,0];
			let dot_index = 0;
			for(let x = 0; x < 2; x++) {
				for(let y = 0; y < 4; y++) {
					const index = (imgx+x + width * (imgy+y)) * 4;

					const a = pixelData[index+3] || 0; //ctx.getImageData(imgx+x,imgy+y,1,1).data
					
					if(a >= 128) { //account for alpha
						braille_info[dot_index] = 1;
					}
					dot_index++;
				}
			}
			output += pixelsToCharacter(braille_info);
		}
		output += "\n";
	}
	return output
};

