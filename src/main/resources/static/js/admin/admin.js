
var tempLabels = []
var tempMax = []
var tempMin = []
let bestTemp = 0
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
        data.forEach(e => {
            tempLabels.push(e.mesurDy)
            tempMax.push(e.maxTemp)
            tempMin.push(e.minTemp)
            if (bestTemp < e.maxTemp) {
                bestTemp = e.maxTemp
            }
        });
        // 라인차트
        new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
                labels: tempLabels,
                datasets: [{
                    data: tempMax,
                    label: "최고기온",
                    borderColor: "#c45850",
                    fill: false
                }, {
                    data: tempMin,
                    label: "최저기온",
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
                        max: bestTemp + 5
                        //fontSize : 14

                    }
                }
            }
        });

        new Chart(document.getElementById("bar-chart"), {
            type: 'bar',
            data: {
                labels: tempLabels,
                datasets: [
                    {
                        label: "최고기온",
                        backgroundColor: "#c45850",
                        data: tempMax
                    },
                    {
                        label: "최저기온",
                        backgroundColor: "#3e95cd",
                        data: tempMin

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
                        max: bestTemp + 5
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





/////////////////////////////////////////////////////////
let searchDate = document.querySelector("#search-date")
console.log(searchDate)

searchDate.addEventListner("input", function () {
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
            console.log(searchDate.value)
            data.forEach(e => {
                tempLabels.push(e.mesurDy)

                tempMax.push(e.maxTemp)
                tempMin.push(e.minTemp)
                if (bestTemp < e.maxTemp) {
                    bestTemp = e.maxTemp
                }
            });
            // 라인차트
            new Chart(document.getElementById("line-chart"), {
                type: 'line',
                data: {
                    labels: tempLabels,
                    datasets: [{
                        data: tempMax,
                        label: "최고기온",
                        borderColor: "#c45850",
                        fill: false
                    }, {
                        data: tempMin,
                        label: "최저기온",
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
                            max: bestTemp + 5
                            //fontSize : 14

                        }
                    }
                }
            });

            new Chart(document.getElementById("bar-chart"), {
                type: 'bar',
                data: {
                    labels: tempLabels,
                    datasets: [
                        {
                            label: "최고기온",
                            backgroundColor: "#c45850",
                            data: tempMax
                        },
                        {
                            label: "최저기온",
                            backgroundColor: "#3e95cd",
                            data: tempMin

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
                            max: bestTemp + 5
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
});

