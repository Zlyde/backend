# Backend - VTEAM ZOOMIES

Detta är backend-repot för vårat elsparkcykelsystem som innehåller vårat utvecklade REST-API. 
Byggd med Node.js och express-routes.

Systemet är en del av ett större system som hanteras via ett centralt repo, vteam. I vteam repot finns instruktioner för att sätta upp hela systemet, inklusive detta repo, två frontend-repon (webb-applikation och mobil-applikation), simulator och databas.

Översikt av de viktgaste filerna och mapparna:
```bash
api/src/
├── config/      # Databasanslutning & versionshantering
├── data/        # Hämta data från databasen
├── middleweare/ # Kontroll av autentisering
├── models/      # Visa databasscheman
├── routes/   # Ta emot HTTP-förfrågningar->tjänstlagret
├── services/    # Service layer med funktioner
├── tests        # Enhetstester
├── api_dokumentation.md # Dokumentation om REST-API:et
├── app.js       # starta & konfig. express-applikation
├── passport.js  # hantera github autentisering
├── socket.js    # Socket.io
├── Dockerfile   # konfigureringsfil för docker-compose
├── index.js     # Anslutning till databas och starta
```

## Viktiga punkter
- Repot fokuserar på backend-delen och hanteras med Docker som en del av systemet.
- För att systemet ska fungera korrekt behöver repon klonas i en specifik ordning.
- Testning sker med npm-skript:
```bash
npm test
```
## Installation och körning
Då detta är en del av ett större system så behöver vi göra enligt följande:
- Klona i rätt ordning för att säkerställa att alla tjänster startas korrekt med:
```bash
docker-compose up --build
```
- Lokal utveckling:
Du kan även köra projektet lokalt för utveckling:
```bash
git clone https://github.com/Zlyde/backend.git
cd backend
npm install
npm devStart-api
```
Detta kommer starta applikationen på http://localhost:5001
