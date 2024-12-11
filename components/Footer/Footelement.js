import styles from "./Footelement.module.css"


export default function Footchild({ title, KilometersHead, percentHead, km, percentage }) {

 
    return <div className={styles.flexchild}>
        <div className={styles.divHeader}>
            <div className={styles.title}>
                {title}
            </div>
            <div>
                <table className={styles.detailsTable}>
                    <thead>
                        <tr className={styles.tableHeader}>
                            <th style={{ borderRight: "1px solid white", color: "#00ff00" }}>
                                {KilometersHead}
                            </th>
                            <th style={{ color: "#00ff00" }}>
                                {percentHead}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.tableHeader}>
                            <td style={{ borderRight: "1px solid white" }}>
                                <span class="landDoc" id="cam" style={{ color: "#00ff00" }}>
                                   {km}
                                </span>
                            </td>
                            <td>
                                <span class="landDoc" id="percent" style={{ color: "#00ff00" }}>
                                       {percentage}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

}