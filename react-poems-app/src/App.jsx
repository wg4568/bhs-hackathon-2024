import React, { useState, useRef } from "react";

function Poem(props) {
    return (
        <p>
            <strong>{props.title}</strong>
            <br />
            By {props.author}
        </p>
    );
}

export default function App() {
    const inputBox = useRef(null);
    const [poems, setPoems] = useState([]);

    function poemSearch() {
        var query = inputBox.current.value;

        fetch(`https://poetrydb.org/title/${query}/title,author.json`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 404) {
                    setPoems([]);
                } else {
                    setPoems(data);
                }
            });
    }

    return (
        <main>
            <h1>Poem Search</h1>

            <input ref={inputBox} placeholder="Search for a poem" />
            <button onClick={poemSearch}>Search</button>

            <h1>Results</h1>

            <p>Found {poems.length} results</p>

            <div>
                {poems.map((poem, idx) => (
                    <Poem key={idx} {...poem} />
                ))}
            </div>
        </main>
    );
}
