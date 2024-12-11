


export default function StateCount({ label, value, selectedStates, handleStateChange }) {
    return (
        <label>
        <input
          type="checkbox"
          value={value}
          checked={selectedStates.includes(value)}
          onChange={handleStateChange}
        />
        {label}
      </label>
    );
}