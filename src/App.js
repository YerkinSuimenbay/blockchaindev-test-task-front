import { useState } from "react";

import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      setEvents([]);
      setCount(0);
      const response = await fetch(`${process.env.REACT_APP_API}api/v1/events`);
      const { events, count } = await response.json();
      console.log({ events });
      setCount(count);
      setEvents(events);
    } catch (error) {
      console.log("Something went wrong:", error);
      setError(`Something went wrong: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
    }

    if (error) {
      return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
    }

    if (events.length) {
      return (
        <>
          <p>Count: {count}</p>
          <table>
            <tr>
              <th>#</th>
              <th>address</th>
              <th>blockHash</th>
              <th>blockNumber</th>
              <th>data</th>
              <th>logIndex</th>
              <th>removed</th>
              <th>topics</th>
              <th>transactionHash</th>
              <th>transactionIndex</th>
              <th>returnValues.from</th>
              <th>returnValues.to</th>
              <th>returnValues.value</th>
              <th>signature</th>
              <th>blockNumber</th>
            </tr>

            {events.map((event, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{event.address}</td>
                  <td>{event.blockHash}</td>
                  <td>{event.blockNumber}</td>
                  <td>{event.data}</td>
                  <td>{event.logIndex}</td>
                  <td>{String(event.removed)}</td>
                  <td>
                    {event.topics.map((topic) => {
                      return <p>{topic}</p>;
                    })}
                  </td>
                  <td>{event.transactionHash}</td>
                  <td>{event.transactionIndex}</td>
                  <td>{event.returnValues._from}</td>
                  <td>{event.returnValues._to}</td>
                  <td>{event.returnValues._value}</td>
                  <td>{event.signature}</td>
                  <td>{event.blockNumber}</td>
                </tr>
              );
            })}
          </table>
        </>
      );
    }

    return null;
  };

  return (
    <div className="App">
      <h2 style={{ textAlign: "center" }}>
        Welcole to BlockchainDev Test Task
      </h2>

      <p style={{ textAlign: "center" }}>
        Click the button to render the events(from 17612968 to 17612970) of the
        USDT transfer token on the ETHERNET network
      </p>
      <button
        onClick={handleClick}
        style={{ display: "block", margin: "0 auto" }}
      >
        Render
      </button>

      {renderContent()}
    </div>
  );
}

export default App;
