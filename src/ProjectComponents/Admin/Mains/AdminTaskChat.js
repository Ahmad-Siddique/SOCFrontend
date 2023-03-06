import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import Header from "../header";
import Sidebar from "../sidebarmain";
import PerfectScrollbar from "react-perfect-scrollbar";
import Form from "react-bootstrap/Form";
import {
  Card,
  CardBody,
  CardExpandToggler,
} from "../../../components/card/card.jsx";
const AdminTaskChat = () => {
  const [taskdata, settaskdata] = useState();
  const [message, setmessage] = useState();
  const [show, setshow] = useState(false);
  const [localdata, setlocaldata] = useState();
  const divRef = useRef();

  const { id } = useParams();
  const fetchingtaskdata = async () => {
    const data = await axios.get("http://localhost:5000/api/onetask/" + id);
    console.log(data.data);
    settaskdata(data.data);
    await setlocaldata(JSON.parse(localStorage.getItem("adminInfo")));
  };

  const handleshow = () => {
    setshow(!show);
  };

  const MessageSend = async (e) => {
    e.preventDefault();

    const data = JSON.parse(localStorage.getItem("adminInfo"));
    const name = data.name;
    const _id = data._id;

    try {
      const config = {
        "Content-type": "application/json",
      };

      //    await fetch("http://localhost:5000/api/login", {
      //      method: "POST",
      //      headers: { "Content-Type": "application/json" },
      //      body: JSON.stringify({ email,password }),
      //    }).then(
      //        res=>{
      //         if(!res.ok){

      //             throw Error('Cannot fetch data from the server')

      //         }

      //         return res.json();
      //     }
      //    )
      //        .then(
      //            data => {
      //                console.log(data)
      //        }
      //    )

      const { data } = await axios
        .post(
          "http://localhost:5000/api/updatemessage/" + id,
          {
            name,
            _id,
            message,
          },
          config
        )
        .then((data) => {
          console.log("req sent");
          console.log(data.data);
          handleshow();
          console.log("Message sent Successfully");
          setmessage("");
        })
        .catch((err) => {
          console.log("Message Not Sent. Error occured");
        });
    } catch (error) {
      // console.log(error)
      // setError(error)
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchingtaskdata();
  }, [show]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  });

  return (
    <div>
      <Header />
      <Sidebar />
      <div>
        {taskdata && (
          <div>
            <h1 className="page-header mb-0 text-center mb-3">
              {taskdata.name}
            </h1>

            <Card>
              <div
                style={{ width: "100", maxHeight: 700, overflowY: "scroll" }}
                className="messenger-content-body"
              >
                <PerfectScrollbar className="h-100">
                  <div className="widget-chat">
                    <div className="widget-chat-date">{taskdata.name}</div>
                    {taskdata.comments.map((elem) => {
                      return (
                        <div>
                          {localdata._id !== elem._id ? (
                            <div className="widget-chat-item">
                              <div className="widget-chat-media">
                                <img src="/assets/img/user/user-5.jpg" alt="" />
                              </div>
                              <div className="widget-chat-content">
                                <div className="widget-chat-name">
                                  {elem.name}
                                </div>

                                <div className="widget-chat-message">
                                  {elem.message}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="widget-chat-item reply">
                              <div className="widget-chat-content">
                                <div className="widget-chat-name">
                                  {elem.name}
                                </div>

                                <div className="widget-chat-message last">
                                  {elem.message}
                                </div>
                                <div ref={divRef} />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </PerfectScrollbar>
              </div>
              <Form
                onSubmit={MessageSend}
                style={{ marginTop: "10px" }}
                class="footer"
              >
                <div className="messenger-content-footer">
                  <div className="input-group input-group-lg position-relative">
                    <button
                      className="btn position-absolute start-0"
                      id="trigger"
                    >
                      <i className="far fa-face-smile"></i>
                    </button>
                    <input
                      type="text"
                      className="form-control rounded-start ps-45px"
                      id="input"
                      value={message}
                      onChange={(e) => setmessage(e.target.value)}
                      placeholder="Write a message..."
                    />
                    <button className="btn btn-outline-default" type="submit">
                      <i className="fa fa-paper-plane text-muted"></i>
                    </button>
                  </div>
                </div>
              </Form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTaskChat;
