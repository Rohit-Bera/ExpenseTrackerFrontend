import React from "react";
import "../Style/formInput.css";
import TableInfo from "./FormTable";
import { useState, useEffect } from "react";
import axios from "axios";

// GetInput function is used to take the input from the user..
const GetInput = () => {
  //form data
  const [data, setData] = useState([]); // get data

  //post data
  const [users, setUsers] = useState({
    fullName: "",
    expName: "",
    date: "",
    amount: null,
  });

  useEffect(() => {
    receiveData();
  }, []);

  // for userid

  const [userId, setUserId] = useState("");

  //to not referesh the page..
  const Referesh = (e) => {
    e.preventDefault();
  };

  //to change name
  const FormName = (e) => {
    // console.log("e is ::",e);
    const name = e.target.name; // e.target = name , value.
    const value = e.target.value;
    setUsers({ ...users, [name]: value }); //setting data using bracket notation
  };

  // post data in database..
  const sendData = async () => {
    console.log("users ::", users);
    try {
      const send = await axios.post(
        "https://exptracker20.herokuapp.com/addUser",
        users
      );
      receiveData();
    } catch (error) {
      console.log("error: ", error);
    }
    setUsers({
      ...users,
      ["fullName"]: "",
      ["expName"]: "",
      ["date"]: "",
      ["amount"]: "",
    });
  };

  // get data from database
  const receiveData = async () => {
    try {
      const databaseData = await axios.get(
        "https://exptracker20.herokuapp.com/getUser"
      );

      setData(databaseData.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  //delete api
  const deleteData = async (_id) => {
    console.log("_id: ", _id);

    try {
      const response = await axios.delete(
        `https://exptracker20.herokuapp.com/${_id}`
      );
      receiveData();
    } catch (error) {
      console.log("error: ", error);
    }
    setUsers({
      ...users,
      ["fullName"]: "",
      ["expName"]: "",
      ["date"]: "",
      ["amount"]: "",
    });
  };

  //updateapi..
  const editUser = async (item) => {
    setUsers({
      ...users,
      ["fullName"]: item.fullName,
      ["expName"]: item.expName,
      ["date"]: item.date,
      ["amount"]: item.amount,
    });
    setUserId(item._id);
    console.log("users", users);
  };

  const updateUser = async () => {
    // console.log("users", users);
    // console.log("userId ", userId);
    try {
      const response = await axios.put(
        `https://exptracker20.herokuapp.com/${userId}`,
        users
      );
      receiveData();
    } catch (error) {
      console.log("error: ", error);
    }

    setUsers({
      ...users,
      ["fullName"]: "",
      ["expName"]: "",
      ["date"]: "",
      ["amount"]: "",
    });
  };

  return (
    <div className="main">
      <div className="formInput">
        <h1>Expense-Tracker</h1>
        <form onSubmit={(e) => Referesh(e)}>
          <div className="flex">
            <p>Name </p>
            <input
              type="text"
              name="fullName"
              placeholder="Full name..."
              className="one"
              onChange={FormName}
              value={users.fullName}
            />
          </div>
          <div className="flex">
            <p>Expense-Name </p>
            <input
              type="text"
              name="expName"
              placeholder="expenses name you made...."
              className="two"
              onChange={FormName}
              value={users.expName}
            />
          </div>
          <div className="flex">
            <p>Date </p>
            <input
              type="date"
              name="date"
              className="three"
              onChange={FormName}
              value={users.date}
            />
          </div>
          <div className="flex">
            <p>Amount </p>
            <input
              type="text"
              name="amount"
              placeholder="enter Amount..."
              className="four"
              onChange={FormName}
              value={users.amount}
            />
          </div>
          <div className="button">
            <button className="btn" onClick={sendData}>
              Send
            </button>
            <button className="btn" onClick={receiveData}>
              Receive
            </button>
            <button className="btn" onClick={updateUser}>
              Update
            </button>
          </div>
        </form>
      </div>
      <TableInfo user={data} deleteData={deleteData} editUser={editUser} />
    </div>
  );
};

export default GetInput;
