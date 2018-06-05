$(() => {

    const urlApi1 = 'https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=alltime&format=json';
    const urlApi2 = 'https://apiv2.bitcoinaverage.com/indices/global/history/ETHUSD?period=alltime&format=json';
    const urlApi3 = 'https://apiv2.bitcoinaverage.com/indices/global/history/LTCUSD?period=alltime&format=json';
    let a = 0;


    let btcVisible = [];
    let ethVisible = [];
    let ltcVisible = [];
    let dateVisible = [];
    let arrTimeB = [];
    let arrAverageB = [];
    let arrAverageE = [];
    let arrAverageL = [];
    let arrTimeBtc = [];

    let dataFilling = function (res, newArr) {
        console.log("działa");
        for (let i = 0; i < res.length - 1; i++) {

            let curr = res[i];
            let next = res[i + 1];

            let date = new Date(curr.time);
            let endDate = new Date(next.time);

            date = date.setDate(date.getDate() + 1);
            endDate = endDate.setDate(endDate.getDate());

            if (date === endDate) {
                newArr.push(curr);
            }


            else if (date !== endDate) {

                function fillDates(start, end) {
                    let output = [];

                    do {
                        output.push({
                            "time": start.toISOString().substring(0, 10),
                            "average": undefined
                        });
                        start.setDate(start.getDate() + 1);

                    } while (start <= end);

                    for (let i = 0; i < output.length; i++) {
                        newArr.push(output[i]);
                    }
                }

                let start = new Date(date);
                let end = new Date(endDate);
                fillDates(start, end);
            }

        }
        newArr.push(res[res.length - 1]);

    };

    $.ajax({
        url: urlApi1
    }).done(function (res) {

        res = res.reverse();
        let newArr = [];
        for (let i = 0; i < res.length; i++) {
            arrTimeBtc.push(res[i].time);
        }
        let index = arrTimeBtc.indexOf("2016-03-07 00:00:00");
        res.splice(0, index);

        dataFilling(res, newArr);

        for (let i = 0; i < newArr.length; i++) {
            arrTimeB.push(newArr[i].time.substring(0, 10));
            arrAverageB.push(newArr[i].average);
        }

    }).fail(function () {
        console.log('fail');
    });
    $.ajax({
        url: urlApi2
    }).done(function (res) {
        res = res.reverse();

        let newArr = [];
        dataFilling(res, newArr);

        for (let i = 0; i < newArr.length; i++) {
            arrAverageE.push(newArr[i].average);
        }
    }).fail(function () {
        console.log('fail');
    });
    $.ajax({
        url: urlApi3
    }).done(function (res) {

        res = res.reverse();
        let newArr = [];
        dataFilling(res, newArr);
        for (let i = 0; i < newArr.length; i++) {
            arrAverageL.push(newArr[i].average);
        }

    }).fail(function () {
        console.log('fail');
    });

    btcVisible = arrAverageB;
    ethVisible = arrAverageE;
    ltcVisible = arrAverageL;
    dateVisible = arrTimeB;

    let data = {
        labels: dateVisible,
        datasets: [{
            label: "BTCUSD",
            //linia
            //borderDash: [3, 3], //jezeli ustawione to przerywana linia
            borderColor: 'rgba(236,115,87, 0.7)',
            pointBorderColor: 'rgba(236,115,87, 0.7)',
            borderWidth: 2,
            //kolor tla i legendy
            fill: true, //czy wypelnic zbior
            backgroundColor: 'rgba(236,115,87, 0.1)', //wplywa tez na kolor w legendzie
            //ustawienia punktu
            pointRadius: 4,
            pointBorderWidth: 1,
            pointBackgroundColor: 'rgba(255,255,255,1)',
            //ustawienia punktu hover
            pointHoverRadius: 4,
            pointHoverBorderWidth: 3,
            pointHoverBackgroundColor: 'rgba(255,255,255,1)',
            pointHoverBorderColor: 'rgba(236,115,87, 1)',
            data: btcVisible,
        },
            {
                label: "ETHUSD",
                borderColor: 'rgba(75,192,192, 0.7)',
                pointBorderColor: 'rgba(75,192,87, 0.7)',
                borderWidth: 2,
                //kolor tla i legendy
                fill: true, //czy wypelnic zbior
                backgroundColor: 'rgba(75,192,87, 0.1)', //wplywa tez na kolor w legendzie
                //ustawienia punktu
                pointRadius: 4,
                pointBorderWidth: 1,
                pointBackgroundColor: 'rgba(255,255,255,1)',
                //ustawienia punktu hover
                pointHoverRadius: 4,
                pointHoverBorderWidth: 3,
                pointHoverBackgroundColor: 'rgba(255,255,255,1)',
                pointHoverBorderColor: 'rgba(236,115,87, 1)',

                data: ethVisible,
            },
            {
                label: "LTCUSD",
                borderColor: 'rgba(132,77,237, 0.7)',
                pointBorderColor: 'rgba(132,115,237, 0.7)',
                borderWidth: 2,
                //kolor tla i legendy
                fill: true, //czy wypelnic zbior
                backgroundColor: 'rgba(132,77,237, 0.1)', //wplywa tez na kolor w legendzie
                //ustawienia punktu
                pointRadius: 4,
                pointBorderWidth: 1,
                pointBackgroundColor: 'rgba(255,255,255,1)',
                //ustawienia punktu hover
                pointHoverRadius: 4,
                pointHoverBorderWidth: 3,
                pointHoverBackgroundColor: 'rgba(255,255,255,1)',
                pointHoverBorderColor: 'rgba(236,115,87, 1)',

                data: ltcVisible,
            }
        ]
    };

    let options = {
        scales: {
            xAxes: [{ //linie x
                gridLines: {
                    zeroLineWidth: 1, //linia x=0
                    zeroLineColor: 'rgba(0,0,0,0.3)', //kolor lini x=0
                    color: "rgba(0, 0, 0, 0.05)", //kolor linii
                    lineWidth: 1 //szerokośc linii
                },
                display: true, //czy pokazywac dolne opisy jednostek
                scaleLabel: { //tytuł osi x
                    display: true,
                    labelString: 'Date',
                    fontSize: 12,
                    fontStyle: 'bold'
                },
                ticks: { //rozmiar jednostek
                    fontSize: 10
                }
            }],
            yAxes: [{
                type: 'logarithmic',
                ticks: {
                    min: 0,
                    suggestedMax: 20000,
                    callback: function(tick, index, ticks) {
                        return tick.toLocaleString();
                    }
                }
            }]
        }
    };
    console.log(arrAverageL,arrTimeB,arrAverageE,arrAverageL);


    function updateChart(chart) {
        chart.data.labels = dateVisible;
        chart.data.datasets[0].data = btcVisible;
        chart.data.datasets[1].data = ethVisible;
        chart.data.datasets[2].data = ltcVisible;
        chart.update();
    }
    function setRange (a, z) {
        btcVisible = arrAverageB.slice(a, z);
        ethVisible = arrAverageE.slice(a, z);
        ltcVisible = arrAverageL.slice(a, z);
        dateVisible = arrTimeB.slice(a, z);
        return (btcVisible, ethVisible, ltcVisible, dateVisible);
    }
    $('.start').on('click', function () {

        let ctx = document.getElementById("myChart").getContext("2d");

        let myLineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });




        let z = arrTimeB.length;
        $('.plus').on('click', function () {

            if (z-a>=100) {
                a = a + 50;
                z = z - 50;
            }
            setRange(a, z);
            console.log(a, z);
            updateChart(myLineChart);

        })
        $('.plus-small').on('click', function () {

            if (z-a>=10) {
                a = a + 3;
                z = z - 3;
            }
            setRange(a, z);
            console.log(a, z);
            updateChart(myLineChart);

        })
        $('.minus').on('click', function () {


            if (a >= 50) {
                a = a - 50
            }
            if (z <= (arrTimeB.length - 50)) {
                z = z + 50
            }

            //let z = arrTimeB.length-count*50;
            console.log(a, z);
            setRange(a, z);
            updateChart(myLineChart);
        });
        $('.minus-small').on('click', function () {


            if (a >= 3) {
                a = a - 3
            }
            if (z <= (arrTimeB.length - 3)) {
                z = z + 3
            }

            //let z = arrTimeB.length-count*50;
            console.log(a, z);
            setRange(a, z);
            updateChart(myLineChart);
        });
        $('.right').on('click', function () {

            if(z<=arrTimeB.length-50){
                a=a+50;
                z=z+50
            }
            console.log(a, z);
            setRange(a, z);
            updateChart(myLineChart);
        })
        $('.right-small').on('click', function () {

            if(z<=arrTimeB.length-3){
                a=a+3;
                z=z+3
            }else{
                z=arrTimeB.length;
                
            }
            console.log(a, z);
            setRange(a, z);
            updateChart(myLineChart);
        })
        $('.left').on('click', function () {

            if(a>=50){
                a=a-50;
                z=z-50;
            }
            console.log(a, z);
            setRange(a, z);
            updateChart(myLineChart);
        })
        $('.left-small').on('click', function () {

            if(a>=3){
                a=a-3;
                z=z-3;
            }else{
                a=0;
                
            }
            console.log(a, z);
            setRange(a, z);
            updateChart(myLineChart);
        })


    })

})
