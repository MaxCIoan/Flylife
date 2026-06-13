import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

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

const ROCKET_TARGET_RADIUS = 80;
const ROCKET_DEPOT_RADIUS = 100;
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
  topAvatar: document.querySelector("#topAvatar"),
  profileTitle: document.querySelector("#profileTitle"),
  avatarScene: document.querySelector("#avatarScene"),
  layeredAvatar: document.querySelector("#layeredAvatar"),
  variationGrid: document.querySelector("#variationGrid"),
  avatarCanvas: document.querySelector("#avatarCanvas"),
  rpgAvatar: document.querySelector("#rpgAvatar"),
  characterNameInput: document.querySelector("#characterNameInput"),
  classSelect: document.querySelector("#classSelect"),
  armorSelect: document.querySelector("#armorSelect"),
  weaponSelect: document.querySelector("#weaponSelect"),
  outfitSelect: document.querySelector("#outfitSelect"),
  headgearSelect: document.querySelector("#headgearSelect"),
  accessorySelect: document.querySelector("#accessorySelect"),
  poseSelect: document.querySelector("#poseSelect"),
  heightInput: document.querySelector("#heightInput"),
  heightValue: document.querySelector("#heightValue"),
  skinColorInput: document.querySelector("#skinColorInput"),
  eyeColorInput: document.querySelector("#eyeColorInput"),
  hairColorInput: document.querySelector("#hairColorInput"),
  shirtColorInput: document.querySelector("#shirtColorInput"),
  jacketColorInput: document.querySelector("#jacketColorInput"),
  nailColorInput: document.querySelector("#nailColorInput"),
  armsInput: document.querySelector("#armsInput"),
  legsInput: document.querySelector("#legsInput"),
  feetInput: document.querySelector("#feetInput"),
  hipsInput: document.querySelector("#hipsInput"),
  torsoInput: document.querySelector("#torsoInput"),
  neckInput: document.querySelector("#neckInput"),
  earsInput: document.querySelector("#earsInput"),
  mouthInput: document.querySelector("#mouthInput"),
  armsValue: document.querySelector("#armsValue"),
  legsValue: document.querySelector("#legsValue"),
  feetValue: document.querySelector("#feetValue"),
  hipsValue: document.querySelector("#hipsValue"),
  torsoValue: document.querySelector("#torsoValue"),
  neckValue: document.querySelector("#neckValue"),
  earsValue: document.querySelector("#earsValue"),
  mouthValue: document.querySelector("#mouthValue"),
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
  customAudioInput: document.querySelector("#customAudioInput"),
  customAudioFolderInput: document.querySelector("#customAudioFolderInput"),
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
const audioDbName = "flagHunterAudio";
const audioStoreName = "tracks";
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
let avatarLook = { x: 0, y: 0, tx: 0, ty: 0 };
let avatarAnimation;
let avatar3d;
let rocketState;
let rocketAnimation;
let rocketWorldFeatures = null;
let rocketWorldLoading = false;
let rocketCatalog = null;
let rocketCatalogLoading = false;
let officialFlyLeaders = [];
let officialFlyLeadersLoaded = false;
const blockedRocketCountries = new Set(["Fiji", "Antarctica"]);
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
  "https://ice1.somafm.com/cliqhop-128-mp3"
];

const rocketTechMax = 6;
const rocketTechInfo = {
  fuel: { title: "Fuel Tank", effect: "Each level gives -6% fuel burn, +4% route fuel, and +4% depot refuel." },
  speed: { title: "Engine Boost", effect: "Each level gives +70 thrust and +70 m/s top speed. Max speed reaches sound-speed territory." },
  turn: { title: "Control Fins", effect: "Each level gives +0.42 turn response and stronger bank control." }
};

const rocketTechSteps = {
  fuel: [
    ["Fuel Tank", "-6% fuel burn"],
    ["Fuel Refinement", "+4% route fuel"],
    ["Light Tanks", "+6% fuel capacity"],
    ["Depot Optimizer", "+4% depot refuel"],
    ["Reserve Cell", "-6% fuel burn"],
    ["Long Range", "max fuel path"]
  ],
  speed: [
    ["Engine Boost", "+70 thrust"],
    ["Aero Tuning", "+70 m/s top speed"],
    ["Propulsion", "+70 thrust"],
    ["Overdrive", "+70 m/s top speed"],
    ["Jet Stream", "+70 thrust"],
    ["Sound Chase", "max speed path"]
  ],
  turn: [
    ["Gyro Stabilizer", "+0.42 response"],
    ["Control Fins", "+0.42 response"],
    ["Agile Frame", "stronger banking"],
    ["Precision Control", "+0.42 response"],
    ["Bank Assist", "faster recovery"],
    ["Apex Handling", "max turn path"]
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

function worldPoint(lon, lat, mapW = 8200, mapH = 4200) {
  return {
    x: (lon + 180) / 360 * mapW,
    y: (85 - lat) / 170 * mapH
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
    })
    .catch(() => {
      rocketWorldFeatures = null;
    })
    .finally(() => {
      rocketWorldLoading = false;
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
    });
}

function getRocketPool(difficulty) {
  const list = rocketCatalog?.length ? rocketCatalog : rocketTargets;
  return list.filter((target) => !blockedRocketCountries.has(target.name) && (target.lat === undefined || target.lat > -60));
}

function normalizeRocketCountry(feature) {
  if (!feature?.geometry?.coordinates) return null;
  const name = feature.properties?.name || feature.properties?.ADMIN || "Country";
  if (blockedRocketCountries.has(name)) return null;
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

function projectRocketRing(ring) {
  const points = ring.map(([lon, lat]) => worldPoint(lon, lat));
  const mapW = rocketState?.mapW || 8200;
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
    characterCreated: false,
    character: {
      class: "strong",
      armor: "pastel",
      weapon: "cute",
      outfit: "explorer",
      headgear: "cap",
      accessory: "flag-pin",
      pose: "wave",
      height: 1.75,
      skinColor: "#f0b084",
      eyeColor: "#45c7ff",
      hairColor: "#17141f",
      shirtColor: "#ffffff",
      jacketColor: "#5c47c8",
      nailColor: "#111111",
      arms: 1,
      legs: 1,
      feet: 1,
      hips: 1,
      torso: 1,
      neck: 1,
      ears: 1,
      mouth: 1
    },
    runs: []
  };
  try {
    const loaded = JSON.parse(localStorage.getItem(storeKey));
    return { ...fallback, ...loaded, character: { ...fallback.character, ...(loaded?.character || {}) } };
  } catch {
    return fallback;
  }
}

function saveProfile() {
  localStorage.setItem(storeKey, JSON.stringify(profile));
  window.FlagGuard?.syncProfile?.(profile);
}

let profile = loadProfile();
profile.character = sanitizeCharacter(profile.character);

function sanitizeCharacter(character = {}) {
  const valid = {
    class: ["small", "round", "tall", "chubby", "heroic"],
    armor: ["pastel", "neon", "earthy", "dark", "arcade"],
    weapon: ["cute", "serious", "sleepy", "mischievous", "robotic"],
    outfit: ["explorer", "farmer", "space", "streetwear", "animal-onesie", "fantasy"],
    headgear: ["none", "cap", "helmet", "hood", "mask"],
    accessory: ["glasses", "backpack", "flag-pin", "headphones", "scarf"],
    pose: ["wave", "idle", "hero", "thinking", "peace"]
  };
  const height = Number(character.height);
  const color = (value, fallback) => /^#[0-9a-f]{6}$/i.test(String(value)) ? value : fallback;
  const scalar = (value, fallback, min, max) => {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(min, Math.min(max, number)) : fallback;
  };
  return {
    class: valid.class.includes(character.class) ? character.class : "round",
    armor: valid.armor.includes(character.armor) ? character.armor : "pastel",
    weapon: valid.weapon.includes(character.weapon) ? character.weapon : "cute",
    outfit: valid.outfit.includes(character.outfit) ? character.outfit : "explorer",
    headgear: valid.headgear.includes(character.headgear) ? character.headgear : "cap",
    accessory: valid.accessory.includes(character.accessory) ? character.accessory : "flag-pin",
    pose: valid.pose.includes(character.pose) ? character.pose : "wave",
    height: Number.isFinite(height) ? Math.max(1, Math.min(3, height)) : 1.75,
    skinColor: color(character.skinColor, "#f0b084"),
    eyeColor: color(character.eyeColor, "#45c7ff"),
    hairColor: color(character.hairColor, "#17141f"),
    shirtColor: color(character.shirtColor, "#ffffff"),
    jacketColor: color(character.jacketColor, "#5c47c8"),
    nailColor: color(character.nailColor, "#111111"),
    arms: scalar(character.arms, 1, 0.7, 1.4),
    legs: scalar(character.legs, 1, 0.7, 1.4),
    feet: scalar(character.feet, 1, 0.7, 1.5),
    hips: scalar(character.hips, 1, 0.7, 1.5),
    torso: scalar(character.torso, 1, 0.75, 1.45),
    neck: scalar(character.neck, 1, 0.7, 1.4),
    ears: scalar(character.ears, 1, 0.5, 1.6),
    mouth: scalar(character.mouth, 1, 0.6, 1.6)
  };
}

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

function openAudioDb() {
  if (!("indexedDB" in window)) return Promise.reject(new Error("IndexedDB unavailable"));
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(audioDbName, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(audioStoreName)) db.createObjectStore(audioStoreName, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveUploadedAudioFiles(fileList) {
  const files = [...fileList].filter((file) => file.type.startsWith("audio/"));
  if (!files.length) return;
  const db = await openAudioDb();
  const tx = db.transaction(audioStoreName, "readwrite");
  const store = tx.objectStore(audioStoreName);
  files.forEach((file) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    store.put({ id, name: file.webkitRelativePath || file.name, type: file.type || "audio/mpeg", blob: file });
  });
  await new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  db.close();
  await loadUploadedAudioTracks(true);
}

async function loadUploadedAudioTracks(selectLatest = false) {
  let db;
  try {
    db = await openAudioDb();
  } catch {
    return;
  }
  const tracks = await new Promise((resolve, reject) => {
    const tx = db.transaction(audioStoreName, "readonly");
    const request = tx.objectStore(audioStoreName).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
  db.close();
  document.querySelectorAll("option[data-uploaded='true']").forEach((option) => option.remove());
  tracks.forEach((track) => appendUploadedAudioOption(track));
  const savedValue = localStorage.getItem("flagHunterRadioStationValue");
  const latestValue = tracks.length ? `custom:${tracks[tracks.length - 1].id}` : "";
  const wanted = selectLatest ? latestValue : savedValue;
  if (wanted) selectRocketRadioByValue(wanted);
}

function appendUploadedAudioOption(track) {
  const src = URL.createObjectURL(track.blob);
  [els.rocketRadioSelect, els.profileRocketRadioSelect].forEach((select) => {
    if (!select) return;
    const option = document.createElement("option");
    option.dataset.uploaded = "true";
    option.dataset.src = src;
    option.value = `custom:${track.id}`;
    option.textContent = `Uploaded: ${track.name.slice(0, 64)}`;
    select.append(option);
  });
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
    character: { ...(profile.character || {}) },
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

  const leaderboardEntries = buildLocalLeaderboardEntries(runs, rocketRuns, officialFlyLeaders);
  els.leaderboardTable.innerHTML = leaderboardEntries.length ? "" : `<tr><td colspan="7">No local scores yet.</td></tr>`;
  leaderboardEntries.forEach((entry, index) => {
    const row = document.createElement("tr");
    if (entry.type === "fly") {
      row.className = "clickable-row";
      row.tabIndex = 0;
    }
    row.innerHTML = `
      <td>#${index + 1}</td>
      <td>${entry.mode}</td>
      <td>${escapeHtml(entry.displayName || "Guest")}</td>
      <td>${formatScore(entry.score)}</td>
      <td>${entry.plane || ""}</td>
      <td>${entry.result}</td>
      <td>${entry.details}</td>
    `;
    if (entry.type === "fly") {
      row.addEventListener("click", () => toggleRunDetails(row, entry.run, 7, "rocket-run"));
      row.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleRunDetails(row, entry.run, 7, "rocket-run");
        }
      });
    }
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
    mode: "Fly",
    displayName: run.displayName || "Guest",
    score: run.score || 0,
    plane: escapeHtml(run.planeClass || getPlaneClass(run).name),
    result: `${run.completedRounds || 0}/${run.selectedRounds || run.rounds || 0} reached`,
    details: `<button class="mini-btn" type="button">Open</button>`,
    run
  }));
  const officialFlyEntries = (officialFlyRuns || []).map((run) => ({
    type: "official-fly",
    mode: "Official Fly",
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

function loadOfficialFlyLeaderboard() {
  if (officialFlyLeadersLoaded) return;
  officialFlyLeadersLoaded = true;
  fetch("/api/fly/leaderboard")
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("official fly leaderboard unavailable")))
    .then((data) => {
      officialFlyLeaders = Array.isArray(data.leaders) ? data.leaders : [];
      renderTables();
    })
    .catch(() => {
      officialFlyLeaders = [];
    });
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
  detail.innerHTML = `<td colspan="${columns}">${type === "leaderboard" ? renderPlayerDetails(data) : type === "rocket-run" ? renderRocketRunDetails(data) : renderRunDetails(data)}</td>`;
  row.classList.add("expanded");
  row.after(detail);
  if (type === "rocket-run") {
    setupRocketRouteInspector(detail, data);
  }
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
      lastPlayed: run.createdAt,
      character: sanitizeCharacter(run.character || profile.character)
    };
    current.runs.push(run);
    if (!current.bestRun || compareFlagRuns(run, current.bestRun) < 0) {
      current.bestRun = run;
      current.bestScore = run.score || 0;
    }
    current.lastPlayed = new Date(run.createdAt) > new Date(current.lastPlayed) ? run.createdAt : current.lastPlayed;
    current.character = sanitizeCharacter(run.character || current.character);
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
  const className = labelFromValue(player.character?.class || "round");
  const weaponName = labelFromValue(player.character?.weapon || "cute");
  const armor = player.character?.armor || "pastel";
  const bestFlag = player.bestCountry?.code ? getFlagUrl(player.bestCountry.code) : "";
  return `
    <div class="run-detail-grid leaderboard-detail">
      <section class="player-face-card">
        <span>Profile</span>
        <div class="leader-avatar" data-armor="${escapeHtml(armor)}">${escapeHtml(getInitials(player.displayName || "Guest"))}</div>
        <strong>${escapeHtml(player.displayName || "Guest")}</strong>
        <small>${escapeHtml(className)} / ${escapeHtml(weaponName)}</small>
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
  els.profileName.textContent = profile.displayName || "Guest";
  els.profileBest.textContent = formatScore(getBestOverallScore());
  els.profileTitle.textContent = profile.displayName || "Guest";
  els.topAvatar.textContent = getInitials(profile.displayName || "Guest");
  els.displayNameInput.value = profile.displayName === "Guest" ? "" : profile.displayName;
  syncProfileControls();
  applyCharacterPreview();
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
      x: 320 + rand() * 7560,
      y: 260 + rand() * 3680
    };
  } while (guard < 80 && Math.hypot(start.x - target.x, start.y - target.y) < 2100);
  return start;
}

function makeSimulationWaypoint(start, target, rand, style) {
  const distance = Math.hypot(start.x - target.x, start.y - target.y);
  if (style === "new" || rand() < 0.38) {
    return {
      x: 320 + rand() * 7560,
      y: 260 + rand() * 3680
    };
  }
  const mid = {
    x: start.x + (target.x - start.x) * (0.42 + rand() * 0.24),
    y: start.y + (target.y - start.y) * (0.42 + rand() * 0.24)
  };
  const offset = (style === "pro" ? 0.18 : 0.34) * distance;
  return {
    x: Math.max(180, Math.min(8020, mid.x + (rand() - 0.5) * offset)),
    y: Math.max(180, Math.min(4020, mid.y + (rand() - 0.5) * offset))
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
      x: Math.max(0, Math.min(8200, from.x + (to.x - from.x) * legT + curve * wander + (rand() - 0.5) * wander * 0.28)),
      y: Math.max(0, Math.min(4200, from.y + (to.y - from.y) * legT + Math.cos(t * Math.PI * 2) * wander * 0.34 + (rand() - 0.5) * wander * 0.22))
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
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  const viewMap = {
    play: "playView",
    rocket: "rocketView",
    results: "resultsView",
    runs: "runsView",
    leaderboard: "leaderboardView",
    profile: "profileView"
  };
  document.querySelector(`#${viewMap[name]}`).classList.add("active");
  if (name !== "play") {
    clearInterval(timer);
    clearTimeout(flagQuestionTimeout);
  }
  if (updateHash && location.hash !== `#${name}`) {
    history.replaceState(null, "", `#${name}`);
  }
}

function syncProfileControls() {
  els.characterNameInput.value = profile.displayName === "Guest" ? "" : profile.displayName;
  els.classSelect.value = profile.character?.class || "round";
  els.armorSelect.value = profile.character?.armor || "pastel";
  els.weaponSelect.value = profile.character?.weapon || "cute";
  els.outfitSelect.value = profile.character?.outfit || "explorer";
  els.headgearSelect.value = profile.character?.headgear || "cap";
  els.accessorySelect.value = profile.character?.accessory || "flag-pin";
  els.poseSelect.value = profile.character?.pose || "wave";
  els.heightInput.value = profile.character?.height || 1.75;
  els.heightValue.textContent = `${Number(els.heightInput.value).toFixed(2)} m`;
  syncAdvancedControls(profile.character);
}

function syncAdvancedControls(character) {
  const clean = sanitizeCharacter(character);
  ["skinColor", "eyeColor", "hairColor", "shirtColor", "jacketColor", "nailColor"].forEach((key) => {
    const input = els[`${key}Input`];
    if (input) input.value = clean[key];
  });
  ["arms", "legs", "feet", "hips", "torso", "neck", "ears", "mouth"].forEach((key) => {
    const input = els[`${key}Input`];
    const label = els[`${key}Value`];
    if (input) input.value = clean[key];
    if (label) label.textContent = Number(clean[key]).toFixed(2);
  });
}

function collectCharacterFromControls() {
  return sanitizeCharacter({
    class: els.classSelect.value,
    armor: els.armorSelect.value,
    weapon: els.weaponSelect.value,
    outfit: els.outfitSelect.value,
    headgear: els.headgearSelect.value,
    accessory: els.accessorySelect.value,
    pose: els.poseSelect.value,
    height: Number(els.heightInput.value),
    skinColor: els.skinColorInput.value,
    eyeColor: els.eyeColorInput.value,
    hairColor: els.hairColorInput.value,
    shirtColor: els.shirtColorInput.value,
    jacketColor: els.jacketColorInput.value,
    nailColor: els.nailColorInput.value,
    arms: Number(els.armsInput.value),
    legs: Number(els.legsInput.value),
    feet: Number(els.feetInput.value),
    hips: Number(els.hipsInput.value),
    torso: Number(els.torsoInput.value),
    neck: Number(els.neckInput.value),
    ears: Number(els.earsInput.value),
    mouth: Number(els.mouthInput.value)
  });
}

const avatarPresets = [
  { id: "cute-explorer", name: "Cute Explorer", class: "round", weapon: "cute", outfit: "explorer", headgear: "cap", accessory: "flag-pin", armor: "pastel", pose: "wave", skinColor: "#f0b084", eyeColor: "#45c7ff", hairColor: "#5b341f", shirtColor: "#fff2c7", jacketColor: "#32b46e" },
  { id: "masked-animal", name: "Masked Hoodie", class: "small", weapon: "mischievous", outfit: "animal-onesie", headgear: "mask", accessory: "headphones", armor: "dark", pose: "peace", skinColor: "#e8a878", eyeColor: "#8efcff", hairColor: "#16121d", shirtColor: "#f7f4ed", jacketColor: "#8b5cff" },
  { id: "pixel-farmer", name: "Pixel Farmer", class: "chubby", weapon: "sleepy", outfit: "farmer", headgear: "cap", accessory: "backpack", armor: "earthy", pose: "idle", skinColor: "#d9905f", eyeColor: "#5a7a49", hairColor: "#7b492c", shirtColor: "#f0c46c", jacketColor: "#5a8d50" },
  { id: "cyber-agent", name: "Cyber Agent", class: "tall", weapon: "robotic", outfit: "space", headgear: "helmet", accessory: "glasses", armor: "neon", pose: "hero", skinColor: "#c98b73", eyeColor: "#00e5ff", hairColor: "#101820", shirtColor: "#102033", jacketColor: "#00c7ff" },
  { id: "fantasy-traveler", name: "Fantasy Traveler", class: "heroic", weapon: "serious", outfit: "fantasy", headgear: "hood", accessory: "scarf", armor: "arcade", pose: "thinking", skinColor: "#f2b58d", eyeColor: "#8b5cff", hairColor: "#2b1a3d", shirtColor: "#f6e6ff", jacketColor: "#b35cff" }
];

const paletteBackgrounds = {
  pastel: ["#ffd9e8", "#bfe9ff"],
  neon: ["#111827", "#17dfff"],
  earthy: ["#6d4d31", "#b6d47a"],
  dark: ["#151824", "#6f4bd8"],
  arcade: ["#2d145f", "#ff7ad9"]
};

function renderLayeredAvatar(character = sanitizeCharacter(profile.character), target = els.layeredAvatar) {
  if (!target) return;
  target.innerHTML = buildAvatarSvg(character, false);
}

function renderVariationGrid() {
  if (!els.variationGrid) return;
  els.variationGrid.innerHTML = avatarPresets.map((preset) => {
    const character = sanitizeCharacter({ ...profile.character, ...preset });
    return `
      <button class="variation-card" type="button" data-preset="${preset.id}">
        ${buildAvatarSvg(character, true)}
        <span>${preset.name}</span>
      </button>
    `;
  }).join("");
  els.variationGrid.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = avatarPresets.find((item) => item.id === button.dataset.preset);
      profile.character = sanitizeCharacter({ ...profile.character, ...preset });
      syncProfileControls();
      applyCharacterPreview();
    });
  });
}

