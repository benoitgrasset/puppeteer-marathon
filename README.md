## description

Extraction et visualisation de la répartition des chronos sur le marathon de Paris 2022 à partir de [ce site](https://resultscui.active.com/events/SchneiderElectricMarathondeParis2022).

## lancer le projet

```sh
    node index
```

Trois méthodes sont utilisées:

- scrapping du site avec **Puppeteer**, en simulant N fois le clic sur le bouton "Charger plus" et en récupérant les données affichées sur la page
- requêtes chainées avec **axios**, on fait N requêtes au serveru pour récupérer les résultats de 100 en 100
- collection **Postman** avec l'offset en variable, on utilise aussi une boucle dans le pre-script pour avoir un offset différent à chaque requête

Les résultats sont exportés dans un fichier CSV (séparation avec des virgules): [data.csv](/data.csv).

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
- Promess => ne pas oublier de retourner quelquechose !
- await axios.get(url).then(res => res.data)
- convertir le résultat pour l'avoir au bon format horaire (certains n'ont qu'un chiffre si < 10, et d'autres n'ont pas de minutes ex PT3H12S)
- récupérer le selecteur du bouton "Charger plus", il n'a pas de classe ou d'id particulier
- au bout de plusieurs dizaines de requêtes le DOM devient beaucoup trop lourd et il devient impossible de continuer, seule une approche "back" est possible ici, cad une extraction avec Postman ou axios via NodeJS

## extraction des données

browser addon [UI Vision RPA](https://chrome.google.com/webstore/detail/uivision-rpa/gcbalfbdmfieckjlnblleoemohcganoc)

scrapping JS (jsdom, Cheerio, Puppeteer)

axios.get(), récupérer les requêtes serveur. Par défaut l'offset est de 50, on peut le monter à 100 max

Choix: **Puppeteer** car execute du JS contrairement à Cheerio qui est statique

## affichage des données

Les données sont affichées grâce au logiciel **Power BI** de Microsoft, pas de post traitment particulier, Power BI seul fait le job

Autres outils: [RawGraphs io](https://rawgraphs.io/), grafana, d3, GraphViz, ChartJS

## résultat

![Capture](https://user-images.githubusercontent.com/32497923/162720041-85377538-e491-49bf-87b7-f9f282b3b8d6.PNG)
