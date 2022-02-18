import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaProductHunt, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItems) => {
      temp = temp + cartItems.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const placeOrder = () => {
    const addressInfo = {
      name,
      address,
      pincode,
      phonenumber,
    };
    console.log(addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };

    try {
      setLoading(true);
      const result = addDoc(collection(fireDB, "orders"), orderInfo);
      setLoading(false);
      toast.success("Order placed successfully");
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error("Order failed");
    }
  };

  return (
    <Layout loading={loading}>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height="80" width="80" alt="" />
                </td>

                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash onClick={() => deleteFromCart(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <h1 className="total-amount">Total Amount = {totalAmount} /RS</h1>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleShow}>PLACE ORDER</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <textarea
              className="form-control"
              rows={3}
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <input
              className="form-control"
              placeholder="pincode"
              type="number"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="phonenumber"
              value={phonenumber}
              onChange={(e) => {
                setPhonenumber(e.target.value);
              }}
            />
            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={placeOrder}>ORDER</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default CartPage;
