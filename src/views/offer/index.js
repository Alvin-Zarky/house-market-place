import React from 'react';
import { Container } from 'reactstrap';
import {Link} from "react-router-dom";
import * as Routes from "../../routes";
import BottomMenu from '../../components/bottom-menu';
import BoxListOffer from '../../components/list-box';
import { useCollection } from '../../hook/useCollection';
import * as Images from "../../constant/image";
// import Loader from "../../components/loader";
import './offer.scss';

export default function Offer() {

  const {document, noData} = useCollection(
    'listing',
    ["offer","==",true],
    ["createdAt","desc"]
  )
  
  return (
    <>
      <Container fluid>
        <Container>
          <div className="overview-page">
            <h1>Offer</h1>
            <div className="offer-lists">
              {/* {isPending && (
                <div className="loading">
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
              {document && document.map((doc, index) =>(
                <Link key={index} to={`/article/offers/${doc.id}`}>
                  <BoxListOffer data={doc} />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Container>
      <BottomMenu />
    </>
  );
}
