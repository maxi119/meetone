class QRCode {
    constructor(text) {
      this.text = text;
      this.qrcode = [];
      // QR Code Version 1 (21x21)
      this.size = 21;
      this.init();
    }
  
    init() {
      // 初始化矩陣
      for (let i = 0; i < this.size; i++) {
        this.qrcode[i] = [];
        for (let j = 0; j < this.size; j++) {
          this.qrcode[i][j] = null;
        }
      }
    }
  
    // 添加定位圖案
    addFinderPatterns() {
      // 左上角
      this.addFinderPattern(0, 0);
      // 右上角
      this.addFinderPattern(this.size - 7, 0);
      // 左下角
      this.addFinderPattern(0, this.size - 7);
    }
  
    // 添加單個定位圖案
    addFinderPattern(row, col) {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
            this.qrcode[row + i][col + j] = true;
          } else {
            this.qrcode[row + i][col + j] = false;
          }
        }
      }
    }
  
    // 添加定時圖案
    addTimingPatterns() {
      for (let i = 8; i < this.size - 8; i++) {
        this.qrcode[6][i] = i % 2 === 0;
        this.qrcode[i][6] = i % 2 === 0;
      }
    }
  
    // 添加對齊圖案
    addAlignmentPattern() {
      // Version 1 只需要在中心添加一個對齊圖案
      this.addAlignmentPatternAt(this.size - 9, this.size - 9);
    }
  
    addAlignmentPatternAt(row, col) {
      for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
          this.qrcode[row + i][col + j] = i === -2 || i === 2 || j === -2 || j === 2 || (i === 0 && j === 0);
        }
      }
    }
  
    // 將文本轉換為二進制數據
    textToBinary() {
      let binary = '';
      for (let i = 0; i < this.text.length; i++) {
        let char = this.text.charCodeAt(i);
        binary += char.toString(2).padStart(8, '0');
      }
      return binary;
    }
  
    // 生成QR碼
    generate() {
      // 添加功能圖案
      this.addFinderPatterns();
      this.addTimingPatterns();
      this.addAlignmentPattern();
  
      // 獲取數據的二進制表示
      const dataBits = this.textToBinary();
  
      // 在剩餘空間填充數據
      let dataIndex = 0;
      // 從右下角開始向上蛇形掃描
      for (let col = this.size - 1; col >= 0; col -= 2) {
        if (col === 6) col--; // 跳過垂直定時圖案
        
        const upward = (this.size - col + 1) % 2 === 0;
        const rowStart = upward ? this.size - 1 : 0;
        const rowEnd = upward ? 0 : this.size - 1;
        const step = upward ? -1 : 1;
  
        for (let row = rowStart; upward ? row >= rowEnd : row <= rowEnd; row += step) {
          for (let c = 0; c < 2 && col - c >= 0; c++) {
            if (this.qrcode[row][col - c] === null) {
              const bit = dataIndex < dataBits.length ? dataBits[dataIndex] === '1' : false;
              this.qrcode[row][col - c] = bit;
              dataIndex++;
            }
          }
        }
      }
    }
  
    // 輸出HTML canvas
    toCanvas(scale = 10) {
      const canvas = document.createElement('canvas');
      canvas.width = this.size * scale;
      canvas.height = this.size * scale;
      const ctx = canvas.getContext('2d');
      
      // 填充背景
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // 繪製QR碼
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (this.qrcode[i][j]) {
            ctx.fillStyle = 'black';
            ctx.fillRect(j * scale, i * scale, scale, scale);
          }
        }
      }
      
      return canvas;
    }
  }
  
  // 使用示例
  function generateQRCode(text, containerId) {
    const qr = new QRCode(text);
    qr.generate();
    const canvas = qr.toCanvas();
    
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.appendChild(canvas);
  }