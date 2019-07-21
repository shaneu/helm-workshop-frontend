import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';


const Secret = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/secret");
        const formatted = await response.json();

        setIsLoading(false);
        setMessage(formatted);
      } catch (err) {
        console.log(err);

        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [])

  return (
    <div>
      {isError ? (
        <div>
          <p>Something went wrong</p>
          <Link to="/">Home</Link>
        </div>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
            <div>
              <h1>{message}</h1>
              <Link to="/">Home</Link>
            </div>
          )
      }
    </div>
  );
}

export default Secret;