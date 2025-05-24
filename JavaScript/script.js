// 1. JavaScript Basics & Setup
console.log("Welcome to the Community Portal");
window.onload = () => alert("Page fully loaded!");

// 2. Syntax, Data Types, and Operators
const eventName = "Art Workshop";
const eventDate = "2025-07-15";
let seatsAvailable = 25;
let eventInfo = `${eventName} is happening on ${eventDate}. Seats left: ${seatsAvailable}`;
console.log(eventInfo);
seatsAvailable--; // One user registered

// 3. Conditionals, Loops, and Error Handling
const events = [
    { name: "Art Workshop", date: "2025-07-15", seats: 5, category: "Art" },
    { name: "Charity Run", date: "2025-05-10", seats: 0, category: "Fitness" },
    { name: "Music Festival", date: "2025-08-01", seats: 100, category: "Music" }
];

function displayValidEvents() {
    events.forEach(event => {
        const isUpcoming = new Date(event.date) > new Date();
        if (isUpcoming && event.seats > 0) {
            console.log(`Upcoming: ${event.name}`);
        }
    });
}
displayValidEvents();

function tryRegister(eventName) {
    try {
        let event = events.find(e => e.name === eventName);
        if (!event || event.seats <= 0) throw new Error("Registration failed.");
        event.seats--;
        console.log(`Registered for ${event.name}. Seats left: ${event.seats}`);
    } catch (e) {
        console.error(e.message);
    }
}
tryRegister("Charity Run");

// 4. Functions, Scope, Closures, Higher-Order Functions
function addEvent(event) {
    events.push(event);
}

function registerUser(eventName) {
    tryRegister(eventName);
}

function filterEventsByCategory(category, callback) {
    const filtered = events.filter(e => e.category === category);
    callback(filtered);
}

const createCategoryTracker = (category) => {
    let total = 0;
    return () => {
        total++;
        console.log(`Registrations in ${category}: ${total}`);
    };
};
const trackArt = createCategoryTracker("Art");
trackArt();

// 5. Objects and Prototypes
function Event(name, date, seats) {
    this.name = name;
    this.date = date;
    this.seats = seats;
}
Event.prototype.checkAvailability = function() {
    return this.seats > 0;
};
const eventObj = new Event("Community Picnic", "2025-07-10", 20);
console.log(Object.entries(eventObj));

// 6. Arrays and Methods
const musicEvents = events.filter(e => e.category === "Music");
const eventCards = events.map(e => `Event: ${e.name}`);
console.log(eventCards);

// 7. DOM Manipulation
const eventSection = document.querySelector("#events");
events.forEach(e => {
    const card = document.createElement("div");
    card.className = "eventCard";
    card.innerHTML = `<h3>${e.name}</h3><p>Date: ${e.date}</p><p>Seats: ${e.seats}</p>`;
    eventSection.appendChild(card);
});

// 8. Event Handling
// Map event types to fees
const eventFees = {
    "Community Picnic": 10,
    "Local Market Day": 5,
    "Kids Sports Day": 15,
    "Art Workshop": 25,
    "Charity Run": 20,
    "Music Festival": 30
};

// Update fee when event type changes
document.getElementById("eventType").addEventListener("change", function () {
    const selected = this.value;
    const fee = eventFees[selected] || "N/A";
    document.getElementById("eventFee").innerText = fee !== "N/A" ? `$${fee}` : "N/A";
});
document.querySelectorAll("input[type='submit']").forEach(btn => {
    btn.onclick = e => {
        e.preventDefault();
        registerUser(document.getElementById("eventType").value);
        document.getElementById("registrationConfirmation").style.display = "block";
        document.getElementById("registrationConfirmation").innerText = "Registration submitted!";
    };
});
document.getElementById("eventType").onchange = function() {
    document.getElementById("eventFee").innerText = "$" + (Math.random() * 100).toFixed(2);
};
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        console.log("Searching for event...");
    }
});



// 9. Async JS, Promises, Async/Await
function fetchEvents() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(events);
        }, 1500);
    });
}
fetchEvents()
    .then(data => console.log("Fetched events:", data))
    .catch(err => console.error(err));

async function loadEvents() {
    const loading = document.createElement("p");
    loading.innerText = "Loading...";
    eventSection.appendChild(loading);
    const data = await fetchEvents();
    loading.remove();
    console.log(data);
}
loadEvents();

// 10. Modern JavaScript Features
const defaultEvent = (name = "Untitled", date = "2025-01-01", seats = 50) => ({ name, date, seats });
const [firstEvent] = events;
const { name, date, seats } = firstEvent;
console.log(name, date, seats);
const clonedEvents = [...events];

// 11. Working with Forms
const form = document.querySelector("form");
form.addEventListener("submit", e => {
    e.preventDefault();
    const { name, email, eventDate, eventType, message } = form.elements;
    if (!name.value || !email.value) {
        alert("Please enter required fields.");
        return;
    }
    document.getElementById("formOutput").innerText = `
        Name: ${name.value}
        Email: ${email.value}
        Date: ${eventDate.value}
        Type: ${eventType.value}
        Message: ${message.value}
    `;
});

// 12. AJAX & Fetch API (simulated)
function postRegistration(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data.name ? resolve("Success!") : reject("Missing name");
        }, 2000);
    });
}
form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = {
        name: form.name.value,
        email: form.email.value,
        event: form.eventType.value
    };
    postRegistration(formData)
        .then(msg => alert(msg))
        .catch(err => alert(err));
});

// 13. Debugging and Testing
console.log("Debug: form submission started");
form.addEventListener("submit", () => {
    console.log("Form data:", {
        name: form.name.value,
        email: form.email.value
    });
});

// 14. jQuery and JS Frameworks
// Only works if jQuery is included in HTML
if (window.jQuery) {
    $('#registerBtn').click(() => alert("jQuery Register Clicked!"));
    $('.eventCard').fadeIn();
    // Benefit of React: Component-based reusability and virtual DOM for performance
}
