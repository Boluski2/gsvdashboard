import styles from "./Footer.module.css";
import Footchild from "./Footelement";
import Summarytable from "./Summarytable";
import { useEffect, useState } from "react";

export default function Footnote() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(()  => {
        const fetchData = async () => {
            try {
                const response = await fetch ("https://googledatacollectiondashboardapi.onrender.com/api/get_stats")
                const result = await response.json();
                setData(result);
                setLoading(false);
            }catch (error) {
                console.error ("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData()
    }, [])

     // Show loading message if data is still being fetched
//   if (loading) {
//     return <div>Loading...</div>;
//   }

    // Helper function to round values to 4 decimal places
    const roundTo2Decimal = (value) => (value !== undefined && value !== null ? value.toFixed(2) : "0.0000");

    return (<div className={styles.footer}>
        
        <Footchild title={"Collected Data 2023"} 
        KilometersHead="Kilometers" 
        percentHead="% of Total" 
        km={loading ? "Loading..." : roundTo2Decimal(data?.covered_km)} 
        percentage={loading ? "Loading..." : roundTo2Decimal(data?.percent_covered)}
        />

        <Footchild title="Collected Data 2024" 
        KilometersHead="Kilometers" 
        percentHead="% of Total" 
        km={roundTo2Decimal(data?.total_upload_km)} 
        percentage={loading ? "Loading..." : roundTo2Decimal(data?.total_uploads)}
        />

        <Footchild title="Camera 1" 
        KilometersHead="Kilometers" 
        percentHead="% of Total" 
        km={loading ? "Loading..." : roundTo2Decimal(data?.cam1_km)} 
        percentage={loading ? "Loading..." : roundTo2Decimal(data?.cam1_percent)}
        />

        <Footchild title="Camera 2" 
        KilometersHead="Kilometers" 
        percentHead="% of Total" 
        km={loading ? "Loading..." : roundTo2Decimal(data?.cam2_km)} 
        percentage={roundTo2Decimal(data?.cam2_percent)}
        />

        <Summarytable />
        
        <Footchild title="Camera 3" 
        KilometersHead="Kilometers" 
        percentHead="% of Total" 
        km={loading ? "Loading..." : roundTo2Decimal(data?.cam3_km)} 
        percentage={loading ? "Loading..." : roundTo2Decimal(data?.cam3_percent)}/>

        <Footchild title="Camera 4"
        KilometersHead="Kilometers" 
        percentHead="% of Total" 
        km={loading ? "Loading..." : roundTo2Decimal(data?.cam4_km)} 
        percentage={loading ? "Loading..." : roundTo2Decimal(data?.cam4_percent)}/>

        <Footchild title="Camera 5" 
        KilometersHead="Kilometers" 
        percentHead="% of Total" 
        km={loading ? "Loading..." : roundTo2Decimal(data?.cam5_km)} 
        percentage={loading ? "Loading..." : roundTo2Decimal(data?.cam5_percent)}/>

        <Footchild title="Camera 6" 
        KilometersHead="Kilometers" 
        percentHead="% of Total" 
        km={loading ? "Loading..." : roundTo2Decimal(data?.cam6_km)} 
        percentage={loading ? "Loading..." : roundTo2Decimal(data?.cam6_percent)}/>
    </div>
    )
}