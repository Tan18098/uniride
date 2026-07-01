const locations = [
  "UniMAP Pauh Putra Main Campus",
  "Tuanku Syed Library",
  "UniCITI Alam Hostel",
  "Kangar City Campus",
  "Arau Engineering Faculty",
  "Kuala Perlis Campus",
  "KTM Arau Train Station",
  "Main Gate",
  "Student Center",
  "C-Mart Arau",
];

const i18n = {
  en: {
    appName: "UniRide Campus",
    intro:
      "Safe, affordable campus rides for verified UniMAP students and staff.",
    getStarted: "Get Started",
    demoLogin: "Demo Login",
    back: "Back",
    verifyTitle: "Account Verification",
    verifyDesc: "Use a valid 9-digit UniMAP student ID or student email.",
    fullName: "Full Name",
    gender: "Gender",
    phone: "Malaysia Phone",
    studentId: "Student ID or Email",
    oku: "Register as OKU special care member",
    secureLogin: "Secure Login",
    findDrivers: "Find Drivers",
    findPassengers: "Find Passengers",
    whereTo: "Where are you heading today?",
    postJourney: "Post Journey",
    postDesc: "Offer seats or request a ride around campus.",
    postingAs: "I am posting as",
    driverVerify: "Driver Verification",
    departure: "Departure",
    destination: "Destination",
    pickup: "Pickup Landmark",
    departTime: "Departure Time",
    fare: "Calculated Fare",
    seats: "Seats",
    publish: "Publish Journey",
    rideStatus: "Ride Status",
    statusDesc: "Track your confirmed campus ride.",
    history: "Ride History",
    historyDesc: "Your recent campus trips.",
    logout: "Logout",
    confirmBooking: "Confirm Booking",
  },
  zh: {
    appName: "UniRide Campus",
    intro:
      "\u4e3a\u5df2\u8ba4\u8bc1 UniMAP \u5b66\u751f\u548c\u804c\u5458\u63d0\u4f9b\u5b89\u5168\u3001\u5b9e\u60e0\u7684\u6821\u56ed\u51fa\u884c\u3002",
    getStarted: "\u5f00\u59cb\u4f7f\u7528",
    demoLogin: "\u6f14\u793a\u767b\u5f55",
    back: "\u8fd4\u56de",
    verifyTitle: "\u8d26\u53f7\u9a8c\u8bc1",
    verifyDesc:
      "\u8bf7\u8f93\u5165\u6709\u6548\u7684 9 \u4f4d UniMAP \u5b66\u53f7\u6216\u5b66\u751f\u90ae\u7bb1\u3002",
    fullName: "\u5168\u540d",
    gender: "\u6027\u522b",
    phone: "\u9a6c\u6765\u897f\u4e9a\u624b\u673a\u53f7",
    studentId: "\u5b66\u53f7\u6216\u90ae\u7bb1",
    oku: "\u6ce8\u518c\u4e3a OKU \u7279\u522b\u5173\u6000\u4f1a\u5458",
    secureLogin: "\u5b89\u5168\u767b\u5f55",
    findDrivers: "\u627e\u53f8\u673a",
    findPassengers: "\u627e\u4e58\u5ba2",
    whereTo: "\u4eca\u5929\u8981\u53bb\u54ea\u91cc\uff1f",
    postJourney: "\u53d1\u5e03\u884c\u7a0b",
    postDesc:
      "\u53d1\u5e03\u8f66\u4f4d\u6216\u6821\u56ed\u642d\u8f66\u9700\u6c42\u3002",
    postingAs: "\u53d1\u5e03\u8eab\u4efd",
    driverVerify: "\u53f8\u673a\u8ba4\u8bc1",
    departure: "\u51fa\u53d1\u5730",
    destination: "\u76ee\u7684\u5730",
    pickup: "\u4e0a\u8f66\u5730\u6807",
    departTime: "\u51fa\u53d1\u65f6\u95f4",
    fare: "\u9884\u4f30\u8f66\u8d39",
    seats: "\u5ea7\u4f4d",
    publish: "\u53d1\u5e03\u884c\u7a0b",
    rideStatus: "\u884c\u7a0b\u72b6\u6001",
    statusDesc:
      "\u67e5\u770b\u5df2\u786e\u8ba4\u7684\u6821\u56ed\u884c\u7a0b\u3002",
    history: "\u884c\u7a0b\u8bb0\u5f55",
    historyDesc: "\u4f60\u6700\u8fd1\u7684\u6821\u56ed\u884c\u7a0b\u3002",
    logout: "\u9000\u51fa\u767b\u5f55",
    confirmBooking: "\u786e\u8ba4\u9884\u8ba2",
  },
};

