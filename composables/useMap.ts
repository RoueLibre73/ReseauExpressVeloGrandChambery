import { GeoJSONSource, LngLatBounds, Map } from 'maplibre-gl';
import { isCompteurFeature, isLineStringFeature, isPerspectiveFeature, isPointFeature, type Feature, type LineStringFeature } from '~/types';

type MultiColoredLineStringFeature = LineStringFeature & { properties: { colors: string[] } };

type Compteur = {
  name: string;
  _path: string;
  description: string;
  idPdc: number;
  coordinates: [number, number];
  lines: number[];
  counts: Array<{
    month: string;
    count: number;
  }>;
};

// features plotted last are on top
const sortOrder = ["Anneau", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "A", "B", "C", "D"].reverse();

function sortByLine(featureA: LineStringFeature, featureB: LineStringFeature) {
  const lineA = featureA.properties.line;
  const lineB = featureB.properties.line;
  return sortOrder.indexOf(lineA) - sortOrder.indexOf(lineB);
}

function getCrossIconUrl(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 8; // Set the desired width of your icon
  canvas.height = 8; // Set the desired height of your icon
  const context = canvas.getContext('2d');
  if (!context) {
    return '';
  }

  // Draw the first diagonal line of the "X"
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(canvas.width, canvas.height);
  context.lineWidth = 3;
  context.stroke();

  // Draw the second diagonal line of the "X"
  context.beginPath();
  context.moveTo(0, canvas.height);
  context.lineTo(canvas.width, 0);
  context.lineWidth = 3;
  context.stroke();

  return canvas.toDataURL();
}

function groupFeaturesByColor(features: MultiColoredLineStringFeature[]) {
  const featuresByColor: Record<string, Feature[]> = {};
  for (const feature of features) {
    const color = feature.properties.colors[0];

    if (featuresByColor[color]) {
      featuresByColor[color].push(feature);
    } else {
      featuresByColor[color] = [feature];
    }
  }
  return featuresByColor;
}

