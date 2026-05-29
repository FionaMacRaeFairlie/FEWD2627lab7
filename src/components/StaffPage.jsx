import { useState, useCallback, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Login from "./Login";
import useToken from "./useToken";

export default function StaffPage() {
  // const [token, setToken] = useState("");
  const { token, setToken } = useToken();
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
        console.log(incomingData);
        setData(incomingData);
      })
      .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const removeItem = useCallback(
    (e, item) => {
      console.log("item to delete: ", item._id);
      const settings = {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ _id: item._id }),
      };
      const url = "http://localhost:3001/deleteOrder";
      fetch(url, settings)
        .then(() => fetchData())
        .catch((err) => console.error(err));
    },
    [token]
  );

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      {/* {data.map((item, index) => (
                <div key={item._id} onDoubleClick={(e) => removeItem(e, item)} >Table{item.order[1]} (customer name: {item.order[0]}) : {item.order[2].map(item => item + ", ")}
                </div>
            ))}
            <p></p> */}
      {/* Alternative layout with list */}
      {/* {data.map(item => (
                <ul><li onDoubleClick={(e) => removeItem(e, item)}>Table number{item.order[1]}: {item.order[2].map(item => item + ", ")}</li></ul>
            ))} */}

      <p> </p>
      {/* Alternative layout using tabs */}
      <Tabs>
        {data.map((item) => (
          <Tab
            eventKey={item.order[1]}
            title={"Order for Table" + item.order[1]}
          >
            <div onDoubleClick={(e) => removeItem(e, item)}>
              <p>
                {" "}
                Order for {item.order[0]} at Table{item.order[1]}{" "}
              </p>
              <ul>
                {item.order[2].map((item) => (
                  <li> {item}</li>
                ))}
              </ul>
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
