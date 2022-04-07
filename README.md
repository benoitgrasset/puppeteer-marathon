## lancer le projet

```sh
    node index
```

## difficultés rencontrées

- avec une app front dans le browser en React: erreur requète CORS,
  (same origin policy, the browser is blocking requests to the server, both client and the server are running from different host and are hosted on different port) (port, host, scheme, domain = origin)
- affichage du classement de 50 en 50, y compris pour les requêtes, très fastidieux, nécessité d'automatiser
- le bouton "Charger plus" envoie une requête pour réupérer une liste de 50 personnes supplémentaire et ajoute cette liste à la liste des peronnes existante côté front sur la SPA

Pour palier à cela: collection POSTMAN avec des requêtes chainées

SPA: content isn't rendered until the JS is executed

- mettre un timer au chargement de la page
- pas de map() sur Element[]
- utiliser la fonction evaluate()

## extraction des données

browser addon UI Vision RPA [addon](https://chrome.google.com/webstore/detail/uivision-rpa/gcbalfbdmfieckjlnblleoemohcganoc)

scrapping JS (jsdom, Cheerio, Puppeteer)

choix: Puppeteer car execute du JS contrairement à Cheerio qui est statique

## affichage des données

grafana ?
d3 ? Chart.js ?
