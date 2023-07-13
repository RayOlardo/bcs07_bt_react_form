import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../redux/actions/formActions";
import { validateForm } from "../validation/validateForm";

const FormStudent = () => {
  // set State dữ liệu
  const [data, setData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
  });

  // tạo mảng để thêm sinh viên
  const [studentsList, setStudentsList] = useState([]);


  // tạo state submit
  const [btnAdd, setBtnAdd] = useState(true)


  // validate rỗng
  const isNotEmpty = validateForm(data)



  const handleChange = (event) => {
    event.persist();
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    console.log(value);
  };


  // validate rỗng




  // useDispatch
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    if(!isNotEmpty){
      btnAdd(false)
      return;
    }
    event.preventDefault();
    const newStudent = { ...data };
    setStudentsList([...studentsList, newStudent]);
    dispatch(addStudent(data));
    setData({
      id: "",
      name: "",
      phone: "",
      email: "",
    });
    console.log(data);
  };

  //  useSelector
  return (
    <div>
      <div className="container">
        <div className="mt-3">
          <h1>Thông tin sinh viên</h1>
          <form onSubmit={handleSubmit} className="card text-dark bg-light">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="id">ID</label>
                  <input
                    onChange={handleChange}
                    value={data.id}
                    className="form-control"
                    type="text"
                    id="id"
                  />
                  <p className="mt-2 text-danger"></p>
                </div>
                <div className="col-6">
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={handleChange}
                    value={data.name}
                    className="form-control"
                    type="text"
                    data-type="letter"
                    id="name"
                  />
                  <p className="mt-2 text-danger"></p>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-6">
                  <label htmlFor="phone">Phone</label>
                  <input
                    value={data.phone}
                    onChange={handleChange}
                    className="form-control"
                    type="text"
                    data-type="number"
                    id="phone"
                  />
                  <p className="mt-2 text-danger"></p>
                </div>
                <div className="col-6">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={handleChange}
                    value={data.email}
                    className="form-control"
                    type="text"
                    data-type="email"
                    id="email"
                  />
                  <p className="mt-2 text-danger"></p>
                </div>
              </div>
            </div>
            <div style={{ borderTop: "0" }} className="card-footer bg-light">
              <button disabled={btnAdd} type="submit" className="btn btn-success">
                Add new students
              </button>
              <button className="btn btn-warning ms-3">Update</button>
            </div>
          </form>
        </div>
        <table className="table mt-4" cellPadding={15}>
          <thead className="bg-dark text-white">
            <th>ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </thead>
          <tbody>
            {studentsList.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                  <button className="btn btn-danger">Xoá</button>
                  <button className="btn btn-warning">Sửa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormStudent;