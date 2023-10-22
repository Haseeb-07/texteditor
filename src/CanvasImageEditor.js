import React, { useState, useRef } from 'react';

function CanvasImageEditor() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);

  const handleImageUpload = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const file = event.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  const startDrawing = () => {
    setDrawing(true);
  };

  const draw = (event) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY,
      brushSize,
      0,
      2 * Math.PI
    );
    ctx.fill();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const updateBrushSize = (event) => {
    setBrushSize(event.target.value);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'canvas_image.png';
    a.click();
  };

  return (
    <div>
      <h1>Canvas Image Editor using React JS</h1>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <canvas
        ref={canvasRef}
        width="800"
        height="600"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      ></canvas>
      <div>
        <label htmlFor="brushSize">Brush Size:</label>
        <input
          type="range"
          id="brushSize"
          min="1"
          max="20"
          value={brushSize}
          onChange={updateBrushSize}
        />
      </div>
      <button onClick={downloadImage}>Download Image</button>
    </div>
  );
}

export default CanvasImageEditor;
