const fs = require('fs');

class SVG {
  constructor(width = 300, height = 200) {
    this.width = width;
    this.height = height;
    this.text = null;
    this.shape = null;
  }

  setText(value, color) {
    if (value.length > 3) {
      throw new Error("Text must not exceed 3 characters.");
    }
    this.text = { value, color };
  }

  setShape(shape) {
    this.shape = shape;
  }

  generateContent() {
    let content = '';
    if (this.shape) {
      content += this.shape.render();
    }
    if (this.text) {
      content += `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.text.color}">${this.text.value}</text>`;
    }
    return `<svg version="1.1" width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
  }

  saveToFile(filename = "logo.svg") {
    const content = this.generateContent();
    fs.writeFileSync(filename, content);
    console.log(`Generated ${filename}`);
  }
}

module.exports = SVG;