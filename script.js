let variables = {
    "dribbling": Math.floor(Math.random() * (25 - 5 + 1)) + 5,
    "shooting": Math.floor(Math.random() * (25 - 5 + 1)) + 5,
    "passing": Math.floor(Math.random() * (25 - 5 + 1)) + 5,
    "defense": Math.floor(Math.random() * (25 - 5 + 1)) + 5,
    "physis": Math.floor(Math.random() * (25 - 5 + 1)) + 5,
    "pace": Math.floor(Math.random() * (25 - 5 + 1)) + 5
};

let skillTrained = {
    "dribbling": false,
    "shooting": false,
    "passing": false,
    "defense": false,
    "physis": false,
    "pace": false
}

let leagueTable = [
    "Manchester City",
    "Manchester United",
    "Liverpool",
    "Chelsea",
    "Arsenal",
    "Tottenham Hotspur",
    "Leicester City",
    "West Ham United",
    "Everton",
    "Leeds United",
    "Aston Villa",
    "Newcastle United",
    "Wolverhampton Wanderers",
    "Crystal Palace",
    "Brighton & Hove Albion",
    "Southampton",
    "Burnley",
    "Fulham",
    "West Bromwich Albion",
    "Sheffield United",
];

let skills = [
    "dribbling",
    "shooting",
    "passing",
    "defense",
    "physis",
    "pace"
];

var age = 18;
let specialTalent = Object.keys(variables)[Math.floor(Math.random() * Object.keys(variables).length)];
console.log("Special Talent:", specialTalent);
variables[specialTalent] += 30;

let playerClub = "Fulham";

let overall = Math.ceil(Object.values(variables).reduce((total, value) => total + value, 0) / Object.keys(variables).length);

ageUpdate();
skillUpdate();

modifyTable(leagueTable, (overall > 80) ? playerClub : undefined);

function ageUpdate() {
    document.getElementById("age").innerHTML = age;
}

function skillUpdate() {
    document.getElementById("dribblingVariable").innerHTML = variables["dribbling"];
    document.getElementById("shootingVariable").innerHTML = variables["shooting"];
    document.getElementById("passingVariable").innerHTML = variables["passing"];
    document.getElementById("defenseVariable").innerHTML = variables["defense"];
    document.getElementById("physisVariable").innerHTML = variables["physis"];
    document.getElementById("paceVariable").innerHTML = variables["pace"];

    document.getElementById("overallVariable").innerHTML = overall;

    document.getElementById("dribblingBar").style.width = variables["dribbling"] * 2 + "px";
    document.getElementById("shootingBar").style.width = variables["shooting"] * 2 + "px";
    document.getElementById("passingBar").style.width = variables["passing"] * 2 + "px";
    document.getElementById("defenseBar").style.width = variables["defense"] * 2 + "px";
    document.getElementById("physisBar").style.width = variables["physis"] * 2 + "px";
    document.getElementById("paceBar").style.width = variables["pace"] * 2 + "px";

    document.getElementById("overallBar").style.width = overall * 2 + "px";
}

function getOlder() {
    age = age + 1;
    ageUpdate();

    for (let key in skillTrained) {//sorgt dafür das die skillTrained liste wieder auf false zurückgesetzt wird
        skillTrained[key] = false;
    }

    var multiplier = 4
    if (age >= 35) {
        multiplier = 40
    }

    for (let key in variables) {
        variables[key] -= Math.floor(Math.random() * multiplier);
        if (variables[key] < 0) {
            variables[key] = 0;
        }
    }

    overall = Math.ceil(Object.values(variables).reduce((total, value) => total + value, 0) / Object.keys(variables).length);


    skillUpdate();

    modifyTable(leagueTable, (overall > 80) ? playerClub : undefined);
}

function trainHTML(){
    var selectedSkill = document.getElementById("attributeDropdown").value;
    train(selectedSkill);
}

function trainAll(){
    for (let i = 0; i < 6; i++){
        train(skills[i]);
    }
}

function train(selectedSkill) {
    if (skillTrained[selectedSkill] == false) {
        var skillImprovement = Math.floor(Math.random() * (15 - 5 + 1)) + 5; //zufällige zahl zwischen 5 und 15 ||zufällige zahl zwischen 3 und 11 = (11-3+1)+3

        variables[selectedSkill] = variables[selectedSkill] + skillImprovement;
        skillTrained[selectedSkill] = true;

        if (variables[selectedSkill] > 100) {
            variables[selectedSkill] = 100;
        }
    }

    overall = Math.ceil(Object.values(variables).reduce((total, value) => total + value, 0) / Object.keys(variables).length);

    skillUpdate();
}

function modifyTable(array, ...args) {
    let moved = new Array(array.length).fill(false);

    for(let i = 0; i < array.length; i++) {
        if(!moved[i]) {
            var move = Math.floor(Math.random() * 5) - 2;
            let newIndex = i + move;

            if(newIndex < 0) newIndex = 0   ; 
            if(newIndex >= array.length) newIndex = array.length - 1;

            if(!moved[newIndex]) {
                let temp = array[i];
                array[i] = array[newIndex];
                array[newIndex] = temp;

                moved[i] = moved[newIndex] = true;
            }
        }
    }

    if (args[0]) {
        let special = args[0];
        const copy = array;
        const oldIndex = array.indexOf(special);
        let newIndex = oldIndex - 2;
        if (newIndex < 0) newIndex = 0;
        copy.splice(newIndex, 0, copy.splice(oldIndex, 1)[0]);
        array = copy;
    }
    console.log(array);
    updateTable();
}

function updateTable(){
    for (let i = 0; i < 20; i++){
        document.getElementById("club" + i.toString()).innerHTML = leagueTable[i];

        if (leagueTable[i] == playerClub){
            document.getElementById("club" + i.toString()).style.backgroundColor = "#add8e6";
            document.getElementById("rank" + i.toString()).style.backgroundColor = "#add8e6";
        } else{
            document.getElementById("club" + i.toString()).style.backgroundColor = "white";
            document.getElementById("rank" + i.toString()).style.backgroundColor = "white";
        }
    }
}

function showPopup(title, text, image){
    document.getElementById('popup').style.visibility = "visible";
    document.getElementById('popup').style.opacity = 1;

    document.getElementById('popupTitle').innerHTML = title;
    document.getElementById('popupText').innerText = text;
    document.getElementById('popupImage').src = image;
}

function hidePopup(){
    document.getElementById('popup').style.visibility = "hidden";
    document.getElementById('popup').style.opacity = 0;
}

showPopup("You won the Premier League!", "Congratulations for your title.", "Trophy.jpeg");