let lang = localStorage.getItem("uniride_lang") || "en";
let currentFeed = "offer";
let generatedOtp = "";
let pendingUser = null;
let pendingRideId = null;
let points = Number(localStorage.getItem("uniride_points") || 300);

const rewardLevels = [
  { name: "Bronze Rider", min: 0, next: 500 },
  { name: "Silver Rider", min: 500, next: 1000 },
  { name: "Gold Rider", min: 1000, next: 1800 },
  { name: "Campus Hero", min: 1800, next: null },
];

const rewardCatalog = [
  {
    title: "RM 2 Ride Voucher",
    cost: 300,
    desc: "Use on your next confirmed campus ride.",
  },
  {
    title: "Priority Match",
    cost: 450,
    desc: "Highlight your next ride request for faster matching.",
  },
  {
    title: "Free Peak Fee",
    cost: 650,
    desc: "Waive one RM 2 peak-hour add-on.",
  },
  {
    title: "Care Ride Badge",
    cost: 800,
    desc: "Show a trusted helper badge for OKU-friendly rides.",
  },
];

const defaultRides = [
  {
    id: 1,
    type: "offer",
    name: "Daniel Tan",
    gender: "Male",
    phone: "60123456789",
    from: "UniMAP Pauh Putra Main Campus",
    to: "KTM Arau Train Station",
    pickup: "Beside library fountain",
    time: "2026-07-02T08:30",
    seats: 3,
    fare: "RM 12",
    rating: "4.9",
    plate: "PBA 1234",
    model: "Perodua Myvi",
    femaleOnly: false,
  },
  {
    id: 2,
    type: "offer",
    name: "Nur Aina",
    gender: "Female",
    phone: "60198765432",
    from: "UniCITI Alam Hostel",
    to: "Kangar City Campus",
    pickup: "Block A bus stop",
    time: "2026-07-02T14:15",
    seats: 2,
    fare: "RM 17",
    rating: "5.0",
    plate: "RAN 8821",
    model: "Proton Saga",
    femaleOnly: true,
  },
  {
    id: 3,
    type: "request",
    name: "Alex Lim",
    gender: "Male",
    phone: "60111223344",
    from: "Arau Engineering Faculty",
    to: "Main Gate",
    pickup: "Faculty foyer",
    time: "2026-07-03T10:00",
    seats: 1,
    fare: "RM 6",
    rating: "4.8",
    plate: "-",
    model: "-",
    femaleOnly: false,
  },
];

function getRides() {
  const saved = safeParse("uniride_rides_v2", null);
  if (Array.isArray(saved)) return saved;
  localStorage.setItem("uniride_rides_v2", JSON.stringify(defaultRides));
  return [...defaultRides];
}

function saveRides(rides) {
  localStorage.setItem("uniride_rides_v2", JSON.stringify(rides));
}

function currentUser() {
  return safeParse("uniride_user", null);
}

function bookings() {
  const saved = safeParse("uniride_bookings", []);
  return Array.isArray(saved) ? saved : [];
}

function saveBookings(items) {
  localStorage.setItem("uniride_bookings", JSON.stringify(items));
}

