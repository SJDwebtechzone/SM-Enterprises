import '../../assets/css/css/cartTable.css'
const CartTable = ({ wishlist = [], onRemoveItem, onAddToCart }) => {

  if (!Array.isArray(wishlist) || wishlist.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No items in wishlist.</p>
      </div>
    );
  }

  return (
<section className="py-5 bg-light">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle text-center cart-table">
            <thead className="table-warning text-dark">
              <tr>
                <th>Remove</th>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Add to Cart</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item, index) => {
                const price = Number(item.price) || 0;
                const quantity = item.quantity || 1;
                const total = price * quantity;

                return (
                  <tr key={index}>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onRemoveItem(item._id)}
                        title="Remove from wishlist"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                    <td>
                      <img
                        src={item.image?.startsWith('http') ? item.image : `${import.meta.env.VITE_BACKEND_URL}${item.image}`}
                        alt={item.name}
                        className="rounded shadow-sm"
                        style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <h6 className="mb-0 fw-semibold">{item.name}</h6>
                      <small className="text-muted">{item.description}</small>
                    </td>
                    <td className="text-primary fw-bold">₹{price.toFixed(2)}</td>
                    <td>
                      <span className="badge bg-dark text-white px-3 py-2 rounded-pill">
                        {quantity}
                      </span>
                    </td>
                    <td className="fw-bold text-success">₹{total.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onAddToCart(item)}
                        title="Add to cart"
                      >
                        <i className="bi bi-cart-plus"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {wishlist.length === 0 && (
          <div className="text-center py-5">
            <img src="/assets/images/empty-wishlist.png" alt="Empty Wishlist" style={{ width: '100px' }} />
            <p className="text-muted mt-3">Your wishlist is empty. Start exploring!</p>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
  );
};

export default CartTable;
