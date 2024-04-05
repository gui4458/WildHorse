

var mesurDy=[]
var type=[]
var di_level=[]
var di=[]
var reh=[]
var temper=[]
let highest=0


fetch('/charts/test', { //요청경로
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


        data.forEach(e => {
            mesurDy.push(e.mesurDy)
            type.push(e.type)
            di_level.push(e.di_level)
            di.push(e.di)
            reh.push(e.reh)
            temper.push(e.temper)
            if (highest< e.reh) {
                highest = e.reh
            }
        });
        // 라인차트
        new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
                labels: mesurDy,
                datasets: [{
                    data: di,
                    label: "불쾌지수",
                    borderColor: "#c45850",
                    fill: false
                }, {
                    data: reh,
                    label: "습도",
                    borderColor: "#3e95cd",
                    fill: false
                }, {
                    data: temper,
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

                        min: 0,
                        max: highest + 5
                        //fontSize : 14

                    }
                }
            }
        });


        




    })
    //fetch 통신 실패 시 실행 영역
    .catch(err => {
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });
