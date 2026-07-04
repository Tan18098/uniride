const app = document.getElementById("app");
const screenLabel = document.getElementById("screenLabel");

let page = "welcome";
let postMode = "driver";

const labels = {
  welcome: "1 - Welcome",
  verify: "2 - Verification",
  otp: "3 - OTP",
  home: "4 - Home",
  booking: "5 - Booking",
  status: "6 - Ride Status",
  post: "7 - Post Journey",
  history: "8 - History",
  profile: "9 - Profile",
  language: "10 - Language",
  sos: "11 - SOS"
};

function go(next) {
  page = next;
  render();
  app.scrollTo(0, 0);
}

function nav(active) {
  const items = [
    ["home", "Home", "H"],
    ["post", "Post", "+"],
    ["status", "Status", ">"],
    ["history", "History", "C"],
    ["profile", "Profile", "P"]
  ];

  return `<nav class="bottom-nav">
    ${items.map(([id, text, icon]) => `
      <button class="nav-item ${active === id ? "active" : ""}" onclick="go('${id}')">
        <span>${icon}</span>${text}
      </button>
    `).join("")}
  </nav>`;
}

function top(title, subtitle = "", options = {}) {
  return `<header class="top ${options.red ? "red" : ""}">
    <div class="top-row">
      ${options.back ? `<button class="back" onclick="go('${options.back}')">&lt;</button>` : ""}
      ${options.icon ? `<div class="icon-tile">${options.icon}</div>` : ""}
      <div style="flex:1">
        <h1>${title}</h1>
        ${subtitle ? `<p class="sub">${subtitle}</p>` : ""}
      </div>
      ${options.sos ? `<button class="btn red" style="width:auto;min-height:44px;padding:0 18px;border-radius:15px" onclick="go('sos')">SOS</button>` : ""}
      ${options.close ? `<button class="close" onclick="go('status')">x</button>` : ""}
    </div>
  </header>`;
}

function field(label, icon, placeholder) {
  return `<div class="field">
    <span class="label">${label}</span>
    <div class="input"><span>${icon}</span>${placeholder}</div>
  </div>`;
}

function map(eta = "") {
  return `<div class="map">
    ${eta ? `<div class="eta">${eta}</div>` : ""}
    <div class="marker start"></div>
    <div class="marker car">car</div>
    <div class="marker end"></div>
    <small class="campus">Campus</small>
    <small class="ktm">KTM Arau</small>
  </div>`;
}

function welcome() {
  return `<section class="welcome">
    <div class="logo">UR</div>
    <h1>UniRide Campus</h1>
    <p><strong>Safe verified campus rides for UniMAP students</strong></p>
    <p>Book trusted student rides, share trips, and travel safer around campus.</p>
    <button class="btn white" onclick="go('verify')">Get Started</button>
    <button class="btn ghost" onclick="go('home')">Demo Login</button>
    <div class="langs">
      <button class="pill active">EN</button>
      <button class="pill" onclick="go('language')">BM</button>
      <button class="pill" onclick="go('language')">中文</button>
    </div>
  </section>`;
}

function verify() {
  return `${top("Account Verification", "Verify your student identity before booking rides", { icon: "ID" })}
  <div class="content">
    <section class="card">
      ${field("Full Name", "user", "Your full name")}
      ${field("UniMAP Student ID", "id", "e.g. 230112345")}
      ${field("UniMAP Email", "mail", "name@unimap.edu.my")}
      ${field("Malaysia Phone (+60)", "tel", "+60 12-345 6789")}
      <span class="label">Gender</span>
      <div class="seg"><button class="active">Male</button><button>Female</button></div>
    </section>
    <section class="card check-row"><div class="check">✓</div><p>Register as OKU special care member</p></section>
    <section class="card info check-row"><div style="font-size:22px">ID</div><div><h3>UniMAP Student Verification</h3><p class="muted" style="margin-top:8px">Your information is encrypted and used only for campus ride verification.</p></div></section>
    <button class="btn" onclick="go('otp')">Continue to OTP</button>
  </div>`;
}

