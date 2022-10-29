import React from 'react';
import {MdOutlineBedroomParent, MdOutlineBathroom} from "react-icons/md";
import { Row, Col } from 'reactstrap';
import './list-box-offer.scss';

export default function BoxListOffer({data}) {
  return (
    <>
      <div className="box-list" style={{
        position:"relative"
      }}>
                <Row>
                  <Col xl="4" lg="4" md="4" sm="4" xs="4">
                    <div className="image-box">
                      <img src={data.imgUrl} alt={data.name} />
                    </div>
                  </Col>
                  <Col xl="8" lg="8" md="8" sm="8" xs="8">
                    <div className="details">
                      <div className="location-geo">
                        <span>{data.address.substr(0,47)}{data.address.length > 47 ? '...': ''}</span>
                      </div>
                      <div className="title-name">
                        <span>{data.name.substr(0,40)}{data.name.length > 40 ? '...' : ''}</span>
                      </div>
                      <div className="price">
                        <span>$ {data.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</span>
                      </div>
                      <div className="furnisher">
                        <div className="amount-bed">
                          <MdOutlineBedroomParent />
                          <span>{data.bed} bedrooms</span>
                        </div>
                        <div className="amount-bath">
                          <MdOutlineBathroom />
                          <span>{data.bath} bathrooms</span>
                        </div>
                      </div>
                    </div>
                    
                </Col>
            </Row>
        </div>
    </>
  );
}
