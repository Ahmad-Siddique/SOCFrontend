import React from "react";
import { useState,useEffect } from "react";
import Header from "../header";
import Sidebar from "../sidebarmain";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import {
  Card,
  CardBody,
  CardExpandToggler,
} from "../../../components/card/card.jsx";
import { useParams } from "react-router-dom";

const AdminUpdateClient = () => {
  const {id} = useParams();
  const [name, setname] = useState("");
const [clientdata, setclientdata] = useState();
  const [emailid, setemail] = useState("");
  const [contactperson, setcontactperson] = useState();
  const [mobileno, setmobileno] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errormessage, seterrormessage] = useState(false);
  const [successful, setsuccessfull] = useState("");


  const fetchingclientdata = async () => {
     console.log("fetching...masla")
     const data = await axios.get(
       "http://localhost:5000/api/getoneclient/" + id
     );
     console.log("GG")
     console.log(data.data.name);
     setclientdata(data.data);
     setemail(data.data.emailid);
     setname(data.data.name);
     setcontactperson(data.data.contactperson);
     setmobileno(data.data.mobileno);
   };

   useEffect(() => {
     fetchingclientdata();
   }, []);



  const FormSubmit = async (e) => {
    if (emailid == "" || contactperson == "" || mobileno == "" || name == "") {
      setLoading(true);
      setError(true);
      seterrormessage("Please enter all the fields");
      setsuccessfull("");
      setLoading(false);
      return;
    }
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        "Content-type": "application/json",
      };
      const data = await axios
        .post(
          "http://localhost:5000/api/updateclient/" + id,
          {
            name,
            contactperson,
            emailid,
            mobileno,
          },
          config
        )
        .then((data) => {
          console.log(data.data);
          setsuccessfull("Client Updated Successfully");

          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          setError(true);
          seterrormessage("Client Already Exist with these credentials");
          setsuccessfull("");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setError(true);
      setsuccessfull("");
      seterrormessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <Card className="p-3">
        {/* Error Display */}
        {error && (
          <div
            style={{ color: "red", borderRadius: 10 }}
            className="text-opacity-50 text-center mb-4"
          >
            {errormessage}
          </div>
        )}

        {successful && (
          <div
            style={{ color: "green", borderRadius: 10 }}
            className="text-opacity-50 text-center mb-4"
          >
            {successful}
          </div>
        )}

        {/* Spin Loader */}
        {loading && (
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="text-white text-opacity-50 text-center mb-4"
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        <h4 className="main-heading mb-3">UPDATE CLIENT</h4>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="exampleFormControlInput1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="form-control mb-3"
            id="exampleFormControlInput1"
            placeholder="Provide a name"
          />

          <label className="form-label" htmlFor="exampleFormControlInput1">
            Email address
          </label>
          <input
            type="email"
            value={emailid}
            onChange={(e) => setemail(e.target.value)}
            className="form-control mb-3"
            id="exampleFormControlInput1 "
            placeholder="name@example.com"
          />

          <label className="form-label" htmlFor="exampleFormControlInput1">
            Mobile Number
          </label>
          <input
            type="number"
            value={mobileno}
            onChange={(e) => setmobileno(e.target.value)}
            className="form-control mb-3"
            id="exampleFormControlInput1"
            placeholder="Enter Mobile No"
          />

          <label className="form-label" htmlFor="exampleFormControlInput1">
            Contact Person
          </label>
          <input
            type="text"
            value={contactperson}
            onChange={(e) => setcontactperson(e.target.value)}
            className="form-control mb-3"
            id="exampleFormControlInput1"
            placeholder="Enter Contact Person"
          />

          <button
            onClick={FormSubmit}
            style={{ color: "white", borderColor: "white" }}
            className="btn btn-outline-dark"
          >
            Update Client
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AdminUpdateClient;
