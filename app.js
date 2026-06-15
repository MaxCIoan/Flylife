const countrySeed = [
  ["Brazil", "br"], ["Japan", "jp"], ["Canada", "ca"], ["United States", "us"], ["France", "fr"],
  ["Germany", "de"], ["United Kingdom", "gb"], ["Italy", "it"], ["Spain", "es"], ["Mexico", "mx"],
  ["Argentina", "ar"], ["Norway", "no"], ["South Korea", "kr"], ["India", "in"], ["Australia", "au"],
  ["Sweden", "se"], ["Greece", "gr"], ["Turkey", "tr"], ["South Africa", "za"], ["Portugal", "pt"],
  ["Colombia", "co"], ["Venezuela", "ve"], ["Chile", "cl"], ["Finland", "fi"], ["Ireland", "ie"],
  ["Morocco", "ma"], ["Thailand", "th"], ["Vietnam", "vn"], ["Poland", "pl"], ["New Zealand", "nz"],
  ["Estonia", "ee"], ["Georgia", "ge"], ["Bhutan", "bt"], ["Seychelles", "sc"], ["Kyrgyzstan", "kg"],
  ["Albania", "al"], ["Nepal", "np"], ["Barbados", "bb"], ["Moldova", "md"], ["Laos", "la"],
  ["Afghanistan", "af"], ["Algeria", "dz"], ["Andorra", "ad"], ["Angola", "ao"], ["Antigua and Barbuda", "ag"],
  ["Armenia", "am"], ["Austria", "at"], ["Azerbaijan", "az"], ["Bahamas", "bs"], ["Bahrain", "bh"],
  ["Bangladesh", "bd"], ["Belarus", "by"], ["Belgium", "be"], ["Belize", "bz"], ["Benin", "bj"],
  ["Bolivia", "bo"], ["Bosnia and Herzegovina", "ba"], ["Botswana", "bw"], ["Brunei", "bn"], ["Bulgaria", "bg"],
  ["Burkina Faso", "bf"], ["Burundi", "bi"], ["Cambodia", "kh"], ["Cameroon", "cm"], ["Cape Verde", "cv"],
  ["Central African Republic", "cf"], ["Chad", "td"], ["China", "cn"], ["Comoros", "km"], ["Republic of the Congo", "cg"],
  ["Democratic Republic of the Congo", "cd"], ["Costa Rica", "cr"], ["Croatia", "hr"], ["Cuba", "cu"], ["Cyprus", "cy"],
  ["Czechia", "cz"], ["Denmark", "dk"], ["Djibouti", "dj"], ["Dominica", "dm"], ["Dominican Republic", "do"],
  ["Ecuador", "ec"], ["Egypt", "eg"], ["El Salvador", "sv"], ["Equatorial Guinea", "gq"], ["Eritrea", "er"],
  ["Eswatini", "sz"], ["Ethiopia", "et"], ["Fiji", "fj"], ["Gabon", "ga"], ["Gambia", "gm"],
  ["Ghana", "gh"], ["Grenada", "gd"], ["Guatemala", "gt"], ["Guinea", "gn"], ["Guinea-Bissau", "gw"],
  ["Guyana", "gy"], ["Haiti", "ht"], ["Honduras", "hn"], ["Hungary", "hu"], ["Iceland", "is"],
  ["Indonesia", "id"], ["Iran", "ir"], ["Iraq", "iq"], ["Israel", "il"], ["Jamaica", "jm"],
  ["Jordan", "jo"], ["Kazakhstan", "kz"], ["Kenya", "ke"], ["Kiribati", "ki"], ["Kuwait", "kw"],
  ["Latvia", "lv"], ["Lebanon", "lb"], ["Lesotho", "ls"], ["Liberia", "lr"], ["Libya", "ly"],
  ["Liechtenstein", "li"], ["Lithuania", "lt"], ["Luxembourg", "lu"], ["Madagascar", "mg"], ["Malawi", "mw"],
  ["Malaysia", "my"], ["Maldives", "mv"], ["Mali", "ml"], ["Malta", "mt"], ["Marshall Islands", "mh"],
  ["Mauritania", "mr"], ["Mauritius", "mu"], ["Micronesia", "fm"], ["Monaco", "mc"], ["Mongolia", "mn"],
  ["Montenegro", "me"], ["Mozambique", "mz"], ["Myanmar", "mm"], ["Namibia", "na"], ["Nauru", "nr"],
  ["Netherlands", "nl"], ["Nicaragua", "ni"], ["Niger", "ne"], ["Nigeria", "ng"], ["North Macedonia", "mk"],
  ["Oman", "om"], ["Pakistan", "pk"], ["Palau", "pw"], ["Panama", "pa"], ["Papua New Guinea", "pg"],
  ["Paraguay", "py"], ["Peru", "pe"], ["Philippines", "ph"], ["Qatar", "qa"], ["Romania", "ro"],
  ["Russia", "ru"], ["Rwanda", "rw"], ["Saint Kitts and Nevis", "kn"], ["Saint Lucia", "lc"], ["Saint Vincent and the Grenadines", "vc"],
  ["Samoa", "ws"], ["San Marino", "sm"], ["Sao Tome and Principe", "st"], ["Saudi Arabia", "sa"], ["Senegal", "sn"],
  ["Serbia", "rs"], ["Sierra Leone", "sl"], ["Singapore", "sg"], ["Slovakia", "sk"], ["Slovenia", "si"],
  ["Solomon Islands", "sb"], ["Somalia", "so"], ["South Sudan", "ss"], ["Sri Lanka", "lk"], ["Sudan", "sd"],
  ["Suriname", "sr"], ["Switzerland", "ch"], ["Syria", "sy"], ["Taiwan", "tw"], ["Tajikistan", "tj"],
  ["Tanzania", "tz"], ["Timor-Leste", "tl"], ["Togo", "tg"], ["Tonga", "to"], ["Trinidad and Tobago", "tt"],
  ["Tunisia", "tn"], ["Turkmenistan", "tm"], ["Tuvalu", "tv"], ["Uganda", "ug"], ["Ukraine", "ua"],
  ["United Arab Emirates", "ae"], ["Uruguay", "uy"], ["Uzbekistan", "uz"], ["Vanuatu", "vu"], ["Vatican City", "va"],
  ["Yemen", "ye"], ["Zambia", "zm"], ["Zimbabwe", "zw"], ["Kosovo", "xk"], ["Palestine", "ps"],
  ["Puerto Rico", "pr"], ["Hong Kong", "hk"], ["Macau", "mo"], ["Greenland", "gl"], ["Faroe Islands", "fo"],
  ["Bermuda", "bm"], ["Cayman Islands", "ky"], ["Aruba", "aw"], ["Curacao", "cw"], ["Guam", "gu"],
  ["American Samoa", "as"], ["Northern Mariana Islands", "mp"], ["U.S. Virgin Islands", "vi"], ["British Virgin Islands", "vg"], ["Gibraltar", "gi"],
  ["Isle of Man", "im"], ["Jersey", "je"], ["Guernsey", "gg"], ["Cook Islands", "ck"], ["Niue", "nu"],
  ["Anguilla", "ai"], ["Montserrat", "ms"], ["Turks and Caicos Islands", "tc"], ["Falkland Islands", "fk"], ["Saint Helena", "sh"],
  ["Wallis and Futuna", "wf"], ["French Polynesia", "pf"], ["New Caledonia", "nc"], ["Mayotte", "yt"], ["Reunion", "re"]
];

const flags = countrySeed.map(([name, code], index) => ({
  name,
  code,
  tier: Math.min(4, 1 + Math.floor(index / 50))
}));

const ROCKET_MAP_W = 21600;
const ROCKET_MAP_H = 10800;
const ROCKET_TARGET_RADIUS = 86;
const ROCKET_DEPOT_RADIUS = 104;
const ROCKET_OBJECTIVE_SAMPLE_SECONDS = 1;

const ranks = [
  { name: "Rookie", points: 0 },
  { name: "Explorer", points: 3000 },
  { name: "Diplomat", points: 8000 },
  { name: "Cartographer", points: 16000 },
  { name: "Flag Master", points: 30000 }
];

const els = {
  timeLeft: document.querySelector("#timeLeft"),
  combo: document.querySelector("#combo"),
  bestCombo: document.querySelector("#bestCombo"),
  score: document.querySelector("#score"),
  bestScore: document.querySelector("#bestScore"),
  round: document.querySelector("#round"),
  flagRoundGoal: document.querySelector("#flagRoundGoal"),
  flagRoundSetup: document.querySelector("#flagRoundSetup"),
  flagImage: document.querySelector("#flagImage"),
  answers: document.querySelector("#answers"),
  recentList: document.querySelector("#recentList"),
  difficultyBar: document.querySelector("#difficultyBar"),
  rankPoints: document.querySelector("#rankPoints"),
  nextRankPoints: document.querySelector("#nextRankPoints"),
  rankProgress: document.querySelector("#rankProgress"),
  rankName: document.querySelector("#rankName"),
  nextRankName: document.querySelector("#nextRankName"),
  profileName: document.querySelector("#profileName"),
  profileBest: document.querySelector("#profileBest"),
  flagCard: document.querySelector("#flagCard"),
  feedbackBurst: document.querySelector("#feedbackBurst"),
  fireworksCanvas: document.querySelector("#fireworksCanvas"),
  resultScore: document.querySelector("#resultScore"),
  resultSummary: document.querySelector("#resultSummary"),
  correctBreakdown: document.querySelector("#correctBreakdown"),
  mistakeBreakdown: document.querySelector("#mistakeBreakdown"),
  runsTable: document.querySelector("#runsTable"),
  flagRunsTable: document.querySelector("#flagRunsTable"),
  flyRunsTable: document.querySelector("#flyRunsTable"),
  leaderboardTable: document.querySelector("#leaderboardTable"),
  privateApiStatus: document.querySelector("#privateApiStatus"),
  rocketStage: document.querySelector("#rocketStage"),
  rocketCanvas: document.querySelector("#rocketCanvas"),
  rocketTarget: document.querySelector("#rocketTarget"),
  rocketTargetCard: document.querySelector("#rocketTargetCard"),
  rocketTargetFlag: document.querySelector("#rocketTargetFlag"),
  rocketTargetName: document.querySelector("#rocketTargetName"),
  rocketTargetMini: document.querySelector("#rocketTargetMini"),
  rocketTargetMiniFlag: document.querySelector("#rocketTargetMiniFlag"),
  rocketTargetMiniName: document.querySelector("#rocketTargetMiniName"),
  rocketTargetMiniValue: document.querySelector("#rocketTargetMiniValue"),
  rocketDepotCountries: document.querySelector("#rocketDepotCountries"),
  rocketCountryOverlay: document.querySelector("#rocketCountryOverlay"),
  rocketRoundGoal: document.querySelector("#rocketRoundGoal"),
  rocketRoundSetup: document.querySelector("#rocketRoundSetup"),
  rocketRadio: document.querySelector("#rocketRadio"),
  rocketRadioSelect: document.querySelector("#rocketRadioSelect"),
  rocketRadioPrev: document.querySelector("#rocketRadioPrev"),
  rocketRadioPlay: document.querySelector("#rocketRadioPlay"),
  rocketRadioNext: document.querySelector("#rocketRadioNext"),
  rocketRadioMute: document.querySelector("#rocketRadioMute"),
  rocketRadioVolume: document.querySelector("#rocketRadioVolume"),
  rocketEngineVolume: document.querySelector("#rocketEngineVolume"),
  rocketFxVolume: document.querySelector("#rocketFxVolume"),
  profileRocketRadioSelect: document.querySelector("#profileRocketRadioSelect"),
  rocketStartRadio: document.querySelector("#rocketStartRadio"),
  profileRadioVolume: document.querySelector("#profileRadioVolume"),
  profileEngineVolume: document.querySelector("#profileEngineVolume"),
  profileFxVolume: document.querySelector("#profileFxVolume"),
  rocketTutorialOverlay: document.querySelector("#rocketTutorialOverlay"),
  rocketTutorialArrow: document.querySelector("#rocketTutorialArrow"),
  rocketTutorialStep: document.querySelector("#rocketTutorialStep"),
  rocketTutorialTitle: document.querySelector("#rocketTutorialTitle"),
  rocketTutorialText: document.querySelector("#rocketTutorialText"),
  rocketTutorialNext: document.querySelector("#rocketTutorialNext"),
  rocketTime: document.querySelector("#rocketTime"),
  rocketFuel: document.querySelector("#rocketFuel"),
  rocketSpeed: document.querySelector("#rocketSpeed"),
  rocketAltitude: document.querySelector("#rocketAltitude"),
  rocketRound: document.querySelector("#rocketRound"),
  rocketScore: document.querySelector("#rocketScore"),
  rocketTech: document.querySelector("#rocketTech"),
  fuelTechLabel: document.querySelector("#fuelTechLabel"),
  speedTechLabel: document.querySelector("#speedTechLabel"),
  turnTechLabel: document.querySelector("#turnTechLabel"),
  sonarTechLabel: document.querySelector("#sonarTechLabel"),
  techTreeClose: document.querySelector("#techTreeClose"),
  techTreeOverlay: document.querySelector("#techTreeOverlay"),
  techTreeStatus: document.querySelector("#techTreeStatus"),
  pauseResume: document.querySelector("#pauseResume"),
  pauseEndRun: document.querySelector("#pauseEndRun"),
  pauseScanTarget: document.querySelector("#pauseScanTarget"),
  pauseRankList: document.querySelector("#pauseRankList"),
  manualRankList: document.querySelector("#manualRankList"),
  rocketMessage: document.querySelector("#rocketMessage"),
  rocketStart: document.querySelector("#rocketStart"),
  rocketResultOverlay: document.querySelector("#rocketResultOverlay"),
  rocketResultTitle: document.querySelector("#rocketResultTitle"),
  rocketResultSummary: document.querySelector("#rocketResultSummary"),
  rocketResultDetails: document.querySelector("#rocketResultDetails"),
  rocketResultMap: document.querySelector("#rocketResultMap"),
  rocketResultRestart: document.querySelector("#rocketResultRestart"),
  authDialog: document.querySelector("#authDialog"),
  displayNameInput: document.querySelector("#displayNameInput")
};

const storeKey = "flagHunterLocalProfile";
const runTime = 45;
const defaultFlagRounds = 10;
const allowedGameRounds = [10, 15, 20, 50];
let state;
let timer;
let flagQuestionTimeout;
let audioContext;
let fxGain;
let engineGain;
let propOsc;
let propLfo;
let propNoise;
let propNoiseGain;
let propFilter;
let fireworks = [];
let fireworksAnimation;
let rocketState;
let rocketAnimation;
let rocketWorldFeatures = null;
let rocketWorldLoading = false;
let rocketBoundaryLines = null;
let rocketBoundaryLoading = false;
let rocketCatalog = null;
let rocketCatalogLoading = false;
let rocketMapCache = null;
let rocketMiniMapCache = null;
const rocketMiniMapImage = new Image();
const ROCKET_STATIC_CACHE_SNAP = 640;
const ROCKET_HUD_INTERVAL_MS = 120;
const ROCKET_NAV_CHECK_INTERVAL = 0.14;
const ROCKET_TINY_COUNTRY_DOT_MAX = 30;
const rocketEarthImage = new Image();
rocketEarthImage.src = "assets/earth-satellite-nasa-8192.jpg";
rocketEarthImage.addEventListener("load", invalidateRocketMapCache);
rocketMiniMapImage.src = "assets/world-political-minimap.png?v=20260615i";
rocketMiniMapImage.addEventListener("load", () => { rocketMiniMapCache = null; });
let rocketCountryOverlayEnabled = localStorage.getItem("flagHunterRocketCountryOverlay") !== "0";
let officialFlyLeaders = [];
let officialFlyLeadersLoaded = false;
let officialFlyLeadersLoading = false;
let officialFlyLeadersError = false;
const productionFlyApiOrigin = "https://flylifeforlife.netlify.app";
const isItchContext = /(^|\.)itch\.io$/i.test(window.location.hostname)
  || /itch\.io/i.test(document.referrer || "")
  || new URLSearchParams(window.location.search).has("itchStatus");
const isLocalFlyContext = ["", "localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
const flyApiBase = (isItchContext || isLocalFlyContext) ? productionFlyApiOrigin : "";
const blockedRocketCountries = new Set(["Fiji", "Antarctica"]);
const rocketCountryAliases = {
  "United States": "United States of America",
  "DR Congo": "Democratic Republic of the Congo",
  "Congo": "Republic of the Congo",
  "Czechia": "Czech Republic",
  "Serbia": "Republic of Serbia",
  "Tanzania": "United Republic of Tanzania",
  "Bahamas": "The Bahamas",
  "São Tomé and Príncipe": "Sao Tome and Principe",
  "Sao Tome and Principe": "São Tomé and Príncipe",
  "Cape Verde": "Cabo Verde",
  "Eswatini": "Swaziland",
  "North Macedonia": "Macedonia",
  "Timor-Leste": "East Timor",
  "Côte d'Ivoire": "Ivory Coast"
};
const rocketRadioStations = [
  "",
  "https://ice1.somafm.com/groovesalad-128-mp3",
  "https://ice1.somafm.com/deepspaceone-128-mp3",
  "https://ice1.somafm.com/missioncontrol-128-mp3",
  "https://ice1.somafm.com/poptron-128-mp3",
  "https://ice1.somafm.com/secretagent-128-mp3",
  "https://ice1.somafm.com/lush-128-mp3",
  "https://ice1.somafm.com/folkfwd-128-mp3",
  "https://ice1.somafm.com/defcon-128-mp3",
  "https://ice1.somafm.com/cliqhop-128-mp3",
  "https://ice1.somafm.com/dronezone-128-mp3",
  "https://ice1.somafm.com/spacestation-128-mp3",
  "https://ice1.somafm.com/suburbsofgoa-128-mp3"
];

const rocketTechMax = 6;
const rocketTechInfo = {
  fuel: { title: "Fuel Tank", effect: "Lower fuel drain, better starting fuel, and stronger depot refuels." },
  speed: { title: "Engine Boost", effect: "More thrust, higher top speed, and better airbrake control." },
  turn: { title: "Control Fins", effect: "Faster turning, stronger bank control, and better altitude response." },
  sonar: { title: "Sonar", effect: "Timed depot pings, target range ring, and ideal landing data." }
};

const rocketTechSteps = {
  fuel: [
    ["Fuel Sealant", "-3% fuel drain"],
    ["Lean Mix", "+4 route fuel, -5% drain"],
    ["Smart Tank", "+8 route fuel, stronger refuels"],
    ["Depot Coupler", "+10 route fuel, +8 depot fuel"],
    ["Reserve Cell", "+13 route fuel, -10% drain"],
    ["Long Range", "+16 route fuel, best depot returns"]
  ],
  speed: [
    ["Engine Boost", "+180 thrust"],
    ["Aero Tuning", "+120 m/s top speed"],
    ["Propulsion", "+210 thrust"],
    ["Overdrive", "+150 m/s top speed"],
    ["Jet Stream", "+240 thrust"],
    ["Sound Chase", "max speed and airbrake"]
  ],
  turn: [
    ["Gyro Stabilizer", "+0.42 response"],
    ["Control Fins", "+0.48 response"],
    ["Agile Frame", "stronger banking"],
    ["Precision Control", "+0.55 response"],
    ["Bank Assist", "faster recovery"],
    ["Apex Handling", "max turn path"]
  ],
  sonar: [
    ["Sonar Unlock", "depot ping every 60s"],
    ["Sweep Timing", "depot ping every 48s"],
    ["Target Ring", "green range pulse"],
    ["Signal Sort", "depot ping every 36s"],
    ["Approach Readout", "show target ideal range"],
    ["Perfect Readout", "exact speed and altitude ideals"]
  ]
};

const planeClasses = [
  { name: "Propeller Trainer", threshold: 0 },
  { name: "WW2 Warbird", threshold: 5 },
  { name: "1980s Airliner", threshold: 10 },
  { name: "Advanced Airliner", threshold: 15 },
  { name: "AIRBUS Class", threshold: 20 },
  { name: "Private Jet", threshold: 25 },
  { name: "Military Fighter Jet", threshold: 31 }
];

const rocketTargets = [
  rocketTarget("Brazil", -52, -10, 1),
  rocketTarget("Canada", -105, 56, 1),
  rocketTarget("Japan", 138, 37, 1),
  rocketTarget("Norway", 10, 62, 2),
  rocketTarget("Egypt", 30, 27, 2),
  rocketTarget("India", 78, 22, 2),
  rocketTarget("New Zealand", 173, -41, 3),
  rocketTarget("Chile", -71, -30, 3),
  rocketTarget("Madagascar", 47, -20, 3),
  rocketTarget("Iceland", -19, 65, 4),
  rocketTarget("Mongolia", 104, 47, 4)
];

function rocketTarget(name, lon, lat, difficulty) {
  return { name, lon, lat, ...worldPoint(lon, lat), difficulty };
}

function worldPoint(lon, lat, mapW = ROCKET_MAP_W, mapH = ROCKET_MAP_H) {
  return {
    x: (lon + 180) / 360 * mapW,
    y: (90 - lat) / 180 * mapH
  };
}

const mapCountries = [
  { name: "Canada", color: "#5aa477", poly: [[-141,70],[-60,70],[-52,50],[-82,42],[-125,49],[-141,60]] },
  { name: "United States", color: "#69b777", poly: [[-125,49],[-67,49],[-80,25],[-103,25],[-117,32],[-125,42]] },
  { name: "Mexico", color: "#84bd70", poly: [[-117,32],[-86,22],[-92,15],[-105,15],[-116,25]] },
  { name: "Brazil", color: "#3fa86f", poly: [[-74,5],[-35,2],[-38,-34],[-58,-34],[-74,-12]] },
  { name: "Argentina", color: "#63aa74", poly: [[-68,-22],[-53,-26],[-58,-55],[-72,-50]] },
  { name: "Chile", color: "#4b9b77", poly: [[-75,-18],[-68,-18],[-70,-55],[-76,-52]] },
  { name: "Greenland", color: "#9ecfc7", poly: [[-52,80],[-20,73],[-30,60],[-58,61],[-70,72]] },
  { name: "Iceland", color: "#7bbba5", poly: [[-25,66],[-13,66],[-14,63],[-24,63]] },
  { name: "Norway", color: "#78b88b", poly: [[4,70],[28,70],[26,58],[8,58]] },
  { name: "United Kingdom", color: "#74af7f", poly: [[-8,59],[2,57],[1,50],[-7,50]] },
  { name: "France", color: "#82bd77", poly: [[-5,51],[8,50],[7,43],[-2,42],[-5,46]] },
  { name: "Spain", color: "#8bc06d", poly: [[-9,43],[4,43],[2,36],[-8,36]] },
  { name: "Germany", color: "#77b66f", poly: [[6,55],[15,54],[14,48],[7,47]] },
  { name: "Russia", color: "#76ad79", poly: [[30,70],[180,68],[170,45],[120,45],[80,50],[40,48]] },
  { name: "Mongolia", color: "#9fba69", poly: [[87,52],[120,52],[120,42],[88,42]] },
  { name: "China", color: "#83b66b", poly: [[75,42],[122,42],[122,20],[95,18],[78,28]] },
  { name: "Japan", color: "#78b5a0", poly: [[130,45],[146,43],[145,31],[132,32]] },
  { name: "India", color: "#8fbd65", poly: [[68,31],[90,29],[88,8],[76,7],[68,22]] },
  { name: "Egypt", color: "#b9a65d", poly: [[25,32],[36,32],[36,22],[25,22]] },
  { name: "Saudi Arabia", color: "#b8a65f", poly: [[36,31],[56,28],[53,16],[40,13],[34,23]] },
  { name: "South Africa", color: "#7eb56e", poly: [[16,-22],[33,-22],[32,-35],[18,-35]] },
  { name: "Madagascar", color: "#62a878", poly: [[44,-12],[51,-14],[50,-26],[44,-25]] },
  { name: "Australia", color: "#78aa72", poly: [[113,-11],[154,-12],[153,-38],[116,-36],[112,-24]] },
  { name: "New Zealand", color: "#69aa88", poly: [[166,-34],[178,-37],[177,-47],[168,-46]] },
  { name: "Indonesia", color: "#55a879", poly: [[95,5],[141,3],[140,-8],[104,-8]] },
  { name: "Congo", color: "#4fa66d", poly: [[12,4],[30,3],[30,-13],[15,-12]] },
  { name: "Algeria", color: "#a6b467", poly: [[-8,36],[12,34],[12,20],[-6,20]] },
  { name: "Turkey", color: "#93b86a", poly: [[26,42],[45,41],[44,36],[27,36]] }
];

function loadRocketWorldMap() {
  if (rocketWorldFeatures || rocketWorldLoading) return;
  rocketWorldLoading = true;
  fetch("countries.geo.json")
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("World map failed to load")))
    .then((data) => {
      rocketWorldFeatures = data.features
        .map((feature) => normalizeRocketCountry(feature))
        .filter(Boolean);
      invalidateRocketMapCache();
    })
    .catch(() => {
      rocketWorldFeatures = null;
    })
    .finally(() => {
      rocketWorldLoading = false;
    });
}

function loadRocketBoundaryLines() {
  if (rocketBoundaryLines || rocketBoundaryLoading) return;
  rocketBoundaryLoading = true;
  fetch("country-boundaries.geo.json")
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("Country borders failed to load")))
    .then((data) => {
      rocketBoundaryLines = data.features
        .flatMap((feature) => normalizeRocketBoundaryFeature(feature))
        .filter((line) => line.points.length > 1);
      invalidateRocketMapCache();
    })
    .catch(() => {
      rocketBoundaryLines = null;
    })
    .finally(() => {
      rocketBoundaryLoading = false;
    });
}

function loadRocketCatalog() {
  if (rocketCatalog || rocketCatalogLoading) return;
  rocketCatalogLoading = true;
  fetch("rocket-countries.json")
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("Rocket countries failed to load")))
    .then((data) => {
      rocketCatalog = data
        .filter((item) => !blockedRocketCountries.has(item.name) && Number.isFinite(item.lon) && Number.isFinite(item.lat) && item.lat > -60)
        .map((item, index) => ({
          ...item,
          ...worldPoint(item.lon, item.lat),
          capitalPoint: worldPoint(item.capitalLon ?? item.lon, item.capitalLat ?? item.lat),
          difficulty: Math.min(5, 1 + Math.floor(index / 50))
        }));
    })
    .catch(() => {
      rocketCatalog = rocketTargets.map((target) => ({
        ...target,
        capital: "Capital",
        capitalPoint: { x: target.x, y: target.y }
      }));
    })
    .finally(() => {
      rocketCatalogLoading = false;
      invalidateRocketMapCache();
    });
}

function getRocketPool(difficulty) {
  const list = rocketCatalog?.length ? rocketCatalog : rocketTargets;
  return list.filter((target) => !blockedRocketCountries.has(target.name) && (target.lat === undefined || target.lat > -60));
}