function safeParse(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function showView(id) {
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document
    .getElementById("bottomNav")
    .classList.toggle("show", id === "appView");
}

function showPage(id) {
  document
    .querySelectorAll(".app-page")
    .forEach((p) => (p.style.display = "none"));
  document.getElementById(id).style.display = "block";

  document
    .querySelectorAll(".nav button")
    .forEach((b) => b.classList.remove("active"));

  const map = {
    homePage: "navHome",
    postPage: "navPost",
    statusPage: "navStatus",
    historyPage: "navHistory",
    profilePage: "navProfile",
  };

  document.getElementById(map[id]).classList.add("active");

  if (id === "homePage") renderRides();
  if (id === "statusPage") renderStatus();
  if (id === "historyPage") renderHistory();
  if (id === "profilePage") renderProfile();
}

function toggleLang() {
  lang = lang === "en" ? "zh" : "en";
  localStorage.setItem("uniride_lang", lang);
  applyLang();
}

function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerText = i18n[lang][el.dataset.i18n] || el.innerText;
  });

  document.getElementById("langBtn").innerText =
    lang === "en" ? "\u4e2d\u6587" : "EN";
  document.getElementById("langBtnApp").innerText =
    lang === "en" ? "\u4e2d\u6587" : "EN";
}

function requestOtp(event) {
  event.preventDefault();

  const name = value("nameInput");
  const phone = value("phoneInput");
  const gender = value("genderInput");
  const credential = value("credentialInput").toLowerCase();
  const error = document.getElementById("loginError");

  error.classList.remove("show");

  if (!/^60\d{8,10}$/.test(phone)) {
    return showError(
      error,
      "Phone must use Malaysia format, for example 60123456789.",
    );
  }

  const rawId = /^\d{9}$/;
  const sId = /^s\d{9}$/;
  const studentMail = /^s\d{9}@studentmail\.unimap\.edu\.my$/;

  let idDigits = "";
  let email = "";

  if (rawId.test(credential)) {
    idDigits = credential;
    email = "s" + credential + "@studentmail.unimap.edu.my";
  } else if (sId.test(credential)) {
    idDigits = credential.slice(1);
    email = credential + "@studentmail.unimap.edu.my";
  } else if (studentMail.test(credential)) {
    idDigits = credential.slice(1, 10);
    email = credential;
  } else {
    return showError(
      error,
      "Invalid ID. Use 9 digits, s + 9 digits, or UniMAP student email.",
    );
  }

  const year = Number(idDigits.slice(0, 2));

  if (year < 20 || year > 26) {
    return showError(
      error,
      "Student ID must start with enrollment year 20 to 26. Example: 261234567",
    );
  }

  pendingUser = {
    name,
    phone,
    gender,
    email,
    studentId: idDigits,
    verified: true,
    isOku: document.getElementById("okuInput").checked,
  };

  generatedOtp = String(Math.floor(1000 + Math.random() * 9000));
  document.getElementById("otpInput").value = "";
  document.getElementById("otpError").classList.remove("show");

  showToast("UniRide OTP: " + generatedOtp);
  document.getElementById("otpModal").classList.add("show");
}

function verifyOtp() {
  const error = document.getElementById("otpError");
  error.classList.remove("show");

  if (value("otpInput") !== generatedOtp) {
    return showError(
      error,
      "Wrong OTP. Check the black notification at the top.",
    );
  }

  localStorage.setItem("uniride_user", JSON.stringify(pendingUser));
  document.getElementById("otpModal").classList.remove("show");
  enterApp();
}

function quickDemo() {
  localStorage.setItem(
    "uniride_user",
    JSON.stringify({
      name: "Alex Lim",
      phone: "60123456789",
      gender: "Male",
      email: "s261234567@studentmail.unimap.edu.my",
      studentId: "261234567",
      verified: true,
      isOku: false,
    }),
  );

  enterApp();
}

function enterApp() {
  document.getElementById("helloText").innerText =
    "Hi, " + firstName(currentUser().name);
  renderHomeRewards();
  showView("appView");
  showPage("homePage");
}

function setFeed(type) {
  currentFeed = type;

  document
    .getElementById("offerTab")
    .classList.toggle("active", type === "offer");
  document
    .getElementById("requestTab")
    .classList.toggle("active", type === "request");

  renderRides();
}

