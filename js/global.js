const defaultLang = "en";

const supportedLangs = [
  {
    iso: "en",
    name: {
      native: "English",
      english: "English"
    }
  }
];

var pagePhrases = [];

function isLangSupported(iso) {
  if (typeof iso !== "string") return false;
  if (iso.trim().length < 2) return false;

  const iso2 = iso.toLowerCase().substring(0, 2);
  let langFound = false;

  for (let i = 0; i < supportedLangs.length; i++) {
    const lang = supportedLangs[i];
    if (lang.iso === iso2) {
      langFound = true;
      break;
    }
  }

  return langFound;
}

function getLang() {
  const storedLang = localStorage.getItem("lang") || defaultLang;
  let lang = storedLang;

  if (!storedLang.length) {
    lang = defaultLang;
    for (let i = 0; i < navigator.languages.length; i++) {
      const detectedLang = navigator.languages[i].substring(0, 2).toLowerCase();
      const detectedLangIsSupported = isLangSupported(detectedLang) || false;

      if (detectedLangIsSupported) {
        lang = detectedLang;
        break;
      }
    }
  } else if (!supportedLangs.includes(lang)) {
    lang = defaultLang;
  }

  return lang;
}

function getPhrase(phraseid) {
  for (let i = 0; i < pagePhrases.length; i++) {
    if (pagePhrases[i].id == phraseid) {
      const phraseText = pagePhrases[i].phrase;
      return phraseText;
    }
  }
}