function normalizeRocketCountry(feature) {
  if (!feature?.geometry?.coordinates) return null;
  const name = feature.properties?.name || feature.properties?.ADMIN || "Country";
  const rings = [];
  if (feature.geometry.type === "Polygon") {
    feature.geometry.coordinates.forEach((ring) => rings.push(projectRocketRing(ring)));
  } else if (feature.geometry.type === "MultiPolygon") {
    feature.geometry.coordinates.forEach((polygon) => {
      polygon.forEach((ring) => rings.push(projectRocketRing(ring)));
    });
  }
  const validRings = rings.filter((ring) => ring.length > 2);
  if (!validRings.length) return null;
  const bounds = validRings.flat().reduce((box, point) => ({
    minX: Math.min(box.minX, point.x),
    minY: Math.min(box.minY, point.y),
    maxX: Math.max(box.maxX, point.x),
    maxY: Math.max(box.maxY, point.y)
  }), { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
  return {
    name,
    rings: validRings,
    bounds,
    color: rocketCountryColor(name),
    label: {
      x: (bounds.minX + bounds.maxX) / 2,
      y: (bounds.minY + bounds.maxY) / 2
    }
  };
}

function normalizeRocketBoundaryFeature(feature) {
  if (!feature?.geometry?.coordinates) return [];
  const lines = [];
  const pushLine = (coords) => {
    const points = coords.map(([lon, lat]) => worldPoint(lon, lat));
    if (points.some((point, index) => index > 0 && Math.abs(point.x - points[index - 1].x) > rocketState?.mapW * 0.45)) return;
    const bounds = points.reduce((box, point) => ({
      minX: Math.min(box.minX, point.x),
      minY: Math.min(box.minY, point.y),
      maxX: Math.max(box.maxX, point.x),
      maxY: Math.max(box.maxY, point.y)
    }), { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
    lines.push({ points, bounds, type: feature.properties?.TYPE || "" });
  };
  if (feature.geometry.type === "LineString") {
    pushLine(feature.geometry.coordinates);
  } else if (feature.geometry.type === "MultiLineString") {
    feature.geometry.coordinates.forEach(pushLine);
  }
  return lines;
}

function invalidateRocketMapCache() {
  rocketMapCache = null;
  rocketMiniMapCache = null;
}

function rocketTechCost(level) {
  return [2, 4, 6, 8, 10, 12][level] ?? 999;
}

function rocketTechUpgradeCost(kind, level) {
  if (kind === "sonar" && level === 0) return 10;
  return rocketTechCost(level);
}

function getRocketStartingFuelBonus(level = 0) {
  return [0, 1, 4, 8, 12, 16, 22][Math.max(0, Math.min(rocketTechMax, level))] ?? 0;
}

function getRocketFuelDrainMultiplier(level = 0) {
  return Math.max(0.5, 1 - [0, 0.03, 0.05, 0.07, 0.09, 0.10, 0.12][Math.max(0, Math.min(rocketTechMax, level))]);
}

function getRocketSonarInterval(level = 0) {
  if (level <= 0) return Infinity;
  return Math.max(18, 60 - (level - 1) * 8);
}

function makeRocketTargetIdeal() {
  return {
    speed: 18 + Math.floor(Math.random() * 28),
    altitude: 80 + Math.floor(Math.random() * 180),
    toleranceSpeed: 12,
    toleranceAltitude: 75
  };
}

function pointInRocketRing(point, ring) {
  let inside = false;
  for (let index = 0, prev = ring.length - 1; index < ring.length; prev = index, index += 1) {
    const a = ring[index];
    const b = ring[prev];
    const crosses = (a.y > point.y) !== (b.y > point.y);
    if (crosses && point.x < (b.x - a.x) * (point.y - a.y) / ((b.y - a.y) || 1) + a.x) inside = !inside;
  }
  return inside;
}

function pointInRocketCountry(point, country) {
  return country?.rings?.some((ring) => pointInRocketRing(point, ring));
}

function randomPointInRocketCountry(country) {
  if (!country?.bounds) return null;
  const width = country.bounds.maxX - country.bounds.minX;
  const height = country.bounds.maxY - country.bounds.minY;
  const labelPoint = { x: country.label.x, y: country.label.y };
  if (pointInRocketCountry(labelPoint, country)) {
    if (width < 900 || height < 620) return labelPoint;
  }
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const point = {
      x: country.bounds.minX + Math.random() * width,
      y: country.bounds.minY + Math.random() * height
    };
    if (pointInRocketCountry(point, country)) return point;
  }
  return {
    x: (country.bounds.minX + country.bounds.maxX) / 2,
    y: (country.bounds.minY + country.bounds.maxY) / 2
  };
}

function rocketCountryFeature(name) {
  const alias = rocketCountryAliases[name] || name;
  return rocketWorldFeatures?.find((feature) => {
    const featureName = feature.name;
    return featureName === name
      || featureName === alias
      || featureName.replace(/^The /, "") === name
      || featureName.replace(/^The /, "") === alias;
  });
}

function rocketPointForCountry(anchor, options = {}) {
  const country = rocketCountryFeature(anchor?.name);
  const inside = randomPointInRocketCountry(country);
  if (inside) return inside;
  const point = options.preferCapital ? anchor?.capitalPoint || anchor : anchor;
  if (!point) return null;
  return { x: point.x, y: point.y };
}

function projectRocketRing(ring) {
  const points = ring.map(([lon, lat]) => worldPoint(lon, lat));
  const mapW = rocketState?.mapW || ROCKET_MAP_W;
  const warped = points.some((point, index) => {
    if (index === 0) return false;
    const prev = points[index - 1];
    return Math.abs(point.x - prev.x) > mapW * 0.45;
  });
  return warped ? [] : points;
}

function rocketCountryColor(name) {
  const palette = ["#67b77c", "#82bd76", "#6eae91", "#9fbd70", "#78b98c", "#b5af69", "#74b77a", "#58a989"];
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palette[hash % palette.length];
}

function loadProfile() {
  const fallback = {
    displayName: "Guest",
    runs: []
  };
  try {
    const loaded = JSON.parse(localStorage.getItem(storeKey));
    return { ...fallback, ...loaded };
  } catch {
    return fallback;
  }
}

function saveProfile() {
  localStorage.setItem(storeKey, JSON.stringify(profile));
  window.FlagGuard?.syncProfile?.(profile);
}

let profile = loadProfile();

function getFlagUrl(code) {
  return `https://flagcdn.com/w640/${code}.png`;
}

function playTone(type) {
  unlockRocketAudio();
  const now = audioContext.currentTime;
  if (type === "correct") {
    playFutureSuccess(now);
  } else {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    playDoomFailure(now);
  }
}

function synthNote({ frequency, start, duration, type = "sine", gain = 0.08, endFrequency = null, filter = null, pan = 0 }) {
  const osc = audioContext.createOscillator();
  const amp = audioContext.createGain();
  const panner = audioContext.createStereoPanner ? audioContext.createStereoPanner() : null;
  let output = amp;
  osc.type = type;
  osc.frequency.setValueAtTime(Math.max(1, frequency), start);
  if (endFrequency) osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(gain, start + 0.018);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  if (filter) {
    const biquad = audioContext.createBiquadFilter();
    biquad.type = filter.type;
    biquad.frequency.setValueAtTime(filter.frequency, start);
    if (filter.endFrequency) biquad.frequency.exponentialRampToValueAtTime(filter.endFrequency, start + duration);
    output.connect(biquad);
    output = biquad;
  }
  if (panner) {
    panner.pan.setValueAtTime(pan, start);
    output.connect(panner).connect(fxGain);
  } else {
    output.connect(fxGain);
  }
  osc.connect(amp);
  osc.start(start);
  osc.stop(start + duration + 0.03);
}

function playFutureSuccess(startAt) {
  [523, 659, 784, 1046, 1318].forEach((note, index) => {
    synthNote({
      frequency: note,
      endFrequency: note * 1.9,
      start: startAt + index * 0.055,
      duration: 0.19,
      type: index % 2 ? "triangle" : "sawtooth",
      gain: 0.07,
      filter: { type: "bandpass", frequency: 900 + index * 420, endFrequency: 2400 + index * 520 },
      pan: (index - 2) * 0.18
    });
  });
  [196, 392, 784].forEach((note, index) => {
    synthNote({
      frequency: note,
      endFrequency: note * 1.02,
      start: startAt + 0.05,
      duration: 0.72,
      type: "sine",
      gain: 0.035 / (index + 1),
      filter: { type: "lowpass", frequency: 1200, endFrequency: 3600 },
      pan: index === 0 ? -0.2 : index === 2 ? 0.2 : 0
    });
  });
  synthNote({
    frequency: 1800,
    endFrequency: 7600,
    start: startAt + 0.12,
    duration: 0.42,
    type: "triangle",
    gain: 0.045,
    filter: { type: "highpass", frequency: 1200, endFrequency: 4200 }
  });
  playCrackle(startAt + 0.18);
}

function playDoomFailure(startAt) {
  synthNote({
    frequency: 130,
    endFrequency: 34,
    start: startAt,
    duration: 0.72,
    type: "sawtooth",
    gain: 0.22,
    filter: { type: "lowpass", frequency: 780, endFrequency: 130 }
  });
  [420, 360, 295].forEach((note, index) => {
    synthNote({
      frequency: note,
      endFrequency: note * 0.38,
      start: startAt + 0.08 + index * 0.13,
      duration: 0.34,
      type: "square",
      gain: 0.075,
      filter: { type: "bandpass", frequency: note * 2.2, endFrequency: note * 0.9 },
      pan: index === 0 ? -0.25 : index === 2 ? 0.25 : 0
    });
  });
  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.42, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const source = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(900, startAt);
  filter.frequency.exponentialRampToValueAtTime(90, startAt + 0.42);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(0.18, startAt + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.42);
  source.connect(filter).connect(gain).connect(fxGain);
  source.start(startAt);
}

function unlockRocketAudio() {
  audioContext ||= new AudioContext();
  if (!fxGain) {
    fxGain = audioContext.createGain();
    fxGain.connect(audioContext.destination);
  }
  if (!engineGain) {
    engineGain = audioContext.createGain();
    engineGain.connect(audioContext.destination);
  }
  if (audioContext.state === "suspended") audioContext.resume();
  syncRocketAudioVolumes();
}

function syncRocketAudioVolumes() {
  const settings = getRocketAudioSettings();
  if (fxGain) fxGain.gain.setTargetAtTime(settings.fx, audioContext.currentTime, 0.04);
  if (engineGain) engineGain.gain.setTargetAtTime(settings.engine, audioContext.currentTime, 0.04);
  if (els.rocketRadio) {
    els.rocketRadio.volume = settings.radio;
    els.rocketRadio.muted = settings.muted;
  }
}

function getRocketAudioSettings() {
  return {
    radio: Number(localStorage.getItem("flagHunterRadioVolume") ?? els.rocketRadioVolume?.value ?? 0.55),
    engine: Number(localStorage.getItem("flagHunterEngineVolume") ?? els.rocketEngineVolume?.value ?? 0.28),
    fx: Number(localStorage.getItem("flagHunterFxVolume") ?? els.rocketFxVolume?.value ?? 0.72),
    muted: localStorage.getItem("flagHunterRadioMuted") === "1",
    startRadio: localStorage.getItem("flagHunterStartRadio") !== "0"
  };
}

function saveRocketAudioSettings() {
  if (els.rocketRadioVolume) localStorage.setItem("flagHunterRadioVolume", els.rocketRadioVolume.value);
  if (els.rocketEngineVolume) localStorage.setItem("flagHunterEngineVolume", els.rocketEngineVolume.value);
  if (els.rocketFxVolume) localStorage.setItem("flagHunterFxVolume", els.rocketFxVolume.value);
  if (els.profileRadioVolume) localStorage.setItem("flagHunterRadioVolume", els.profileRadioVolume.value);
  if (els.profileEngineVolume) localStorage.setItem("flagHunterEngineVolume", els.profileEngineVolume.value);
  if (els.profileFxVolume) localStorage.setItem("flagHunterFxVolume", els.profileFxVolume.value);
  if (els.rocketStartRadio) localStorage.setItem("flagHunterStartRadio", els.rocketStartRadio.checked ? "1" : "0");
  localStorage.setItem("flagHunterRadioMuted", els.rocketRadio?.muted ? "1" : "0");
}

function selectRocketRadioByValue(value) {
  if (!els.rocketRadioSelect) return false;
  const index = [...els.rocketRadioSelect.options].findIndex((option) => option.value === value);
  if (index < 0) return false;
  selectRocketRadio(index);
  return true;
}

function playApplause(startAt) {
  if (!audioContext) return;
  for (let i = 0; i < 18; i += 1) {
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.045, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let j = 0; j < data.length; j += 1) {
      data[j] = (Math.random() * 2 - 1) * (1 - j / data.length);
    }
    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();
    const delay = Math.random() * 0.55;
    gain.gain.setValueAtTime(0.0001, startAt + delay);
    gain.gain.exponentialRampToValueAtTime(0.11, startAt + delay + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + delay + 0.05);
    source.connect(gain).connect(fxGain);
    source.start(startAt + delay);
  }
}

function playCrackle(startAt) {
  if (!audioContext) return;
  for (let i = 0; i < 28; i += 1) {
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.025, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let j = 0; j < data.length; j += 1) {
      data[j] = (Math.random() * 2 - 1) * (1 - j / data.length);
    }
    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    const delay = Math.random() * 0.8;
    filter.type = "highpass";
    filter.frequency.setValueAtTime(1600 + Math.random() * 2400, startAt + delay);
    gain.gain.setValueAtTime(0.0001, startAt + delay);
    gain.gain.exponentialRampToValueAtTime(0.08, startAt + delay + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + delay + 0.035);
    source.connect(filter).connect(gain).connect(fxGain);
    source.start(startAt + delay);
  }
}

function formatScore(value) {
  return Math.max(0, Math.round(value)).toLocaleString();
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function pickFlag() {
  const allowedTier = Math.min(4, 1 + Math.floor(state.streak / 4));
  const pool = flags.filter((flag) => flag.tier <= allowedTier);
  return pool[Math.floor(Math.random() * pool.length)];
}

function makeChoices(correct) {
  const wrong = shuffle(flags.filter((flag) => flag.name !== correct.name)).slice(0, 3);
  return shuffle([correct, ...wrong]);
}

function showFlagSetup() {
  clearInterval(timer);
  clearTimeout(flagQuestionTimeout);
  state = null;
  showView("play");
  if (els.flagRoundSetup) els.flagRoundSetup.hidden = false;
  if (els.answers) els.answers.innerHTML = "";
  els.flagCard?.classList.remove("is-correct", "is-wrong");
  if (els.feedbackBurst) {
    els.feedbackBurst.textContent = "";
    els.feedbackBurst.className = "feedback-burst";
  }
  if (els.flagImage) {
    els.flagImage.removeAttribute("src");
    els.flagImage.alt = "Current flag";
  }
  if (els.round) els.round.textContent = "0";
  if (els.timeLeft) els.timeLeft.textContent = "0.0s";
  if (els.score) els.score.textContent = "0";
  if (els.combo) els.combo.textContent = "0";
  if (els.flagRoundGoal) els.flagRoundGoal.textContent = defaultFlagRounds;
  renderProfile();
  renderRankLists();
}

function startRun(rounds = defaultFlagRounds) {
  clearInterval(timer);
  clearTimeout(flagQuestionTimeout);
  const desiredRounds = allowedGameRounds.includes(Number(rounds)) ? Number(rounds) : defaultFlagRounds;
  state = {
    time: 0,
    desiredRounds,
    score: 0,
    combo: 0,
    maxCombo: 0,
    round: 0,
    streak: 0,
    recent: [],
    correct: [],
    mistakes: [],
    current: null,
    questionStartedAt: Date.now(),
    accepting: true,
    startedAt: Date.now()
  };
  showView("play");
  if (els.flagRoundSetup) els.flagRoundSetup.hidden = true;
  nextQuestion();
  timer = setInterval(tick, 100);
}

function tick() {
  if (!state?.accepting) return;
  state.time = (Date.now() - state.questionStartedAt) / 1000;
  renderStats();
}

function nextQuestion() {
  state.accepting = true;
  state.time = 0;
  state.current = pickFlag();
  state.round += 1;
  state.questionStartedAt = Date.now();
  els.flagCard.classList.remove("is-correct", "is-wrong");
  els.feedbackBurst.textContent = "";
  els.feedbackBurst.className = "feedback-burst";
  els.flagImage.src = getFlagUrl(state.current.code);
  els.flagImage.alt = `${state.current.name} flag`;
  els.answers.innerHTML = "";
  makeChoices(state.current).forEach((flag) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = flag.name;
    button.addEventListener("click", () => answer(flag, button));
    els.answers.append(button);
  });
  renderStats();
}

function answer(choice, button) {
  if (!state.accepting) return;
  state.accepting = false;
  const correct = choice.name === state.current.name;
  const decisionMs = Math.max(100, Date.now() - state.questionStartedAt);
  const responseTime = decisionMs / 1000;
  const base = 220 + state.current.tier * 70;
  const comboBonus = state.combo * 18;
  const timeBonus = Math.max(25, Math.round(160 / responseTime));
  const delta = correct ? base + comboBonus + timeBonus : -Math.max(280, Math.round(state.score * 0.18));

  button.classList.add(correct ? "correct" : "wrong");
  els.flagCard.classList.add(correct ? "is-correct" : "is-wrong");
  els.feedbackBurst.textContent = correct ? "✓" : "DOOM";
  els.feedbackBurst.classList.add(correct ? "good" : "bad");
  playTone(correct ? "correct" : "wrong");

  if (correct) {
    launchFireworks();
    state.combo += 1;
    state.streak += 1;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
    state.score += delta;
    state.correct.push({ ...state.current, points: delta, decisionMs });
  } else {
    state.combo = 0;
    state.streak = 0;
    state.score = Math.max(0, state.score + delta);
    state.mistakes.push({ ...state.current, picked: choice.name, points: delta, decisionMs });
  }

  state.recent.unshift({ ...state.current, correct, picked: choice.name, decisionMs });
  state.recent = state.recent.slice(0, 5);
  renderStats();
  renderRecent();
  if (state.round >= state.desiredRounds) {
    flagQuestionTimeout = setTimeout(endRun, 520);
  } else {
    flagQuestionTimeout = setTimeout(nextQuestion, 520);
  }
}

function launchFireworks() {
  const canvas = els.fireworksCanvas;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  resizeFireworksCanvas();
  const colors = ["#45f875", "#19c3ff", "#b35cff", "#ffd33d", "#ff7ad9", "#ffffff"];
  fireworks = fireworks.slice(-90);
  for (let i = 0; i < 2; i += 1) {
    const targetX = rect.width * (0.28 + Math.random() * 0.44);
    const targetY = rect.height * (0.18 + Math.random() * 0.22);
    fireworks.push({
      type: "rocket",
      x: rect.width * (0.18 + Math.random() * 0.64),
      y: rect.height + 16,
      vx: (targetX - rect.width / 2) * 0.006 + (Math.random() - 0.5) * 1.8,
      vy: -10 - Math.random() * 3,
      targetY,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 46,
      size: 3
    });
  }
  if (!fireworksAnimation) animateFireworks();
}

function burstFirework(rocket) {
  const colors = ["#45f875", "#19c3ff", "#b35cff", "#ffd33d", "#ff7ad9", "#ffffff"];
  for (let i = 0; i < 18; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 5.8;
    fireworks.push({
      type: "spark",
      x: rocket.x,
      y: rocket.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 24 + Math.random() * 18,
      size: 1.4 + Math.random() * 2.4
    });
  }
  fireworks = fireworks.slice(-120);
}

function animateFireworks() {
  const canvas = els.fireworksCanvas;
  const ctx = canvas.getContext("2d");
  resizeFireworksCanvas();
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.globalCompositeOperation = "source-over";

  fireworks = fireworks.filter((particle) => particle.life > 0);
  fireworks.forEach((particle) => {
    particle.life -= 1;
    if (particle.type === "rocket") {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.16;
      if (particle.y <= particle.targetY || particle.vy >= -0.5) {
        particle.life = 0;
        burstFirework(particle);
      }
    } else {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.985;
      particle.vy += 0.12;
      particle.size *= 0.985;
    }
    const alpha = Math.max(0, Math.min(1, particle.life / 34));
    ctx.beginPath();
    ctx.fillStyle = hexToRgba(particle.color, alpha);
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });

  if (fireworks.length) {
    fireworksAnimation = requestAnimationFrame(animateFireworks);
  } else {
    fireworksAnimation = null;
    ctx.clearRect(0, 0, rect.width, rect.height);
  }
}

function resizeFireworksCanvas() {
  const canvas = els.fireworksCanvas;
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.floor(rect.width * ratio);
  const height = Math.floor(rect.height * ratio);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
}

function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const number = parseInt(value, 16);
  const r = (number >> 16) & 255;
  const g = (number >> 8) & 255;
  const b = number & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function endRun() {
  clearInterval(timer);
  clearTimeout(flagQuestionTimeout);
  if (!state) return;
  state.accepting = false;
  const run = {
    id: crypto.randomUUID(),
    displayName: profile.displayName || "Guest",
    createdAt: new Date().toISOString(),
    score: Math.round(state.score),
    elapsedMs: Math.max(0, Date.now() - state.startedAt),
    rounds: state.round,
    correct: state.correct,
    mistakes: state.mistakes,
    maxCombo: state.maxCombo,
    levelReached: Math.min(4, 1 + Math.floor(state.maxCombo / 4))
  };
  profile.runs = [run, ...(profile.runs || [])].slice(0, 50);
  saveProfile();
  renderResult(run);
  renderProfile();
  renderTables();
  showView("results");
}

function saveRocketSessionResult(title, summary) {
  if (!rocketState || rocketState.sessionSaved) return null;
  rocketState.sessionSaved = true;
  const completedRounds = rocketState.roundLogs.filter((log) => log.success).length;
  const planeClass = getPlaneClass({ tech: rocketState.tech, telemetry: rocketState.telemetry }).name;
  const session = {
    id: crypto.randomUUID(),
    mode: "rocket",
    displayName: profile.displayName || "Guest",
    createdAt: new Date().toISOString(),
    title,
    summary,
    score: Math.round(rocketState.score),
    selectedRounds: rocketState.desiredRounds,
    rounds: rocketState.desiredRounds,
    mapW: rocketState.mapW,
    mapH: rocketState.mapH,
    completedRounds,
    longestRun: rocketState.roundLogs.length,
    fuel: rocketState.fuel,
    techPoints: rocketState.techPoints,
    tech: { ...rocketState.tech },
    telemetry: { ...(rocketState.telemetry || {}) },
    planeClass,
    logs: rocketState.roundLogs.map((log) => ({
      ...log,
      trace: (log.trace || []).slice(-260),
      landings: (log.landings || []).slice(0, 8)
    }))
  };
  window.FlagGuard?.finishRun?.(session).then((officialResult) => {
    if (officialResult) {
      session.officialResult = officialResult;
      saveProfile();
      refreshOfficialFlyLeaderboard();
      renderTables();
    }
  });
  profile.rocketRuns = [session, ...(profile.rocketRuns || [])].slice(0, 40);
  saveProfile();
  renderTables();
  return session;
}

function renderStats() {
  if (!state) return;
  const best = getBestRun();
  const rankScore = Math.max(getBestOverallScore(), state?.score || 0);
  const rank = getRank(rankScore);
  const next = ranks[Math.min(ranks.length - 1, rank.index + 1)];
  const points = rankScore;
  const progress = next.points === rank.points ? 100 : ((points - rank.points) / (next.points - rank.points)) * 100;

  els.timeLeft.textContent = `${state.time.toFixed(1)}s`;
  els.combo.textContent = state.combo;
  els.bestCombo.textContent = Math.max(state.maxCombo, ...profile.runs.map((run) => run.maxCombo || 0));
  els.score.textContent = formatScore(state.score);
  els.bestScore.textContent = formatScore(best?.score || 0);
  els.round.textContent = state.round;
  if (els.flagRoundGoal) els.flagRoundGoal.textContent = state.desiredRounds || defaultFlagRounds;
  els.difficultyBar.style.width = `${Math.min(100, 20 + state.streak * 8)}%`;
  els.rankPoints.textContent = formatScore(points);
  els.nextRankPoints.textContent = formatScore(next.points);
  els.rankProgress.style.width = `${Math.max(0, Math.min(100, progress))}%`;
  els.rankName.textContent = rank.name;
  els.nextRankName.textContent = next.name;
}

function renderRecent() {
  els.recentList.innerHTML = "";
  state.recent.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="flag-mini"><img src="${getFlagUrl(item.code)}" alt="">${item.name}</span>
      <span class="${item.correct ? "status-ok" : "status-bad"}">${item.correct ? "✓" : "×"}</span>
    `;
    els.recentList.append(li);
  });
}

function renderResult(run) {
  els.resultScore.textContent = formatScore(run.score);
  els.resultSummary.textContent = `${run.correct.length} correct, ${run.mistakes.length} mistakes, max combo x${run.maxCombo}.`;
  renderBreakdown(els.correctBreakdown, run.correct, (item) => `+${formatScore(item.points)}`);
  renderBreakdown(els.mistakeBreakdown, run.mistakes, (item) => `${countryLabelHtml(item.picked)} (${formatScore(item.points)})`);
}

function renderBreakdown(target, items, meta) {
  target.innerHTML = "";
  if (!items.length) {
    target.innerHTML = "<li>No entries</li>";
    return;
  }
  items.slice(0, 12).forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${countryLabelHtml(item.name)}<span>${meta(item)}</span>`;
    target.append(li);
  });
}

