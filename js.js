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
  t = 1,
  x0 = fiel.getBoundingClientRect().left + 100 + window.pageXOffset,
  y0 = fiel.getBoundingClientRect().top + 100 + window.pageYOffset,
  onx = false,
  ony = false;
 


boll.style.left = '100px';
boll.style.top = '100px';
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

boll.addEventListener('mouseenter', ()=> {
  
  if (onx || ony) {
    vx = vx + vmx/4;
    vy = -Math.abs(vy) + vmy/4;
      return;
  }
  onx = true;
//   console.log(vmx);
  vx = vmx *10;   
  getVelocityX();

  ony = true;
//   console.log(vmy);
  vy = vmy *10;
  getVelocityY();


  const timerX = setInterval(()=>{
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
      t += 1; 
      if(!onx && !ony){
          t = 1;
          clearInterval(timerX);
      }
  }, 25);

});
fiel.addEventListener('mousemove', (e) => {
  xm = e.pageX;
  ym = e.pageY;
  getVelocityMouse();
});


// x

function getVelocityMouse(){
const  xm1 = xm;
  setTimeout(() => {
      const  xm2  = xm; 
      vmx = (xm2-xm1)/10;
      // console.log(vm)
  }, 10);

  const  ym1 = ym;
  setTimeout(() => {
      const  ym2  = ym; 
      vmy = (ym2-ym1)/10;
      // console.log(vm)
  }, 10);

}


function getVelocityX() {

      vx = (vx ) - vx/10  ;



  // console.log(vx); 
}


function coordinateXByVelocity() {
  if (x0 < fiel.getBoundingClientRect().left + 20 + window.pageXOffset){

    x0 = fiel.getBoundingClientRect().left + 22 + window.pageXOffset;
    vx = -vx;}

  if (x0 > fiel.getBoundingClientRect().right - 50 + window.pageXOffset){
      
    x0 = fiel.getBoundingClientRect().right - 48 + window.pageXOffset;
      vx = -vx;
  }



 const x = vx*t/1;
 
 boll.style.left = ( x0 + x) +'px';
 x0 = x0 + x ;
//    console.log(x0);
}
// console.log(boll.clientHeight);
function renderByX(){

}

// y




function getVelocityY() {

        vy = (vy + 0.01 ) - vy/10  ;



  //   console.log(vy); 
}


function coordinateYByVelocity() {
    if (y0 < fiel.getBoundingClientRect().top - 20 + window.pageYOffset){
        
        y0 = fiel.getBoundingClientRect().top - 18 + window.pageYOffset;
        vy = -vy*0.7;
    }
    if (y0 > fiel.getBoundingClientRect().bottom -90 + window.pageYOffset ){

        y0 = fiel.getBoundingClientRect().bottom -92  + window.pageYOffset;
        vy = -(vy-0.03);
    }



   const y = vy*t/1;
   
   boll.style.top = ( y0 + y) +'px';
   y0 = y0 + y;
//    console.log(y0);
}
// console.log(boll.clientHeight);

});
