import React from 'react';
// import './ServicesSection.css'; // Optional: for custom styles or icon classes

const services = [
  {
    iconClass: 'bi bi-truck', // Replaces flaticon-shipped
    bgColorClass: 'bg-color-1',
    title: 'Free Shipping',
    subtitle: 'On order over $100',
  },
  {
    iconClass: 'bi bi-basket', // Replaces flaticon-diet
    bgColorClass: 'bg-color-2',
    title: 'Always Fresh',
    subtitle: 'Product well package',
  },
  {
    iconClass: 'bi bi-award', // Replaces flaticon-award
    bgColorClass: 'bg-color-3',
    title: 'Superior Quality',
    subtitle: 'Quality Products',
  },
  {
    iconClass: 'bi bi-headset', // Replaces flaticon-customer-service
    bgColorClass: 'bg-color-4',
    title: 'Support',
    subtitle: '24/7 Support',
  },
];

const ServicesSection = () => {
  return (
    <>
    
<section className="ftco-section bg-white">
  <div className="container">
    <div className="row g-0 ftco-services">
     {services.map((service, index) => (
        <div key={index} className="col-md-3 d-flex align-items-stretch">
          <div className="media block-6 services text-center p-4 w-100">
            <div className={`icon ${service.bgColorClass} d-flex justify-content-center align-items-center mx-auto mb-3`}>
              <i className={service.iconClass} style={{ fontSize: '36px', color: '#785050ff' }}></i>
            </div>
            <div className="media-body">
              <h3 className="heading mb-2">{service.title}</h3>
              <span>{service.subtitle}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
</>



    // <section className="bg-light py-5">
    //   <div className="container">
    //     <div className="row g-0">
    //       {services.map((service, index) => (
    //         <div
    //           key={index}
    //           className="col-lg-3 text-center d-flex align-items-stretch mb-4"
    //         >
    //           <div className="media block-6 services w-100">
    //             <div
    //               className={`icon ${service.bgColorClass} d-flex justify-content-center align-items-center mb-2`}
    //             >
    //               <span className={service.iconClass}></span>
    //             </div>
    //             <div className="media-body">
    //               <h3 className="heading">{service.title}</h3>
    //               <span>{service.subtitle}</span>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
  );
};

export default ServicesSection;