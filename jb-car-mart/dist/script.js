/* app.js - paste into CodePen JS pane (or include as external script) */

/* -------------------------
   Translations (UI text only)
   ------------------------- */
const translations = {
  en: {
    hero_title: "JB Car Mart — Premium Auctions for Land Vehicles",
    hero_sub:
      "Trusted auction marketplace for cars, trucks, motorcycles and more. Secure bidding, verified sellers and transparent fees.",
    cta_browse: "Browse Live Auctions",
    cta_sell: "List Your Vehicle",
    live_title: "Live Auctions",
    live_sub: "Ending soon — place your bid now.",
    how_title: "How JB Car Mart Works",
    step1_title: "List",
    step1_sub: "Sellers submit vehicle details and photos for verification.",
    step2_title: "Bid",
    step2_sub:
      "Secure bidding with countdown timers and auto-extend for fairness.",
    step3_title: "Win",
    step3_sub: "Payment capture, platform and seller fees handled securely.",
    trust_verified: "Verified sellers",
    trust_secure: "Secure payments",
    trust_support: "Local support"
  },
  si: {
    hero_title: "JB Car Mart — හොඳම වාහන වෙන්දේසිය ",
    hero_sub:
      "කාර්, වෑන්, ට්‍රක්, මෝටර්සයිකල් සහ අනෙක් වාහන සඳහා විශ්වාසදායක වාහන වෙන්දේසි වෙළඳපොල. ආරක්ෂිත වාහන වෙන්දේසිය සහ සහතික කළ නියෝජිතයන්.",
    cta_browse: "සජීවී ලංසු ",
    cta_sell: "ඔබේ වාහනය ලැයිස්තු කරන්න",
    live_title: "සජීවී ලංසු",
    live_sub: "ඉක්මනින් අවසන් — දැන්ම ලංසු තැබීම.",
    how_title: "JB Car Mart ක්‍රියාකාරිත්වය",
    step1_title: "ලැයිස්තු කරන්න",
    step1_sub: "විකුණුම්කරුවන් වාහන විස්තර හා ඡායාරූප ඉදිරිපත් කරති.",
    step2_title: "ලංසු තැබීම",
    step2_sub: "ආරක්ෂිත ලංසු තැබීම සහ ස්වයංකීය විස්තාරණය.",
    step3_title: "ජයග්‍රහණය",
    step3_sub: "ගෙවීම් හා ගාස්තු ආරක්ෂිතව කළමනාකරණය කෙරේ.",
    trust_verified: "සහතික කළ නියෝජිතයන්",
    trust_secure: "ආරක්ෂිත ගෙවීම්",
    trust_support: "දේශීය සහය"
  },
  ta: {
    hero_title: "JB Car Mart — பிரீமியம் நில வாகன ஏலங்கள்",
    hero_sub:
      "கார்கள், டிரக்குகள், மோட்டார் சைக்கிள்கள் மற்றும் மேலும் பலவற்றுக்கான நம்பகமான ஏல சந்தை. பாதுகாப்பான பிடிங் மற்றும் உறுதிப்படுத்தப்பட்ட விற்பனையாளர்கள்.",
    cta_browse: "நேரடி ஏலங்கள் பார்க்க",
    cta_sell: "உங்கள் வாகனத்தை பட்டியலிடு",
    live_title: "நேரடி ஏலங்கள்",
    live_sub: "விரைவில் முடிகிறது — இப்போது பிட் வைக்கவும்.",
    how_title: "JB Car Mart எப்படி செயல்படுகிறது",
    step1_title: "பட்டியலிடு",
    step1_sub:
      "விற்பனையாளர்கள் வாகன விவரங்கள் மற்றும் புகைப்படங்களை சமர்ப்பிக்கின்றனர்.",
    step2_title: "பிட்",
    step2_sub: "தேர்வு செய்யப்பட்ட பிடிங் மற்றும் தானாக விரிவாக்கம்.",
    step3_title: "வெற்றி",
    step3_sub: "பணம் பிடித்து, கட்டணங்கள் பாதுகாப்பாக நிர்வகிக்கப்படும்.",
    trust_verified: "உறுதிசெய்யப்பட்ட விற்பனையாளர்கள்",
    trust_secure: "பாதுகாப்பான கட்டணங்கள்",
    trust_support: "இலங்கை ஆதரவு"
  }
};

// apply data-i18n translations
function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    } else if (translations.en[key]) {
      el.textContent = translations.en[key];
    }
  });
  document.documentElement.lang =
    lang === "si" ? "si" : lang === "ta" ? "ta" : "en";
}

// Lang buttons
document.querySelectorAll(".lang-btn, .flag-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang") || "en";
    setLanguage(lang);
  });
});
setLanguage("en"); // default

/* -------------------------
   Auction data + logic (demo)
   ------------------------- */

/* Auction object shape:
{
  id, title, location, startingBid, currentBid, minIncrement, image, endsAt (ms), autoExtendSeconds
}
*/

// sample demo auctions (replace via fetch -> API in production)
let auctions = [
  {
    id: "a1",
    title: "1998 Toyota Land Cruiser",
    location: "Colombo",
    startingBid: 9500,
    currentBid: 12500,
    minIncrement: 250,
    image:
      "https://images.unsplash.com/photo-1517705008124-0b0c5a7b9b6b?q=80&w=1200&auto=format&fit=crop",
    endsAt: Date.now() + (2 * 60 * 60 + 14 * 60 + 23) * 1000, // 2h14m23s
    autoExtendSeconds: 300
  },
  {
    id: "a2",
    title: "2018 Ford F-150",
    location: "Galle",
    startingBid: 8000,
    currentBid: 9200,
    minIncrement: 100,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    endsAt: Date.now() + (10 * 60 * 60 + 34 * 60 + 11) * 1000,
    autoExtendSeconds: 300
  },
  {
    id: "a3",
    title: "2019 Ducati Monster",
    location: "Kandy",
    startingBid: 6000,
    currentBid: 6800,
    minIncrement: 50,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
    endsAt: Date.now() + (1 * 24 * 3600 + 3 * 3600 + 22 * 60) * 1000,
    autoExtendSeconds: 300
  }
];

const auctionsEl = document.getElementById("auctions");
const timerIntervals = {};
let realtimeDemo = false;
let loggedIn = false;

// helper: format currency
function fmt(v) {
  return "$" + Number(v).toLocaleString();
}

// create auction card DOM
function createAuctionCard(a) {
  const art = document.createElement("article");
  art.className = "auction-card";
  art.setAttribute("data-id", a.id);
  art.innerHTML = `
    <div class="img-wrap">
      <img src="${a.image}" alt="${a.title}">
      <div class="badge">Live</div>
    </div>
    <div class="card-body">
      <h4 class="title">${a.title}</h4>
      <div class="meta">${a.location}</div>
      <div class="bids">
        <div class="bid-col">
          <div class="small">Starting</div>
          <div class="large start">${fmt(a.startingBid)}</div>
        </div>
        <div class="bid-col">
          <div class="small">Current</div>
          <div class="large current" data-current="${a.currentBid}">${fmt(
    a.currentBid
  )}</div>
        </div>
        <div class="timer-col">
          <div class="small">Ends in</div>
          <div class="timer" data-ends="${a.endsAt}" id="t-${
    a.id
  }">--:--:--</div>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn small place-bid" data-id="${a.id}">Place bid</button>
        <button class="btn outline small watch" data-id="${a.id}">Watch</button>
      </div>
    </div>`;
  return art;
}

// render all auctions
function renderAuctions(list = auctions) {
  auctionsEl.innerHTML = "";
  list.forEach((a) => auctionsEl.appendChild(createAuctionCard(a)));
  initTimers();
  attachBidButtons();
}

