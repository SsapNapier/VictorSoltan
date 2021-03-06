import React from 'react'
import './background.scss'

class Canvas extends React.Component {
componentDidMount(){
  this.backAnimation();
}
  backAnimation(){
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext('2d');
    let y;
    let Amplitude = 35;
    let AmplitudeValue = true;
    let Amplnumb;
    let displacement;
    let waveStart;
    let waveEnd;
    let screenWidth = window.innerWidth;
   if(window.innerWidth <= 1366){
     screenWidth = 1366;
   }
   const waveSpeed = Array.from({length: screenWidth}, () => Math.floor(Math.random() * 1)+8);
   function init() {
     canvas.height = window.outerHeight;
     canvas.width = window.outerWidth;
   }
   init()
   let booleanValue = Array.from({length: canvas.height}, () => Math.floor(Math.random() * 2));
   let waveValue = Array.from({length: canvas.height}, () => Math.floor(Math.random() * 2));
   for(let noumero = 0; noumero < canvas.height; noumero++){
     if(booleanValue[noumero] === 1){
       waveValue[noumero] = true;
     }else{
       waveValue[noumero] = false;
     }
   }



    Amplnumb = Array.from({length: canvas.width}, () => Math.floor(Math.random() * canvas.width/12))

    function drawWave(x, altitude, waveStart, waveEnd, waveMAX) {
      y = altitude - (Math.sin(x*Math.PI/Amplitude)*waveSpeed[x]*displacement);
      ctx.beginPath();
      ctx.fillStyle = "#365D61";
      if(x > waveStart && x <= waveStart+waveMAX){
        displacement = (x - waveStart) / waveStart;
        if((waveSpeed[x] - waveSpeed[x+1]) > 1 || (waveSpeed[x-1] - waveSpeed[x]) > 1){
          ctx.fillStyle = "#32A970";
        }
      }
      if(x < waveEnd && x >= waveStart+waveMAX){
        displacement = (waveEnd - x) / waveEnd;
        if((waveSpeed[x] - waveSpeed[x+1]) > 1 || (waveSpeed[x-1] - waveSpeed[x]) > 1){
          ctx.fillStyle = "#32A970";
        }
      }
      ctx.rect(x, y, 2, 1);
      ctx.fill();
      ctx.closePath();
    }

    function draw( ) {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      function width() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      width()
      window.addEventListener('resize', width)
      AmplitudeValue === true ? Amplitude++ : Amplitude--;
      if( Amplitude === 35 ){
        AmplitudeValue = true;
      }else if( Amplitude === 200){
        AmplitudeValue = false;
      }
      let y = 135;
      let end = 0;
      let altitudeStart = 11;
      let altitudeEnd = (canvas.height*0.55);
      if(canvas.width <= 1024){
        altitudeStart = 11;
        altitudeEnd = (canvas.height*0.5);
        y = 35;
        end = 35;
      }else if(canvas.width <= 768){
        altitudeEnd = (canvas.height*0.82);
      }else if(canvas.width <= 480){
        altitudeEnd = (canvas.height*0.8);
      }
      for(; y < (canvas.width - end);){
        waveValue[y] === true ? waveSpeed[y]++ : waveSpeed[y]--;
        if( waveSpeed[y] === -30 ){
          waveValue[y] = true;
        }else if( waveSpeed[y] === 30){
          waveValue[y] = false;
        }
        y+=40;
      }
      for(let altitude = altitudeStart; altitude < altitudeEnd;){
        waveStart = Amplnumb[altitude] + 120;
        waveEnd = Amplnumb[altitude] + 460;
        let waveMAX = 85;
        if(canvas.width <= 1024 && canvas.width > 768){
          waveStart = Amplnumb[altitude] + 280;
          waveEnd = Amplnumb[altitude] + 620;
          waveMAX = 85;
        }
        if(canvas.width <= 768){
          waveStart = 0;
          waveEnd =  canvas.width;
          waveMAX = 0;
        }
        for(let x = 0; x <= canvas.width; x++){
          x++;
          drawWave(x, altitude, waveStart, waveEnd, waveMAX);
        }
        altitude+=40;
      }
    }
    setInterval(draw, 78);

    window.addEventListener('resize', init)
  }

  render() {

  return (
      <canvas className="canvas"></canvas>
  );
}
}

export default Canvas;
