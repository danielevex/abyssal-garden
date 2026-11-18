# Thais in Lunigiana — P05 | Borghi con identità

Questa versione risponde ai difetti visibili nello screenshot P04: geometria troppo regolare, finestre ripetitive, vegetazione verde a cubi e fessure dell'acciottolato che lasciano intravedere terreno.

## Modifiche effettive

1. **Vicolo** — l'asse stradale curva più naturalmente; le fughe sono poggiate sopra un substrato scuro della stessa pendenza (evita strisce di terreno verde tra le pietre).
2. **Muratura** — ridotto il rilievo eccessivo delle facce poligonali, con palette più coerente di pietra calcarea/arenaria.
3. **Facciate** — alcune finestre vengono generate come aperture singole anziché coppie identiche su tutti i piani; persiane in toni verde oliva più naturali.
4. **Nuovo luogo** — un lotto rimane aperto sul fianco sinistro: muro basso con varco, cortile con pozzo ottagonale in pietra, piccoli lastroni e castagni.
5. **Vegetazione** — sostituita la base delle istanze di fogliame da un cubo (12 triangoli) a due foglie a losanga incrociate (4 triangoli per istanza); shader di vento e materiale WebGPU già esistenti conservati, fogliame lievemente desaturato.

## Verifiche eseguite

- Parser JavaScript: corretto.
- Generazione CPU deterministica completata con DOM simulato; ogni attributo numerico finito.
- Desktop: 63.502 triangoli di mesh non istanziata; 9.973 istanze di scatole; 2.988 pietre di pavimentazione; 13.985 istanze di foglie.
- Mobile: 31.292 triangoli di mesh non istanziata; 10.903 istanze di scatole; 2.988 pietre; 2.996 istanze di foglie.
- Tutti gli shader WGSL P04/P05 identici (materiali proceduralizzati di origine Abyssal); layout delle istanze compatibile con buffer della nuova base foglia; passata ombre originale presente.
- Percorso WebGPU e controlli originali non modificati.

**Non verificato con GPU reale**: la corretta visibilità delle foglie, delle superfici del pozzo, della nuova prospettiva e le performance su smartphone richiedono prova sul dispositivo. Nessuna promessa di parità grafica con Abyssal Garden.

## Come confrontare

Il seed del mondo è invariato e la telecamera inizia nella stessa area delle versioni precedenti.
- P04 si trova in `webgpu-p04.html`.
- P05 viene servita da `index.html` e `webgpu-p05.html` nel ramo `feat/thais-verrucola-landmarks-p05`.
- Il motore originale `source/` e il ramo principale non sono stati modificati.

Il gioco non include ancora Thais come protagonista; questa milestone riguarda qualità dell'ambiente e identità architettonica.
