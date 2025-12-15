# 1 Sette opp mongoDb:
gå til https://www.mongodb.com/ og trykk på get started for å lage en bruker

under oppstart vil du bli promtet til å lage en cluster da for å starte kan du velge
free tier for å teste programmet, kan hende for komersiell bruk at et betalt nivå er
nødvendig. Navngi clusteren noe som er relevant til programmet (DashboardData burkes i eksempelet)
og trykk på create deployment.

Tyrkk på create user og så choose connection method og velg drivers

kopier den connection stringen som blir gitt og ta vare på den men ikke push den til git
eller andre steder hvor fremmede får tak i den og trykk done


# 2 Gjøre klar server:
gå in i server mappen i prosjektet og lage en fil som heter .env
i env filen putter du:
MONGODB_URL= connection string fra mongodb

hvis du vil endre navnet på db kan du gjøre det i starten av server.ts filen
med å endre på const databaseName = "Dashboard_Data"

og for å endre på navnet på samlingene endre på toppen av databaseApi.ts
const riskdata = "riskdata";
const complianceData = "complianceData";


# 3 Starte programmet:

1. instaler NodeJs hvis det ikke er instalert https://nodejs.org/en/download (for å teste i console ```npm -v```)
2. i console: ```npm install```
3. i console:  ```npm run dev```
4. gå til http://localhost:5173/
5. Inne på siden trykk på SjekkListe
6. inne på SjekkListe trykk på Importer JSON og importer den tildelte filen for å fylle inn i db

