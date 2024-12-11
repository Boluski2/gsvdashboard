import styles from './SearchButton.module.css';


export default function Searchbutton({ handleSearch }) {
    return (
        <input type="button" className={styles.inputButton} value="Query" onClick={handleSearch} />

    )
}