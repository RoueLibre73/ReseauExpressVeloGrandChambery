export type LaneType =
| 'bidirectionnelle'
| 'bilaterale'
| 'voie-bus'
| 'voie-bus-elargie'
| 'velorue'
| 'voie-verte'
| 'bandes-cyclables'
| 'zone-de-rencontre'
| 'chaucidou'
| 'heterogene'
| 'aucun'
| 'inconnu';

export type LaneStatus = 'done' | 'wip' | 'planned' | 'postponed' | 'unknown' | 'variante' | 'variante-postponed';

export type Quality = 'bad' | 'fair' | 'good';

export type PolygonFeature = {
  type: 'Feature';
  geometry: {
    type: "Polygon",
    coordinates: [number, number][];
  }
}

export type LineStringFeature = {
  type: 'Feature';
  properties: {
    id?: string
    line: string;
    name: string;
    status: LaneStatus;
    quality: Quality;
    type: LaneType;
    doneAt?: string;
    link?: string;
  };
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
};

export type DisplayedLane = LineStringFeature & { properties: { color: string, lane_index: number, nb_lanes: number } };

export type PerspectiveFeature = {
  type: 'Feature';
  properties: {
    type: 'perspective';
    line: number;
    name: string;
    imgUrl: string;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
};

export type CompteurFeature = {
  type: 'Feature';
  properties: {
    type: 'compteur-velo' | 'compteur-voiture',
    line: number;
    name: string;
    link?: string;
    counts: Array<{
      month: string;
      count: number;
    }>;
    /**
     * z-index like
     */
    circleSortKey?: number;
    circleRadius?: number;
    circleStrokeWidth?: number;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
};

export type InflatorFeature = {
  type: 'Feature';
  properties: {
    type: 'inflator',
    name: string
  }
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

type PointFeature = PerspectiveFeature | CompteurFeature | InflatorFeature;

export type Feature = LineStringFeature | PointFeature | DisplayedLane | PolygonFeature;

export type Geojson = {
  type: string;
  features: Feature[];
};

/**
 * type helpers
 */
export function isLineStringFeature(feature: Feature): feature is LineStringFeature {
  return feature.geometry.type === 'LineString';
}

export function isPointFeature(feature: Feature): feature is PointFeature {
  return feature.geometry.type === 'Point';
}

export function isPolygonFeature(feature: Feature): feature is PolygonFeature {
  return feature.geometry.type === 'Polygon';
}

export function isPerspectiveFeature(feature: Feature): feature is PerspectiveFeature {
  return isPointFeature(feature) && feature.properties.type === 'perspective';
}

export function isInflatorFeature(feature: Feature): feature is InflatorFeature {
  return isPointFeature(feature) && feature.properties.type === 'inflator';
}

export function isCompteurFeature(feature: Feature): feature is CompteurFeature {
  return isPointFeature(feature) && ['compteur-velo', 'compteur-voiture'].includes(feature.properties.type);
}

