export default function getPhrases(pathArg, langArg) {
  const path = pathArg || window.location.pathname;
  const lang = langArg || getLang();
  const endpoint = `../..${path}/i18n/${lang}.json`;

  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const phrases = data.phrases.map((item) => {
          const hasChanges = item.hasOwnProperty("changes") ? true : false;
          let content = item.translated.trim();

          if ((hasChanges) && Array.isArray(item.changes)) {
            item.changes.forEach((change) => {
              const changeText = change.translated.trim();
              let changeHTML = changeText;
              if (!changeText.length) return;
              if (change.link.href && change.link.href.length) {
                const link = change.link;
                changeHTML = `<a href='${link.href}'`;
                if (link.rel && link.rel.length) {
                  changeHTML += ` rel='${link.rel}'`;
                } else if (link.href.startsWith("https://") || link.href.startsWith("http://")) {
                  changeHTML += ` rel='noopener noreferrer'`;
                }
                if (link.id && link.id.length) changeHTML += ` id='${link.id}'`;
                if (link.class && link.class.length) changeHTML += ` class='${link.class}'`;
                changeHTML += `>${changeText}</a>`;
              }
              if (change.underline) changeHTML = `<u>${changeHTML}</u>`;
              if (change.italic) changeHTML = `<em>${changeHTML}</em>`;
              if (change.bold) changeHTML = `<strong>${changeHTML}</strong>`;
              content = content.replaceAll(changeText, changeHTML);
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
              el.innerHTML = item.phrase;
            }
          });
        });

        return phrases;
      })
      .then((phrases) => {
        if (Array.isArray(phrases)) {
          resolve(phrases);
        } else {
          reject(new Error("error retrieving phrases"));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
}