function renderTables() {
  const runs = (profile.runs || [])
    .slice()
    .sort(compareFlagRuns);
  const rocketRuns = (profile.rocketRuns || [])
    .slice()
    .sort((a, b) => (b.score || 0) - (a.score || 0) || (b.longestRun || 0) - (a.longestRun || 0) || new Date(b.createdAt) - new Date(a.createdAt));
  const flagTable = els.flagRunsTable || els.runsTable;
  const flyTable = els.flyRunsTable;

  if (flagTable) flagTable.innerHTML = runs.length ? "" : `<tr><td colspan="7">No Speed Flags runs yet.</td></tr>`;
  runs.forEach((run) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(run.displayName || "Guest")}</td>
      <td>${formatScore(run.score)}</td>
      <td>${run.mistakes.length}</td>
      <td>${formatScore(getRunPenalty(run))}</td>
      <td>${formatDuration(run.elapsedMs)}</td>
      <td>${run.correct.length}</td>
      <td>x${run.maxCombo}</td>
    `;
    flagTable?.append(row);
  });

  if (flyTable) flyTable.innerHTML = rocketRuns.length ? "" : `<tr><td colspan="7">No Fly runs yet.</td></tr>`;
  rocketRuns.forEach((run) => {
    const row = document.createElement("tr");
    row.className = "clickable-row";
    row.tabIndex = 0;
    row.innerHTML = `
      <td>${new Date(run.createdAt).toLocaleString()}</td>
      <td>${formatScore(run.score)}</td>
      <td>${escapeHtml(run.planeClass || getPlaneClass(run).name)}</td>
      <td>${run.selectedRounds || run.rounds} rounds</td>
      <td>${run.completedRounds || 0} reached</td>
      <td>${Math.max(0, (run.longestRun || 0) - (run.completedRounds || 0))} missed</td>
      <td><button class="mini-btn" type="button">Open</button></td>
    `;
    row.addEventListener("click", () => toggleRunDetails(row, run, 7, "rocket-run"));
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleRunDetails(row, run, 7, "rocket-run");
      }
    });
    flyTable?.append(row);
  });

  const leaderboardEntries = buildOfficialLeaderboardEntries(officialFlyLeaders);
  if (!els.leaderboardTable) return;
  els.leaderboardTable.innerHTML = leaderboardEntries.length ? "" : `<tr class="table-empty"><td colspan="9">${officialFlyLeadersLoading ? "Loading official Fly scores..." : officialFlyLeadersError ? "Official leaderboard is offline right now." : "No official Fly scores yet."}</td></tr>`;
  leaderboardEntries.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.className = "clickable-row leaderboard-row";
    row.tabIndex = 0;
    row.innerHTML = `
      <td><span class="rank-badge">#${index + 1}</span></td>
      <td><span class="leader-name">${escapeHtml(entry.displayName || "Guest")}</span></td>
      <td class="score-cell">${formatScore(entry.score)}</td>
      <td>${entry.roundsLabel}</td>
      <td>${entry.reachedLabel}</td>
      <td>${entry.plane || "Unlisted"}</td>
      <td>${entry.durationLabel}</td>
      <td class="muted-cell">${entry.submittedLabel}</td>
      <td><button class="mini-btn" type="button">View</button></td>
    `;
    row.addEventListener("click", () => toggleRunDetails(row, entry.run, 9, "official-fly"));
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleRunDetails(row, entry.run, 9, "official-fly");
      }
    });
    els.leaderboardTable.append(row);
  });
}

function buildLocalLeaderboardEntries(flagRuns, flyRuns, officialFlyRuns = []) {
  const flagEntries = buildLeaderboardPlayers(flagRuns).map((player) => ({
    type: "flag",
    mode: "Speed Flags",
    displayName: player.displayName,
    score: player.bestScore,
    plane: "",
    result: `${player.bestRun?.correct?.length || 0} correct, ${player.bestRun?.mistakes?.length || 0} errors`,
    details: `Penalty ${formatScore(getRunPenalty(player.bestRun))} / ${formatDuration(player.bestRun?.elapsedMs)}`
  }));
  const flyEntries = (flyRuns || []).map((run) => ({
    type: "fly",
    mode: "Local Fly",
    displayName: run.displayName || "Guest",
    score: run.score || 0,
    plane: escapeHtml(run.planeClass || getPlaneClass(run).name),
    result: `${run.completedRounds || 0}/${run.selectedRounds || run.rounds || 0} reached`,
    details: `<button class="mini-btn" type="button">Open</button>`,
    run
  }));
  const officialFlyEntries = (officialFlyRuns || []).map((run) => ({
    type: "official-fly",
    mode: "Fly",
    displayName: run.displayName || "Guest",
    score: run.finalScore || 0,
    plane: "",
    result: `${run.rounds || 0} rounds`,
    details: run.elapsedMs ? formatDuration(run.elapsedMs) : "Submitted"
  }));
  return [...officialFlyEntries, ...flagEntries, ...flyEntries]
    .sort((a, b) => (b.score || 0) - (a.score || 0) || String(a.mode).localeCompare(String(b.mode)))
    .slice(0, 50);
}

function buildOfficialLeaderboardEntries(officialFlyRuns = []) {
  return (officialFlyRuns || [])
    .map((run) => {
      const selectedRounds = run.selectedRounds || run.rounds || 0;
      const completedRounds = run.completedRounds || 0;
      return {
        type: "official-fly",
        displayName: run.displayName || "Guest",
        score: run.finalScore || 0,
        roundsLabel: selectedRounds ? `${selectedRounds}` : "Unlisted",
        reachedLabel: selectedRounds ? `${completedRounds}/${selectedRounds}` : `${completedRounds}`,
        durationLabel: run.elapsedMs ? formatDuration(run.elapsedMs) : "Unlisted",
        submittedLabel: formatLeaderboardDate(run.finishedAt || run.createdAt),
        plane: escapeHtml(run.planeClass || ""),
        run
      };
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 50);
}

function formatLeaderboardDate(value) {
  if (!value) return "Unlisted";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unlisted";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function setPrivateApiStatus(isOnline) {
  if (!els.privateApiStatus || !isItchContext) return;
  els.privateApiStatus.textContent = isOnline ? "yes" : "no";
  els.privateApiStatus.classList.add("visible");
}

function loadOfficialFlyLeaderboard() {
  if (officialFlyLeadersLoaded) return;
  officialFlyLeadersLoaded = true;
  officialFlyLeadersLoading = true;
  officialFlyLeadersError = false;
  renderTables();
  fetch(`${flyApiBase}/api/fly/leaderboard`)
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("official fly leaderboard unavailable")))
    .then((data) => {
      officialFlyLeaders = Array.isArray(data.leaders) ? data.leaders : [];
      officialFlyLeadersLoading = false;
      officialFlyLeadersError = false;
      setPrivateApiStatus(true);
      renderTables();
    })
    .catch(() => {
      officialFlyLeaders = [];
      officialFlyLeadersLoading = false;
      officialFlyLeadersError = true;
      setPrivateApiStatus(false);
      renderTables();
    });
}

function refreshOfficialFlyLeaderboard() {
  officialFlyLeadersLoaded = false;
  loadOfficialFlyLeaderboard();
}

function toggleRunDetails(row, data, columns, type = "run") {
  const next = row.nextElementSibling;
  if (next?.classList.contains("run-detail-row")) {
    next.remove();
    row.classList.remove("expanded");
    return;
  }
  document.querySelectorAll(".run-detail-row").forEach((detail) => detail.remove());
  document.querySelectorAll(".clickable-row.expanded").forEach((openRow) => openRow.classList.remove("expanded"));
  const detail = document.createElement("tr");
  detail.className = "run-detail-row";
  detail.innerHTML = `<td colspan="${columns}">${type === "leaderboard" ? renderPlayerDetails(data) : type === "rocket-run" ? renderRocketRunDetails(data) : type === "official-fly" ? renderOfficialFlyDetails(data) : renderRunDetails(data)}</td>`;
  row.classList.add("expanded");
  row.after(detail);
  if (type === "rocket-run") {
    setupRocketRouteInspector(detail, data);
  }
}

function renderOfficialFlyDetails(run = {}) {
  const selectedRounds = run.selectedRounds || run.rounds || 0;
  const completedRounds = run.completedRounds || 0;
  const submitted = run.finishedAt || run.createdAt;
  return `
    <div class="run-detail-grid leaderboard-detail">
      <section>
        <span>Official Entry</span>
        <strong>${escapeHtml(run.displayName || "Guest")}</strong>
        <small>${submitted ? `Submitted ${new Date(submitted).toLocaleString()}` : "Submission time unavailable."}</small>
      </section>
      <section>
        <span>Final Score</span>
        <strong>${formatScore(run.finalScore || 0)}</strong>
        <small>${completedRounds}/${selectedRounds || 0} destinations reached.</small>
      </section>
      <section>
        <span>Plane</span>
        <strong>${escapeHtml(run.planeClass || "Unlisted")}</strong>
        <small>Flight time: ${run.elapsedMs ? formatDuration(run.elapsedMs) : "Unlisted"}.</small>
      </section>
    </div>
  `;
}

function renderRocketRunDetails(run) {
  const bestRound = (run.logs || []).filter((log) => log.success).sort((a, b) => b.score - a.score)[0];
  const failed = (run.logs || []).filter((log) => !log.success).length;
  const logs = run.logs || [];
  return `
    <div class="run-detail-grid">
      <section>
        <span>Rocket Session</span>
        <strong>${run.longestRun || 0}/${run.selectedRounds || run.rounds} rounds</strong>
        <small>${escapeHtml(run.title || "Flight session")} - ${failed} missed/failed rounds</small>
      </section>
      <section>
        <span>Final Score</span>
        <strong>${formatScore(run.score || 0)}</strong>
        <small>Plane: ${escapeHtml(run.planeClass || getPlaneClass(run).name)}. Class: ${run.selectedRounds || run.rounds} rounds. Fuel left: ${(run.fuel || 0).toFixed(0)}%.</small>
      </section>
      <section>
        <span>Best Destination</span>
        <strong>${bestRound ? escapeHtml(bestRound.target) : "No destination reached"}</strong>
        <small>${bestRound ? `${Math.max(0, bestRound.time).toFixed(1)}s left` : "Reach a destination country to set a best result."}</small>
      </section>
    </div>
    <div class="rocket-route-inspector" data-rocket-route-inspector>
      <div class="rocket-route-toolbar" data-rocket-route-buttons>
        <button type="button" class="selected" data-route-index="all">All Routes</button>
        ${logs.map((log, index) => `<button type="button" data-route-index="${index}">R${log.round}</button>`).join("")}
      </div>
      <canvas class="rocket-session-map" data-rocket-session-map width="900" height="340" aria-label="Saved rocket route map"></canvas>
      <div class="rocket-route-meta" data-rocket-route-meta></div>
    </div>
  `;
}

function renderRunDetails(run) {
  const allAnswers = [...(run.correct || []), ...(run.mistakes || [])];
  const wrongSummary = summarizeMistakes(run.mistakes || []);
  const slowest = allAnswers
    .filter((item) => Number.isFinite(item.decisionMs))
    .sort((a, b) => b.decisionMs - a.decisionMs)[0];
  const avgMs = allAnswers.length
    ? allAnswers.reduce((sum, item) => sum + (item.decisionMs || 0), 0) / allAnswers.length
    : 0;

  return `
    <div class="run-detail-grid">
      <section>
        <span>Most Wrong</span>
        <strong>${wrongSummary ? `${escapeHtml(wrongSummary.name)} (${wrongSummary.count}x)` : "No mistakes"}</strong>
        <small>${wrongSummary?.picked ? `Often picked: ${escapeHtml(wrongSummary.picked)}` : "Clean run on wrong-answer stats."}</small>
      </section>
      <section>
        <span>Longest Decision</span>
        <strong>${slowest ? `${escapeHtml(slowest.name)} - ${formatSeconds(slowest.decisionMs)}` : "No timing data"}</strong>
        <small>Average decision: ${avgMs ? formatSeconds(avgMs) : "No timing data"}</small>
      </section>
      <section>
        <span>Score Movement</span>
        <strong>${formatScore((run.correct || []).reduce((sum, item) => sum + (item.points || 0), 0))} earned</strong>
        <small>${formatScore(Math.abs((run.mistakes || []).reduce((sum, item) => sum + (item.points || 0), 0)))} lost to mistakes</small>
      </section>
    </div>
  `;
}

function buildLeaderboardPlayers(runs) {
  const players = new Map();
  runs.forEach((run) => {
    const key = run.displayName || "Guest";
    const current = players.get(key) || {
      displayName: key,
      runs: [],
      bestScore: 0,
      bestRun: null,
      lastPlayed: run.createdAt
    };
    current.runs.push(run);
    if (!current.bestRun || compareFlagRuns(run, current.bestRun) < 0) {
      current.bestRun = run;
      current.bestScore = run.score || 0;
    }
    current.lastPlayed = new Date(run.createdAt) > new Date(current.lastPlayed) ? run.createdAt : current.lastPlayed;
    players.set(key, current);
  });
  return [...players.values()]
    .map((player) => ({
      ...player,
      rank: getRank(player.bestScore),
      bestCountry: getBestCountry(player.runs)
    }))
    .sort((a, b) => compareFlagRuns(a.bestRun, b.bestRun));
}

function compareFlagRuns(a, b) {
  return (b.score || 0) - (a.score || 0)
    || (a.mistakes?.length || 0) - (b.mistakes?.length || 0)
    || getRunPenalty(a) - getRunPenalty(b)
    || (a.elapsedMs || Number.MAX_SAFE_INTEGER) - (b.elapsedMs || Number.MAX_SAFE_INTEGER)
    || new Date(b.createdAt) - new Date(a.createdAt);
}

function getRunPenalty(run = {}) {
  return Math.abs((run.mistakes || []).reduce((sum, item) => sum + (item.points || 0), 0));
}

function formatDuration(ms) {
  const seconds = Math.max(0, Math.round((Number(ms) || runTime * 1000) / 1000));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function countryLabelHtml(name) {
  const country = flags.find((flag) => flag.name === name);
  const flag = country ? `<img src="${getFlagUrl(country.code)}" alt="">` : "";
  return `<span class="flag-mini">${flag}${escapeHtml(name)}</span>`;
}

function renderPlayerDetails(player) {
  const averageScore = player.runs.length
    ? player.runs.reduce((sum, run) => sum + (run.score || 0), 0) / player.runs.length
    : 0;
  const bestFlag = player.bestCountry?.code ? getFlagUrl(player.bestCountry.code) : "";
  return `
    <div class="run-detail-grid leaderboard-detail">
      <section class="player-face-card">
        <span>Profile</span>
        <strong>${escapeHtml(player.displayName || "Guest")}</strong>
        <small>Official Fly player</small>
      </section>
      <section>
        <span>Games Played</span>
        <strong>${player.runs.length}</strong>
        <small>Average score: ${formatScore(averageScore)}</small>
      </section>
      <section>
        <span>Best Country</span>
        <strong>${player.bestCountry ? `<span class="detail-flag"><img src="${bestFlag}" alt="">${escapeHtml(player.bestCountry.name)}</span>` : "No clean favorite"}</strong>
        <small>${player.bestCountry ? `${player.bestCountry.correct} correct, ${player.bestCountry.accuracy}% accuracy` : "Needs more answers."}</small>
      </section>
      <section>
        <span>Public Rank</span>
        <strong><span class="rank-chip">${escapeHtml(player.rank.name)}</span></strong>
        <small>Best score: ${formatScore(player.bestScore)}</small>
      </section>
    </div>
  `;
}

function getBestCountry(runs) {
  const countries = new Map();
  runs.forEach((run) => {
    (run.correct || []).forEach((item) => {
      const current = countries.get(item.name) || { name: item.name, correct: 0, wrong: 0 };
      current.correct += 1;
      countries.set(item.name, current);
    });
    (run.mistakes || []).forEach((item) => {
      const current = countries.get(item.name) || { name: item.name, correct: 0, wrong: 0 };
      current.wrong += 1;
      countries.set(item.name, current);
    });
  });
  const best = [...countries.values()]
    .filter((country) => country.correct > 0)
    .sort((a, b) => b.correct - a.correct || (a.wrong / (a.correct + a.wrong)) - (b.wrong / (b.correct + b.wrong)))[0];
  if (!best) return null;
  const total = best.correct + best.wrong;
  const flag = flags.find((item) => item.name === best.name);
  return { ...best, code: flag?.code, accuracy: Math.round((best.correct / total) * 100) };
}

function labelFromValue(value) {
  return String(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function summarizeMistakes(mistakes) {
  if (!mistakes.length) return null;
  const counts = new Map();
  mistakes.forEach((mistake) => {
    const current = counts.get(mistake.name) || { name: mistake.name, count: 0, picked: new Map() };
    current.count += 1;
    current.picked.set(mistake.picked, (current.picked.get(mistake.picked) || 0) + 1);
    counts.set(mistake.name, current);
  });
  const top = [...counts.values()].sort((a, b) => b.count - a.count)[0];
  const picked = [...top.picked.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  return { name: top.name, count: top.count, picked };
}

function formatSeconds(ms) {
  return `${(ms / 1000).toFixed(2)}s`;
}

function renderProfile() {
  const best = getBestRun();
  if (els.profileName) els.profileName.textContent = profile.displayName || "Guest";
  if (els.profileBest) els.profileBest.textContent = formatScore(getBestOverallScore());
  if (els.displayNameInput) els.displayNameInput.value = profile.displayName === "Guest" ? "" : profile.displayName;
  syncProfileControls();
  renderRankLists();
}

function getBestRun() {
  return [...(profile.runs || [])].sort((a, b) => b.score - a.score)[0];
}

function getBestOverallScore() {
  const flagBest = Math.max(0, ...(profile.runs || []).map((run) => Number(run.score) || 0));
  const flyBest = Math.max(0, ...(profile.rocketRuns || [])
    .filter((run) => run.source !== "agent-simulation")
    .map((run) => Number(run.score) || 0));
  return Math.max(flagBest, flyBest);
}

function getPlaneClass(input = {}) {
  const tech = input.tech || {};
  const peakSpeed = Number(input.peakSpeed ?? input.telemetry?.peakSpeed ?? 0);
  const peakAccel = Number(input.peakAccel ?? input.telemetry?.peakAccel ?? 0);
  const peakDecel = Number(input.peakDecel ?? input.telemetry?.peakDecel ?? 0);
  const peakTurn = Number(input.peakTurn ?? input.telemetry?.peakTurn ?? 0);
  const turn = Number(tech.turn || 0);
  const speed = Number(tech.speed || 0);
  const fuel = Number(tech.fuel || 0);
  const score = speed * 4 + turn * 2.2 + fuel * 1.2 + peakSpeed / 240 + peakAccel / 500 + peakDecel / 520 + peakTurn * 0.9;
  return [...planeClasses].reverse().find((plane) => score >= plane.threshold) || planeClasses[0];
}

function getBestPlaneClass() {
  return (profile.rocketRuns || [])
    .filter((run) => run.source !== "agent-simulation")
    .map((run) => run.planeClass || getPlaneClass(run).name)
    .sort((a, b) => Math.max(0, planeClasses.findIndex((plane) => plane.name === b)) - Math.max(0, planeClasses.findIndex((plane) => plane.name === a)))[0] || planeClasses[0].name;
}

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6D2B79F5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function makeSimulationStart(target, rand) {
  let start = { x: 0, y: 0 };
  let guard = 0;
  do {
    guard += 1;
    start = {
      x: 320 + rand() * (ROCKET_MAP_W - 640),
      y: 260 + rand() * (ROCKET_MAP_H - 520)
    };
  } while (guard < 80 && Math.hypot(start.x - target.x, start.y - target.y) < 2100);
  return start;
}

function makeSimulationWaypoint(start, target, rand, style) {
  const distance = Math.hypot(start.x - target.x, start.y - target.y);
  if (style === "new" || rand() < 0.38) {
    return {
      x: 320 + rand() * (ROCKET_MAP_W - 640),
      y: 260 + rand() * (ROCKET_MAP_H - 520)
    };
  }
  const mid = {
    x: start.x + (target.x - start.x) * (0.42 + rand() * 0.24),
    y: start.y + (target.y - start.y) * (0.42 + rand() * 0.24)
  };
  const offset = (style === "pro" ? 0.18 : 0.34) * distance;
  return {
    x: Math.max(180, Math.min(ROCKET_MAP_W - 180, mid.x + (rand() - 0.5) * offset)),
    y: Math.max(180, Math.min(ROCKET_MAP_H - 180, mid.y + (rand() - 0.5) * offset))
  };
}

function makeSimulatedTrace(start, target, rand, style) {
  const trace = [];
  const points = style === "new" ? 46 : style === "pro" ? 34 : 40;
  const wander = style === "new" ? 760 : style === "pro" ? 260 : 430;
  const waypoint = makeSimulationWaypoint(start, target, rand, style);
  for (let index = 0; index < points; index += 1) {
    const t = index / Math.max(1, points - 1);
    const legT = t < 0.55 ? t / 0.55 : (t - 0.55) / 0.45;
    const from = t < 0.55 ? start : waypoint;
    const to = t < 0.55 ? waypoint : target;
    const curve = Math.sin(t * Math.PI * (style === "new" ? 3.2 : style === "pro" ? 1.3 : 1.8));
    trace.push({
      x: Math.max(0, Math.min(ROCKET_MAP_W, from.x + (to.x - from.x) * legT + curve * wander + (rand() - 0.5) * wander * 0.28)),
      y: Math.max(0, Math.min(ROCKET_MAP_H, from.y + (to.y - from.y) * legT + Math.cos(t * Math.PI * 2) * wander * 0.34 + (rand() - 0.5) * wander * 0.22))
    });
  }
  return trace;
}

function makeSimulatedFlyAgentRuns() {
  const rand = seededRandom(20260613);
  const personas = [
    {
      name: "Agent New Pilot",
      style: "new",
      rounds: 10,
      completed: 4,
      missedReasons: ["forgot destination", "landed outside country", "ran low on fuel"],
      tech: { fuel: 0, speed: 1, turn: 0 },
      telemetry: { peakSpeed: 430, peakAccel: 530, peakDecel: 360, peakTurn: 1.2 },
      scoreRange: [1900, 3800]
    },
    {
      name: "Agent Conservative",
      style: "conservative",
      rounds: 10,
      completed: 7,
      missedReasons: ["hard location missed", "too slow for timer", "uncertain destination"],
      tech: { fuel: 2, speed: 1, turn: 2 },
      telemetry: { peakSpeed: 590, peakAccel: 640, peakDecel: 420, peakTurn: 2.4 },
      scoreRange: [4300, 7100]
    },
    {
      name: "Agent Pro Pilot",
      style: "pro",
      rounds: 10,
      completed: 10,
      missedReasons: [],
      tech: { fuel: 2, speed: 5, turn: 4 },
      telemetry: { peakSpeed: 1190, peakAccel: 980, peakDecel: 760, peakTurn: 4.8 },
      scoreRange: [7600, 11200]
    }
  ];
  const sourceTargets = getRocketPool(4);
  const createdAtBase = Date.now();
  return personas.map((persona, personaIndex) => {
    let score = 0;
    const logs = Array.from({ length: persona.rounds }, (_, index) => {
      const target = sourceTargets[(personaIndex * 7 + index * 5) % sourceTargets.length];
      const start = makeSimulationStart(target, rand);
      const success = index < persona.completed;
      const roundScore = success
        ? Math.round(persona.scoreRange[0] + rand() * (persona.scoreRange[1] - persona.scoreRange[0]))
        : -850;
      score = Math.max(0, score + roundScore);
      const fuel = Math.max(0, Math.min(100, 92 - index * (persona.style === "new" ? 8.5 : persona.style === "pro" ? 3.2 : 5.4) + (success ? 10 : -8)));
      const depotStop = success && (persona.style === "pro" ? index % 2 === 1 : persona.style === "conservative" ? index % 3 === 2 : index === 2);
      return {
        round: index + 1,
        target: target.name,
        flag: target.flag || "",
        targetX: target.x,
        targetY: target.y,
        success,
        reason: success ? "simulation destination reached" : persona.missedReasons[index % Math.max(1, persona.missedReasons.length)] || "missed",
        score: Math.max(0, score),
        scoreEvents: success ? [
          { round: index + 1, type: "Simulated destination landing", points: Math.max(80, Math.round(roundScore * 0.58)), detail: "persona route model" },
          { round: index + 1, type: "Route bonus", points: Math.max(120, Math.round(roundScore * 0.42)), detail: "simulated timer + fuel + difficulty" }
        ] : [],
        fuel,
        time: success ? (persona.style === "pro" ? 28 + rand() * 20 : persona.style === "conservative" ? 12 + rand() * 18 : 4 + rand() * 12) : 0,
        trace: makeSimulatedTrace(start, target, rand, persona.style),
        landings: depotStop ? [{
          depot: `Sim Depot ${index + 1}`,
          km: Math.round(20 + rand() * 180),
          dist: 8 + rand() * 44,
          speed: persona.style === "pro" ? 360 + rand() * 170 : persona.style === "conservative" ? 160 + rand() * 160 : 90 + rand() * 180,
          altitude: persona.style === "pro" ? 120 + rand() * 420 : 80 + rand() * 760,
          points: persona.style === "pro" ? 1600 + Math.round(rand() * 900) : 700 + Math.round(rand() * 800),
          success: true
        }] : []
      };
    });
    const completedScore = Math.max(0, Math.round(logs[logs.length - 1]?.score || 0));
    return {
      id: crypto.randomUUID(),
      mode: "rocket",
      source: "agent-simulation",
      batchId: "agent-test-2026-06-13",
      displayName: persona.name,
      createdAt: new Date(createdAtBase + personaIndex * 1000).toISOString(),
      title: `${persona.name} Simulation`,
      summary: `${persona.completed}/${persona.rounds} destinations reached by ${persona.style} route logic.`,
      score: completedScore,
      selectedRounds: persona.rounds,
      rounds: persona.rounds,
      completedRounds: persona.completed,
      longestRun: persona.rounds,
      fuel: logs[logs.length - 1]?.fuel || 0,
      techPoints: persona.style === "pro" ? 4 : persona.style === "conservative" ? 2 : 0,
      tech: persona.tech,
      telemetry: persona.telemetry,
      planeClass: getPlaneClass({ tech: persona.tech, telemetry: persona.telemetry }).name,
      logs
    };
  });
}

function runAgentFlySimulationTest() {
  const simulatedRuns = makeSimulatedFlyAgentRuns();
  const existingHumanAndManualRuns = (profile.rocketRuns || []).filter((run) => run.source !== "agent-simulation");
  profile.rocketRuns = [...simulatedRuns, ...existingHumanAndManualRuns].slice(0, 40);
  profile.agentSimulationReport = {
    createdAt: new Date().toISOString(),
    runs: simulatedRuns.map((run) => ({
      displayName: run.displayName,
      score: run.score,
      planeClass: run.planeClass,
      completedRounds: run.completedRounds,
      rounds: run.rounds,
      fuel: run.fuel,
      status: run.completedRounds === run.rounds ? "succeeded" : "partial"
    }))
  };
  saveProfile();
  renderProfile();
  renderTables();
  return profile.agentSimulationReport;
}

window.FlagAgentSim = Object.freeze({
  run: runAgentFlySimulationTest,
  preview: makeSimulatedFlyAgentRuns
});

function getRank(points) {
  const index = ranks.findLastIndex((rank) => points >= rank.points);
  return { ...ranks[Math.max(0, index)], index: Math.max(0, index) };
}

function renderRankLists() {
  const points = getBestOverallScore();
  const current = getRank(points);
  const bestPlane = getBestPlaneClass();
  const markup = ranks.map((rank, index) => {
    const unlocked = points >= rank.points;
    const nextPoints = ranks[index + 1]?.points;
    const progress = nextPoints
      ? Math.max(0, Math.min(100, ((points - rank.points) / (nextPoints - rank.points)) * 100))
      : 100;
    return `
      <div class="rank-list-row ${unlocked ? "unlocked" : ""}">
        <b>${escapeHtml(rank.name)}</b>
        <span>${formatScore(rank.points)} pts required</span>
        <em>${unlocked ? (index === current.index ? `${formatScore(points)} pts now` : "Unlocked") : `${formatScore(rank.points - points)} pts away`}</em>
        ${index === current.index ? `<span>Best plane: ${escapeHtml(bestPlane)}</span>` : ""}
        <i><u style="width:${unlocked ? progress : 0}%"></u></i>
      </div>
    `;
  }).join("");
  if (els.pauseRankList) els.pauseRankList.innerHTML = markup;
  if (els.manualRankList) els.manualRankList.innerHTML = markup;
}

function showView(name, updateHash = true) {
  const viewMap = {
    play: "playView",
    rocket: "rocketView",
    results: "resultsView",
    runs: "runsView",
    leaderboard: "leaderboardView",
    profile: "profileView"
  };
  const targetView = viewMap[name] ? document.querySelector(`#${viewMap[name]}`) : null;
  if (!targetView) {
    showView("play", updateHash);
    return;
  }
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  targetView.classList.add("active");
  if (name !== "play") {
    clearInterval(timer);
    clearTimeout(flagQuestionTimeout);
  }
  if (updateHash && location.hash !== `#${name}`) {
    history.replaceState(null, "", `#${name}`);
  }
}

function syncProfileControls() {
  if (els.displayNameInput) els.displayNameInput.value = profile.displayName === "Guest" ? "" : profile.displayName;
}

function roundRect(ctx, x, y, w, h, r, fill = false) {
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, w, h, r);
  } else {
    const radius = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }
  if (fill) ctx.fill();
}

function startRocketRun() {
  loadRocketWorldMap();
  loadRocketBoundaryLines();
  loadRocketCatalog();
  clearInterval(timer);
  stopPropellerSound();
  if (els.rocketResultOverlay) els.rocketResultOverlay.hidden = true;
  if (els.techTreeOverlay) els.techTreeOverlay.hidden = true;
  const start = randomRocketStart();
  const tech = { fuel: 0, speed: 0, turn: 0, sonar: 0 };
  const tutorialMode = sessionStorage.getItem("flagHunterRocketTutorial") === "1";
  if (tutorialMode) sessionStorage.removeItem("flagHunterRocketTutorial");
  const externalRounds = tutorialMode ? 1 : 0;
  const desiredRounds = externalRounds || rocketState?.desiredRounds || 10;
  rocketState = {
    active: false,
    mapW: ROCKET_MAP_W,
    mapH: ROCKET_MAP_H,
    viewW: 1,
    viewH: 1,
    ship: { x: start.x, y: start.y, vx: 0, vy: 0, angle: start.angle || 0, altitude: 0, throttle: 0, bank: 0 },
    start,
    mouse: { x: 0, y: 0, smoothX: 0, smoothY: 0, inside: false },
    keys: {},
    manualControl: false,
    manualReleased: false,
    parkingHold: 0,
    parked: false,
    restartTakeoffOnReentry: false,
    landingHold: { time: 0, ready: false, entrySpeed: 0, entryAltitude: 0 },
    objectiveZone: null,
    accel: 0,
    lastSpeed: 0,
    desiredRounds,
    round: 1,
    wins: 0,
    score: 0,
    techPoints: 0,
    tech,
    telemetry: { peakSpeed: 0, peakAccel: 0, peakDecel: 0, peakTurn: 0 },
    targetScanUntil: 0,
    fuel: Math.min(100, 68 + getRocketStartingFuelBonus(tech.fuel)),
    time: 90,
    roundTimeLimit: 90,
    target: pickRocketTarget(1),
    targetIdeal: makeRocketTargetIdeal(),
    sideQuest: pickRocketSideQuest(1),
    sideQuestPulse: 0,
    depots: makeRocketDepots(),
    clouds: [],
    trail: [],
    routeTrail: [],
    roundLogs: [],
    landingLogs: [],
    roundTechEarned: 0,
    allObjectivesBonusAwarded: false,
    scoreEvents: [],
    roundLogged: false,
    pendingNextRound: null,
    targetHistory: rocketState?.targetHistory || [],
    lastObjectiveDistance: null,
    distanceTrend: null,
    navCheckTimer: 0,
    nextHudAt: 0,
    hudKey: "",
    techHudKey: "",
    sonarPingTimer: 0,
    sonarPingIndex: 0,
    sonarPing: null,
    resultAction: "restart",
    paused: false,
    pausedWasActive: false,
    tutorial: tutorialMode ? { active: true, step: 0, seen: new Set(), forcePause: true } : null,
    feedback: [],
    flash: null,
    phase: externalRounds ? "briefing" : "setup",
    targetCardUntil: Infinity,
    badLandingCooldown: 0,
    last: performance.now(),
    difficulty: 1
  };
  if (externalRounds && !tutorialMode) {
    window.FlagGuard?.startRun?.({
      displayName: profile.displayName || "Guest",
      rounds: desiredRounds
    });
  }
  rememberRocketTarget(rocketState.target);
  renderRocketDepotIntel();
  updateRocketTargetCard(Boolean(externalRounds));
  updateRocketRoundSetup(!externalRounds);
  if (externalRounds) {
    els.rocketMessage.textContent = tutorialMode ? "Tutorial loaded. Read the destination card, then follow the arrows." : `${externalRounds} route rounds loaded from setup. Check the destination flag, then begin takeoff.`;
    if (els.rocketStart) {
      els.rocketStart.hidden = false;
      els.rocketStart.textContent = "Begin Takeoff";
    }
    rocketFeedback(tutorialMode ? "Tutorial ready" : `${externalRounds} rounds ready`, "#45f875", "success");
    updateRocketTutorial();
  } else {
    els.rocketMessage.textContent = "Choose how many route rounds to fly. The timer is your main score engine.";
    if (els.rocketStart) els.rocketStart.hidden = true;
    rocketFeedback("Choose rounds", "#ffd33d", "info");
  }
  showView("rocket");
  resizeRocketCanvas();
  if (!rocketAnimation) rocketAnimation = requestAnimationFrame(tickRocket);
}

