
let courseData = [];

document.addEventListener("DOMContentLoaded", () => {
    init();
}); //Ladda sidan innan kod körs

//funktion för att starta igång koden
function init() {
    getData();
    sortData();
    document.querySelector("#search").addEventListener("input", () => {
        filterData();
    });
}

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
    const table = document.querySelector("#tbody");

    table.innerHTML = ""

    kurser.forEach(kurs => {
        table.innerHTML += `
        <tr>
            <td class="first">${kurs.code}</td>
            <td class="middle">${kurs.coursename}</td>
            <td class="last">${kurs.progression}</td>
        </tr>`;
        
    });
};

let fallande = true;

function sortData() {

    //Sortera kursnamn i bokstavsordning
    let courseNameTitle = document.querySelector("#click-name");
    let courseCodeTitle = document.querySelector("#click-code");
    let courseProgTitle = document.querySelector("#click-prog")

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

        displayData(courseData); //Skriv ut ny sorterad lista
    });

    //Sortera kurskod i bokstavsordning
    courseCodeTitle.addEventListener("click", () => {

        //kontrollerar vilken ordning listan är sorterad i 
        if (fallande) {
            courseData.sort((a, b) =>
                a.code.localeCompare(b.code)
            );

            fallande = !fallande; //Ändrar true till false
        } else {
            courseData.sort((a, b) =>
                b.code.localeCompare(a.code)
            );

            fallande = !fallande; //Ändrar false till true
        }

        displayData(courseData); //Skriv ut ny sorterad lista
    });

    courseProgTitle.addEventListener("click", () => {

        //kontrollerar vilken ordning listan är sorterad i 
        if (fallande) {
            courseData.sort((a, b) =>
                a.progression.localeCompare(b.progression)
            );

            fallande = !fallande; //Ändrar true till false
        } else {
            courseData.sort((a, b) =>
                b.progression.localeCompare(a.progression)
            );

            fallande = !fallande; //Ändrar false till true
        }

        displayData(courseData); //Skriv ut ny sorterad lista
    });
}


function filterData() { //funktion för att filtrera datan

    let searchPhrase = document.querySelector("#search").value; //hämtar sökrutans värde
    
    //tar sökrutans värde och jämför med datan och sorterar ut det som matchar sökvärdet
    let filteredData = courseData.filter((kurs) =>
        kurs.coursename.toLowerCase().includes(searchPhrase) ||
        kurs.code.toLowerCase().includes(searchPhrase)
    );

    displayData(filteredData); //tar den filtrerade datan och skriver ut i tabellen

}


