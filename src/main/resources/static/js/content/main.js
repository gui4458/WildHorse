let searchDate = document.querySelector('#search-date').value;
/////////////////////////////////////////////////
//차트슬라이드
window.onload = function () {

    const chartSliders = document.querySelectorAll(".chart-slider"); // 모든 slider 요소를 선택
    let chartCurrentIndex = 0;   // 현재 차트 인덱스

    // 모든 차트를 초기에 숨김
    chartSliders.forEach(slider => slider.style.display = "none");
    // 첫 번째 차트만 보이도록 함
    chartSliders[0].style.display = "block";

    setInterval(() => { // 4초에 한번씩 실행
        let chartNextIndex = (chartCurrentIndex + 1) % chartSliders.length; // 1 2 0 1 2 무한반복

        chartSliders.forEach(chart => chart.style.transition = "all 15s"); //이미지 애니메이션 추가
        // 현재 보이는 차트를 숨김
        chartSliders[chartCurrentIndex].style.display = "none";
        // 다음 차트를 보이도록 함
        chartSliders[chartNextIndex].style.display = "block";

        chartCurrentIndex = chartNextIndex; // 다음 인덱스를 현재 인덱스로 업데이트
    }, 4000);

    /////////////////////////////////////////////
    //이미지 슬라이드

    let imgCurrentIndex = 0;   //현재 이미지
    const imgSlider = document.querySelectorAll(".img-slider");    //모든 이미지를 변수에 저장


    // 모든 차트를 초기에 숨김
    imgSlider.forEach(slider => slider.style.display = "none");
    // 첫 번째 차트만 보이도록 함
    // imgSlider[0].style.display = "block";

    setInterval(() => { // 4초에 한번씩 실행
        let imgNextIndex = (imgCurrentIndex + 1) % imgSlider.length; // 1 2 0 1 2 무한반복

        imgSlider.forEach(img => img.style.transition = "all 5s"); //이미지 애니메이션 추가
        // 현재 보이는 차트를 숨김
        // imgSlider[imgCurrentIndex].style.display = "none";
        // 다음 차트를 보이도록 함
        // imgSlider[imgNextIndex].style.display = "block";

        imgCurrentIndex = imgNextIndex; // 다음 인덱스를 현재 인덱스로 업데이트
    }, 4000);
}




// ///////////////////////////////////////////////////////////////////////////
//차트


// 슬라이드 //////////////////////////

//////////평균 온습도///////////////////////////////////////////

let cnt1 = 0;
let wrap1 = document.querySelector(".wrap1");

let s2 = document.querySelectorAll(".s2");

let sliderClone1 = wrap1.firstElementChild.cloneNode(true); //복사
wrap1.appendChild(sliderClone1); //붙여넣기

let play1 = setInterval(() => {
    cnt1++
    wrap1.style.marginLeft = (-cnt1 * 100) + "%"
    wrap1.style.transition = "all 0.6s";
    if (cnt1 == 2) {
        setTimeout(() => {
            wrap1.style.transition = "0s"
            wrap1.style.marginLeft = "0"
            cnt1 = 0;

        }, 700)
    }
}, 2500)


wrap1.addEventListener('mouseover', (event) => { clearInterval(play1) })
wrap1.addEventListener('mouseout', (event) => {
    play1 = setInterval(() => {
        cnt1++
        wrap1.style.marginLeft = (-cnt1 * 100) + "%"
        wrap1.style.transition = "all 0.6s";
        if (cnt1 == 2) {
            setTimeout(() => {
                wrap1.style.transition = "0s"
                wrap1.style.marginLeft = "0"
                cnt1 = 0;

            }, 700)
        }

    }, 2000)
})

///////////////////////////////////////////////////////////



//////////최고 최저기온////////////////////////////////////
let cnt2 = 0;
let wrap2 = document.querySelector(".wrap2");


let s3 = document.querySelectorAll(".s3");

let sliderClone2 = wrap2.firstElementChild.cloneNode(true); //복사
wrap2.appendChild(sliderClone2); //붙여넣기