// timers
function initTimers() {
  document.querySelectorAll(".timer").forEach((timerEl) => {
    const end = Number(timerEl.getAttribute("data-ends"));
    const id = timerEl.id;
    if (timerIntervals[id]) clearInterval(timerIntervals[id]);
    function tick() {
      const diff = Math.max(0, end - Date.now());
      const days = Math.floor(diff / (24 * 3600 * 1000));
      let rem = diff - days * 24 * 3600 * 1000;
      const hrs = Math.floor(rem / (3600 * 1000));
      rem -= hrs * 3600 * 1000;
      const mins = Math.floor(rem / (60 * 1000));
      rem -= mins * 60 * 1000;
      const secs = Math.floor(rem / 1000);
      if (diff <= 0) {
        timerEl.textContent = "Ended";
        clearInterval(timerIntervals[id]);
        return;
      }
      if (days > 0) {
        timerEl.textContent = `${days}d ${String(hrs).padStart(
          2,
          "0"
        )}:${String(mins).padStart(2, "0")}`;
      } else {
        timerEl.textContent = `${String(hrs).padStart(2, "0")}:${String(
          mins
        ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
      }
    }
    tick();
    timerIntervals[id] = setInterval(tick, 1000);
  });
}

// attach Place bid logic (opens simple prompt for demo)
function attachBidButtons() {
  document.querySelectorAll(".place-bid").forEach((btn) => {
    btn.removeEventListener("click", placeBidHandler);
    btn.addEventListener("click", placeBidHandler);
  });
}

function placeBidHandler(e) {
  const id = e.currentTarget.getAttribute("data-id");
  if (!loggedIn) {
    alert(
      'Please login to place a bid (demo). Use "Toggle Login" button to simulate.'
    );
    return;
  }
  const a = auctions.find((x) => x.id === id);
  if (!a) return;
  // simple prompt for demo; in production use modal + validation + payment hold
  const minNext = a.currentBid + a.minIncrement;
  const str = `Current bid: ${fmt(a.currentBid)}\nMinimum next bid: ${fmt(
    minNext
  )}\nEnter your bid amount (numbers only):`;
  const val = prompt(str, minNext);
  const bidAmt = Number(val);
  if (!bidAmt || bidAmt < minNext) {
    alert(`Bid not accepted. Enter an amount >= ${fmt(minNext)}.`);
    return;
  }

  // simulate server-side bid acceptance -> update currentBid
  a.currentBid = bidAmt;
  // If bid happens within autoExtendSeconds of end, extend
  const now = Date.now();
  const remaining = a.endsAt - now;
  if (remaining <= a.autoExtendSeconds * 1000) {
    a.endsAt = now + a.autoExtendSeconds * 1000; // extend by autoExtendSeconds from now
    // update timer dom
    const timerEl = document.getElementById(`t-${a.id}`);
    if (timerEl) timerEl.setAttribute("data-ends", a.endsAt);
    // Note: in production, server must validate and broadcast extension to all clients
  }
  refreshAuctionCard(a);
  // In production: POST /api/auctions/:id/bid then update UI on success; handle payment hold via Stripe
}

// update DOM for specific auction (current bid & endsAt)
function refreshAuctionCard(a) {
  const el = document.querySelector(`.auction-card[data-id="${a.id}"]`);
  if (!el) return;
  el.querySelector(".current").textContent = fmt(a.currentBid);
  const timerEl = el.querySelector(".timer");
  if (timerEl) timerEl.setAttribute("data-ends", a.endsAt);
}

// simple simulated realtime incoming bids (demo)
let realtimeInterval;
function startRealtimeDemo() {
  realtimeDemo = true;
  realtimeInterval = setInterval(() => {
    // randomly pick an auction and make a small increment to simulate external bid
    const idx = Math.floor(Math.random() * auctions.length);
    const a = auctions[idx];
    // ignore if ended
    if (a.endsAt <= Date.now()) return;
    const increment = a.minIncrement;
    a.currentBid = a.currentBid + increment;
    // if bid occurs in final 60s, auto-extend too (simulate sniping behavior)
    const remaining = a.endsAt - Date.now();
    if (remaining <= a.autoExtendSeconds * 1000) {
      a.endsAt = Date.now() + a.autoExtendSeconds * 1000;
    }
    refreshAuctionCard(a);
  }, 5000); // every 5s
}
function stopRealtimeDemo() {
  realtimeDemo = false;
  clearInterval(realtimeInterval);
}

// Toggle login UI (demo)
document.getElementById("simulate-login").addEventListener("click", () => {
  loggedIn = !loggedIn;
  const dash = document.querySelector(".nav-dashboard");
  const loginLink = document.querySelector(".login-link");
  const signup = document.querySelector(".signup");
  if (loggedIn) {
    dash.classList.remove("hidden");
    loginLink.textContent = "My Account";
    signup.textContent = "Logout";
  } else {
    dash.classList.add("hidden");
    loginLink.textContent = "Login";
    signup.textContent = "Sign Up";
  }
});

// toggle realtime demo
document.getElementById("simulate-realtime").addEventListener("click", () => {
  if (!realtimeDemo) startRealtimeDemo();
  else stopRealtimeDemo();
});

// sorting & search (client-side demo)
document.getElementById("sort").addEventListener("change", (e) => {
  const v = e.target.value;
  if (v === "ending") {
    auctions.sort((a, b) => a.endsAt - b.endsAt);
  } else if (v === "highest") {
    auctions.sort((a, b) => b.currentBid - a.currentBid);
  } else if (v === "newest") {
    auctions.sort((a, b) => b.endsAt - a.endsAt);
  }
  renderAuctions();
});
document.getElementById("search-btn").addEventListener("click", () => {
  const q = document.getElementById("search").value.trim().toLowerCase();
  const cat = document.getElementById("category-select").value;
  let results = auctions.filter(
    (a) =>
      a.title.toLowerCase().includes(q) || a.location.toLowerCase().includes(q)
  );
  if (cat !== "all") {
    // for demo, category filtering is omitted; integrate categories in API objects
  }
  renderAuctions(results);
});

// initial render
renderAuctions();

/* -------------------------
   Integration guidance (server & realtime)
   -------------------------
- Replace 'auctions' array with fetch('/api/auctions?status=live') and call renderAuctions(data)
- For real-time bid updates, use WebSockets or Pusher:
    server broadcasts { auctionId, newCurrentBid, newEndsAt } -> clients update UI.
- Place bid flow:
    1) User submits bid -> POST /api/auctions/:id/bid { amount } (server validates min increment & reserve)
    2) Server creates payment hold (Stripe PaymentIntent, capture later) or requires pre-authorization
    3) On success, server broadcasts new bid to all clients
- Auto-extend must be enforced server-side; server determines and returns new endsAt to all clients.
*/