const saveToLocal = (key, itemsToSet) => localStorage.setItem(key, JSON.stringify(itemsToSet));
// für saveToLocal muss Array in String verwandelt werden mit JSON.stringify

function loadFromLocal(key) {
try { // try = versuche Array aus localStorage zu laden
    return JSON.parse(localStorage.getItem(key)); // JSON.parse notwendig um String wieder in Array zu verwandeln
} catch(error) { // wenn try nicht funktioniert, dann fange Fehler auf und gebe diese in der Console aus
    console.error(error.message);
    }
}

// wenn 2 Funktionen exportiert werden sollen:
export {saveToLocal, loadFromLocal};