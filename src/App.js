import React, { useState, useEffect, useCallback, useRef } from "react";
import './App.css';
import { debounce } from "lodash";
const axios = require('axios').default;


function App() {
  const [search, setSearch] = useState(null);
  const [debounceSearch, setDebounceSearch] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);


  const handleOnChange = (event) => {
    setSearch(event.target.value);
    setDebounceSearch(event.target.value);
  };


  const handleSubmit = (e) => {
    console.log("name", nameInput.current.value);
    console.log("email", emailInput.current.value);
    console.log("password", passwordInput.current.value);
  };

  const handleFocus = (name) => {

    if (name === "nameInput") {
      nameInput.current.focus()
    }
    if (name === "emailInput") {
      emailInput.current.focus()
    }
    if (name === "passwordInput") {
      passwordInput.current.focus()
    }

  };

  const handleReset = () => {
    nameInput.current.value = "";
    emailInput.current.value = "";
    passwordInput.current.value = "";
  };

  const searchApi = () => {
    if (debounceSearch !== null) {
      axios.get(`https://api.giphy.com/v1/gifs/search?api_key=290WqROqWOxuba8lbbhwktXdx9cDIMWA&q='${debounceSearch}`)
        .then(function (response) {
          // handle success
          console.log(response);
          setSearchResult(response?.data?.data)
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
      <div className="container">
        <p>part 1</p>
        <label>
          Name:
          <input placeholder="name" ref={nameInput} type="text" />
        </label>
        <label>
          Email:
          <input placeholder="email" ref={emailInput} type="text" />
        </label>


        <label>
          Password:
          <input placeholder="password" ref={passwordInput} type="text" />
        </label>
        <hr />
        <button onClick={() => handleFocus("nameInput")}>Focus Name Input</button>
        <button onClick={() => handleFocus("emailInput")}>Focus Email Input</button>
        <button onClick={() => handleFocus("passwordInput")}>Focus Password Input</button>
        <hr />
        <button onClick={() => handleSubmit()}>Submit</button>
        <button onClick={() => handleReset()}>Reset</button>
      </div>
     
      <div className="container">
     
        <hr />
        <div>
        <p>part 2</p>
        <div className="row">
        <label>
          Search:
          <input
            size="md"
            name="search"
            value={search}
            placeholder={"Search with debounce"}
            onChange={(event) => handleOnChange(event)}

          />
        </label>
        </div>
      </div>
      <div className="row">
        {searchResult?.map((eachItem, key) => (
          <div key={key} className="col-md-3 card">
            <div>Id: {eachItem?.id}</div>
            <div>Title: {eachItem?.title}</div>
            <div>rating: {eachItem?.rating}</div>
            <div>Username: {eachItem?.username}</div>
          </div>
        ))}
        </div>


      </div>
    </React.Fragment>

  )
}

export default App;
