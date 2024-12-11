import { useEffect, useState } from 'react';
import style from "./Summarytable.module.css";

export default function Summarytable() {
    const [stats, setStats] = useState(null);
    const [totalUploadKm, setTotalUploadKm] = useState(0); // New state for total upload km

    // Fetch the API data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://googledatacollectiondashboardapi.onrender.com/api/get_state_stats');
                const data = await response.json();
                console.log(data);
                setStats(data.stats); // Set stats to the array
                setTotalUploadKm(data.total_upload_km); // Set total km
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };
        fetchData();
    }, []);

    if (!stats) {
        return <div className={style.loading}>Loading...</div>;
    }

    return (
        <div className={`${style.flexchld} ${style.last}`}> 
            <div className={style.tableContainer}>
                <table className={style.ownershipTable}>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>State</th>
                            <th>Km Covered</th>
                            <th>Total Km</th>
                            <th>% of Total</th>
                            <th>Start Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.state}</td>
                                <td>{item.km.toFixed(2)}</td>
                                <td>{totalUploadKm.toFixed(2)}</td> 
                                <td>{item.percent.toFixed(2)}%</td>
                                <td>{item.startDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
