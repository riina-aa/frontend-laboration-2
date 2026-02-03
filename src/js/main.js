
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

    tableCourseName.innerHTML = ""; 

    kurser.forEach(kurs => {
        tableCourseName.innerHTML += `<li>${kurs.coursename}</li>`;
    });
};

function sortData() {

    //Sortera kursnamn i bokstavsordning
    let courseNameTitle = document.querySelector("#click-name");

    courseNameTitle.addEventListener("click", () => {
        courseData.sort((a, b) =>
            a.coursename.localeCompare(b.coursename)
        );
        
        displayData(courseData);
    });
};
