import styles from "./Legendheadings.module.css"

export default function LegendHeading({ children }) {
    return <h1 className={styles.heading}>{children}</h1>
}