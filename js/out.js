/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n$(function () {\n\n    var urlApi1 = 'https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=alltime&format=json';\n    var urlApi2 = 'https://apiv2.bitcoinaverage.com/indices/global/history/ETHUSD?period=alltime&format=json';\n    var urlApi3 = 'https://apiv2.bitcoinaverage.com/indices/global/history/LTCUSD?period=alltime&format=json';\n    var a = 0;\n\n    var btcVisible = [];\n    var ethVisible = [];\n    var ltcVisible = [];\n    var dateVisible = [];\n    var arrTimeB = [];\n    var arrAverageB = [];\n    var arrAverageE = [];\n    var arrAverageL = [];\n    var arrTimeBtc = [];\n\n    var dataFilling = function dataFilling(res, newArr) {\n        console.log(\"działa\");\n        for (var i = 0; i < res.length - 1; i++) {\n\n            var curr = res[i];\n            var next = res[i + 1];\n\n            var date = new Date(curr.time);\n            var endDate = new Date(next.time);\n\n            date = date.setDate(date.getDate() + 1);\n            endDate = endDate.setDate(endDate.getDate());\n\n            if (date === endDate) {\n                newArr.push(curr);\n            } else if (date !== endDate) {\n                var fillDates = function fillDates(start, end) {\n                    var output = [];\n\n                    do {\n                        output.push({\n                            \"time\": start.toISOString().substring(0, 10),\n                            \"average\": undefined\n                        });\n                        start.setDate(start.getDate() + 1);\n                    } while (start <= end);\n\n                    for (var _i = 0; _i < output.length; _i++) {\n                        newArr.push(output[_i]);\n                    }\n                };\n\n                var start = new Date(date);\n                var end = new Date(endDate);\n                fillDates(start, end);\n            }\n        }\n        newArr.push(res[res.length - 1]);\n    };\n\n    $.ajax({\n        url: urlApi1\n    }).done(function (res) {\n\n        res = res.reverse();\n        var newArr = [];\n        for (var i = 0; i < res.length; i++) {\n            arrTimeBtc.push(res[i].time);\n        }\n        var index = arrTimeBtc.indexOf(\"2016-03-07 00:00:00\");\n        res.splice(0, index);\n\n        dataFilling(res, newArr);\n\n        for (var _i2 = 0; _i2 < newArr.length; _i2++) {\n            arrTimeB.push(newArr[_i2].time.substring(0, 10));\n            arrAverageB.push(newArr[_i2].average);\n        }\n    }).fail(function () {\n        console.log('fail');\n    });\n    $.ajax({\n        url: urlApi2\n    }).done(function (res) {\n        res = res.reverse();\n\n        var newArr = [];\n        dataFilling(res, newArr);\n\n        for (var i = 0; i < newArr.length; i++) {\n            arrAverageE.push(newArr[i].average);\n        }\n    }).fail(function () {\n        console.log('fail');\n    });\n    $.ajax({\n        url: urlApi3\n    }).done(function (res) {\n\n        res = res.reverse();\n        var newArr = [];\n        dataFilling(res, newArr);\n        for (var i = 0; i < newArr.length; i++) {\n            arrAverageL.push(newArr[i].average);\n        }\n    }).fail(function () {\n        console.log('fail');\n    });\n\n    btcVisible = arrAverageB;\n    ethVisible = arrAverageE;\n    ltcVisible = arrAverageL;\n    dateVisible = arrTimeB;\n\n    var data = {\n        labels: dateVisible,\n        datasets: [{\n            label: \"BTCUSD\",\n            //linia\n            //borderDash: [3, 3], //jezeli ustawione to przerywana linia\n            borderColor: 'rgba(236,115,87, 0.7)',\n            pointBorderColor: 'rgba(236,115,87, 0.7)',\n            borderWidth: 2,\n            //kolor tla i legendy\n            fill: true, //czy wypelnic zbior\n            backgroundColor: 'rgba(236,115,87, 0.1)', //wplywa tez na kolor w legendzie\n            //ustawienia punktu\n            pointRadius: 4,\n            pointBorderWidth: 1,\n            pointBackgroundColor: 'rgba(255,255,255,1)',\n            //ustawienia punktu hover\n            pointHoverRadius: 4,\n            pointHoverBorderWidth: 3,\n            pointHoverBackgroundColor: 'rgba(255,255,255,1)',\n            pointHoverBorderColor: 'rgba(236,115,87, 1)',\n            data: btcVisible\n        }, {\n            label: \"ETHUSD\",\n            borderColor: 'rgba(75,192,192, 0.7)',\n            pointBorderColor: 'rgba(75,115,87, 0.7)',\n            borderWidth: 2,\n            //kolor tla i legendy\n            fill: true, //czy wypelnic zbior\n            backgroundColor: 'rgba(236,115,87, 0.1)', //wplywa tez na kolor w legendzie\n            //ustawienia punktu\n            pointRadius: 4,\n            pointBorderWidth: 1,\n            pointBackgroundColor: 'rgba(255,255,255,1)',\n            //ustawienia punktu hover\n            pointHoverRadius: 4,\n            pointHoverBorderWidth: 3,\n            pointHoverBackgroundColor: 'rgba(255,255,255,1)',\n            pointHoverBorderColor: 'rgba(236,115,87, 1)',\n\n            data: ethVisible\n        }, {\n            label: \"LTCUSD\",\n            borderColor: 'rgba(132,177,237, 0.7)',\n            pointBorderColor: 'rgba(132,115,87, 0.7)',\n            borderWidth: 2,\n            //kolor tla i legendy\n            fill: true, //czy wypelnic zbior\n            backgroundColor: 'rgba(236,115,87, 0.1)', //wplywa tez na kolor w legendzie\n            //ustawienia punktu\n            pointRadius: 4,\n            pointBorderWidth: 1,\n            pointBackgroundColor: 'rgba(255,255,255,1)',\n            //ustawienia punktu hover\n            pointHoverRadius: 4,\n            pointHoverBorderWidth: 3,\n            pointHoverBackgroundColor: 'rgba(255,255,255,1)',\n            pointHoverBorderColor: 'rgba(236,115,87, 1)',\n\n            data: ltcVisible\n        }]\n    };\n\n    var options = {\n        scales: {\n            xAxes: [{ //linie x\n                gridLines: {\n                    zeroLineWidth: 1, //linia x=0\n                    zeroLineColor: 'rgba(0,0,0,0.3)', //kolor lini x=0\n                    color: \"rgba(0, 0, 0, 0.05)\", //kolor linii\n                    lineWidth: 1 //szerokośc linii\n                },\n                display: true, //czy pokazywac dolne opisy jednostek\n                scaleLabel: { //tytuł osi x\n                    display: true,\n                    labelString: 'Date',\n                    fontSize: 12,\n                    fontStyle: 'bold'\n                },\n                ticks: { //rozmiar jednostek\n                    fontSize: 10\n                }\n            }],\n            yAxes: [{\n                type: 'logarithmic',\n                ticks: {\n                    min: 0,\n                    suggestedMax: 20000,\n                    callback: function callback(tick, index, ticks) {\n                        return tick.toLocaleString();\n                    }\n                }\n            }]\n        }\n    };\n    console.log(arrAverageL, arrTimeB, arrAverageE, arrAverageL);\n\n    function updateChart(chart) {\n        chart.data.labels = dateVisible;\n        chart.data.datasets[0].data = btcVisible;\n        chart.data.datasets[1].data = ethVisible;\n        chart.data.datasets[2].data = ltcVisible;\n        chart.update();\n    }\n    function setRange(a, z) {\n        btcVisible = arrAverageB.slice(a, z);\n        ethVisible = arrAverageE.slice(a, z);\n        ltcVisible = arrAverageL.slice(a, z);\n        dateVisible = arrTimeB.slice(a, z);\n        return btcVisible, ethVisible, ltcVisible, dateVisible;\n    }\n    $('.start').on('click', function () {\n\n        var ctx = document.getElementById(\"myChart\").getContext(\"2d\");\n\n        var myLineChart = new Chart(ctx, {\n            type: 'line',\n            data: data,\n            options: options\n        });\n\n        var z = arrTimeB.length;\n        $('.plus').on('click', function () {\n\n            if (z - a >= 100) {\n                a = a + 50;\n                z = z - 50;\n            }\n            setRange(a, z);\n            console.log(a, z);\n            updateChart(myLineChart);\n        });\n        $('.plus-small').on('click', function () {\n\n            if (z - a >= 10) {\n                a = a + 3;\n                z = z - 3;\n            }\n            setRange(a, z);\n            console.log(a, z);\n            updateChart(myLineChart);\n        });\n        $('.minus').on('click', function () {\n\n            if (a >= 50) {\n                a = a - 50;\n            }\n            if (z <= arrTimeB.length - 50) {\n                z = z + 50;\n            }\n\n            //let z = arrTimeB.length-count*50;\n            console.log(a, z);\n            setRange(a, z);\n            updateChart(myLineChart);\n        });\n        $('.minus-small').on('click', function () {\n\n            if (a >= 3) {\n                a = a - 3;\n            }\n            if (z <= arrTimeB.length - 3) {\n                z = z + 3;\n            }\n\n            //let z = arrTimeB.length-count*50;\n            console.log(a, z);\n            setRange(a, z);\n            updateChart(myLineChart);\n        });\n        $('.right').on('click', function () {\n\n            if (z <= arrTimeB.length - 50) {\n                a = a + 50;\n                z = z + 50;\n            }\n            console.log(a, z);\n            setRange(a, z);\n            updateChart(myLineChart);\n        });\n        $('.right-small').on('click', function () {\n\n            if (z <= arrTimeB.length - 3) {\n                a = a + 3;\n                z = z + 3;\n            } else {\n                z = arrTimeB.length;\n            }\n            console.log(a, z);\n            setRange(a, z);\n            updateChart(myLineChart);\n        });\n        $('.left').on('click', function () {\n\n            if (a >= 50) {\n                a = a - 50;\n                z = z - 50;\n            }\n            console.log(a, z);\n            setRange(a, z);\n            updateChart(myLineChart);\n        });\n        $('.left-small').on('click', function () {\n\n            if (a >= 3) {\n                a = a - 3;\n                z = z - 3;\n            } else {\n                a = 0;\n            }\n            console.log(a, z);\n            setRange(a, z);\n            updateChart(myLineChart);\n        });\n    });\n});\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./js/app.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /home/krzysztof/Pulpit/repozytoria/cryptocurrencies-comparison/js/app.js */\"./js/app.js\");\n\n\n//# sourceURL=webpack:///multi_./js/app.js?");

/***/ })

/******/ });