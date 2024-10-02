import { useEffect, useState, useRef } from "react";

const useMyFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef();

  const url = "https://api.oulunliikenne.fi/proxy/graphql";
  const query = `query {
        carParks {
          name
          maxCapacity
          spacesAvailable
        }
      }`;

  const getData = () => {
    setError(null);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    setLoading(true);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      signal: signal,
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data.carParks);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(error);
          setLoading(false);
          console.log("Error:", error);
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error, getData };
};

export default useMyFetch;
