import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'jquery-ui/themes/base/all.css';
import 'jquery-ui/ui/widgets/slider';
import style from "./Dateslider.module.css"

const Slider = ({ sliderValues, setSliderValues, displayValues, setDisplayValues }) => {
    useEffect(() => {
        const formatDate = (date) => {
            const year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }

            return year + "-" + month + "-" + day;
        };

        const today = new Date();
        const startDate = new Date('2024-02-21');

        $("#slider-range").slider({
            range: true,
            min: startDate.getTime() / 86400000,
            max: today.getTime() / 86400000,
            step: 1,
            values: sliderValues,
            slide: (event, ui) => {
                setSliderValues(ui.values);
                setDisplayValues(`${formatDate(new Date(ui.values[0] * 86400000))} - ${formatDate(new Date(ui.values[1] * 86400000))}`);
            }
        });

        setDisplayValues(`${formatDate(new Date(sliderValues[0] * 86400000))} - ${formatDate(new Date(sliderValues[1] * 86400000))}`);
    }, [sliderValues, setSliderValues, setDisplayValues]);

    

    return (
        <div>
            <p>
                <label htmlFor="amount"> {displayValues}</label>

            </p>
            <div id="slider-range"></div> 
        </div>
    );
};

export default Slider;