function prepareRocketBriefing(rounds) {
  if (!rocketState) startRocketRun();
  rocketState.desiredRounds = rounds;
  rocketState.phase = "briefing";
  rocketState.targetCardUntil = Infinity;
  rocketState.round = 1;
  rocketState.wins = 0;
  updateRocketRoundSetup(false);
  updateRocketRoundButtons(rounds);
  updateRocketTargetCard(true);
  renderRocketDepotIntel();
  els.rocketMessage.textContent = "Destination assigned. Check the flag and country, then begin takeoff when ready.";
  if (els.rocketStart) {
    els.rocketStart.hidden = false;
    els.rocketStart.textContent = "Begin Takeoff";
    els.rocketStart.classList.add("is-briefing");
    els.rocketStart.classList.remove("in-flight");
  }
  window.FlagGuard?.startRun?.({
    displayName: profile.displayName || "Guest",
    rounds
  });
  rocketFeedback(`${rounds} rounds selected`, "#45f875", "success");
  renderRocketHud();
}

function updateRocketRoundSetup(show) {
  if (els.rocketRoundSetup) els.rocketRoundSetup.hidden = !show;
  updateRocketRoundButtons(rocketState?.desiredRounds || 10);
}

function updateRocketRoundButtons(rounds) {
  document.querySelectorAll("[data-rocket-rounds]").forEach((button) => {
    button.classList.toggle("selected", Number(button.dataset.rocketRounds) === Number(rounds));
  });
}

const rocketTutorialSteps = [
  {
    phase: "briefing",
    title: "Choose The Route",
    text: "This is a one-round tutorial. First read the target flag and country. The timer is paused until you press Begin Takeoff.",
    arrow: "top"
  },
  {
    phase: "takeoff",
    title: "Takeoff Roll",
    text: "The plane starts moving immediately. Build speed to 105 m/s, then climb above 120 m. Watch speed, altitude, and time.",
    arrow: "center"
  },
  {
    phase: "cruise",
    title: "Find The Country",
    text: "There is no arrow, marker, or country label. Use the briefing flag, map shape, minimap outline, and optional 10 TP scan to navigate.",
    arrow: "right"
  },
  {
    phase: "landing",
    title: "Reach To Score",
    text: "Enter the red country checkpoint to record speed and altitude. Stay inside for 1 second while descending; the altitude dropped becomes a bonus.",
    arrow: "bottom"
  },
  {
    phase: "tech",
    title: "Spend Research",
    text: "Fuel, speed, and handling upgrades change the route strategy. Fly longer for more opportunities or go faster for bigger timer pressure.",
    arrow: "right"
  }
];

function updateRocketTutorial(force = false) {
  if (!rocketState?.tutorial?.active || !els.rocketTutorialOverlay) return;
  const tutorial = rocketState.tutorial;
  const step = rocketTutorialSteps[tutorial.step];
  if (!step) {
    finishRocketTutorial();
    return;
  }
  const matches = step.phase === rocketState.phase
    || (step.phase === "landing" && rocketState.phase === "cruise")
    || (step.phase === "tech" && rocketState.phase === "briefing" && rocketState.round > 1);
  if (!matches && !force) return;
  if (!force && tutorial.seen.has(tutorial.step)) return;
  tutorial.seen.add(tutorial.step);
  tutorial.forcePause = rocketState.active;
  if (tutorial.forcePause) rocketState.active = false;
  els.rocketTutorialStep.textContent = `Tutorial ${tutorial.step + 1}/${rocketTutorialSteps.length}`;
  els.rocketTutorialTitle.textContent = step.title;
  els.rocketTutorialText.textContent = step.text;
  els.rocketTutorialNext.textContent = tutorial.step === rocketTutorialSteps.length - 1 ? "Finish Tutorial" : "Continue";
  els.rocketTutorialArrow.className = `tutorial-arrow ${step.arrow}`;
  els.rocketTutorialOverlay.hidden = false;
}

function continueRocketTutorial() {
  if (!rocketState?.tutorial?.active) return;
  const tutorial = rocketState.tutorial;
  const current = rocketTutorialSteps[tutorial.step];
  if (els.rocketTutorialOverlay) els.rocketTutorialOverlay.hidden = true;
  if (tutorial.forcePause && current?.phase !== "briefing") {
    rocketState.active = true;
    rocketState.last = performance.now();
  }
  tutorial.forcePause = false;
  tutorial.step += 1;
  if (tutorial.step >= rocketTutorialSteps.length) {
    finishRocketTutorial();
    return;
  }
}

function finishRocketTutorial() {
  if (rocketState?.tutorial) rocketState.tutorial.active = false;
  if (els.rocketTutorialOverlay) els.rocketTutorialOverlay.hidden = true;
  showView("rocket");
  startRocketRun();
}

function beginRocketTakeoff() {
  if (!rocketState) {
    startRocketRun();
    return;
  }
  if (rocketState.phase !== "briefing" || rocketState.active) return;
  const rect = els.rocketCanvas.getBoundingClientRect();
  rocketState.active = true;
  rocketState.phase = "takeoff";
  rocketState.targetCardUntil = performance.now() + 4200;
  rocketState.last = performance.now();
  rocketState.mouse = { x: rect.width / 2, y: rect.height / 2 };
  rocketState.mouse.inside = false;
  rocketState.manualControl = false;
  rocketState.manualReleased = false;
  rocketState.trail = [];
  rocketState.ship.vx = Math.cos(rocketState.ship.angle) * 8;
  rocketState.ship.vy = Math.sin(rocketState.ship.angle) * 8;
  els.rocketMessage.textContent = "Takeoff started. Build speed, then climb above 120 m.";
  if (els.rocketStart) els.rocketStart.textContent = "Restart Flight Run";
  playTakeoffSound();
  startPropellerSound();
  startRocketDefaultRadio();
}

function engageRocketTakeoff() {
  if (!rocketState || rocketState.phase !== "briefing") return;
  rocketState.active = true;
  rocketState.phase = "takeoff";
  rocketState.ship.vx = Math.cos(rocketState.ship.angle) * 8;
  rocketState.ship.vy = Math.sin(rocketState.ship.angle) * 8;
  rocketState.last = performance.now();
  els.rocketMessage.textContent = "Takeoff started. Build speed, then climb above 120 m.";
  playTakeoffSound();
}

function enterRocketRefuelStop(message) {
  if (!rocketState) return;
  rocketState.parkingHold = 0;
  rocketState.parked = false;
  rocketState.restartTakeoffOnReentry = false;
  els.rocketMessage.textContent = `${message} Continue toward the destination country.`;
  rocketState.phase = "cruise";
  rocketState.active = true;
}

function updateRocketTargetCard(show) {
  if (!els.rocketTargetCard || !rocketState?.target) return;
  els.rocketTargetCard.hidden = !show;
  els.rocketTargetName.textContent = rocketState.target.name;
  if (els.rocketTargetMini) els.rocketTargetMini.hidden = !show;
  if (els.rocketTargetMiniName) els.rocketTargetMiniName.textContent = rocketState.target.name;
  if (els.rocketTargetMiniValue) {
    const value = 1200 + rocketState.difficulty * 700;
    els.rocketTargetMiniValue.textContent = `Worth ${formatScore(value)} + timer bonus`;
  }
  const code = rocketState.target.code || flags.find((flag) => flag.name === rocketState.target.name)?.code;
  if (code) {
    els.rocketTargetFlag.src = getFlagUrl(code);
    els.rocketTargetFlag.alt = `${rocketState.target.name} flag`;
    if (els.rocketTargetMiniFlag) {
      els.rocketTargetMiniFlag.src = getFlagUrl(code);
      els.rocketTargetMiniFlag.alt = `${rocketState.target.name} flag`;
    }
  } else {
    els.rocketTargetFlag.removeAttribute("src");
    els.rocketTargetFlag.alt = "";
    if (els.rocketTargetMiniFlag) {
      els.rocketTargetMiniFlag.removeAttribute("src");
      els.rocketTargetMiniFlag.alt = "";
    }
  }
}

function randomRocketStart() {
  const anchors = rocketCatalog?.length ? rocketCatalog : rocketTargets;
  const anchor = anchors[Math.floor(Math.random() * anchors.length)];
  const mapW = rocketState?.mapW || ROCKET_MAP_W;
  const mapH = rocketState?.mapH || ROCKET_MAP_H;
  const x = Math.max(180, Math.min(mapW - 180, anchor.x + (Math.random() - 0.5) * 1300));
  const y = Math.max(180, Math.min(mapH - 180, anchor.y + (Math.random() - 0.5) * 900));
  return { x, y, angle: rocketStartAngle(x, y, mapW, mapH) };
}

function rocketStartAngle(x, y, mapW = ROCKET_MAP_W, mapH = ROCKET_MAP_H) {
  const margin = 1200;
  let dx = 0;
  let dy = 0;
  if (x < margin) dx += 1;
  if (x > mapW - margin) dx -= 1;
  if (y < margin) dy += 1;
  if (y > mapH - margin) dy -= 1;
  if (dx || dy) return Math.atan2(dy, dx);
  return Math.random() * Math.PI * 2;
}

function pickRocketTarget(difficulty) {
  const pool = getRocketPool(difficulty);
  const recent = new Set(rocketState?.targetHistory || []);
  const variedPool = pool.filter((target) => !recent.has(target.name));
  const source = variedPool.length >= Math.min(10, pool.length) ? variedPool : pool;
  const target = source[Math.floor(Math.random() * source.length)];
  const point = rocketPointForCountry(target);
  return point ? { ...target, x: point.x, y: point.y, randomizedPoint: true } : target;
}

function rememberRocketTarget(target) {
  if (!rocketState || !target?.name) return;
  rocketState.targetHistory = [target.name, ...(rocketState.targetHistory || []).filter((name) => name !== target.name)].slice(0, 18);
}

function pickRocketSideQuest(difficulty) {
  const pool = getRocketPool(difficulty + 2).filter((target) => target.capital && target.capital !== "Capital");
  const target = pool[Math.floor(Math.random() * pool.length)] || pickRocketTarget(difficulty);
  return {
    ...target,
    x: target.capitalPoint?.x ?? target.x,
    y: target.capitalPoint?.y ?? target.y,
    reward: 30,
    kind: "blackBox"
  };
}

function makeRocketDepots() {
  const targetName = rocketState?.target?.name;
  const targetAlias = targetName ? (rocketCountryAliases[targetName] || targetName) : "";
  const source = (rocketCatalog?.length ? rocketCatalog : rocketTargets)
    .filter((item) => {
      const itemAlias = rocketCountryAliases[item.name] || item.name;
      return !blockedRocketCountries.has(item.name)
        && (item.lat === undefined || item.lat > -58)
        && item.name !== targetName
        && itemAlias !== targetAlias;
    });
  const depots = [];
  const target = rocketState?.target;
  const minTargetDistance = 540;
  const minDepotDistance = 680;
  let guard = 0;
  while (depots.length < 5 && guard < 600 && source.length) {
    guard += 1;
    const anchor = source[Math.floor(Math.random() * source.length)];
    const point = rocketPointForCountry(anchor, { preferCapital: true });
    if (!point) continue;
    const country = rocketCountryFeature(anchor.name);
    const wide = country && (country.bounds.maxX - country.bounds.minX > 900 || country.bounds.maxY - country.bounds.minY > 620);
    const offset = wide ? { x: (Math.random() - 0.5) * 420, y: (Math.random() - 0.5) * 320 } : { x: 0, y: 0 };
    const x = Math.max(160, Math.min(rocketState?.mapW ? rocketState.mapW - 160 : ROCKET_MAP_W - 160, point.x + offset.x));
    const y = Math.max(160, Math.min(rocketState?.mapH ? rocketState.mapH - 160 : ROCKET_MAP_H - 160, point.y + offset.y));
    if (country && !pointInRocketCountry({ x, y }, country)) continue;
    if (target && Math.hypot(x - target.x, y - target.y) < minTargetDistance) continue;
    if (depots.some((depot) => Math.hypot(x - depot.x, y - depot.y) < minDepotDistance)) continue;
    depots.push({ x, y, fuel: 30, used: false, name: `Depot ${depots.length + 1}`, angle: Math.random() * Math.PI * 2, country: anchor.name });
  }
  let fallbackGuard = 0;
  while (depots.length < 5 && fallbackGuard < 600) {
    fallbackGuard += 1;
    const anchor = source[Math.floor(Math.random() * source.length)];
    const point = rocketPointForCountry(anchor);
    if (!point) continue;
    const x = Math.max(160, Math.min(rocketState?.mapW ? rocketState.mapW - 160 : ROCKET_MAP_W - 160, point.x));
    const y = Math.max(160, Math.min(rocketState?.mapH ? rocketState.mapH - 160 : ROCKET_MAP_H - 160, point.y));
    if (target && Math.hypot(x - target.x, y - target.y) < minTargetDistance) continue;
    if (depots.some((depot) => Math.hypot(x - depot.x, y - depot.y) < minDepotDistance)) continue;
    depots.push({ x, y, fuel: 30, used: false, name: `Depot ${depots.length + 1}`, angle: Math.random() * Math.PI * 2, country: anchor?.name });
  }
  while (depots.length < 5) {
    const anchor = source[depots.length % Math.max(1, source.length)];
    const point = rocketPointForCountry(anchor) || {
      x: 320 + Math.random() * ((rocketState?.mapW || ROCKET_MAP_W) - 640),
      y: 320 + Math.random() * ((rocketState?.mapH || ROCKET_MAP_H) - 640)
    };
    depots.push({
      x: point.x,
      y: point.y,
      fuel: 30,
      used: false,
      name: `Depot ${depots.length + 1}`,
      angle: Math.random() * Math.PI * 2,
      country: anchor?.name
    });
  }
  return depots;
}

function renderRocketDepotIntel() {
  if (!els.rocketDepotCountries) return;
  const countries = [...new Set((rocketState?.depots || [])
    .filter((depot) => !depot.used && depot.country)
    .map((depot) => depot.country))]
    .sort((a, b) => a.localeCompare(b));
  els.rocketDepotCountries.replaceChildren(...(countries.length ? countries : ["Unknown country intel"]).map((name) => {
    const item = document.createElement("b");
    item.textContent = name;
    return item;
  }));
}

function rocketAngleDelta(a, b) {
  let delta = a - b;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  return Math.abs(delta);
}

function evaluateRocketLanding(depot, dist, speed, altitude, alignDeg, descentTime = 0, descentDrop = 0) {
  const km = Math.max(0, Math.round(dist * 4.9));
  const parts = [];
  descentTime = Math.max(0.1, descentTime);
  descentDrop = Math.max(0, descentDrop);
  const dropRate = descentDrop / descentTime;
  const groundSpeed = speed >= 280;
  const rough = dist < ROCKET_DEPOT_RADIUS;
  const good = dist < Math.max(54, ROCKET_DEPOT_RADIUS * 0.62) && altitude <= 900;
  let points = Math.max(40, Math.round(760 - dist * 2.4));
  points += Math.min(420, Math.max(0, Math.round(altitude * 0.12)));
  points += Math.max(0, Math.round(90 - alignDeg * 0.85));
  if (good) {
    points += 260;
    parts.push("clean depot descent +260");
  } else if (rough) {
    points += 45;
    parts.push("depot entry +45");
  }
  if (speed >= 420) {
    points += 520;
    parts.push(`high-speed entry bonus +520`);
  } else if (speed >= 300) {
    points += 360;
    parts.push(`fast entry bonus +360`);
  } else if (speed >= 180) {
    points += 220;
    parts.push(`solid entry speed +220`);
  } else {
    points += 80;
    parts.push(`careful entry +80`);
  }
  const descentBonus = getRocketDescentBonus(descentDrop, descentTime);
  if (descentBonus >= 620) {
    points += descentBonus;
    parts.push(`rapid descent bonus +${descentBonus}`);
  } else if (descentBonus >= 380) {
    points += descentBonus;
    parts.push(`quick descent bonus +${descentBonus}`);
  } else if (descentBonus >= 180) {
    points += descentBonus;
    parts.push(`steady descent bonus +${descentBonus}`);
  }
  if (dist > 18) parts.push(`distance from red center is main score: ${km} km`);
  parts.push(`entry ${speed.toFixed(0)} m/s, ${altitude.toFixed(0)} m, dropped ${descentDrop.toFixed(0)} m in ${descentTime.toFixed(1)}s`);
  if (alignDeg > 32) parts.push(`alignment only reduced bonus: ${alignDeg.toFixed(0)} deg off`);
  const perfect = dist < 22 && speed >= 300 && dropRate >= 240;
  if (perfect) {
    points += 460;
    parts.unshift("perfect center descent +460");
  }
  return {
    depot: depot.name,
    km,
    dist,
    speed,
    altitude,
    alignDeg,
    points,
    perfect,
    good,
    rough,
    groundSpeed,
    parts
  };
}

function getRocketDescentBonus(descentDrop, descentTime) {
  const dropRate = Math.max(0, descentDrop) / Math.max(0.1, descentTime);
  if (dropRate >= 420) return 620;
  if (dropRate >= 240) return 380;
  if (dropRate >= 100) return 180;
  return 0;
}

function getRocketTargetDescentBonus(descentDrop, descentTime) {
  const dropRate = Math.max(0, descentDrop) / Math.max(0.1, descentTime);
  if (dropRate >= 420) return 780;
  if (dropRate >= 240) return 520;
  if (dropRate >= 100) return 260;
  return 90;
}

function getRocketPerformanceLabel(points, speed, descentDrop, dist) {
  const close = dist < 30;
  const fast = speed >= 300;
  const bigDrop = descentDrop >= 220;
  if (points >= 2200 || (close && fast && bigDrop)) return { title: "Elite Route", note: "massive entry and descent control", color: "#ffffff" };
  if (points >= 1500 || (fast && bigDrop)) return { title: "Above Average", note: "strong speed and descent bonus", color: "#45f875" };
  if (points >= 900) return { title: "Average", note: "solid checkpoint, room to push harder", color: "#ffd33d" };
  return { title: "Low Yield", note: "enter faster, drop more altitude, or hit center", color: "#ff6848" };
}

function getRocketTargetIdealBonus(speed, altitude) {
  const ideal = rocketState?.targetIdeal;
  if (!ideal) return null;
  const speedDelta = Math.abs(speed - ideal.speed);
  const altitudeDelta = Math.abs(altitude - ideal.altitude);
  const perfect = speedDelta <= ideal.toleranceSpeed && altitudeDelta <= ideal.toleranceAltitude;
  return {
    perfect,
    speedDelta,
    altitudeDelta,
    reward: perfect ? 40 : 0
  };
}

function awardRocketTechPoints(amount) {
  if (!rocketState || !Number.isFinite(amount) || amount <= 0) return;
  rocketState.techPoints += amount;
  rocketState.roundTechEarned = (rocketState.roundTechEarned || 0) + amount;
}

function showRocketMissionPopup({ title, kind, points, speed, altitude, descentDrop, descentBonus, dist, research = 0, fuel = null }) {
  const elapsed = Math.max(0, (rocketState.roundTimeLimit || 90) - rocketState.time);
  const rating = getRocketPerformanceLabel(points, speed, descentDrop, dist);
  const km = Math.max(0, Math.round(dist * 4.9));
  rocketState.landingNotice = {
    title,
    kind,
    rating: rating.title,
    note: rating.note,
    color: rating.color,
    text: `${points >= 0 ? "+" : ""}${points.toLocaleString()} pts`,
    lines: [
      `Time ${elapsed.toFixed(1)}s | distance ${km.toLocaleString()} km`,
      `Entry ${speed.toFixed(0)} m/s at ${altitude.toFixed(0)} m`,
      `Dropped ${descentDrop.toFixed(0)} m in ${ROCKET_OBJECTIVE_SAMPLE_SECONDS.toFixed(0)}s | descent bonus +${descentBonus}`,
      `${kind === "depot" ? `Research +${research} TP | fuel ${fuel?.toFixed?.(0) ?? fuel}%` : `Research +${research} TP | ${rating.note}`}`
    ],
    life: kind === "target" ? 2.1 : 3.4,
    maxLife: kind === "target" ? 2.1 : 3.4
  };
}

function recordRocketRound(success, reason = "route") {
  if (!rocketState || rocketState.roundLogged) return;
  rocketState.roundLogged = true;
  const trace = (rocketState.routeTrail || [])
    .filter((_, index) => index % 3 === 0)
    .slice(-280)
    .map((point) => ({ x: point.x, y: point.y, wrap: Boolean(point.wrap) }));
  rocketState.roundLogs.push({
    round: rocketState.round,
    target: rocketState.target?.name || "Unknown",
    flag: rocketState.target?.flag || "",
    targetX: rocketState.target?.x || 0,
    targetY: rocketState.target?.y || 0,
    success,
    reason,
    score: rocketState.score,
    scoreEvents: (rocketState.scoreEvents || []).filter((event) => event.round === rocketState.round),
    techEarned: rocketState.roundTechEarned || 0,
    fuel: rocketState.fuel,
    time: rocketState.time,
    trace,
    landings: [...(rocketState.landingLogs || [])]
  });
}

function makeRocketClouds() {
  return [];
}

function nextRocketRound(success) {
  if (!rocketState) return;
  if (success) {
    rocketState.wins += 1;
    const timeBonus = Math.round(rocketState.time * 120);
    const difficultyBonus = rocketState.difficulty * 700;
    const fuelBonus = Math.round(rocketState.fuel * 18);
    const routeBonus = 1200 + timeBonus + difficultyBonus + fuelBonus;
    rocketState.score += routeBonus;
    rocketState.scoreEvents.push({
      round: rocketState.round,
      type: "Route bonus",
      points: routeBonus,
      detail: `1,200 base + ${formatScore(timeBonus)} timer + ${formatScore(difficultyBonus)} difficulty + ${formatScore(fuelBonus)} fuel`
    });
    awardRocketTechPoints(1 + Math.floor(rocketState.difficulty / 3));
    rocketState.fuel = Math.min(100, rocketState.fuel + 8 + rocketState.tech.fuel * 2.4);
    rocketFeedback("Route reached", "#45f875", "success");
    playTone("correct");
  } else {
    rocketState.score = Math.max(0, rocketState.score - 850);
    rocketState.fuel = Math.min(100, 54 + getRocketStartingFuelBonus(rocketState.tech.fuel));
    rocketFeedback("Route failed", "#ff3d5a", "error");
    playTone("wrong");
  }
  recordRocketRound(success, success ? "target reached" : "route failed");
  if (rocketState.tutorial?.active && success) {
    rocketState.active = false;
    stopPropellerSound();
    rocketState.phase = "briefing";
    rocketState.tutorial.step = rocketTutorialSteps.length - 1;
    updateRocketTutorial(true);
    renderRocketHud();
    return;
  }
  if ((rocketState.roundLogs || []).length >= rocketState.desiredRounds) {
    rocketState.active = false;
    stopPropellerSound();
    els.rocketMessage.textContent = `Flight run complete. Score: ${formatScore(rocketState.score)}. Tech points saved for upgrades.`;
    showRocketResult("Flight Run Complete", `Score ${formatScore(rocketState.score)}. Fuel left ${rocketState.fuel.toFixed(0)}%. Tech points available: ${rocketState.techPoints}.`);
    renderRocketHud();
    return;
  }
  const wasHard = rocketState.difficulty >= 3;
  rocketState.difficulty = success ? (wasHard ? 1 : rocketState.difficulty + 1) : Math.max(1, rocketState.difficulty - 1);
  rocketState.round += 1;
  rocketState.time = Math.max(60, 92 - rocketState.difficulty * 8);
  rocketState.roundTimeLimit = rocketState.time;
  rocketState.start = randomRocketStart();
  rocketState.ship = { x: rocketState.start.x, y: rocketState.start.y, vx: 0, vy: 0, angle: rocketState.start.angle || 0, altitude: 0, throttle: 0, bank: 0 };
  rocketState.target = pickRocketTarget(rocketState.difficulty);
  rocketState.targetIdeal = makeRocketTargetIdeal();
  rememberRocketTarget(rocketState.target);
  rocketState.sideQuest = pickRocketSideQuest(rocketState.difficulty);
  rocketState.depots = makeRocketDepots();
  renderRocketDepotIntel();
  rocketState.clouds = makeRocketClouds();
  rocketState.trail = [];
  rocketState.routeTrail = [];
  rocketState.landingLogs = [];
  rocketState.roundTechEarned = 0;
  rocketState.allObjectivesBonusAwarded = false;
  rocketState.scoreEvents = rocketState.scoreEvents.filter((event) => event.round !== rocketState.round);
  rocketState.roundLogged = false;
  rocketState.pendingNextRound = null;
  rocketState.parkingHold = 0;
  rocketState.parked = false;
  rocketState.objectiveZone = null;
  rocketState.lastObjectiveDistance = null;
  rocketState.distanceTrend = null;
  rocketState.navCheckTimer = 0;
  rocketState.hudKey = "";
  rocketState.techHudKey = "";
  rocketState.sonarPingTimer = 0;
  rocketState.sonarPingIndex = 0;
  rocketState.sonarPing = null;
  rocketState.targetScanUntil = 0;
  rocketState.restartTakeoffOnReentry = false;
  rocketState.active = false;
  rocketState.phase = "briefing";
  rocketState.targetCardUntil = Infinity;
  updateRocketRoundSetup(false);
  updateRocketTargetCard(true);
  if (els.rocketStart) els.rocketStart.textContent = "Begin Takeoff";
  els.rocketMessage.textContent = success ? "Route confirmed. Fuel carried over. Read the next route, then begin takeoff." : "Missed timer. Easier route loaded at a new runway. Begin takeoff when ready.";
}

function failRocketRound(reason, message) {
  if (!rocketState || rocketState.pendingNextRound) return;
  rocketState.active = false;
  els.rocketMessage.textContent = message;
  rocketFeedback(reason === "out of fuel" ? "Out of fuel" : "Route failed", "#ff3d5a", "error");
  stopPropellerSound();
  recordRocketRound(false, reason);
  showRocketRoundSummary(rocketState.roundLogs.at(-1));
}

function tickRocket(now) {
  rocketAnimation = requestAnimationFrame(tickRocket);
  if (!rocketState) return;
  if (els.rocketTargetCard && rocketState.phase !== "briefing" && now > rocketState.targetCardUntil) {
    els.rocketTargetCard.hidden = true;
  }
  const dt = Math.min(0.033, (now - rocketState.last) / 1000 || 0.016);
  rocketState.last = now;
  if (!rocketState.paused && rocketState.phase !== "result") {
    updateRocketPendingNextRound(dt);
    if (rocketState.active) updateRocket(dt);
  }
  updateRocketTutorial();
  updatePropellerSound();
  drawRocket();
  renderRocketHud(false);
}

function updateRocketPendingNextRound(dt) {
  if (!rocketState?.pendingNextRound) return;
  rocketState.pendingNextRound.delay -= dt;
  if (rocketState.pendingNextRound.delay > 0) return;
  const pending = rocketState.pendingNextRound;
  rocketState.pendingNextRound = null;
  nextRocketRound(pending.success);
}

function updateRocketSonar(dt) {
  if (!rocketState || rocketState.phase !== "cruise") return;
  const level = rocketState.tech.sonar || 0;
  if (level <= 0) return;
  if (rocketState.sonarPing) {
    rocketState.sonarPing.life -= dt;
    if (rocketState.sonarPing.life <= 0) rocketState.sonarPing = null;
  }
  rocketState.sonarPingTimer -= dt;
  if (rocketState.sonarPingTimer > 0) return;
  const depots = (rocketState.depots || []).filter((depot) => !depot.used);
  if (!depots.length) return;
  const index = (rocketState.sonarPingIndex || 0) % depots.length;
  const depot = depots[index];
  rocketState.sonarPingIndex = index + 1;
  rocketState.sonarPingTimer = getRocketSonarInterval(level);
  rocketState.sonarPing = {
    x: depot.x,
    y: depot.y,
    name: depot.name,
    country: depot.country,
    life: Math.min(8, 4.5 + level * 0.45),
    maxLife: Math.min(8, 4.5 + level * 0.45)
  };
  rocketFeedback(`Sonar ping: ${depot.country || depot.name}`, "#45f875", "info");
}

