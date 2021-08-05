import React from "react";
import "../Style/formtable.css";

const TableInfo = (props) => {
  //console.log(props);
  const users = props.user;
  const deleteData = props.deleteData;
  const editUser = props.editUser;

  return (
    <div className="container">
      <table>
        <div className="tableHead">
          <thead>
            <tr>
              <td className="stretch1">Expense-Name</td>
              <td className="stretch2">Date</td>
              <td className="stretch3">Amount</td>
            </tr>
          </thead>
        </div>
        {users.map((item) => {
          return (
            <div className="tableBody">
              <tr>
                <td className="stretch11">{item.expName}</td>
                <td className="stretch22"> {item.date} </td>
                <td className="stretch33"> {item.amount} </td>
                <td>
                  <button className="btn" onClick={() => editUser(item)}>
                    {/* function is passed though pops and called.. */}
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn" onClick={() => deleteData(item._id)}>
                    {/* function is passed though pops and called.. */}
                    Delete
                  </button>
                </td>
              </tr>
            </div>
          );
        })}
      </table>
    </div>
  );
};

export default TableInfo;
