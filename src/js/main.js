
document.addEventListener("DOMContentLoaded", () => {
    init();
}); //Ladda sidan innan kod körs

//funktion för att starta igång koden
function init() {
    getData();
}

//funktion för att hämta data
async function getData() {
    const url = "https://webbutveckling.miun.se/files/ramschema.json";

    try {
        const response = await fetch(url);
        const data = await response.json();

        displayData(data);

    } catch (error) {
        console.error("Felmeddelande: " + error)
    }
}

function displayData(kurser) {
    const tableDataEl = document.querySelector("#tbody");

    kurser.forEach(kurs => {
        tableDataEl.innerHTML += `
            <tr>
                <td class="first">${kurs.code}</td>
                <td class="middle">${kurs.coursename}</td>
                <td class="last">${kurs.progression}</td>
            </tr> 
        `;
    });
};

