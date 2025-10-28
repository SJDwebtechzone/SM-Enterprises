import React from "react";
import { Link } from "react-router-dom";

const CartButton=(props)=> {

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Link to="/cart" className="text-white" title="Cart">
        <i className="bi bi-cart fs-5 text-dark"></i>
        {props.cartClickCount > 0 && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.6rem" }}
          >
            {props.cartClickCount}
          </span>
        )}
      </Link>
      {props.showMessage && (
        <div
          className="position-absolute"
          style={{
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#28a745",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            marginTop: "4px",
            whiteSpace: "nowrap",
          }}
        >
          Cart is added!
        </div>
      )}

    </div>
  );
}

export default CartButton;