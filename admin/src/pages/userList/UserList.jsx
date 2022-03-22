import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"

export default function UserList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getUser = async ()=>{
    try {
      const res = await axios.get("/user/alluser",{
        headers: {
          token:
          "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  getUser()
    
  }, [])

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  console.log(data)
  
  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic || "https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 230 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
}