let play2 = setInterval(() => {
    cnt2++

    wrap2.style.marginLeft = (-cnt2 * 100) + "%";
    wrap2.style.transition = "all 0.6s";

    if (cnt2 == 2) {
        setTimeout(() => {
            wrap2.style.transition = "0s";
            wrap2.style.marginLeft = "0";

            cnt2 = 0;
        }, 700)
    }
}, 2500)


wrap2.addEventListener('mouseover', (event) => { clearInterval(play2) })
wrap2.addEventListener('mouseout', (event) => {
    play2 = setInterval(() => {
        cnt2++

        wrap2.style.marginLeft = (-cnt2 * 100) + "%";
        wrap2.style.transition = "all 0.6s";

        if (cnt2 == 2) {
            setTimeout(() => {
                wrap2.style.transition = "0s";
                wrap2.style.marginLeft = "0";

                cnt2 = 0;
            }, 700)
        }

    }, 2000)
})

////////불쾌지수 슬라이더/////////////////////////

let cnt = 0;
let wrap = document.querySelector(".wrap");


//복사할 코드

let s1 = document.querySelectorAll(".s1");

let sliderClone = wrap.firstElementChild.cloneNode(true); //복사
wrap.appendChild(sliderClone); //붙여넣기

let play = setInterval(() => {
    cnt++

    wrap.style.marginLeft = (-cnt * 100) + "%";
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

        wrap.style.marginLeft = (-cnt * 100) + "%";
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

///////////////////////////////////////////////////////////////








var tempLabels = []
var tempAvg = []
// var rehAvg = []


let diLow = 0
let diBest = 0
let rehLow = 0
let temperLow = 0
let rehBest = 0
let temperBest = 0
let timeLabel = []
let temperAvg = []
let rehAvg = []
let diList = []
let dayRehAvgList = []
let dayTemperAvgList = []
let dayDiAvgList = []
let dayDiAvg = 0
let diSum = 0;

let tempBest = 0
fetch('/charts/main', { //요청경로
    method: 'POST',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    //컨트롤러로 전달할 데이터
    body: JSON.stringify({
        // 데이터명 : 데이터값
        toDay: searchDate
    })
})
    .then((response) => {
        return response.json(); //나머지 경우에 사용
    })
    //fetch 통신 후 실행 영역
    .then((data) => {//data -> controller에서 리턴되는 데이터!

        temperLow = data.timeList[0].temper
        rehLow = data.timeList[0].reh
        diLow = data.timeList[0].di


        //시간대별 온도 습도 조회
        console.log(data.timeList)
        data.timeList.forEach(e => {
            diSum += e.di;
            dayDiAvg = diSum / data.timeList.length;
        });

        data.timeList.forEach(e => {
            timeLabel.push(e.mesurTime)
            temperAvg.push(e.temper)
            rehAvg.push(e.reh)
            diList.push(e.di)




            dayRehAvgList.push(data.avg.rehAvg)
            dayTemperAvgList.push(data.avg.tempAvg)
            dayDiAvgList.push(dayDiAvg)
            if (rehBest < e.reh) {
                rehBest = e.reh
            }
            if (temperBest < e.temper) {
                temperBest = e.temper
            }

            if (rehLow > e.reh) {
                rehLow = e.reh
            }
            if (temperLow > e.temper) {
                temperLow = e.temper
            }

            if (diBest < e.di) {
                diBest = e.di
            }
            if (diLow > e.di) {
                diLow = e.di
            }

        });
        console.log(`dayRehAvgList=${dayRehAvgList}`)
        console.log(`dayTemperAvgList=${dayTemperAvgList}`)
        console.log(`dayDiAvgList=${dayDiAvgList}`)
        // 라인차트~~
        //습도 
        new Chart(document.getElementById("reh-line-chart"), {
            type: 'line',
            data: {
                labels: timeLabel,
                datasets: [{
                    data: rehAvg,
                    label: "습도",
                    borderColor: "#59B4C3",
                    fill: false
                }, {
                    data: dayRehAvgList,
                    label: "평균",
                    borderColor: "rgba(1, 1, 1,0.55)",
                    fill: false,
                    pointRadius: 0


                }
                ]
            },
            options: {

                // elements: {
                //     point: {
                //         radius: 0
                //     }
                // }
                // ,

                title: {
                    display: true,
                    text: 'World population per region (in millions)'
                },
                // plugins: {

                //     title: {
                //         display: true,
                //         text: '습도 차트',
                //         font: 50
                //     }
                // },
                scales: {

                    y: {
                        min: Math.ceil(rehLow - 5),
                        max: Math.floor(rehBest + 5)

                        , title: {
                            display: true,

                            font: {
                                family: 'Times',
                                size: 15,
                                style: 'normal',
                                lineHeight: 1.2
                            },

                            text: "습도(%)",
                        }


                    },
                    x: {
                        title: {
                            display: true,
                            text: '시간',
                            color: 'black',
                            font: {
                                family: 'Times',
                                size: 15,
                                style: 'normal',
                                lineHeight: 1.2
                            },
                        }
                    }
                }

            }
        });

        //온도 
        new Chart(document.getElementById("temp-line-chart"), {
            type: 'line',
            data: {
                labels: timeLabel,
                datasets: [{
                    data: temperAvg,
                    label: "온도",
                    borderColor: "#FFAA80",
                    fill: false
                },
                {
                    data: dayTemperAvgList,
                    label: "평균",
                    borderColor: "rgba(1, 1, 1,0.55)",
                    fill: false,
                    pointRadius: 0


                }
                    // ,{
                    //     data: [78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78],
                    //     label: "평균습도",
                    //     borderColor: "rgba(0, 0, 0, 0.1)",
                    //     fill: false,
                    //     pointRadius: 0

                    // }
                ]


            },
            options: {

                title: {
                    display: true,
                    text: 'World population per region (in millions)'
                },
                // plugins: {
                //     title: {
                //         display: true,
                //         // text: '온도 차트',
                //         size: 38
                //     }
                // },
                scales: {
                    y: {

                        min: Math.floor(temperLow - 5), //4.5
                        max: Math.ceil(temperBest + 5)
                        //fontSize : 14

                        , title: {
                            display: true,
                            text: "온도(C °)",
                            font: {
                                size: 15,
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: "시간",
                            font: {
                                size: 15,
                            }
                        }
                    }
                }

            }
        });


        // 불쾌지수 라인차트
        new Chart(document.getElementById("di-line-chart"), {
            type: 'line',
            data: {
                labels: timeLabel,
                datasets: [{
                    data: diList,
                    label: "불쾌지수",
                    borderColor: "#FF5580",
                    fill: false
                }, {
                    data: dayDiAvgList,
                    label: "평균",
                    borderColor: "rgba(1, 1, 1,0.55)",
                    fill: false,
                    pointRadius: 0


                }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'World population per region (in millions)'
                },
                // plugins: {
                //     title: {
                //         display: true,
                //         // text: '불쾌지수 차트',
                //         size: 38
                //     }
                // },
                scales: {
                    y: {

                        min: Math.ceil(diLow - 5),
                        max: Math.floor(diBest + 5)
                        // fontSize : 14
                        , title: {
                            display: true,
                            text: "불쾌지수(C °)",
                            font: {
                                size: 15,
                            }
                        }

                    }
                    , x: {
                        title: {
                            display: true,
                            text: "시간",
                            font: {
                                size: 15,
                            }
                        }
                    }
                }
            }
        });








        // 바 차트
        new Chart(document.getElementById("bar-chart"), {
            type: 'bar',
            data: {
                labels: tempLabels,
                datasets: [
                    {
                        label: "평균온도",
                        backgroundColor: "#c45850",
                        data: tempAvg
                    },
                    {
                        label: "평균습도",
                        backgroundColor: "#3e95cd",
                        data: rehAvg

                    }
                ]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                },
                scales: {
                    y: {

                        min: 0,
                        max: rehBest + 5
                        //fontSize : 14

                    }
                }
            }
        });
        dayRehAvgList = []
        dayTemperAvgList = []
        dayDiAvgList = []
        dayDiAvg = 0
        diSum = 0;

    })
    //fetch 통신 실패 시 실행 영역
    .catch(err => {
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });





/////////////////////////////////////////////////////////
function infoChange() {
    let mainTitleTag = document.querySelector('.main-title')
    searchDate = document.querySelector('#search-date').value;
    fetch('/charts/main', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
            // 데이터명 : 데이터값
            toDay: searchDate
        })
    })
        .then((response) => {
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!
            //캔버스 삭제
            let oldRehLineChart = document.getElementById('reh-line-chart');
            if (oldRehLineChart) {
                oldRehLineChart.parentNode.removeChild(oldRehLineChart);
            }
            // 새로운 차트 생성
            let rehCanvas = document.createElement('canvas');
            rehCanvas.id = 'reh-line-chart';
            rehCanvas.style.width = 250 + 'px';

            rehCanvas.style.height = 150 + 'px';


            document.getElementById('reh-line-container').appendChild(rehCanvas); // 새로운 캔버스 추가


            let oldTempLineChart = document.getElementById('temp-line-chart');
            if (oldTempLineChart) {
                oldTempLineChart.parentNode.removeChild(oldTempLineChart);
            }
            let canvas = document.createElement('canvas');
            canvas.id = 'temp-line-chart';
            canvas.style.width = 250 + 'px';
            canvas.style.height = 150 + 'px';
            document.getElementById('temp-line-container').appendChild(canvas); // 새로운 캔버스 추가



            // 불쾌지수 라인차트 지워주고 다시 그리기
            let oldDiLineChart = document.getElementById('di-line-chart');
            if (oldDiLineChart) {
                oldDiLineChart.parentNode.removeChild(oldDiLineChart);
            }
            let diCanvas = document.createElement('canvas');
            diCanvas.id = 'di-line-chart';
            diCanvas.style.width = 250 + 'px';
            diCanvas.style.height = 150 + 'px';
            diCanvas.className='mt-5';
            document.getElementById('di-line-container').appendChild(diCanvas);


            //메인 타이틀
            const mainTitleStr = `
            <h2>실내 센서 종합 모니터링</h2>
            <h4 class="h1" style="font-size: 17px; margin-left: 15px; margin-top: 10px;">  ${searchDate}</h4>
            
            `
            mainTitleTag.replaceChildren(mainTitleTag.textContent = '')
            mainTitleTag.insertAdjacentHTML('afterbegin', mainTitleStr)



            //테이블 다시 그려주기
            let tabTableTag = document.querySelector('.tab-table-all')
            let tabStr = `
                                <nav>
                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                        
                `
            data.selectTab.forEach((tap, i) => {
                if (i == 0) {
                    tabStr += `
                                        <span>
                                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-${i}" type="button" role="tab" aria-controls="nav-home" aria-selected="true" >${tap.type}</button>
                                        </span>
                    `
                } else {
                    tabStr += `
                                        <span>
                                            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-${i}" type="button" role="tab" aria-controls="nav-home" aria-selected="true" >${tap.type}</button>
                                        </span>
                    `

                }
            });
            tabStr += `
                                        
                                
                                    </div>
                                </nav>
                                <div class="tab-content" id="nav-tabContent"> 
                    
                    `
            data.selectTab.forEach((tap, i) => {
                if (i == 0) {
                    tabStr += `
                                    <div class="tab-pane fade show active" id="nav-${i}" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                                        <table class="table table-sm text-center">
                                        <colgroup>
                                            <col width="25%">
                                            <col width="25%">
                                            <col width="25%">
                                            <col width="25%">
                        
                                        </colgroup>
                                            <thead class="color-head">
                        
                                                <tr>
                                                    <td>시간</td>
                                                    <td>온도</td>
                                                    <td>습도</td>
                                                    <td>불쾌지수</td>
                                                </tr>
                        
                                            </thead>
                                            <tbody>
                                `
                } else {
                    tabStr += `
                                    <div class="tab-pane fade" id="nav-${i}" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                                        <table class="table table-sm text-center">
                                        <colgroup>
                                            <col width="25%">
                                            <col width="25%">
                                            <col width="25%">
                                            <col width="25%">
                        
                                        </colgroup>
                
                                            <thead class="color-head">
                                                <tr>
                                                    <td>시간</td>
                                                    <td>온도</td>
                                                    <td>습도</td>
                                                    <td>불쾌지수</td>
                                                </tr>
                        
                                            </thead>
                                            <tbody>
                                `

                }
                data.timeList.forEach(e => {
                    if (e.type == tap.type) {
                        tabStr += `
                                                <tr>
                                                    <td>${e.mesurTime}시</td>
                                                    <td>${e.temper} C °</td>
                                                    <td>${e.reh} %</td>
                                                    <td>${e.di} C °</td>
                                                </tr>
                            `
                    }
                })
                tabStr += `             
                                                <tr>
                                                    <td class="color-head">최고온도</td>
                                                    <td>${data.temps.maxTemp} C °</td>
                                                    <td class="color-head">최저온도</td>
                                                    <td>${data.temps.minTemp} C °</td>
                                                </tr>
                                                <tr>
                                                    <td class="color-head">평균 온도</td>
                                                    <td>${data.avg.tempAvg} C °</td>
                                                    <td class="color-head">평균 습도</td>
                                                    <td>${data.avg.rehAvg} %</td>
                                                </tr>
                                                <tr>
                                                    <td class="color-head">실효습도</td>
                                                    <td>${data.efh.efhData} %</td>
                                                    <td class="color-head">화재위험성</td>
                                                    <td>${data.efh.efhDeg}</td>
                                                </tr>
                                            </tbody>
            
                                        </table>
                                    </div>
                                
                    `
            });
            tabStr += `
                                </div>
                    `
            tabTableTag.replaceChildren(tabTableTag.textContent = '');
            tabTableTag.insertAdjacentHTML("afterbegin", tabStr);



            // /////////////////////////////////////////
            // 평균 온습도 
            let avgTag = document.querySelector('.avg-tag')
            let avgstr = `
                        <h5 class="mb-1 fw-normal lh-1 fs-6" style="color: gray;">

                            <div class="allWrap1">
                                <div class="wrap1">
                                    <div class="s2">
                                        <div>
                                            평균온도  ${data.avg.tempAvg} C °
                                        </div>
                                    </div>
                                    <div class="s2">
                                        <div>
                                            평균습도 ${data.avg.rehAvg} %
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </h5>
                `
            avgTag.replaceChildren(avgTag.textContent = '');
            avgTag.insertAdjacentHTML("afterbegin", avgstr);


            //최고 최저기온

            let tempTag = document.querySelector('.temp-div')
            let tempStr = `
                        <h5 class="mb-1 fw-normal lh-1 fs-6" style="color: gray;">

                            <div class="allWrap2">
                                <div class="wrap2">
                                    <div class="s3">
                                        <div>
                                            최고기온 ${data.temps.maxTemp} C °
                                        </div>
                                    </div>
                                    <div class="s3">
                                        <div>
                                            최저기온 ${data.temps.minTemp} C °
                                        </div>
                                    </div>

                                </div>

                            </div>


                        </h5>
                        `

            tempTag.replaceChildren(tempTag.textContent = '');
            tempTag.insertAdjacentHTML("afterbegin", tempStr);



            //실효습도
            let efhTag = document.querySelector('.efh-tag');
            let efhStr = `
                        <h5 class="mb-1 fw-normal lh-1 fs-6" style="color: gray;">
                            ${data.efh.efhData} %
                        </h5>
                        `


            efhTag.replaceChildren(efhTag.textContent = '');
            efhTag.insertAdjacentHTML("afterbegin", efhStr);



            //불쾌지수

            let diTag = document.querySelector('.di-tag');
            let diStr = `
                        <h5 class="mb-1 fw-normal lh-1 fs-6" style="color: gray;">

                            <div class="allWrap">
                                <div class="wrap">
                                    <div class="s1">
                                        <div>
                                            ${data.diPerDay[0].type}
                                            ${data.diPerDay[0].diLevel}
                                        </div>
                                    </div>
                                    <div class="s1">
                                        <div>
                                            ${data.diPerDay[1].type}
                                            ${data.diPerDay[1].diLevel}
                                        </div>
                                    </div>
                                    <div class="s1">
                                        <div>
                                            ${data.diPerDay[2].type}
                                            ${data.diPerDay[2].diLevel}
                                        </div>
                                    </div>
                                    <div class="s1">
                                        <div>
                                            ${data.diPerDay[3].type}
                                            ${data.diPerDay[3].diLevel}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </h5>
                        `
            
            diTag.replaceChildren(diTag.textContent = '');
            diTag.insertAdjacentHTML("afterbegin", diStr);







            let rehLow = 0
            let temperLow = 0
            let rehBest = 0
            let temperBest = 0
            let timeLabel = []
            let temperAvg = []
            let rehAvg = []
            let tempBest = 0

            let diLow = 0
            let diBest = 0
            let diList = []





            temperLow = data.timeList[0].temper
            rehLow = data.timeList[0].reh
            diLow = data.timeList[0].di


            //시간대별 온도 습도 조회
            console.log(data.timeList)
            data.timeList.forEach(e => {
                diSum += e.di;
                dayDiAvg = diSum / data.timeList.length;
            });

            data.timeList.forEach(e => {
                timeLabel.push(e.mesurTime)
                temperAvg.push(e.temper)
                rehAvg.push(e.reh)
                diList.push(e.di)




                dayRehAvgList.push(data.avg.rehAvg)
                dayTemperAvgList.push(data.avg.tempAvg)
                dayDiAvgList.push(dayDiAvg)



                if (rehBest < e.reh) {
                    rehBest = e.reh
                }
                if (temperBest < e.temper) {
                    temperBest = e.temper
                }

                if (rehLow > e.reh) {
                    rehLow = e.reh
                }
                if (temperLow > e.temper) {
                    temperLow = e.temper
                }
                if (diBest < e.di) {
                    diBest = e.di
                }
                if (diLow > e.di) {
                    diLow = e.di
                }

            });

            new Chart(document.getElementById("reh-line-chart"), {
                type: 'line',
                data: {
                    labels: timeLabel,
                    datasets: [{
                        data: rehAvg,
                        label: "습도",
                        borderColor: "#59B4C3",
                        fill: false
                    }, {
                        data: dayRehAvgList,
                        label: "평균",
                        borderColor: "rgba(1, 1, 1,0.55)",
                        fill: false,
                        pointRadius: 0


                    }
                    ]
                },
                options: {

                    // elements: {
                    //     point: {
                    //         radius: 0
                    //     }
                    // }
                    // ,

                    title: {
                        display: true,
                        text: 'World population per region (in millions)'
                    },
                    scales: {

                        y: {
                            min: Math.ceil(rehLow - 5),
                            max: Math.floor(rehBest + 5)

                            , title: {
                                display: true,

                                font: {
                                    family: 'Times',
                                    size: 15,
                                    style: 'normal',
                                    lineHeight: 1.2
                                },

                                text: "습도(%)",
                            }


                        },
                        x: {
                            title: {
                                display: true,
                                text: '시간',
                                color: 'black',
                                font: {
                                    family: 'Times',
                                    size: 15,
                                    style: 'normal',
                                    lineHeight: 1.2
                                },
                            }
                        }
                    }

                }
            });

            new Chart(document.getElementById("temp-line-chart"), {
                type: 'line',
                data: {
                    labels: timeLabel,
                    datasets: [{
                        data: temperAvg,
                        label: "온도",
                        borderColor: "#FFAA80",
                        fill: false
                    }, {
                        data: dayTemperAvgList,
                        label: "평균",
                        borderColor: "rgba(1, 1, 1,0.55)",
                        fill: false,
                        pointRadius: 0


                    }
                    ]
                },
                options: {

                    title: {
                        display: true,
                        text: 'World population per region (in millions)'
                    },
                    
                    scales: {
                        y: {

                            min: Math.floor(temperLow - 5), //4.5
                            max: Math.ceil(temperBest + 5)
                            //fontSize : 14

                            , title: {
                                display: true,
                                text: "온도(C °)",
                                font: {
                                    size: 15,
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: "시간",
                                font: {
                                    size: 15,
                                }
                            }
                        }
                    }

                }
            });
            // 불쾌지수 라인차트
            new Chart(document.getElementById("di-line-chart"), {
                type: 'line',
                data: {
                    labels: timeLabel,
                    datasets: [{
                        data: diList,
                        label: "불쾌지수",
                        borderColor: "#FF5580",
                        fill: false
                    }, {
                        data: dayDiAvgList,
                        label: "평균",
                        borderColor: "rgba(1, 1, 1,0.55)",
                        fill: false,
                        pointRadius: 0


                    }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'World population per region (in millions)'
                    },
                    
                    scales: {
                        y: {

                            min: Math.ceil(diLow - 5),
                            max: Math.floor(diBest + 5)
                            // fontSize : 14
                            , title: {
                                display: true,
                                text: "불쾌지수(C °)",
                                font: {
                                    size: 15,
                                }
                            }

                        }
                        , x: {
                            title: {
                                display: true,
                                text: "시간",
                                font: {
                                    size: 15,
                                }
                            }
                        }
                    }
                }
            });





            //평균 온습도/////////////////////////////////

            let cnt1 = 0;
            let wrap1 = document.querySelector(".wrap1");

            let s2 = document.querySelectorAll(".s2");

            let sliderClone1 = wrap1.firstElementChild.cloneNode(true); //복사
            wrap1.appendChild(sliderClone1); //붙여넣기

            let play1 = setInterval(() => {
                cnt1++
                wrap1.style.marginLeft = (-cnt1 * 100) + "%"
                wrap1.style.transition = "all 0.6s";
                if (cnt1 == 2) {
                    setTimeout(() => {
                        wrap1.style.transition = "0s"
                        wrap1.style.marginLeft = "0"
                        cnt1 = 0;

                    }, 700)
                }
            }, 2500)


            wrap1.addEventListener('mouseover', (event) => { clearInterval(play1) })
            wrap1.addEventListener('mouseout', (event) => {
                play1 = setInterval(() => {
                    cnt1++
                    wrap1.style.marginLeft = (-cnt1 * 100) + "%"
                    wrap1.style.transition = "all 0.6s";
                    if (cnt1 == 2) {
                        setTimeout(() => {
                            wrap1.style.transition = "0s"
                            wrap1.style.marginLeft = "0"
                            cnt1 = 0;

                        }, 700)
                    }

                }, 2000)
            })
            //////////////////////////////////////////////////////////////////////////
            //최고 최저기온

            let cnt2 = 0;
            let wrap2 = document.querySelector(".wrap2");


            let s3 = document.querySelectorAll(".s3");

            let sliderClone2 = wrap2.firstElementChild.cloneNode(true); //복사
            wrap2.appendChild(sliderClone2); //붙여넣기

            let play2 = setInterval(() => {
                cnt2++

                wrap2.style.marginLeft = (-cnt2 * 100) + "%";
                wrap2.style.transition = "all 0.6s";

                if (cnt2 == 2) {
                    setTimeout(() => {
                        wrap2.style.transition = "0s";
                        wrap2.style.marginLeft = "0";

                        cnt2 = 0;
                    }, 700)
                }
            }, 2500)


            wrap2.addEventListener('mouseover', (event) => { clearInterval(play2) })
            wrap2.addEventListener('mouseout', (event) => {
                play2 = setInterval(() => {
                    cnt2++

                    wrap2.style.marginLeft = (-cnt2 * 100) + "%";
                    wrap2.style.transition = "all 0.6s";

                    if (cnt2 == 2) {
                        setTimeout(() => {
                            wrap2.style.transition = "0s";
                            wrap2.style.marginLeft = "0";

                            cnt2 = 0;
                        }, 700)
                    }

                }, 2000)
            })


            //불쾌지수 

            let cnt = 0;
            let wrap = document.querySelector(".wrap");

            let s1 = document.querySelectorAll(".s1");

            let sliderClone = wrap.firstElementChild.cloneNode(true); //복사
            wrap.appendChild(sliderClone); //붙여넣기

            let play = setInterval(() => {
                cnt++

                wrap.style.marginLeft = (-cnt * 100) + "%";
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

                    wrap.style.marginLeft = (-cnt * 100) + "%";
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

            dayRehAvgList = []
            dayTemperAvgList = []
            dayDiAvgList = []
            dayDiAvg = 0
            diSum = 0;
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });






}
