import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    axios.post("http://localhost:5000/api/login", { username, password })
      .then(res => {
        alert(res.data.message);
        setLoggedIn(true);
      })
      .catch(err => {
        alert("Login failed");
        console.error(err);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/books")
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAddBook = () => {
    if (title && author) {
      axios.post("http://localhost:5000/api/books", { title, author })
        .then(() => {
          setBooks([...books, { title, author }]);
          setTitle("");
          setAuthor("");
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <h1>📚 Cloud based Library</h1>

      {!loggedIn ? (
        <>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <h2>Add a New Book</h2>
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /><br />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          /><br />
          <button onClick={handleAddBook}>Add Book</button>

          <h2>Books in the Library</h2>
          <ul>
            {books.map((book, idx) => (
              <li key={idx}>
                {book.title} by {book.author}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
