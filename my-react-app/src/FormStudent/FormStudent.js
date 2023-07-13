import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../redux/actions/formActions";
import {
  validateEmail,
  validateForm,
  validateName,
  validatePhone,
} from "../validation/validateForm";

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
  const [btnAdd, setBtnAdd] = useState(true);

  // validate rỗng
  const isNotEmpty = validateForm(data);
  // validate name
  const isText = validateName(data);
  // valite number
  const isNumber = validatePhone(data);
  // validate email
  const isEmail = validateEmail(data);

  const handleChange = (event) => {
    event.persist();
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    console.log(value);
    if (isNotEmpty && isText && isNumber && isEmail) {
      setBtnAdd(false);
    } else {
      setBtnAdd(true);
    }
  };

  // useDispatch
  const dispatch = useDispatch();


  // thêm sinh viên
  const handleSubmit = (event) => {
    if (!isNotEmpty) {
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
    setBtnAdd(true)
  };


  // xoá sinh viên
  const deleteStudent = (id) => {
    const updateList = studentsList.filter((student)=> student.id !== id);
      setStudentsList(updateList)
  }
  // lấy dữ liệu từ hàm findStudent
  const [editStudent, setEditStudent] = useState(null)

  // tìm sinh viên
  const findStudent = (id) => {
    const selectedStudent = studentsList.find((student) => student.id == id);
    setData({
      id: selectedStudent.id,
      name: selectedStudent.name,
      phone: selectedStudent.phone,
      email: selectedStudent.email,
    })
    setEditStudent(selectedStudent)
  }
  console.log(editStudent)


  // cập nhật sinh viên
  const updateStudent = () => {

    if(!editStudent){
      return
    }
    const updateList = studentsList.map((student)=>{
      if(student.id === editStudent.id){
        return data
      }
      return student;
    })
    setStudentsList(updateList)
    setEditStudent(null)
    setData({
      id: "",
      name: "",
      phone: "",
      email: "",
    });
    setBtnAdd(true)
  }
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
                    disabled={editStudent}
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
              <button
                disabled={btnAdd}
                type="submit"
                className="btn btn-success"
              >
                Add new students
              </button>
              <button
              disabled={!editStudent}
              type="button"
              onClick={updateStudent}
              className="btn btn-warning ms-3">Update</button>
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
            {studentsList.map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>
                  <button
                  onClick={()=>{
                    deleteStudent(student.id)
                  }}s
                  className="btn btn-danger">Xoá</button>
                  <button 
                  onClick={()=>{
                    findStudent(student.id)
                  }}
                  className="btn btn-warning">Sửa</button>
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
