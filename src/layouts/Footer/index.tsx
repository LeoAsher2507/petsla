import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="product-banner">
        <img src="./img/banner/bannerProduct.png" alt="" />
      </div>
      <Container>
        <Row>
          <Col xs="12" sm="6" md="4" className="p-4">
            <div className="about-us">
              <h3 className="heading">Về PetsLa</h3>
              <p>
                PetsLa ra đời với sứ mệnh Pets hóa thế giới loài người bằng cách
                mang đến cho cộng đồng những content thú vị, đáng yêu về pets.
              </p>
            </div>
          </Col>
          <Col xs="12" sm="6" md="4" className="p-4"></Col>

          <Col xs="12" sm="6" md="4" className="p-4">
            <div className="follow-us">
              <h3 className="heading">Follow Us</h3>
              <div className="follow-us__wrap">
                <div className="follow-us__item facebook">
                  <a
                    href="http://facebook.com/PetsLa.vn"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
                <div className="follow-us__item instagram">
                  <a
                    href="https://www.instagram.com/petsla.vn/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
