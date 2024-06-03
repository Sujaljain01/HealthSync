import React, { useState } from "react";
import { Radio } from "antd";
import banner from "../../../img/banner.png";
import admin from "../../../img/admin.jpg";
import "./DLogin.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AdminLogin,
  DoctorLogin,
  forgetPassword,
  NurseLogin,
} from "../../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Drawer } from "antd";
import axios from 'axios';
const notify = (text) => toast(text);

const DLogin = () => {
  const [role, setRole] = useState('Patient');
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // ************************************************
  const [Loading, setLoading] = useState(false);
  const [formvalue, setFormvalue] = useState({
    username: "",
    password: "",
    role: "Patient"
  });
  // const dispatch = useDispatch();

  const Handlechange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  async function HandleSubmit(e){
    e.preventDefault();
    setLoading(true);
    if (formvalue.username !== "" && formvalue.password !== "") {
      //   if (role === "Nurse") {
      //     let data = {
      //       ...formvalue,
      //       nurseusername
      // : formvalue.username
      // ,
      //     };

      //Handled in authControl
      // dispatch(NurseLogin(data)).then((res) => {
      //   if (res.message === "Successful") {
      //     notify("Login Successful");
      //     setLoading(false);
      //     return navigate("/dashboard");
      //   }
      //   if (res.message === "Wrong credentials") {
      //     setLoading(false);

      //     notify("Wrong credentials");
      //   }
      //   if (res.message === "Error") {
      //     setLoading(false);

      //     notify("Something went Wrong, Please Try Again");
      //   }
      // });
      //   } else if (role === "Doctor") {
      //     let data = {
      //       ...formvalue,
      //       docusername
      // : formvalue.username
      // ,
      //     };
      //     console.log(data);
      //Handled in backend
      // dispatch(DoctorLogin(data)).then((res) => {
      //   if (res.message === "Successful") {
      //     notify("Login Successful");
      //     setLoading(false);

      //     return navigate("/dashboard");
      //   }
      //   if (res.message === "Wrong credentials") {
      //     setLoading(false);

      //     notify("Wrong credentials");
      //   }
      //   if (res.message === "Error") {
      //     setLoading(false);

      //     notify("Something went Wrong, Please Try Again");
      //   }
      // });
      //   } else if (role === "Admin") {
      //     let data = {
      //       ...formvalue,
      //       adminusername
      // : formvalue.username
      // ,
      //     };
      //backend
      // dispatch(AdminLogin(data)).then((res) => {
      //   if (res.message === "Successful") {
      //     notify("Login Successful");
      //     setLoading(false);

      //     return navigate("/dashboard");
      //   }
      //   if (res.message === "Wrong credentials") {
      //     setLoading(false);

      //     notify("Wrong credentials");
      //   }
      //   if (res.message === "Error") {
      //     setLoading(false);

      //     notify("Something went Wrong, Please Try Again");
      //   }
      // });

        e.preventDefault();
        console.log("role",formvalue)
        await axios.post('http://localhost:4000/login',{formvalue},{headers: {'Content-Type': 'application/json'}}).then((response)=>{
        console.log(response);
        if(response.statusText === 'OK') 
        {
            window.location.href = `/dashboard`;
        }

        else
        {
        console.log('login failed');
        }
    });
  }
}
      


const roleChange = (e) => {
  setRole(e.target.value);
};

const [ForgetPassword, setForgetPassword] = useState({
  type: "",
  email: "",
});

const HandleForgetPassword = (e) => {
  setForgetPassword({ ...ForgetPassword, [e.target.name]: e.target.value });
};

const [forgetLoading, setforgetLoading] = useState(false);


//Handle it later
const HandleChangePassword = () => {
//   if (ForgetPassword.type === "") {
//     return notify("Please Fill all Details");
//   }
//   setforgetLoading(true);
//   dispatch(forgetPassword(ForgetPassword)).then((res) => {
//     if (res.message === "User not found") {
//       setforgetLoading(false);
//       return notify("User Not Found");
//     }
//     setForgetPassword({
//       type: "",
//       email: "",
//     });
//     onClose();
//     setforgetLoading(false);
//     return notify("Account Details Send");
//   });
};

return (
  <>
    <ToastContainer />

    <div className="mainLoginPage">
      <div className="leftside">
        <img src={banner} alt="banner" />
      </div>
      <div className="rightside">
        <h1>Login</h1>
        <div>
          <Radio.Group
            value={role}
            onChange={roleChange}
            className={"radiogroup"}
          >
            {/* <Radio.Button value="Nurse" className={"radiobutton"}>
              Nurse
            </Radio.Button> */}
            <Radio.Button value="Doctor" className={"radiobutton"}>
              Doctor
            </Radio.Button>
            <Radio.Button value="Patient" className={"radiobutton"}>
              Patient
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="Profileimg">
          <img src={admin} alt="profile" />
        </div>
        <div>
          <p>username
            - 100</p>
          <p>Password - masai</p>
          <form onSubmit={HandleSubmit}>
            <h3>{role} username
            </h3>
            <input
              type="text"
              name="username"
              value={formvalue.username}
              onChange={Handlechange}
              required
            />
            <h3>Password</h3>
            <input
              type="password"
              name="password"
              value={formvalue.password}
              onChange={Handlechange}
              required
            />
            <button type="submit">{Loading ? "Loading..." : "Submit"}</button>
            <p style={{ marginTop: "10px" }}>
              Forget Password?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={showDrawer}
              >
                Get it on Email !
              </span>
            </p>

            {/* ********************************************************* */}
            <Drawer
              title="Forget Password"
              placement="left"
              onClose={onClose}
              open={open}
            >
              <div>
                <label style={{ fontSize: "18px" }}>Choose Type</label>

                <select
                  name="type"
                  value={ForgetPassword.type}
                  onChange={HandleForgetPassword}
                  required
                >
                  <option value="">User Type</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "18px" }}>
                  Enter Email
                </label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  name="email"
                  value={ForgetPassword.email}
                  onChange={HandleForgetPassword}
                  required
                  style={{
                    width: "100%",
                    height: "3rem",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#bce0fb",
                    fontSize: "18px",
                    marginTop: "10px",
                    paddingLeft: "10px",
                  }}
                />
              </div>

              <button
                style={{
                  width: "50%",
                  margin: " 20px auto",
                  display: "flex",
                  padding: "10px",
                  fontSize: "18px",
                  backgroundColor: "#ff9f9f",
                  border: "none",
                  borderRadius: "7px",
                  cursor: "pointer",
                  justifyContent: "center",
                }}
                onClick={HandleChangePassword}
              >
                {forgetLoading ? "Loading..." : " Send Mail"}
              </button>
            </Drawer>
          </form>
        </div>
      </div>
    </div>
  </>
);

};

export default DLogin;
