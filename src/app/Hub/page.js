"use client"

import { getWorkerCount } from "maplibre-gl"
import { useEffect, useState } from "react"
import Deckmap from "../../../components/Map/Deckmap"
import { GeoJsonLayer, PathLayer } from "deck.gl"
import HubLegend from "../../../components/Legend/HubLegend"
import HubHome from "../../../components/Hub/Hub"
import StateCount from "../../../components/Legend/StateCount"



const MAP_STYLE = {
  'Positron': 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  'Dark matter': "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  "Voyager": "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  'Dark matter2': "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json",
  'Positron2': "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json",
  "Voyager2": "https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json"
};

const INITIAL_VIEW_STATE = {
  longitude: 3.3792, 
    latitude: 6.5244,   
    zoom: 8  
};

const NIGERIAN_STATES = [
    "Delta", "Edo", "Ekiti", "Lagos", "Ogun", "Ondo", "Osun", 
    "Oyo", "Rivers", "Bayelsa", "Cross River", "Kwara"
  ];
  
  
  
  export default function Home() {
  
    const [selectedBasemap, setSelectedBasemap] = useState('Dark matter');
    const [selectedStates, setSelectedStates] = useState([]);
    const [layers, setLayers] = useState([]);
    const [stateCache, setStateCache] = useState({}); 
  
    const handleOptionChange = (event) => {
      setSelectedBasemap(event.target.value);
    };
  
    // Pre-fetch state data on component mount
    useEffect(() => {
      const fetchDataForAllStates = async () => {
        const cache = {};
  
        for (const state of NIGERIAN_STATES) {
          try {
            const response = await fetch(
              `https://googledatacollectiondashboardapi.onrender.com/api/get_all_google_json_roads?state_name=${state}`
            );
            const data = await response.json();
            cache[state] = data;
          } catch (error) {
            console.error(`Error fetching data for ${state}:`, error);
          }
        };
  
        setStateCache(cache);
      };
  
      fetchDataForAllStates();
    }, []);
  
    // Handle state checkbox change
    const handleStateChange = (event) => {
      const state = event.target.value;
  
      if (event.target.checked) {
        setSelectedStates((prev) => [...prev, state]);
  
        // Add the state's data to the layers
        const stateData = stateCache[state] || [];
        const newLayer = createPathLayer(state, stateData);
        setLayers((prevLayers) => [...prevLayers, newLayer]);
      } else {
        setSelectedStates((prev) => prev.filter((s) => s !== state));
  
        // Remove the layer for the unchecked state
        setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== state));
      }
    };
  
    // Create a PathLayer from state data
    const createPathLayer = (state, data) => {
      return new PathLayer({
        id: state,
        data: data.map((feature) => ({
          path: feature.geometry.coordinates,
          color: feature.status === 100 ? [0, 255, 0] : [255, 0, 0],
        })),
        getPath: (d) => d.path,
        getColor: (d) => d.color,
        getWidth: 20,
        getDashArray: [8, 4],
        pickable: true,
        autoHighlight: true,
        highlightColor: [0, 255, 255],
      });
    };
  
    

       return (
        <main className={StyleSheet.container}>
            <div className={StyleSheet.body}>
                <HubLegend changeOption={handleOptionChange} basemapOption={selectedBasemap}   selectedStates={selectedStates}  handleStateChange={handleStateChange}  states={NIGERIAN_STATES}  />
                <Deckmap mapstyle={MAP_STYLE[selectedBasemap]} view_state={INITIAL_VIEW_STATE} layers={layers} className={StyleSheet.deckgl} />
            </div>
            <HubHome />
        </main>
    );
   
}