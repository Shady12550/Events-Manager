function minDate() {
  let today = new Date().toISOString().split("T")[0];
  let evDate = document.querySelector(".event-date");
  evDate.setAttribute("min", today);
  evDate.addEventListener("input", () => {
    if (evDate.value < today) {
      evDate.value = today;
    }
  });
}
minDate();

function addEvent() {
  let eventDate = document.querySelector(".event-date").value;
  let eventName = document.querySelector(".event-name").value;
  let eventOrganizer = document.querySelector(".event-organizer").value;
  let eventTimeStamp = new Date(eventDate).getTime();
  if (eventDate && eventName && eventOrganizer) {
    let event = {
      date: eventDate,
      name: eventName,
      organizer: eventOrganizer,
      timeStamp: eventTimeStamp,
    };

    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));

    // clear inputs
    const inputs = document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    showEvent();
  } else {
    alert("Please fill all the fields");
  }
}

function showEvent() {
  let events = JSON.parse(localStorage.getItem("events")) || [];
  let list = document.querySelector(".list");
  list.innerHTML = "";
  events.forEach((event, index) => {
    let now = new Date().getTime();
    let timeLeft = event.timeStamp - now;
    //
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    list.innerHTML += `
    <div class="event">
        <h3>${event.name}</h3>
        <p><span>By</span> ${event.organizer}</p>
        <p><span>On</span> ${event.date}</p>
        <p><span>Left Time</span> d${days} h${hours} m${minutes}</p>
        <button onclick = "deleteEvent(${index})">Delete</button>
    </div>
    `;
  });
}
showEvent();

function deleteEvent(index) {
  let events = JSON.parse(localStorage.getItem("events"));
  events.splice(index, 1);
  localStorage.setItem("events", JSON.stringify(events));
  showEvent();
}

setInterval(() => {
  showEvent();
}, 60000);
