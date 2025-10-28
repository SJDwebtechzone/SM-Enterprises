import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import companyImage from '../../assets/images/myjourney.jpg';
import missionImage from '../../assets/images/mission.jpg';
import visionImage from '../../assets/images/vision.jpg';
import { ShieldCheck, Heart, BagFill, CreditCard, Award, EmojiSmile } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/css/JourneyUs.css';
import TestimonialGrid from '../Testemonialcarosel';
import NewsletterSubscription from './NewsLetter';

const AboutUs = () => {
  const features = [
    {
      icon: <ShieldCheck size={40} className="text-warning" />,
      title: "Authentic & Trusted",
      desc: "Only genuine devotional items sourced from trusted artisans and suppliers.",
    },
    {
      icon: <Heart size={40} className="text-danger" />,
      title: "Spiritual Connection",
      desc: "Bring devotion into your daily life with carefully chosen spiritual products.",
    },
    {
      icon: <Award size={40} className="text-primary" />,
      title: "Quality Assured",
      desc: "Each item is checked for authenticity and crafted with care.",
    },
    {
      icon: <BagFill size={40} className="text-success" />,
      title: "Affordable & Accessible",
      desc: "We keep prices fair so spirituality is within everyone’s reach.",
    },
    {
      icon: <CreditCard size={40} className="text-info" />,
      title: "Secure Shopping",
      desc: "Safe transactions with multiple payment options & reliable delivery.",
    },
    {
      icon: <EmojiSmile size={40} className="text-warning" />,
      title: "Personalized Care",
      desc: "We value your faith and provide quick, caring customer support.",
    },
  ];
  



  return (
    <>
      {/* About Section */}
      <Container className="my-5 ">
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="text-danger mb-4">About SM Enterprises</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              SM Enterprises is an e-commerce store dedicated to bringing high-quality brass products into your life. Our carefully curated selection includes everything from traditional brass diyas that illuminate your home to ornate bells and Hyundai accessories that add a touch of timeless elegance.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              Each piece is selected for its craftsmanship, durability, and cultural significance. We believe in blending tradition with modern convenience, offering products that are both beautiful and practical.
            </p>
          </Col>
          <Col md={6}>
            <img
              src={companyImage}
              alt="SM Enterprises"
              className="img-fluid rounded shadow-sm"
            />
          </Col>
        </Row>

      

      
      </Container>

      {/* Why Choose Us Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">🌟 Why Choose Us</h2>
          <Row>
            {features.map((feature, idx) => (
              <Col md={4} sm={6} xs={12} key={idx} className="mb-4">
                <Card className="h-100 text-center shadow-sm border-0 rounded-3">
                  <Card.Body>
                    <div className="mb-3">{feature.icon}</div>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text>{feature.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      {/* <NewsletterSubscription/> */}
      <TestimonialGrid/>
    </>
   





  );
}
export default AboutUs;