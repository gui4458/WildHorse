

var tempLabels = []
var tempMax = []
var tempMin = []
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


        //////////////////////////////////////////////////////////////////////
        // 바차트

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

        ///////////////////////////////////////////////////////
        //Pie chart
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
        ///////////////////////////////////////////////
        //Radar chart
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
        /////////////////////////////////////////
        //Polar area chart
        new Chart(document.getElementById("polar-chart"), {
            type: 'polarArea',
            data: {
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: [2478, 5267, 734, 784, 433]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }
            }
        });
        /////////////////////////////////////////////
        //Doughnut chart
        new Chart(document.getElementById("doughnut-chart"), {
            type: 'doughnut',
            data: {
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: [2478, 5267, 734, 784, 433]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }
            }
        });

        ////////////////////////////////////////////////
        //Grouped bar chart
        new Chart(document.getElementById("bar-chart-grouped"), {
            type: 'bar',
            data: {
                labels: ["1900", "1950", "1999", "2050"],
                datasets: [
                    {
                        label: "Africa",
                        backgroundColor: "#3e95cd",
                        data: [133, 221, 783, 2478]
                    }, {
                        label: "Europe",
                        backgroundColor: "#8e5ea2",
                        data: [408, 547, 675, 734]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Population growth (millions)'
                }
            }
        });
        ////////////////////////////////////////////////
        //Mixed chart
        new Chart(document.getElementById("mixed-chart"), {
            type: 'bar',
            data: {
                labels: ["1900", "1950", "1999", "2050"],
                datasets: [{
                    label: "Europe",
                    type: "line",
                    borderColor: "#8e5ea2",
                    data: [408, 547, 675, 734],
                    fill: false
                }, {
                    label: "Africa",
                    type: "line",
                    borderColor: "#3e95cd",
                    data: [133, 221, 783, 2478],
                    fill: false
                }, {
                    label: "Europe",
                    type: "bar",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    data: [408, 547, 675, 734],
                }, {
                    label: "Africa",
                    type: "bar",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backgroundColorHover: "#3e95cd",
                    data: [133, 221, 783, 2478]
                }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Population growth (millions): Europe & Africa'
                },
                legend: { display: false }
            }
        });
        ////////////////////////////////////////////
        //Bubble chart
        new Chart(document.getElementById("bubble-chart"), {
            type: 'bubble',
            data: {
                labels: "Africa",
                datasets: [
                    {
                        label: ["China"],
                        backgroundColor: "rgba(255,221,50,0.2)",
                        borderColor: "rgba(255,221,50,1)",
                        data: [{
                            x: 21269017,
                            y: 5.245,
                            r: 15
                        }]
                    }, {
                        label: ["Denmark"],
                        backgroundColor: "rgba(60,186,159,0.2)",
                        borderColor: "rgba(60,186,159,1)",
                        data: [{
                            x: 258702,
                            y: 7.526,
                            r: 10
                        }]
                    }, {
                        label: ["Germany"],
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderColor: "#000",
                        data: [{
                            x: 3979083,
                            y: 6.994,
                            r: 15
                        }]
                    }, {
                        label: ["Japan"],
                        backgroundColor: "rgba(193,46,12,0.2)",
                        borderColor: "rgba(193,46,12,1)",
                        data: [{
                            x: 4931877,
                            y: 5.921,
                            r: 15
                        }]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }, scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Happiness"
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "GDP (PPP)"
                        }
                    }]
                }
            }
        });




    })
    //fetch 통신 실패 시 실행 영역
    .catch(err => {
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });




