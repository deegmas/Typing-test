let fs = require('fs');
let os = require('os');

// init theme 
(function () {
    if (localStorage.getItem('theme') === 'theme-blanc') {
        document.documentElement.className = "theme-blanc";
    } else {
        document.documentElement.className = "theme-noir";
    }
})();

// stockage des données 
var mpm = 0;
var date = "";
var result;
var res = [];
var monMpm;

// lecture du fichier
var home = os.homedir();
var dir = home + "/typingtest";
var filename = dir + "/stat.txt";
if (fs.existsSync(dir)) {
    if (fs.existsSync(filename)) {
        fs.readFile(filename, "utf-8", (err, data) => {
            if (!err) {
                var donnees = data.trim();
                result = donnees.split('\n');

                // revue de code necessaire
                for (i=0; i < result.length; i++) {
                    if (i == result.length-1) {
                        date += result[i].split(',')[0];
                    }
                    else {
                        date += result[i].split(',')[0] + ",";
                    }
                }
                
                for (j=0; j < result.length; j++) {
                    if (j == result.length -1) {
                        monMpm += result[j].split(',')[1];
                    }
                    else {
                        monMpm += result[j].split(',')[1] + ",";
                    }
                }

                localStorage.setItem("monLabel", date);
                localStorage.setItem("mesDatas", monMpm);
            }
            else {
                console.log(err);
            }
        });
    }
    else {
        alert('aucun fichier trouvé'); // a supprimer  (test)
    }
}
else {
    alert('aucun dossier typingtest trouvé'); // a supprimer (test)
}

//console.log(localStorage.getItem("monLabel"));
var montest = localStorage.getItem("monLabel");

var timeFormat = 'DD/MM/YYYY HH:mm';

var testSplit = montest.split(',');

var blabla = localStorage.getItem('mesDatas');

var testSplitMpm = blabla.split(',');


// affichage de la courbe
var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'MPM',
            backgroundColor: 'rgb(255,99,132)',
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
            data: [],
        }]
    },

    options: {
        title: {
            text: 'Statistiques'
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    parser: timeFormat,
                    tooltipFormat: 'll HH:mm'
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
               }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'mpm'
                }
             }]
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,

                    mode: 'xy'
                },

                zoom: {
                    enabled: true,

                    mode: 'xy',
                }
            }
        }
    }
};

var ctx = document.getElementById('myChart').getContext('2d');
var myLineChart = new Chart(ctx, config);

for (i=0; i < testSplit.length; i++) {
    config.data.labels.push(testSplit[i]);
}
myLineChart.update();

// ajouter un mpm
for (j=0; j < testSplitMpm.length; j++) {
    config.data.datasets[0].data.push(testSplitMpm[j]);
}
myLineChart.update();