function renderRides() {
  const user = currentUser();
  renderHomeRewards();
  const bookedIds = bookings()
    .filter((b) => b.userEmail === user.email)
    .map((b) => b.rideId);

  const rides = getRides().filter(
    (r) => r.type === currentFeed && Number(r.seats) > 0,
  );
  const list = document.getElementById("ridesList");

  if (!rides.length) {
    list.innerHTML =
      '<div class="card muted" style="text-align:center">No rides found yet.</div>';
    return;
  }

  list.innerHTML = rides
    .map((r) => {
      const already = bookedIds.includes(r.id);
      const ownRide = r.ownerEmail === user.email;
      const blockedFemale = r.femaleOnly && user.gender !== "Female";
      const name = escapeHtml(r.name);

      return `
        <div class="card stack">
        <div class="row between">
            <div class="row">
            <div class="avatar">${escapeHtml(initials(r.name))}</div>
            <div>
                <span class="badge">${r.type === "offer" ? "Driver" : "Passenger"}</span>
                <h3 style="margin-top:8px">${name}</h3>
                <div class="muted mini">Rating ${escapeHtml(r.rating || "5.0")} - ${escapeHtml(r.gender)} - ${escapeHtml(r.seats)} seat(s)</div>
            </div>
            </div>
            <div class="price">${escapeHtml(r.fare)}</div>
        </div>

        <div class="row" style="flex-wrap:wrap">
            <span class="badge dark">${escapeHtml(r.model || "CampusCar")}</span>
            <span class="badge warn">${escapeHtml(r.plate || "Verified")}</span>
            ${r.femaleOnly ? '<span class="badge warn">Ladies Only</span>' : ""}
        </div>

        <div class="stack mini" style="gap:6px">
            <div><strong>From:</strong> ${escapeHtml(r.from)}</div>
            <div><strong>To:</strong> ${escapeHtml(r.to)}</div>
            <div><strong>Pickup:</strong> ${escapeHtml(r.pickup)}</div>
            <div><strong>Time:</strong> ${escapeHtml(formatTime(r.time))}</div>
        </div>

        <button
            class="btn"
            ${already || ownRide || blockedFemale ? "disabled" : ""}
            onclick="openConfirm(${r.id})"
        >
            ${already ? "Already Booked" : ownRide ? "Your Ride" : blockedFemale ? "Ladies Only" : "View & Book"}
        </button>
        </div>
    `;
    })
    .join("");
}

function openConfirm(id) {
  pendingRideId = id;
  const r = getRides().find((x) => x.id === id);
  if (!r || Number(r.seats) < 1) {
    pendingRideId = null;
    return showToast("This ride is no longer available.");
  }

  document.getElementById("confirmContent").innerHTML = `
    <div class="card soft stack">
        <div class="row between">
        <strong>${escapeHtml(r.from)}</strong>
        <span>to</span>
        </div>

        <strong>${escapeHtml(r.to)}</strong>

        <div class="map" style="min-height:150px">
        <div class="route"></div>
        <div class="car-dot">${escapeHtml(r.fare)}</div>
        </div>

        <div class="row between"><span>Driver</span><strong>${escapeHtml(r.name)}</strong></div>
        <div class="row between"><span>Vehicle</span><strong>${escapeHtml(r.model)} / ${escapeHtml(r.plate)}</strong></div>
        <div class="row between"><span>Time</span><strong>${escapeHtml(formatTime(r.time))}</strong></div>
        <div class="row between"><span>Payment</span><strong>Wallet RM 24.50</strong></div>
    </div>
    `;

  document.getElementById("confirmModal").classList.add("show");
}

function closeConfirm() {
  document.getElementById("confirmModal").classList.remove("show");
}

function confirmBooking() {
  const user = currentUser();
  const rides = getRides();
  const ride = rides.find((r) => r.id === pendingRideId);

  if (!ride) return;

  if (
    bookings().some((b) => b.rideId === ride.id && b.userEmail === user.email)
  ) {
    closeConfirm();
    return showToast("You already booked this ride.");
  }

  if (Number(ride.seats) < 1) {
    closeConfirm();
    return showToast("This ride has no seats left.");
  }

  ride.seats = Number(ride.seats) - 1;
  saveRides(rides);

  const item = {
    ...ride,
    rideId: ride.id,
    userEmail: user.email,
    bookedBy: user.name,
    bookedAt: new Date().toISOString(),
    bookedSeats: 1,
    originalOwnerEmail: ride.ownerEmail || "",
    status: "Driver is on the way",
    eta: "5 min",
  };

  const items = bookings();
  items.unshift(item);
  saveBookings(items);

  addPoints(100, "Ride confirmed");

  closeConfirm();

  document.getElementById("bookingSuccess").innerText =
    "Booking confirmed. Ride status is ready and 100 eco points were added.";

  document.getElementById("bookingSuccess").classList.add("show");

  showPage("statusPage");
}

