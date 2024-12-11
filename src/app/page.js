"use client"
import styles from "./page.module.css";
import Deckmap from "../../components/Map/Deckmap";
import BasemapButtons from "../../components/Legend/Basemaps";
import { useEffect, useState } from "react";
import Legend from "../../components/Legend/Legend";
import { GeoJsonLayer, PathLayer } from "deck.gl";
import Footnote from "../../components/Footer/Footer";
import StateCount from "../../components/Legend/StateCount";



const MAP_STYLE = {
  'Positron': 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  'Dark matter': "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  "Voyager": "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  'Dark matter2': "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json",
  'Positron2': "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json",
  "Voyager2": "https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json"


}
const INITIAL_VIEW_STATE = {
  longitude: 4.5000, 
    latitude: 6.5000,   
    zoom: 6  
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
    <main className={styles.container}>
      <div className={styles.body}>
        <Legend changeOption={handleOptionChange} basemapOption={selectedBasemap}   selectedStates={selectedStates}  handleStateChange={handleStateChange}  states={NIGERIAN_STATES} />
      <Deckmap mapstyle={MAP_STYLE[selectedBasemap]} view_state={INITIAL_VIEW_STATE} layers={layers} className={styles.deckgl} />
      </div>
      <Footnote />
    </main>
  );
}
