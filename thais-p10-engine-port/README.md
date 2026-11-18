# Thais P10 — The Green Depths (Abyssal Engine Port)

## Status

**Experimental port; not a completed medieval Lunigiana village.**

This version starts from the actual **Abyssal Garden** readable sources bundled with the repository, rather than the independent P05–P09 engine. It is a technical baseline to establish that the underlying high-density renderer can be reused.

## Retained from original Abyssal Garden

- Native WebGPU, compute-based volumetric density field and surface-nets terrain extraction.
- Spatial culling, instanced procedural leaves, multi-level LOD, adaptive resolution and 3 quality profiles.
- GPU textures, multi-pass rendering, shadow maps, bloom and atmospheric effects.
- Native staged loading with progress updates and GPU submission synchronization.

## Terrestrial adaptation in this revision

- Replaced underwater absorption and scattering coefficients with a warmer low-density haze.
- Replaced the water-surface appearance and distant background with a daylight sky shader.
- Adjusted leaf and stem colors toward earth, bark, foliage and late-summer green.
- Placed experimental chestnut-like grove clusters against the original volume-derived ground, with density controlled by quality level.
- Renamed the menu and progress labels for the terrestrial-engine experiment.

## Important limitations

This port still contains portions of the original underwater world's geometry, animations, biological forms and collision/camera behavior. Its new forest clusters are **procedural approximations**, not realistic scanned chestnut trees. There are no complete medieval houses or historically accurate Verrucola layout yet. It is not an apples-to-apples photorealism benchmark.

### Verification

- GitHub contents write and readback: performed.
- JavaScript syntax (including the wrapped original source): checked.
- Actual browser WebGPU execution, WGSL compilation, load time and FPS on target RTX GPU: **not verified** from this environment.

## Next technical milestones

1. Establish that the original terrain+foliage engine boots in the P10 page on a target browser, inspect console and GPU budget.
2. Replace underwater set-pieces and fish with proper land geometry; remove water-specific rendering and swimming camera rules.
3. Rebuild vegetation around branch-and-leaf mesh profiles and physically credible chestnut shapes rather than kelp-derived cards.
4. Introduce a medieval stone wall/arch and authentic field materials at camera scale; validate against a reference image.
5. Profile the same scene, resolution, and settings on both engines before any claims of visual or performance parity.

Based on the original Abyssal Garden code included in this repository, under the repository's MIT license. The original core remains owned by its respective authors.
