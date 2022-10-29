import React from 'react';
import {Container} from "reactstrap";
import {useParams} from "react-router-dom";
import Slider from "react-slick";
import {FaShare} from "react-icons/fa";
import { useDocument } from '../../hook/useDocument';
import BottomMenu from "../../components/bottom-menu";
import './article.scss';

export default function Article() {
  const {id} =useParams();
  const {document} = useDocument('listing', id)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
    { document && (
      <>
      <Container style={{paddingLeft:"0", paddingRight:"0"}} className='main-slider padd0' fluid>
        <Slider {...settings}>
          <div className='img-slider'>
            <img src={document.imgUrl} alt="condo-rent" />
          </div>
        </Slider>
        <div className="share-link">
          <div className="icon-share">
            <FaShare />
          </div>
        </div>
      </Container>
      <Container fluid>
        <Container>
          <div className="overview-page detail-context">
            <div className="title">
              <span>{document.name}-$ {document.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</span>
            </div>
            <div className="location">
              <span>{document.address}</span>
            </div>
            <div className="type-of">
              <div className="type-data">
                <span>For {document.type}</span>
              </div>
              {document.discount > 0 ? (<div className="discount">
                  <span>$ {document.discount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})} discount</span>
                </div>) : ''}
            </div>
            <div className="furnisher">
              <p>{document.bed} bedrooms</p>
              <p>{document.bath} bathroom</p>
              {document.spot && ( <p>Parking Spot</p> )}
            </div>
            <div className="geo-location-show">
              <span>Location</span>
            </div>
          </div>
        </Container>
      </Container>
      </>
      )}
      <BottomMenu />
    </>
  );
}
