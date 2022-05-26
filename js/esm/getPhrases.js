export default function getPhrases(pathFromRoot, lang = "en") {
  const endpoint = `../../${pathFromRoot}/${lang}.json`;

  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      const phrases = data.phrases.map((item) => {
        const hasChanges = item.hasOwnProperty("changes") ? true : false;
        let content = item.translated.trim();

        if ((hasChanges) && Array.isArray(item.changes)) {
          item.changes.forEach((change) => {
            if (change.bold) content = content.replaceAll(change.translated, `<strong>${change.translated}</strong>`);
            if (change.italic) content = content.replaceAll(change.translated, `<em>${change.translated}</em>`);
            if (change.underline) content = content.replaceAll(change.translated, `<u>${change.translated}</u>`);
          });
        }

        const phrase = {
          id: item.id,
          phrase: content
        };

        return phrase;
      });

      phrases.forEach(item => {
        document.querySelectorAll(`[data-i18n='${item.id}']`).forEach((el) => {
          const phraseExists = item.phrase.trim().length ? true : false;
          if (phraseExists) {
            el.innerText = item.phrase;
          }
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });
}