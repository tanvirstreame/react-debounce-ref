import React, { useState, useEffect, useCallback } from "react";
import './App.css';
import { debounce } from "lodash";
const axios = require('axios').default;


function App() {
  const [search, setSearch] = useState(null);
  const [debounceSearch, setDebounceSearch] = useState(null);

  const handleOnChange = (event) => {
    setSearch(event.target.value);
    setDebounceSearch(event.target.value);
  };

  const searchApi = () => {
    if (debounceSearch !== null) {
      axios.get(`https://api.giphy.com/v1/gifs/search?api_key=290WqROqWOxuba8lbbhwktXdx9cDIMWA&q='${debounceSearch}`)
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
  };

  const delayedQuery = useCallback(debounce(searchApi, 500), [debounceSearch]);


  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [debounceSearch, delayedQuery]);

  return (
    <React.Fragment>
      <div>
        <p>part 1</p>
        <label>
          Name:
          <input placeholder="name" type="text" />
        </label>
        <label>
          Email:
          <input placeholder="email" type="text" />
        </label>


        <label>
          Password:
          <input placeholder="password" type="text" />
        </label>
        <hr />
        <button>Focus Name Input</button>
        <button>Focus Email Input</button>
        <button>Focus Password Input</button>
        <hr />
        <button>Submit</button>
        <button>Reset</button>
      </div>
      <div>
        <hr />
        <p>part 2</p>
        <label>
          Search:
          <input
            size="md"
            name="search"
            value={search}
            onChange={(event) => handleOnChange(event)}

          />
        </label>
      </div>
    </React.Fragment>

  )
}

export default App;
