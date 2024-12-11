"use client";
import React from 'react';
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import { Map } from 'react-map-gl/maplibre';
import { styles } from "./Deckmaps.module.css"

export default function Deckmap({ mapstyle, view_state, layers }) {

    return <DeckGL
        initialViewState={view_state}
        controller={true}
        layers={layers}
    >
        <MapView id="map" width="100%" height="100%" controller>
            <Map mapStyle={mapstyle} />
        </MapView>
    </DeckGL>
}