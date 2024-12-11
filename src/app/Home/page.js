"use client";
import React from 'react';
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import { Map } from 'react-map-gl/maplibre';

const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

export default function Homepage({mapstyle}) {
    return <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}>
        <MapView id="map" width="100%" controller>
            <Map mapStyle={MAP_STYLE} />
        </MapView>
    </DeckGL>
}