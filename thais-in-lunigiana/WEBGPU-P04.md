# Thais in Lunigiana — WebGPU P04

## Why P04
User screenshot of P03 shows real detail bump on plaster but a still overexposed, mechanically repetitive medieval street. Direct code inspection found two geometric faults: `side` sign pointed facade props INTO buildings, and masonry was generated without reserving openings for doors/windows.

## Changes
- Fixed street-facing direction: `facadeSide=-side` for all windows, portals, facade ornaments, cornices, ivy and lanterns.
- Generated window and portal locations BEFORE wall filling and excluded stones within openings.
- For plastered facades, split panels around actual openings rather than drawing one solid occluding wall.
- On desktop, generated individual eight-corner extruded stone faces with bevel and nonplanar central relief; the existing Abyssal-style mipmapped triplanar material remains applied.
- On touchscreen, retained lower-cost box geometry and reduced foliage for performance.
- Added a handful of street-edge barrels and planters to improve architectural scale and visual landmarks.
- Regraded the sky and fog, reduced ambient/bounce light, added a mild post-ACES contrast curve while retaining procedural details.
- Kept deterministic scene seed and original road/camera position for screenshot comparison.

## Static checks completed
- JavaScript syntax parses.
- CPU generation runs completely with fake DOM for desktop and mobile:
  - Desktop: 65,434 non-instanced triangles, 10,853 box instances, 2,988 pavers, 13,724 foliage units, 12 houses.
  - Mobile: 30,808 non-instanced triangles, 11,724 box instances, 2,988 pavers, 3,113 foliage units, 12 houses.
  - All generated numeric attributes are finite.
- All shader module sources retained from P03, including the MIT attribution of Abyssal Garden by Maksymilian Dendura.

## NOT verified
The browser used by the assistant does not allow hardware WebGPU. Therefore neither WGSL runtime validation nor on-GPU visibility/lighting performance is verified. The on-device screenshot and FPS are needed. The appearance should not be claimed to match Abyssal Garden yet.

## Use
- P04 feature branch: `feat/thais-verrucola-architecture-p04`
- Preview: `thais-in-lunigiana/index.html` or `thais-in-lunigiana/webgpu-p04.html`
- All original Abyssal Garden code in `source/` remains unchanged. P03 exists in its feature branch and `webgpu-p03.html`.
- No GLB or playable Thais character is included yet.
