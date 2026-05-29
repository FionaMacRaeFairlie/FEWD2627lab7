import { useEffect, useState, useCallback } from "react";
import Login from "./Login";
import useToken from "./useToken";

export default function StaffPageDashboard() {
  // const [token, setToken] = useState();
  const { token, setToken } = useToken();
  const [orders, setOrders] = useState([
    { name: "", table: "", foodOrder: [""], _id: "" },
  ]);
  const [show, setShow] = useState(true);

  const fetchData = useCallback(() => {
    const settings = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    const url = "http://localhost:3001/viewOrders";
    fetch(url, settings)
      .then((response) => response.json())
      .then((incomingData) => {
        console.log(incomingData);
        let customerOrder = [{ name: "", table: "", foodOrder: [] }];
        let formattedData = incomingData.map((item, index) => {
          let name = item.order[0];
          let table = item.order[1];
          let foodOrder = item.order.slice(2, item.order.length);
          customerOrder[index] = { name, table, foodOrder, _id: item._id };
        });
        setOrders(customerOrder);
      })
      .catch((err) => console.error(err));
  }, [token]);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="container-fluid">
      <h1>Staff Dashboard</h1>
      <div>
        <h2>Current Orders</h2>
        <p>Double click on the title to remove an order once processed.</p>
        {orders.map((item) => (
          <div className="card" key={item._id}>
            <h3 class="card-header" onDoubleClick={(e) => removeItem(e, item)}>
              Table number: {item.table} Customer name: {item.name}
            </h3>
            <div className="card-body">
              <ul className="list-group">
                {item.foodOrder.map((element) => (
                  <div>
                    <li className="list-group-item" key={element._id}>
                      {element}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
