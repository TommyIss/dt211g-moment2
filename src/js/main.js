"use strict";

// Variabel för att lagra kurser
let courses = [];

// Eventlyssnare vid sidans start/omstart
window.onload = init;

// Funktion vid sidans start/omstart
function init() {

    getCourses();
    
    document.querySelector("#search").addEventListener("input", findCourse);
}

async function getCourses() {
    let url = "https://webbutveckling.miun.se/files/ramschema_ht24.json";

    try { 
        let response = await fetch(url);
        if(!response.ok) {
            throw new Error("Fel vid anslutning till data...");
        }
        courses = await response.json();
        printCourses(courses);
        // console.log(courses);
    }
    catch(error) {
        console.error("Error: ", error)
        document.querySelector("#error").innerHTML = "<p>Fel vid-anslutning - prova igen senare!</p>";
    }

}

function printCourses(data) {
    let coursesTableEl = document.querySelector("#courses-table");
    coursesTableEl.innerHTML = "";

    // Element för tabell-rubrik
    let headerRowEl = document.createElement("tr");
    let codeHeaderEl = document.createElement("th");
    let nameHeaderEl = document.createElement("th");
    let progressHeaderEl = document.createElement("th");

    // Element för tabellrubrik-texter
    let codeText = document.createTextNode("Kurskod");
    let nameText = document.createTextNode("Namn");
    let progressText = document.createTextNode("Progression");

    codeHeaderEl.appendChild(codeText);
    nameHeaderEl.appendChild(nameText);
    progressHeaderEl.appendChild(progressText);

    headerRowEl.appendChild(codeHeaderEl);
    headerRowEl.appendChild(nameHeaderEl);
    headerRowEl.appendChild(progressHeaderEl);

    coursesTableEl.appendChild(headerRowEl);

    // Loopa igenom data
    data.forEach(course => {
        // Element i tabellen
        let tableRowEl = document.createElement("tr");
        let codeDataEL = document.createElement("td");
        let nameDataEL = document.createElement("td");
        let progressDataEL = document.createElement("td");
        
        // Text i element
        let courseCode = document.createTextNode(course.code);
        let courseName = document.createTextNode(course.coursename);
        let progress = document.createTextNode(course.progression);

        // Lägger text i data-element
        codeDataEL.appendChild(courseCode);
        nameDataEL.appendChild(courseName);
        progressDataEL.appendChild(progress);

        // Lägger data-element i tabell-rad
        tableRowEl.appendChild(codeDataEL);
        tableRowEl.appendChild(nameDataEL);
        tableRowEl.appendChild(progressDataEL);

        //Lägger till raden i tabellen
        coursesTableEl.appendChild(tableRowEl);
    });
}

function findCourse() {
    let searchPhrase = document.querySelector("#search").value;

    let filteredData = courses.filter(course => 
        course.code.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        course.coursename.toLowerCase().includes(searchPhrase.toLowerCase())
    );
    printCourses(filteredData);
}