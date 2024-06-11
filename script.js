const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx)
const vars = {width: 1170, height: 2532}
canvas.width = vars.width
canvas.height = vars.height

ctx.fillStyle = "grey";
ctx.fillRect(0, 0, vars.width, vars.height)
ctx.fillStyle = "#000"
ctx.strokeStyle = '#000';
ctx.lineWidth = 5;

ctx.beginPath();

ctx.moveTo(0, 0)
ctx.lineTo(canvas.width, canvas.height);
ctx.stroke();
