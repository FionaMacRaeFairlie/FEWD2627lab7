import { useState, useCallback, useEffect } from "react";
import Login from "./Login";

export default function StaffPage2() {
    const [token, setToken] = useState("");
    const [data, setData] = useState([]);

    const url = "http://localhost:3001/viewOrders";
    const settings = {
        method: "GET",
        headers: {
            Authorization: token,
        },
    };

    const fetchData = useCallback(() => {
        fetch(url, settings)
            .then((response) => response.json())
            .then((incomingData) => {
                console.log(incomingData)
                setData(incomingData)
            })
            .catch((err) => console.error(err));
    }, [token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!token) {
        return <Login setToken={setToken} />;
    }

    return (
        <div>
            {data.map((order, index) => (
                <div key={order._id}>order {index + 1} : {order.order} </div>
            ))}
        </div>
    )
}