function createRide(event) {
  event.preventDefault();

  const err = document.getElementById("postError");
  err.classList.remove("show");

  const type = value("rideType");
  const from = value("departureInput");
  const to = value("destinationInput");
  const time = value("timeInput");

  if (from === to) {
    return showError(err, "Departure and destination cannot be the same.");
  }

  if (!time || new Date(time).getTime() <= Date.now()) {
    return showError(err, "Departure time must be in the future.");
  }

  if (Number(value("seatsInput")) < 1) {
    return showError(err, "Seat count must be at least 1.");
  }

  if (type === "offer") {
    if (!/^[A-Z]{1,3}\s?\d{1,4}[A-Z]?$/i.test(value("plateInput"))) {
      return showError(
        err,
        "Vehicle plate format is invalid. Example: PBA 1234.",
      );
    }

    if (!/^\d{8,14}$/.test(value("licenseInput"))) {
      return showError(err, "License number must be 8 to 14 digits.");
    }
  }

  const user = currentUser();
  const rides = getRides();

  rides.unshift({
    id: Date.now(),
    type,
    name: user.name,
    gender: user.gender,
    phone: user.phone,
    ownerEmail: user.email,
    from,
    to,
    pickup: value("pickupInput"),
    time,
    seats: Number(value("seatsInput")),
    fare: calculateFare(),
    rating: "5.0",
    plate: type === "offer" ? value("plateInput").toUpperCase() : "-",
    model: type === "offer" ? value("modelInput") : "Passenger Request",
    femaleOnly:
      type === "offer" && document.getElementById("femaleOnlyInput").checked,
  });

  saveRides(rides);
  addPoints(40, type === "offer" ? "Journey posted" : "Ride request posted");

  event.target.reset();
  toggleDriverFields();
  updateFare();
  showPage("homePage");
  setFeed(type);
}

function renderStatus() {
  const user = currentUser();
  const active = bookings().find(
    (b) => b.userEmail === user.email && b.status !== "Cancelled",
  );
  const box = document.getElementById("statusCard");

  if (!active) {
    box.innerHTML =
      "<p>No active ride yet. Book a ride to see live status.</p>";
    return;
  }

  box.innerHTML = `
    <div class="row between">
        <span class="badge">Active Ride</span>
        <strong>${escapeHtml(active.eta)}</strong>
    </div>

    <h3>${escapeHtml(active.status)}</h3>

    <div class="stack mini" style="gap:7px">
        <div><strong>Route:</strong> ${escapeHtml(active.from)} to ${escapeHtml(active.to)}</div>
        <div><strong>Driver:</strong> ${escapeHtml(active.name)}</div>
        <div><strong>Vehicle:</strong> ${escapeHtml(active.model)} / ${escapeHtml(active.plate)}</div>
        <div><strong>Pickup:</strong> ${escapeHtml(active.pickup)}</div>
    </div>

    <div class="grid2">
        <a class="btn secondary" href="tel:${encodeURIComponent(active.phone)}" style="display:grid;place-items:center;text-decoration:none">Call</a>
        <a class="btn secondary" href="https://wa.me/${encodeURIComponent(active.phone)}" target="_blank" style="display:grid;place-items:center;text-decoration:none">WhatsApp</a>
    </div>

    <button class="btn secondary" onclick="shareTrip()">Share Trip</button>
    <button class="btn danger" onclick="cancelActiveRide()">Cancel Ride</button>
    `;
}