function otp() {
  return `${top("Phone Verification", "Enter the 6-digit code sent to", { icon: "OTP" })}
  <div class="content">
    <div class="pill" style="width:max-content;margin-top:-88px;margin-left:12px;color:white;background:rgba(0,0,0,.18);border:0">+60 12-345 6789</div>
    <div class="otp-grid">
      <div class="otp-box filled">1</div><div class="otp-box filled">4</div><div class="otp-box">.</div><div class="otp-box">.</div><div class="otp-box">.</div><div class="otp-box">.</div>
    </div>
    <section class="card info" style="text-align:center"><h3>This helps keep UniRide safe for verified students.</h3><p class="muted" style="margin-top:12px">Do not share this code with anyone.</p></section>
    <button class="btn" onclick="go('home')">Verify & Continue</button>
    <p style="text-align:center;margin-top:24px;color:var(--muted)">Resend code in <strong style="color:var(--teal)">45s</strong></p>
    <p style="text-align:center;margin-top:18px;color:var(--muted);text-decoration:underline">Change phone number</p>
  </div>`;
}

function home() {
  return `<header class="top">
    <p class="sub">Good morning</p>
    <div class="top-row">
      <h1 style="flex:1">Hi, Alex <span class="pill" style="border:0;background:#ffa408;color:white;font-size:11px">VERIFIED</span></h1>
      <button class="bell">!</button>
      <button class="btn red" style="width:auto;min-height:44px;padding:0 18px;border-radius:15px" onclick="go('sos')">SOS</button>
    </div>
    <div class="wallet-strip">
      <div><span class="sub">Campus Wallet</span><strong>RM 24.50</strong></div>
      <div><span class="sub">Rewards</span><strong><span class="orange">300 pts</span> <small>Bronze</small></strong></div>
    </div>
  </header>
  <div class="content">
    <section class="card route-card">
      <div class="stop"><div><div class="dot"></div><div class="route-line"></div><div class="dot orange"></div></div><div><span class="label">PICKUP</span><h3>UniMAP Main Gate</h3><hr style="border:0;border-top:1px solid #e5eeec;margin:16px 0"><span class="label">DESTINATION</span><h3>KTM Arau Train Station</h3></div></div>
      <div class="input" style="margin-top:18px;justify-content:space-between"><span>Today, 10:30 AM</span><button class="btn" style="width:auto;min-height:42px;padding:0 18px" onclick="go('booking')">Find Ride</button></div>
    </section>
    <section class="card">${map()}<div class="chips"><button class="chip">Library</button><button class="chip">Dormitory</button><button class="chip active">Main Gate</button><button class="chip">KTM</button></div></section>
    <div class="seg"><button class="active">Find Drivers</button><button>Find Passengers</button></div>
    ${driver("AH", "Ahmad Hazim", "RM 3.00", "4.8 - 128 rides - 3 seats", true)}
    ${driver("NF", "Nur Fatin", "RM 2.50", "4.9 - 96 rides - Ladies-only", false)}
    ${nav("home")}
  </div>`;
}

function driver(initials, name, fare, meta, action) {
  return `<section class="card driver-card">
    <div class="avatar">${initials}</div>
    <div><h3>${name} <span class="verified">Verified</span></h3><p class="mini">Star ${meta}<br>Perodua Myvi - KBF 2341<br>UniMAP Main Gate -> KTM Arau - 10:30 AM</p></div>
    <div class="price">${fare}<small style="display:block;color:var(--muted);font-size:12px">per pax</small>${action ? `<button class="btn" style="margin-top:18px;width:98px;min-height:38px;font-size:12px" onclick="go('booking')">View & Book</button>` : ""}</div>
  </section>`;
}

function post() {
  const isDriver = postMode === "driver";
  return `${top("Post Journey", isDriver ? "Offer a ride to verified UniMAP students" : "Request a campus ride")}
  <div class="content">
    <div class="seg"><button class="${isDriver ? "active" : ""}" onclick="postMode='driver';render()">Driver</button><button class="${!isDriver ? "active" : ""}" onclick="postMode='passenger';render()">Passenger</button></div>
    ${isDriver ? driverForm() : passengerForm()}
    <section class="card fare-card"><div><span class="muted">Estimated Fare</span><strong>RM 5</strong><span class="muted">per passenger</span></div><div class="reward-box">+40 pts<br><span class="muted">Reward earned</span></div></section>
    <button class="btn">${isDriver ? "Publish Journey" : "Request Ride"}</button>
    ${nav("post")}
  </div>`;
}

