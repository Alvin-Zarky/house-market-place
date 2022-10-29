import React from 'react';
import {Container, Row, Col} from "reactstrap";
import BottomMenu from '../../components/bottom-menu';
import { Link } from 'react-router-dom';
import * as Routes from "../../routes";
import * as Images from "../../constant/image";
import Slider from "react-slick";
import {useCollection} from "../../hook/useCollection";
// import Loader from "../../components/loader";
import './dashboard.scss';

export default function Dashboard() {

  const {document, noData} = useCollection(
    'listing',
    null,
    ["createdAt","desc"],
    4
  )
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
        <Container fluid>
          <Container>
            <div className="overview-page">
              <h1>Explore</h1>
              <div className="description">
                <span>Recommended</span>
              </div>
              <div className="context-page">
                <div className="image-slider">
                  <Slider {...settings}>
                    {document && document.map((doc, index) =>(
                      <div key={index} className="image-per-slide">
                        <img src={doc.imgUrl} alt="imgUrl" />
                        <div className="sub-title">
                          <div className="title-image">
                            <span>{doc.name.substr(0,60)}{doc.name.length >60 ? '...' : ''}</span>
                          </div>
                          <div className="price-image">
                            <span>$ {doc.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                  {/* {isPending && (
                    <div style={{
                      position:"absolute",
                      top:0,
                      left:0
                    }} className="loading-loader">
                      <Loader />
                    </div>
                  )} */}
                  {noData && (
                    <div className="no-data">
                      <img src={Images.NO_DATA} alt="no-data" />
                      <div>
                        <span>No Data</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="box-category">
                  <span>Categories</span>
                  <Row>
                    <Col xl="6" lg="6" md="6">
                      <Link to={`/category/rent`}>
                        <div className="image-type">
                          <img src={Images.FOR_RENT} alt="condo3" />
                        </div>
                      </Link>
                      <div className="title-image">
                        <span>Places for rent</span>
                      </div>
                    </Col>
                    <Col xl="6" lg="6" md="6">
                      <Link to={`/category/sale`}>
                        <div className="image-type">
                          <img src={Images.FOR_SALE} alt="condo3" />
                        </div>
                      </Link>
                      <div className="title-image">
                        <span>Places for sale</span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Container>
        </Container>
        <BottomMenu />
    </>
  );
}