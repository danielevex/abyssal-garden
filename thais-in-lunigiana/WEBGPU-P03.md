# Thais in Lunigiana — P03 | Materiali Abyssal-style

## Fonte e principio
Material bake e shader di dettaglio derivano dal motore originale **Abyssal Garden** di Maksymilian Dendura, MIT:
- `source/src/shaders.js`: `W_NOISE`, `W_FS`, `W_DETAIL`, `W_SOLID` del repository originale;
- `source/src/main.js`: render pass di bake una tantum, catena mipmap e bind group materiali;
- `source/src/world.js`: distribuzione deterministica e geometria istanziata come riferimento di architettura.

La texture di dettaglio procedurale da `W_DETAIL` conserva i canali: **RG** gradienti/slope, **B** altezza, **A** mottling. Non è una texture fotografica e viene generata soltanto all'avvio, non ad ogni frame.

## Implementazione P03
- Shader WGSL per bake della texture su GPU: 1024x1024 desktop, 512x512 touch.
- Completa piramide mipmap prodotta con render pass GPU.
- Triplanar sampling su pareti, pietre, strada, intonaco, tetti, legno, terreni e vegetazione.
- Normali perturbate da texture a due scale, con attenuazione alla distanza.
- Materiali separati: arenaria/calcare e licheni; intonaco invecchiato; coppi; legno; acciottolato umido; intonaco; vegetazione.
- Riduzione dei valori di albedo incoerenti; esposizione P02 1.06 -> P03 0.83; luce e foschia attenuate.
- Nessuna dipendenza esterna per texture; shader eseguiti con WebGPU senza Three.js.
- Gli shader vengono controllati all'avvio con `getCompilationInfo()` e gli errori riportano numero di riga.

## Prove effettuate
- Ispezione diretta dei sorgenti originali e dei file modificati su GitHub.
- Verifica statica dei passaggi bake -> mipmap -> bind group -> shader -> post, senza fetch di asset esterni.
- Verifica della sintassi JavaScript tramite parsing.
- Conservazione dei sorgenti originali `source/` nel fork e della P02 su ramo separato.

**Non è stato possibile eseguire un browser WebGPU hardware in questo ambiente**: la compilazione WGSL e l'effettiva qualità grafica devono essere confermate sul PC. Non dichiarare qualità Abyssal raggiunta o 60 FPS mobile senza test.

## Cosa rimane da migliorare
La geometria dei conci è ancora basata su blocchi istanziati. Per un salto visivo ulteriore servono facce scolpite non perfettamente rettangolari, geometria ad archi più accurata, tetti con coppi curvi e vegetazione medievale/piante più naturali. La qualità dell'illuminazione globale rimane approssimata, non è path-tracing.

## Sicurezza e versioni
- Branch: `feat/thais-verrucola-abyssal-materials-p03`
- Avvio: `thais-in-lunigiana/index.html` o `webgpu-p03.html`.
- P02 rimane in `webgpu-p02.html` e nel suo branch.
- Originale Abyssal Garden non modificato in `source/`.
- Thais giocabile non ancora integrata; questa è la milestone **materiali e atmosfera**.

## Licenza
La parte riutilizzata del codice originale è sotto licenza MIT, copyright (c) 2026 Maksymilian Dendura. Vedere la licenza del repository e l'attribuzione nel file HTML.