function updateRocket(dt) {
  const canvas = els.rocketCanvas;
  const rect = canvas.getBoundingClientRect();
  rocketState.viewW = rect.width;
  rocketState.viewH = rect.height;
  rocketState.clouds.forEach((cloud) => {
    cloud.x += cloud.drift * dt;
    if (cloud.x > rocketState.mapW + cloud.r) cloud.x = -cloud.r;
  });
  rocketState.feedback = rocketState.feedback.filter((item) => {
    item.life -= dt;
    return item.life > 0;
  });
  if (rocketState.landingNotice) {
    rocketState.landingNotice.life -= dt;
    if (rocketState.landingNotice.life <= 0) rocketState.landingNotice = null;
  }
  if (rocketState.flash) {
    rocketState.flash.life -= dt;
    if (rocketState.flash.life <= 0) rocketState.flash = null;
  }
  if (rocketState.badLandingCooldown > 0) {
    rocketState.badLandingCooldown -= dt;
  }
  updateRocketSonar(dt);
  if (rocketState.parkingHold > 0) {
    rocketState.parkingHold = Math.max(0, rocketState.parkingHold - dt);
  }
  const control = getRocketControlVector(rect, dt);
  if (rocketState.parked && control.manual && control.distance > 85) {
    rocketState.parked = false;
  }
  const dx = control.dx;
  const dy = control.dy;
  const runwayLocked = rocketState.phase === "takeoff" && rocketState.ship.altitude < 16;
  const desired = runwayLocked ? rocketState.ship.angle : control.manual ? Math.atan2(dy, dx) : rocketState.ship.angle;
  let turn = desired - rocketState.ship.angle;
  while (turn > Math.PI) turn -= Math.PI * 2;
  while (turn < -Math.PI) turn += Math.PI * 2;
  const turnLevel = rocketState.tech.turn || 0;
  const speedLevel = rocketState.tech.speed || 0;
  const turnRate = 2.05 + turnLevel * 0.56;
  if (runwayLocked) {
    rocketState.ship.bank += (0 - rocketState.ship.bank) * Math.min(1, dt * 8);
  } else {
    rocketState.ship.angle += turn * Math.min(1, dt * turnRate);
    rocketState.ship.bank += (Math.max(-1, Math.min(1, turn * 2.1)) - rocketState.ship.bank) * Math.min(1, dt * 7);
  }
  const onGround = rocketState.ship.altitude <= 8;
  const headingX = Math.cos(rocketState.ship.angle);
  const headingY = Math.sin(rocketState.ship.angle);
  const pointerAlongHeading = control.manual ? dx * headingX + dy * headingY : 0;
  const spaceBrake = Boolean(rocketState.keys?.Space);
  const noseDecel = control.manual && pointerAlongHeading >= 0 && control.distance < 115;
  const parkingBrake = rocketState.parked || rocketState.parkingHold > 0;
  const manualPull = control.manual ? Math.max(0, pointerAlongHeading) / 360 : 0;
  const intent = parkingBrake || spaceBrake || noseDecel ? 0 : control.manual ? Math.min(1, manualPull) : 0.82;
  rocketState.ship.throttle += (intent - rocketState.ship.throttle) * Math.min(1, dt * (parkingBrake || spaceBrake || noseDecel ? 3.8 : 2.75));
  const cloudDrag = 1;
  const thrust = (720 + speedLevel * 205 + turnLevel * 34) * cloudDrag;
  rocketState.ship.vx += Math.cos(rocketState.ship.angle) * thrust * rocketState.ship.throttle * dt;
  rocketState.ship.vy += Math.sin(rocketState.ship.angle) * thrust * rocketState.ship.throttle * dt;
  const brake = parkingBrake ? 0.048 + speedLevel * 0.006 : spaceBrake ? 0.034 : noseDecel ? 0.018 : 0;
  rocketState.ship.vx *= Math.max(0.86, 0.994 - brake);
  rocketState.ship.vy *= Math.max(0.86, 0.994 - brake);
  let currentSpeed = Math.hypot(rocketState.ship.vx, rocketState.ship.vy);
  if (spaceBrake && currentSpeed < 30 && currentSpeed > 0) {
    rocketState.ship.vx = rocketState.ship.vx / currentSpeed * 30;
    rocketState.ship.vy = rocketState.ship.vy / currentSpeed * 30;
    currentSpeed = 30;
  }
  const maxSpeed = (520 + speedLevel * 145 + turnLevel * 22 + rocketState.difficulty * 24) * cloudDrag;
  if (currentSpeed > maxSpeed) {
    rocketState.ship.vx = rocketState.ship.vx / currentSpeed * maxSpeed;
    rocketState.ship.vy = rocketState.ship.vy / currentSpeed * maxSpeed;
  }
  if (parkingBrake && onGround && currentSpeed < 7) {
    rocketState.ship.vx = 0;
    rocketState.ship.vy = 0;
    rocketState.ship.throttle = 0;
    rocketState.parkingHold = Math.max(rocketState.parkingHold, 1.2);
    rocketState.parked = true;
  }
  rocketState.accel = (currentSpeed - (rocketState.lastSpeed || 0)) / Math.max(0.001, dt);
  rocketState.lastSpeed = currentSpeed;
  if (rocketState.telemetry) {
    rocketState.telemetry.peakSpeed = Math.max(rocketState.telemetry.peakSpeed || 0, currentSpeed);
    rocketState.telemetry.peakAccel = Math.max(rocketState.telemetry.peakAccel || 0, rocketState.accel || 0);
    rocketState.telemetry.peakDecel = Math.max(rocketState.telemetry.peakDecel || 0, -(rocketState.accel || 0));
    rocketState.telemetry.peakTurn = Math.max(rocketState.telemetry.peakTurn || 0, Math.abs(turn) * turnRate);
  }
  const liftSpeed = 105;
  const climbIntent = Math.max(-0.35, Math.min(1, -dy / 220));
  const verticalUpgrade = 1 + turnLevel * 0.16 + speedLevel * 0.05;
  if (currentSpeed > liftSpeed && rocketState.ship.throttle > 0.45) {
    rocketState.ship.altitude += (currentSpeed - liftSpeed) * (0.38 + climbIntent * 0.75) * verticalUpgrade * dt;
  } else {
    const descentRate = (18 + Math.max(0, liftSpeed - currentSpeed) * 0.28 + (1 - rocketState.ship.throttle) * 20) * verticalUpgrade;
    rocketState.ship.altitude -= descentRate * dt;
  }
  rocketState.ship.altitude = Math.max(0, Math.min(6200, rocketState.ship.altitude));
  if (rocketState.phase === "takeoff" && rocketState.ship.altitude > 120) {
    rocketState.phase = "cruise";
    els.rocketMessage.textContent = `Airborne. Navigate by country shape and the briefing flag. Optional beacon: ${rocketState.sideQuest.capital}, ${rocketState.sideQuest.name}.`;
    rocketFeedback("Cruise unlocked", "#45f875", "success");
  }
  rocketState.ship.x += rocketState.ship.vx * dt;
  rocketState.ship.y += rocketState.ship.vy * dt;
  updateRocketTrail(dt, rect);
  rocketState.navCheckTimer = (rocketState.navCheckTimer || 0) - dt;
  if (rocketState.navCheckTimer <= 0) {
    updateRocketDistanceTrend();
    rocketState.navCheckTimer = ROCKET_NAV_CHECK_INTERVAL;
  }
  rocketState.time -= dt;
  rocketState.fuel -= (0.86 + rocketState.ship.throttle * 1.45 + currentSpeed / 1250) * dt * getRocketFuelDrainMultiplier(rocketState.tech.fuel);
  if (rocketState.fuel <= 0) {
    rocketState.fuel = 0;
    failRocketRound("out of fuel", "Fuel exhausted. This route is lost, but the run continues with the next round.");
    return;
  }
  if (rocketState.time <= 0) {
    failRocketRound("timer expired", "Timer expired. This route is lost, but the run continues with the next round.");
    return;
  }
  let hitMapEdge = false;
  if (rocketState.ship.x < 0) { rocketState.ship.x = 0; rocketState.ship.vx = Math.max(0, rocketState.ship.vx); hitMapEdge = true; }
  if (rocketState.ship.x > rocketState.mapW) { rocketState.ship.x = rocketState.mapW; rocketState.ship.vx = Math.min(0, rocketState.ship.vx); hitMapEdge = true; }
  if (rocketState.ship.y < 0) { rocketState.ship.y = 0; rocketState.ship.vy = Math.max(0, rocketState.ship.vy); hitMapEdge = true; }
  if (rocketState.ship.y > rocketState.mapH) { rocketState.ship.y = rocketState.mapH; rocketState.ship.vy = Math.min(0, rocketState.ship.vy); hitMapEdge = true; }
  if (hitMapEdge) {
    rocketState.trail = [];
    rocketState.routeTrail.push({ x: rocketState.ship.x, y: rocketState.ship.y, angle: rocketState.ship.angle });
    els.rocketMessage.textContent = "Map edge reached. Turn back toward the world map.";
  }
  if (updateRocketObjectiveFlyThrough()) return;
  const sideDist = Math.hypot(rocketState.ship.x - rocketState.sideQuest.x, rocketState.ship.y - rocketState.sideQuest.y);
  if (!rocketState.sideQuest.done && sideDist < 80 && rocketState.phase === "cruise") {
    rocketState.sideQuest.done = true;
    awardRocketTechPoints(rocketState.sideQuest.reward);
    rocketState.score += 650 + rocketState.sideQuest.reward * 180;
    els.rocketMessage.textContent = `Black box recovered in ${rocketState.sideQuest.name}. +${rocketState.sideQuest.reward} TP.`;
    rocketFeedback(`Black box +${rocketState.sideQuest.reward} TP`, "#0b0f14", "success");
  }
}

function updateRocketObjectiveFlyThrough() {
  if (!rocketState || rocketState.phase !== "cruise") return false;
  const speed = Math.hypot(rocketState.ship.vx, rocketState.ship.vy);
  const altitude = rocketState.ship.altitude;
  const targetDist = rocketState.target ? Math.hypot(rocketState.ship.x - rocketState.target.x, rocketState.ship.y - rocketState.target.y) : Infinity;
  const depot = nearestRocketDepot();
  const depotDist = depot ? Math.hypot(rocketState.ship.x - depot.x, rocketState.ship.y - depot.y) : Infinity;
  const zone = rocketState.target && targetDist < ROCKET_TARGET_RADIUS
    ? { type: "target", id: rocketState.target.name, dist: targetDist }
    : depot && depotDist < ROCKET_DEPOT_RADIUS
      ? { type: "depot", id: depot.name, dist: depotDist, depot }
      : null;

  if (!zone) {
    rocketState.objectiveZone = null;
    return false;
  }

  const existing = rocketState.objectiveZone;
  if (!existing || existing.type !== zone.type || existing.id !== zone.id) {
    rocketState.objectiveZone = {
      ...zone,
      entrySpeed: speed,
      entryAltitude: altitude,
      entryTime: rocketState.time,
      sampleSeconds: ROCKET_OBJECTIVE_SAMPLE_SECONDS,
      bestDist: zone.dist
    };
    rocketFeedback(`${zone.type === "target" ? "Target" : "Depot"} entry recorded`, "#ffd33d", "info");
  } else {
    rocketState.objectiveZone = {
      ...existing,
      ...zone,
      bestDist: Math.min(existing.bestDist ?? zone.dist, zone.dist)
    };
  }

  const sampleElapsed = Math.max(0, (rocketState.objectiveZone.entryTime ?? rocketState.time) - rocketState.time);
  if (sampleElapsed >= ROCKET_OBJECTIVE_SAMPLE_SECONDS) {
    const entry = rocketState.objectiveZone;
    const descentDrop = Math.max(0, entry.entryAltitude - altitude);
    const snapshot = {
      speed: entry.entrySpeed,
      altitude: entry.entryAltitude,
      currentSpeed: speed,
      currentAltitude: altitude,
      descentTime: Math.max(0.1, sampleElapsed),
      descentDrop
    };
    rocketState.objectiveZone = null;
    if (zone.type === "target") {
      completeRocketTargetLanding(entry.bestDist ?? zone.dist, snapshot);
    } else {
      completeRocketDepotLanding(zone.depot, entry.bestDist ?? zone.dist, snapshot);
    }
    return true;
  }

  return false;
}

function updateRocketLandingHold(dt) {
  if (!rocketState?.landingHold || rocketState.phase !== "cruise") return false;
  const speed = Math.hypot(rocketState.ship.vx, rocketState.ship.vy);
  if (rocketState.ship.altitude <= 8) {
    rocketState.landingHold.approachSpeed = speed;
    rocketState.landingHold.approachAltitude = rocketState.ship.altitude;
  }
  const stopped = rocketState.ship.altitude <= 0.5 && speed <= 0.8 && Math.abs(rocketState.accel || 0) <= 0.8;
  const depot = nearestRocketDepot();
  const depotDist = depot ? Math.hypot(rocketState.ship.x - depot.x, rocketState.ship.y - depot.y) : Infinity;
  const targetDist = rocketState.target ? Math.hypot(rocketState.ship.x - rocketState.target.x, rocketState.ship.y - rocketState.target.y) : Infinity;
  const inTargetZone = rocketState.target && targetDist < ROCKET_TARGET_RADIUS;
  const inDepotZone = depot && depotDist < ROCKET_DEPOT_RADIUS;
  if (stopped && (inTargetZone || inDepotZone)) {
    const landingSnapshot = { speed, altitude: rocketState.ship.altitude };
    rocketState.landingHold.time = 0;
    rocketState.landingHold.ready = false;
    if (inTargetZone) {
      completeRocketTargetLanding(targetDist, landingSnapshot);
    } else {
      completeRocketDepotLanding(depot, depotDist, landingSnapshot);
    }
    return true;
  }
  if (stopped) {
    rocketState.landingHold.time = Math.min(3, rocketState.landingHold.time + dt);
    rocketState.landingHold.ready = rocketState.landingHold.time >= 3;
    els.rocketMessage.textContent = `Outside objective. Hold ${rocketState.landingHold.time.toFixed(1)} / 3.0s to park here. Target and depot circles land instantly once stopped.`;
  } else {
    rocketState.landingHold.time = 0;
    rocketState.landingHold.ready = false;
    if (rocketState.ship.altitude > 8) {
      rocketState.landingHold.approachSpeed = 0;
      rocketState.landingHold.approachAltitude = 0;
    }
  }
  return false;
}

function resolveRocketHeldLanding() {
  const landingSnapshot = {
    speed: Math.hypot(rocketState.ship.vx, rocketState.ship.vy),
    altitude: rocketState.ship.altitude
  };
  rocketState.landingHold.ready = false;
  rocketState.landingHold.time = 0;
  const depot = nearestRocketDepot();
  const depotDist = depot ? Math.hypot(rocketState.ship.x - depot.x, rocketState.ship.y - depot.y) : Infinity;
  const targetDist = rocketState.target ? Math.hypot(rocketState.ship.x - rocketState.target.x, rocketState.ship.y - rocketState.target.y) : Infinity;
  if (rocketState.target && targetDist < ROCKET_TARGET_RADIUS) {
    completeRocketTargetLanding(targetDist, landingSnapshot);
    return;
  }
  if (depot && depotDist < ROCKET_DEPOT_RADIUS) {
    completeRocketDepotLanding(depot, depotDist, landingSnapshot);
    return;
  }
  els.rocketMessage.textContent = "Landed, but not at a depot or target. Take off again or taxi closer before holding.";
  rocketState.landingNotice = { text: "PARKED OUTSIDE OBJECTIVE", color: "#ffd33d", life: 3.2, maxLife: 3.2 };
  rocketFeedback("Outside objective", "#ffd33d", "info");
}

function completeRocketDepotLanding(depot, dist, landingSnapshot = {}) {
  const approachSpeed = landingSnapshot.speed ?? rocketState.landingHold?.approachSpeed ?? 0;
  const approachAltitude = landingSnapshot.altitude ?? rocketState.landingHold?.approachAltitude ?? 0;
  const descentTime = landingSnapshot.descentTime ?? 0;
  const descentDrop = landingSnapshot.descentDrop ?? 0;
  const landing = evaluateRocketLanding(depot, dist, approachSpeed, approachAltitude, rocketAngleDelta(rocketState.ship.angle, depot.angle) * 180 / Math.PI, descentTime, descentDrop);
  depot.used = true;
  rocketState.depots = rocketState.depots.filter((item) => item !== depot && item.name !== depot.name);
  rocketState.score += landing.points;
  const fuelEarned = landing.perfect ? depot.fuel + 18 : landing.good ? depot.fuel + 8 : Math.max(12, Math.round(depot.fuel * 0.58));
  rocketState.fuel = Math.min(100, rocketState.fuel + fuelEarned + rocketState.tech.fuel * 4);
  const researchEarned = landing.perfect ? 10 : landing.good ? 5 : 3;
  awardRocketTechPoints(researchEarned);
  rocketState.landingLogs.push({ ...landing, success: true, country: depot.country });
  renderRocketDepotIntel();
  const landingName = landing.perfect ? "Perfect depot descent" : landing.good ? "Clean depot descent" : "Depot refuel";
  showRocketMissionPopup({
    title: landingName,
    kind: "depot",
    points: landing.points,
    speed: approachSpeed,
    altitude: approachAltitude,
    descentDrop,
    descentBonus: getRocketDescentBonus(descentDrop, descentTime),
    dist,
    research: researchEarned,
    fuel: rocketState.fuel
  });
  rocketFeedback(`${landingName} +${landing.points} pts +${researchEarned} TP`, landing.perfect ? "#ffffff" : landing.good ? "#45f875" : "#22d9f2", "success");
  playLandingSound(true, false);
  if (landing.good) playPowerUp();
  enterRocketRefuelStop(`REFUELED: entry ${approachSpeed.toFixed(0)} m/s, ${approachAltitude.toFixed(0)} m, dropped ${descentDrop.toFixed(0)} m in ${descentTime.toFixed(1)}s. +${landing.points} pts, +${researchEarned} research TP, fuel ${rocketState.fuel.toFixed(0)}%.`);
}

function completeRocketTargetLanding(dist, landingSnapshot = {}) {
  const approachSpeed = landingSnapshot.speed ?? rocketState.landingHold?.approachSpeed ?? 0;
  const approachAltitude = landingSnapshot.altitude ?? rocketState.landingHold?.approachAltitude ?? 0;
  const descentTime = Math.max(0.1, landingSnapshot.descentTime ?? 0);
  const descentDrop = Math.max(0, landingSnapshot.descentDrop ?? 0);
  const speedBonus = approachSpeed >= 420 ? 720 : approachSpeed >= 300 ? 520 : approachSpeed >= 180 ? 320 : 120;
  const altitudeBonus = Math.min(520, Math.max(0, Math.round(approachAltitude * 0.16)));
  const descentBonus = getRocketTargetDescentBonus(descentDrop, descentTime);
  const landingPoints = Math.max(80, Math.round(1040 - dist * 3.6 + speedBonus + altitudeBonus + descentBonus));
  rocketState.score += landingPoints;
  const targetResearchEarned = 8;
  awardRocketTechPoints(targetResearchEarned);
  const idealBonus = getRocketTargetIdealBonus(approachSpeed, approachAltitude);
  if (idealBonus?.perfect) {
    awardRocketTechPoints(idealBonus.reward);
    rocketState.score += 1800;
    rocketState.scoreEvents.push({
      round: rocketState.round,
      type: "Perfect approach bonus",
      points: 1800,
      detail: `target ideal matched, +${idealBonus.reward} TP`
    });
  }
  const clearedAllDepots = (rocketState.depots || []).every((depot) => depot.used);
  if (clearedAllDepots && !rocketState.allObjectivesBonusAwarded) {
    rocketState.allObjectivesBonusAwarded = true;
    awardRocketTechPoints(10);
    rocketState.score += 2400;
    rocketState.scoreEvents.push({
      round: rocketState.round,
      type: "Full sweep bonus",
      points: 2400,
      detail: "all fuel depots and the destination found correctly, +10 TP"
    });
  }
  rocketState.scoreEvents.push({
    round: rocketState.round,
    type: "Target landing",
    points: landingPoints,
    detail: `${formatScore(Math.round(1040 - dist * 3.6))} distance + ${formatScore(speedBonus)} speed + ${formatScore(altitudeBonus)} altitude + ${formatScore(descentBonus)} descent`
  });
  els.rocketMessage.textContent = clearedAllDepots
    ? `Perfect sweep: every fuel depot and ${rocketState.target.name} found. +${targetResearchEarned + 10} TP and +${formatScore(landingPoints + 2400)} pts.`
    : idealBonus?.perfect
      ? `Perfect approach in ${rocketState.target.name}. +${targetResearchEarned + idealBonus.reward} TP, +${formatScore(landingPoints + 1800)} pts.`
      : `Target completed in ${rocketState.target.name}. +${targetResearchEarned} TP, +${landingPoints} pts.`;
  showRocketMissionPopup({
    title: `${rocketState.target.name} Mission Success`,
    kind: "target",
    points: landingPoints,
    speed: approachSpeed,
    altitude: approachAltitude,
    descentDrop,
    descentBonus,
    dist,
    research: targetResearchEarned + (idealBonus?.reward || 0)
  });
  rocketFeedback(
    idealBonus?.perfect ? `Perfect approach +${targetResearchEarned + idealBonus.reward} TP` : clearedAllDepots ? `Perfect sweep +${targetResearchEarned + 10} TP` : `Target +${targetResearchEarned} TP`,
    idealBonus?.perfect || clearedAllDepots ? "#ffffff" : "#45f875",
    "success"
  );
  playLandingSound(true, true);
  rocketState.active = false;
  rocketState.pendingNextRound = { success: true, delay: 1.55 };
}

function updateRocketDepotApproachMessage() {
  if (rocketState.badLandingCooldown > 0) return;
  const depot = nearestRocketDepot();
  if (!depot || depot.distance > ROCKET_DEPOT_RADIUS * 2.4) return;
  const speed = Math.hypot(rocketState.ship.vx, rocketState.ship.vy);
  if (rocketState.ship.altitude <= 0.5 && speed <= 0.8) return;
  rocketState.badLandingCooldown = 2.4;
  els.rocketMessage.textContent = "Fuel depot nearby.";
}

function getTargetLandingStatus() {
  if (!rocketState?.target || rocketState.phase !== "cruise") return null;
  const dist = Math.hypot(rocketState.ship.x - rocketState.target.x, rocketState.ship.y - rocketState.target.y);
  if (dist > 520) return null;
  const speed = Math.hypot(rocketState.ship.vx, rocketState.ship.vy);
  const altitude = rocketState.ship.altitude;
  const zone = rocketState.objectiveZone?.type === "target" ? rocketState.objectiveZone : null;
  return {
    dist,
    km: Math.max(0, Math.round(dist * 4.9)),
    speed,
    altitude,
    entrySpeed: zone?.entrySpeed,
    entryAltitude: zone?.entryAltitude,
    descentTime: zone ? Math.max(0.1, zone.entryTime - rocketState.time) : 0,
    distanceOk: dist < ROCKET_TARGET_RADIUS,
    speedOk: true,
    altitudeOk: true,
    stoppedOk: dist < ROCKET_TARGET_RADIUS,
    scoreCenter: dist < Math.max(30, ROCKET_TARGET_RADIUS * 0.45)
  };
}

function getRocketControlVector(rect, dt = 0.016) {
  const center = { x: rect.width / 2, y: rect.height / 2 };
  const rawDx = rocketState.mouse.x - center.x;
  const rawDy = rocketState.mouse.y - center.y;
  const distance = Math.hypot(rawDx, rawDy);
  const inZone = Boolean(rocketState.mouse.inside) && distance < 230;
  if (!rocketState.mouse.hasSmooth || !rocketState.mouse.inside) {
    rocketState.mouse.smoothX = rocketState.mouse.x;
    rocketState.mouse.smoothY = rocketState.mouse.y;
    rocketState.mouse.hasSmooth = true;
  } else {
    const smoothing = Math.min(1, 1 - Math.exp(-dt * 26));
    rocketState.mouse.smoothX += (rocketState.mouse.x - rocketState.mouse.smoothX) * smoothing;
    rocketState.mouse.smoothY += (rocketState.mouse.y - rocketState.mouse.smoothY) * smoothing;
  }
  const smoothDx = rocketState.mouse.smoothX - center.x;
  const smoothDy = rocketState.mouse.smoothY - center.y;
  if (!inZone) {
    rocketState.manualControl = false;
    rocketState.manualReleased = false;
  } else if (!rocketState.manualReleased) {
    rocketState.manualControl = true;
  }
  if (!rocketState.manualControl) {
    return {
      dx: Math.cos(rocketState.ship.angle) * 180,
      dy: Math.sin(rocketState.ship.angle) * 180,
      manual: false,
      inZone,
      distance
    };
  }
  return { dx: smoothDx, dy: smoothDy, manual: true, inZone, distance };
}

function updateRocketTrail(dt, rect) {
  if (!rocketState.trail) rocketState.trail = [];
  const ship = rocketState.ship;
  const last = rocketState.trail[rocketState.trail.length - 1];
  const moved = last ? Math.hypot(ship.x - last.x, ship.y - last.y) : Infinity;
  const turned = last ? Math.abs(ship.angle - last.angle) : Infinity;
  if (!last || moved > 18 || turned > 0.18) {
    rocketState.trail.push({ x: ship.x, y: ship.y, angle: ship.angle, life: 5.5, maxLife: 5.5 });
    rocketState.routeTrail.push({ x: ship.x, y: ship.y, angle: ship.angle });
    rocketState.routeTrail = rocketState.routeTrail.slice(-900);
  }
  const camX = ship.x - rect.width / 2;
  const camY = ship.y - rect.height / 2;
  rocketState.trail.forEach((point) => {
    const sx = point.x - camX;
    const sy = point.y - camY;
    const visible = sx > -80 && sx < rect.width + 80 && sy > -80 && sy < rect.height + 80;
    point.life = visible ? point.maxLife : point.life - dt * 0.7;
  });
  rocketState.trail = rocketState.trail.filter((point) => point.life > 0).slice(-360);
}

function resizeRocketCanvas() {
  if (!els.rocketCanvas) return;
  const rect = els.rocketCanvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  els.rocketCanvas.width = Math.max(1, Math.floor(rect.width * ratio));
  els.rocketCanvas.height = Math.max(1, Math.floor(rect.height * ratio));
  const ctx = els.rocketCanvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  invalidateRocketMapCache();
}

function drawRocket() {
  const canvas = els.rocketCanvas;
  if (!canvas || !rocketState) return;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  if (rocketState.phase === "setup") {
    drawRocketSetupBackground(ctx, rect);
    return;
  }
  const camX = rocketState.ship.x - rect.width / 2;
  const camY = rocketState.ship.y - rect.height / 2;
  drawRocketMap(ctx, rect, camX, camY);
  drawRocketGlobeCurvature(ctx, rect);
  drawRocketAtmosphere(ctx, rect);
  drawRocketSpaceLayer(ctx, rect);
  drawRocketTrail(ctx, camX, camY);
  drawRocketRunway(ctx, camX, camY);
  drawRocketControlZone(ctx, rect.width / 2, rect.height / 2);
  drawRocketShip(ctx, rect.width / 2, rect.height / 2, rocketState.ship.angle);
  drawRocketPointerTrace(ctx, rect);
  drawRocketSonar(ctx, rect, camX, camY);
  drawRocketDashboard(ctx, rect);
  drawRocketMiniMap(ctx, rect);
  drawRocketTimerBanner(ctx, rect);
  drawRocketScanBanner(ctx, rect);
  drawRocketLandingNotice(ctx, rect);
  drawRocketFeedback(ctx, rect);
}

function drawRocketSetupBackground(ctx, rect) {
  const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
  grad.addColorStop(0, "#071827");
  grad.addColorStop(0.5, "#092132");
  grad.addColorStop(1, "#050b12");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.strokeStyle = "rgba(134,213,255,.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x < rect.width; x += 44) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, rect.height);
    ctx.stroke();
  }
  for (let y = 0; y < rect.height; y += 44) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(rect.width, y);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(255,255,255,.06)";
  ctx.font = "900 12px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("SELECT ROUTE LENGTH", rect.width / 2, Math.max(80, rect.height * 0.28));
}