function cancelActiveRide() {
  const user = currentUser();
  const items = bookings();
  const active = items.find(
    (b) => b.userEmail === user.email && b.status !== "Cancelled",
  );

  if (!active) {
    showToast("No active ride to cancel.");
    return renderStatus();
  }

  const rides = getRides();
  const ride = rides.find((r) => r.id === active.rideId);
  if (ride) {
    ride.seats = Number(ride.seats || 0) + Number(active.bookedSeats || 1);
    saveRides(rides);
  }

  active.status = "Cancelled";
  active.cancelledAt = new Date().toISOString();
  saveBookings(items);
  showToast("Ride cancelled.");
  renderStatus();
}

function shareTrip() {
  const user = currentUser();
  const active = bookings().find((b) => b.userEmail === user.email);

  const msg = active
    ? `UniRide trip: ${active.from} to ${active.to}. Driver: ${active.name}. ETA: ${active.eta}. Location: UniMAP campus route.`
    : "UniRide safety location: UniMAP campus route.";

  if (navigator.share) {
    navigator.share({ title: "UniRide Trip", text: msg });
  } else {
    showToast(msg);
  }

  if (localStorage.getItem("uniride_shared_trip") !== "yes") {
    localStorage.setItem("uniride_shared_trip", "yes");
    addPoints(20, "Trip shared");
  }
}

function renderHistory() {
  const user = currentUser();
  const items = bookings().filter((b) => b.userEmail === user.email);

  document.getElementById("historyList").innerHTML = items.length
    ? items
        .map(
          (h) => `
        <div class="card">
        <div class="row between">
            <strong>${escapeHtml(h.from)} -> ${escapeHtml(h.to)}</strong>
            <span class="badge">${escapeHtml(h.status)}</span>
        </div>
        <p style="margin:8px 0 0">${escapeHtml(formatTime(h.time))} - ${escapeHtml(h.fare)}</p>
        </div>
    `,
        )
        .join("")
    : '<div class="card muted" style="text-align:center">No ride history yet.</div>';
}

function renderProfile() {
  const user = currentUser();

  document.getElementById("profileName").innerText = user.name;
  document.getElementById("profileEmail").innerText = user.email;
  document.getElementById("profilePhone").innerText = user.phone;
  document.getElementById("profileStatus").innerText = user.isOku
    ? "OKU Care / Verified Student"
    : "Verified Student";
  document.getElementById("pointsText").innerText = points + " pts";
  renderRewards();
}

function fillLocations() {
  const dep = document.getElementById("departureInput");
  const dest = document.getElementById("destinationInput");

  dep.innerHTML = locations.map((l) => `<option>${l}</option>`).join("");
  dest.innerHTML = locations.map((l) => `<option>${l}</option>`).join("");

  dest.selectedIndex = 1;
  updateFare();
}

function zone(location) {
  if (location.includes("KTM") || location.includes("Arau")) return "ARAU";
  if (location.includes("Kangar")) return "KANGAR";
  if (location.includes("Kuala")) return "KPERLIS";
  if (location.includes("UniCITI")) return "UNICITI";
  return "PAUH";
}

function calculateFare() {
  const a = zone(value("departureInput"));
  const b = zone(value("destinationInput"));

  const base =
    a === b
      ? 5
      : [a, b].includes("KPERLIS")
        ? 20
        : [a, b].includes("UNICITI")
          ? 18
          : [a, b].includes("KANGAR")
            ? 15
            : 10;

  const hour = new Date(value("timeInput") || Date.now()).getHours();
  const peak = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19) ? 2 : 0;

  return "RM " + (base + peak);
}

function updateFare() {
  document.getElementById("fareText").innerText = calculateFare();
}

function toggleDriverFields() {
  document.getElementById("driverFields").style.display =
    value("rideType") === "offer" ? "grid" : "none";
}

function showError(el, message) {
  el.innerText = message;
  el.classList.add("show");
}