function buildAvatarSvg(character, compact) {
  const [bgA, bgB] = paletteBackgrounds[character.armor] || paletteBackgrounds.pastel;
  const body = bodyShape(character.class);
  const pose = poseShape(character.pose);
  const face = faceShape(character.weapon, character);
  const outfit = outfitShape(character.outfit, character);
  const headgear = headgearShape(character.headgear, character);
  const accessory = accessoryShape(character.accessory, character);
  const scale = compact ? 0.86 : 1;
  return `
    <svg viewBox="0 0 360 420" role="img" aria-label="Layered avatar" class="avatar-svg">
      <defs>
        <linearGradient id="bg-${compact ? "c" : "m"}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${bgA}"/>
          <stop offset="1" stop-color="${bgB}"/>
        </linearGradient>
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="10" flood-color="#000" flood-opacity=".28"/>
        </filter>
      </defs>
      <rect width="360" height="420" rx="28" fill="url(#bg-${compact ? "c" : "m"})"/>
      <g transform="translate(180 224) scale(${scale})" filter="url(#softShadow)">
        ${accessory.back}
        <ellipse cx="0" cy="148" rx="${body.footBase}" ry="20" fill="rgba(0,0,0,.22)"/>
        <path d="${body.legs}" fill="${character.jacketColor}"/>
        <path d="${body.feet}" fill="#171923"/>
        <path d="${body.torso}" fill="${character.shirtColor}"/>
        ${outfit}
        <path d="${pose.leftArm}" fill="${character.skinColor}"/>
        <path d="${pose.rightArm}" fill="${character.skinColor}"/>
        <circle cx="${pose.leftHand[0]}" cy="${pose.leftHand[1]}" r="15" fill="${character.skinColor}"/>
        <circle cx="${pose.rightHand[0]}" cy="${pose.rightHand[1]}" r="15" fill="${character.skinColor}"/>
        <path d="${body.neck}" fill="${character.skinColor}"/>
        <path d="${body.head}" fill="${character.skinColor}"/>
        ${headgear}
        ${hairShape(character)}
        ${face}
        ${accessory.front}
      </g>
    </svg>
  `;
}

function bodyShape(type) {
  const map = {
    small: { torso: "M-48,-14 C-68,42 -60,105 0,116 C60,105 68,42 48,-14 Z", head: "M-62,-112 C-66,-162 66,-162 62,-112 C58,-58 -58,-58 -62,-112 Z", neck: "M-18,-72 H18 V-35 H-18 Z", legs: "M-34,92 C-48,134 -30,160 -10,150 C0,132 -2,110 -8,92 Z M34,92 C48,134 30,160 10,150 C0,132 2,110 8,92 Z", feet: "M-46,148 C-22,136 -4,144 -8,160 H-58 C-62,154 -56,150 -46,148 Z M46,148 C22,136 4,144 8,160 H58 C62,154 56,150 46,148 Z", footBase: 70 },
    round: { torso: "M-72,-22 C-96,38 -74,118 0,126 C74,118 96,38 72,-22 Z", head: "M-76,-118 C-78,-176 78,-176 76,-118 C72,-48 -72,-48 -76,-118 Z", neck: "M-20,-72 H20 V-28 H-20 Z", legs: "M-42,96 C-58,138 -35,168 -12,154 C-2,130 -4,110 -12,96 Z M42,96 C58,138 35,168 12,154 C2,130 4,110 12,96 Z", feet: "M-52,150 C-24,136 -4,144 -8,164 H-66 C-70,156 -64,151 -52,150 Z M52,150 C24,136 4,144 8,164 H66 C70,156 64,151 52,150 Z", footBase: 84 },
    tall: { torso: "M-54,-28 C-76,48 -58,136 0,146 C58,136 76,48 54,-28 Z", head: "M-66,-126 C-70,-180 70,-180 66,-126 C62,-58 -62,-58 -66,-126 Z", neck: "M-18,-76 H18 V-30 H-18 Z", legs: "M-34,104 C-52,160 -28,190 -8,174 C0,144 -2,120 -8,104 Z M34,104 C52,160 28,190 8,174 C0,144 2,120 8,104 Z", feet: "M-48,170 C-22,156 -2,164 -8,182 H-62 C-66,176 -58,171 -48,170 Z M48,170 C22,156 2,164 8,182 H62 C66,176 58,171 48,170 Z", footBase: 78 },
    chubby: { torso: "M-86,-20 C-112,48 -86,126 0,136 C86,126 112,48 86,-20 Z", head: "M-82,-116 C-84,-174 84,-174 82,-116 C76,-42 -76,-42 -82,-116 Z", neck: "M-24,-70 H24 V-28 H-24 Z", legs: "M-48,102 C-62,142 -40,170 -14,156 C-4,132 -6,114 -14,102 Z M48,102 C62,142 40,170 14,156 C4,132 6,114 14,102 Z", feet: "M-60,152 C-28,138 -4,146 -8,166 H-76 C-80,158 -72,153 -60,152 Z M60,152 C28,138 4,146 8,166 H76 C80,158 72,153 60,152 Z", footBase: 96 },
    heroic: { torso: "M-88,-30 C-104,34 -66,126 0,136 C66,126 104,34 88,-30 Z", head: "M-72,-124 C-76,-180 76,-180 72,-124 C68,-54 -68,-54 -72,-124 Z", neck: "M-22,-76 H22 V-28 H-22 Z", legs: "M-42,104 C-60,154 -32,184 -10,166 C0,140 -3,120 -12,104 Z M42,104 C60,154 32,184 10,166 C0,140 3,120 12,104 Z", feet: "M-58,164 C-26,148 -2,156 -8,178 H-74 C-78,170 -68,165 -58,164 Z M58,164 C26,148 2,156 8,178 H74 C78,170 68,165 58,164 Z", footBase: 92 }
  };
  return map[type] || map.round;
}

function poseShape(pose) {
  const poses = {
    wave: { leftArm: "M-60,-8 C-108,-42 -112,-112 -88,-126 C-72,-84 -78,-38 -48,6 Z", rightArm: "M60,-8 C102,2 104,68 74,84 C58,48 60,20 48,6 Z", leftHand: [-91, -126], rightHand: [77, 84] },
    idle: { leftArm: "M-62,-8 C-96,18 -94,82 -66,92 C-50,48 -52,18 -46,4 Z", rightArm: "M62,-8 C96,18 94,82 66,92 C50,48 52,18 46,4 Z", leftHand: [-66, 96], rightHand: [66, 96] },
    hero: { leftArm: "M-62,-10 C-100,10 -112,54 -84,68 C-62,48 -58,16 -46,2 Z", rightArm: "M62,-10 C112,-48 118,-92 94,-104 C72,-72 64,-34 46,2 Z", leftHand: [-86, 70], rightHand: [96, -106] },
    thinking: { leftArm: "M-62,-8 C-92,14 -84,70 -48,48 C-38,24 -40,8 -46,2 Z", rightArm: "M62,-10 C92,-38 56,-86 32,-64 C40,-42 46,-18 46,2 Z", leftHand: [-50, 50], rightHand: [34, -66] },
    peace: { leftArm: "M-60,-8 C-108,-18 -126,-70 -104,-88 C-76,-58 -70,-20 -48,4 Z", rightArm: "M60,-8 C108,-18 126,-70 104,-88 C76,-58 70,-20 48,4 Z", leftHand: [-108, -90], rightHand: [108, -90] }
  };
  return poses[pose] || poses.wave;
}

function faceShape(face, c) {
  const eyes = {
    cute: `<circle cx="-26" cy="-118" r="12" fill="#fff"/><circle cx="26" cy="-118" r="12" fill="#fff"/><circle cx="-26" cy="-116" r="7" fill="${c.eyeColor}"/><circle cx="26" cy="-116" r="7" fill="${c.eyeColor}"/><circle cx="-29" cy="-121" r="3" fill="#fff"/><circle cx="23" cy="-121" r="3" fill="#fff"/>`,
    serious: `<path d="M-42,-128 Q-26,-138 -10,-126" stroke="#141820" stroke-width="6" fill="none"/><path d="M10,-126 Q26,-138 42,-128" stroke="#141820" stroke-width="6" fill="none"/><circle cx="-26" cy="-116" r="8" fill="${c.eyeColor}"/><circle cx="26" cy="-116" r="8" fill="${c.eyeColor}"/>`,
    sleepy: `<path d="M-42,-118 Q-26,-110 -10,-118" stroke="#141820" stroke-width="6" fill="none"/><path d="M10,-118 Q26,-110 42,-118" stroke="#141820" stroke-width="6" fill="none"/>`,
    mischievous: `<path d="M-42,-126 Q-26,-116 -10,-126" stroke="#141820" stroke-width="6" fill="none"/><path d="M10,-126 Q26,-116 42,-126" stroke="#141820" stroke-width="6" fill="none"/><circle cx="-26" cy="-115" r="8" fill="${c.eyeColor}"/><circle cx="26" cy="-115" r="8" fill="${c.eyeColor}"/>`,
    robotic: `<rect x="-45" y="-132" width="32" height="22" rx="8" fill="#101820"/><rect x="13" y="-132" width="32" height="22" rx="8" fill="#101820"/><circle cx="-29" cy="-121" r="5" fill="${c.eyeColor}"/><circle cx="29" cy="-121" r="5" fill="${c.eyeColor}"/>`
  }[face] || "";
  const mouth = face === "serious"
    ? `<path d="M-18,-76 Q0,-84 18,-76" stroke="#5d2434" stroke-width="5" fill="none"/>`
    : face === "sleepy"
      ? `<path d="M-18,-76 Q0,-68 18,-76" stroke="#5d2434" stroke-width="5" fill="none"/>`
      : `<path d="M-22,-82 Q0,-62 22,-82" stroke="#5d2434" stroke-width="5" fill="none"/>`;
  return `${eyes}<ellipse cx="0" cy="-96" rx="8" ry="12" fill="rgba(120,70,55,.55)"/>${mouth}<ellipse cx="-54" cy="-86" rx="13" ry="7" fill="rgba(255,120,160,.3)"/><ellipse cx="54" cy="-86" rx="13" ry="7" fill="rgba(255,120,160,.3)"/>`;
}

function hairShape(c) {
  if (c.headgear === "helmet" || c.headgear === "hood") return "";
  const color = c.hairColor;
  return {
    cute: `<path d="M-62,-132 C-44,-178 42,-178 62,-132 C24,-152 -18,-150 -62,-132 Z" fill="${color}"/>`,
    serious: `<path d="M-70,-126 C-56,-180 72,-170 70,-126 C34,-146 -22,-140 -70,-126 Z" fill="${color}"/>`,
    sleepy: `<path d="M-68,-130 C-16,-180 50,-160 70,-122 C20,-140 -18,-132 -68,-130 Z" fill="${color}"/>`,
    mischievous: `<path d="M-70,-128 L-42,-172 L-18,-140 L12,-178 L38,-140 L70,-128 C32,-154 -32,-154 -70,-128 Z" fill="${color}"/>`,
    robotic: `<path d="M-58,-142 H58 V-120 H-58 Z" fill="${color}"/>`
  }[c.weapon] || "";
}

function outfitShape(outfit, c) {
  const jacket = c.jacketColor;
  const shirt = c.shirtColor;
  const common = {
    explorer: `<path d="M-62,-12 H62 V72 C28,92 -28,92 -62,72 Z" fill="${jacket}"/><path d="M-26,-16 H26 V82 H-26 Z" fill="${shirt}"/><circle cx="34" cy="20" r="8" fill="#ffd33d"/>`,
    farmer: `<path d="M-58,-8 H58 V80 C24,98 -24,98 -58,80 Z" fill="#6aa0d8"/><rect x="-30" y="-18" width="60" height="100" rx="14" fill="${shirt}"/><path d="M-54,10 H54" stroke="#3d6f9f" stroke-width="10"/>`,
    space: `<path d="M-70,-18 H70 V86 C30,108 -30,108 -70,86 Z" fill="#e8f4ff"/><path d="M-36,-2 H36 V60 H-36 Z" fill="${jacket}"/><circle cx="0" cy="22" r="18" fill="#17dfff"/>`,
    streetwear: `<path d="M-68,-18 H68 V82 C28,104 -28,104 -68,82 Z" fill="${jacket}"/><path d="M-34,-12 H34 V72 H-34 Z" fill="${shirt}"/><path d="M-32,-12 Q0,20 32,-12" stroke="#fff" stroke-width="7" fill="none"/>`,
    "animal-onesie": `<path d="M-76,-24 H76 V92 C32,118 -32,118 -76,92 Z" fill="#f4f0e8"/><path d="M-40,-8 H40 V74 H-40 Z" fill="#d8d2c8"/><path d="M-72,20 H-34 M34,20 H72 M-72,54 H-34 M34,54 H72" stroke="#181818" stroke-width="8"/>`,
    fantasy: `<path d="M-72,-20 H72 V86 C24,116 -24,116 -72,86 Z" fill="${jacket}"/><path d="M-24,-12 H24 V92 H-24 Z" fill="${shirt}"/><path d="M-76,-22 Q0,46 76,-22" stroke="#ffd33d" stroke-width="9" fill="none"/>`
  };
  return common[outfit] || common.explorer;
}

function headgearShape(headgear, c) {
  if (headgear === "none") return "";
  if (headgear === "cap") return `<path d="M-68,-142 C-44,-178 44,-178 68,-142 Z" fill="${c.jacketColor}"/><path d="M10,-142 C48,-148 78,-138 94,-124 C54,-122 28,-126 10,-142 Z" fill="${c.jacketColor}"/>`;
  if (headgear === "helmet") return `<path d="M-78,-112 C-82,-184 82,-184 78,-112 L64,-132 C28,-154 -28,-154 -64,-132 Z" fill="#dcecff"/><path d="M-48,-124 H48" stroke="#17dfff" stroke-width="8"/>`;
  if (headgear === "hood") return `<path d="M-92,-116 C-88,-198 88,-198 92,-116 C62,-154 -62,-154 -92,-116 Z" fill="${c.jacketColor}"/>`;
  if (headgear === "mask") return `<path d="M-58,-130 C-34,-152 34,-152 58,-130 V-78 C26,-56 -26,-56 -58,-78 Z" fill="#eef2f3" stroke="#141820" stroke-width="5"/><path d="M-40,-110 Q-24,-122 -8,-110 M8,-110 Q24,-122 40,-110" stroke="#141820" stroke-width="5" fill="none"/><path d="M-20,-82 Q0,-66 20,-82" stroke="#141820" stroke-width="4" fill="none"/>`;
  return "";
}

function accessoryShape(accessory, c) {
  const empty = { back: "", front: "" };
  if (accessory === "backpack") return { back: `<path d="M-100,-8 C-132,34 -122,92 -86,110 V-22 Z" fill="${c.jacketColor}"/>`, front: "" };
  if (accessory === "glasses") return { back: "", front: `<rect x="-48" y="-132" width="36" height="28" rx="10" fill="none" stroke="#101820" stroke-width="6"/><rect x="12" y="-132" width="36" height="28" rx="10" fill="none" stroke="#101820" stroke-width="6"/><path d="M-12,-118 H12" stroke="#101820" stroke-width="5"/>` };
  if (accessory === "flag-pin") return { back: "", front: `<path d="M42,-8 v40" stroke="#101820" stroke-width="4"/><path d="M44,-8 C66,-18 66,2 88,-8 V14 C66,24 66,4 44,14 Z" fill="#b35cff"/>` };
  if (accessory === "headphones") return { back: "", front: `<path d="M-68,-118 C-56,-172 56,-172 68,-118" stroke="#101820" stroke-width="8" fill="none"/><rect x="-82" y="-120" width="22" height="42" rx="8" fill="#101820"/><rect x="60" y="-120" width="22" height="42" rx="8" fill="#101820"/>` };
  if (accessory === "scarf") return { back: "", front: `<path d="M-56,-36 H56" stroke="${c.jacketColor}" stroke-width="16" stroke-linecap="round"/><path d="M20,-28 C44,4 32,34 14,58" stroke="${c.jacketColor}" stroke-width="14" stroke-linecap="round"/>` };
  return empty;
}

function applyCharacterPreview() {
  const character = profile.character || {};
  els.rpgAvatar.dataset.class = character.class || "round";
  els.rpgAvatar.dataset.armor = character.armor || "pastel";
  els.rpgAvatar.dataset.weapon = character.weapon || "cute";
  els.rpgAvatar.dataset.outfit = character.outfit || "explorer";
  els.topAvatar.dataset.armor = character.armor || "pastel";
  renderLayeredAvatar();
  renderVariationGrid();
}

const avatarPalettes = {
  cream: ["#f6dfbd", "#bd8759", "#fff0d2"],
  charcoal: ["#767d8b", "#202938", "#c5ccd6"],
  honey: ["#f2bd61", "#9b612c", "#ffe4a3"],
  cinnamon: ["#c67a43", "#653723", "#efba7c"],
  snow: ["#fff7ea", "#c9d4e3", "#ffffff"],
  ocean: ["#5bd6e8", "#236aa0", "#b8f5ff"],
  rose: ["#ffafc8", "#a94774", "#ffe0eb"],
  moss: ["#9ccd70", "#456b3f", "#d7f0a5"]
};

const animalPresets = {
  panda: { ears: "round", muzzle: "short", tail: "nub", marks: "panda", body: "round" },
  bear: { ears: "round", muzzle: "snout", tail: "nub", marks: "none", body: "heavy" },
  squirrel: { ears: "round", muzzle: "small", tail: "fluffy", marks: "stripe", body: "small" },
  chipmunk: { ears: "round", muzzle: "small", tail: "fluffy", marks: "stripe", body: "small" },
  fish: { ears: "fins", muzzle: "fish", tail: "fin", marks: "belly", body: "round" },
  shark: { ears: "fin", muzzle: "shark", tail: "fin", marks: "belly", body: "long" },
  trex: { ears: "none", muzzle: "long", tail: "dino", marks: "belly", body: "heavy" },
  lion: { ears: "round", muzzle: "snout", tail: "tuft", marks: "mane", body: "heavy" },
  coyote: { ears: "pointy", muzzle: "long", tail: "brush", marks: "mask", body: "lean" },
  owl: { ears: "tufts", muzzle: "beak", tail: "feathers", marks: "discs", body: "round" },
  parrot: { ears: "crest", muzzle: "beak", tail: "feathers", marks: "wing", body: "round" },
  lynx: { ears: "tufts", muzzle: "snout", tail: "nub", marks: "spots", body: "lean" },
  cat: { ears: "pointy", muzzle: "small", tail: "curl", marks: "mask", body: "small" },
  dog: { ears: "floppy", muzzle: "snout", tail: "curl", marks: "patch", body: "round" },
  husky: { ears: "pointy", muzzle: "snout", tail: "curl", marks: "husky", body: "lean" },
  corgi: { ears: "bigpoint", muzzle: "snout", tail: "nub", marks: "belly", body: "short" },
  shiba: { ears: "pointy", muzzle: "snout", tail: "curl", marks: "belly", body: "small" },
  beagle: { ears: "floppy", muzzle: "snout", tail: "flag", marks: "patch", body: "round" },
  labrador: { ears: "floppy", muzzle: "snout", tail: "wag", marks: "none", body: "round" },
  poodle: { ears: "puff", muzzle: "snout", tail: "puff", marks: "puffs", body: "round" },
  bulldog: { ears: "fold", muzzle: "wide", tail: "nub", marks: "patch", body: "heavy" },
  siamese: { ears: "pointy", muzzle: "small", tail: "long", marks: "siamese", body: "small" },
  mainecoon: { ears: "tufts", muzzle: "snout", tail: "fluffy", marks: "mane", body: "heavy" },
  wolf: { ears: "pointy", muzzle: "long", tail: "brush", marks: "mask", body: "lean" },
  tiger: { ears: "round", muzzle: "snout", tail: "long", marks: "tiger", body: "heavy" },
  penguin: { ears: "none", muzzle: "beak", tail: "feathers", marks: "penguin", body: "round" },
  fox: { ears: "bigpoint", muzzle: "long", tail: "brush", marks: "belly", body: "lean" },
  rabbit: { ears: "long", muzzle: "small", tail: "puff", marks: "belly", body: "small" }
};

function drawAvatar(time = performance.now()) {
  const canvas = els.avatarCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const character = sanitizeCharacter(profile.character);
  const preset = animalPresets[character.class] || animalPresets.panda;
  const palette = avatarPalettes[character.armor] || avatarPalettes.cream;
  const breath = Math.sin(time / 520) * 4;
  avatarLook.x += (avatarLook.tx - avatarLook.x) * 0.12;
  avatarLook.y += (avatarLook.ty - avatarLook.y) * 0.12;

  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.translate(w / 2, 330 + breath);
  ctx.rotate(avatarLook.x * 0.035);
  drawShadow(ctx);
  drawSpeciesAvatar(ctx, character, preset, palette, time);
  ctx.restore();
}

function drawSpeciesAvatar(ctx, character, preset, palette, time) {
  const animal = character.class;
  if (animal === "trex") return drawTrexAvatar(ctx, character, palette, time);
  if (animal === "shark" || animal === "fish") return drawAquaticAvatar(ctx, character, palette, time);
  if (["owl", "parrot", "penguin"].includes(animal)) return drawBirdAvatar(ctx, character, palette, time);
  if (["dog", "husky", "corgi", "shiba", "beagle", "labrador", "poodle", "bulldog", "wolf", "fox", "coyote"].includes(animal)) {
    return drawCanidAvatar(ctx, character, palette, time);
  }
  if (["cat", "lynx", "siamese", "mainecoon", "tiger", "lion"].includes(animal)) {
    return drawFelineAvatar(ctx, character, palette, time);
  }
  if (animal === "rabbit") return drawRabbitAvatar(ctx, character, palette, time);
  if (animal === "squirrel" || animal === "chipmunk") return drawRodentAvatar(ctx, character, palette, time);
  return drawPlushAvatar(ctx, character, preset, palette, time);
}

function drawTrexAvatar(ctx, character, palette, time) {
  const g = furGradient(ctx, palette, -20, -80, 190);
  const lookX = avatarLook.x * 10;
  const lookY = avatarLook.y * 5;
  ctx.fillStyle = g;
  drawCurvedTail(ctx, 70, 62, 180, -8, 46);
  dinoFoot(ctx, -52, 174, palette);
  dinoFoot(ctx, 52, 174, palette);
  ctx.fillStyle = g;
  organicPath(ctx, [
    [-58, 112], [-88, 12], [-44, -70], [28, -84], [76, -26], [68, 94], [34, 158], [-26, 158]
  ]);
  ctx.fillStyle = "rgba(255,238,190,0.42)";
  organicPath(ctx, [[-20, -48], [34, -36], [48, 64], [18, 130], [-20, 108], [-38, 8]]);
  ctx.fillStyle = g;
  ctx.save();
  ctx.translate(lookX, lookY);
  organicPath(ctx, [
    [-36, -166], [34, -205], [108, -160], [94, -106], [38, -82], [-28, -96], [-64, -128]
  ]);
  ctx.fillStyle = "rgba(255,238,190,0.78)";
  organicPath(ctx, [[24, -142], [95, -139], [82, -113], [28, -104], [-3, -116]]);
  ctx.fillStyle = "#081018";
  ellipse(ctx, 26 + avatarLook.x * 5, -160 + avatarLook.y * 3, 8, 13);
  ellipse(ctx, 65 + avatarLook.x * 5, -150 + avatarLook.y * 3, 8, 13);
  ctx.fillStyle = "#fff";
  ellipse(ctx, 23 + avatarLook.x * 5, -164 + avatarLook.y * 3, 2.5, 3);
  ellipse(ctx, 62 + avatarLook.x * 5, -154 + avatarLook.y * 3, 2.5, 3);
  ctx.fillStyle = "#1c1714";
  ellipse(ctx, 84, -132, 4, 3);
  ctx.fillStyle = "#f8f1dc";
  for (let i = 0; i < 8; i += 1) {
    triangle(ctx, 18 + i * 9, -118, 23 + i * 9, -104, 28 + i * 9, -118);
  }
  ctx.restore();
  ctx.strokeStyle = palette[1];
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-54, 20);
  ctx.quadraticCurveTo(-92, 38, -82, 76);
  ctx.moveTo(54, 20);
  ctx.quadraticCurveTo(92, 38, 82, 76);
  ctx.stroke();
}

function drawAquaticAvatar(ctx, character, palette, time) {
  const shark = character.class === "shark";
  const g = furGradient(ctx, palette, -30, -90, 190);
  ctx.fillStyle = g;
  drawFishTail(ctx, 94, 44, shark ? 76 : 58);
  ctx.save();
  ctx.translate(avatarLook.x * 8, avatarLook.y * 4);
  organicPath(ctx, shark
    ? [[-90, 30], [-80, -88], [2, -164], [100, -120], [118, -34], [70, 96], [-36, 126]]
    : [[-86, 26], [-70, -92], [12, -148], [90, -98], [102, 10], [46, 112], [-48, 112]]
  );
  ctx.fillStyle = "rgba(255,255,255,0.68)";
  organicPath(ctx, [[-38, 20], [52, 12], [68, 86], [4, 124], [-48, 86]]);
  ctx.fillStyle = g;
  triangle(ctx, -4, -148, 32, -214, 48, -136);
  triangle(ctx, -76, -10, -132, -52, -90, 34);
  triangle(ctx, 70, -8, 132, -54, 94, 40);
  ctx.fillStyle = "#081018";
  ellipse(ctx, -22 + avatarLook.x * 5, -70 + avatarLook.y * 3, 9, 13);
  ellipse(ctx, 38 + avatarLook.x * 5, -70 + avatarLook.y * 3, 9, 13);
  ctx.fillStyle = "#fff";
  ellipse(ctx, -25 + avatarLook.x * 5, -75 + avatarLook.y * 3, 2.5, 3);
  ellipse(ctx, 35 + avatarLook.x * 5, -75 + avatarLook.y * 3, 2.5, 3);
  if (shark) {
    ctx.strokeStyle = "#271b1b";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-18, -20);
    ctx.quadraticCurveTo(24, 6, 76, -18);
    ctx.stroke();
    ctx.fillStyle = "#fff7e8";
    for (let i = 0; i < 7; i += 1) triangle(ctx, -2 + i * 12, -14, 4 + i * 12, 0, 10 + i * 12, -14);
  } else {
    ctx.fillStyle = "#ff9abb";
    ellipse(ctx, 56, -12, 12, 8);
  }
  ctx.restore();
}

function drawBirdAvatar(ctx, character, palette, time) {
  const penguin = character.class === "penguin";
  const parrot = character.class === "parrot";
  const g = furGradient(ctx, palette, -20, -70, 180);
  ctx.fillStyle = g;
  organicPath(ctx, [[-76, 86], [-72, -62], [-18, -140], [56, -118], [88, -6], [56, 136], [-26, 160]]);
  ctx.fillStyle = penguin ? "#fff7ea" : "rgba(255,255,255,0.35)";
  organicPath(ctx, [[-36, -30], [36, -28], [52, 80], [0, 138], [-52, 80]]);
  ctx.fillStyle = g;
  organicPath(ctx, [[-72, -2], [-142, 30], [-86, 94], [-58, 62]]);
  organicPath(ctx, [[72, -2], [142, 30], [86, 94], [58, 62]]);
  ctx.save();
  ctx.translate(avatarLook.x * 9, avatarLook.y * 5);
  ctx.fillStyle = g;
  blob(ctx, 0, -126, 72, 68, 0.5);
  if (parrot) {
    ctx.fillStyle = "#ff7ad9";
    triangle(ctx, -18, -190, 0, -234, 18, -190);
  }
  ctx.fillStyle = "#081018";
  ellipse(ctx, -26 + avatarLook.x * 5, -134 + avatarLook.y * 3, 10, 13);
  ellipse(ctx, 26 + avatarLook.x * 5, -134 + avatarLook.y * 3, 10, 13);
  ctx.fillStyle = "#fff";
  ellipse(ctx, -29 + avatarLook.x * 5, -138 + avatarLook.y * 3, 2.5, 3);
  ellipse(ctx, 23 + avatarLook.x * 5, -138 + avatarLook.y * 3, 2.5, 3);
  ctx.fillStyle = parrot ? "#ff6848" : "#ffbd39";
  triangle(ctx, -18, -112, 18, -112, 0, -78);
  ctx.restore();
}

function drawCanidAvatar(ctx, character, palette, time) {
  const animal = character.class;
  const pointy = ["husky", "shiba", "wolf", "fox", "coyote", "corgi"].includes(animal);
  const floppy = ["dog", "beagle", "labrador", "poodle", "bulldog"].includes(animal);
  const g = furGradient(ctx, palette, -35, -90, 190);
  ctx.fillStyle = g;
  drawCurvedTail(ctx, -86, 70, -150, 20, 38);
  organicPath(ctx, [[-64, 116], [-76, 12], [-42, -66], [38, -74], [74, 8], [62, 126], [14, 164], [-38, 154]]);
  ctx.fillStyle = "rgba(255,238,205,0.5)";
  organicPath(ctx, [[-28, -22], [32, -22], [44, 88], [0, 134], [-42, 88]]);
  drawLegs(ctx, animalPresets[animal], palette);
  drawArms(ctx, animalPresets[animal], palette);
  ctx.save();
  ctx.translate(avatarLook.x * 11, -112 + avatarLook.y * 6);
  ctx.fillStyle = g;
  if (pointy) {
    triangle(ctx, -58, -62, -94, -132, -26, -78);
    triangle(ctx, 58, -62, 94, -132, 26, -78);
  } else if (floppy) {
    blob(ctx, -68, -30, 28, 66, 0.54);
    blob(ctx, 68, -30, 28, 66, 0.54);
  }
  blob(ctx, 0, -12, animal === "bulldog" ? 88 : 82, animal === "corgi" ? 66 : 76, 0.5);
  drawCanidMarks(ctx, animal);
  drawMuzzle(ctx, { muzzle: animal === "bulldog" ? "wide" : "snout" });
  drawEyes(ctx);
  drawNoseMouth(ctx, { muzzle: animal === "bulldog" ? "wide" : "snout" });
  drawCheeks(ctx);
  ctx.restore();
}