function driverForm() {
  return `<section class="card"><h3>Driver Verification</h3><br>
    ${field("Vehicle Plate", "car", "e.g. KBF 2341")}
    ${field("Vehicle Model", "car", "e.g. Perodua Myvi 2022")}
    ${field("License Number", "id", "License number")}
    <div class="check-row" style="justify-content:space-between"><div><h3>Ladies-only Ride</h3><p class="muted">Female passengers only</p></div><div class="pill active" style="background:var(--teal);color:white">ON</div></div>
  </section>
  <section class="card"><h3>Trip Details</h3><br>${field("Departure Location", "pin", "Select location")}${field("Destination", "pin", "Select destination")}${field("Pickup Landmark", "pin", "e.g. Main Gate Entrance")}${field("Departure Time", "time", "Select time")}${field("Available Seats", "seat", "1 - 4 passengers")}</section>
  <p class="label">SUGGESTED ROUTES</p><div class="chips" style="margin-bottom:16px"><button class="chip">Main Gate -> KTM Arau</button><button class="chip">Dormitory -> Kangar</button><button class="chip">Library -> Main Gate</button></div>`;
}

function passengerForm() {
  return `<section class="card"><h3>Passenger Preferences</h3><br>
    ${toggle("Ladies-only ride", "Female drivers only")}
    ${toggle("OKU assistance needed", "Special care support")}
    ${toggle("Quiet ride", "No loud music or calls")}
  </section>
  <section class="card"><h3>Trip Details</h3><br>${field("Pickup Location", "pin", "Select location")}${field("Destination", "pin", "Select destination")}${field("Pickup Landmark", "pin", "e.g. Main Gate Entrance")}${field("Preferred Time", "time", "Select time")}</section>
  <p class="label">SUGGESTED ROUTES</p><div class="chips" style="margin-bottom:16px"><button class="chip">Main Gate -> KTM Arau</button><button class="chip">Dormitory -> Kangar</button><button class="chip">Library -> Main Gate</button></div>`;
}

function toggle(title, sub) {
  return `<div class="check-row" style="justify-content:space-between;margin-bottom:18px"><div><p>${title}</p><small class="muted">${sub}</small></div><div style="width:48px;height:28px;border-radius:20px;background:#dfe3e7;padding:3px"><div style="width:22px;height:22px;border-radius:50%;background:white;box-shadow:0 1px 4px #aaa"></div></div></div>`;
}

function booking() {
  return `${top("Confirm Booking", "", { back: "home" })}
  <div class="content">
    <section class="card route-card"><div class="stop"><div><div class="dot"></div><div class="route-line"></div><div class="dot orange"></div></div><div><span class="label">DEPARTURE</span><h3>UniMAP Pauh Putra Main Campus</h3><br><span class="label">DESTINATION</span><h3>KTM Arau Train Station</h3></div></div></section>
    <section class="card">${map()}</section>
    <section class="card driver-card"><div class="avatar">AH</div><div><h3>Ahmad Hazim <span class="verified">Verified</span></h3><p class="mini">Star 4.8 - 128 completed rides<br>Perodua Myvi - KBF 2341</p></div><div></div><div style="grid-column:1/4"><hr style="border:0;border-top:1px solid #e5eeec"><p class="mini">Pickup Time <strong style="float:right;color:var(--ink)">10:30 AM</strong></p><p class="mini">Base fare <strong style="float:right;color:var(--ink)">RM 2.50</strong></p><p class="mini">Campus service fee <strong style="float:right;color:var(--ink)">RM 0.50</strong></p><hr style="border:0;border-top:1px solid #e5eeec"><h3>Total Fare <span class="price" style="float:right">RM 3.00</span></h3></div></section>
    <section class="card info check-row"><div style="font-size:24px">W</div><div><span class="muted">Campus Wallet - Balance</span><h2>RM 24.50</h2></div><strong style="margin-left:auto;color:#16a34a">Selected</strong></section>
    <section class="card info">Trip details will be shared with your trusted contact automatically.</section>
    <div style="display:grid;grid-template-columns:95px 1fr;gap:12px"><button class="btn soft" onclick="go('home')">Cancel</button><button class="btn" onclick="go('status')">Confirm Booking</button></div>
    ${nav("home")}
  </div>`;
}

