import React ,{ useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/css/css/diyacollection.css'
import "bootstrap/dist/css/bootstrap.min.css";
import DiyaLamp from "../../assets/images/DiyaLamp.jpg";
import bg_8 from "../../assets/images/Bell.jpg";
import Bellwithsound from "../../assets/images/Bellwithsound.jpg";
import bg_6 from "../../assets/images/sm_02.jpg";
import diya1 from "../../assets/images/diya1.jpg";
import defaultImage from '../../assets/images/diya1.jpg'
import vilakku5 from '../../assets/images/bg_vilakku8.jpg'

import ProductPage from "./productpage";
import AdminImageCarousel from "../Dashboard/AdminCourselimage/AdminImageCarousel";
import axios from "axios";

// const collections = [
//   { name: "Brass Bell", image: bg_8, alt: "Brass Bell" },
//   { name: "Hundi", image: DiyaLamp, alt: "Hundi" },
//   { name: "Electric Bell", image: Bellwithsound, alt: "Electric Bell" },
//   { name: "Steel Vilakku", image: diya1, alt: "Steel Vilakku" },
//   { name: "Kalasam", image: bg_8, alt: "Kalasam" }
// ];

const DiyaCollection = () => {
    const navigate = useNavigate();
    const [collections, setCollections] = useState([]);
    console.log('collections',collections)

const fetchCollections = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
    
    const mapped = res.data.map(cat => ({
      name: cat.name,
      image: cat.image
        ? `${import.meta.env.VITE_BACKEND_URL}${cat.image}`
        : defaultImage,
      alt: cat.name,
      _id: cat._id // ✅ include _id if needed for keys or linking
    }));

    setCollections(mapped); // ✅ use mapped, not raw res.data
  } catch (err) {
    console.error('Failed to fetch collections:', err);
  }
};

useEffect(() => {
  fetchCollections();
}, []);

  

  const handleClick = (categoryName) => {
  const slug = categoryName.toLowerCase().replace(/\s+/g, "-");
  
  navigate(`/products/${slug}`);
};


  // const chunkedCollections = [];
  // for (let i = 0; i < collections.length; i += 4) {
  //   chunkedCollections.push(collections.slice(i, i + 4));
  // }
  const chunkedCollections = collections.reduce((acc, _, i) => {
  if (i % 4 === 0) acc.push(collections.slice(i, i + 4));
  return acc;
}, []);
  

  return (
    <div style={{
            
            // background: " rgba(223, 199, 15, 0.4)",
            background:'white' ,
    //         backgroundImage:`url(${vilakku5})`,
    //         backgroundSize: 'cover', // 👈 preserves aspect ratio, avoids blur
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center',
    // imageRendering: 'crisp-edges', // 👈 hint to preserve sharpness
    // filter: 'brightness(0.9) contrast(1.1)',
    // width: '100%',zIndex:'1.0'
            
          }}>
      {/* Hero Section */}
      

      <div className="position-relative text-white overflow-hidden">
         {/* <img
          src={vilakku5}
          alt="Diya Collection Banner"
          className="img-fluid w-100"
          style={{
            // objectFit: "top cover",
            // height: "550px",
            // width: "100%",
            // animation: "zoomFade 10s ease-in-out infinite alternate",
            // filter: "brightness(0.9) contrast(1.1)"
            backgroundSize: 'contain', // 👈 preserves aspect ratio, avoids blur
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    imageRendering: 'crisp-edges', // 👈 hint to preserve sharpness
    filter: 'brightness(0.9) contrast(1.1)', // 👈 enhances glow
    height: '100vh',
    width: '100%',

          }}
        />  */}
  
        {/* <h1
          className="position-absolute top-0 start-50 translate-middle-x fw-bold text-light mt-4"
          style={{
            animation: "floatText 3s ease-in-out infinite",
            fontSize: "3.5rem",
            fontFamily: "'Playfair Display', serif",
            background: "linear-gradient(to right, #ffdd00, #ff8800)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 10px rgba(255, 136, 0, 0.6)",
            zIndex: 2
          }}
        >
          Explore Our Product
        </h1>
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{
            width: "120px",
            height: "120px",
            background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "pulse 3s infinite",
            zIndex: 1
          }}
        ></div> */}
              <AdminImageCarousel/>
      </div>
      {/* Collections Carousel Section */}
      <div className="container py-5 position-relative">
      
        <h2 className="fw-bold mb-4">Collections</h2>
        <div
          id="diyaCarousel"
          className="carousel slide position-relative"
          data-bs-ride="carousel"
          data-bs-interval="3000"
          data-bs-pause="hover"
        >
          <div className="carousel-inner">
            {chunkedCollections.map((group, groupIndex) => (
              <div
                className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}
                key={groupIndex}
                style={{ minHeight: "1px" }}
              >
                <div className="row ">
                  {group.map((item, index) => (
                    <div
                      className="col-6 col-md-3 mb-4 mb-md-0"
                      key={index}
                      onClick={() => handleClick(item.name)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="collection-item">
                        <div
                        className="collection-frame"
                          
                        >
                          <div
                          className="collection-image"
                            // style={{
                            //   width: "160px",
                            //   height: "160px",
                            //   borderRadius: "50%",
                            //   overflow: "hidden",
                            //   border: "1px solid #ccc",
                            //   backgroundColor: "#fff"
                            // }}
                          >
                            <img
                              src={item.image}
                              alt={item.alt}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                              }}
                            />
                          </div>
                        </div>
                        <p className=" collection-name">{item.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#diyaCarousel"
            data-bs-slide="prev"
            style={{
              position: "absolute",
              top: "50%",
              left: "-60px",
              transform: "translateY(-50%)",
              width: "50px",
              height: "50px",
              backgroundColor: "rgba(157, 107, 107, 0.6)",
              borderRadius: "50%",
              zIndex: 10,
              border: "none"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(182, 61, 61, 0.9)";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(179, 48, 48, 0.6)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#diyaCarousel"
            data-bs-slide="next"
            style={{
              position: "absolute",
              top: "50%",
              right: "-60px",
              transform: "translateY(-50%)",
              width: "50px",
              height: "50px",
              backgroundColor: "rgba(143, 102, 102, 0.6)",
              borderRadius: "50%",
              zIndex: 10,
              border: "none"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(159, 85, 85, 0.9)";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(129, 118, 118, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(117, 64, 64, 0.6)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      
      

    </div>
  );
};

export default DiyaCollection;
