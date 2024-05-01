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
    imgSlider[0].style.display = "block";

    setInterval(() => { // 4초에 한번씩 실행
        let imgNextIndex = (imgCurrentIndex + 1) % imgSlider.length; // 1 2 0 1 2 무한반복

        imgSlider.forEach(img => img.style.transition = "all 5s"); //이미지 애니메이션 추가
        // 현재 보이는 차트를 숨김
        imgSlider[imgCurrentIndex].style.display = "none";
        // 다음 차트를 보이도록 함
        imgSlider[imgNextIndex].style.display = "block";

        imgCurrentIndex = imgNextIndex; // 다음 인덱스를 현재 인덱스로 업데이트
    }, 4000);
}




// ///////////////////////////////////////////////////////////////////////////
//차트

var tempLabels = []
var tempAvg = []
// var rehAvg = []

let rehLow=0
let temperLow=0
let rehBest = 0
let temperBest = 0
let timeLabel = []
let temperAvg = []
let rehAvg = []


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
    })
})
    .then((response) => {
        return response.json(); //나머지 경우에 사용
    })
    //fetch 통신 후 실행 영역
    .then((data) => {//data -> controller에서 리턴되는 데이터!
        console.log(data.timeList);
        temperLow = data.timeList[0].temper
        rehLow = data.timeList[0].reh
        //시간대별 온도 습도 조회
        console.log(data.timeList)
        data.timeList.forEach(e => {
            timeLabel.push(e.mesurTime)
            temperAvg.push(e.temper)
            rehAvg.push(e.reh)

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

        });

        new Chart(document.getElementById("reh-line-chart"), {
            type: 'line',
            data: {
                labels: timeLabel,
                datasets: [{
                    data: rehAvg,
                    label: "습도",
                    borderColor: "#c45850",
                    fill: false
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

                        min: rehLow-5,
                        max: rehBest+5
                        //fontSize : 14

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
                    borderColor: "#3e95cd",
                    fill: false
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

                        min: temperLow-5,
                        max: temperBest+5
                        //fontSize : 14

                    }
                }
            }
        });





        // data.regList.forEach(e => {
        //     tempLabels.push(e.trDate)
        //     tempAvg.push(e.tempAvg)
        //     rehAvg.push(e.rehAvg)
        //     if (rehBest < e.rehAvg) {
        //         rehBest = e.rehAvg
        //     }
        //     if(tempBest < e.tempAvg){
        //         tempBest = e.tempAvg
        //     }
        // });
        // // 라인차트
        // new Chart(document.getElementById("temp-line-chart"), {
        //     type: 'line',
        //     data: {
        //         labels: tempLabels,
        //         datasets: [{
        //             data: tempAvg,
        //             label: "평균온도",
        //             borderColor: "#c45850",
        //             fill: false
        //         }
        //         ]
        //     },
        //     options: {
        //         title: {
        //             display: true,
        //             text: 'World population per region (in millions)'
        //         },
        //         scales: {
        //             y: {

        //                 min: 0,
        //                 max: tempBest + 5
        //                 //fontSize : 14

        //             }
        //         }
        //     }
        // });
        // new Chart(document.getElementById("reh-line-chart"), {
        //     type: 'line',
        //     data: {
        //         labels: tempLabels,
        //         datasets: [{
        //             data: rehAvg,
        //             label: "평균습도",
        //             borderColor: "#3e95cd",
        //             fill: false
        //         }
        //         ]
        //     },
        //     options: {
        //         title: {
        //             display: true,
        //             text: 'World population per region (in millions)'
        //         },
        //         scales: {
        //             y: {

        //                 min: 50,
        //                 max: rehBest + 5
        //                 //fontSize : 14

        //             }
        //         }
        //     }
        // });

        
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
        // Pie chart(가짜데이터)
        new Chart(document.getElementById("pie-chart"), {
            type: 'pie',
            data: {
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [{
                    label: "Population (millions)",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: [2478, 5267, 734, 784, 433]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }
            }
        });
        //Radar chart(가짜)
        new Chart(document.getElementById("radar-chart"), {
            type: 'radar',
            data: {
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [
                    {
                        label: "1950",
                        fill: true,
                        backgroundColor: "rgba(179,181,198,0.2)",
                        borderColor: "rgba(179,181,198,1)",
                        pointBorderColor: "#fff",
                        pointBackgroundColor: "rgba(179,181,198,1)",
                        data: [8.77, 55.61, 21.69, 6.62, 6.82]
                    }, {
                        label: "2050",
                        fill: true,
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        pointBorderColor: "#fff",
                        pointBackgroundColor: "rgba(255,99,132,1)",
                        pointBorderColor: "#fff",
                        data: [25.48, 54.16, 7.61, 8.06, 4.45]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Distribution in % of world population'
                }
            }
        });
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err => {
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });





/////////////////////////////////////////////////////////
let searchDate = document.querySelector("#search-date")
function infoChange() {
    fetch('/charts/main', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
            // 데이터명 : 데이터값
        })
    })
        .then((response) => {
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!

        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });






}