function drawRocketMap(ctx, rect, camX, camY) {
  const snap = ROCKET_STATIC_CACHE_SNAP;
  const cacheX = Math.floor(camX / snap) * snap;
  const cacheY = Math.floor(camY / snap) * snap;
  const cacheW = Math.ceil(rect.width + snap * 2);
  const cacheH = Math.ceil(rect.height + snap * 2);
  const boundaryStep = getRocketBoundaryPointStep();
  if (!rocketMapCache || rocketMapCache.x !== cacheX || rocketMapCache.y !== cacheY || rocketMapCache.w !== cacheW || rocketMapCache.h !== cacheH || rocketMapCache.features !== rocketWorldFeatures || rocketMapCache.boundaries !== rocketBoundaryLines || rocketMapCache.overlay !== rocketCountryOverlayEnabled || rocketMapCache.boundaryStep !== boundaryStep) {
    const canvas = rocketMapCache?.canvas || document.createElement("canvas");
    canvas.width = cacheW;
    canvas.height = cacheH;
    const cacheCtx = canvas.getContext("2d");
    cacheCtx.setTransform(1, 0, 0, 1, 0, 0);
    cacheCtx.imageSmoothingEnabled = true;
    cacheCtx.imageSmoothingQuality = "high";
    drawRocketStaticMap(cacheCtx, { width: cacheW, height: cacheH }, cacheX, cacheY);
    rocketMapCache = { canvas, x: cacheX, y: cacheY, w: cacheW, h: cacheH, features: rocketWorldFeatures, boundaries: rocketBoundaryLines, overlay: rocketCountryOverlayEnabled, boundaryStep };
  }
  ctx.drawImage(rocketMapCache.canvas, cacheX - camX, cacheY - camY);
  ctx.save();
  ctx.translate(-camX, -camY);
  const reveal = ctx.createRadialGradient(rocketState.ship.x, rocketState.ship.y, 120, rocketState.ship.x, rocketState.ship.y, 1000);
  reveal.addColorStop(0, "rgba(255,255,255,.18)");
  reveal.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = reveal;
  ctx.fillRect(rocketState.ship.x - 1000, rocketState.ship.y - 1000, 2000, 2000);
  ctx.restore();
}

function drawRocketStaticMap(ctx, rect, camX, camY) {
  drawRocketSatelliteBase(ctx, rect, camX, camY);
  ctx.save();
  ctx.translate(-camX, -camY);

  if (rocketCountryOverlayEnabled) for (let lon = -180; lon <= 180; lon += 15) {
    const { x } = worldPoint(lon, 0, rocketState.mapW, rocketState.mapH);
    ctx.strokeStyle = lon % 45 === 0 ? "rgba(134,213,255,.16)" : "rgba(134,213,255,.07)";
    ctx.lineWidth = lon % 45 === 0 ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, rocketState.mapH);
    ctx.stroke();
  }
  if (rocketCountryOverlayEnabled) for (let lat = -75; lat <= 75; lat += 15) {
    const { y } = worldPoint(0, lat, rocketState.mapW, rocketState.mapH);
    ctx.strokeStyle = lat % 45 === 0 ? "rgba(134,213,255,.16)" : "rgba(134,213,255,.07)";
    ctx.lineWidth = lat % 45 === 0 ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(rocketState.mapW, y);
    ctx.stroke();
  }

  if (rocketCountryOverlayEnabled && rocketWorldFeatures) {
    rocketWorldFeatures.forEach((country) => {
      const visible = country.bounds.maxX > camX - 160 && country.bounds.minX < camX + rect.width + 160 && country.bounds.maxY > camY - 160 && country.bounds.minY < camY + rect.height + 160;
      if (!visible) return;

      const countryPath = getRocketCountryPath(country);
      ctx.fillStyle = hexToRgba(country.color, 0.28);
      ctx.fill(countryPath, "evenodd");
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(2, 10, 15, 0.56)";
      ctx.lineWidth = 2.2;
      ctx.stroke(countryPath);
      ctx.strokeStyle = "rgba(238, 255, 232, 0.72)";
      ctx.lineWidth = 0.82;
      ctx.stroke(countryPath);
      drawRocketTinyCountryMarker(ctx, country);

    });
    drawRocketBoundaryLines(ctx, camX, camY, rect);
  } else if (rocketCountryOverlayEnabled) {
    mapCountries.forEach((country) => {
      const points = country.poly.map(([lon, lat]) => worldPoint(lon, lat, rocketState.mapW, rocketState.mapH));
      const visible = points.some((point) => point.x > camX - 240 && point.x < camX + rect.width + 240 && point.y > camY - 240 && point.y < camY + rect.height + 240);
      if (!visible) return;

      ctx.beginPath();
      points.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.closePath();
      ctx.fillStyle = hexToRgba(country.color, 0.28);
      ctx.fill();
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(4,18,22,.42)";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.strokeStyle = "rgba(232,255,217,.6)";
      ctx.lineWidth = 1;
      ctx.stroke();

    });
  }

  ctx.restore();
}

function drawRocketBoundaryLines(ctx, camX, camY, rect) {
  if (!rocketBoundaryLines?.length) return;
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(2, 10, 15, 0.64)";
  ctx.lineWidth = 2.1;
  drawRocketBoundaryLinePass(ctx, camX, camY, rect);
  ctx.strokeStyle = "rgba(230, 252, 230, 0.78)";
  ctx.lineWidth = 0.72;
  drawRocketBoundaryLinePass(ctx, camX, camY, rect);
  ctx.restore();
}

function drawRocketBoundaryLinePass(ctx, camX, camY, rect) {
  const pointStep = getRocketBoundaryPointStep();
  rocketBoundaryLines.forEach((line) => {
    const visible = line.bounds.maxX > camX - 120 && line.bounds.minX < camX + rect.width + 120 && line.bounds.maxY > camY - 120 && line.bounds.minY < camY + rect.height + 120;
    if (!visible) return;
    if (pointStep <= 1) {
      ctx.stroke(getRocketBoundaryPath(line));
      return;
    }
    ctx.beginPath();
    line.points.forEach((point, index) => {
      if (pointStep > 1 && index > 0 && index < line.points.length - 1 && index % pointStep !== 0) return;
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  });
}

function getRocketBoundaryPointStep() {
  return 1;
}

function getRocketCountryPath(country) {
  if (country.path) return country.path;
  const path = new Path2D();
  country.rings.forEach((ring) => {
    ring.forEach((point, index) => {
      if (index === 0) path.moveTo(point.x, point.y);
      else path.lineTo(point.x, point.y);
    });
    path.closePath();
  });
  country.path = path;
  return path;
}

function getRocketBoundaryPath(line) {
  if (line.path) return line.path;
  const path = new Path2D();
  line.points.forEach((point, index) => {
    if (index === 0) path.moveTo(point.x, point.y);
    else path.lineTo(point.x, point.y);
  });
  line.path = path;
  return path;
}

function satelliteHash(x, y, salt = 0) {
  let value = Math.imul(Math.floor(x) + 1013, 374761393) ^ Math.imul(Math.floor(y) + 668265263, 1274126177) ^ salt;
  value = (value ^ (value >>> 13)) >>> 0;
  return ((Math.imul(value, 1274126177) ^ value) >>> 0) / 4294967295;
}

function drawRocketSatelliteBase(ctx, rect, camX, camY) {
  if (rocketEarthImage.complete && rocketEarthImage.naturalWidth > 0) {
    drawRocketEarthRaster(ctx, rect, camX, camY);
    return;
  }
  ctx.fillStyle = "#071827";
  ctx.fillRect(0, 0, rect.width, rect.height);
}

function drawRocketEarthRaster(ctx, rect, camX, camY) {
  const imgW = rocketEarthImage.naturalWidth;
  const imgH = rocketEarthImage.naturalHeight;
  const viewLeft = Math.max(0, camX);
  const viewRight = Math.min(rocketState.mapW, camX + rect.width);
  const viewTop = Math.max(0, camY);
  const viewBottom = Math.min(rocketState.mapH, camY + rect.height);
  ctx.fillStyle = "#050b18";
  ctx.fillRect(0, 0, rect.width, rect.height);
  if (viewBottom <= viewTop || viewRight <= viewLeft) return;
  const sx = viewLeft / rocketState.mapW * imgW;
  const sy = viewTop / rocketState.mapH * imgH;
  const sw = (viewRight - viewLeft) / rocketState.mapW * imgW;
  const sh = (viewBottom - viewTop) / rocketState.mapH * imgH;
  const dx = viewLeft - camX;
  const dy = viewTop - camY;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(rocketEarthImage, sx, sy, sw, sh, dx, dy, viewRight - viewLeft, viewBottom - viewTop);
  drawRocketPolarEdge(ctx, rect, camY);
}

function drawRocketPolarEdge(ctx, rect, camY) {
  if (camY < 0) {
    const h = Math.min(rect.height, -camY);
    const top = ctx.createLinearGradient(0, 0, 0, h);
    top.addColorStop(0, "rgba(236, 246, 255, 0.88)");
    top.addColorStop(1, "rgba(236, 246, 255, 0)");
    ctx.fillStyle = top;
    ctx.fillRect(0, 0, rect.width, h);
  }
  const overflow = camY + rect.height - rocketState.mapH;
  if (overflow > 0) {
    const h = Math.min(rect.height, overflow);
    const bottom = ctx.createLinearGradient(0, rect.height - h, 0, rect.height);
    bottom.addColorStop(0, "rgba(236, 246, 255, 0)");
    bottom.addColorStop(1, "rgba(236, 246, 255, 0.88)");
    ctx.fillStyle = bottom;
    ctx.fillRect(0, rect.height - h, rect.width, h);
  }
}

function drawRocketGlobeCurvature(ctx, rect) {
  if (!rocketState || rocketState.phase === "setup") return;
  const altitude = rocketState.ship.altitude || 0;
  const amount = Math.max(0.12, Math.min(0.36, 0.12 + altitude / 22000));
  ctx.save();
  const side = ctx.createRadialGradient(rect.width / 2, rect.height / 2, rect.width * 0.35, rect.width / 2, rect.height / 2, rect.width * 0.86);
  side.addColorStop(0, "rgba(255,255,255,0)");
  side.addColorStop(0.78, "rgba(84, 174, 222, 0)");
  side.addColorStop(1, `rgba(84, 174, 222, ${amount})`);
  ctx.fillStyle = side;
  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.strokeStyle = `rgba(190, 232, 255, ${amount * 0.75})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(rect.width / 2, rect.height + rect.height * 0.18, rect.width * 0.72, rect.height * 0.30, 0, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawRocketTinyCountryMarker(ctx, country) {
  const width = country.bounds.maxX - country.bounds.minX;
  const height = country.bounds.maxY - country.bounds.minY;
  if (width > ROCKET_TINY_COUNTRY_DOT_MAX || height > ROCKET_TINY_COUNTRY_DOT_MAX) return;
  const x = country.labelPoint?.x ?? (country.bounds.minX + country.bounds.maxX) / 2;
  const y = country.labelPoint?.y ?? (country.bounds.minY + country.bounds.maxY) / 2;
  const radius = Math.max(3.2, Math.min(5.2, Math.max(width, height) * 0.38));
  ctx.fillStyle = country.color;
  ctx.strokeStyle = "rgba(235,255,221,.9)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function drawRocketAtmosphere(ctx, rect) {
  if (!rocketState) return;
  const altitude = rocketState.ship.altitude || 0;
  ctx.save();
  if (altitude > 1150) {
    const starAlpha = Math.min(0.28, (altitude - 1150) / 5200);
    ctx.fillStyle = `rgba(255,255,255,${starAlpha})`;
    for (let i = 0; i < 58; i += 1) {
      const x = (i * 139 + Math.floor(rocketState.ship.x * 0.03)) % rect.width;
      const y = (i * 83 + Math.floor(rocketState.ship.y * 0.02)) % Math.max(1, rect.height * 0.62);
      ctx.beginPath();
      ctx.arc(x, y, i % 7 === 0 ? 1.7 : 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const x = rect.width - 92;
  const y = Math.max(190, rect.height * 0.28);
  ctx.fillStyle = "rgba(3,8,14,.54)";
  roundRect(ctx, x, y, 68, 190, 14);
  ctx.fill();
  [
    ["GROUND", 0, "#45f875"],
    ["LOW AIR", 700, "#ffffff"],
    ["HIGH SKY", 1600, "#3a8cff"],
    ["ORBIT", 4200, "#b35cff"]
  ].forEach(([label, level, color], index) => {
    const by = y + 160 - index * 45;
    ctx.globalAlpha = altitude >= level ? 1 : 0.35;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + 12, by);
    ctx.lineTo(x + 56, by);
    ctx.stroke();
    ctx.font = "800 8px system-ui";
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    ctx.fillText(label, x + 34, by - 6);
  });
  ctx.globalAlpha = 1;
  const markerY = y + 160 - Math.min(1, altitude / 6200) * 160;
  ctx.fillStyle = "#ffd33d";
  ctx.beginPath();
  ctx.arc(x + 34, markerY, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRocketSpaceLayer(ctx, rect) {
  if (!rocketState) return;
  const altitude = rocketState.ship.altitude || 0;
  const speed = Math.hypot(rocketState.ship.vx, rocketState.ship.vy);
  const amount = Math.max(0, Math.min(1, Math.max((altitude - 3000) / 2200, (speed - 1180) / 560)));
  if (amount <= 0) return;
  ctx.save();
  ctx.fillStyle = `rgba(34, 112, 178, ${amount * 0.05})`;
  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.fillStyle = `rgba(255,255,255,${0.18 + amount * 0.22})`;
  for (let i = 0; i < 90; i += 1) {
    const x = (i * 173 + Math.floor(rocketState.ship.x * 0.018)) % rect.width;
    const y = (i * 89 + Math.floor(rocketState.ship.y * 0.014)) % rect.height;
    ctx.beginPath();
    ctx.arc(x, y, i % 11 === 0 ? 1.8 : 0.9, 0, Math.PI * 2);
    ctx.fill();
  }
  const earthY = rect.height + 140 - amount * 80;
  const earth = ctx.createRadialGradient(rect.width * 0.5, earthY, rect.width * 0.15, rect.width * 0.5, earthY, rect.width * 0.72);
  earth.addColorStop(0, `rgba(48, 150, 212, ${amount * 0.28})`);
  earth.addColorStop(0.58, `rgba(27, 96, 148, ${amount * 0.18})`);
  earth.addColorStop(1, "rgba(27, 96, 148, 0)");
  ctx.fillStyle = earth;
  ctx.beginPath();
  ctx.ellipse(rect.width * 0.5, earthY, rect.width * 0.72, 170, 0, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `rgba(255,255,255,${amount})`;
  ctx.font = "950 12px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("SPACE FLIGHT", rect.width / 2, 34);
  ctx.restore();
}

function drawRocketTrail(ctx, camX, camY) {
  const trail = rocketState.trail || [];
  if (trail.length < 2) return;
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  for (let index = 1; index < trail.length; index += 1) {
    const prev = trail[index - 1];
    const point = trail[index];
    const alpha = Math.min(prev.life / prev.maxLife, point.life / point.maxLife);
    ctx.strokeStyle = `rgba(255, 211, 61, ${0.18 + alpha * 0.46})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(prev.x - camX, prev.y - camY);
    ctx.lineTo(point.x - camX, point.y - camY);
    ctx.stroke();
    if (index % 8 === 0) {
      const x = point.x - camX;
      const y = point.y - camY;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(point.angle);
      ctx.strokeStyle = `rgba(179, 92, 255, ${0.22 + alpha * 0.58})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-10, -10);
      ctx.lineTo(12, 0);
      ctx.lineTo(-10, 10);
      ctx.stroke();
      ctx.restore();
    }
  }
  ctx.restore();
}

function getRocketNavigationObjective() {
  if (!rocketState || rocketState.phase === "setup" || rocketState.phase === "briefing") return null;
  const target = rocketScanActive() && rocketState.target ? {
    key: `target-${rocketState.target.name}`,
    label: "SCAN",
    point: rocketState.target,
    distance: Math.hypot(rocketState.ship.x - rocketState.target.x, rocketState.ship.y - rocketState.target.y)
  } : null;
  const largeTarget = !target && getLargeCountryTargetIntel();
  const depot = nearestRocketDepot();
  const depotVisible = depot && isDepotDistanceIntelVisible(depot);
  const depotObjective = depotVisible ? {
    key: `depot-${depot.name}`,
    label: "DEPOT",
    point: depot,
    distance: depot.distance
  } : null;
  if (target) return target;
  if (largeTarget) return largeTarget;
  return depotObjective;
}

function getLargeCountryTargetIntel() {
  if (!rocketState?.target) return null;
  const country = rocketCountryFeature(rocketState.target.name);
  if (!isLargeRocketCountry(country)) return null;
  const distance = Math.hypot(rocketState.ship.x - rocketState.target.x, rocketState.ship.y - rocketState.target.y);
  const inCountry = pointInRocketCountry({ x: rocketState.ship.x, y: rocketState.ship.y }, country);
  if (!inCountry && distance > 1450) return null;
  return {
    key: `large-target-${rocketState.target.name}`,
    label: "TARGET",
    point: rocketState.target,
    distance,
    simple: true
  };
}

function isLargeRocketCountry(country) {
  if (!country?.bounds) return false;
  const width = country.bounds.maxX - country.bounds.minX;
  const height = country.bounds.maxY - country.bounds.minY;
  return width > 900 || height > 620;
}

function isDepotDistanceIntelVisible(depot) {
  if (!depot || depot.used) return false;
  if (depot.distance < 1150) return true;
  const country = rocketCountryFeature(depot.country);
  if (!country) return false;
  return pointInRocketCountry({ x: rocketState.ship.x, y: rocketState.ship.y }, country);
}

function rocketScanActive() {
  return Boolean(rocketState?.targetScanUntil && performance.now() < rocketState.targetScanUntil);
}

function getRocketTargetScan() {
  if (!rocketScanActive() || !rocketState?.target) return null;
  const distance = Math.hypot(rocketState.ship.x - rocketState.target.x, rocketState.ship.y - rocketState.target.y);
  return {
    distance,
    km: Math.max(1, Math.round(distance * 4.9)),
    seconds: Math.max(0, (rocketState.targetScanUntil - performance.now()) / 1000)
  };
}

function getRocketSonarTargetReadout() {
  const level = rocketState?.tech?.sonar || 0;
  const ideal = rocketState?.targetIdeal;
  if (level < 5 || !ideal || !rocketState?.target) return null;
  if (level >= 6) {
    return `PERFECT ${ideal.speed} m/s | ${ideal.altitude} m`;
  }
  const speedMin = Math.max(0, ideal.speed - ideal.toleranceSpeed);
  const speedMax = ideal.speed + ideal.toleranceSpeed;
  const altMin = Math.max(0, ideal.altitude - ideal.toleranceAltitude);
  const altMax = ideal.altitude + ideal.toleranceAltitude;
  return `IDEAL ${speedMin}-${speedMax} m/s | ${altMin}-${altMax} m`;
}

function updateRocketDistanceTrend() {
  const objective = getRocketNavigationObjective();
  if (!objective) {
    rocketState.distanceTrend = null;
    rocketState.lastObjectiveDistance = null;
    return;
  }
  const previous = rocketState.lastObjectiveDistance?.key === objective.key ? rocketState.lastObjectiveDistance.distance : objective.distance;
  rocketState.distanceTrend = {
    key: objective.key,
    label: objective.label,
    distance: objective.distance,
    delta: objective.distance - previous,
    simple: Boolean(objective.simple)
  };
  rocketState.lastObjectiveDistance = { key: objective.key, distance: objective.distance };
}

function rocketAltitudeColor() {
  const amount = Math.max(0, Math.min(1, rocketState.ship.altitude / 2500));
  const hue = 125 - amount * 125;
  return `hsl(${hue.toFixed(0)}, 92%, 56%)`;
}

function drawRocketPointerTrace(ctx, rect) {
  if (!rocketState?.mouse?.inside || rocketState.phase === "setup" || rocketState.phase === "briefing") return;
  const color = rocketAltitudeColor();
  const noseX = rect.width / 2 + Math.cos(rocketState.ship.angle) * 62;
  const noseY = rect.height / 2 + Math.sin(rocketState.ship.angle) * 62;
  const mx = Number.isFinite(rocketState.mouse.smoothX) ? rocketState.mouse.smoothX : rocketState.mouse.x;
  const my = Number.isFinite(rocketState.mouse.smoothY) ? rocketState.mouse.smoothY : rocketState.mouse.y;
  const dx = mx - rect.width / 2;
  const dy = my - rect.height / 2;
  const distance = Math.hypot(dx, dy);
  const along = dx * Math.cos(rocketState.ship.angle) + dy * Math.sin(rocketState.ship.angle);
  const decelCue = along >= 0 && distance < 115;
  const brakeCue = Boolean(rocketState.keys?.Space);
  ctx.save();
  ctx.strokeStyle = brakeCue || decelCue ? "#ff6848" : color;
  ctx.lineWidth = 3;
  ctx.setLineDash([12, 9]);
  ctx.beginPath();
  ctx.moveTo(noseX, noseY);
  ctx.lineTo(mx, my);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = "900 10px system-ui";
  ctx.textAlign = "center";
  if (brakeCue || decelCue) {
    ctx.fillStyle = "#ffb199";
    ctx.fillText(brakeCue ? "SPACE AIRBRAKE: floor 30 m/s" : "DECEL: cursor close to nose", rect.width / 2, rect.height / 2 + 86);
  }
  ctx.fillStyle = brakeCue || decelCue ? "#ff6848" : color;
  ctx.beginPath();
  ctx.arc(mx, my, 5, 0, Math.PI * 2);
  ctx.fill();
  const trend = rocketState.distanceTrend;
  if (trend) {
    const km = Math.max(0, Math.round(trend.distance * 4.9));
    const deltaKm = Math.round(trend.delta * 4.9);
    const closing = deltaKm <= 0;
    const text = trend.simple ? `${trend.label} ${km.toLocaleString()} km` : `${trend.label} ${km.toLocaleString()} km ${closing ? "" : "+"}${deltaKm.toLocaleString()} km`;
    ctx.font = "950 12px system-ui";
    const boxW = Math.min(rect.width - 28, Math.max(150, ctx.measureText(text).width + 20));
    const tx = Math.min(rect.width - boxW - 14, Math.max(14, mx + 14));
    const ty = Math.min(rect.height - 40, Math.max(42, my - 16));
    ctx.fillStyle = "rgba(3, 8, 14, .82)";
    roundRect(ctx, tx, ty - 20, boxW, 32, 9);
    ctx.fill();
    ctx.fillStyle = closing ? "#45f875" : "#ff3d5a";
    ctx.textAlign = "left";
    ctx.fillText(text, tx + 10, ty);
  }
  ctx.restore();
}

function drawRocketSonar(ctx, rect, camX, camY) {
  const level = rocketState?.tech?.sonar || 0;
  if (level <= 0 || rocketState.phase === "setup" || rocketState.phase === "briefing") return;
  ctx.save();
  const pulse = (performance.now() / 1000) % 2.4 / 2.4;
  if (level >= 1) {
    const radius = 115 + pulse * (80 + level * 18);
    ctx.strokeStyle = `rgba(69, 248, 117, ${0.34 * (1 - pulse)})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.arc(rect.width / 2, rect.height / 2, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  const ping = rocketState.sonarPing;
  if (ping) {
    const t = Math.max(0, ping.life / ping.maxLife);
    const x = ping.x - camX;
    const y = ping.y - camY;
    if (x > -160 && x < rect.width + 160 && y > -160 && y < rect.height + 160) {
      ctx.globalAlpha = Math.min(1, t * 1.6);
      ctx.strokeStyle = "rgba(69,248,117,.86)";
      ctx.fillStyle = "rgba(69,248,117,.16)";
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i += 1) {
        const r = 26 + (1 - t) * 95 + i * 28;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#45f875";
      ctx.font = "950 12px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("SONAR DEPOT", x, y - 24);
    }
  }
  ctx.restore();
}

function drawRocketDepots(ctx, camX, camY) {
  return;
  rocketState.depots.forEach((depot) => {
    if (depot.used) return;
    const x = depot.x - camX;
    const y = depot.y - camY;
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "rgba(179, 92, 255, 0.5)";
    ctx.lineWidth = 3;
    ctx.setLineDash([14, 12]);
    ctx.beginPath();
    ctx.arc(0, 0, ROCKET_DEPOT_RADIUS, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = "rgba(69, 248, 117, 0.44)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(54, ROCKET_DEPOT_RADIUS * 0.62), 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 211, 61, 0.7)";
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.save();
    ctx.rotate(depot.angle);
    ctx.strokeStyle = "rgba(255, 61, 90, 0.64)";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 10]);
    ctx.beginPath();
    ctx.moveTo(-ROCKET_DEPOT_RADIUS, 0);
    ctx.lineTo(ROCKET_DEPOT_RADIUS, 0);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(5,11,18,.86)";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    roundRect(ctx, -72, -16, 144, 32, 8);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#ffd33d";
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.moveTo(-54, 0);
    ctx.lineTo(54, 0);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#22d9f2";
    ctx.fillRect(-76, -22, 14, 44);
    ctx.fillRect(62, -22, 14, 44);
    ctx.fillStyle = "#ff3d5a";
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-23, 0);
    ctx.lineTo(23, 0);
    ctx.moveTo(0, -23);
    ctx.lineTo(0, 23);
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 13px system-ui";
    ctx.textAlign = "center";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(0,0,0,.7)";
    ctx.strokeText("AIRPORT REFUEL", 0, -90);
    ctx.fillText("AIRPORT REFUEL", 0, -90);
    ctx.font = "800 12px system-ui";
    ctx.strokeText("CENTER + <=20 m/s BONUS", 0, 96);
    ctx.fillStyle = "#22d9f2";
    ctx.fillText("CENTER + <=20 m/s BONUS", 0, 96);
    ctx.restore();
  });
}

function drawRocketDistanceLines(ctx, rect, camX, camY) {
  const depot = nearestRocketDepot();
  if (!depot) return;
  const sx = rocketState.ship.x - camX;
  const sy = rocketState.ship.y - camY;
  const dx = depot.x - camX;
  const dy = depot.y - camY;
  ctx.save();
  ctx.strokeStyle = "rgba(34,217,242,.32)";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 12]);
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(dx, dy);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(3,9,15,.78)";
  roundRect(ctx, Math.min(rect.width - 190, Math.max(18, dx + 18)), Math.min(rect.height - 54, Math.max(138, dy - 18)), 172, 42, 10);
  ctx.fill();
  ctx.fillStyle = "#22d9f2";
  ctx.font = "900 12px system-ui";
  ctx.fillText(`FUEL ${formatRocketDistance(depot)}`, Math.min(rect.width - 178, Math.max(30, dx + 30)), Math.min(rect.height - 28, Math.max(164, dy + 8)));
  ctx.restore();
}

function nearestRocketDepot() {
  if (!rocketState?.depots) return null;
  let nearest = null;
  rocketState.depots.forEach((depot) => {
    if (depot.used) return;
    depot.distance = Math.hypot(rocketState.ship.x - depot.x, rocketState.ship.y - depot.y);
    if (!nearest || depot.distance < nearest.distance) nearest = depot;
  });
  return nearest;
}

function formatRocketDistance(point) {
  const distance = Math.hypot(rocketState.ship.x - point.x, rocketState.ship.y - point.y);
  return `${Math.max(1, Math.round(distance * 4.9)).toLocaleString()} km`;
}

function formatRocketAccel() {
  const accel = rocketState?.accel || 0;
  if (Math.abs(accel) < 1) return "0 m/s²";
  return `${accel > 0 ? "+" : ""}${accel.toFixed(0)} m/s²`;
}

function drawRocketSideQuest(ctx, camX, camY) {
  return;
  const quest = rocketState.sideQuest;
  if (!quest || quest.done) return;
  rocketState.sideQuestPulse += 0.05;
  const x = quest.x - camX;
  const y = quest.y - camY;
  const pulse = 0.65 + Math.sin(rocketState.sideQuestPulse * 4) * 0.35;
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = 0.55 + pulse * 0.35;
  ctx.strokeStyle = "#fff8a8";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.lineTo(0, 38);
  ctx.moveTo(-38, 0);
  ctx.lineTo(38, 0);
  ctx.stroke();
  ctx.fillStyle = "#ffe66d";
  ctx.fillRect(-5, -5, 10, 10);
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 13px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("CAPITAL", 0, -52);
  ctx.restore();
}