export const useMap = () => {
  const { getLineColor } = useColors();

  function addLineColor(feature: LineStringFeature): MultiColoredLineStringFeature {
    return {
      ...feature,
      properties: {
        colors: [getLineColor(feature.properties.line)],
        ...feature.properties
      }
    };
  }

  function upsertMapSource(map: Map, sourceName: string, features: Feature[]) {
    const source = map.getSource(sourceName) as GeoJSONSource;
    if (source) {
      source.setData({ type: 'FeatureCollection', features });
      return true;
    }
    map.addSource(sourceName, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features }
    });
    return false;
  }

  async function loadImages({ map }: { map: Map }) {
    const camera = await map.loadImage('/icons/camera.png');
    map.addImage('camera-icon', camera.data, { sdf: true });

    const crossIconUrl = getCrossIconUrl();
    const cross = await map.loadImage(crossIconUrl);
    map.addImage('cross-icon', cross.data, { sdf: true });
  }


  function plotQualityBackgroundNok({ map, features }: { map: Map; features: LineStringFeature[] }) {
    const sections = features.filter(feature => feature.properties.quality === 'non satisfaisant');

    if (sections.length === 0 && !map.getLayer('quality-non-satisfaisant')) {
      return;
    }
    if (upsertMapSource(map, 'quality-non-satisfaisant', sections)) {
      return;
    }

    map.addLayer({
      id: 'quality-non-satisfaisant',
      type: 'line',
      source: 'quality-non-satisfaisant',
      layout: { 'line-cap': 'round' },
      paint: {
        'line-gap-width': 5,
        'line-width': 8,
        'line-color': '#ffa3af',
      }
    });
  }

  function plotQualityBackgroundOk({ map, features }: { map: Map; features: LineStringFeature[] }) {
    const sections = features.filter(feature => feature.properties.quality === 'satisfaisant');

    if (sections.length === 0 && !map.getLayer('quality-satisfaisant')) {
      return;
    }
    if (upsertMapSource(map, 'quality-satisfaisant', sections)) {
      return;
    }


    map.addLayer({
      id: 'quality-satisfaisant',
      type: 'line',
      source: 'quality-satisfaisant',
      layout: { 'line-cap': 'round' },
      paint: {
        'line-gap-width': 5,
        'line-width': 8,
        'line-color': '#9cffaf',
      }
    });
  }

  function plotUnderlinedSections({ map, features }: { map: Map; features: LineStringFeature[] }) {
    const sections = features.map((feature, index) => ({ id: index, ...feature }));

    if (sections.length === 0 && !map.getLayer('highlight')) {
      return;
    }
    if (upsertMapSource(map, 'all-sections', sections)) {
      return;
    }

    map.addLayer({
      id: 'highlight',
      type: 'line',
      source: 'all-sections',
      layout: { 'line-cap': 'round' },
      paint: {
        'line-gap-width': 5,
        'line-width': 4,
        'line-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#9ca3af', '#FFFFFF']
      }
    });
    map.addLayer({
      id: 'contour',
      type: 'line',
      source: 'all-sections',
      layout: { 'line-cap': 'round' },
      paint: {
        'line-gap-width': 4,
        'line-width': 1,
        'line-color': '#6b7280'
      }
    });
    map.addLayer({
      id: 'underline',
      type: 'line',
      source: 'all-sections',
      paint: {
        'line-width': 4,
        'line-color': '#ffffff'
      }
    });

    let hoveredLineId: any = null;
    map.on('mousemove', 'highlight', (e: any) => {
      map.getCanvas().style.cursor = 'pointer';
      if (e.features.length > 0) {
        if (hoveredLineId !== null) {
          map.setFeatureState({ source: 'all-sections', id: hoveredLineId }, { hover: false });
        }
        if (e.features[0].id !== undefined) {
          hoveredLineId = e.features[0].id;
          if (hoveredLineId !== null) {
            map.setFeatureState({ source: 'all-sections', id: hoveredLineId }, { hover: true });
          }
        }
      }
    });
    map.on('mouseleave', 'highlight', () => {
      map.getCanvas().style.cursor = '';
      if (hoveredLineId !== null) {
        map.setFeatureState({ source: 'all-sections', id: hoveredLineId }, { hover: false });
      }
      hoveredLineId = null;
    });
  }

  function plotDoneSections({ map, features }: { map: Map; features: MultiColoredLineStringFeature[] }) {
    const sections = features.filter(feature => feature.properties.status === 'done');

    // si il n'y a rien a afficher et que la couche n'existe pas, on ne fait rien
    // si elle existe déjà, on la maj (carte dynamique par année)
    if (sections.length === 0 && !map.getLayer('done-sections')) {
      return;
    }
    if (upsertMapSource(map, 'done-sections', sections)) {
      return;
    }

    map.addLayer({
      id: 'done-sections',
      type: 'line',
      source: 'done-sections',
      paint: {
        'line-width': 4,
        'line-color': ["to-color", ['at', 0, ['get', 'colors']]]
      }
    });

    animateColor(map, 0, 10000, 'done-sections');
  }

  function plotWipSections({ map, features }: { map: Map; features: MultiColoredLineStringFeature[] }) {
    const sections = features.filter(feature => feature.properties.status === 'wip');

    if (sections.length === 0 && !map.getLayer('wip-sections')) {
      return;
    }
    if (upsertMapSource(map, 'wip-sections', sections)) {
      return;
    }

    map.addLayer({
      id: 'wip-sections',
      type: 'line',
      source: 'wip-sections',
      paint: {
        'line-width': 4,
        'line-color': ["to-color", ['at', 0, ['get', 'colors']]],
        'line-dasharray': [0.2, 1.1]
      }
    });
    map.addLayer({
      id: 'wip-sectionsB',
      type: 'line',
      source: 'wip-sections',
      paint: {
        'line-width': 4,
        'line-color': ["to-color", ['at', 0, ['get', 'colors']]],
      }
    });

    function animateOpacity(timestamp: number, animationLength: number, attribute: string) {

      function subAnimateOpacity(timestamp: number) {
        const opacity01 = (timestamp % animationLength) / animationLength
        const opacity = (Math.abs(opacity01 - 0.5)) * 2
        map.setPaintProperty(attribute, 'line-opacity', opacity);

        // Request the next frame of the animation.
        requestAnimationFrame(subAnimateOpacity);
      }
      subAnimateOpacity(timestamp)
    }
    animateOpacity(0, 1000*0.75, 'wip-sectionsB');
  }

  function plotPlannedSections({ map, features }: { map: Map; features: MultiColoredLineStringFeature[] }) {
    const sections = features.filter(feature => feature.properties.status === 'planned');

    if (sections.length === 0 && !map.getLayer('planned-sections')) {
      return;
    }
    if (upsertMapSource(map, 'planned-sections', sections)) {
      return;
    }

    map.addLayer({
      id: 'planned-sections',
      type: 'line',
      source: 'planned-sections',
      paint: {
        'line-width': 4,
        'line-color': ["to-color", ['at', 0, ['get', 'colors']]],
        'line-dasharray': [0.2, 1.1]
      }
    });

    animateColor(map, 0, 10000, 'planned-sections');
  }

  function plotVarianteSections({ map, features }: { map: Map; features: MultiColoredLineStringFeature[] }) {
    const sections = features.filter(feature => feature.properties.status === 'variante');

    if (sections.length === 0 && !map.getLayer('variante-sections')) {
      return;
    }
    if (upsertMapSource(map, 'variante-sections', sections)) {
      return;
    }

    map.addLayer({
      id: 'variante-sections',
      type: 'line',
      source: 'variante-sections',
      paint: {
        'line-width': 4,
        'line-color': ["to-color", ['at', 0, ['get', 'colors']]],
        'line-dasharray': [2, 2],
        'line-opacity': 0.5
      }
    });
    map.addLayer({
      id: 'variante-symbols',
      type: 'symbol',
      source: 'variante-sections',
      paint: {
        'text-halo-color': '#fff',
        'text-halo-width': 4
      },
      layout: {
        'symbol-placement': 'line',
        'symbol-spacing': 120,
        'text-font': ['Open Sans Regular'],
        'text-field': ['coalesce', ['get', 'text'], 'variante'],
        'text-size': 14
      }
    });

    map.on('mouseenter', 'variante-sections', () => (map.getCanvas().style.cursor = 'pointer'));
    map.on('mouseleave', 'variante-sections', () => (map.getCanvas().style.cursor = ''));
  }

  function plotVariantePostponedSections({ map, features }: { map: Map; features: MultiColoredLineStringFeature[] }) {
    const sections = features.filter(feature => feature.properties.status === 'variante-postponed');

    if (sections.length === 0 && !map.getLayer('variante-postponed-sections')) {
      return;
    }
    if (upsertMapSource(map, 'variante-postponed-sections', sections)) {
      return;
    }

    map.addLayer({
      id: 'variante-postponed-sections',
      type: 'line',
      source: 'variante-postponed-sections',
      paint: {
        'line-width': 4,
        'line-color': ["to-color", ['at', 0, ['get', 'colors']]],
        'line-dasharray': [2, 2],
        'line-opacity': 0.5
      }
    });
    map.addLayer({
      id: 'variante-postponed-symbols',
      type: 'symbol',
      source: 'variante-postponed-sections',
      paint: {
        'text-halo-color': '#fff',
        'text-halo-width': 4
      },
      layout: {
        'symbol-placement': 'line',
        'symbol-spacing': 120,
        'text-font': ['Open Sans Regular'],
        'text-field': ['coalesce', ['get', 'text'], 'variante reportée'],
        'text-size': 14
      }
    });

    map.on('mouseenter', 'variante-postponed-sections', () => (map.getCanvas().style.cursor = 'pointer'));
    map.on('mouseleave', 'variante-postponed-sections', () => (map.getCanvas().style.cursor = ''));
  }

  function plotUnknownSections({ map, features }: { map: Map; features: MultiColoredLineStringFeature[] }) {
    const sections = features.filter(feature => feature.properties.status === 'unknown');

    if (sections.length === 0 && !map.getLayer('unknown-sections')) {
      return;
    }
    if (upsertMapSource(map, 'unknown-sections', sections)) {
      return;
    }

    map.addLayer({
      id: 'unknown-sections',
      type: 'line',
      source: 'unknown-sections',
      layout: {
        'line-cap': 'round'
      },
      paint: {
        'line-width': [
          'interpolate',
          ['linear'],
          ['zoom'],
          11,
          4, // width 4 at low zoom
          14,
          25 // progressively reach width 25 at high zoom
        ],
        'line-color': ["to-color", ['at', 0, ['get', 'colors']]],
        'line-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          11,
          0.5, // opacity 0.4 at low zoom
          14,
          0.35 // opacity 0.35 at high zoom
        ]
      }
    });
    map.addLayer({
      id: 'unknown-symbols',
      type: 'symbol',
      source: 'unknown-sections',
      paint: {
        'text-halo-color': '#fff',
        'text-halo-width': 3
      },
      layout: {
        'symbol-placement': 'line',
        'symbol-spacing': 120,
        'text-font': ['Open Sans Regular'],
        'text-field': 'tracé à définir',
        'text-size': 14
      }
    });

    map.on('mouseenter', 'unknown-sections', () => (map.getCanvas().style.cursor = 'pointer'));
    map.on('mouseleave', 'unknown-sections', () => (map.getCanvas().style.cursor = ''));
  }

  function plotPostponedSections({ map, features }: { map: Map; features: MultiColoredLineStringFeature[] }) {
    const sections = features.filter(feature => feature.properties.status === 'postponed');

    if (sections.length === 0) {
      for (let line = 1; line <= 12; line++) {
        upsertMapSource(map, `postponed-sections-${getLineColor(line)}`, []);
      }
      return;
    }

    const featuresByColor = groupFeaturesByColor(sections);
    for (const [color, sameColorFeatures] of Object.entries(featuresByColor)) {
      if (upsertMapSource(map, `postponed-sections-${color}`, sameColorFeatures as Feature[])) {
        continue;
      }

      map.addLayer({
        id: `postponed-symbols-${color}`,
        type: 'symbol',
        source: `postponed-sections-${color}`,
        layout: {
          'symbol-placement': 'line',
          'symbol-spacing': 15,
          'icon-image': 'cross-icon',
          'icon-size': 1.2
        },
        paint: {
          'icon-color': color,
          'icon-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            12,
            0.35, // opacity 0.4 at low zoom
            14,
            0.6 // opacity 0.35 at high zoom
          ]
        }
      });
      map.addLayer({
        id: `postponed-text-${color}`,
        type: 'symbol',
        source: `postponed-sections-${color}`,
        paint: {
          'text-halo-color': '#fff',
          'text-halo-width': 3
        },
        layout: {
          'symbol-placement': 'line',
          'symbol-spacing': 150,
          'text-font': ['Open Sans Regular'],
          'text-field': 'reporté',
          'text-size': 14
        }
      });

      map.on('mouseenter', `postponed-symbols-${color}`, () => (map.getCanvas().style.cursor = 'pointer'));
      map.on('mouseleave', `postponed-symbols-${color}`, () => (map.getCanvas().style.cursor = ''));
    }
  }

  function plotPerspective({ map, features }: { map: Map; features: Feature[] }) {
    const perspectives = features.filter(isPerspectiveFeature).map(feature => ({
      ...feature,
      properties: {
        color: getLineColor(feature.properties.line),
        ...feature.properties
      }
    }));
    if (perspectives.length === 0) {
      return;
    }

    if (upsertMapSource(map, 'perspectives', perspectives)) {
      return;
    }

    map.addLayer({
      id: 'perspectives',
      source: 'perspectives',
      type: 'symbol',
      layout: {
        'icon-image': 'camera-icon',
        'icon-size': 0.5,
        'icon-offset': [-25, -25]
      },
      paint: {
        'icon-color': ["to-color", ['at', 0, ['get', 'colors']]]
      }
    });
    map.setLayoutProperty('perspectives', 'visibility', 'none');
    map.on('zoom', () => {
      const zoomLevel = map.getZoom();
      if (zoomLevel > 14) {
        map.setLayoutProperty('perspectives', 'visibility', 'visible');
      } else {
        map.setLayoutProperty('perspectives', 'visibility', 'none');
      }
    });
  }

  function plotCompteurs({ map, features }: { map: Map; features: Feature[] }) {
    const compteurs = features.filter(isCompteurFeature);
    if (compteurs.length === 0) {
      return;
    }
    compteurs
      .sort((c1, c2) => (c2.properties.counts.at(-1)?.count ?? 0) - (c1.properties.counts.at(-1)?.count ?? 0))
      .map((c, i) => {
        // top counters are bigger and drawn above others
        const top = 10;
        c.properties.circleSortKey = i < top ? 1 : 0;
        c.properties.circleRadius = i < top ? 10 : 7;
        c.properties.circleStrokeWidth = i < top ? 3 : 0;
        return c;
      });

    map.addSource('compteurs', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: compteurs
      }
    });
    map.addLayer({
      id: 'compteurs',
      source: 'compteurs',
      type: 'circle',
      layout: {
        'circle-sort-key': ['get', 'circleSortKey']
      },
      paint: {
        'circle-color': '#152B68',
        'circle-stroke-color': '#fff',
        'circle-stroke-width': ['get', 'circleStrokeWidth'],
        'circle-radius': ['get', 'circleRadius']
      }
    });
    map.on('mouseenter', 'compteurs', () => (map.getCanvas().style.cursor = 'pointer'));
    map.on('mouseleave', 'compteurs', () => (map.getCanvas().style.cursor = ''));
  }

  function getCompteursFeatures({
    counters,
    type
  }: {
    counters: Compteur[];
    type: 'compteur-velo' | 'compteur-voiture';
  }) {
    if (counters.length === 0) {
      return;
    }

    return counters.map(counter => ({
      type: 'Feature',
      properties: {
        type,
        name: counter.name,
        link: counter._path,
        counts: counter.counts
      },
      geometry: {
        type: 'Point',
        coordinates: counter.coordinates
      }
    }));
  }

  function fitBounds({ map, features }: { map: Map; features: Feature[] }) {
    const allLineStringsCoordinates = features
      .filter(isLineStringFeature)
      .map(feature => feature.geometry.coordinates)
      .flat();

    const allPointsCoordinates = features.filter(isPointFeature).map(feature => feature.geometry.coordinates);

    if (allPointsCoordinates.length === 0 && allLineStringsCoordinates.length === 0) {
      return;
    }

    if (features.length === 1 && allPointsCoordinates.length === 1) {
      map.flyTo({ center: allPointsCoordinates[0] });
    } else {
      const bounds = new LngLatBounds(allLineStringsCoordinates[0], allLineStringsCoordinates[0]);
      for (const coord of [...allLineStringsCoordinates, ...allPointsCoordinates]) {
        bounds.extend(coord);
      }
      map.fitBounds(bounds, { padding: 20 });
    }
  }

  function addOtherLineColor(features: MultiColoredLineStringFeature[]) {
    for(let f of features) {
      if(f.properties.id) {
        for(let o of features) {
          if(o != f && f.properties.id == o.properties.id) {
            f.properties.colors.push(o.properties.colors[0])
          }
        }
      }
    }
    return features
  }

  function animateColor(map: Map, timestamp: number, animationLength: number, attribute: string) {

    function subAnimateColor(timestamp: number) {
      const t = (timestamp % animationLength) / animationLength
      // WIP : trouver les index out of bounds
      map.setPaintProperty(attribute, 'line-color', ["to-color", ['at', ['floor', ['*', t, ['length', ['get', 'colors']]]], ['get', 'colors']]]);

      // Request the next frame of the animation.
      requestAnimationFrame(subAnimateColor);
    }
    subAnimateColor(timestamp)
  }

  function plotFeatures({ map, features }: { map: Map; features: Feature[] }) {
    let lineStringFeatures = features.filter(isLineStringFeature).sort(sortByLine).map(addLineColor);
    lineStringFeatures = addOtherLineColor(lineStringFeatures)

    plotQualityBackgroundNok({ map, features: lineStringFeatures });
    plotQualityBackgroundOk({ map, features: lineStringFeatures });

    plotUnderlinedSections({ map, features: lineStringFeatures });
    plotDoneSections({ map, features: lineStringFeatures });
    plotPlannedSections({ map, features: lineStringFeatures });
    plotVarianteSections({ map, features: lineStringFeatures });
    plotVariantePostponedSections({ map, features: lineStringFeatures });
    plotWipSections({ map, features: lineStringFeatures });
    plotUnknownSections({ map, features: lineStringFeatures });
    plotPostponedSections({ map, features: lineStringFeatures });

    plotPerspective({ map, features });
    plotCompteurs({ map, features });
  }

  return {
    loadImages,
    plotFeatures,
    getCompteursFeatures,
    fitBounds
  };
};