function drawFelineAvatar(ctx, character, palette, time) {
  const animal = character.class;
  const g = furGradient(ctx, palette, -30, -90, 180);
  ctx.fillStyle = g;
  drawCurvedTail(ctx, -78, 70, -128, -8, animal === "tiger" ? 34 : 28);
  organicPath(ctx, [[-58, 116], [-66, 6], [-34, -70], [38, -70], [66, 18], [54, 128], [8, 160], [-40, 148]]);
  drawLegs(ctx, animalPresets[animal], palette);
  drawArms(ctx, animalPresets[animal], palette);
  ctx.save();
  ctx.translate(avatarLook.x * 11, -118 + avatarLook.y * 6);
  ctx.fillStyle = g;
  triangle(ctx, -52, -44, -86, -112, -18, -64);
  triangle(ctx, 52, -44, 86, -112, 18, -64);
  if (animal === "lion" || animal === "mainecoon") {
    ctx.fillStyle = animal === "lion" ? "#9d5d2c" : "rgba(110,70,40,0.55)";
    blob(ctx, 0, -4, 98, 92, 0.5);
    ctx.fillStyle = g;
  }
  blob(ctx, 0, -4, 78, 72, 0.5);
  if (animal === "tiger") drawTigerStripes(ctx);
  drawMuzzle(ctx, { muzzle: "small" });
  drawEyes(ctx);
  drawNoseMouth(ctx, { muzzle: "small" });
  drawCheeks(ctx);
  ctx.restore();
}

function drawRabbitAvatar(ctx, character, palette, time) {
  const g = furGradient(ctx, palette, -30, -80, 180);
  ctx.fillStyle = g;
  drawBody(ctx, { body: "small" }, palette, character.outfit);
  drawLegs(ctx, { body: "small" }, palette);
  drawArms(ctx, { body: "small" }, palette);
  ctx.save();
  ctx.translate(avatarLook.x * 10, -118 + avatarLook.y * 6);
  ctx.fillStyle = g;
  roundRect(ctx, -62, -152, 30, 120, 18, true);
  roundRect(ctx, 32, -152, 30, 120, 18, true);
  ctx.fillStyle = "rgba(255,170,190,0.52)";
  roundRect(ctx, -54, -140, 14, 92, 8, true);
  roundRect(ctx, 40, -140, 14, 92, 8, true);
  ctx.fillStyle = g;
  blob(ctx, 0, -8, 78, 72, 0.5);
  drawMuzzle(ctx, { muzzle: "small" });
  drawEyes(ctx);
  drawNoseMouth(ctx, { muzzle: "small" });
  drawCheeks(ctx);
  ctx.restore();
}

function drawRodentAvatar(ctx, character, palette, time) {
  const g = furGradient(ctx, palette, -40, -80, 190);
  ctx.fillStyle = g;
  ctx.save();
  ctx.rotate(-0.45);
  blob(ctx, -124, 12, 46, 122, 0.58);
  ctx.restore();
  drawBody(ctx, { body: "small" }, palette, character.outfit);
  drawLegs(ctx, { body: "small" }, palette);
  drawArms(ctx, { body: "small" }, palette);
  ctx.save();
  ctx.translate(avatarLook.x * 10, -116 + avatarLook.y * 6);
  ctx.fillStyle = g;
  blob(ctx, -58, -46, 34, 34, 0.5);
  blob(ctx, 58, -46, 34, 34, 0.5);
  blob(ctx, 0, -6, 76, 70, 0.5);
  ctx.strokeStyle = "rgba(87,47,25,0.25)";
  ctx.lineWidth = 5;
  [-24, 0, 24].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, -60);
    ctx.quadraticCurveTo(x + 8, -22, x - 2, 14);
    ctx.stroke();
  });
  drawMuzzle(ctx, { muzzle: "small" });
  drawEyes(ctx);
  drawNoseMouth(ctx, { muzzle: "small" });
  drawCheeks(ctx);
  ctx.restore();
}

function drawPlushAvatar(ctx, character, preset, palette, time) {
  drawTail(ctx, preset, palette, time);
  drawBody(ctx, preset, palette, character.outfit);
  drawArms(ctx, preset, palette);
  drawLegs(ctx, preset, palette);
  drawHead(ctx, preset, palette, character.weapon, time);
}

function drawShadow(ctx) {
  const g = ctx.createRadialGradient(0, 225, 10, 0, 225, 150);
  g.addColorStop(0, "rgba(0,0,0,0.26)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ellipse(ctx, 0, 230, 145, 28);
}

function furGradient(ctx, palette, x, y, r) {
  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.45, r * 0.1, x, y, r);
  g.addColorStop(0, palette[2]);
  g.addColorStop(0.45, palette[0]);
  g.addColorStop(1, palette[1]);
  return g;
}

function drawBody(ctx, preset, palette, outfit) {
  const size = {
    heavy: [92, 125], lean: [74, 126], small: [76, 112], short: [92, 98], long: [78, 136], round: [88, 118]
  }[preset.body] || [88, 118];
  ctx.fillStyle = furGradient(ctx, palette, -20, 25, 150);
  blob(ctx, 0, 48, size[0], size[1], 0.54);
  ctx.fillStyle = "rgba(255,245,220,0.34)";
  blob(ctx, 0, 62, size[0] * 0.56, size[1] * 0.6, 0.52);
  if (outfit !== "hoodie") drawOutfit(ctx, outfit, size);
}

function drawOutfit(ctx, outfit, size) {
  const colors = { cape: "#8f5cff99", scarf: "#ff7ad9cc", armor: "#dbeafe55", overalls: "#19c3ff66" };
  ctx.fillStyle = colors[outfit] || "#6b7c9a66";
  if (outfit === "scarf") {
    roundRect(ctx, -58, -24, 116, 18, 10, true);
    return;
  }
  roundRect(ctx, -size[0] * 0.58, 10, size[0] * 1.16, size[1] * 0.72, 32, true);
}

function drawHead(ctx, preset, palette, detail, time) {
  drawEars(ctx, preset, palette, detail);
  const headX = avatarLook.x * 12;
  const headY = -108 + avatarLook.y * 7;
  ctx.save();
  ctx.translate(headX, headY);
  ctx.fillStyle = furGradient(ctx, palette, -30, -38, 118);
  blob(ctx, 0, 0, preset.muzzle === "long" ? 106 : 100, 92, 0.5);
  drawMarks(ctx, preset, palette);
  drawMuzzle(ctx, preset);
  drawEyes(ctx);
  drawNoseMouth(ctx, preset);
  drawCheeks(ctx);
  ctx.restore();
}

function drawEars(ctx, preset, palette, detail) {
  const type = detail !== "round" ? detail : preset.ears;
  ctx.fillStyle = furGradient(ctx, palette, -20, -160, 85);
  const earY = -165;
  if (type === "none") return;
  if (type === "long") {
    roundRect(ctx, -76, -226, 34, 96, 18, true);
    roundRect(ctx, 42, -226, 34, 96, 18, true);
    return;
  }
  if (type === "floppy" || type === "puff") {
    blob(ctx, -76, -136, 34, 64, 0.55);
    blob(ctx, 76, -136, 34, 64, 0.55);
    return;
  }
  if (type === "fins" || type === "fin") {
    triangle(ctx, -76, -128, -112, -82, -56, -94);
    triangle(ctx, 76, -128, 112, -82, 56, -94);
    return;
  }
  if (type === "crest") {
    triangle(ctx, 0, -224, -26, -154, 26, -154);
  }
  if (type === "pointy" || type === "bigpoint" || type === "tufts") {
    triangle(ctx, -66, earY, -104, -86, -28, -106);
    triangle(ctx, 66, earY, 104, -86, 28, -106);
    return;
  }
  blob(ctx, -68, -146, 42, 44, 0.52);
  blob(ctx, 68, -146, 42, 44, 0.52);
}

function drawMuzzle(ctx, preset) {
  ctx.fillStyle = "rgba(255,238,205,0.72)";
  const wide = preset.muzzle === "wide";
  const long = preset.muzzle === "long" || preset.muzzle === "shark";
  if (preset.muzzle === "beak") {
    ctx.fillStyle = "#ffbd39";
    triangle(ctx, -18, 8, 18, 8, 0, 34);
    return;
  }
  if (preset.muzzle === "fish") {
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    blob(ctx, 0, 22, 34, 20, 0.5);
    return;
  }
  blob(ctx, 0, 24, wide ? 54 : long ? 58 : 44, long ? 30 : 26, 0.5);
}

function drawEyes(ctx) {
  const lx = -30 + avatarLook.x * 5;
  const rx = 30 + avatarLook.x * 5;
  const y = -8 + avatarLook.y * 4;
  ctx.fillStyle = "#fffaf0";
  ellipse(ctx, -34, -10, 15, 20);
  ellipse(ctx, 34, -10, 15, 20);
  ctx.fillStyle = "#06111a";
  ellipse(ctx, lx, y, 10, 14);
  ellipse(ctx, rx, y, 10, 14);
  ctx.fillStyle = "#ffffff";
  ellipse(ctx, lx - 3, y - 5, 3, 4);
  ellipse(ctx, rx - 3, y - 5, 3, 4);
}

function drawNoseMouth(ctx, preset) {
  if (preset.muzzle === "beak") return;
  ctx.fillStyle = "#2a1a21";
  ellipse(ctx, 0, 18, preset.muzzle === "wide" ? 12 : 9, 7);
  ctx.strokeStyle = "rgba(42,26,33,0.86)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.quadraticCurveTo(-10, 42, -24, 30);
  ctx.moveTo(0, 25);
  ctx.quadraticCurveTo(10, 42, 24, 30);
  ctx.stroke();
}

function drawCheeks(ctx) {
  ctx.fillStyle = "rgba(255,128,170,0.28)";
  ellipse(ctx, -55, 25, 15, 8);
  ellipse(ctx, 55, 25, 15, 8);
}

function drawCanidMarks(ctx, animal) {
  if (animal === "husky" || animal === "wolf") {
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    organicPath(ctx, [[-56, -42], [-18, -28], [-8, 0], [-36, 12], [-62, -6]]);
    organicPath(ctx, [[56, -42], [18, -28], [8, 0], [36, 12], [62, -6]]);
  }
  if (animal === "beagle" || animal === "bulldog") {
    ctx.fillStyle = "rgba(80,47,30,0.34)";
    ellipse(ctx, -34, -12, 28, 34);
  }
  if (animal === "corgi" || animal === "shiba" || animal === "fox") {
    ctx.fillStyle = "rgba(255,245,220,0.5)";
    organicPath(ctx, [[-42, 4], [42, 4], [34, 42], [0, 58], [-34, 42]]);
  }
}

function drawTigerStripes(ctx) {
  ctx.strokeStyle = "rgba(35,20,16,0.55)";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  [-42, -18, 18, 42].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, -58);
    ctx.quadraticCurveTo(x * 0.68, -32, x * 0.4, -10);
    ctx.stroke();
  });
}

function dinoFoot(ctx, x, y, palette) {
  ctx.fillStyle = furGradient(ctx, palette, x - 20, y - 40, 90);
  organicPath(ctx, [[x - 32, y - 20], [x - 20, y - 70], [x + 18, y - 68], [x + 38, y - 18], [x + 28, y + 10], [x - 18, y + 8]]);
  ctx.fillStyle = "#f8f1dc";
  triangle(ctx, x - 18, y + 4, x - 8, y + 18, x + 0, y + 4);
  triangle(ctx, x + 2, y + 5, x + 14, y + 19, x + 22, y + 4);
}

function drawCurvedTail(ctx, x1, y1, x2, y2, width) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 52, x2, y2);
  ctx.strokeStyle = ctx.fillStyle;
  ctx.stroke();
  ctx.restore();
}

function drawFishTail(ctx, x, y, size) {
  triangle(ctx, x, y, x + size, y - size * 0.72, x + size * 0.78, y);
  triangle(ctx, x, y, x + size, y + size * 0.72, x + size * 0.78, y);
}

function drawMarks(ctx, preset, palette) {
  if (preset.marks === "none") return;
  if (preset.marks === "panda" || preset.marks === "husky" || preset.marks === "mask") {
    ctx.fillStyle = preset.marks === "panda" ? "#242432" : "rgba(255,255,255,0.42)";
    ellipse(ctx, -34, -8, 26, 31);
    ellipse(ctx, 34, -8, 26, 31);
  }
  if (preset.marks === "tiger") {
    ctx.strokeStyle = "rgba(35,20,16,0.5)";
    ctx.lineWidth = 7;
    [-44, -18, 18, 44].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, -54);
      ctx.lineTo(x * 0.65, -18);
      ctx.stroke();
    });
  }
  if (preset.marks === "penguin") {
    ctx.fillStyle = "#fff7ea";
    blob(ctx, 0, 16, 58, 60, 0.55);
  }
  if (preset.marks === "stripe") {
    ctx.strokeStyle = "rgba(70,42,23,0.25)";
    ctx.lineWidth = 5;
    for (let x = -42; x <= 42; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, -50);
      ctx.quadraticCurveTo(x + 8, -26, x - 4, -5);
      ctx.stroke();
    }
  }
}

function drawArms(ctx, preset, palette) {
  ctx.fillStyle = furGradient(ctx, palette, -80, 0, 80);
  blob(ctx, -80, 48, 28, 58, 0.5);
  blob(ctx, 80, 48, 28, 58, 0.5);
}

function drawLegs(ctx, preset, palette) {
  ctx.fillStyle = furGradient(ctx, palette, -20, 120, 80);
  blob(ctx, -36, 158, 30, 58, 0.5);
  blob(ctx, 36, 158, 30, 58, 0.5);
}

function drawTail(ctx, preset, palette, time) {
  const wag = Math.sin(time / 360) * 8;
  ctx.fillStyle = furGradient(ctx, palette, -95, 40, 110);
  if (preset.tail === "none" || preset.tail === "nub") {
    blob(ctx, -76, 88, 24, 22, 0.5);
  } else if (preset.tail === "fin" || preset.tail === "feathers") {
    triangle(ctx, -82, 58, -146, 8, -132, 106);
  } else if (preset.tail === "dino") {
    blob(ctx, -94, 88, 70, 22, 0.45);
  } else {
    ctx.save();
    ctx.rotate((wag - 18) * Math.PI / 180);
    blob(ctx, -102, 32, 42, 88, 0.58);
    ctx.restore();
  }
}

function blob(ctx, x, y, rx, ry, tension = 0.5) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function organicPath(ctx, points) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i += 1) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    ctx.quadraticCurveTo(current[0], current[1], (current[0] + next[0]) / 2, (current[1] + next[1]) / 2);
  }
  ctx.closePath();
  ctx.fill();
}

function ellipse(ctx, x, y, rx, ry) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function triangle(ctx, x1, y1, x2, y2, x3, y3) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
}

function roundRect(ctx, x, y, w, h, r, fill) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) ctx.fill();
}

function animateAvatar(time) {
  renderThreeAvatar(time);
  avatarAnimation = requestAnimationFrame(animateAvatar);
}

function initThreeAvatar() {
  if (avatar3d || !els.avatarCanvas) return;
  const canvas = els.avatarCanvas;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.45, 8.8);
  camera.lookAt(0, -0.35, 0);

  const hemi = new THREE.HemisphereLight(0xdff6ff, 0x1b2430, 2.2);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 3.4);
  key.position.set(3.6, 5.2, 5.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8e5cff, 1.8);
  rim.position.set(-4, 2.4, -3);
  scene.add(rim);

  const root = new THREE.Group();
  scene.add(root);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(2.4, 48),
    new THREE.MeshBasicMaterial({ color: 0x031018, transparent: true, opacity: 0.42 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2.52;
  ground.scale.set(1.25, 0.38, 1);
  scene.add(ground);

  avatar3d = { renderer, scene, camera, root, animal: null };
  rebuildThreeAvatar();
  resizeThreeAvatar();
}

function resizeThreeAvatar() {
  if (!avatar3d || !els.avatarCanvas) return;
  const rect = els.avatarCanvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  avatar3d.renderer.setSize(width, height, false);
  avatar3d.camera.aspect = width / height;
  avatar3d.camera.updateProjectionMatrix();
}

function rebuildThreeAvatar() {
  initThreeAvatar();
  if (!avatar3d) return;
  const character = sanitizeCharacter(profile.character);
  avatar3d.root.clear();
  avatar3d.animal = createAnimalModel(character);
  avatar3d.root.add(avatar3d.animal);
}

function renderThreeAvatar(time = performance.now()) {
  initThreeAvatar();
  if (!avatar3d) return;
  resizeThreeAvatar();
  avatarLook.x += (avatarLook.tx - avatarLook.x) * 0.12;
  avatarLook.y += (avatarLook.ty - avatarLook.y) * 0.12;
  const t = time * 0.001;
  avatar3d.root.rotation.y = avatarLook.x * 0.28;
  avatar3d.root.rotation.x = -avatarLook.y * 0.08;
  avatar3d.root.position.y = 0.46 + Math.sin(t * 2.2) * 0.035;
  const head = avatar3d.root.getObjectByName("head");
  if (head) {
    head.rotation.y = avatarLook.x * 0.34;
    head.rotation.x = -avatarLook.y * 0.18;
  }
  const tail = avatar3d.root.getObjectByName("tail");
  if (tail) tail.rotation.z = tail.userData.baseRot + Math.sin(t * 4.1) * tail.userData.wag;
  avatar3d.renderer.render(avatar3d.scene, avatar3d.camera);
}

function createAnimalModel(character) {
  const palette = threePalette(character.armor);
  const group = new THREE.Group();
  const heightScale = 0.78 + ((character.height - 1) / 2) * 0.54;
  group.scale.set(0.92, heightScale, 0.92);
  buildMascotHuman3d(group, palette, character);
  return group;
}

function threePalette(name) {
  const colors = {
    anime: [0xf2f0e8, 0x24233a, 0xfff7ef],
    emo: [0x191821, 0x06070c, 0xc6c1d2],
    pop: [0xff7ad9, 0x7c2cff, 0xfff0fb],
    rich: [0xf3efe4, 0xb9904a, 0xffffff],
    sport: [0x4bd77b, 0x145c35, 0xe8fff0],
    street: [0x6f7d91, 0x1d2533, 0xdce7f5],
    cyber: [0x37dfff, 0x1722a8, 0xeaffff],
    formal: [0x222936, 0x070b12, 0xf5f0e6],
    cream: [0xf1c99a, 0x8f5733, 0xffead0],
    charcoal: [0x6c7482, 0x222b38, 0xcbd2dc],
    honey: [0xf0ad45, 0x8d5425, 0xffdfa0],
    cinnamon: [0xb86d3b, 0x5f3421, 0xeab079],
    snow: [0xf5f1e6, 0xbfcada, 0xffffff],
    ocean: [0x47c7dc, 0x1d6195, 0xb7f2ff],
    rose: [0xf99fbd, 0x9d3d69, 0xffdce8],
    moss: [0x91bc65, 0x3f653a, 0xd8ec9b]
  }[name] || [0xf1c99a, 0x8f5733, 0xffead0];
  return {
    main: colors[0],
    dark: colors[1],
    light: colors[2],
    mat: makeMat(colors[0], 0.86, 0.42),
    darkMat: makeMat(colors[1], 0.78, 0.5),
    lightMat: makeMat(colors[2], 0.9, 0.36)
  };
}

function makeMat(color, roughness = 0.8, metalness = 0.05) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function mesh(geo, mat, pos = [0, 0, 0], scale = [1, 1, 1], rot = [0, 0, 0], name = "") {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(...pos);
  m.scale.set(...scale);
  m.rotation.set(...rot);
  m.castShadow = true;
  m.receiveShadow = true;
  if (name) m.name = name;
  return m;
}

function ellipsoid(mat, pos, scale, name = "") {
  return mesh(new THREE.SphereGeometry(1, 48, 32), mat, pos, scale, [0, 0, 0], name);
}

function addEyes3d(head, y = 0.12, z = 0.72, spread = 0.34, size = 0.105) {
  const white = makeMat(0xfff8ec, 0.45, 0.02);
  const black = makeMat(0x04111c, 0.35, 0.02);
  [["L", -spread], ["R", spread]].forEach(([side, x]) => {
    const eye = mesh(new THREE.CircleGeometry(size * 1.75, 32), white, [x, y, z + 0.22], [1, 1.25, 1]);
    const pupil = mesh(new THREE.CircleGeometry(size * 0.78, 32), black, [x + avatarLook.x * 0.025, y - 0.01, z + 0.235], [1, 1.15, 1]);
    const glint = mesh(new THREE.CircleGeometry(size * 0.24, 16), makeMat(0xffffff, 0.2, 0), [x - size * 0.38, y + size * 0.46, z + 0.25], [1, 1, 1]);
    head.add(eye, pupil, glint);
  });
}

function addMuzzle3d(head, mat, type = "round") {
  const scale = type === "long" ? [0.46, 0.28, 0.46] : type === "wide" ? [0.55, 0.25, 0.3] : [0.38, 0.24, 0.32];
  head.add(ellipsoid(mat, [0, -0.26, 0.82], scale));
  head.add(ellipsoid(makeMat(0x2b1820, 0.52, 0.02), [0, -0.18, 1.08], [0.085, 0.06, 0.055]));
}

function addEars3d(head, palette, type) {
  if (type === "none") return;
  if (type === "long") {
    head.add(mesh(new THREE.CapsuleGeometry(0.13, 0.72, 8, 24), palette.mat, [-0.38, 0.78, -0.04], [1, 1, 1], [0.08, 0, -0.18]));
    head.add(mesh(new THREE.CapsuleGeometry(0.13, 0.72, 8, 24), palette.mat, [0.38, 0.78, -0.04], [1, 1, 1], [0.08, 0, 0.18]));
    return;
  }
  if (type === "floppy") {
    head.add(ellipsoid(palette.mat, [-0.64, 0.05, 0.02], [0.18, 0.48, 0.14]));
    head.add(ellipsoid(palette.mat, [0.64, 0.05, 0.02], [0.18, 0.48, 0.14]));
    return;
  }
  if (type === "pointy") {
    head.add(mesh(new THREE.ConeGeometry(0.25, 0.58, 32), palette.mat, [-0.45, 0.52, 0], [1, 1, 1], [0, 0, 0.28]));
    head.add(mesh(new THREE.ConeGeometry(0.25, 0.58, 32), palette.mat, [0.45, 0.52, 0], [1, 1, 1], [0, 0, -0.28]));
    return;
  }
  head.add(ellipsoid(palette.mat, [-0.48, 0.42, 0], [0.24, 0.28, 0.18]));
  head.add(ellipsoid(palette.mat, [0.48, 0.42, 0], [0.24, 0.28, 0.18]));
}

function addLimbs3d(group, palette, kind = "normal") {
  const armScale = kind === "dino" ? [0.11, 0.33, 0.11] : [0.2, 0.58, 0.16];
  group.add(mesh(new THREE.CapsuleGeometry(1, 1, 12, 24), palette.mat, [-0.9, -0.4, 0.12], armScale, [0, 0, -0.28]));
  group.add(mesh(new THREE.CapsuleGeometry(1, 1, 12, 24), palette.mat, [0.9, -0.4, 0.12], armScale, [0, 0, 0.28]));
  group.add(mesh(new THREE.CapsuleGeometry(1, 1, 12, 24), palette.mat, [-0.36, -1.52, 0.08], [0.22, 0.55, 0.17], [0.08, 0, 0.06]));
  group.add(mesh(new THREE.CapsuleGeometry(1, 1, 12, 24), palette.mat, [0.36, -1.52, 0.08], [0.22, 0.55, 0.17], [0.08, 0, -0.06]));
}

function buildBear3d(group, palette, species) {
  group.add(ellipsoid(palette.mat, [0, -0.55, 0], [0.82, 1.15, 0.72]));
  const head = ellipsoid(species === "panda" ? palette.lightMat : palette.mat, [0, 0.72, 0.08], [0.8, 0.72, 0.68], "head");
  group.add(head);
  addEars3d(head, species === "panda" ? { ...palette, mat: palette.darkMat } : palette, "round");
  if (species === "panda") {
    head.add(ellipsoid(palette.darkMat, [-0.28, 0.05, 0.62], [0.22, 0.28, 0.08]));
    head.add(ellipsoid(palette.darkMat, [0.28, 0.05, 0.62], [0.22, 0.28, 0.08]));
  }
  addEyes3d(head);
  addMuzzle3d(head, palette.lightMat);
  addLimbs3d(group, species === "panda" ? { ...palette, mat: palette.darkMat } : palette);
}

function buildMascotHuman3d(group, palette, character) {
  const bodyConfig = {
    skinny: { torso: [0.56, 1.1, 0.42], arm: [0.12, 0.62, 0.11], leg: [0.15, 0.62, 0.13], shoulder: 0.62 },
    strong: { torso: [0.72, 1.12, 0.48], arm: [0.16, 0.66, 0.14], leg: [0.18, 0.66, 0.15], shoulder: 0.76 },
    heavy: { torso: [0.9, 1.08, 0.55], arm: [0.2, 0.62, 0.16], leg: [0.22, 0.62, 0.17], shoulder: 0.9 }
  }[character.class] || { torso: [0.72, 1.12, 0.48], arm: [0.16, 0.66, 0.14], leg: [0.18, 0.66, 0.15], shoulder: 0.76 };
  const skinMat = makeMat(character.skinColor, 0.68, 0.03);
  const shirtMat = makeMat(character.shirtColor, 0.78, 0.04);
  const jacketMat = makeMat(character.jacketColor, 0.72, 0.08);
  const stripeMat = makeMat(character.nailColor, 0.7, 0.03);
  const baseMat = makeMat(0x5c47c8, 0.58, 0.12);

  const base = mesh(new THREE.CylinderGeometry(1.75, 1.95, 0.16, 96), baseMat, [0, -2.42, 0], [1, 1, 0.72]);
  base.receiveShadow = true;
  group.add(base);

  const torsoScale = [bodyConfig.torso[0] * character.hips, bodyConfig.torso[1] * character.torso, bodyConfig.torso[2]];
  const torso = ellipsoid(character.outfit === "naked" ? skinMat : shirtMat, [0, -0.72, 0], torsoScale);
  group.add(torso);
  if (character.outfit !== "naked") {
    group.add(ellipsoid(makeMat(0xffffff, 0.85, 0.03), [0, -0.62, 0.43], [torsoScale[0] * 0.58, 0.7, 0.06]));
  }
  addButtons3d(group);

  const head = new THREE.Group();
  head.name = "head";
  head.position.set(0, 0.82 + (character.neck - 1) * 0.16, 0.02);
  group.add(head);
  group.add(mesh(new THREE.CapsuleGeometry(0.16, 0.26 * character.neck, 12, 24), skinMat, [0, 0.28, 0], [1, 1, 1]));
  head.add(ellipsoid(skinMat, [0, 0, 0], [0.68, 0.78, 0.62]));
  addHumanEars3d(head, skinMat, character);
  addHumanFace3d(head, character);
  addHair3d(head, character.weapon, character);

  addHumanArmsLegs(group, bodyConfig, skinMat, shirtMat, stripeMat, character);
  addHumanOutfit3d(group, character);
}

function addTigerHood3d(head, suitMat, stripeMat) {
  head.add(ellipsoid(suitMat, [-0.68, 0.38, -0.06], [0.28, 0.33, 0.2]));
  head.add(ellipsoid(suitMat, [0.68, 0.38, -0.06], [0.28, 0.33, 0.2]));
  head.add(ellipsoid(makeMat(0xdedbd4, 0.95, 0.02), [-0.68, 0.38, 0.02], [0.17, 0.2, 0.08]));
  head.add(ellipsoid(makeMat(0xdedbd4, 0.95, 0.02), [0.68, 0.38, 0.02], [0.17, 0.2, 0.08]));
  [
    [-0.32, 0.68, 0.62, 0.26],
    [0, 0.73, 0.65, 0.32],
    [0.32, 0.68, 0.62, -0.26],
    [-0.82, 0.0, 0.46, -0.58],
    [0.82, 0.0, 0.46, 0.58],
    [-0.72, -0.36, 0.48, -0.46],
    [0.72, -0.36, 0.48, 0.46]
  ].forEach(([x, y, z, r]) => {
    head.add(mesh(new THREE.BoxGeometry(0.32, 0.055, 0.028), stripeMat, [x, y, z], [1, 1, 1], [0, 0, r]));
  });
}

function addHumanEars3d(head, skinMat, character) {
  const size = 0.12 * character.ears;
  head.add(ellipsoid(skinMat, [-0.69, -0.02, 0.02], [size, size * 1.28, size * 0.5]));
  head.add(ellipsoid(skinMat, [0.69, -0.02, 0.02], [size, size * 1.28, size * 0.5]));
}

function addHumanFace3d(head, character) {
  const eyeMat = makeMat(character.eyeColor, 0.38, 0.03);
  const white = makeMat(0xffffff, 0.32, 0.02);
  const black = makeMat(0x05070c, 0.4, 0.02);
  [["L", -0.25], ["R", 0.25]].forEach(([side, x]) => {
    head.add(ellipsoid(white, [x, 0.08, 0.58], [0.12, 0.08, 0.035]));
    head.add(ellipsoid(eyeMat, [x + avatarLook.x * 0.02, 0.08 + avatarLook.y * 0.01, 0.612], [0.055, 0.055, 0.018]));
    head.add(ellipsoid(black, [x + avatarLook.x * 0.024, 0.08 + avatarLook.y * 0.012, 0.628], [0.027, 0.027, 0.01]));
  });
  head.add(ellipsoid(makeMat(0x9a5b45, 0.58, 0.02), [0, -0.08, 0.62], [0.055, 0.09, 0.025]));
  const mouth = mesh(new THREE.TorusGeometry(0.14 * character.mouth, 0.012, 8, 24, Math.PI), makeMat(0x5e2434, 0.55, 0.02), [0, -0.29, 0.62], [1, 0.55, 1], [0, 0, Math.PI]);
  head.add(mouth);
}

function addHumanArmsLegs(group, bodyConfig, skinMat, shirtMat, nailMat, character) {
  const sleeveMat = character.outfit === "naked" ? skinMat : shirtMat;
  const armScale = [bodyConfig.arm[0] * character.arms, bodyConfig.arm[1] * character.arms, bodyConfig.arm[2] * character.arms];
  const legScale = [bodyConfig.leg[0] * character.legs, bodyConfig.leg[1] * character.legs, bodyConfig.leg[2] * character.legs];
  group.add(mesh(new THREE.CapsuleGeometry(1, 1, 14, 32), sleeveMat, [-bodyConfig.shoulder, -0.62, 0.08], armScale, [0, 0, -0.14]));
  group.add(mesh(new THREE.CapsuleGeometry(1, 1, 14, 32), sleeveMat, [bodyConfig.shoulder, -0.62, 0.08], armScale, [0, 0, 0.14]));
  group.add(ellipsoid(skinMat, [-bodyConfig.shoulder - 0.02, -1.22 * character.arms, 0.11], [0.15, 0.22, 0.1]));
  group.add(ellipsoid(skinMat, [bodyConfig.shoulder + 0.02, -1.22 * character.arms, 0.11], [0.15, 0.22, 0.1]));
  [-1, 1].forEach((side) => {
    for (let i = 0; i < 4; i += 1) {
      group.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.05, 8), nailMat, [side * (bodyConfig.shoulder + 0.02 + (i - 1.5) * 0.028), -1.4 * character.arms, 0.2], [1, 1, 1], [Math.PI / 2, 0, 0]));
    }
  });
  group.add(mesh(new THREE.CapsuleGeometry(1, 1, 14, 32), character.outfit === "naked" ? skinMat : makeMat(0x293142, 0.82, 0.03), [-0.32 * character.hips, -1.68, 0.04], legScale, [0, 0, 0.03]));
  group.add(mesh(new THREE.CapsuleGeometry(1, 1, 14, 32), character.outfit === "naked" ? skinMat : makeMat(0x293142, 0.82, 0.03), [0.32 * character.hips, -1.68, 0.04], legScale, [0, 0, -0.03]));
  group.add(ellipsoid(makeMat(0x151922, 0.75, 0.04), [-0.32 * character.hips, -2.12 * character.legs, 0.2], [0.22 * character.feet, 0.12, 0.3 * character.feet]));
  group.add(ellipsoid(makeMat(0x151922, 0.75, 0.04), [0.32 * character.hips, -2.12 * character.legs, 0.2], [0.22 * character.feet, 0.12, 0.3 * character.feet]));
}

function addHumanOutfit3d(group, character) {
  if (character.outfit === "naked") return;
  const jacketMat = makeMat(character.jacketColor, 0.72, 0.08);
  if (["jacket", "suit", "tracksuit", "dress", "armor", "white-tiger"].includes(character.outfit)) {
    const color = character.outfit === "suit" ? 0x141820 : character.outfit === "white-tiger" ? 0xf2f0e8 : character.jacketColor;
    const mat = makeMat(color, 0.72, character.outfit === "armor" ? 0.25 : 0.08);
    group.add(mesh(new THREE.CylinderGeometry(0.62 * character.hips, 0.76 * character.hips, 0.95 * character.torso, 40, 1, true), mat, [0, -0.62, 0.04], [1, 1, 1]));
    if (character.outfit === "white-tiger") addSuitStripes3d(group, makeMat(character.nailColor, 0.7, 0.03));
  }
}

function addMask3d(head, faceStyle) {
  const texture = makeMaskTexture(faceStyle);
  const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
  const mask = mesh(new THREE.PlaneGeometry(1.12, 0.82), mat, [0, -0.1, 0.82]);
  mask.name = "faceMask";
  head.add(mask);
}

function makeMaskTexture(faceStyle) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#e8ecee";
  ctx.strokeStyle = "#151b23";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(94, 74);
  ctx.quadraticCurveTo(256, 10, 418, 74);
  ctx.quadraticCurveTo(456, 182, 392, 292);
  ctx.quadraticCurveTo(256, 354, 120, 292);
  ctx.quadraticCurveTo(56, 182, 94, 74);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#080d14";
  ctx.beginPath();
  ctx.ellipse(178, 178, 54, 64, -0.1, 0, Math.PI * 2);
  ctx.ellipse(334, 178, 54, 64, 0.1, 0, Math.PI * 2);
  ctx.fill();
  const eyeGrad = ctx.createRadialGradient(176, 178, 4, 176, 178, 42);
  eyeGrad.addColorStop(0, "#ffffff");
  eyeGrad.addColorStop(0.45, "#5ee7ff");
  eyeGrad.addColorStop(1, "#06364d");
  ctx.fillStyle = eyeGrad;
  ctx.beginPath();
  ctx.ellipse(178, 188, 28, 34, -0.1, 0, Math.PI * 2);
  ctx.ellipse(334, 188, 28, 34, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(166, 170, 8, 0, Math.PI * 2);
  ctx.arc(322, 170, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#101820";
  ctx.beginPath();
  ctx.moveTo(248, 232);
  ctx.quadraticCurveTo(256, 214, 264, 232);
  ctx.quadraticCurveTo(256, 246, 248, 232);
  ctx.fill();
  ctx.strokeStyle = "#101820";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(158, 278);
  ctx.quadraticCurveTo(256, 328, 354, 278);
  ctx.stroke();
  ctx.lineWidth = 4;
  for (let x = 178; x <= 334; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, 284);
    ctx.lineTo(x - 4, 306);
    ctx.stroke();
  }

  ctx.fillStyle = faceStyle === "emo-sweep" ? "#7b2cff" : "#e3314f";
  ctx.beginPath();
  ctx.moveTo(256, 86);
  ctx.bezierCurveTo(230, 62, 198, 94, 256, 132);
  ctx.bezierCurveTo(314, 94, 282, 62, 256, 86);
  ctx.fill();
  ctx.fillStyle = "#d62843";
  [[118, 122], [394, 122], [256, 150], [256, 72]].forEach(([x, y], i) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(i * 0.55);
    ctx.fillRect(-10, -10, 20, 20);
    ctx.restore();
  });
  ctx.strokeStyle = "#1d2530";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(116, 180);
  ctx.bezierCurveTo(142, 140, 164, 124, 204, 114);
  ctx.moveTo(396, 180);
  ctx.bezierCurveTo(370, 140, 348, 124, 308, 114);
  ctx.stroke();
  ctx.fillStyle = "#3567ff";
  [108, 224, 124, 246, 404, 224, 388, 246].forEach((v, i, arr) => {
    if (i % 2 === 0) {
      ctx.beginPath();
      ctx.arc(arr[i], arr[i + 1], 5, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function addButtons3d(group) {
  const mat = makeMat(0x15191f, 0.45, 0.05);
  [-0.16, -0.48, -0.8, -1.12].forEach((y) => {
    group.add(mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.018, 24), mat, [0.02, y, 0.52], [1, 1, 1], [Math.PI / 2, 0, 0]));
  });
}

function addMascotArmsLegs(group, bodyConfig, suitMat, skinMat, stripeMat) {
  group.add(mesh(new THREE.CapsuleGeometry(1, 1, 14, 32), suitMat, [-bodyConfig.shoulder, -0.64, 0.08], bodyConfig.arm, [0, 0, -0.16]));
  group.add(mesh(new THREE.CapsuleGeometry(1, 1, 14, 32), suitMat, [bodyConfig.shoulder, -0.64, 0.08], bodyConfig.arm, [0, 0, 0.16]));
  group.add(ellipsoid(skinMat, [-bodyConfig.shoulder - 0.03, -1.26, 0.1], [0.14, 0.22, 0.1]));
  group.add(ellipsoid(skinMat, [bodyConfig.shoulder + 0.03, -1.26, 0.1], [0.14, 0.22, 0.1]));
  group.add(mesh(new THREE.CapsuleGeometry(1, 1, 14, 32), suitMat, [-0.32, -1.72, 0.04], bodyConfig.leg, [0, 0, 0.03]));
  group.add(mesh(new THREE.CapsuleGeometry(1, 1, 14, 32), suitMat, [0.32, -1.72, 0.04], bodyConfig.leg, [0, 0, -0.03]));
  group.add(ellipsoid(suitMat, [-0.32, -2.14, 0.2], [0.22, 0.12, 0.28]));
  group.add(ellipsoid(suitMat, [0.32, -2.14, 0.2], [0.22, 0.12, 0.28]));
  [-0.39, -0.32, -0.25, 0.25, 0.32, 0.39].forEach((x) => {
    group.add(mesh(new THREE.ConeGeometry(0.035, 0.1, 12), stripeMat, [x, -2.08, 0.45], [1, 1, 1], [Math.PI / 2, 0, 0]));
  });
}

function addSuitStripes3d(group, stripeMat) {
  [
    [-0.66, -0.28, 0.48, -0.35], [0.66, -0.28, 0.48, 0.35],
    [-0.72, -0.78, 0.46, -0.28], [0.72, -0.78, 0.46, 0.28],
    [-0.42, -1.82, 0.33, -0.18], [0.42, -1.82, 0.33, 0.18]
  ].forEach(([x, y, z, r]) => {
    group.add(mesh(new THREE.BoxGeometry(0.34, 0.05, 0.028), stripeMat, [x, y, z], [1, 1, 1], [0, 0, r]));
  });
}

function addHair3d(head, hair, palette) {
  const color = typeof palette?.hairColor === "string" ? palette.hairColor : (hair === "emo-sweep" ? 0x17141f : hair === "pop-waves" ? 0xffd33d : hair === "rich-slick" ? 0x2b2018 : 0x101820);
  const mat = makeMat(color, 0.7, 0.05);
  if (hair === "buzz") {
    head.add(ellipsoid(mat, [0, 0.54, 0.02], [0.58, 0.16, 0.48]));
    return;
  }
  if (hair === "afro") {
    head.add(ellipsoid(mat, [0, 0.58, 0.02], [0.72, 0.42, 0.62]));
    return;
  }
  if (hair === "ponytail") {
    head.add(ellipsoid(mat, [0, 0.48, -0.4], [0.42, 0.34, 0.28]));
    head.add(mesh(new THREE.CapsuleGeometry(0.11, 0.7, 10, 18), mat, [0, 0.12, -0.78], [1, 1, 1], [0.4, 0, 0]));
    return;
  }
  for (let i = -2; i <= 2; i += 1) {
    head.add(mesh(new THREE.ConeGeometry(0.13, hair === "anime-spikes" ? 0.54 : 0.34, 20), mat, [i * 0.18, 0.62 - Math.abs(i) * 0.04, 0.16], [1, 1, 1], [0.35, 0, -i * 0.22]));
  }
}

function buildTrex3d(group, palette) {
  group.add(ellipsoid(palette.mat, [0, -0.48, 0], [0.78, 1.28, 0.62]));
  const head = new THREE.Group();
  head.name = "head";
  head.position.set(0.18, 0.88, 0.15);
  head.add(ellipsoid(palette.mat, [0, 0, 0], [0.72, 0.46, 0.52]));
  head.add(ellipsoid(palette.mat, [0.5, -0.08, 0.08], [0.58, 0.28, 0.34]));
  addEyes3d(head, 0.12, 0.48, 0.22, 0.08);
  head.add(ellipsoid(makeMat(0x201312), [0.92, -0.08, 0.16], [0.045, 0.035, 0.03]));
  for (let i = 0; i < 8; i += 1) head.add(mesh(new THREE.ConeGeometry(0.035, 0.12, 12), makeMat(0xfff2d8), [0.22 + i * 0.1, -0.34, 0.31], [1, 1, 1], [Math.PI, 0, 0]));
  group.add(head);
  const tail = mesh(new THREE.ConeGeometry(0.34, 1.9, 32), palette.mat, [-1.0, -0.48, -0.08], [1, 1, 1], [0, 0, Math.PI / 2.35], "tail");
  tail.userData = { baseRot: Math.PI / 2.35, wag: 0.18 };
  group.add(tail);
  addLimbs3d(group, palette, "dino");
  group.add(mesh(new THREE.ConeGeometry(0.08, 0.18, 12), makeMat(0xf8f1dc), [-0.52, -2.12, 0.25], [1, 1, 1], [Math.PI / 2, 0, 0]));
  group.add(mesh(new THREE.ConeGeometry(0.08, 0.18, 12), makeMat(0xf8f1dc), [0.52, -2.12, 0.25], [1, 1, 1], [Math.PI / 2, 0, 0]));
}

function buildAquatic3d(group, palette, species) {
  const shark = species === "shark";
  group.add(ellipsoid(palette.mat, [0, -0.38, 0], shark ? [0.9, 1.35, 0.62] : [0.9, 1.08, 0.62]));
  const head = ellipsoid(palette.mat, [0, 0.72, 0.08], shark ? [0.88, 0.72, 0.66] : [0.78, 0.68, 0.64], "head");
  group.add(head);
  addEyes3d(head, 0.1, 0.58, 0.28, 0.085);
  if (shark) {
    head.add(ellipsoid(palette.lightMat, [0, -0.32, 0.52], [0.54, 0.18, 0.18]));
    for (let i = 0; i < 7; i += 1) head.add(mesh(new THREE.ConeGeometry(0.035, 0.12, 12), makeMat(0xffffff), [-0.3 + i * 0.1, -0.38, 0.7], [1, 1, 1], [Math.PI, 0, 0]));
  } else {
    head.add(ellipsoid(makeMat(0xff7aa2), [0.36, -0.14, 0.62], [0.13, 0.08, 0.05]));
  }
  group.add(mesh(new THREE.ConeGeometry(0.28, 0.82, 32), palette.mat, [0, 0.35, -0.44], [1, 1, 1], [Math.PI / 2, 0, 0]));
  const tail = mesh(new THREE.ConeGeometry(0.42, 1.1, 32), palette.mat, [0, -1.92, 0], [0.8, 1, 0.55], [Math.PI, 0, 0], "tail");
  tail.userData = { baseRot: Math.PI, wag: 0.18 };
  group.add(tail);
}

function buildBird3d(group, palette, species) {
  const penguin = species === "penguin";
  group.add(ellipsoid(palette.mat, [0, -0.48, 0], [0.82, 1.25, 0.66]));
  group.add(ellipsoid(penguin ? palette.lightMat : makeMat(0xffffff, 0.8, 0.02), [0, -0.42, 0.48], [0.48, 0.82, 0.12]));
  const head = ellipsoid(palette.mat, [0, 0.76, 0.08], [0.72, 0.68, 0.62], "head");
  group.add(head);
  addEyes3d(head, 0.08, 0.58, 0.24, 0.085);
  head.add(mesh(new THREE.ConeGeometry(0.16, 0.42, 24), makeMat(species === "parrot" ? 0xff6848 : 0xffbd39), [0, -0.08, 0.78], [1, 1, 1], [Math.PI / 2, 0, 0]));
  if (species === "parrot") head.add(mesh(new THREE.ConeGeometry(0.18, 0.55, 24), makeMat(0xff7ad9), [0, 0.64, 0], [1, 1, 1], [0, 0, 0]));
  group.add(ellipsoid(palette.mat, [-0.82, -0.38, 0], [0.18, 0.78, 0.22]));
  group.add(ellipsoid(palette.mat, [0.82, -0.38, 0], [0.18, 0.78, 0.22]));
}

function buildCanid3d(group, palette, species) {
  const short = species === "corgi";
  const heavy = species === "bulldog";
  group.add(ellipsoid(palette.mat, [0, -0.58, 0], [heavy ? 0.92 : 0.78, short ? 0.88 : 1.08, 0.64]));
  const head = ellipsoid(palette.mat, [0, 0.72, 0.08], [heavy ? 0.78 : 0.7, heavy ? 0.56 : 0.64, 0.58], "head");
  group.add(head);
  addEars3d(head, palette, ["husky", "shiba", "wolf", "fox", "coyote", "corgi"].includes(species) ? "pointy" : "floppy");
  if (species === "husky" || species === "wolf") {
    head.add(ellipsoid(palette.lightMat, [-0.25, 0.06, 0.58], [0.18, 0.22, 0.06]));
    head.add(ellipsoid(palette.lightMat, [0.25, 0.06, 0.58], [0.18, 0.22, 0.06]));
  }
  addEyes3d(head, 0.08, 0.58, 0.25, 0.08);
  addMuzzle3d(head, palette.lightMat, heavy ? "wide" : "long");
  const tail = mesh(new THREE.TorusGeometry(0.38, 0.09, 12, 32, Math.PI * 1.45), palette.mat, [-0.82, -0.54, -0.05], [1, 1, 1], [0.4, 0.1, -0.8], "tail");
  tail.userData = { baseRot: -0.8, wag: 0.24 };
  group.add(tail);
  addLimbs3d(group, palette);
}

function buildFeline3d(group, palette, species) {
  const lion = species === "lion" || species === "mainecoon";
  group.add(ellipsoid(palette.mat, [0, -0.55, 0], [0.74, 1.06, 0.6]));
  const head = ellipsoid(palette.mat, [0, 0.72, 0.08], [0.68, 0.62, 0.58], "head");
  group.add(head);
  addEars3d(head, palette, "pointy");
  if (lion) head.add(ellipsoid(makeMat(species === "lion" ? 0x8f542b : palette.dark, 0.86, 0.08), [0, 0, -0.02], [0.86, 0.78, 0.5]));
  if (species === "tiger") {
    for (let i = -2; i <= 2; i += 1) head.add(mesh(new THREE.BoxGeometry(0.035, 0.32, 0.025), makeMat(0x221510), [i * 0.16, 0.26, 0.62], [1, 1, 1], [0, 0, i * 0.16]));
  }
  addEyes3d(head, 0.08, 0.58, 0.25, 0.08);
  addMuzzle3d(head, palette.lightMat, "round");
  const tail = mesh(new THREE.CapsuleGeometry(0.11, 1.25, 10, 24), palette.mat, [-0.82, -0.42, -0.05], [1, 1, 1], [0.2, 0, -0.75], "tail");
  tail.userData = { baseRot: -0.75, wag: 0.2 };
  group.add(tail);
  addLimbs3d(group, palette);
}

function buildRabbit3d(group, palette) {
  group.add(ellipsoid(palette.mat, [0, -0.55, 0], [0.72, 1.0, 0.58]));
  const head = ellipsoid(palette.mat, [0, 0.72, 0.08], [0.66, 0.62, 0.56], "head");
  group.add(head);
  addEars3d(head, palette, "long");
  addEyes3d(head, 0.08, 0.56, 0.24, 0.08);
  addMuzzle3d(head, palette.lightMat, "round");
  group.add(ellipsoid(palette.lightMat, [-0.82, -0.75, -0.12], [0.18, 0.18, 0.14], "tail"));
  addLimbs3d(group, palette);
}

function buildRodent3d(group, palette, species) {
  group.add(ellipsoid(palette.mat, [0, -0.55, 0], [0.68, 1.0, 0.58]));
  const head = ellipsoid(palette.mat, [0, 0.72, 0.08], [0.64, 0.6, 0.54], "head");
  group.add(head);
  addEars3d(head, palette, "round");
  addEyes3d(head, 0.08, 0.54, 0.23, 0.075);
  addMuzzle3d(head, palette.lightMat, "round");
  const tail = mesh(new THREE.TorusGeometry(0.62, 0.18, 16, 48, Math.PI * 1.35), palette.mat, [-0.78, -0.28, -0.08], [1, 1, 1], [0.2, 0, -0.82], "tail");
  tail.userData = { baseRot: -0.82, wag: 0.16 };
  group.add(tail);
  addLimbs3d(group, palette);
}

function addOutfit3d(group, outfit) {
  if (outfit === "hoodie") return;
  const material = makeMat(outfit === "cape" ? 0x8f5cff : outfit === "scarf" ? 0xff7ad9 : outfit === "armor" ? 0xc9d7ea : 0x19c3ff, 0.65, 0.08);
  if (outfit === "scarf") {
    group.add(mesh(new THREE.TorusGeometry(0.55, 0.055, 12, 48), material, [0, 0.12, 0.1], [1, 0.28, 1], [Math.PI / 2, 0, 0]));
    return;
  }
  group.add(mesh(new THREE.CylinderGeometry(0.68, 0.82, 0.72, 40, 1, true), material, [0, -0.38, 0.02], [1, 1, 1], [0, 0, 0]));
}

function saveCharacterFromControls() {
  const cleanName = els.characterNameInput.value.trim().replace(/[^a-z0-9 _-]/gi, "").slice(0, 18);
  profile.displayName = cleanName || "Guest";
  profile.characterCreated = true;
  profile.character = collectCharacterFromControls();
  saveProfile();
  renderProfile();
  renderTables();
}

function randomizeCharacter() {
  const names = ["Vex Ronin", "Heart Phantom", "Pixel Vale", "Nova Scout", "Rune Traveler", "Zero Marshal"];
  els.characterNameInput.value = names[Math.floor(Math.random() * names.length)];
  const preset = avatarPresets[Math.floor(Math.random() * avatarPresets.length)];
  profile.character = sanitizeCharacter({ ...profile.character, ...preset });
  syncProfileControls();
  els.heightInput.value = (1.25 + Math.random() * 1.45).toFixed(2);
  els.heightValue.textContent = `${Number(els.heightInput.value).toFixed(2)} m`;
  profile.character.height = Number(els.heightInput.value);
  saveCharacterFromControls();
}

function randomSelect(select) {
  select.selectedIndex = Math.floor(Math.random() * select.options.length);
}

function getInitials(name) {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] || "F") + (parts[1]?.[0] || "H");
}

