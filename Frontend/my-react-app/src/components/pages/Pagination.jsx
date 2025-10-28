import React from 'react';

const Pagination = ({ currentPage = 1, totalPages = 5, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="row mt-5">
      <div className="col text-center">
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                &lt;
              </button>
            </li>

            {pages.map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? 'active' : ''}`}
                
              >
                <button className="page-link"  onClick={() => onPageChange(page)}  style={{
    backgroundColor: '#ffc107', // Bootstrap yellow-700
    color: '#212529'            // Bootstrap gray-900 for readable text
  }} >
                  {page}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;