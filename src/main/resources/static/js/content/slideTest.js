// 슬라이드 //////////////////////////
let cnt = 0;

const wrap = document.querySelector(".wrap");
const s1 = document.querySelectorAll(".s1");

const sliderClone = wrap.firstElementChild.cloneNode(true); //복사
wrap.appendChild(sliderClone); //붙여넣기

let play = setInterval(() => {
    cnt++

    wrap.style.marginLeft = (-cnt * 100) + "vw";
    wrap.style.transition = "all 0.6s";

    if (cnt == 4) {
        setTimeout(() => {
            wrap.style.transition = "0s";
            wrap.style.marginLeft = "0";

            cnt = 0;
        }, 700)
    }

}, 2500)


wrap.addEventListener('mouseover', (event) => { clearInterval(play) })
wrap.addEventListener('mouseout', (event) => {
    play = setInterval(() => {
        cnt++
        wrap.style.marginLeft = (-cnt * 100) + "vw";
        wrap.style.transition = "all 0.6s";

        if (cnt == 4) {
            setTimeout(() => {
                wrap.style.transition = "0s";
                wrap.style.marginLeft = "0";

                cnt = 0;
            }, 700)
        }

    }, 2000)
})