function status() {
  return `${top("Ride Status", "", { sos: true })}
  <div class="content">
    <section class="card">${map("ETA 5 min")}</section>
    <section class="card"><div class="progress"><div><h2 style="color:#16a34a">Active Ride</h2><h3 style="margin-top:22px">Driver is on the way</h3></div><div class="pill">ETA: 5 min</div></div><p class="mini" style="margin-top:18px">Route <strong style="float:right;color:var(--ink)">Campus -> KTM Arau</strong><br>Driver <strong style="float:right;color:var(--ink)">Ahmad Hazim</strong><br>Vehicle <strong style="float:right;color:var(--ink)">Myvi - KBF 2341</strong><br>Pickup <strong style="float:right;color:var(--ink)">Main Gate, UniMAP</strong></p><div class="input" style="height:42px;margin-top:18px;color:var(--teal)">Live trip sharing available</div></section>
    <section class="card"><h3>Trip Progress</h3><div class="steps">${["Booking confirmed","Driver assigned","Driver arriving","Picked up","Arrived"].map((s,i)=>`<div><div class="step-dot ${i<2?"done":i===2?"now":""}">${i<2?"✓":""}</div>${s}</div>`).join("")}</div></section>
    <div class="actions"><button class="action">Call</button><button class="action">WhatsApp</button><button class="action">Share Trip</button><button class="action danger">Cancel</button></div>
    ${nav("status")}
  </div>`;
}

function history() {
  return `${top("Ride History", "Your recent campus rides")}
  <div class="content">
    <div class="chips" style="margin-bottom:18px"><button class="chip active">All</button><button class="chip">Completed</button><button class="chip">Cancelled</button><button class="chip">Rewards</button></div>
    ${historyCard("UniMAP Campus -> KTM Arau", "Today, 8:30 AM - Ahmad Hazim", "RM 3.00", "+30 pts")}
    ${historyCard("Dormitory A -> Kangar Town", "Yesterday, 5:00 PM - Nur Fatin", "RM 5.50", "+55 pts")}
    ${historyCard("Library Block -> Main Gate", "Jun 28, 2:15 PM - Razif Zain", "RM 2.00", "+20 pts")}
    <section class="card"><h3>Summary</h3><div class="summary" style="margin-top:22px"><div><strong>12</strong><span class="muted">Total Rides</span></div><div><strong>300 pts</strong><span class="muted">Points Earned</span></div><div><strong>RM 18.50</strong><span class="muted">Money Saved</span></div></div></section>
    ${nav("history")}
  </div>`;
}

function historyCard(route, time, fare, pts) {
  return `<section class="card history-card"><div><h3>${route}</h3><p class="mini" style="margin-top:14px">${time}</p><span class="verified" style="color:#16a34a">Completed</span> <strong class="orange">${pts}</strong></div><div class="price" style="font-size:22px">${fare}<button class="btn soft" style="margin-top:22px;min-height:40px">Receipt</button></div></section>`;
}

function profile() {
  return `<header class="top profile-top"><div class="profile-head"><div class="logo" style="width:64px;height:64px;margin:0;font-size:26px;border-radius:18px">AL</div><div><h1>Alex Lim <span class="pill" style="border:0;background:#ffa408;color:white;font-size:11px">VERIFIED</span></h1><p class="sub">alex.lim@unimap.edu.my<br>+60 12-345 6789</p></div></div><div class="stats"><div><strong>RM 24.50</strong><span class="sub">Wallet</span></div><div><strong>1,240</strong><span class="sub">Eco Pts</span></div><div><strong>Active</strong><span class="sub">Status</span></div></div></header>
  <div class="content">
    <section class="card"><div class="progress"><h3>Campus Wallet</h3><h2 style="color:var(--teal)">RM 24.50</h2></div><div class="actions" style="margin-top:20px"><button class="btn">+ Top Up</button><button class="btn soft">Transactions</button></div></section>
    <section class="card reward-card"><h3>UniRide Rewards - Bronze Rider</h3><div class="progress" style="margin-top:18px"><h1 style="font-size:42px">300 <small>pts</small></h1><p>200 pts to Silver Rider<br><small>300 / 500 pts</small></p></div><div class="bar"><span></span></div></section>
    <section class="card"><h3>Reward Missions</h3><p class="mini" style="margin-top:18px">Done: Book a campus ride <strong class="orange" style="float:right">+100</strong><br>Post a journey <strong class="orange" style="float:right">+40</strong><br>Share your trip <strong class="orange" style="float:right">+20</strong><br>Safe ride streak <strong class="orange" style="float:right">+80</strong></p></section>
    <section class="card settings">
      ${setting("TC", "Trusted Contacts", "2 contacts saved")}
      ${setting("SS", "Safety Settings", "SOS & live sharing")}
      ${setting("OK", "Verification", "UniMAP Verified")}
      <div class="setting-row" onclick="go('language')"><div class="setting-icon">GL</div><div><h3>Language</h3><p class="muted">English</p></div><div class="chev">></div></div>
      <div class="setting-row"><div class="setting-icon" style="color:var(--red);background:#fff0f0">LO</div><h3 style="color:var(--red)">Logout</h3></div>
    </section>
    ${nav("profile")}
  </div>`;
}

