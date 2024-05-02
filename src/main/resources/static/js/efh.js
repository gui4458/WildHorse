var efhLabels = []
var efhDates = []
var efhDatas = []
var efhDegs = []

fetch('/charts/efh', { //요청경로
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
        let danger = 0;
        let caution = 0;
        let safety = 0;
        console.log(data)
        data.forEach(e => {
            efhDates.push(e.efhDate)
            efhDatas.push(e.efhData)
            efhDegs.push(e.efhDeg)
            if(e.efhDeg == '위험'){
                danger += 1;
            }else if(e.efhDeg == '주의'){
                caution += 1;
            }else{
                safety+= 1;
            }
        });
        let dangerStr =`
        <div class="row">
            <div class="col">
                <div>위험 : 총${danger}일</div>
                <div>주의 : 총${caution}일</div>
                <div>안전 : 총${safety}일</div>
            </div>
        </div>
        
        `
        const showDanger = document.querySelector('#show-danger');
        showDanger.replaceChildren(showDanger.textContent='');
        showDanger.insertAdjacentHTML('afterbegin',dangerStr)
        const mixedChart = new Chart(document.getElementById("efhChart"), {
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
        
        

    })
    //fetch 통신 실패 시 실행 영역
    .catch(err => {
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });




