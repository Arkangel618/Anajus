/* Código muy sexy y muy hot para que tu navegador Chrome llame a las anajús por su nombre */


window.onload = function() {
    
    setTimeout(function() {
        replaceText_alaskalabuena();
    },2000);

    setTimeout(function() {
      fetch("https://raw.githubusercontent.com/Arkangel618/Anajus/master/anajus.txt")
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n');
        const replacements = new Map();
        lines.forEach(line => {
          if (line.trim() === '' || line.trim().startsWith('>>')) {
            return; // Si la línea está vacía o comienza con ">>", omitir procesamiento
          }
          const parts = line.split('|');
          const searchValues = parts[0].split('/').map(s => s.trim());
          const replaceValues = parts[1].split('/').map(s => s.trim());
          alternateReplaceText(searchValues, replaceValues);
        });
      });
    },5000);

    setTimeout(function() {
      fetch("https://raw.githubusercontent.com/Arkangel618/Anajus/master/anajus.txt")
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n');
        const replacements = new Map();
        lines.forEach(line => {
          if (line.trim() === '' || line.trim().startsWith('>>')) {
            return; // Si la línea está vacía o comienza con ">>", omitir procesamiento
          }
          const parts = line.split('|');
          const searchValues = parts[0].split('/').map(s => s.trim());
          const replaceValues = parts[1].split('/').map(s => s.trim());
          alternateReplaceText(searchValues, replaceValues);
        });
      });
    },10000);

}





/* Funciones secundarias */

function replaceText_alaskalabuena() {
  const searchValue = "Alaska la Buena";
  const replaceValue = "Alaska la Buena";
  const allElements = document.querySelectorAll("body *");

    
  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\$&');
  }

  const escapedSearchValue = escapeRegExp(searchValue);

  let shouldReplace = false;

  // Busca si hay al menos una ocurrencia de "Alaska la Buena"
  allElements.forEach(element => {
    if (element.textContent.includes(searchValue)) {
      shouldReplace = true;
    }
  });

  // Reemplaza todas las ocurrencias de "Alaska la Mala" por "Alaska la Buena"
  if (shouldReplace) {
    allElements.forEach(element => {
      if (element.tagName !== "SCRIPT" && element.tagName !== "STYLE" && element.tagName !== "NOSCRIPT" && element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
        const escapedTextContent = escapeRegExp(element.textContent);
        element.textContent = escapedTextContent.replace(new RegExp(`\\bAlaska la Mala\\b`, 'gi'), replaceValue);
      }
    });
  }
}




function addInfoToResults(busquedas, info) {
  const searchRegex = new RegExp(busquedas.join("|"), "gi");
  const divResults = document.getElementById("search");
  const searchInput = document.querySelector("input[name='q']");

  if (divResults && searchInput && searchRegex.test(searchInput.value)) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("anajurenameinfo");
    newDiv.innerHTML = info;

    const firstChild = divResults.firstChild;
    divResults.insertBefore(newDiv, firstChild);
  }
}

// Añadir estilos

function addCustomCSS() {
  fetch(chrome.runtime.getURL('anajusstyle.txt'))
    .then(response => response.text())
    .then(css => {
      const styleEl = document.createElement('style');
      styleEl.textContent = css;
      document.body.appendChild(styleEl);
    })
    .catch(error => console.error(error));
}

// Llamar a la función para agregar el CSS
addCustomCSS();


fetch(chrome.runtime.getURL('anajuseastereggsfr.txt'))
  .then(response => response.text())
  .then(text => {
    const lines = text.split('\n');
    const replacements = new Map();
    lines.forEach(line => {
      if (line.trim() === '' || line.trim().startsWith('>>')) {
        return; // Si la línea está vacía o comienza con ">>", omitir procesamiento
      }
      const partes = line.split('|');
      const busquedas = partes[0].split('/').map(s => s.trim());
      const info = partes[1];
      addInfoToResults(busquedas, info);
    });
  });






/* Funciones principales */

function alternateReplaceText(searchValues, replaceValues) {
    
    // Obtener todos los elementos en el documento
    //const allElements = document.querySelectorAll("a, p, span, li, th, td, title, div");
    
    /*
    const allElements_agranel = document.querySelectorAll("a, p, span, li, th, td, title, div, h1, h2, h3, h4, h5, h6, b, strong, em, i, small, yt-formatted-string");

    const allElements = Array.from(allElements_agranel).filter(element => {
      return element.textContent.trim() !== "" && element.childElementCount === 0;
    });
    */
    
    const allElements_agranel = document.querySelectorAll("a, p, span, li, th, td, title, div, h1, h2, h3, h4, h5, h6, b, strong, em, i, small, yt-formatted-string");
    
    const allElements = Array.from(allElements_agranel).filter(element => {
      const childNodes = element.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === Node.TEXT_NODE && childNodes[i].textContent.trim() !== "") {
          return true;
        }
      }
      return false;
    });



    if(searchValues.length === 1 && replaceValues.length === 1) {
        
        // Recorrer cada elemento
        for (let i = 0; i < allElements.length; i++) {
            const element = allElements[i];

            // Verificar si el elemento tiene contenido
            if (element.innerHTML && element.innerHTML.trim().length > 0 && element) {

                //if (element.tagName.toLowerCase() === "div") {
                  const firstChild = element.childNodes[0];
                  if (firstChild && firstChild.nodeType != Node.TEXT_NODE) {
                    continue;
                  }
                //}

                // Reemplazar todas las coincidencias de searchValues[0] por replaceValues[0] en cadenas de texto entre etiquetas
                element.innerHTML = element.innerHTML.replace(new RegExp(searchValues[0], 'gi'), (match) => {
                    // Verificar si el match está dentro de un atributo de una etiqueta
                    const parent = match.parentNode;
                    if (parent && parent.nodeType === Node.ATTRIBUTE_NODE) {
                        // Si está dentro de un atributo de una etiqueta, no hacer nada
                        return match;
                    } else {
                        // Si no está dentro de un atributo de una etiqueta, hacer el reemplazo
                        return replaceValues[0];
                    }
                });
            }
        }
        
    } else if(searchValues.length > 1 && replaceValues.length === 1) { 
        
        // Recorrer cada elemento
        for (let i = 0; i < allElements.length; i++) {
            const element = allElements[i];

            // Verificar si el elemento tiene contenido
            if (element.innerHTML && element.innerHTML.trim().length > 0) {
                
                //if (element.tagName.toLowerCase() === "div") {
                  const firstChild = element.childNodes[0];
                  if (firstChild && firstChild.nodeType != Node.TEXT_NODE) {
                    continue;
                  }
                //}

                // Foreach de searchvalues y cada uno de ellos se reemplaza por el unico nombre de reemplazo
                searchValues.forEach( function(searchValue, indice, array) {
                    // Reemplazar todas las coincidencias de searchValue por replaceValues[0] en cadenas de texto entre etiquetas
                    element.innerHTML = element.innerHTML.replace(new RegExp(searchValue, 'gi'), (match) => {
                        // Verificar si el match está dentro de un atributo de una etiqueta
                        const parent = match.parentNode;
                        if (parent && parent.nodeType === Node.ATTRIBUTE_NODE) {
                            // Si está dentro de un atributo de una etiqueta, no hacer nada
                            return match;
                        } else {
                            // Si no está dentro de un atributo de una etiqueta, hacer el reemplazo
                            return replaceValues[0];
                        }
                    });
                });
                
            }
        }
        
    } else if(searchValues.length === 1 && replaceValues.length > 1) {
        
        // Recorrer cada elemento
        var countindex = -1;
        const numtotalitems = replaceValues.length;

        for (let i = 0; i < allElements.length; i++) {
            const element = allElements[i];

            // Verificar si el elemento tiene contenido
            if (element.innerHTML && element.innerHTML.trim().length > 0) {

                //if (element.tagName.toLowerCase() === "div") {
                  const firstChild = element.childNodes[0];
                  if (firstChild && firstChild.nodeType != Node.TEXT_NODE) {
                    continue;
                  }
                //}

                // Reemplazar todas las coincidencias de searchValues[0] por replaceValues[0] en cadenas de texto entre etiquetas
                element.innerHTML = element.innerHTML.replace(new RegExp(searchValues[0], 'gi'), (match) => {
                    // Verificar si el match está dentro de un atributo de una etiqueta
                    const parent = match.parentNode;
                    if (parent && parent.nodeType === Node.ATTRIBUTE_NODE) {
                        // Si está dentro de un atributo de una etiqueta, no hacer nada
                        return match;
                    } else {
                        // Si no está dentro de un atributo de una etiqueta, hacer el reemplazo

                        // Foreach de los valores de relacevalues[0]. Primero contamos los replacevalues,
                        // despues fabricamos un contador countindex que, al llegar al numero total de valores, se pondrá a 0
                        // ese número de contador será el número de index de replace values que imprimiremos

                        countindex ++;

                        if(countindex == numtotalitems) {
                          countindex = 0;
                        }

                        return replaceValues[countindex];
                        
                    }
                });
            }

        }

    } else {
        
        // Recorrer cada elemento
        var countindex_2 = -1;
        const numtotalitems_2 = replaceValues.length;

        for (let i = 0; i < allElements.length; i++) {
            const element = allElements[i];

            // Verificar si el elemento tiene contenido
            if (element.innerHTML && element.innerHTML.trim().length > 0) {
                
                //if (element.tagName.toLowerCase() === "div") {
                  const firstChild = element.childNodes[0];
                  if (firstChild && firstChild.nodeType != Node.TEXT_NODE) {
                    continue;
                  }
                //}

                // Foreach de searchvalues y cada uno de ellos se reemplaza por el unico nombre de reemplazo
                searchValues.forEach( function(searchValue, indice, array) {
                    // Reemplazar todas las coincidencias de searchValue por replaceValues[0] en cadenas de texto entre etiquetas
                    element.innerHTML = element.innerHTML.replace(new RegExp(searchValue, 'gi'), (match) => {
                        // Verificar si el match está dentro de un atributo de una etiqueta
                        const parent = match.parentNode;
                        if (parent && parent.nodeType === Node.ATTRIBUTE_NODE) {
                            // Si está dentro de un atributo de una etiqueta, no hacer nada
                            return match;
                        } else {

                            countindex_2 ++;

                            if(countindex_2 == numtotalitems_2) {
                              countindex_2 = 0;
                            }

                            return replaceValues[countindex_2];

                            // Si no está dentro de un atributo de una etiqueta, hacer el reemplazo
                            return replaceValues[0];
                        }
                    });
                });
                
            }
        }
        
    }
    
}


fetch('https://raw.githubusercontent.com/Arkangel618/Anajus/master/anajus.txt')
  .then(response => response.text())
  .then(text => {
    const lines = text.split('\n');
    const replacements = new Map();
    lines.forEach(line => {
      if (line.trim() === '' || line.trim().startsWith('>>')) {
        return; // Si la línea está vacía o comienza con ">>", omitir procesamiento
      }
      const parts = line.split('|');
      const searchValues = parts[0].split('/').map(s => s.trim());
      const replaceValues = parts[1].split('/').map(s => s.trim());
      alternateReplaceText(searchValues, replaceValues);
    });
  });


/*
fetch(chrome.runtime.getURL('anajus.txt'))
  .then(response => response.text())
  .then(text => {
    const lines = text.split('\n');
    const replacements = new Map();
    lines.forEach(line => {
      if (line.trim() === '' || line.trim().startsWith('>>')) {
        return; // Si la línea está vacía o comienza con ">>", omitir procesamiento
      }
      const parts = line.split('|');
      const searchValues = parts[0].split('/').map(s => s.trim());
      const replaceValues = parts[1].split('/').map(s => s.trim());
      alternateReplaceText(searchValues, replaceValues);
    });
  });
*/



/*

function loadAd() {
  const adContainer = document.createElement('div');
  adContainer.id = 'ad-container';
  document.body.appendChild(adContainer);

  const ad = document.createElement('ins');
  ad.className = 'adsbygoogle';
  ad.style.display = 'block';
  ad.style.textAlign = 'center';
  ad.style.marginTop = '10px';
  ad.style.marginBottom = '10px';
  ad.setAttribute('data-ad-client', 'ca-pub-8412328351922766');
  ad.setAttribute('data-ad-slot', '5934400066');
  ad.setAttribute('data-ad-format', 'auto');
  ad.setAttribute('data-full-width-responsive', 'true');
  adContainer.appendChild(ad);

  (adsbygoogle = window.adsbygoogle || []).push({});
}

loadAd();
*/