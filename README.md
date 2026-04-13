# api-hovedprosjekt

Dette prosjektet er en enkel **notatapplikasjon med frontend og backend**.  
Du kan legge til notater, som lagres i en JSON-fil på serveren.  

Jeg har hatt mye problemer med dette prosjektet, men jeg har funnet en vei gjennom alt.  


## Hvorfor Node.js

Før jeg SSH-et inn på serveren, lastet jeg ned Node.js.  
Dette er nødvendig fordi jeg må kjøre JavaScript **utenfor nettleseren**, for å kommunisere med serveren og lagre data. 

## Beskrivelse av løsningen

Backend (serveren)
Jobber med å hente og legge til notater (/notes)
Lagrer all data inn i data.json på serveren. Da beholdes all data selv om serveren lukkes og startet opp igjen. 
Frontend:
Index.html
Style.css
script.js

Disse lar brukeren skrive notater og sender det til backend som lagrer de. 
Alle disse er i en public mappe (Funket ikke å kjøre før jeg lagde public mappe)

## Hvordan kjøre prosjektet

node server.js i mappen på serveren

Når jeg kjører filen åpner den index.html på grunn av denne linjen i koden min

app.use(express.static("public"))

Jeg bruker også denne linjen i server.js

app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on port 3000")
})
Dette er fordi den da kjører på en ip adresse i nettleseren

## api eksempler 
GET /notes (viser hvordan du kaller på at serveren skal sende tilbake data)

POST /notes
Content-Type: application/json

{
  "text": "Dette er et nytt notat"
} 

Eksempel på hvordan du sender api data til serveren



## SSH og kloning

Jeg startet med å SSH inn på serveren.  
Etterpå måtte jeg klone repoet, noe som tok litt tid på grunn av flere problemer:  

 Feil navn og mapper.  
 Oslo-skolen nettverk skapte problemer.  
 Jeg klonet inne i en allerede klonet mappe.  
 Jeg hadde to API-nøkler, laget for feil maskin.  

Når jeg fikk riktig API-nøkkel på serveren, lagde jeg filene i Visual Studio Code:  

 `script.js` – frontend-logikk  
 `data.json` – lagring av notater  
 `index.html` – frontend  
 `style.css` – styling  
 `server.js` – backend som kjøres med `node server.js`  

For å klone prosjektet brukte jeg:

```bash
git clone <repo-url>
cd api-hovedprosjekt
npm install
```


13/4.2026:
Jeg kom meg ikke til skolen denne dagen på grunn av feil i trafikken. Fikk derfor ikke til "pull" på serveren angående TODO listen min. Kan gjøre dette når vi har neste time etter fristen. 

Jeg fikk ikke til hvorfor TODO min ikke fungerte. 

