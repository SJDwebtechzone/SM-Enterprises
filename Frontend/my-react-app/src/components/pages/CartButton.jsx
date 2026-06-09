import React from "react";
import { Link } from "react-router-dom";

const CartButton=(props)=> {
  const isCircular = props.variant === "circular";

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {isCircular ? (
        <Link
          to="/cart"
          className="d-flex align-items-center justify-content-center"
          style={{
            width: "38px",
            height: "38px",
            backgroundColor: "#ffffff",
            border: "1.5px solid #d4a84b",
            color: "#713200",
            borderRadius: "50%",
            textDecoration: "none",
            boxShadow: "0 2px 5px rgba(139,90,0,0.08)"
          }}
          title="Cart"
        >
          <i className="bi bi-cart fs-6 text-dark"></i>
          <span
            className="position-absolute d-flex align-items-center justify-content-center"
            style={{
              top: "-4px",
              right: "-4px",
              backgroundColor: "#eab308",
              color: "#000000",
              fontSize: "0.65rem",
              fontWeight: "bold",
              borderRadius: "50%",
              width: "16px",
              height: "16px",
              border: "1px solid #d4a84b"
            }}
          >
            {props.cartClickCount || 0}
          </span>
        </Link>
      ) : (
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
      )}
      {props.showMessage && (
        <div
          className="position-absolute"
          style={{
            top: "110%",
            right: isCircular ? 0 : "auto",
            left: isCircular ? "auto" : "50%",
            transform: isCircular ? "none" : "translateX(-50%)",
            backgroundColor: "#28a745",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            whiteSpace: "nowrap",
            zIndex: 2100
          }}
        >
          Cart is added!
        </div>
      )}
    </div>
  );
}

export default CartButton;