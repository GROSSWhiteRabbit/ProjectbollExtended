'use strict';

document.addEventListener('DOMContentLoaded', ()=> {

    const boll = document.querySelector('#ball'),
    fiel = document.querySelector('#field');
let vx = 1,
  vy,
  vmx,
  vmy,
  xm,
  ym,
  x0 = fiel.getBoundingClientRect().left + 100 + window.pageXOffset,
  y0 = fiel.getBoundingClientRect().top + 100 + window.pageYOffset,
  onx = false,
  ony = false,
  now;
 

boll.style.left = '108px';
boll.style.top = '144px';
boll.style.transform = 'translate(-50%, -50%)';



// boll.style.transition = ' top 1s,  left 1s';


// fiel.addEventListener('click', (e) => {
//     e.preventDefault();
//     let clientY = e.clientY;
//     let clientX = e.clientX;
//     if (e.clientY < fiel.getBoundingClientRect().top + 20){clientY = fiel.getBoundingClientRect().top + 20;}
//     if (e.clientX < fiel.getBoundingClientRect().left + 20){clientX = fiel.getBoundingClientRect().left + 20;}
//     if (e.clientY > fiel.getBoundingClientRect().bottom - 40){clientY = fiel.getBoundingClientRect().bottom - 40;}
//     if (e.clientX > fiel.getBoundingClientRect().right - 40){clientX = fiel.getBoundingClientRect().right - 40;}

  
//     boll.style.left = (clientX - fiel.getBoundingClientRect().left) +'px';
//     boll.style.top =  (clientY - fiel.getBoundingClientRect().top) + 'px';
 
  
// });


boll.addEventListener('mouseenter', (e)=> {
    e.preventDefault();
  
  if (onx || ony) {
    vx = vx + vmx*4;
    vy = -Math.abs(vy) + vmy*2;
      return;
  }
  
  onx = true;

  vx = vmx *5;   
  getVelocityX();

  ony = true;

  vy = vmy *5;
  getVelocityY();

  now = Date.now();
  const render = ()=>{
      if (vx < 0.0001 && vx > -0.0001) {
        setTimeout(()=> {
            if (vx < 0.0001 && vx > -0.0001){
                onx = false;
            }
          },100);
          
          onx = false;
      }
      getVelocityX();
      coordinateXByVelocity();
      
      if (vy < 0.01 && vy > -0.01) {
          setTimeout(()=> {
            if (vy < 0.01 && vy > -0.01){
                ony = false;
            }
          },100);

          
      }
      getVelocityY();
      coordinateYByVelocity();
      if(!onx && !ony){
          return;
          
      }
      now = Date.now();
      requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

});
fiel.addEventListener('mousemove', (e) => {
    e.preventDefault();
  xm = e.pageX;
  ym = e.pageY;
  getVelocityMouse();
  
});


// x

function getVelocityMouse(){
const  xm1 = xm;
  setTimeout(() => {
      const  xm2  = xm; 
      vmx = (xm2-xm1)/20;

  }, 20);

  const  ym1 = ym;
  setTimeout(() => {
      const  ym2  = ym; 
      vmy = (ym2-ym1)/20;


  }, 20);

}


function getVelocityX() {

      vx = (vx ) - vx/20  ;




}


function coordinateXByVelocity() {
  if (x0 < fiel.getBoundingClientRect().left + 20 + window.pageXOffset){

    x0 = fiel.getBoundingClientRect().left + 22 + window.pageXOffset;
    vx = -vx;}

  if (x0 > fiel.getBoundingClientRect().right - 50 + window.pageXOffset){
      
    x0 = fiel.getBoundingClientRect().right - 48 + window.pageXOffset;
      vx = -vx;
  }



 const x = vx*t()/1;
 
 boll.style.left = ( x0 + x) +'px';
 x0 = x0 + x ;
// console.log(x0);
}
// y




function getVelocityY() {

        vy = (vy + 0.05 ) - vy/20  ;
// console.log(vy);



}


function coordinateYByVelocity() {

    if (y0 < fiel.getBoundingClientRect().top - 20 + window.pageYOffset){
        
        y0 = fiel.getBoundingClientRect().top - 18 + window.pageYOffset;
        vy = -vy*0.7;
    }
    



   const y = vy*t()/1;
   
   boll.style.top = ( y0 + y) +'px';
   y0 = y0 + y;

   if (y0 > fiel.getBoundingClientRect().bottom - 95   + window.pageYOffset ){

    y0 = fiel.getBoundingClientRect().bottom - 95 + window.pageYOffset;
    vy = -(vy*0.7 - 0.5);
}
  //  console.log(y)

}

function t() {
  return (Date.now() - now);
}



});