function setting(icon, title, sub) {
  return `<div class="setting-row"><div class="setting-icon">${icon}</div><div><h3>${title}</h3><p class="muted">${sub}</p></div><div class="chev">></div></div>`;
}

function language() {
  return `${top("Choose Language", "Select your preferred app language", { back: "profile", icon: "GL" })}
  <div class="content">
    <section class="card settings">
      ${langRow("English", "English", true)}
      ${langRow("Bahasa Melayu", "Bahasa Melayu", false)}
      ${langRow("Chinese", "中文", false)}
    </section>
    <section class="card info"><h3>Preview</h3><p class="mini" style="margin-top:12px">English: Find Ride<br>Bahasa Melayu: Cari Perjalanan<br>Chinese: 寻找行程</p></section>
    <button class="btn" onclick="go('profile')">Apply Language</button>
    <p style="text-align:center;margin-top:18px" class="muted">You can change this anytime in Profile Settings</p>
  </div>`;
}

function langRow(name, native, active) {
  return `<div class="setting-row"><div class="setting-icon">GL</div><div><h3>${name}</h3><p class="muted">${native}</p></div><div class="chev">${active ? "✓" : ""}</div></div>`;
}

function sos() {
  return `<section class="sos-screen">
    ${top("Emergency Assistance", "Campus route, UniMAP - Live Tracking - Trip ID: UR-2407-1030", { red: true, close: true })}
    <div class="content">
      <section class="card sos-card"><h3 style="color:#31e985">Live Safety Preview - Location sharing active</h3><br>${map()}</section>
      <section class="status-card"><span>Live trip location is being shared</span><span class="badge">Active</span></section><br>
      <section class="status-card"><span>Trusted contact notified</span><span class="badge">Sent</span></section><br>
      <section class="status-card"><span>Campus security available 24/7</span><span class="badge" style="color:var(--orange)">Standby</span></section>
      <p class="label" style="margin:22px 0 12px;color:#8aa09a">EMERGENCY CONTACTS</p>
      <div class="emergency-contact"><div style="font-size:20px">S</div><div><h3>Campus Security</h3><p class="muted">UniMAP Police</p></div><button class="call-btn">Call</button></div>
      <div class="emergency-contact"><div style="font-size:20px">999</div><div><h3>Emergency Services</h3><p class="muted">999 Hotline</p></div><button class="call-btn">Call</button></div>
      <div class="emergency-contact"><div style="font-size:20px">A</div><div><h3>Trusted Contact</h3><p class="muted">Ahmad (Family)</p></div><button class="call-btn">Call</button></div>
      <button class="btn">Share Current Trip</button><br><br>
      <button class="btn red">Call UniMAP Police</button><br><br>
      <button class="btn red" style="background:#fb4145">Call 999</button><br><br>
      <button class="btn" style="background:transparent;border:1px solid rgba(255,255,255,.15);box-shadow:none;color:#7a8b86" onclick="go('status')">Close</button>
    </div>
  </section>`;
}

function render() {
  screenLabel.textContent = labels[page];
  const views = { welcome, verify, otp, home, booking, status, post, history, profile, language, sos };
  app.innerHTML = views[page]();
}

render();
