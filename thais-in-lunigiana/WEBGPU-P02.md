# Thais in Lunigiana — WebGPU P02 (prototipo)
Questa è una nuova implementazione **nativa WebGPU/WGSL**, separata dall'esperimento P01 in Three.js/WebGL e dall'originale Abyssal Garden. Non modifica `source/`.

## Anteprima
`thais-in-lunigiana/index.html` (stesso contenuto di `webgpu-p02.html`).

## Funzionalità
- Paesaggio e percorso procedurali ispirati ai borghi della Lunigiana; non è una riproduzione fedele di Verrucola.
- Strada a ciottoli con varianti, edifici in muratura volumetrica, architravi, coppi, portali ad arco, persiane, elementi vegetali e torre.
- Renderer personalizzato in WebGPU con WGSL, buffer istanziati, HDR `rgba16float`, shadow-map, ombreggiatura, materiali procedurali e passaggio di tonemapping.
- WASD, mouse e Shift; Esc apre il menu e libera il puntatore.
- UI mobile preliminare, due livelli di risoluzione.

## Test
- Codice JavaScript validato sintatticamente con Node.js; struttura WebGPU e risorse ricontrollate.
- **Non verificato in esecuzione in un browser con WebGPU**: il browser di test dell'ambiente di generazione blocca l'uso grafico.
- Il target estetico è Abyssal Garden ma **la parità visiva e la fluidità mobile non sono dimostrate**. Serve screenshot e fps reali dall'hardware dell'utente.
- In caso di errore WGSL/WebGPU, il menu mostra il messaggio dell'errore, con dettagli anche nella console.

## Limiti progettuali noti
- Nessun modello di Thais ancora integrato; la camera è temporaneamente in prima persona.
- Collisione semplificata all'asse della strada e zona del cancello.
- Case ispirate al territorio, non digitalizzazione architettonica del borgo reale.
- Nessuna dipendenza npm o CDN necessaria per la pagina standalone.

## Licenza
Originale Abyssal Garden © autore originale, MIT. Questo prototipo ha implementazione distinta e rispetta l'esistenza e licenza dei sorgenti del progetto originale.
