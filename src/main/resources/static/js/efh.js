let efhLabels = []
let efhDates = []
let efhDatas = []
let efhDegs = []
let danger = 0;
let caution = 0;
let safety = 0;
document.addEventListener('DOMContentLoaded', function () {

    let toDay = document.querySelector('#d-day').value;
    fetch('/charts/efh', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
            // 데이터명 : 데이터값
            selectDay: toDay
        })
    })
        .then((response) => {
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!

            console.log(data)
            data.efhList.forEach(e => {
                efhDates.push(e.efhDate)
                efhDatas.push(e.efhData)
                efhDegs.push(e.efhDeg)
                if (e.efhDeg == '위험') {
                    danger += 1;
                } else if (e.efhDeg == '주의') {
                    caution += 1;
                } else {
                    safety += 1;
                }
            });
            let dangerStr = `
        <div class="row">
            <div class="col">
                <div>위험 : 총${danger}일</div>
                <div>주의 : 총${caution}일</div>
                <div>안전 : 총${safety}일</div>
            </div>
        </div>
        
        `
            const showDanger = document.querySelector('#show-danger');
            showDanger.replaceChildren(showDanger.textContent = '');
            showDanger.insertAdjacentHTML('afterbegin', dangerStr)
            new Chart(document.getElementById("efh-line-chart"), {
                data: {
                    datasets: [
                        {
                            type: 'line',
                            label: 'EFH Percent',
                            data: efhDatas,
                            fill: false,
                            borderColor: 'rgb(54, 162, 235)'
                        }
                    ],
                    labels: efhDates
                },
                options: {
                    title: {
                        display: true,
                        text: '실효습도'
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    max: 100
                                }
                            }
                        ]
                    },
                    plugins: {
                        annotation: {
                            annotations: [
                                {
                                    type: 'line',
                                    mode: 'horizontal',
                                    scaleID: 'y-axis-0',
                                    value: 50,
                                    yMin: 50,
                                    yMax: 50,
                                    borderColor: 'rgba(255, 165, 0, 0.6)',
                                    borderWidth: 2,
                                    label: {
                                        enabled: true,
                                        content: 'Under 50 Warning'
                                    }
                                },
                                {
                                    type: 'line',
                                    mode: 'horizontal',
                                    scaleID: 'y-axis-0',
                                    value: 35,
                                    yMin: 35,
                                    yMax: 35, // Adjust the y-value as needed
                                    borderColor: 'rgba(255, 76, 71, 0.6)',
                                    borderWidth: 2,
                                    label: {
                                        enabled: true,
                                        content: 'Under 35 Caution'
                                    }
                                }
                                ,
                                {
                                    type: 'label',
                                    xValue: 5,
                                    yValue: 42,
                                    backgroundColor: 'rgba(255, 165, 0, 0.6)',
                                    content: ['Under 50 조심단계'],
                                    font: {
                                        size: 18
                                    }

                                }
                                ,
                                {
                                    type: 'label',
                                    xValue: 5,
                                    yValue: 22,
                                    backgroundColor: 'rgba(255, 76, 71, 0.6)',
                                    content: ['Under 50 경고단계'],
                                    font: {
                                        size: 18
                                    }

                                }
                            ]
                        }
                    }
                }
            });

            new Chart(document.getElementById("danger-pie-chart"), {
                type: 'pie',
                data: {
                    labels: ["안전", "주의", "위험"],
                    datasets: [{
                        label: "Population (millions)",
                        backgroundColor: ["#8e5ea2", "#3cba9f", "#e8c3b9"],
                        data: [safety, caution, danger]
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Predicted world population (millions) in 2050'
                    }
                }
            });



        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
});
function selectDayEfh(efhDate) {
    efhLabels = [];
    efhDates = [];
    efhDatas = [];
    efhDegs = [];
    danger = 0;
    caution = 0;
    safety = 0;
    // 기존 차트 삭제
    let oldEfhLineChart = document.getElementById('efh-line-chart');
    if (oldEfhLineChart) {
        oldEfhLineChart.parentNode.removeChild(oldEfhLineChart);
    }
    // 새로운 차트 생성
    let efhCanvas = document.createElement('canvas');
    efhCanvas.id = 'efh-line-chart';
    efhCanvas.setAttribute('style', 'width:100%;');
    document.getElementById('efh-line-container').appendChild(efhCanvas); // 새로운 캔버스 추가


    // 기존 차트 삭제
    let oldDangerPieChart = document.getElementById('danger-pie-chart');
    if (oldDangerPieChart) {
        oldDangerPieChart.parentNode.removeChild(oldDangerPieChart);
    }
    // 새로운 차트 생성
    let dangerCanvas = document.createElement('canvas');
    dangerCanvas.id = 'danger-pie-chart';
    dangerCanvas.setAttribute('style', 'width:50%;');
    document.getElementById('danger-pie-container').appendChild(dangerCanvas); // 새로운 캔버스 추가

    fetch('/charts/selectChangeData', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
            // 데이터명 : 데이터값
            selectDay: efhDate
        })
    })
        .then((response) => {
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!

            console.log(data)
            data.efhList.forEach(e => {
                efhDates.push(e.efhDate)
                efhDatas.push(e.efhData)
                efhDegs.push(e.efhDeg)
                if (e.efhDeg == '위험') {
                    danger += 1;
                } else if (e.efhDeg == '주의') {
                    caution += 1;
                } else {
                    safety += 1;
                }
            });
            console.log(`efhDates=${efhDate}`)
            console.log(`efhDatas=${efhDatas}`)
            console.log(`efhDegs=${efhDegs}`)
            console.log(`danger=${danger}`)
            console.log(`caution=${caution}`)
            console.log(`safety=${safety}`)
            let dangerStr = `
            <div class="row">
                <div class="col">
                    <div>위험 : 총${danger}일</div>
                    <div>주의 : 총${caution}일</div>
                    <div>안전 : 총${safety}일</div>
                </div>
            </div>
            
            `
            const showDanger = document.querySelector('#show-danger');
            showDanger.replaceChildren(showDanger.textContent = '');
            showDanger.insertAdjacentHTML('afterbegin', dangerStr)
            new Chart(document.getElementById("efhChart"), {
                data: {
                    datasets: [
                        {
                            type: 'line',
                            label: 'EFH Percent',
                            data: efhDatas,
                            fill: false,
                            borderColor: 'rgb(54, 162, 235)'
                        }
                    ],
                    labels: efhDates
                },
                options: {
                    title: {
                        display: true,
                        text: '실효습도'
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    max: 100
                                }
                            }
                        ]
                    },
                    plugins: {
                        annotation: {
                            annotations: [
                                {
                                    type: 'line',
                                    mode: 'horizontal',
                                    scaleID: 'y-axis-0',
                                    value: 50,
                                    yMin: 50,
                                    yMax: 50,
                                    borderColor: 'rgba(255, 165, 0, 0.6)',
                                    borderWidth: 2,
                                    label: {
                                        enabled: true,
                                        content: 'Under 50 Warning'
                                    }
                                },
                                {
                                    type: 'line',
                                    mode: 'horizontal',
                                    scaleID: 'y-axis-0',
                                    value: 35,
                                    yMin: 35,
                                    yMax: 35, // Adjust the y-value as needed
                                    borderColor: 'rgba(255, 76, 71, 0.6)',
                                    borderWidth: 2,
                                    label: {
                                        enabled: true,
                                        content: 'Under 35 Caution'
                                    }
                                }
                                ,
                                {
                                    type: 'label',
                                    xValue: 5,
                                    yValue: 42,
                                    backgroundColor: 'rgba(255, 165, 0, 0.6)',
                                    content: ['Under 50 조심단계'],
                                    font: {
                                        size: 18
                                    }

                                }
                                ,
                                {
                                    type: 'label',
                                    xValue: 5,
                                    yValue: 22,
                                    backgroundColor: 'rgba(255, 76, 71, 0.6)',
                                    content: ['Under 50 경고단계'],
                                    font: {
                                        size: 18
                                    }

                                }
                            ]
                        }
                    }
                }
            });

            new Chart(document.getElementById("danger-pie-chart"), {
                type: 'pie',
                data: {
                    labels: ["안전", "주의", "위험"],
                    datasets: [{
                        label: "Population (millions)",
                        backgroundColor: ["#8e5ea2", "#3cba9f", "#e8c3b9"],
                        data: [safety, caution, danger]
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Predicted world population (millions) in 2050'
                    }
                }
            });



        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });

}

function selectDay(toDay) {
    fetch('/charts/selectChangeData', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
            // 데이터명 : 데이터값
            'selectDay' : toDay
        })
    })
        .then((response) => {
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!
            console.log(data.toDayEfh)
            alert(2)
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}