function drawRocketClouds(ctx, camX, camY) {
  rocketState.clouds.forEach((cloud) => {
    const x = cloud.x - camX;
    const y = cloud.y - camY;
    if (x < -cloud.r || x > rocketState.viewW + cloud.r || y < -cloud.r || y > rocketState.viewH + cloud.r) return;
    ctx.save();
    const grad = ctx.createRadialGradient(x, y, cloud.r * 0.12, x, y, cloud.r);
    grad.addColorStop(0, "rgba(245,250,255,.9)");
    grad.addColorStop(0.55, "rgba(205,220,230,.72)");
    grad.addColorStop(1, "rgba(205,220,230,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x, y, cloud.r * 1.25, cloud.r * 0.6, Math.sin(cloud.seed) * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function drawRocketRunway(ctx, camX, camY) {
  if (rocketState.phase !== "takeoff") return;
  const x = rocketState.start.x - camX;
  const y = rocketState.start.y - camY;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rocketState.ship.angle);
  ctx.fillStyle = "rgba(255,211,61,.2)";
  ctx.fillRect(-92, -28, 184, 56);
  ctx.strokeStyle = "rgba(255,255,255,.28)";
  ctx.lineWidth = 2;
  ctx.strokeRect(-92, -28, 184, 56);
  ctx.fillStyle = "#ffd33d";
  ctx.font = "900 13px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("TAKEOFF ZONE", 0, -42);
  ctx.restore();
}

function drawRocketControlZone(ctx, x, y) {
  if (rocketState.phase === "briefing") return;
  const manual = rocketState.manualControl;
  ctx.save();
  ctx.strokeStyle = manual ? "rgba(69,248,117,.62)" : "rgba(179,92,255,.5)";
  ctx.fillStyle = manual ? "rgba(69,248,117,.055)" : "rgba(179,92,255,.055)";
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 12]);
  ctx.beginPath();
  ctx.arc(x, y, 230, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.textAlign = "center";
  ctx.font = "900 12px system-ui";
  ctx.fillStyle = manual ? "#45f875" : "#b35cff";
  ctx.fillText(manual ? "MANUAL CONTROL" : "AUTOPILOT STRAIGHT", x, y - 246);
  ctx.restore();
}

function drawRocketShip(ctx, x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(0.48, 0.48);
  const speed = Math.hypot(rocketState.ship.vx, rocketState.ship.vy);
  const spin = performance.now() * (0.01 + rocketState.ship.throttle * 0.06);
  const bank = rocketState.ship.bank || 0;
  const wingLift = bank * 12;
  const leftShade = bank > 0 ? "#7f1821" : "#d33a3f";
  const rightShade = bank < 0 ? "#7f1821" : "#d33a3f";

  ctx.save();
  ctx.translate(-10, 16 + Math.abs(bank) * 6);
  ctx.scale(1, 0.72);
  ctx.fillStyle = "rgba(0,0,0,.28)";
  ctx.beginPath();
  ctx.ellipse(0, 0, 116, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = "rgba(255,255,255,.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 92, bank > 0 ? -0.48 : 0.25, bank > 0 ? -0.18 : 0.55);
  ctx.stroke();

  ctx.fillStyle = leftShade;
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.lineTo(-34, -86 + wingLift);
  ctx.lineTo(-4, -92 + wingLift);
  ctx.lineTo(34, -13);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = rightShade;
  ctx.beginPath();
  ctx.moveTo(0, 12);
  ctx.lineTo(-34, 86 + wingLift);
  ctx.lineTo(-4, 92 + wingLift);
  ctx.lineTo(34, 13);
  ctx.closePath();
  ctx.fill();

  const fuselage = ctx.createLinearGradient(-82, -18, 72, 18);
  fuselage.addColorStop(0, "#8f1f28");
  fuselage.addColorStop(0.35, "#c92e35");
  fuselage.addColorStop(0.72, "#e34b48");
  fuselage.addColorStop(1, "#7c151d");
  ctx.fillStyle = fuselage;
  ctx.strokeStyle = "#4e1118";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(78, 0);
  ctx.quadraticCurveTo(45, -22, -92, -13);
  ctx.lineTo(-112, -5);
  ctx.lineTo(-112, 5);
  ctx.quadraticCurveTo(45, 22, 78, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#9e2028";
  ctx.beginPath();
  ctx.moveTo(-82, -10);
  ctx.lineTo(-132, -46);
  ctx.lineTo(-112, -6);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-82, 10);
  ctx.lineTo(-132, 46);
  ctx.lineTo(-112, 6);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#b72c34";
  ctx.fillRect(-118, -9, 36, 18);

  ctx.fillStyle = "rgba(8,16,24,.88)";
  ctx.beginPath();
  ctx.roundRect?.(-14, -13, 38, 26, 8);
  if (!ctx.roundRect) {
    roundRect(ctx, -14, -13, 38, 26, 8);
  }
  ctx.fill();
  ctx.fillStyle = "rgba(74,214,255,.9)";
  ctx.fillRect(-9, -8, 12, 16);
  ctx.fillRect(8, -8, 12, 16);

  ctx.strokeStyle = "rgba(255,255,255,.28)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-3, -88 + wingLift);
  ctx.lineTo(22, -16);
  ctx.moveTo(-3, 88 + wingLift);
  ctx.lineTo(22, 16);
  ctx.stroke();

  ctx.save();
  ctx.translate(86, 0);
  ctx.rotate(spin);
  ctx.strokeStyle = rocketState.ship.throttle > 0.3 ? "rgba(255,255,255,.78)" : "rgba(255,255,255,.42)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, -30);
  ctx.lineTo(0, 30);
  ctx.moveTo(-30, 0);
  ctx.lineTo(30, 0);
  ctx.stroke();
  ctx.fillStyle = "#1b232d";
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = speed > 105 ? "rgba(34,217,242,.2)" : "rgba(255,211,61,.18)";
  ctx.beginPath();
  ctx.moveTo(-96, 0);
  ctx.lineTo(-136, -12);
  ctx.lineTo(-128, 0);
  ctx.lineTo(-136, 12);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawRocketDashboard(ctx, rect) {
  const speed = Math.hypot(rocketState.ship.vx, rocketState.ship.vy);
  const plane = getPlaneClass({ tech: rocketState.tech, telemetry: rocketState.telemetry }).name;
  const x = 18;
  const y = rect.height - 132;
  ctx.save();
  ctx.fillStyle = "rgba(3,9,15,.78)";
  ctx.strokeStyle = "rgba(255,255,255,.18)";
  ctx.lineWidth = 1;
  ctx.fillRect(x, y, 360, 110);
  ctx.strokeRect(x, y, 360, 110);
  drawGauge(ctx, x + 54, y + 50, "SPD", speed, 1400, "#22d9f2", `${speed.toFixed(0)} m/s`);
  drawGauge(ctx, x + 146, y + 50, "ALT", rocketState.ship.altitude, 6200, "#b35cff", `${rocketState.ship.altitude.toFixed(0)} m`);
  drawGauge(ctx, x + 238, y + 50, "FUEL", rocketState.fuel, 100, "#ffd33d", `${rocketState.fuel.toFixed(0)}%`);
  ctx.fillStyle = "#d9e6f3";
  ctx.font = "800 13px system-ui";
  ctx.textAlign = "left";
  ctx.fillText(rocketState.phase.toUpperCase(), x + 292, y + 56);
  const takeoffReady = speed >= 105 && rocketState.ship.altitude < 120;
  if (rocketState.phase === "briefing") {
    ctx.fillStyle = "#d9e6f3";
    ctx.fillText("READY", x + 292, y + 76);
  } else if (rocketState.phase === "takeoff") {
    ctx.fillStyle = "#d9e6f3";
    ctx.fillText(takeoffReady ? "PULL UP" : "BUILD SPEED", x + 292, y + 76);
  }
  ctx.fillStyle = "#9aa8b8";
  ctx.font = "750 11px system-ui";
  ctx.fillText(`Accel ${formatRocketAccel()}`, x + 292, y + 95);
  ctx.fillStyle = "#d9e6f3";
  ctx.font = "800 10px system-ui";
  ctx.fillText(plane, x + 18, y + 98);
  ctx.restore();
}

function getRocketLandingStatus() {
  const depot = nearestRocketDepot();
  if (!depot) return null;
  const speed = Math.hypot(rocketState.ship.vx, rocketState.ship.vy);
  const altitude = rocketState.ship.altitude;
  const zone = rocketState.objectiveZone?.type === "depot" && rocketState.objectiveZone.id === depot.name ? rocketState.objectiveZone : null;
  const close = depot.distance < 700;
  const roughOk = depot.distance < ROCKET_DEPOT_RADIUS;
  const goodOk = depot.distance < Math.max(54, ROCKET_DEPOT_RADIUS * 0.62);
  const alignDeg = rocketAngleDelta(rocketState.ship.angle, depot.angle) * 180 / Math.PI;
  let text = `FUEL DEPOT ${formatRocketDistance(depot)}`;
  let subtext = "Enter the depot circle. The next 1 second samples speed, altitude, and descent for refuel rewards.";
  let status = "info";
  if (close) {
    if (roughOk) {
      text = "DEPOT ZONE";
      subtext = zone
        ? `Entry ${zone.entrySpeed.toFixed(0)} m/s at ${zone.entryAltitude.toFixed(0)} m. Sampling ${Math.max(0, zone.entryTime - rocketState.time).toFixed(1)} / ${ROCKET_OBJECTIVE_SAMPLE_SECONDS.toFixed(0)}s.`
        : `Enter to record. Current ${speed.toFixed(0)} m/s and ${altitude.toFixed(0)} m.`;
      status = zone ? "success" : "warn";
    }
  }
  return { depot, speed, altitude, alignDeg, text, subtext, status };
}

function drawRocketLandingNotice(ctx, rect) {
  if (!rocketState?.landingNotice) return;
  const notice = rocketState.landingNotice;
  const alpha = Math.min(1, notice.life / 0.5, notice.life / notice.maxLife * 1.8);
  const lines = notice.lines || [];
  const w = Math.min(620, rect.width - 36);
  const h = lines.length ? 144 : 78;
  const x = rect.width / 2 - w / 2;
  const y = Math.max(96, rect.height - h - 92);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(4, 43, 28, .88)";
  ctx.strokeStyle = "rgba(69,248,117,.88)";
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, w, h, 14);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = notice.color || "#45f875";
  ctx.font = "950 18px system-ui";
  ctx.fillText(notice.title || "CHECKPOINT CONFIRMED", x + 16, y + 28);
  if (notice.rating) {
    ctx.textAlign = "right";
    ctx.font = "950 15px system-ui";
    ctx.fillText(notice.rating, x + w - 16, y + 28);
    ctx.textAlign = "left";
  }
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 15px system-ui";
  ctx.fillText(notice.text, x + 16, y + 54);
  ctx.font = "800 12px system-ui";
  lines.forEach((line, index) => {
    ctx.fillStyle = index === 3 ? (notice.color || "#45f875") : "rgba(232,242,255,.92)";
    ctx.fillText(line, x + 16, y + 78 + index * 21);
  });
  ctx.restore();
}

function drawRocketTimerBanner(ctx, rect) {
  const time = Math.max(0, rocketState.time);
  const warning = rocketState.active && time < 20;
  const x = rect.width / 2;
  const y = 18;
  ctx.save();
  ctx.textAlign = "center";
  const w = Math.min(430, rect.width - 32);
  ctx.fillStyle = warning ? "rgba(95, 8, 20, .76)" : "rgba(3, 8, 14, .76)";
  ctx.strokeStyle = warning ? "rgba(255,104,72,.82)" : "rgba(255,211,61,.78)";
  ctx.lineWidth = 2;
  roundRect(ctx, x - w / 2, y, w, 68, 15);
  ctx.fill();
  ctx.stroke();
  ctx.font = "900 11px system-ui";
  ctx.fillStyle = "#d9e6f3";
  ctx.fillText("TIME BONUS", x, y + 17);
  ctx.font = "1000 38px system-ui";
  ctx.lineWidth = 7;
  ctx.strokeStyle = "rgba(0,0,0,.78)";
  ctx.strokeText(`${time.toFixed(1)}s`, x, y + 51);
  ctx.fillStyle = warning ? "#ff6848" : "#ffd33d";
  ctx.fillText(`${time.toFixed(1)}s`, x, y + 51);
  ctx.restore();
}

function drawRocketScanBanner(ctx, rect) {
  const scan = getRocketTargetScan();
  const sonarReadout = getRocketSonarTargetReadout();
  if (!scan && !sonarReadout) return;
  const x = rect.width / 2;
  const y = 92;
  const w = Math.min(390, rect.width - 36);
  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(3, 8, 14, .82)";
  ctx.strokeStyle = "rgba(34,217,242,.78)";
  ctx.lineWidth = 2;
  roundRect(ctx, x - w / 2, y, w, 54, 14);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#22d9f2";
  ctx.font = "950 12px system-ui";
  ctx.fillText(scan ? "DESTINATION SCAN" : "SONAR APPROACH", x, y + 18);
  ctx.fillStyle = "#ffffff";
  ctx.font = scan && !sonarReadout ? "1000 22px system-ui" : "1000 16px system-ui";
  const text = scan
    ? `${scan.km.toLocaleString()} km | ${scan.seconds.toFixed(1)}s${sonarReadout ? ` | ${sonarReadout}` : ""}`
    : sonarReadout;
  ctx.fillText(text, x, y + 42);
  ctx.restore();
}

function rocketFeedback(text, color = "#ffffff", tone = "info") {
  if (!rocketState) return;
  rocketState.feedback.push({ text, color, tone, life: 1.35, maxLife: 1.35 });
  rocketState.feedback = rocketState.feedback.slice(-4);
}

function drawRocketFeedback(ctx, rect) {
  if (rocketState.flash) {
    const alpha = Math.max(0, rocketState.flash.life / rocketState.flash.maxLife) * 0.24;
    ctx.save();
    ctx.fillStyle = hexToRgba(rocketState.flash.color, alpha);
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.restore();
  }
  rocketState.feedback.forEach((item, index) => {
    const t = Math.max(0, item.life / item.maxLife);
    const bounce = Math.sin((1 - t) * Math.PI) * 18;
    const y = rect.height * 0.27 + index * 54 - bounce;
    ctx.save();
    ctx.globalAlpha = Math.min(1, t * 1.6);
    ctx.textAlign = "center";
    ctx.font = "900 26px system-ui";
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(0,0,0,.72)";
    ctx.strokeText(item.text, rect.width / 2, y);
    ctx.fillStyle = item.color;
    ctx.fillText(item.text, rect.width / 2, y);
    ctx.restore();
  });
}

function drawHudChip(ctx, x, y, label, value, color) {
  ctx.fillStyle = "rgba(255,255,255,.06)";
  roundRect(ctx, x, y, 84, 30, 8);
  ctx.fill();
  ctx.fillStyle = "#9aa8b8";
  ctx.font = "700 9px system-ui";
  ctx.textAlign = "left";
  ctx.fillText(label, x + 8, y + 12);
  ctx.fillStyle = color;
  ctx.font = "900 13px system-ui";
  ctx.fillText(value, x + 8, y + 25);
}

function drawGauge(ctx, x, y, label, value, max, color, valueText = "") {
  const start = Math.PI * 0.8;
  const end = Math.PI * 2.2;
  const amount = Math.max(0, Math.min(1, value / max));
  ctx.strokeStyle = "rgba(255,255,255,.18)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(x, y, 30, start, end);
  ctx.stroke();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 30, start, start + (end - start) * amount);
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.font = "800 11px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y + 4);
  ctx.fillStyle = "#d9e6f3";
  ctx.font = "850 11px system-ui";
  ctx.fillText(valueText, x, y + 47);
}

function drawRocketMiniMap(ctx, rect) {
  const w = 190, h = 96, x = rect.width - w - 18, y = 18;
  const base = getRocketMiniMapBase(w, h);
  ctx.drawImage(base, x, y);
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.fillStyle = "#45f875";
  ctx.beginPath();
  ctx.arc(x + rocketState.ship.x / rocketState.mapW * w, y + rocketState.ship.y / rocketState.mapH * h, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function getRocketMiniMapBase(w, h) {
  const imageReady = rocketMiniMapImage.complete && rocketMiniMapImage.naturalWidth > 0;
  if (rocketMiniMapCache && rocketMiniMapCache.w === w && rocketMiniMapCache.h === h && rocketMiniMapCache.features === rocketWorldFeatures && rocketMiniMapCache.mapW === rocketState.mapW && rocketMiniMapCache.mapH === rocketState.mapH && rocketMiniMapCache.imageReady === imageReady) {
    return rocketMiniMapCache.canvas;
  }
  const canvas = rocketMiniMapCache?.canvas || document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(3,9,15,.72)";
  ctx.fillRect(0, 0, w, h);
  if (imageReady) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(rocketMiniMapImage, 0, 0, w, h);
    ctx.strokeStyle = "rgba(5,5,5,.42)";
    ctx.strokeRect(0, 0, w, h);
    rocketMiniMapCache = { canvas, w, h, features: rocketWorldFeatures, mapW: rocketState.mapW, mapH: rocketState.mapH, imageReady };
    return canvas;
  }
  ctx.strokeStyle = "rgba(255,255,255,.2)";
  ctx.strokeRect(0, 0, w, h);
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, w, h);
  ctx.clip();
  ctx.strokeStyle = "rgba(190,230,205,.55)";
  ctx.fillStyle = "rgba(103,183,124,.18)";
  ctx.lineWidth = 0.8;
  const features = rocketWorldFeatures || mapCountries.map((country) => ({
    rings: [country.poly.map(([lon, lat]) => worldPoint(lon, lat))]
  }));
  features.forEach((country) => {
    ctx.beginPath();
    country.rings.forEach((ring) => {
      ring.forEach((point, index) => {
        const px = point.x / rocketState.mapW * w;
        const py = point.y / rocketState.mapH * h;
        if (index === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
    });
    ctx.fill("evenodd");
    ctx.stroke();
  });
  ctx.restore();
  rocketMiniMapCache = { canvas, w, h, features: rocketWorldFeatures, mapW: rocketState.mapW, mapH: rocketState.mapH, imageReady };
  return canvas;
}

function renderRocketHud(force = true) {
  if (!rocketState) return;
  const now = performance.now();
  if (!force && rocketState.nextHudAt && now < rocketState.nextHudAt) return;
  rocketState.nextHudAt = now + ROCKET_HUD_INTERVAL_MS;
  const rocketView = document.querySelector("#rocketView");
  if (rocketView) rocketView.dataset.phase = rocketState.phase;
  if (els.rocketTarget) els.rocketTarget.textContent = "Flight Route";
  if (els.rocketTime) els.rocketTime.textContent = `${Math.max(0, rocketState.time).toFixed(1)}s`;
  if (els.rocketFuel) els.rocketFuel.textContent = `${Math.max(0, rocketState.fuel).toFixed(0)}%`;
  if (els.rocketSpeed) els.rocketSpeed.textContent = `${Math.hypot(rocketState.ship.vx, rocketState.ship.vy).toFixed(0)} m/s`;
  if (els.rocketAltitude) els.rocketAltitude.textContent = `${rocketState.ship.altitude.toFixed(0)} m`;
  if (els.rocketRound) els.rocketRound.textContent = rocketState.round;
  if (els.rocketRoundGoal) els.rocketRoundGoal.textContent = rocketState.desiredRounds;
  if (els.rocketScore) els.rocketScore.textContent = formatScore(rocketState.score);
  if (els.rocketTech) els.rocketTech.textContent = rocketState.techPoints;
  if (els.rocketStart) {
    const briefing = rocketState.phase === "briefing" && !rocketState.active;
    els.rocketStart.hidden = !briefing;
    els.rocketStart.textContent = briefing ? "Begin Takeoff" : "Restart Flight Run";
    els.rocketStart.classList.toggle("is-briefing", briefing);
    els.rocketStart.classList.toggle("in-flight", !briefing);
  }
  const techKey = [
    rocketState.phase,
    rocketState.techPoints,
    rocketState.tech.fuel,
    rocketState.tech.speed,
    rocketState.tech.turn,
    rocketState.tech.sonar,
    rocketScanActive() ? "scan" : "idle",
    els.techTreeOverlay && !els.techTreeOverlay.hidden ? "pause" : "play"
  ].join("|");
  if (force || rocketState.techHudKey !== techKey) {
    rocketState.techHudKey = techKey;
    updateRocketTechLabels();
  }
}

function updateRocketTechLabels() {
  if (!rocketState) return;
  ["fuel", "speed", "turn", "sonar"].forEach((kind) => {
    const label = els[`${kind}TechLabel`];
    const level = rocketState.tech[kind] || 0;
    const cost = rocketTechUpgradeCost(kind, level);
    const node = document.querySelector(`[data-tech="${kind}"]`);
    const levels = document.querySelector(`[data-levels="${kind}"]`);
    const desc = node?.querySelector("small");
    if (label) {
      label.textContent = level >= rocketTechMax ? `Lv ${level}/${rocketTechMax} - MAX` : `Lv ${level}/${rocketTechMax} - Next ${cost} TP`;
    }
    if (desc) {
      desc.textContent = level >= rocketTechMax
        ? rocketTechInfo[kind].effect
        : `${rocketTechSteps[kind][level][0]}: ${rocketTechSteps[kind][level][1]}`;
    }
    if (node) {
      node.classList.toggle("ready", level < rocketTechMax && rocketState.techPoints >= cost);
      node.classList.toggle("maxed", level >= rocketTechMax);
    }
    if (levels && levels.dataset.renderedLevel !== String(level)) {
      levels.dataset.renderedLevel = String(level);
      levels.replaceChildren(...Array.from({ length: rocketTechMax }, (_, index) => {
        const dot = document.createElement("i");
        dot.textContent = index + 1;
        dot.title = `${rocketTechSteps[kind][index][0]} - ${rocketTechSteps[kind][index][1]}`;
        dot.className = index < level ? "filled" : "";
        if (index === level && level < rocketTechMax) dot.classList.add("next");
        return dot;
      }));
    }
  });
  if (els.techTreeStatus) {
    const plane = getPlaneClass({ tech: rocketState.tech, telemetry: rocketState.telemetry }).name;
    els.techTreeStatus.textContent = `${plane} | ${rocketState.techPoints} tech points`;
  }
  if (els.pauseScanTarget) {
    const blocked = !rocketState || ["setup", "briefing", "result"].includes(rocketState.phase);
    const active = rocketScanActive();
    els.pauseScanTarget.textContent = active ? "Scan Active" : "Scan Destination -10 TP";
    els.pauseScanTarget.disabled = blocked || active || rocketState.techPoints < 10;
  }
}

function buyRocketTargetScan() {
  if (!rocketState || ["setup", "briefing", "result"].includes(rocketState.phase)) return;
  const cost = 10;
  if (rocketState.techPoints < cost) {
    els.rocketMessage.textContent = `Need ${cost} tech points for a 5 second destination scan.`;
    updateRocketTechLabels();
    return;
  }
  rocketState.techPoints -= cost;
  rocketState.targetScanUntil = performance.now() + 5000;
  rocketState.distanceTrend = null;
  rocketState.lastObjectiveDistance = null;
  els.rocketMessage.textContent = "Destination scan active for 5 seconds.";
  rocketFeedback("Scan active", "#22d9f2", "info");
  closeRocketPause();
  renderRocketHud();
}

function openRocketPause() {
  if (!rocketState || rocketState.phase === "result") return;
  rocketState.pausedWasActive = Boolean(rocketState.active);
  rocketState.active = false;
  rocketState.paused = true;
  stopPropellerSound();
  updateRocketTechLabels();
  renderRankLists();
  if (els.techTreeOverlay) els.techTreeOverlay.hidden = false;
}

function closeRocketPause() {
  if (!rocketState) return;
  if (els.techTreeOverlay) els.techTreeOverlay.hidden = true;
  const shouldResume = rocketState.paused && rocketState.pausedWasActive && !["setup", "briefing", "result"].includes(rocketState.phase);
  rocketState.paused = false;
  rocketState.pausedWasActive = false;
  if (shouldResume) {
    rocketState.active = true;
    rocketState.last = performance.now();
    startPropellerSound();
  }
}

function toggleRocketPause() {
  if (!rocketState || !document.querySelector("#rocketView")?.classList.contains("active")) return;
  if (["result", "round-summary"].includes(rocketState.phase)) return;
  if (rocketState.paused || !els.techTreeOverlay?.hidden) closeRocketPause();
  else openRocketPause();
}

function showRocketResult(title, summary, action = "restart") {
  if (!els.rocketResultOverlay) return;
  rocketState.active = false;
  rocketState.paused = false;
  rocketState.pausedWasActive = false;
  rocketState.pendingNextRound = null;
  rocketState.phase = "result";
  rocketState.ship.vx = 0;
  rocketState.ship.vy = 0;
  rocketState.ship.throttle = 0;
  if (els.techTreeOverlay) els.techTreeOverlay.hidden = true;
  stopPropellerSound();
  rocketState.resultAction = action;
  saveRocketSessionResult(title, summary);
  els.rocketResultTitle.textContent = title;
  els.rocketResultSummary.textContent = summary;
  if (els.rocketResultRestart) {
    els.rocketResultRestart.textContent = action === "setup" ? "Edit Flight Setup" : "Start New Flight";
  }
  renderRocketResultDetails();
  drawRocketResultMap();
  els.rocketResultOverlay.hidden = false;
}

function showRocketRoundSummary(log) {
  if (!els.rocketResultOverlay || !rocketState || !log) return;
  rocketState.active = false;
  rocketState.paused = false;
  rocketState.pausedWasActive = false;
  rocketState.pendingNextRound = null;
  rocketState.phase = "round-summary";
  rocketState.resultAction = "next-round";
  rocketState.ship.vx = 0;
  rocketState.ship.vy = 0;
  rocketState.ship.throttle = 0;
  if (els.techTreeOverlay) els.techTreeOverlay.hidden = true;
  stopPropellerSound();
  const depotCountries = getRocketLogDepotCountries(log);
  const landings = log.landings || [];
  els.rocketResultTitle.textContent = `Round ${log.round} Failed`;
  els.rocketResultSummary.textContent = `${log.reason === "out of fuel" ? "Fuel exhausted" : "Time expired"} before reaching ${log.target}. TP earned this round: ${log.techEarned || 0}. Fuel depots: ${landings.length}${depotCountries.length ? ` (${depotCountries.join(", ")})` : ""}.`;
  if (els.rocketResultRestart) {
    const isFinal = (rocketState.roundLogs || []).length >= rocketState.desiredRounds;
    els.rocketResultRestart.textContent = isFinal ? "View Final Run" : "Next Round";
  }
  renderRocketResultDetails([log]);
  drawRocketResultMap([log]);
  els.rocketResultOverlay.hidden = false;
}

function endRocketRun(title = "Run Ended", summary = "Flight run ended.", action = "setup") {
  if (!rocketState || rocketState.sessionSaved) return;
  rocketState.active = false;
  stopPropellerSound();
  if (!["setup", "briefing"].includes(rocketState.phase)) {
    recordRocketRound(false, "ended by player");
  }
  showRocketResult(title, `${summary} Score ${formatScore(rocketState.score)}.`, action);
  renderRocketHud();
}

function renderRocketResultDetails(logOverride = null) {
  if (!els.rocketResultDetails || !rocketState) return;
  const logs = logOverride || rocketState.roundLogs || [];
  if (!logs.length) {
    els.rocketResultDetails.textContent = "No route trace was recorded for this run.";
    return;
  }
  els.rocketResultDetails.replaceChildren(...logs.map(renderRocketResultRow));
}

function getRocketLogDepotCountries(log) {
  return [...new Set((log?.landings || []).map((landing) => landing.country).filter(Boolean))];
}

function renderRocketResultRow(log) {
  const row = document.createElement("article");
  const status = log.success ? "reached" : "missed";
  const landings = log.landings || [];
  const depotCountries = getRocketLogDepotCountries(log);
  const landingText = landings.length
    ? landings.map((landing) => `${landing.success ? "refueled" : "penalty"} ${landing.depot}${landing.country ? `, ${landing.country}` : ""}: ${landing.km} km, ${landing.speed.toFixed(0)} m/s, ${landing.altitude.toFixed(0)} m`).join(" | ")
    : "no fuel depot checkpoint";
  const scoreText = (log.scoreEvents || []).length
    ? log.scoreEvents.map((event) => `${event.type}: +${formatScore(event.points)} (${event.detail})`).join(" | ")
    : "no score events recorded";
  row.className = `rocket-result-row ${status}`;
  row.innerHTML = `
    <strong>Round ${log.round}: ${log.flag ? `<img src="${log.flag}" alt="${log.target} flag">` : ""}${log.target}</strong>
    <span>${status.toUpperCase()} - ${log.reason} - ${log.success ? `reached ${log.target}` : `missed ${log.target}`} - ${Math.max(0, log.time).toFixed(1)}s left - fuel ${log.fuel.toFixed(0)}% - TP +${log.techEarned || 0}</span>
    <small>Fuel depots: ${landings.length}${depotCountries.length ? ` (${depotCountries.join(", ")})` : ""}</small>
    <small>${scoreText}</small>
    <small>${landingText}</small>
  `;
  return row;
}

function drawRocketResultMap(logOverride = null) {
  const canvas = els.rocketResultMap;
  if (!canvas || !rocketState) return;
  const inspector = canvas.closest("[data-rocket-route-inspector]");
  const logs = logOverride || rocketState.roundLogs || [];
  if (inspector) {
    setupRocketRouteInspector(inspector, {
      logs,
      mapW: rocketState.mapW,
      mapH: rocketState.mapH
    });
  } else {
    drawRocketLogMap(canvas, logs, rocketState.mapW, rocketState.mapH);
  }
}

function setupRocketRouteInspector(root, run) {
  const canvas = root.querySelector("[data-rocket-session-map], #rocketResultMap");
  const toolbar = root.querySelector("[data-rocket-route-buttons]");
  const meta = root.querySelector("[data-rocket-route-meta]");
  const logs = run.logs || [];
  const mapW = run.mapW || ROCKET_MAP_W;
  const mapH = run.mapH || ROCKET_MAP_H;
  if (!canvas) return;
  let selected = "all";

  function selectRoute(value) {
    selected = value === "all" ? "all" : Number(value);
    toolbar?.querySelectorAll("[data-route-index]").forEach((button) => {
      button.classList.toggle("selected", button.dataset.routeIndex === String(selected));
    });
    drawRocketLogMap(canvas, logs, mapW, mapH, selected);
    renderRocketRouteMeta(meta, logs, selected);
  }

  if (toolbar) {
    toolbar.innerHTML = `
      <button type="button" class="selected" data-route-index="all">All Routes</button>
      ${logs.map((log, index) => `<button type="button" data-route-index="${index}">R${log.round}</button>`).join("")}
    `;
  }
  toolbar?.querySelectorAll("[data-route-index]").forEach((button) => {
    button.addEventListener("click", () => selectRoute(button.dataset.routeIndex));
  });
  canvas.onclick = (event) => {
    const index = pickRocketRouteFromCanvas(canvas, logs, mapW, mapH, event);
    if (index != null) selectRoute(index);
  };
  selectRoute("all");
}

function renderRocketRouteMeta(meta, logs, selected) {
  if (!meta) return;
  if (!logs.length) {
    meta.textContent = "No route trace recorded.";
    return;
  }
  if (selected === "all") {
    const reached = logs.filter((log) => log.success).length;
    const fuel = logs.length ? logs[logs.length - 1].fuel : 0;
    meta.innerHTML = `
      <strong>All routes</strong>
      <span>${reached}/${logs.length} reached</span>
      <span>Final fuel ${Number(fuel || 0).toFixed(0)}%</span>
      <span>Click a route color or round button to isolate one flight.</span>
    `;
    return;
  }
  const log = logs[selected];
  if (!log) return;
  const events = (log.scoreEvents || []).map((event) => `${event.type} +${formatScore(event.points)}`).join(" | ") || "No score event";
  const landings = (log.landings || []).length
    ? log.landings.map((landing) => `${landing.depot}: ${landing.km} km, ${landing.speed.toFixed(0)} m/s`).join(" | ")
    : "No depot stop";
  meta.innerHTML = `
    <strong>Round ${log.round}: ${escapeHtml(log.target || "Unknown")}</strong>
    <span>${log.success ? "Reached" : "Missed"} | ${escapeHtml(log.reason || "route")} | ${Math.max(0, log.time || 0).toFixed(1)}s left</span>
    <span>Fuel ${Number(log.fuel || 0).toFixed(0)}% | Score ${formatScore(log.score || 0)}</span>
    <span>${escapeHtml(events)}</span>
    <span>${escapeHtml(landings)}</span>
  `;
}

function pickRocketRouteFromCanvas(canvas, logs, mapW, mapH, event) {
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (canvas.width / rect.width);
  const y = (event.clientY - rect.top) * (canvas.height / rect.height);
  const scaleX = canvas.width / mapW;
  const scaleY = canvas.height / mapH;
  let best = { index: null, distance: Infinity };
  (logs || []).forEach((log, index) => {
    const distance = getRouteHitDistance(log.trace || [], x, y, scaleX, scaleY);
    if (distance < best.distance) best = { index, distance };
  });
  return best.distance <= 14 ? best.index : null;
}

function getRouteHitDistance(trace, x, y, scaleX, scaleY) {
  let best = Infinity;
  let previous = null;
  trace.forEach((point) => {
    const current = { x: point.x * scaleX, y: point.y * scaleY };
    if (previous && !point.wrap) {
      best = Math.min(best, pointToSegmentDistance(x, y, previous.x, previous.y, current.x, current.y));
    }
    previous = point.wrap ? null : current;
  });
  return best;
}

function pointToSegmentDistance(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  if (!dx && !dy) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
}

function drawRocketLogMap(canvas, logs, mapW, mapH, selected = "all") {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  const scaleX = w / mapW;
  const scaleY = h / mapH;
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#061728");
  grad.addColorStop(1, "#071018");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  const features = rocketWorldFeatures || mapCountries.map((country) => ({
    name: country.name,
    color: country.color,
    rings: [country.poly.map(([lon, lat]) => worldPoint(lon, lat, mapW, mapH))]
  }));
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  features.forEach((country) => {
    ctx.beginPath();
    (country.rings || []).forEach((ring) => {
      ring.forEach((point, index) => {
        const px = point.x * scaleX;
        const py = point.y * scaleY;
        if (index === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
    });
    ctx.fillStyle = hexToRgba(country.color || "#67b77c", 0.56);
    ctx.fill("evenodd");
    ctx.strokeStyle = "rgba(225,255,220,.45)";
    ctx.lineWidth = 0.75;
    ctx.stroke();
  });
  ctx.restore();

  ctx.strokeStyle = "rgba(255,255,255,.1)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 52) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  (logs || []).forEach((log, index) => {
    const hue = ["#b35cff", "#22d9f2", "#45f875", "#ffd33d", "#ff6848"][index % 5];
    const isSelected = selected === index;
    const dim = selected !== "all" && !isSelected;
    ctx.strokeStyle = hue;
    ctx.globalAlpha = dim ? 0.12 : isSelected ? 1 : 0.58;
    ctx.lineWidth = isSelected ? 4.5 : 2.25;
    ctx.beginPath();
    let started = false;
    (log.trace || []).forEach((point) => {
      const x = point.x * scaleX;
      const y = point.y * scaleY;
      if (!started || point.wrap) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    ctx.globalAlpha = dim ? 0.16 : 1;
    if (log.targetX && log.targetY && (selected === "all" || isSelected)) {
      const tx = log.targetX * scaleX;
      const ty = log.targetY * scaleY;
      ctx.fillStyle = log.success ? "#45f875" : "#ff3d5a";
      ctx.beginPath();
      ctx.arc(tx, ty, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 10px system-ui";
      ctx.fillText(String(log.round), tx + 7, ty - 5);
    }
    ctx.globalAlpha = 1;
  });
  ctx.strokeStyle = "rgba(255,255,255,.24)";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, w - 2, h - 2);
}

function buyRocketTech(kind) {
  if (!rocketState || !rocketTechInfo[kind]) return;
  const level = rocketState.tech[kind] || 0;
  if (level >= rocketTechMax) {
    const text = `${rocketTechInfo[kind].title} is already maxed at level ${rocketTechMax}.`;
    els.rocketMessage.textContent = text;
    if (els.techTreeStatus) els.techTreeStatus.textContent = text;
    rocketFeedback("Upgrade maxed", "#ffd33d", "info");
    return;
  }
  const cost = rocketTechUpgradeCost(kind, level);
  if (rocketState.techPoints < cost) {
    const text = `You do not have the required points. ${rocketTechInfo[kind].title} needs ${cost} TP.`;
    els.rocketMessage.textContent = text;
    if (els.techTreeStatus) els.techTreeStatus.textContent = text;
    animateTechTree("denied");
    rocketFeedback("Not enough tech points", "#ff3d5a", "error");
    playTone("wrong");
    return;
  }
  rocketState.techPoints -= cost;
  rocketState.tech[kind] = level + 1;
  if (kind === "fuel") rocketState.fuel = Math.min(100, rocketState.fuel + 18);
  if (kind === "sonar" && rocketState.tech[kind] === 1) {
    rocketState.sonarPingTimer = 0;
    rocketState.sonarPingIndex = 0;
    rocketState.sonarPing = null;
  }
  const text = `${rocketTechInfo[kind].title} unlocked level ${rocketState.tech[kind]}/${rocketTechMax}. ${rocketTechInfo[kind].effect}`;
  els.rocketMessage.textContent = text;
  if (els.techTreeStatus) els.techTreeStatus.textContent = text;
  animateTechTree("unlocked");
  rocketFeedback("Upgrade unlocked", "#ffffff", "success");
  playPowerUp();
  renderRocketHud();
}

function animateTechTree(kind) {
  if (!els.techTreeOverlay) return;
  els.techTreeOverlay.classList.remove("denied", "unlocked");
  els.techTreeOverlay.classList.add(kind);
  window.setTimeout(() => els.techTreeOverlay.classList.remove(kind), 220);
}

function playPowerUp() {
  unlockRocketAudio();
  const now = audioContext.currentTime;
  [330, 494, 659, 988].forEach((note, index) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const delay = index * 0.08;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(note, now + delay);
    osc.frequency.exponentialRampToValueAtTime(note * 1.35, now + delay + 0.16);
    gain.gain.setValueAtTime(0.0001, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.12, now + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.24);
    osc.connect(gain).connect(fxGain);
    osc.start(now + delay);
    osc.stop(now + delay + 0.26);
  });
}

function startPropellerSound() {
  unlockRocketAudio();
  if (propOsc) return;
  propOsc = audioContext.createOscillator();
  propLfo = audioContext.createOscillator();
  const lfoGain = audioContext.createGain();
  propNoiseGain = audioContext.createGain();
  propFilter = audioContext.createBiquadFilter();
  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  propNoise = audioContext.createBufferSource();
  propNoise.buffer = buffer;
  propNoise.loop = true;
  propOsc.type = "sawtooth";
  propOsc.frequency.value = 42;
  propLfo.type = "sine";
  propLfo.frequency.value = 18;
  lfoGain.gain.value = 9;
  propFilter.type = "lowpass";
  propFilter.frequency.value = 620;
  propNoiseGain.gain.value = 0.035;
  propLfo.connect(lfoGain).connect(propOsc.frequency);
  propOsc.connect(propFilter).connect(engineGain);
  propNoise.connect(propNoiseGain).connect(propFilter);
  propOsc.start();
  propLfo.start();
  propNoise.start();
}

function updatePropellerSound() {
  if (!audioContext || !propOsc || !rocketState) return;
  const speed = Math.hypot(rocketState.ship.vx, rocketState.ship.vy);
  const throttle = rocketState.ship.throttle || 0;
  const target = 34 + throttle * 70 + Math.min(90, speed * 0.18);
  propOsc.frequency.setTargetAtTime(target, audioContext.currentTime, 0.08);
  propFilter.frequency.setTargetAtTime(440 + throttle * 1200 + speed * 1.3, audioContext.currentTime, 0.08);
  if (propNoiseGain) propNoiseGain.gain.setTargetAtTime(0.015 + throttle * 0.06, audioContext.currentTime, 0.08);
}

function stopPropellerSound() {
  if (!propOsc) return;
  try {
    propOsc.stop(audioContext.currentTime + 0.08);
    propLfo?.stop(audioContext.currentTime + 0.08);
    propNoise?.stop(audioContext.currentTime + 0.08);
  } catch {}
  propOsc = null;
  propLfo = null;
  propNoise = null;
  propNoiseGain = null;
  propFilter = null;
}

function playTakeoffSound() {
  unlockRocketAudio();
  startPropellerSound();
  const now = audioContext.currentTime;
  [110, 146, 196, 260].forEach((note, index) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const delay = index * 0.08;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(note, now + delay);
    osc.frequency.exponentialRampToValueAtTime(note * 1.8, now + delay + 0.42);
    gain.gain.setValueAtTime(0.0001, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.16, now + delay + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.62);
    osc.connect(gain).connect(fxGain);
    osc.start(now + delay);
    osc.stop(now + delay + 0.66);
  });
}

function playLandingSound(success = true, stopEngine = false) {
  unlockRocketAudio();
  const now = audioContext.currentTime;
  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.5, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const source = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  filter.type = success ? "lowpass" : "bandpass";
  filter.frequency.value = success ? 360 : 880;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(success ? 0.2 : 0.28, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);
  source.connect(filter).connect(gain).connect(fxGain);
  source.start(now);
  if (stopEngine) stopPropellerSound();
}

function initRocketAudioControls() {
  const settings = getRocketAudioSettings();
  if (els.rocketRadioVolume) els.rocketRadioVolume.value = settings.radio;
  if (els.rocketEngineVolume) els.rocketEngineVolume.value = settings.engine;
  if (els.rocketFxVolume) els.rocketFxVolume.value = settings.fx;
  if (els.profileRadioVolume) els.profileRadioVolume.value = settings.radio;
  if (els.profileEngineVolume) els.profileEngineVolume.value = settings.engine;
  if (els.profileFxVolume) els.profileFxVolume.value = settings.fx;
  if (els.rocketStartRadio) els.rocketStartRadio.checked = settings.startRadio;
  const storedStation = localStorage.getItem("flagHunterRadioStation");
  if (els.rocketRadioSelect && storedStation === null) {
    els.rocketRadioSelect.selectedIndex = 3;
  }
  if (els.profileRocketRadioSelect && storedStation === null) {
    els.profileRocketRadioSelect.selectedIndex = 3;
  }
  if (storedStation !== null && Number.isFinite(Number(storedStation))) {
    const stationCount = els.rocketRadioSelect?.options.length || rocketRadioStations.length;
    const stationIndex = Math.max(0, Math.min(stationCount - 1, Number(storedStation)));
    if (els.rocketRadioSelect) els.rocketRadioSelect.selectedIndex = stationIndex;
    if (els.profileRocketRadioSelect) els.profileRocketRadioSelect.selectedIndex = stationIndex;
  }
  const savedValue = localStorage.getItem("flagHunterRadioStationValue");
  if (savedValue) selectRocketRadioByValue(savedValue);
  if (els.rocketRadio) {
    els.rocketRadio.volume = settings.radio;
    els.rocketRadio.muted = settings.muted;
    if (els.rocketRadioSelect?.value) els.rocketRadio.src = els.rocketRadioSelect.value;
  }
  if (els.rocketRadioMute) els.rocketRadioMute.textContent = settings.muted ? "Unmute" : "Mute";
}

function initRocketMapControls() {
  if (!els.rocketCountryOverlay) return;
  els.rocketCountryOverlay.checked = rocketCountryOverlayEnabled;
  els.rocketCountryOverlay.addEventListener("change", () => {
    rocketCountryOverlayEnabled = els.rocketCountryOverlay.checked;
    localStorage.setItem("flagHunterRocketCountryOverlay", rocketCountryOverlayEnabled ? "1" : "0");
    invalidateRocketMapCache();
    drawRocket();
  });
}

function selectRocketRadio(index) {
  if (!els.rocketRadioSelect || !els.rocketRadio) return;
  const stationCount = els.rocketRadioSelect.options.length || rocketRadioStations.length;
  const next = (index + stationCount) % stationCount;
  els.rocketRadioSelect.selectedIndex = next;
  if (els.profileRocketRadioSelect) els.profileRocketRadioSelect.selectedIndex = next;
  const option = els.rocketRadioSelect.options[next];
  const src = option?.dataset.src || option?.value || rocketRadioStations[next] || "";
  if (!src) {
    els.rocketRadio.pause();
    els.rocketRadio.removeAttribute("src");
    if (els.rocketRadioPlay) els.rocketRadioPlay.textContent = "Play Radio";
    localStorage.setItem("flagHunterRadioStation", String(next));
    localStorage.setItem("flagHunterRadioStationValue", "");
    return;
  }
  els.rocketRadio.src = src;
  localStorage.setItem("flagHunterRadioStation", String(next));
  localStorage.setItem("flagHunterRadioStationValue", option?.value || "");
}

async function toggleRocketRadio() {
  if (!els.rocketRadio || !els.rocketRadioSelect) return;
  unlockRocketAudio();
  if (!els.rocketRadio.src && els.rocketRadioSelect.value) els.rocketRadio.src = els.rocketRadioSelect.value;
  if (!els.rocketRadioSelect.value) {
    selectRocketRadio(1);
  }
  try {
    if (els.rocketRadio.paused) {
      await els.rocketRadio.play();
      if (els.rocketRadioPlay) els.rocketRadioPlay.textContent = "Pause";
    } else {
      els.rocketRadio.pause();
      if (els.rocketRadioPlay) els.rocketRadioPlay.textContent = "Play Radio";
    }
  } catch {
    els.rocketMessage.textContent = "Radio stream could not start. Try another station or use generated ambience.";
  }
}

async function startRocketDefaultRadio() {
  if (!els.rocketRadio || !els.rocketRadioSelect) return;
  if (!getRocketAudioSettings().startRadio) return;
  if (!els.rocketRadioSelect.value) selectRocketRadio(3);
  if (!els.rocketRadio.src && els.rocketRadioSelect.value) els.rocketRadio.src = els.rocketRadioSelect.value;
  if (!els.rocketRadio.paused) return;
  try {
    await els.rocketRadio.play();
    if (els.rocketRadioPlay) els.rocketRadioPlay.textContent = "Pause";
  } catch {
    if (els.rocketRadioPlay) els.rocketRadioPlay.textContent = "Play Radio";
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function handleRocketRoundChoice(rounds, event = null) {
  if (event?.flylifeHandled) return;
  if (event) event.flylifeHandled = true;
  const value = Number(rounds);
  if (!Number.isFinite(value)) return;
  if (!rocketState) {
    showView("rocket");
    startRocketRun();
  }
  prepareRocketBriefing(value);
}

function handleRocketStartClick(event = null) {
  if (event?.flylifeHandled) return;
  if (event) event.flylifeHandled = true;
  if (rocketState?.phase === "briefing" && !rocketState.active) {
    beginRocketTakeoff();
    return;
  }
  startRocketRun();
}

document.querySelectorAll(".nav-btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.view === "play") {
      showFlagSetup();
      return;
    }
    if (button.dataset.view === "rocket") {
      if (rocketState && !rocketState.sessionSaved) {
        if (!["setup", "briefing"].includes(rocketState.phase)) {
          rocketState.active = true;
          rocketState.last = performance.now();
        }
        showView("rocket");
        return;
      }
      showView("rocket");
      startRocketRun();
      return;
    }
    renderTables();
    showView(button.dataset.view);
  });
});

document.querySelectorAll("[data-view-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    renderTables();
    showView(button.dataset.viewJump);
  });
});
document.querySelectorAll("[data-setup-view]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.setupView;
    if (target === "play") {
      showFlagSetup();
      return;
    }
    renderTables();
    showView(target);
  });
});
document.querySelectorAll("[data-rocket-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.rocketJump;
    if (els.techTreeOverlay) els.techTreeOverlay.hidden = true;
    if (els.rocketResultOverlay) els.rocketResultOverlay.hidden = true;
    if (target === "play") {
      showFlagSetup();
      return;
    }
    renderTables();
    showView(target);
  });
});
document.querySelectorAll("[data-rocket-rounds]").forEach((button) => {
  button.addEventListener("click", (event) => handleRocketRoundChoice(button.dataset.rocketRounds, event));
});

