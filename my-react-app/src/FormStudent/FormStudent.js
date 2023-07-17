import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../redux/actions/formActions";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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

  // báo lỗi khi người dùng nhập không đúng yêu cầu
  const [error, setError] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
  });

  // h lấy type input

  // tạo mảng để thêm sinh viên
  const [studentsList, setStudentsList] = useState([]);

  // tạo state submit
  const [btnAdd, setBtnAdd] = useState(true);
  // tạo state arrang
  const [btnArrange, setBtnArrange] = useState(true);

  // validate rỗng
  const isNotEmpty = validateForm(data);
  // validate name
  const isText = validateName(data);
  // valite number
  const isNumber = validatePhone(data);
  // validate email
  const isEmail = validateEmail(data);

  // hàm nhận dữ liệu
  const handleChange = (e) => {
    e.persist();
    const { id, value, dataset } = e.target;
    const { type } = dataset;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    // console.log(value);
    console.log(type);
    // check và báo lỗi cho từng input
    switch (type) {
      case "number":
        {
          const regexNumber = /^\d+$/;
          const result = regexNumber.test(data.phone);
          if (!result) {
            setError((prevError) => ({
              ...prevError,
              [id]: "Bạn đang nhập không đúng kiểu dữ liệu số!!!",
            }));
          } else {
            setError((prevError) => ({
              ...prevError,
              [id]: "",
            }));
          }
        }
        break;
      case "letter":
        {
          const regexLetter = /^[a-zA-Z\u00C0-\u00FF\s]+$/;
          const result = regexLetter.test(data.name);
          if (!result) {
            setError((prevError) => ({
              ...prevError,
              [id]: "Bạn đang nhập không đúng kiểu dữ liệu chữ!!!",
            }));
          } else {
            setError((prevError) => ({
              ...prevError,
              [id]: "",
            }));
          }
        }
        break;
      case "email":
        {
          const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const result = regexEmail.test(data.email);
          if (!result) {
            setError((prevError) => ({
              ...prevError,
              [id]: "Bạn đang nhập không đúng kiểu dữ liệu email!!!",
            }));
          } else {
            setError((prevError) => ({
              ...prevError,
              [id]: "",
            }));
          }
        }
        break;
    }

    // check nhập đủ và đúng định dạng sẽ disabled button thành false
    if (isNotEmpty && isText && isNumber && isEmail) {
      setBtnAdd(false);
    } else {
      setBtnAdd(true);
    }
  };

  // useDispatch
  const dispatch = useDispatch();

  // hàm thêm sinh viên
  const handleSubmit = (e) => {
    if (!isNotEmpty && !isText && !isNumber && !isEmail) {
      return;
    }
    e.preventDefault();
    const newStudent = { ...data };
    setStudentsList([...studentsList, newStudent]);
    // lưu dữ liệu xuống local
    localStorage.setItem("studentList", JSON.stringify(studentsList));
    dispatch(addStudent(data));
    setData({
      id: "",
      name: "",
      phone: "",
      email: "",
    });
    setBtnAdd(true);
    if (studentsList.length >= 1) {
      setBtnArrange(false);
    }
  };

  // lấy dữ liệu từ local
  useEffect(() => {
    const storeDataList = localStorage.getItem("studentList");
    if (storeDataList) {
      setStudentsList(JSON.parse(storeDataList));
    }
  }, []);

  // xoá sinh viên
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const deleteStudent = (id) => {
    const updateList = studentsList.filter((student) => student.id !== id);
    if (updateList.length <= 1) {
      setBtnArrange(true);
    }
    setStudentsList(updateList);
    setShow(false);
  };

  useEffect(() => {
    localStorage.setItem("studentList", JSON.stringify(studentsList));
  }, [studentsList]);

  // lấy dữ liệu từ hàm findStudent
  const [editStudent, setEditStudent] = useState(null);

  // tìm sinh viên
  const findStudent = (id) => {
    const selectedStudent = studentsList.find((student) => student.id == id);
    setData({
      id: selectedStudent.id,
      name: selectedStudent.name,
      phone: selectedStudent.phone,
      email: selectedStudent.email,
    });
    setEditStudent(selectedStudent);
  };
  // console.log(editStudent);

  // cập nhật sinh viên
  const updateStudent = () => {
    if (!editStudent) {
      return;
    }
    const updateList = studentsList.map((student) => {
      if (student.id === editStudent.id) {
        return data;
      }
      return student;
    });
    setStudentsList(updateList);
    setEditStudent(null);
    setData({
      id: "",
      name: "",
      phone: "",
      email: "",
    });
    setBtnAdd(true);
  };

  // search tìm sinh viên
  const [search, setSearch] = useState("");
  // console.log(studentsList);
  // sắp xếp sinh viên
  const sortStudent = () => {
    const sorted = [...studentsList].sort((a, b) => {
      // thứ tự từ a - z
      return a.name > b.name ? 1 : -1;
    });
    setStudentsList(sorted);
  };
  // console.log(studentsList);

  // tạo modal confirm delete
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete student ???</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete !!!</Modal.Body>
        <Modal.Footer>
          <Button

            onClick={() => {
              deleteStudent(selectedStudentId);
            }}
            variant="danger"
          >
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <div className="mt-3">
          <h1>Thông tin sinh viên</h1>
          <div>
            <div className="input-group mb-3">
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Search....."
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
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
                  <p className="mt-2 text-danger">{error.id}</p>
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
                  <p className="mt-2 text-danger">{error.name}</p>
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
                  <p className="mt-2 text-danger">{error.phone}</p>
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
                  <p className="mt-2 text-danger">{error.email}</p>
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
                className="btn btn-warning ms-3"
              >
                Update
              </button>
              <button
                disabled={btnArrange}
                type="button"
                onClick={sortStudent}
                className="btn btn-primary ms-3"
              >
                Arrange
              </button>
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
            {studentsList
              .filter((student) => {
                return search.toLowerCase() === ""
                  ? student
                  : student.name.toLowerCase().includes(search);
              })
              .map((student, index) => (
                <tr key={index}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.phone}</td>
                  <td>{student.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedStudentId(student.id);
                        setShow(true);
                      }}
                      s
                      className="btn btn-danger me-2"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button
                      onClick={() => {
                        findStudent(student.id);
                      }}
                      className="btn btn-warning"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
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
