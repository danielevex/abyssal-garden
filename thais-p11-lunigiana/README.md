# Thais in Lunigiana — P11 · Terra Viva

Prima conversione **terrestre completa sul motore WebGPU nativo originale di Abyssal Garden**. Non usa Three.js o altre librerie di rendering 3D. La P10 resta disponibile e invariata per confronto.

## Modifiche effettive

- **Terreno**: riscritta la funzione di densità volumetrica WGSL da fondale marino a una valle con versanti rocciosi, leggere ondulazioni e traccia centrale. Rimangono la Compute Pipeline, l'estrazione Surface Nets, il culling spaziale e la collisione sul terreno dell'engine originale.
- **Vegetazione**: rimossa la generazione delle alte colonne di kelp; introdotti castagneti con mesh tridimensionale di tronchi e rami, chiome formate da foglie instanziate e animate, felci, cespugli e prato.
- **Architettura**: case in pietra procedurali con finestre, stipiti, coppi e camini; ingresso medievale ad arco con conci radiali e muri a secco. Presente una via con ciottoli irregolari.
- **Materiali e atmosfera**: nuove tonalità minerali, calce, cotto e corteccia; shader del cielo con nubi e luce calda. Eliminata la maggior parte degli effetti ottici subacquei, inclusi le caustiche animate e i loro pass di rendering.
- **Fauna e suono**: eliminati dal rendering pesci, mante, bolle e particelle subacquee. L'audio oceanico è stato sostituito con vento e richiami di uccelli sintetizzati tramite Web Audio.
- **Controlli**: WASD camminata, Shift corsa, mouse per guardare, E salto, tasti 1–6 punti di vista, Esc menu, M audio, H prestazioni. Collisioni aggiuntive per case e pilastri dell'arco.
- **Prestazioni**: mantenuti livelli Low / Medium / High, LOD, culling, caricamento a fasi, post-processing e adattamento dinamico della risoluzione. Le preferenze P11 sono separate da quelle di Abyssal Garden.

## Stato e limiti

Il progetto è un **prototipo terrestre giocabile**, non una ricostruzione storica verificata di Verrucola e non un risultato fotorealistico già validato. Architettura, paesaggio e specie arboree sono rappresentazioni procedurali stilizzate, non rilievi fotogrammetrici né modelli botanici accurati.

È stata effettuata una verifica statica dei file: coerenza HTML/sorgenti, sintassi JavaScript, verifica sintattica parziale di 16 blocchi WGSL contro assegnazioni a `let`, test delle mesh per vertici/indici/coordinata e assenza dei draw marini. **Non è stato possibile eseguire una prova visiva WebGPU reale, compilare tutti gli shader su un adattatore GPU o misurare gli FPS sull'hardware dell'utente**. Tali verifiche sono necessarie prima di dichiarare la release stabile.

## Sorgente e test

```bash
cd thais-p11-lunigiana/source
npm install
npm test
npm run build:readable
```

Il risultato della build leggibile viene scritto in `thais-p11-lunigiana/index.html`; `npm run build` produce la versione minificata. L'HTML è autonomo e può essere aperto con Chrome/Edge aggiornato, con WebGPU e accelerazione hardware.

Il test statico **non** equivale a una compilazione GPU o a un test di navigazione reale.

## Provenienza e licenza

Il renderer derivato proviene da **Abyssal Garden**, creato da **Maksymilian Dendura**, copyright © 2026, con licenza **MIT**. Si veda [LICENSE](LICENSE) e il [repository originale](https://github.com/Noniv/abyssal-garden). La struttura centrale dell'engine e il relativo copyright restano attribuiti all'autore originario.