document.querySelectorAll("[data-flag-rounds]").forEach((button) => {
  button.addEventListener("click", () => startRun(Number(button.dataset.flagRounds)));
});

document.querySelector("#playAgain")?.addEventListener("click", showFlagSetup);
initRocketAudioControls();
initRocketMapControls();
if (els.rocketRadioSelect) {
  const savedStation = Number(localStorage.getItem("flagHunterRadioStation") || 0);
  if (Number.isFinite(savedStation) && savedStation > 0) selectRocketRadio(savedStation);
  els.rocketRadioSelect.addEventListener("change", () => {
    selectRocketRadio(els.rocketRadioSelect.selectedIndex);
    if (els.rocketRadioSelect.value) toggleRocketRadio();
  });
}
els.profileRocketRadioSelect?.addEventListener("change", () => {
  selectRocketRadio(els.profileRocketRadioSelect.selectedIndex);
  saveRocketAudioSettings();
});
els.rocketRadioPlay?.addEventListener("click", toggleRocketRadio);
els.rocketRadioPrev?.addEventListener("click", () => {
  selectRocketRadio((els.rocketRadioSelect?.selectedIndex || 0) - 1);
  toggleRocketRadio();
});
els.rocketRadioNext?.addEventListener("click", () => {
  selectRocketRadio((els.rocketRadioSelect?.selectedIndex || 0) + 1);
  toggleRocketRadio();
});
els.rocketRadioMute?.addEventListener("click", () => {
  if (!els.rocketRadio) return;
  els.rocketRadio.muted = !els.rocketRadio.muted;
  els.rocketRadioMute.textContent = els.rocketRadio.muted ? "Unmute" : "Mute";
  saveRocketAudioSettings();
});
[els.rocketRadioVolume, els.rocketEngineVolume, els.rocketFxVolume, els.profileRadioVolume, els.profileEngineVolume, els.profileFxVolume].forEach((control) => {
  control?.addEventListener("input", () => {
    if (control === els.profileRadioVolume && els.rocketRadioVolume) els.rocketRadioVolume.value = control.value;
    if (control === els.rocketRadioVolume && els.profileRadioVolume) els.profileRadioVolume.value = control.value;
    if (control === els.profileEngineVolume && els.rocketEngineVolume) els.rocketEngineVolume.value = control.value;
    if (control === els.rocketEngineVolume && els.profileEngineVolume) els.profileEngineVolume.value = control.value;
    if (control === els.profileFxVolume && els.rocketFxVolume) els.rocketFxVolume.value = control.value;
    if (control === els.rocketFxVolume && els.profileFxVolume) els.profileFxVolume.value = control.value;
    unlockRocketAudio();
    syncRocketAudioVolumes();
    saveRocketAudioSettings();
  });
});
els.rocketStartRadio?.addEventListener("change", saveRocketAudioSettings);
els.rocketStart?.addEventListener("click", handleRocketStartClick);
document.addEventListener("click", (event) => {
  if (event.flylifeHandled) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  const roundButton = target.closest("[data-rocket-rounds]");
  if (roundButton) {
    handleRocketRoundChoice(roundButton.dataset.rocketRounds, event);
    return;
  }
  if (target.closest("#rocketStart")) {
    handleRocketStartClick(event);
  }
});
els.rocketResultRestart?.addEventListener("click", () => {
  if (rocketState?.resultAction === "next-round") {
    if (els.rocketResultOverlay) els.rocketResultOverlay.hidden = true;
    nextRocketRound(false);
    return;
  }
  if (rocketState?.resultAction === "setup") {
    startRocketRun();
    return;
  }
  startRocketRun();
});
els.rocketTutorialNext?.addEventListener("click", continueRocketTutorial);
els.techTreeClose?.addEventListener("click", closeRocketPause);
els.pauseResume?.addEventListener("click", closeRocketPause);
els.pauseEndRun?.addEventListener("click", () => endRocketRun("Run Ended", "Flight run ended from pause menu.", "setup"));
els.pauseScanTarget?.addEventListener("click", buyRocketTargetScan);
document.querySelectorAll("[data-pause-view]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.pauseView;
    closeRocketPause();
    if (rocketState?.active) rocketState.active = false;
    stopPropellerSound();
    if (target === "play") {
      showFlagSetup();
      return;
    }
    renderTables();
    showView(target);
  });
});
document.querySelectorAll("[data-tech]").forEach((button) => {
  button.addEventListener("click", () => buyRocketTech(button.dataset.tech));
});
window.addEventListener("keydown", (event) => {
  if (event.code === "Escape" && document.querySelector("#rocketView")?.classList.contains("active")) {
    event.preventDefault();
    toggleRocketPause();
    return;
  }
  if (rocketState?.phase === "setup") return;
  if (!rocketState || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "KeyW", "KeyA", "KeyS", "KeyD", "Space"].includes(event.code)) return;
  if (event.code === "Space") {
    event.preventDefault();
  }
  rocketState.keys[event.code] = true;
});
window.addEventListener("keyup", (event) => {
  if (!rocketState?.keys) return;
  delete rocketState.keys[event.code];
});
els.rocketCanvas?.addEventListener("pointermove", (event) => {
  if (!rocketState) return;
  if (rocketState.phase === "setup") return;
  const rect = els.rocketCanvas.getBoundingClientRect();
  rocketState.mouse.x = event.clientX - rect.left;
  rocketState.mouse.y = event.clientY - rect.top;
  rocketState.mouse.inside = true;
  const distanceFromPlane = Math.hypot(rocketState.mouse.x - rect.width / 2, rocketState.mouse.y - rect.height / 2);
  if (rocketState.parked && rocketState.phase !== "briefing" && distanceFromPlane > 240) {
    rocketState.restartTakeoffOnReentry = true;
    els.rocketMessage.textContent = "Takeoff restart armed. Move back into the green control ring to roll.";
  }
  if (rocketState.restartTakeoffOnReentry && rocketState.parked && rocketState.phase !== "briefing" && distanceFromPlane < 210) {
    rocketState.restartTakeoffOnReentry = false;
    rocketState.parked = false;
    rocketState.parkingHold = 0;
    rocketState.active = true;
    rocketState.phase = "takeoff";
    rocketState.ship.altitude = 0;
    rocketState.ship.throttle = Math.max(rocketState.ship.throttle, 0.22);
    rocketState.ship.vx = Math.cos(rocketState.ship.angle) * 12;
    rocketState.ship.vy = Math.sin(rocketState.ship.angle) * 12;
    rocketState.lastSpeed = 0;
    els.rocketMessage.textContent = "Mouse returned. Takeoff roll restarted from the stopped plane.";
    rocketFeedback("Takeoff restarted", "#45f875", "success");
    playTakeoffSound();
  }
});
els.rocketCanvas?.addEventListener("pointerleave", () => {
  if (!rocketState) return;
  if (rocketState.phase === "setup") return;
  rocketState.mouse.inside = false;
  if (rocketState.parked || Math.hypot(rocketState.ship.vx, rocketState.ship.vy) < 7) {
    rocketState.parked = true;
    rocketState.restartTakeoffOnReentry = true;
    els.rocketMessage.textContent = "Plane stopped. Return to the control ring to restart the takeoff roll.";
    rocketFeedback("Ready to restart takeoff", "#ffd33d", "info");
    return;
  }
  rocketState.manualControl = false;
  rocketState.manualReleased = false;
  els.rocketMessage.textContent = "Pointer left the map. Autopilot is holding a straight heading until you return near the plane.";
});
els.rocketCanvas?.addEventListener("click", (event) => {
  if (!rocketState || rocketState.phase === "briefing") return;
  if (rocketState.phase === "setup") return;
  const rect = els.rocketCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const nearPlane = Math.hypot(x - rect.width / 2, y - rect.height / 2) < 70;
  if (!nearPlane) return;
  rocketState.manualControl = !rocketState.manualControl;
  rocketState.manualReleased = !rocketState.manualControl;
  els.rocketMessage.textContent = rocketState.manualControl ? "Manual steering engaged. Keep the pointer inside the purple zone." : "Manual steering released. Autopilot will fly straight.";
  rocketFeedback(rocketState.manualControl ? "Manual control" : "Autopilot straight", rocketState.manualControl ? "#45f875" : "#b35cff", "info");
});
document.querySelector("#authOpen")?.addEventListener("click", () => els.authDialog?.showModal());
document.querySelector("#profileOpen")?.addEventListener("click", () => {
  renderProfile();
  showView("profile");
});
document.querySelector("#saveName")?.addEventListener("click", () => {
  const clean = els.displayNameInput.value.trim().replace(/[^a-z0-9 _-]/gi, "").slice(0, 18);
  profile.displayName = clean || "Guest";
  saveProfile();
  renderProfile();
});
document.querySelector("#guestName")?.addEventListener("click", () => {
  profile.displayName = "Guest";
  saveProfile();
  renderProfile();
});
window.addEventListener("resize", resizeFireworksCanvas);
window.addEventListener("resize", resizeRocketCanvas);
renderProfile();
renderTables();
loadOfficialFlyLeaderboard();
loadRocketCatalog();
loadRocketWorldMap();
loadRocketBoundaryLines();
const initialView = location.hash.replace("#", "");
const bootParams = new URLSearchParams(location.search);
if (bootParams.get("simulateAgents") === "1") {
  runAgentFlySimulationTest();
  history.replaceState(null, "", `${location.pathname}#runs`);
  showView("runs", false);
} else if (initialView === "rocket") {
  showView("rocket", false);
  startRocketRun();
} else if (["runs", "leaderboard", "profile", "results"].includes(initialView)) {
  renderTables();
  showView(initialView, false);
} else {
  showFlagSetup();
}
window.FlylifeAppReady = true;