function showToast(message) {
  const toast = document.getElementById("smsToast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 8000);
}

function addPoints(amount, reason) {
  points += amount;
  localStorage.setItem("uniride_points", points);
  showToast("+" + amount + " points: " + reason);
}

function rewardLevel() {
  return (
    rewardLevels
      .slice()
      .reverse()
      .find((level) => points >= level.min) || rewardLevels[0]
  );
}

function rewardProgress(level) {
  if (!level.next) return 100;
  return Math.min(
    100,
    Math.round(((points - level.min) / (level.next - level.min)) * 100),
  );
}

function renderRewards() {
  const level = rewardLevel();
  const progress = rewardProgress(level);
  const nextText = level.next
    ? level.next -
      points +
      " points to " +
      rewardLevels.find((x) => x.min === level.next).name
    : "Top level unlocked. Keep earning perks.";

  document.getElementById("rewardLevel").innerText = level.name;
  document.getElementById("rewardNext").innerText = nextText;
  document.getElementById("rewardPoints").innerText = points + " pts";
  document
    .getElementById("rewardProgress")
    .style.setProperty("--progress", progress + "%");

  const completedBookings = bookings().filter(
    (b) => b.userEmail === currentUser().email,
  );
  const activeRides = completedBookings.filter(
    (b) => b.status !== "Cancelled",
  ).length;
  const postedRides = getRides().filter(
    (r) => r.ownerEmail === currentUser().email,
  ).length;

  const missions = [
    {
      title: "Book a campus ride",
      desc: "Earn 100 points after confirming a ride.",
      done: activeRides > 0,
      reward: "+100",
    },
    {
      title: "Post a journey",
      desc: "Offer seats or request a route for 40 points.",
      done: postedRides > 0,
      reward: "+40",
    },
    {
      title: "Share your trip",
      desc: "Use Share Trip from ride status for 20 points.",
      done: localStorage.getItem("uniride_shared_trip") === "yes",
      reward: "+20",
    },
  ];

  document.getElementById("missionList").innerHTML = missions
    .map(
      (m) => `
    <div class="task-row">
        <div>
        <strong>${escapeHtml(m.title)}</strong>
        <div class="muted mini">${escapeHtml(m.desc)}</div>
        </div>
        <span class="badge ${m.done ? "" : "warn"}">${m.done ? "Done" : m.reward}</span>
    </div>
    `,
    )
    .join("");

  document.getElementById("rewardList").innerHTML = rewardCatalog
    .map((item, index) => {
      const canRedeem = points >= item.cost;
      return `
        <div class="reward-tile">
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.desc)}</small>
        <button class="btn small ${canRedeem ? "" : "secondary"}" onclick="redeemReward(${index})" ${canRedeem ? "" : "disabled"}>
            ${canRedeem ? "Redeem" : item.cost + " pts"}
        </button>
        </div>
    `;
    })
    .join("");
}

function renderHomeRewards() {
  const strip = document.getElementById("homeRewardStrip");
  if (!strip || !currentUser()) return;

  const level = rewardLevel();
  const nextText = level.next
    ? level.next -
      points +
      " pts to " +
      rewardLevels.find((x) => x.min === level.next).name
    : "Top level unlocked.";

  strip.style.display = "grid";
  document.getElementById("homeRewardLevel").innerText = level.name;
  document.getElementById("homeRewardNext").innerText = nextText;
  document.getElementById("homeRewardPoints").innerText = points + " pts";
}

function redeemReward(index) {
  const reward = rewardCatalog[index];
  if (!reward) return;
  if (points < reward.cost) return showToast("Not enough points yet.");
  points -= reward.cost;
  localStorage.setItem("uniride_points", points);
  showToast(reward.title + " redeemed. It will appear in your wallet.");
  renderProfile();
}

function closeOtp() {
  document.getElementById("otpModal").classList.remove("show");
}

function openSos() {
  document.getElementById("sosModal").classList.add("show");
}

function closeSos() {
  document.getElementById("sosModal").classList.remove("show");
}

function logout() {
  localStorage.removeItem("uniride_user");
  showView("welcomeView");
}

function firstName(name) {
  return (name || "Student").split(" ")[0];
}

function initials(name) {
  return (name || "UR")
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatTime(value) {
  return value ? value.replace("T", " ") : "-";
}

function value(id) {
  return document.getElementById(id).value.trim();
}

fillLocations();
toggleDriverFields();
applyLang();

if (currentUser()) enterApp();
