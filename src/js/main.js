
document.addEventListener("DOMContentLoaded", () => {
    init();
}); //Ladda sidan innan kod körs

//funktion för att starta igång koden
function init() {
    getData();
    sortData();
}

let courseData = [];


//funktion för att hämta data
async function getData() {
    const url = "https://webbutveckling.miun.se/files/ramschema.json";

    try {
        const response = await fetch(url);
        courseData = await response.json();

        displayData(courseData);

    } catch (error) {
        console.error("Felmeddelande: " + error)
    }
}

function displayData(kurser) {
    const tableCourseCode = document.querySelector("#kurskod");
    const tableCourseName = document.querySelector("#kursnamn");
    const tableCourseProg = document.querySelector("#progression");

    tableCourseCode.innerHTML = ""
    tableCourseName.innerHTML = "";
    tableCourseProg.innerHTML = "";;

    kurser.forEach(kurs => {
        tableCourseCode.innerHTML += `<li>${kurs.code}</li>`;
        tableCourseName.innerHTML += `<li>${kurs.coursename}</li>`;
        tableCourseProg.innerHTML += `<li>${kurs.progression}</li>`;
    });
};

let fallande = true;

function sortData() {

    //Sortera kursnamn i bokstavsordning
    let courseNameTitle = document.querySelector("#click-name");
    let courseCodeTitle = document.querySelector("#click-code")

    courseNameTitle.addEventListener("click", () => {

        if (fallande) {
            courseData.sort((a, b) =>
                a.coursename.localeCompare(b.coursename)
            );

            fallande = !fallande;
        } else {
            courseData.sort((a, b) =>
                b.coursename.localeCompare(a.coursename)
            );

            fallande = !fallande;
        }

        displayData(courseData);
    });

    courseCodeTitle.addEventListener("click", () => {

        if (fallande) {
            courseData.sort((a, b) =>
                a.code.localeCompare(b.code)
            );

            fallande = !fallande;
        } else {
            courseData.sort((a, b) =>
                b.code.localeCompare(a.code)
            );

            fallande = !fallande;
        }

        displayData(courseData);
    });
};



