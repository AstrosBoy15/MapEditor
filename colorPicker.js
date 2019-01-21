function ColorPicker(x, y, scale) {
	this.scale = scale;
	this.h = 0;
	this.s = 100 * this.scale;
	this.b = 100 * this.scale;
	this.x = x + 8 * this.scale;
	this.y = y + 8 * this.scale;
	this.mouseX = this.x + 100 * this.scale;
	this.mouseY = this.y + 100 * this.scale;
	this.hy = this.y;
	this.width = 133 * this.scale;
	this.height = 115 * this.scale;

	this.show = function() {
		stroke(50);
		fill(0, 0, 0, 127);
		rect(this.x - 8 * this.scale, this.y - 8 * this.scale, this.width, this.height);

		colorMode(HSB, 100 * this.scale, 100 * this.scale, 100 * this.scale, 255);
		this.selectedColor = color(this.h, this.s, this.b, 1);
		loadPixels(0, 0, width - 1, height - 1);

		for (var i = Math.round(this.x); i < Math.round(this.x + 100 * this.scale); i++) {
			for (var j = Math.round(this.y); j < Math.round(this.y + 100 * this.scale); j++) {
				var index = (i + j * width) * 4;
				var col = this.HSVtoRGB(this.h / (100 * this.scale), (i - this.x) / (100 * this.scale),
					(this.y + (100 * this.scale) - j) / (100 * this.scale));
				pixels[index] = col.r;
				pixels[index + 1] = col.g;
				pixels[index + 2] = col.b;
				pixels[index + 3] = 255;
			}
		}

		for (var i = Math.round(this.x + 105 * this.scale); i < Math.round(this.x + 118 * this.scale); i++) {
			for (var j = Math.round(this.y); j < Math.round(this.y + 100 * this.scale); j++) {
				var index = (i + j * width) * 4;
				var col = this.HSVtoRGB((j - this.y) / (100 * this.scale), 1, 1);
				pixels[index] = col.r;
				pixels[index + 1] = col.g;
				pixels[index + 2] = col.b;
				pixels[index + 3] = 255;
			}
		}
		updatePixels(0, 0, width - 1, height - 1);

		fill(0, 0, 0, 0);
		strokeWeight(this.scale);
		stroke(100);
		ellipse(this.mouseX, this.mouseY, 2 * this.scale, 2 * this.scale);


		fill(0, 0, 0, 0);
		strokeWeight(this.scale);
		stroke(100);
		rect(this.x + 105 * this.scale, this.hy, 13 * this.scale, 2 * this.scale);

		colorMode(RGB, 255, 255, 255, 255);
	}

	this.setPosition = function(x, y) {
		this.x = x + 8 * this.scale;
		this.y = y + 8 * this.scale;
		if (x + this.width > width) {
			this.x = x - this.width + 8 * this.scale;
		}
		if (y + this.height > height) {
			this.y = y - this.height + 8 * this.scale;
		}
		if (x > width) {
			this.x = width - this.width + 8 * this.scale;
		}
		if (y > height) {
			this.y = height - this.height + 8 * this.scale;
		}
	}

	this.update = function(r, g, b) {
		var hsb = this.RGBtoHSV(r, g, b);
		this.h = Math.round(hsb.h * 100 * this.scale);
		this.s = Math.round(hsb.s * 100 * this.scale);
		this.b = Math.round(hsb.b * 100 * this.scale);
		this.hy = this.y + this.h;
		this.mouseX = this.x + this.s;
		this.mouseY = this.y + this.b;

		if (mouseX > this.x - 8 * this.scale && mouseX < this.x + 125 * this.scale &&
			mouseY > this.y - 8 * this.scale && mouseY < this.y + 108 * this.scale) {
			if (mouseX > this.x + 105 * this.scale && mouseX < this.x + 118 * this.scale &&
				mouseY > this.y && mouseY < this.y + 100 * this.scale - 2 * this.scale + 2) {
				this.h = mouseY - this.y;
				this.hy = mouseY;
			}

			if (mouseX > this.x && mouseX < this.x + 100 * this.scale && mouseY > this.y && mouseY < this.y + 100 * this.scale) {
				this.s = mouseX - this.x;
				this.b = this.y + 100 * this.scale - mouseY;
				this.mouseX = mouseX;
				this.mouseY = mouseY;
			}

			var rgb = this.HSVtoRGB(this.h / (100 * this.scale), this.s / (100 * this.scale), this.b / (100 * this.scale));
			return {
				r: rgb.r,
				g: rgb.g,
				b: rgb.b
			};

		} else {
			return undefined;
		}
	}

	this.HSVtoRGB = function(h, s, v) {
		var r, g, b, i, f, p, q, t;
		i = Math.floor(h * 6);
		f = h * 6 - i;
		p = v * (1 - s);
		q = v * (1 - f * s);
		t = v * (1 - (1 - f) * s);
		switch (i % 6) {
			case 0:
				r = v, g = t, b = p;
				break;
			case 1:
				r = q, g = v, b = p;
				break;
			case 2:
				r = p, g = v, b = t;
				break;
			case 3:
				r = p, g = q, b = v;
				break;
			case 4:
				r = t, g = p, b = v;
				break;
			case 5:
				r = v, g = p, b = q;
				break;
		}
		return {
			r: Math.round(r * 255),
			g: Math.round(g * 255),
			b: Math.round(b * 255)
		};
	}

	this.RGBtoHSV = function(r, g, b) {
		var max = Math.max(r, g, b),
			min = Math.min(r, g, b),
			d = max - min,
			h,
			s = (max === 0 ? 0 : d / max),
			v = max / 255;

		switch (max) {
			case min:
				h = 0;
				break;
			case r:
				h = (g - b) + d * (g < b ? 6 : 0);
				h /= 6 * d;
				break;
			case g:
				h = (b - r) + d * 2;
				h /= 6 * d;
				break;
			case b:
				h = (r - g) + d * 4;
				h /= 6 * d;
				break;
		}

		return {
			h: h,
			s: s,
			b: v
		};
	}
}