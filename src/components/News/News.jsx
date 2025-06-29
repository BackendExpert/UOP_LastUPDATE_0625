import axios from "axios";
import { useEffect, useState } from "react";

const useNEWSData = () => {
    const [newsdata, setnewsdata] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + "/news.php", {
            params: { action: "getallNEWS" },
            headers: { "Content-Type": "application/json" },
        })
        .then(res => {
            console.log(res.data);
            if (res.data.Result) {
                // Sort the news by the date field in descending order (most recent date first)
                const sortedNews = res.data.Result.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Get the most recent 6 records
                const lastSixNews = sortedNews.slice(0, 6);
                setnewsdata(lastSixNews);
            } else {
                setnewsdata([]);
            }
        })
        .catch(err => {
            console.error(err);
            setnewsdata([]);
        });
    }, []);

    return newsdata;
};

export default useNEWSData;