function startRocketRun() {
  loadRocketWorldMap();
  loadRocketCatalog();
  clearInterval(timer);
  stopPropellerSound();
  if (els.rocketResultOverlay) els.rocketResultOverlay.hidden = true;
  if (els.techTreeOverlay) els.techTreeOverlay.hidden = true;
  const start = randomRocketStart();
  const tech = { fuel: 0, speed: 0, turn: 0 };
  const tutorialMode = sessionStorage.getItem("flagHunterRocketTutorial") === "1";
  if (tutorialMode) sessionStorage.removeItem("flagHunterRocketTutorial");
  const externalRounds = tutorialMode ? 1 : 0;
  const desiredRounds = externalRounds || rocketState?.desiredRounds || 10;
  rocketState = {
    active: false,
    mapW: 8200,
    mapH: 4200,
    viewW: 1,
    viewH: 1,
    ship: { x: start.x, y: start.y, vx: 0, vy: 0, angle: 0, altitude: 0, throttle: 0, bank: 0 },
    start,
    mouse: { x: 0, y: 0, inside: false },
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
    fuel: Math.min(100, 76 + tech.fuel * 9),
    time: 90,
    roundTimeLimit: 90,
    target: pickRocketTarget(1),
    sideQuest: pickRocketSideQuest(1),
    sideQuestPulse: 0,
    depots: makeRocketDepots(),
    clouds: [],
    trail: [],
    routeTrail: [],
    roundLogs: [],
    landingLogs: [],
    scoreEvents: [],
    roundLogged: false,
    pendingNextRound: null,
    targetHistory: rocketState?.targetHistory || [],
    lastObjectiveDistance: null,
    distanceTrend: null,
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
  els.rocketMessage.textContent = "Destination assigned. Check the flag and country, then begin takeoff when ready.";
  if (els.rocketStart) {
    els.rocketStart.hidden = false;
    els.rocketStart.textContent = "Begin Takeoff";
  }
  window.FlagGuard?.startRun?.({
    displayName: profile.displayName || "Guest",
    rounds
  });
  rocketFeedback(`${rounds} rounds selected`, "#45f875", "success");
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
  return {
    x: Math.max(180, Math.min(rocketState?.mapW ? rocketState.mapW - 180 : 8020, anchor.x + (Math.random() - 0.5) * 1100)),
    y: Math.max(180, Math.min(rocketState?.mapH ? rocketState.mapH - 180 : 4020, anchor.y + (Math.random() - 0.5) * 760))
  };
}

function pickRocketTarget(difficulty) {
  const pool = getRocketPool(difficulty);
  const recent = new Set(rocketState?.targetHistory || []);
  const variedPool = pool.filter((target) => !recent.has(target.name));
  const source = variedPool.length >= Math.min(10, pool.length) ? variedPool : pool;
  return source[Math.floor(Math.random() * source.length)];
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
    reward: 3 + difficulty * 2
  };
}

function makeRocketDepots() {
  const source = (rocketCatalog?.length ? rocketCatalog : rocketTargets)
    .filter((item) => !blockedRocketCountries.has(item.name) && (item.lat === undefined || item.lat > -58));
  const depots = [];
  const target = rocketState?.target;
  const minTargetDistance = 540;
  const minDepotDistance = 680;
  let guard = 0;
  while (depots.length < 5 && guard < 600 && source.length) {
    guard += 1;
    const anchor = source[Math.floor(Math.random() * source.length)];
    const point = anchor.capitalPoint || anchor;
    const x = Math.max(160, Math.min(rocketState?.mapW ? rocketState.mapW - 160 : 8040, point.x + (Math.random() - 0.5) * 420));
    const y = Math.max(160, Math.min(rocketState?.mapH ? rocketState.mapH - 160 : 4040, point.y + (Math.random() - 0.5) * 320));
    if (target && Math.hypot(x - target.x, y - target.y) < minTargetDistance) continue;
    if (depots.some((depot) => Math.hypot(x - depot.x, y - depot.y) < minDepotDistance)) continue;
    depots.push({ x, y, fuel: 30, used: false, name: `Depot ${depots.length + 1}`, angle: Math.random() * Math.PI * 2, country: anchor.name });
  }
  let fallbackGuard = 0;
  while (depots.length < 5 && fallbackGuard < 600) {
    fallbackGuard += 1;
    const x = 320 + Math.random() * ((rocketState?.mapW || 8200) - 640);
    const y = 320 + Math.random() * ((rocketState?.mapH || 4200) - 640);
    if (target && Math.hypot(x - target.x, y - target.y) < minTargetDistance) continue;
    if (depots.some((depot) => Math.hypot(x - depot.x, y - depot.y) < minDepotDistance)) continue;
    depots.push({ x, y, fuel: 30, used: false, name: `Depot ${depots.length + 1}`, angle: Math.random() * Math.PI * 2 });
  }
  while (depots.length < 5) {
    depots.push({
      x: 320 + Math.random() * ((rocketState?.mapW || 8200) - 640),
      y: 320 + Math.random() * ((rocketState?.mapH || 4200) - 640),
      fuel: 30,
      used: false,
      name: `Depot ${depots.length + 1}`,
      angle: Math.random() * Math.PI * 2
    });
  }
  return depots;
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
      `${kind === "depot" ? `Research +${research} TP | fuel ${fuel?.toFixed?.(0) ?? fuel}%` : rating.note}`
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
    fuel: rocketState.fuel,
    time: rocketState.time,
    trace,
    landings: [...(rocketState.landingLogs || [])]
  });
}

