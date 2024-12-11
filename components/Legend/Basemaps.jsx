import Styles from "./Basemaps.module.css"

export default function BasemapButtons({ label, value, checked, onChange }) {
    return (
        <label>
            <input
                type="radio"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
    );
}