
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import diya1 from '../../assets/images/diya1.jpg'
import bg_129 from '../../assets/images/bg_131.png'
import Pagination from './Pagination';
import NewsletterSubscription from './NewsLetter';
const products = [
  {
    name: 'Vilakku',
    originalPrice: 'Rs.1000.00',
    salePrice: 'Rs.700.00',
    discount: '30%',
    image: diya1,
  },
  {
    name: 'Vilakku',
    salePrice: 'Rs.700.00',
    image: diya1,
  },
  {
    name: 'Vilakku',
    salePrice: 'Rs.700.00',
    image: diya1,
  },
  {
    name: 'Vilakku',
    salePrice: 'Rs.700.00',
    image: diya1,
  },
    {
    name: 'Vilakku',
    originalPrice: 'Rs.1000.00',
    salePrice: 'Rs.700.00',
    discount: '30%',
    image: diya1,
  },
  {
    name: 'Vilakku',
    salePrice: 'Rs.700.00',
    image: diya1,
  },
  {
    name: 'Vilakku',
    salePrice: 'Rs.700.00',
    image: diya1,
  },
  {
    name: 'Vilakku',
    salePrice: 'Rs.700.00',
    image: diya1,
  },
];



const Shop=()=>{
      const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Add logic to fetch or display new page data
  };
    return(
        <>
   <div
  className="hero-wrap hero-bread"
  style={{
    backgroundImage: `url(${bg_129})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <h1 className="bread text-light" style={{ textAlign: 'center', padding: '20px' }}>
    Our Products
  </h1>
</div>

      {/* <div className="container">
        <div className="row g-0 align-items-center justify-content-center">
          <div className="col-md-9 text-center">
            {/* <p className="breadcrumbs mb-2">
              <span className="me-2">
                <Link to="/" className="text-decoration-none">Home</Link>
              </span>
              <span>Products</span>
            </p> */}
            {/* <h1 className="mb-0 bread text-light" style={{textAlign:'center',padding:'20px'}}>Our Products</h1>
          </div>
        </div>
      </div> */}
    {/* </div>  */}

    <section className="py-5">
      <div className="container">
        {/* Category Filter */}
        <div className="row justify-content-center">
          <div className="col-md-10 mb-5 text-center">
            <ul className="list-inline product-category">
              <li className="list-inline-item">
                <h1 className="active text-decoration-none text-dark" style={{ textAlign: 'center', padding: '5px' }} >Products</h1>
              </li>
              {/* Add more categories if needed */}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="position-relative">
                  <img src={product.image} alt={product.name} className="card-img-top img-fluid" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}/>

                  {product.discount && (
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                      {product.discount}
                    </span>
                  )}
                  <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <div className="pricing mb-2">
                    {product.originalPrice ? (
                      <p className="mb-0">
                        <span className="text-muted text-decoration-line-through me-2">
                          {product.originalPrice}
                        </span>
                        <span className="fw-bold">{product.salePrice}</span>
                      </p>
                    ) : (
                      <p className="mb-0 fw-bold">{product.salePrice}</p>
                    )}
                  </div>
                  <div className="d-flex justify-content-center gap-2">
                    <a href="#" className="btn btn-outline-secondary btn-sm">
                      <i className="bi bi-list"></i>
                    </a>
                    <a href="#" className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-cart"></i>
                    </a>
                    <a href="#" className="btn btn-outline-danger btn-sm">
                      <i className="bi bi-heart"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div class="row mt-5">
          <div class="col text-center">
            <div class="block-27">
              <ul>
                <li><a href="#">&lt;</a></li>
                <li class="active"><span>1</span></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&gt;</a></li>
              </ul>
            </div>
          </div>

        </div> */}
        <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={handlePageChange}
      />

      </div>
    </section>
    <NewsletterSubscription />

        
        </>
    )
}
export default Shop;