function makeRocketClouds() {
  return Array.from({ length: 22 }, (_, index) => ({
    x: 500 + Math.random() * 7200,
    y: 450 + Math.random() * 3300,
    r: 150 + Math.random() * 240,
    drift: 12 + Math.random() * 28,
    seed: index * 23 + Math.random() * 10
  }));
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
    rocketState.techPoints += 2 + Math.floor(rocketState.difficulty / 2);
    rocketState.fuel = Math.min(100, rocketState.fuel + 10 + rocketState.tech.fuel * 3);
    rocketFeedback("Route reached", "#45f875", "success");
    playTone("correct");
  } else {
    rocketState.score = Math.max(0, rocketState.score - 850);
    rocketState.fuel = Math.min(100, 70 + rocketState.tech.fuel * 8);
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
  if (rocketState.wins >= rocketState.desiredRounds) {
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
  rocketState.ship = { x: rocketState.start.x, y: rocketState.start.y, vx: 0, vy: 0, angle: 0, altitude: 0, throttle: 0, bank: 0 };
  rocketState.target = pickRocketTarget(rocketState.difficulty);
  rememberRocketTarget(rocketState.target);
  rocketState.sideQuest = pickRocketSideQuest(rocketState.difficulty);
  rocketState.depots = makeRocketDepots();
  rocketState.clouds = makeRocketClouds();
  rocketState.clouds = [];
  rocketState.trail = [];
  rocketState.routeTrail = [];
  rocketState.landingLogs = [];
  rocketState.scoreEvents = rocketState.scoreEvents.filter((event) => event.round !== rocketState.round);
  rocketState.roundLogged = false;
  rocketState.pendingNextRound = null;
  rocketState.parkingHold = 0;
  rocketState.parked = false;
  rocketState.objectiveZone = null;
  rocketState.lastObjectiveDistance = null;
  rocketState.distanceTrend = null;
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
  renderRocketHud();
}

function updateRocketPendingNextRound(dt) {
  if (!rocketState?.pendingNextRound) return;
  rocketState.pendingNextRound.delay -= dt;
  if (rocketState.pendingNextRound.delay > 0) return;
  const pending = rocketState.pendingNextRound;
  rocketState.pendingNextRound = null;
  nextRocketRound(pending.success);
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
  if (rocketState.parkingHold > 0) {
    rocketState.parkingHold = Math.max(0, rocketState.parkingHold - dt);
  }
  const control = getRocketControlVector(rect);
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
  const turnRate = 1.6 + rocketState.tech.turn * 0.42;
  if (runwayLocked) {
    rocketState.ship.bank += (0 - rocketState.ship.bank) * Math.min(1, dt * 8);
  } else {
    rocketState.ship.angle += turn * Math.min(1, dt * turnRate);
    rocketState.ship.bank += (Math.max(-1, Math.min(1, turn * 1.9)) - rocketState.ship.bank) * Math.min(1, dt * 5);
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
  rocketState.ship.throttle += (intent - rocketState.ship.throttle) * Math.min(1, dt * (parkingBrake || spaceBrake || noseDecel ? 3.2 : 2.15));
  const cloudDrag = 1;
  const thrust = (720 + rocketState.tech.speed * 180 + rocketState.tech.turn * 28) * cloudDrag;
  rocketState.ship.vx += Math.cos(rocketState.ship.angle) * thrust * rocketState.ship.throttle * dt;
  rocketState.ship.vy += Math.sin(rocketState.ship.angle) * thrust * rocketState.ship.throttle * dt;
  const brake = parkingBrake ? 0.048 + rocketState.tech.speed * 0.006 : spaceBrake ? 0.034 : noseDecel ? 0.018 : 0;
  rocketState.ship.vx *= Math.max(0.86, 0.994 - brake);
  rocketState.ship.vy *= Math.max(0.86, 0.994 - brake);
  let currentSpeed = Math.hypot(rocketState.ship.vx, rocketState.ship.vy);
  if (spaceBrake && currentSpeed < 30 && currentSpeed > 0) {
    rocketState.ship.vx = rocketState.ship.vx / currentSpeed * 30;
    rocketState.ship.vy = rocketState.ship.vy / currentSpeed * 30;
    currentSpeed = 30;
  }
  const maxSpeed = (520 + rocketState.tech.speed * 145 + rocketState.tech.turn * 20 + rocketState.difficulty * 24) * cloudDrag;
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
  const verticalUpgrade = 1 + rocketState.tech.turn * 0.16 + rocketState.tech.speed * 0.05;
  if (currentSpeed > liftSpeed && rocketState.ship.throttle > 0.45) {
    rocketState.ship.altitude += (currentSpeed - liftSpeed) * (0.38 + climbIntent * 0.75) * verticalUpgrade * dt;
  } else {
    const descentRate = (18 + Math.max(0, liftSpeed - currentSpeed) * 0.28 + (1 - rocketState.ship.throttle) * 20) * verticalUpgrade;
    rocketState.ship.altitude -= descentRate * dt;
  }
  rocketState.ship.altitude = Math.max(0, Math.min(3200, rocketState.ship.altitude));
  if (rocketState.phase === "takeoff" && rocketState.ship.altitude > 120) {
    rocketState.phase = "cruise";
    els.rocketMessage.textContent = `Airborne. Navigate by country shape and the briefing flag. Optional beacon: ${rocketState.sideQuest.capital}, ${rocketState.sideQuest.name}.`;
    rocketFeedback("Cruise unlocked", "#45f875", "success");
  }
  rocketState.ship.x += rocketState.ship.vx * dt;
  rocketState.ship.y += rocketState.ship.vy * dt;
  updateRocketTrail(dt, rect);
  updateRocketDistanceTrend();
  rocketState.time -= dt;
  rocketState.fuel -= (0.72 + rocketState.ship.throttle * 1.35) * dt * Math.max(0.52, 1 - rocketState.tech.fuel * 0.06);
  if (rocketState.fuel <= 0) {
    rocketState.fuel = 0;
    rocketState.active = false;
    rocketState.score = Math.max(0, rocketState.score - 850);
    els.rocketMessage.textContent = "Fuel exhausted. Flight ended.";
    rocketFeedback("Out of fuel", "#ff3d5a", "error");
    stopPropellerSound();
    recordRocketRound(false, "out of fuel");
    showRocketResult("Game Over: Out Of Fuel", `Score ${formatScore(rocketState.score)}. Upgrade fuel capacity or choose a shorter flight setup.`, "setup");
    return;
  }
  if (rocketState.time <= 0) {
    rocketState.active = false;
    rocketState.score = Math.max(0, rocketState.score - 850);
    els.rocketMessage.textContent = "Timer expired. Flight ended.";
    rocketFeedback("Timer expired", "#ff3d5a", "error");
    stopPropellerSound();
    recordRocketRound(false, "timer expired");
    showRocketResult("Game Over: Timer Expired", `Score ${formatScore(rocketState.score)}. Choose a new setup or reduce the route count.`, "setup");
    return;
  }
  let wrapped = false;
  if (rocketState.ship.x < 0) { rocketState.ship.x = rocketState.mapW; wrapped = true; }
  if (rocketState.ship.x > rocketState.mapW) { rocketState.ship.x = 0; wrapped = true; }
  if (rocketState.ship.y < 0) { rocketState.ship.y = rocketState.mapH; wrapped = true; }
  if (rocketState.ship.y > rocketState.mapH) { rocketState.ship.y = 0; wrapped = true; }
  if (wrapped) {
    rocketState.trail = [];
    rocketState.routeTrail.push({ x: rocketState.ship.x, y: rocketState.ship.y, angle: rocketState.ship.angle, wrap: true });
    rocketFeedback("Wrapped world edge", "#22d9f2", "info");
    els.rocketMessage.textContent = "World edge crossed. You continued from the opposite side.";
  }
  if (updateRocketObjectiveFlyThrough()) return;
  const sideDist = Math.hypot(rocketState.ship.x - rocketState.sideQuest.x, rocketState.ship.y - rocketState.sideQuest.y);
  if (!rocketState.sideQuest.done && sideDist < 80 && rocketState.phase === "cruise") {
    rocketState.sideQuest.done = true;
    rocketState.techPoints += rocketState.sideQuest.reward;
    rocketState.score += 900 + rocketState.sideQuest.reward * 250;
    els.rocketMessage.textContent = `Capital side quest complete: ${rocketState.sideQuest.capital}. +${rocketState.sideQuest.reward} tech points.`;
    rocketFeedback(`Capital found +${rocketState.sideQuest.reward} TP`, "#ffd33d", "success");
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
  const researchEarned = landing.perfect ? 5 : landing.good ? 3 : 1;
  rocketState.techPoints += researchEarned;
  rocketState.landingLogs.push({ ...landing, success: true });
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
  rocketState.scoreEvents.push({
    round: rocketState.round,
    type: "Target landing",
    points: landingPoints,
    detail: `${formatScore(Math.round(1040 - dist * 3.6))} distance + ${formatScore(speedBonus)} speed + ${formatScore(altitudeBonus)} altitude + ${formatScore(descentBonus)} descent`
  });
  els.rocketMessage.textContent = `Target completed in ${rocketState.target.name}. Entry ${approachSpeed.toFixed(0)} m/s, ${approachAltitude.toFixed(0)} m, dropped ${descentDrop.toFixed(0)} m in ${descentTime.toFixed(1)}s. +${landingPoints} pts.`;
  showRocketMissionPopup({
    title: `${rocketState.target.name} Mission Success`,
    kind: "target",
    points: landingPoints,
    speed: approachSpeed,
    altitude: approachAltitude,
    descentDrop,
    descentBonus,
    dist
  });
  rocketFeedback("Country reached", "#45f875", "success");
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
  els.rocketMessage.textContent = "Depot refuel: enter the green circle, then the next 1 second records how much altitude you drop.";
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

function getRocketControlVector(rect) {
  const center = { x: rect.width / 2, y: rect.height / 2 };
  const rawDx = rocketState.mouse.x - center.x;
  const rawDy = rocketState.mouse.y - center.y;
  const distance = Math.hypot(rawDx, rawDy);
  const inZone = Boolean(rocketState.mouse.inside) && distance < 230;
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
  return { dx: rawDx, dy: rawDy, manual: true, inZone, distance };
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
  drawRocketAtmosphere(ctx, rect);
  drawRocketTrail(ctx, camX, camY);
  drawRocketDistanceLines(ctx, rect, camX, camY);
  drawRocketDepots(ctx, camX, camY);
  drawRocketSideQuest(ctx, camX, camY);
  drawRocketRunway(ctx, camX, camY);
  drawRocketControlZone(ctx, rect.width / 2, rect.height / 2);
  drawRocketShip(ctx, rect.width / 2, rect.height / 2, rocketState.ship.angle);
  drawRocketPointerTrace(ctx, rect);
  drawRocketDashboard(ctx, rect);
  drawRocketMiniMap(ctx, rect);
  drawRocketTimerBanner(ctx, rect);
  drawRocketScanBanner(ctx, rect);
  drawRocketLandingPanel(ctx, rect);
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
  ctx.fillStyle = "#071827";
  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.save();
  ctx.translate(-camX, -camY);
  const sea = ctx.createLinearGradient(0, 0, rocketState.mapW, rocketState.mapH);
  sea.addColorStop(0, "#0a243a");
  sea.addColorStop(0.45, "#0d3b4a");
  sea.addColorStop(1, "#092132");
  ctx.fillStyle = sea;
  ctx.fillRect(0, 0, rocketState.mapW, rocketState.mapH);

  for (let lon = -180; lon <= 180; lon += 15) {
    const { x } = worldPoint(lon, 0, rocketState.mapW, rocketState.mapH);
    ctx.strokeStyle = lon % 45 === 0 ? "rgba(134,213,255,.16)" : "rgba(134,213,255,.07)";
    ctx.lineWidth = lon % 45 === 0 ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, rocketState.mapH);
    ctx.stroke();
  }
  for (let lat = -75; lat <= 75; lat += 15) {
    const { y } = worldPoint(0, lat, rocketState.mapW, rocketState.mapH);
    ctx.strokeStyle = lat % 45 === 0 ? "rgba(134,213,255,.16)" : "rgba(134,213,255,.07)";
    ctx.lineWidth = lat % 45 === 0 ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(rocketState.mapW, y);
    ctx.stroke();
  }

  if (rocketWorldFeatures) {
    rocketWorldFeatures.forEach((country) => {
      const visible = country.bounds.maxX > camX - 160 && country.bounds.minX < camX + rect.width + 160 && country.bounds.maxY > camY - 160 && country.bounds.minY < camY + rect.height + 160;
      if (!visible) return;

      ctx.beginPath();
      country.rings.forEach((ring) => {
        ring.forEach((point, index) => {
          if (index === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
      });
      ctx.fillStyle = country.color;
      ctx.fill("evenodd");
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(4,18,22,.72)";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.strokeStyle = "rgba(235,255,221,.8)";
      ctx.lineWidth = 1.35;
      ctx.stroke();

    });
  } else {
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
      ctx.fillStyle = country.color;
      ctx.fill();
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(4,18,22,.68)";
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.strokeStyle = "rgba(232,255,217,.76)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

    });
  }

  ctx.strokeStyle = "rgba(255,255,255,.28)";
  ctx.lineWidth = 8;
  ctx.strokeRect(0, 0, rocketState.mapW, rocketState.mapH);

  const reveal = ctx.createRadialGradient(rocketState.ship.x, rocketState.ship.y, 120, rocketState.ship.x, rocketState.ship.y, 1000);
  reveal.addColorStop(0, "rgba(255,255,255,.18)");
  reveal.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = reveal;
  ctx.fillRect(rocketState.ship.x - 1000, rocketState.ship.y - 1000, 2000, 2000);
  ctx.restore();
}

function drawRocketAtmosphere(ctx, rect) {
  if (!rocketState) return;
  const altitude = rocketState.ship.altitude || 0;
  const skyAlpha = Math.min(0.46, Math.max(0, (altitude - 250) / 2600));
  const cloudAlpha = Math.max(0, 1 - Math.abs(altitude - 700) / 900) * 0.22;
  ctx.save();
  if (skyAlpha > 0.01) {
    const sky = ctx.createLinearGradient(0, 0, 0, rect.height);
    sky.addColorStop(0, `rgba(5, 9, 32, ${skyAlpha})`);
    sky.addColorStop(0.45, `rgba(58, 140, 255, ${skyAlpha * 0.38})`);
    sky.addColorStop(1, `rgba(179, 92, 255, ${skyAlpha * 0.16})`);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, rect.width, rect.height);
  }
  if (altitude > 1150) {
    const starAlpha = Math.min(0.75, (altitude - 1150) / 1600);
    ctx.fillStyle = `rgba(255,255,255,${starAlpha})`;
    for (let i = 0; i < 58; i += 1) {
      const x = (i * 139 + Math.floor(rocketState.ship.x * 0.03)) % rect.width;
      const y = (i * 83 + Math.floor(rocketState.ship.y * 0.02)) % Math.max(1, rect.height * 0.62);
      ctx.beginPath();
      ctx.arc(x, y, i % 7 === 0 ? 1.7 : 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (cloudAlpha > 0.01) {
    ctx.fillStyle = `rgba(245, 252, 255, ${cloudAlpha})`;
    for (let i = 0; i < 9; i += 1) {
      const x = ((i * 311 - rocketState.ship.x * 0.08) % (rect.width + 360)) - 180;
      const y = 80 + ((i * 97 - rocketState.ship.y * 0.05) % Math.max(1, rect.height - 160));
      ctx.beginPath();
      ctx.ellipse(x, y, 170, 42, i * 0.2, 0, Math.PI * 2);
      ctx.ellipse(x + 95, y + 16, 130, 32, -0.1, 0, Math.PI * 2);
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
    ["CLOUDS", 700, "#ffffff"],
    ["HIGH SKY", 1600, "#3a8cff"],
    ["STARRY", 2600, "#b35cff"]
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
  const markerY = y + 160 - Math.min(1, altitude / 3200) * 160;
  ctx.fillStyle = "#ffd33d";
  ctx.beginPath();
  ctx.arc(x + 34, markerY, 6, 0, Math.PI * 2);
  ctx.fill();
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
  const depot = nearestRocketDepot();
  const depotObjective = depot ? {
    key: `depot-${depot.name}`,
    label: "DEPOT",
    point: depot,
    distance: depot.distance
  } : null;
  if (depotObjective && (!target || depotObjective.distance < target.distance || depotObjective.distance < 700)) return depotObjective;
  return target || depotObjective;
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
    delta: objective.distance - previous
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
  const mx = rocketState.mouse.x;
  const my = rocketState.mouse.y;
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
    const text = `${trend.label} ${km.toLocaleString()} km ${closing ? "" : "+"}${deltaKm.toLocaleString()} km`;
    const tx = Math.min(rect.width - 210, Math.max(14, mx + 14));
    const ty = Math.min(rect.height - 40, Math.max(42, my - 16));
    ctx.fillStyle = "rgba(3, 8, 14, .82)";
    roundRect(ctx, tx - 8, ty - 20, 202, 32, 9);
    ctx.fill();
    ctx.fillStyle = closing ? "#45f875" : "#ff3d5a";
    ctx.font = "950 12px system-ui";
    ctx.fillText(text, tx, ty);
  }
  ctx.restore();
}

function drawRocketDepots(ctx, camX, camY) {
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
  drawGauge(ctx, x + 146, y + 50, "ALT", rocketState.ship.altitude, 3200, "#b35cff", `${rocketState.ship.altitude.toFixed(0)} m`);
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
  if (!scan) return;
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
  ctx.fillText("DESTINATION SCAN", x, y + 18);
  ctx.fillStyle = "#ffffff";
  ctx.font = "1000 22px system-ui";
  ctx.fillText(`${scan.km.toLocaleString()} km | ${scan.seconds.toFixed(1)}s`, x, y + 42);
  ctx.restore();
}

function drawRocketLandingPanel(ctx, rect) {
  if (!rocketState || rocketState.phase === "setup" || rocketState.phase === "briefing") return;
  const depotStatus = getRocketLandingStatus();
  const depotClose = depotStatus && depotStatus.depot.distance < 520;
  if (!depotClose) return;
  const speed = depotStatus.speed;
  const altitude = depotStatus.altitude;
  const displaySpeed = speed;
  const displayAltitude = altitude;
  const title = "FUEL DEPOT CHECKPOINT";
  const km = Math.round(depotStatus.depot.distance * 4.9);
  const depotZone = rocketState.objectiveZone?.type === "depot" ? rocketState.objectiveZone : null;
  const depotLanding = evaluateRocketLanding(
    depotStatus.depot,
    depotStatus.depot.distance,
    depotZone?.entrySpeed ?? speed,
    depotZone?.entryAltitude ?? altitude,
    depotStatus.alignDeg,
    depotZone ? Math.max(0.1, depotZone.entryTime - rocketState.time) : 0,
    depotZone ? Math.max(0, depotZone.entryAltitude - altitude) : 0
  );
  const points = depotLanding.points;
  const research = depotLanding.perfect ? 5 : depotLanding.groundSpeed ? 3 : 2;
  const reason = depotStatus.status === "success" ? `Sampling descent, refuel +${research} research TP` : depotStatus.subtext;
  const w = Math.min(620, rect.width - 36);
  const x = rect.width / 2 - w / 2;
  const y = 90;
  ctx.save();
  ctx.fillStyle = "rgba(3,9,15,.84)";
  ctx.strokeStyle = "rgba(151,176,210,.32)";
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, w, 104, 16);
  ctx.fill();
  ctx.stroke();
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = "950 17px system-ui";
  ctx.fillText(title, x + 18, y + 28);
  const columns = [
    ["ENTRY SPD", `${displaySpeed.toFixed(0)} m/s`, "#d9e6f3"],
    ["ENTRY ALT", `${displayAltitude.toFixed(0)} m`, "#d9e6f3"],
    ["DIST", `${km} km`, "#d9e6f3"],
    ["EARN", `+${points} / +${research}TP`, "#ffd33d"]
  ];
  columns.forEach((item, index) => drawHudChip(ctx, x + 18 + index * 98, y + 42, item[0], item[1], item[2]));
  ctx.fillStyle = "#c7d3e0";
  ctx.font = "900 13px system-ui";
  ctx.fillText(reason, x + 18, y + 91);
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
  ctx.fillStyle = "rgba(3,9,15,.72)";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "rgba(255,255,255,.2)";
  ctx.strokeRect(x, y, w, h);
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
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
        const px = x + point.x / rocketState.mapW * w;
        const py = y + point.y / rocketState.mapH * h;
        if (index === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
    });
    ctx.fill("evenodd");
    ctx.stroke();
  });
  rocketState.depots.forEach((depot) => {
    if (depot.used) return;
    const px = x + depot.x / rocketState.mapW * w;
    const py = y + depot.y / rocketState.mapH * h;
    ctx.fillStyle = "rgba(34,217,242,.95)";
    ctx.strokeStyle = "rgba(255,255,255,.8)";
    ctx.lineWidth = 1;
    ctx.fillRect(px - 4, py - 4, 8, 8);
    ctx.strokeRect(px - 4, py - 4, 8, 8);
  });
  if (rocketState.sideQuest && !rocketState.sideQuest.done) {
    ctx.fillStyle = "#ffe66d";
    ctx.beginPath();
    ctx.arc(x + rocketState.sideQuest.x / rocketState.mapW * w, y + rocketState.sideQuest.y / rocketState.mapH * h, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#45f875";
  ctx.beginPath(); ctx.arc(x + rocketState.ship.x / rocketState.mapW * w, y + rocketState.ship.y / rocketState.mapH * h, 4, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function renderRocketHud() {
  if (!rocketState) return;
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
  updateRocketTechLabels();
}

function updateRocketTechLabels() {
  if (!rocketState) return;
  ["fuel", "speed", "turn"].forEach((kind) => {
    const label = els[`${kind}TechLabel`];
    const level = rocketState.tech[kind];
    const cost = 2 + level * 2;
    const node = document.querySelector(`[data-tech="${kind}"]`);
    const levels = document.querySelector(`[data-levels="${kind}"]`);
    if (label) {
      label.textContent = level >= rocketTechMax ? `Lv ${level}/${rocketTechMax} - MAX` : `Lv ${level}/${rocketTechMax} - Next ${cost} TP`;
    }
    if (node) {
      node.classList.toggle("ready", level < rocketTechMax && rocketState.techPoints >= cost);
      node.classList.toggle("maxed", level >= rocketTechMax);
    }
    if (levels) {
      levels.replaceChildren(...Array.from({ length: rocketTechMax }, (_, index) => {
        const dot = document.createElement("i");
        dot.textContent = index + 1;
        dot.dataset.title = rocketTechSteps[kind][index][0];
        dot.dataset.effect = rocketTechSteps[kind][index][1];
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
  renderRankLists();
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
  if (rocketState.phase === "result") return;
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

function renderRocketResultDetails() {
  if (!els.rocketResultDetails || !rocketState) return;
  const logs = rocketState.roundLogs || [];
  if (!logs.length) {
    els.rocketResultDetails.textContent = "No route trace was recorded for this run.";
    return;
  }
  els.rocketResultDetails.replaceChildren(...logs.map((log) => {
    const row = document.createElement("article");
    const status = log.success ? "reached" : "missed";
    const landingText = log.landings.length
      ? log.landings.map((landing) => `${landing.success ? "refueled" : "penalty"} ${landing.depot}: ${landing.km} km, ${landing.speed.toFixed(0)} m/s, ${landing.altitude.toFixed(0)} m`).join(" | ")
      : "no fuel depot checkpoint";
    const scoreText = (log.scoreEvents || []).length
      ? log.scoreEvents.map((event) => `${event.type}: +${formatScore(event.points)} (${event.detail})`).join(" | ")
      : "no score events recorded";
    row.className = `rocket-result-row ${status}`;
    row.innerHTML = `
      <strong>Round ${log.round}: ${log.flag ? `<img src="${log.flag}" alt="">` : ""}${log.target}</strong>
      <span>${status.toUpperCase()} - ${log.reason} - ${Math.max(0, log.time).toFixed(1)}s left - fuel ${log.fuel.toFixed(0)}%</span>
      <small>${scoreText}</small>
      <small>${landingText}</small>
    `;
    return row;
  }));
}

function drawRocketResultMap() {
  const canvas = els.rocketResultMap;
  if (!canvas || !rocketState) return;
  const inspector = canvas.closest("[data-rocket-route-inspector]");
  if (inspector) {
    setupRocketRouteInspector(inspector, {
      logs: rocketState.roundLogs || [],
      mapW: rocketState.mapW,
      mapH: rocketState.mapH
    });
  } else {
    drawRocketLogMap(canvas, rocketState.roundLogs || [], rocketState.mapW, rocketState.mapH);
  }
}

function setupRocketRouteInspector(root, run) {
  const canvas = root.querySelector("[data-rocket-session-map], #rocketResultMap");
  const toolbar = root.querySelector("[data-rocket-route-buttons]");
  const meta = root.querySelector("[data-rocket-route-meta]");
  const logs = run.logs || [];
  const mapW = run.mapW || 8200;
  const mapH = run.mapH || 4200;
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
  const level = rocketState.tech[kind];
  if (level >= rocketTechMax) {
    const text = `${rocketTechInfo[kind].title} is already maxed at level ${rocketTechMax}.`;
    els.rocketMessage.textContent = text;
    if (els.techTreeStatus) els.techTreeStatus.textContent = text;
    rocketFeedback("Upgrade maxed", "#ffd33d", "info");
    return;
  }
  const cost = 2 + level * 2;
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
  rocketState.tech[kind] += 1;
  if (kind === "fuel") rocketState.fuel = Math.min(100, rocketState.fuel + 12);
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
  void els.techTreeOverlay.offsetWidth;
  els.techTreeOverlay.classList.add(kind);
  window.setTimeout(() => els.techTreeOverlay.classList.remove(kind), 560);
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

function trackAvatarPointer(event) {
  const rect = els.avatarScene.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  avatarLook.tx = Math.max(-1, Math.min(1, x));
  avatarLook.ty = Math.max(-1, Math.min(1, y));
  els.rpgAvatar.style.setProperty("--look-x", avatarLook.tx.toFixed(2));
  els.rpgAvatar.style.setProperty("--look-y", avatarLook.ty.toFixed(2));
}

function resetAvatarPointer() {
  avatarLook.tx = 0;
  avatarLook.ty = 0;
  els.rpgAvatar.style.setProperty("--look-x", "0");
  els.rpgAvatar.style.setProperty("--look-y", "0");
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
  button.addEventListener("click", () => prepareRocketBriefing(Number(button.dataset.rocketRounds)));
});

document.querySelectorAll("[data-flag-rounds]").forEach((button) => {
  button.addEventListener("click", () => startRun(Number(button.dataset.flagRounds)));
});

document.querySelector("#playAgain").addEventListener("click", showFlagSetup);
initRocketAudioControls();
loadUploadedAudioTracks();
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
async function handleCustomAudioUpload(input) {
  if (!input?.files?.length) return;
  try {
    await saveUploadedAudioFiles(input.files);
    if (els.rocketRadioSelect?.value) toggleRocketRadio();
  } catch {
    if (els.rocketMessage) els.rocketMessage.textContent = "Audio upload could not be saved. Try fewer tracks or smaller files.";
  } finally {
    input.value = "";
  }
}

els.customAudioInput?.addEventListener("change", () => handleCustomAudioUpload(els.customAudioInput));
els.customAudioFolderInput?.addEventListener("change", () => handleCustomAudioUpload(els.customAudioFolderInput));
els.rocketStart.addEventListener("click", () => {
  if (rocketState?.phase === "briefing" && !rocketState.active) {
    beginRocketTakeoff();
    return;
  }
  startRocketRun();
});
els.rocketResultRestart.addEventListener("click", () => {
  if (rocketState?.resultAction === "setup") {
    startRocketRun();
    return;
  }
  startRocketRun();
});
els.rocketTutorialNext?.addEventListener("click", continueRocketTutorial);
els.techTreeClose.addEventListener("click", closeRocketPause);
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
els.rocketCanvas.addEventListener("pointermove", (event) => {
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
els.rocketCanvas.addEventListener("pointerleave", () => {
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
els.rocketCanvas.addEventListener("click", (event) => {
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
document.querySelector("#authOpen").addEventListener("click", () => els.authDialog.showModal());
document.querySelector("#profileOpen").addEventListener("click", () => {
  renderProfile();
  showView("profile");
});
document.querySelector("#saveName").addEventListener("click", () => {
  const clean = els.displayNameInput.value.trim().replace(/[^a-z0-9 _-]/gi, "").slice(0, 18);
  profile.displayName = clean || "Guest";
  profile.characterCreated = true;
  saveProfile();
  renderProfile();
});
document.querySelector("#guestName").addEventListener("click", () => {
  profile.displayName = "Guest";
  saveProfile();
  renderProfile();
});
document.querySelector("#saveProfileButton").addEventListener("click", saveCharacterFromControls);
document.querySelector("#randomProfileButton").addEventListener("click", randomizeCharacter);
[els.classSelect, els.armorSelect, els.weaponSelect, els.outfitSelect, els.headgearSelect, els.accessorySelect, els.poseSelect, els.heightInput].forEach((control) => {
  control.addEventListener("change", () => {
    profile.character = collectCharacterFromControls();
    els.heightValue.textContent = `${Number(els.heightInput.value).toFixed(2)} m`;
    applyCharacterPreview();
  });
});
[
  els.skinColorInput, els.eyeColorInput, els.hairColorInput, els.shirtColorInput, els.jacketColorInput, els.nailColorInput,
  els.armsInput, els.legsInput, els.feetInput, els.hipsInput, els.torsoInput, els.neckInput, els.earsInput, els.mouthInput
].forEach((control) => {
  control.addEventListener("input", () => {
    profile.character = collectCharacterFromControls();
    syncAdvancedControls(profile.character);
    applyCharacterPreview();
  });
});
els.heightInput.addEventListener("input", () => {
  profile.character = collectCharacterFromControls();
  els.heightValue.textContent = `${Number(els.heightInput.value).toFixed(2)} m`;
  applyCharacterPreview();
});
window.addEventListener("resize", resizeFireworksCanvas);
window.addEventListener("resize", resizeRocketCanvas);
els.avatarScene.addEventListener("pointermove", trackAvatarPointer);
els.avatarScene.addEventListener("pointerleave", resetAvatarPointer);

renderProfile();
renderTables();
loadOfficialFlyLeaderboard();
loadRocketCatalog();
loadRocketWorldMap();
if (!avatarAnimation) avatarAnimation = requestAnimationFrame(animateAvatar);
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
