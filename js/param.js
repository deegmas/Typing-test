let fs = require('fs');
let os = require('os');

// pour modifier le thème de l'application via un bouton
// reset les stats avec modal de confirmation (reset le localstorage et le fichier)
function changeTheme() {
    var checkbox = document.getElementById("theme");

    // mettre un switch
    if (checkbox.checked == true) {
        console.log("true");
        // changer theme en white
        document.body.style.backgroundColor = 'white';
        // ... non fini
    }
    else {
        console.log("false");
        // theme en black
        document.body.style.backgroundColor = 'black';
    }
}
function clearStat() {
    var home = os.homedir();
    var dir = home + "/typingtest";
    var filename = dir + "/stat.txt";
    if (fs.existsSync(dir)) {
        if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
            localStorage.removeItem("monLabel");
        }
    }
}