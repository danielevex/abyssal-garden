# Thais in Lunigiana — Verrucola (prototipo 01)

Prima passeggiata 3D procedurale in un **borgo immaginario ispirato a Verrucola (Fivizzano)**. Non è una ricostruzione architettonica né topografica fedele. Costruito come prototipo separato nel fork di Abyssal Garden: il motore sottomarino originale e `index.html` non sono modificati.

## Funzioni realizzate

- Terreno appenninico triangolato da funzioni matematiche di rumore (noise / FBM).
- Strada in pendenza con migliaia di ciottoli in instancing GPU.
- 12 edifici medievali a moduli: pietra proceduralmente dipinta, corsi di muratura, davanzali, veri infissi con persiane, porte, balconi, camini, coppi 3D.
- Porta ad arco attraversabile, torrione merlato e cortile di arrivo.
- Castagneti con tronchi e chiome instanziate, edere e vasi fioriti, lampioni.
- Luce solare calda, ombre (PC), foschia in profondità, materiali roughness, cielo procedurale e particelle.
- Navigazione con WASD, mouse, Shift; su smartphone joystick virtuale + drag della visuale.
- LOD manuale e qualità ridotta automatica per touch.
- Tutte le geometrie e le texture di questo prototipo sono generate in codice, senza file modello/immagine esterni.

## Avvio

Serve una connessione internet per il modulo Three.js pin `0.187.0`. Su un sito HTTPS, aprire `thais-in-lunigiana/index.html`; da Windows via PowerShell nella radice della repository:

```powershell
py -3.11 -m http.server 8000
```

Poi aprire `http://localhost:8000/thais-in-lunigiana/`.

## Limiti da correggere prima di considerarlo un gioco

- Thais GLB e controller in terza persona **non ancora integrati**. Il primo prototipo è una passeggiata in prima persona.
- Collisioni provvisorie che confinano alla carreggiata; non esiste ancora un sistema completo di navigazione/collisioni degli edifici.
- Modelli e materiali procedurali **non sono garantiti equivalenti alla qualità visiva di Abyssal Garden** senza una revisione grafica su dispositivi reali; è una prima base confrontabile.
- Nessuna missione, nessun sistema di salvataggio.
- WebGL2 / Three.js come renderer della prima iterazione; non replica ancora il motore WebGPU puro di Abyssal Garden.
- Non è offline a causa della CDN Three.js. Prima del rilascio finale andrà vendorizzata.

## Direzione artistica

Pietra arenaria chiara irregolare, tetti in cotto, persiane verdi, archetti e castagneti. Ispirazione fotografica: borgo di Verrucola, Lunigiana. Nessuna immagine esterna è usata nei materiali del gioco.