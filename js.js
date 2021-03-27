"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const boll = document.querySelector("#ball"),
        fiel = document.querySelector("#field"),
        placeholder = document.querySelector('.placeholder'),
        kickBoll = new Audio(),
        kickLeft = new Audio(),
        kickRight = new Audio(),
        kickUp = new Audio(),
        kickGrass = new Audio();
        kickBoll.src = './sounds/kick on a ball.mp3';
        kickLeft.src = './sounds/kick on left goalpost.wav';
        kickRight.src = './sounds/kick on right goalpost.wav';
        kickUp.src = './sounds/kick on up goalpost.wav';
        kickGrass.src = './sounds/footstep-grass.wav';

        

    let vx = 1,
        vy = 0,
        vmx,
        vmy,
        xm,
        ym,
        x0 = 100,
        y0 = 100,
        onx = false,
        ony = false,
        now,
        kickGrassTimePlayStart = Date.now();

    boll.style.left = x0 + "px";
    boll.style.top = y0 + "px";
    boll.style.transform = `rotate(${x0 / 20 + "rad"})`;

  
    placeholder.addEventListener('click', ()=>{
      placeholder.style.display = 'none';
    })

    boll.addEventListener("mouseenter", (e) => {
        e.preventDefault();

      const kickClone =  kickBoll.cloneNode();
      if( Math.abs(vmx) + Math.abs(vx) > 20 || Math.abs(vmy) + Math.abs(vy) > 16){
        kickClone.volume = 1
      } else {
        kickClone.volume = Math.max((Math.abs(vmx) + Math.abs(vx))/20, (Math.abs(vmy) + Math.abs(vy))/16);
      }
      kickClone.play();

        if (onx || ony) {
            vx = vx + vmx * 4;
            vy = -Math.abs(vy) + vmy * 2;
            return;
        }

        onx = true;
        now = Date.now();

        vx = vmx * 4;
        getVelocityX();

        ony = true;

        vy = vmy * 2;
        getVelocityY();

        const render = () => {
            if (vx < 0.001 && vx > -0.001) {
                setTimeout(() => {
                    if (vx < 0.001 && vx > -0.001 && !ony) {
                        onx = false;
                    }
                }, 100);

                onx = false;
            }
            getVelocityX();
            coordinateXByVelocity();

            if (vy < 0.01 && vy > -0.01) {
                setTimeout(() => {
                    if (vy < 0.01 && vy > -0.01) {
                        ony = false;
                    }
                }, 100);
            }
            getVelocityY();
            coordinateYByVelocity();
            if (!onx && !ony) {
                return;
            }
            now = Date.now();
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    });
    fiel.addEventListener("mousemove", (e) => {
        e.preventDefault();
        xm = e.pageX;
        ym = e.pageY;
        getVelocityMouse();
    });

    // x

    function getVelocityMouse() {
        const xm1 = xm;
        setTimeout(() => {
            const xm2 = xm;
            vmx = (xm2 - xm1) / 20;
        }, 20);

        const ym1 = ym;
        setTimeout(() => {
            const ym2 = ym;
            vmy = (ym2 - ym1) / 20;
        }, 20);
    }

    function getVelocityX() {
        vx = vx - (vx / 20) * (t() / 16) ;
    }

    function coordinateXByVelocity() {
        if (x0 < 0) {
            const kickLeftClone = kickLeft.cloneNode();
            if( Math.abs(vx)> 5){
              kickLeftClone.volume = 1
            } else {
              kickLeftClone.volume = Math.abs(vx/5);
            }
            kickLeftClone.play();

            x0 = 2;
            vx = -vx;
        }

        if (x0 > field.clientWidth - 40) {
          const kickRightClone = kickRight.cloneNode();
          if( Math.abs(vx)> 5){
            kickRightClone.volume = 1
          } else {
            kickRightClone.volume = Math.abs(vx/5);
          }
          kickRightClone.play();

            x0 = field.clientWidth - 42;
            vx = -vx;
        }

        const x = (vx * t()) / 1;

        boll.style.left = x0 + x + "px";
        boll.style.transform = `rotate(${(x0 + x) / 20 + "rad"})`;

        x0 = x0 + x;
        // console.log(x0);
    }
    // y

    function getVelocityY() {
        vy = vy + (0.05 - vy / 20)* (t() / 16);
        // console.log(vy);
    }
    function coordinateYByVelocity() {
        if (y0 < 0) {
            const kickUpClone = kickUp.cloneNode();
            if( Math.abs(vy)> 5){
              kickUpClone.volume = 1
            } else {
              kickUpClone.volume = Math.abs(vy/5);
            }
            kickUpClone.play()


          y0 = 2;
          vy = -vy * 0.7;
        }

        const y = (vy * t()) / 1;

        boll.style.top = y0 + y + "px";
        y0 = y0 + y;

        if (y0 > fiel.clientHeight - 35) {
          if(Date.now()-kickGrassTimePlayStart>200){
            const kickGrassClone = kickGrass.cloneNode();
            if( Math.abs(vy)> 1){
              kickGrassClone.volume = 1
            } else {
              kickGrassClone.volume = Math.abs(vy/1.2);
            }
            kickGrassClone.play()
            kickGrassTimePlayStart = Date.now();
          }
          
            y0 = fiel.clientHeight - 35;
            vy = -(vy - (vy / Math.abs(vy)) * 0.1);
        }
        //  console.log(y)
    }

    function t() {
        return Date.now() - now;
    }
});
