import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  // update user

  const handleNameChange = (e) => {
    const updatedName = e.target.value;
    const updatedUser = { ...user };
    updatedUser.name = updatedName;
    setUser(updatedUser);
  };
  const handleEmailChange = (e) => {
    const updatedEmail = e.target.value;
    const updatedUser = { ...user };
    updatedUser.email = updatedEmail;
    setUser(updatedUser);
  };

  const handleUpdateUser = (e) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount > 0) {
          alert("Update Success");
          setUser({});
        }
      });

    e.preventDefault();
  };

  return (
    <div>
      <h2>Update: {user.name}</h2>
      <p>
        <small>{id}</small>
      </p>
      <form onSubmit={handleUpdateUser}>
        <input
          type="text"
          onChange={handleNameChange}
          value={user.name || ""}
        />
        <input
          type="email"
          onChange={handleEmailChange}
          value={user.email || ""}
        />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;
