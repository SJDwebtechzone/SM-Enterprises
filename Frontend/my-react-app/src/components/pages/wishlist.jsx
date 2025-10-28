import { Link, useNavigate } from "react-router-dom";
import CartTable from "./CartTable";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Wishlist = ({ wishlist, setWishlist, onAddToCart }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchWishlist = async () => {
      const decoded = jwtDecode(token);
      const currentUserId = decoded.userId;

      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${currentUserId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const products = res.data?.wishlist?.products || [];
        const normalized = products.map(product => ({
          ...product,
          quantity: 1
        }));

        setWishlist(normalized);
      } catch (err) {
        console.error('Wishlist fetch error:', err.message || err);
        setWishlist([]);
      }
    };

    fetchWishlist();
  }, [token, navigate, setWishlist]);

  const handleRemoveFromWishlist = async (productId) => {
    if (!token || !productId) return;

    const decoded = jwtDecode(token);
    const currentUserId = decoded.userId;

    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${currentUserId}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        setWishlist(prev => prev.filter(item => item._id !== productId));
      }
    } catch (err) {
      console.error('Error removing item from wishlist:', err.response?.data || err.message);
    }
  };

  if (!token) return null;

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-md-9">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center bg-transparent p-0 mb-2">
                <li className="breadcrumb-item active text-white" aria-current="page">Wishlist</li>
              </ol>
            </nav>
            <h1 className="display-4 fw-bold">My Wishlist</h1>
          </div>
        </div>
      </div>

      <CartTable
        wishlist={wishlist}
        onAddToCart={onAddToCart}
        onRemoveItem={handleRemoveFromWishlist}
      />
    </>
  );
};

export default Wishlist;