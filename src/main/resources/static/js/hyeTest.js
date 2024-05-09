
let detailChart;
let compareChart1;
let compareChart2;

drawDetailChart();
drawCompareChart1();
drawCompareChart2();


function drawDetailChart(){
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
    
        const monthList=[];
        var temperAvgList = [];
        var diAvgList=[];
        var rehAvgList = [];
        let highest = 0;
    
        data.detailList.forEach(e => {
            monthList.push(e.month);
            diAvgList.push(e.diAvg);
            rehAvgList.push(e.rehAvg);
            temperAvgList.push(e.temperAvg);
            if (highest < e.rehAvg) {
                highest = e.reh
            }
        });
        // 라인차트
        detailChart = new Chart(document.getElementById("detail-chart"), {
            type: 'line',
            data: {
                labels: monthList,
                datasets: [{
                    data: diAvgList,
                    label: "불쾌지수",
                    borderColor: "#8a2be2",
                    fill: false
                }, {
                    data: rehAvgList,
                    label: "습도",
                    borderColor: "#3e95cd",
                    fill: false
                }, {
                    data: temperAvgList,
                    label: "온도",
                    borderColor: "#ff0000",
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

        console.log(detailChart);
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err => {
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });
}

function drawCompareChart1(){
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
    
        const monthList=[];
        var temperAvgList = [];
        var diAvgList=[];
        var rehAvgList = [];
        let highest = 0;
    
        data.compareList1.forEach(e => {
            monthList.push(e.month);
            diAvgList.push(e.diAvg);
            rehAvgList.push(e.rehAvg);
            temperAvgList.push(e.temperAvg);
            if (highest < e.rehAvg) {
                highest = e.reh
            }
        });
        // 라인차트
        compareChart1 = new Chart(document.getElementById("compare-chart1"), {
            type: 'line',
            data: {
                labels: monthList,
                datasets: [{
                    data: diAvgList,
                    label: "불쾌지수",
                    borderColor: "#8a2be2",
                    fill: false
                }, {
                    data: rehAvgList,
                    label: "습도",
                    borderColor: "#3e95cd",
                    fill: false
                }, {
                    data: temperAvgList,
                    label: "온도",
                    borderColor: "#ff0000",
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
}

function drawCompareChart2(){
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
    
        const monthList=[];
        var temperAvgList = [];
        var diAvgList=[];
        var rehAvgList = [];
        let highest = 0;
    
        data.compareList2.forEach(e => {
            monthList.push(e.month);
            diAvgList.push(e.diAvg);
            rehAvgList.push(e.rehAvg);
            temperAvgList.push(e.temperAvg);
            if (highest < e.rehAvg) {
                highest = e.reh
            }
        });
        // 라인차트
        compareChart2 = new Chart(document.getElementById("compare-chart2"), {
            type: 'line',
            data: {
                labels: monthList,
                datasets: [{
                    data: diAvgList,
                    label: "불쾌지수",
                    borderColor: "#8a2be2",
                    fill: false
                }, {
                    data: rehAvgList,
                    label: "습도",
                    borderColor: "#3e95cd",
                    fill: false
                }, {
                    data: temperAvgList,
                    label: "온도",
                    borderColor: "#ff0000",
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
}


function reDrawChart(canvasId, selectedTag){
    // let oldChart = document.getElementById(canvasId);
    // if (oldChart) {
    //     oldChart.parentNode.removeChild(oldChart);
    // }
    // let canvas = document.createElement('canvas');
    // canvas.id = 'temp-line-chart';
    // document.getElementById('temp-line-container').appendChild(canvas); // 새로운 캔버스 추가
    fetch('/charts/reTest', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
            // 데이터명 : 데이터값
            month : selectedTag.value
        })
    })
    .then((response) => {
        return response.json(); //나머지 경우에 사용
    })
    //fetch 통신 후 실행 영역
    .then((data) => {//data -> controller에서 리턴되는 데이터!

        const monthList=[];
        var temperAvgList = [];
        var diAvgList=[];
        var rehAvgList = [];
        let highest = 0;

        
    
        data.forEach(e => {
            monthList.push(e.month);
            diAvgList.push(e.diAvg);
            rehAvgList.push(e.rehAvg);
            temperAvgList.push(e.temperAvg);
            // if (highest < e.rehAvg) {
            //     highest = e.reh
            // }
        });

        

        let dataList = [];
        dataList.push(diAvgList);
        dataList.push(rehAvgList);
        dataList.push(temperAvgList);

        

        // 차트 데이터
        switch(canvasId){
            //월 상세
            case 'detail-chart':
                updateChart(detailChart, monthList, dataList);
                updateShowData(dataList)
                break;
            //오른쪽 차트
            case 'compare-chart1':
                updateChart(compareChart1, monthList, dataList);
                updateCompareDiv(dataList, 'left');
                break;
            // 왼쪽 차트
            case 'compare-chart2':
                updateChart(compareChart2, monthList, dataList);
                updateCompareDiv(dataList, 'right');
                break;
        }
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err => {
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });

}

function updateChart(chart, label, newData) {
    removeData(chart);


    chart.data.labels.push(...label);
    chart.data.datasets.forEach((dataset, idx) => {
        dataset.data.push(...newData[idx]);
    });
    chart.update();
}

//월별 상세 내역
function updateShowData(dataList){

    const [diAvgList, rehAvgList, temperAvgList] = dataList;

    const maxTemper = Math.max(...temperAvgList);
    const minTemper = Math.min(...temperAvgList);
    const avgTemper = Math.round(temperAvgList.reduce((a, b) => a + b) / temperAvgList.length);

    const maxReh = Math.max(...rehAvgList);
    const minReh = Math.min(...rehAvgList);
    const avgReh = Math.round(rehAvgList.reduce((a, b) => a + b) / rehAvgList.length);

    const maxDi = Math.max(...diAvgList);
    const minDi = Math.min(...diAvgList);

    //온도
    document.querySelector('.updateMaxT-div').textContent = maxTemper;
    document.querySelector('.updateMaxT-div').innerHTML = `<span>${maxTemper}℃</span>`;

    document.querySelector('.updateMinT-div').textContent = minTemper;
    document.querySelector('.updateMinT-div').innerHTML = `<span>${minTemper}℃</span>`;

    document.querySelector('.updateAvgT-div').textContent = avgTemper;
    document.querySelector('.updateAvgT-div').innerHTML = `<span>${avgTemper}℃</span>`;
    //습도
    document.querySelector('.updateMaxR-div').textContent = maxReh;
    document.querySelector('.updateMaxR-div').innerHTML = `<span>${maxReh}%</span>`;

    document.querySelector('.updateMinR-div').textContent = minReh;
    document.querySelector('.updateMinR-div').innerHTML = `<span>${minReh}%</span>`;

    document.querySelector('.updateAvgR-div').textContent = avgReh;
    document.querySelector('.updateAvgR-div').innerHTML = `<span>${avgReh}%</span>`;
    //불쾌지수
    document.querySelector('.updateMaxD-div').textContent = maxDi;
    document.querySelector('.updateMaxD-div').innerHTML = `<span>${maxDi}</span>`;

    document.querySelector('.updateMinD-div').textContent = minDi;
    document.querySelector('.updateMinD-div').innerHTML = `<span>${minDi}</span>`;

    
}

function removeData(chart){
    chart.data.labels = [];
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    chart.update();
}
//월별 비교 내역
function updateCompareDiv(dataList, pos){
    const [diAvgList, rehAvgList, temperAvgList] = dataList;

    //최고 width 300으로 제한 / 1도당 7px
    const maxTemper = Math.max(...temperAvgList);
    const minTemper = Math.min(...temperAvgList);
    const avgTemper = Math.round(temperAvgList.reduce((a, b) => a + b) / temperAvgList.length);
    
    const maxReh = Math.max(...rehAvgList);
    const minReh = Math.min(...rehAvgList);
    const avgReh = Math.round(rehAvgList.reduce((a, b) => a + b) / rehAvgList.length);

    const maxDi = Math.max(...diAvgList);
    const minDi = Math.min(...diAvgList);
    // 온도
    document.querySelector(`.${pos}-bar-max-temper`).style.width = (maxTemper * 7) + 'px';
    document.querySelector(`.${pos}-bar-max-temper`).innerHTML = `<span>${maxTemper}℃</span>`;

    document.querySelector(`.${pos}-bar-min-temper`).style.width = (minTemper * 7) + 'px';
    document.querySelector(`.${pos}-bar-min-temper`).innerHTML = `<span style="float: right;">${minTemper}℃</span>`;

    document.querySelector(`.${pos}-bar-avg-temper`).style.width = (avgTemper * 7) + 'px';
    document.querySelector(`.${pos}-bar-avg-temper`).innerHTML = `<span>${avgTemper}℃</span>`;
    // 습도
    document.querySelector(`.${pos}-bar-max-reh`).style.width = (maxReh * 2) + 'px';
    document.querySelector(`.${pos}-bar-max-reh`).innerHTML = `<span>${maxReh}%</span>`;

    document.querySelector(`.${pos}-bar-min-reh`).style.width = (minReh * 2) + 'px';
    document.querySelector(`.${pos}-bar-min-reh`).innerHTML = `<span>${minReh}%</span>`;

    document.querySelector(`.${pos}-bar-avg-reh`).style.width = (avgReh * 2) + 'px';
    document.querySelector(`.${pos}-bar-avg-reh`).innerHTML = `<span>${avgReh}%</span>`;
    // 불쾌지수
    document.querySelector(`.${pos}-bar-max-di`).style.width = (maxDi * 2) + 'px';
    document.querySelector(`.${pos}-bar-max-di`).innerHTML = `<span>${maxDi}</span>`;

    document.querySelector(`.${pos}-bar-min-di`).style.width = (minDi * 2) + 'px';
    document.querySelector(`.${pos}-bar-min-di`).innerHTML = `<span>${minDi}</span>`;
}

