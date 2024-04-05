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
        console.log(data)
        data.forEach(e => {
            efhDates.push(e.efhDate)
            efhDatas.push(e.efhData)
            efhDegs.push(e.efhDeg)
        });

        const mixedChart = new Chart(document.getElementById("efhChart"), {
            data: {
                datasets: [{
                    type: 'bar',
                    label: 'EFH Deg',
                    data: efhDegs
                }, {
                    type: 'line',
                    label: 'EFH Percent',
                    data: efhDatas,
                }],
                labels: efhDates
            },
            options: {
                title: {
                    display: true,
                    text: '실효습도'
                } 
            }
        });
        

    })
    //fetch 통신 실패 시 실행 영역
    .catch(err => {
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });




