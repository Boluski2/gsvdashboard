import React, { useState, useEffect } from 'react';
import LegendHeading from "./Legendheadings";
import styles from "./Legend.module.css";
// import Basemap from './HubBasemaps';
import HubBasemapButtons from './HubBasemap';
import Slider from "./Dateslider";
import Searchbutton from './SearchButton';
import StateCount from './StateCount';


// Array of month names
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  export default function Legend({ changeOption, basemapOption, selectedStates, handleStateChange, states }) {
  const [sliderValues, setSliderValues] = useState([
  new Date('2024-02-21').getTime() / 86400000, 
  new Date().getTime() / 86400000
  ]);
  const [displayValues, setDisplayValues] = useState('');
  
  // Function to format dates with month names
  const formatDate = (date) => {
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()]; // Get month name from array
  const day = date.getDate().toString().padStart(2, '0'); // Ensure 2-digit day
  
  return `${day} ${month} ${year}`; // Example: "21 Feb 2024"
  };
  
  useEffect(() => {
  setDisplayValues(
  `${formatDate(new Date(sliderValues[0] * 86400000))} - ${formatDate(new Date(sliderValues[1] * 86400000))}`
  );
  }, [sliderValues]);
  
  const handleSearch = () => {
  const startDate = formatDate(new Date(sliderValues[0] * 86400000));
  const endDate = formatDate(new Date(sliderValues[1] * 86400000));
  
  alert(`Start Date: ${startDate}\nEnd Date: ${endDate}`);
  };
  

    return (
        <div className={styles.legend}>
            <LegendHeading>Basemaps with Labels</LegendHeading>
            <HubBasemapButtons
                label="Dark matter"
                value="Dark matter"
                checked={basemapOption === 'Dark matter'}
                onChange={changeOption}
            />
            <br />
            <HubBasemapButtons
                label="Positron"
                value="Positron"
                checked={basemapOption === 'Positron'}
                onChange={changeOption}
            />
            <br />
            <HubBasemapButtons
                label="Voyager"
                value="Voyager"
                checked={basemapOption === 'Voyager'}
                onChange={changeOption}
            />
            <LegendHeading>Basemaps without Labels</LegendHeading>
            <HubBasemapButtons
                label="Hub"
                // value="Dark matter2"
                checked={basemapOption === 'Dark matter2'}
                onChange={changeOption}
            />
            <br />
            <HubBasemapButtons
                label="State"
                // value="Positron2"
                checked={basemapOption === 'Positron2'}
                onChange={changeOption}
            />
            <br />
            <HubBasemapButtons
                label="Km"
                // value="Voyager2"
                checked={basemapOption === 'Voyager2'}
                onChange={changeOption}
            />
            <LegendHeading>Data Filters</LegendHeading>
            <Slider
                sliderValues={sliderValues}
                setSliderValues={setSliderValues}
                displayValues={displayValues}
                setDisplayValues={setDisplayValues}
            />
            <Searchbutton handleSearch={handleSearch} />
            <p></p>
            <LegendHeading>STATE Name</LegendHeading>
            <div className={styles.State}>
            {states.map((state) => (
            <StateCount
              key={state}
              label={state}
              value={state}
              selectedStates={selectedStates}
              handleStateChange={handleStateChange}
            />
          ))}
           
           </div>
        </div>
    );
}
