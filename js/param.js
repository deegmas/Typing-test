let fs = require('fs');
let os = require('os');

// init theme 
(function () {
    if (localStorage.getItem('theme') === 'theme-blanc') {
        document.documentElement.className = "theme-blanc";
        document.getElementById("theme").checked = true;
    }
    else {
        document.documentElement.className = "theme-noir";
    }
})();

/**
 * function permettant de changer de thème
 */
function changeTheme() {

    var checkbox = document.getElementById('theme');

    if (checkbox.checked == true) {
        localStorage.setItem("theme", "theme-blanc");
        document.documentElement.className = "theme-blanc";
    }
    else {
        localStorage.setItem("theme", "theme-noir");
        document.documentElement.className = "theme-noir";
    }
}

/**
 * function permettant de reset les stats enregistrées
 */
function clearStat() {
    if(confirm("voulez-vous vraiment remettre à zéro vos statistiques ?")) {
        var home = os.homedir();
        var dir = home + "/typingtest";
        var filename = dir + "/stat.txt";
        if (fs.existsSync(dir)) {
            if (fs.existsSync(filename)) {
                fs.unlinkSync(filename);
                localStorage.removeItem("monLabel");
                localStorage.removeItem("mesDatas");
            }
        }
    }
}