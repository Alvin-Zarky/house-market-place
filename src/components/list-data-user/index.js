import React from 'react';
import {MdOutlineBedroomParent, MdOutlineBathroom} from "react-icons/md";
import { Row, Col } from 'reactstrap';
import {AiFillDelete} from "react-icons/ai";
import {useFirestore} from "../../hook/useFirestore";
import './list-data-user.scss';

export default function UserData({data}) {

  const {deleteData} = useFirestore()

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
                        <span>{data.address.substr(0,37)}{data.address.length > 37 ? '...': ''}</span>
                      </div>
                      <div className="title-names">
                        <span>{data.name.substr(0,26)}{data.name.length > 26 ? '...' : ''}</span>
                      </div>
                      <div className="prices">
                        <span>$ {data.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</span>
                      </div>
                      <div className="furnisher">
                        <div className="amount-beds">
                          <MdOutlineBedroomParent />
                          <span>{data.bed} bedrooms</span>
                        </div>
                        <div className="amount-baths">
                          <MdOutlineBathroom />
                          <span>{data.bath} bathrooms</span>
                        </div>
                      </div>
                    </div>
                    <div className="deleteIcon" onClick={() => {deleteData(data.id)}}>
                      <AiFillDelete />
                    </div>
                </Col>
            </Row>
        </div>
    </>
  );
}
