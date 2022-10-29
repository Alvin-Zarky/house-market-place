import React,{useState, useEffect} from 'react';
import {Container, Row, Col} from "reactstrap";
import {useHistory} from "react-router-dom";
import BottomMenu from '../../components/bottom-menu';
import { useCreate } from '../../hook/useCreate';
import * as Routes from "../../routes";
import Loader from "../../components/loading";
import './create.scss';

export default function CreateListing() {

  const [type, setType] = useState('rent')
  const [name, setName]= useState('')
  const [bed, setBed] = useState('');
  const [bath, setBath] = useState('')
  const [spot, setSpot] = useState(false)
  const [furnish, setFurnish] = useState(false)
  const [address, setAddress]= useState('')
  const [offer, setOffer] = useState(false)
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [success, setSuccess] = useState(false)
  const {createList, isPending} = useCreate()
  const history= useHistory()

  const handleChange = (e) =>{
    // for(let i=0; i<e.target.files.length; i++){
    //   let img= e.target.files[i];
    //   img.id = Math.random()
    //   setImage((prev) => [...prev, img])
    // }
    let img = e.target.files[0];
    if(img){
      setImage(img)
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    await createList(
      type, name, bed, bath, spot, furnish, address, offer, price,discount,image
    );
    setSuccess(true)
  }

  useEffect(() =>{
    if(success){
      history.push(`/category/${type}`)
    }
  }, [success, history,type])  

  return (
    <>
      <Container fluid>
        <Container>
          <div className="contain-page">
            <h1>Create a Listing</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <Row>
                  <Col xl="6" lg="6">
                    <span>Sell</span>
                    <div className="button-ft">
                      <button onClick={() => {setType('sale')}} className={type==='sale' ? 'active' : ''}>Sale</button>
                    </div>
                  </Col>
                  <Col xl="6" lg="6">
                    <span>Rent</span>
                    <div className="button-ft">
                      <button onClick={() => {setType('rent')}} className={type==='rent' ? 'active' : ''}>Rent</button>
                    </div>
                  </Col>
                </Row>
              </div>
              <div>
                <span>Name</span>
                <div className="input-ft">
                  <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} required/>
                </div>
              </div>
              <div className="type-bath">
                <Row>
                  <Col xl="6" lg="6">
                    <span>Bedrooms</span>
                    <div>
                      <input type="number" value={bed} onChange={(e) => {setBed(e.target.value)}} required />
                    </div>
                  </Col>
                  <Col xl="6" lg="6">
                    <span>Bathrooms</span>
                    <div>
                      <input value={bath} onChange={(e) => {setBath(e.target.value)}} type="number" required />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="type-bath">
                <span>Parkling spot</span>
                <Row style={{
                  marginTop: "10px"
                }}>
                  <Col xl="6" lg="6" className='button-ft'>
                    <button onClick={() => {setSpot(true)}} className={spot ? 'active': ''}>Yes</button>
                  </Col>
                  <Col xl="6" lg="6" className='button-ft'>
                    <button onClick={() => {setSpot(false)}} className={!spot ? 'active' :''}>No</button>
                  </Col>
                </Row>
              </div>
              <div>
                <span>Furnished</span>
                <Row style={{
                  marginTop: "10px"
                }}>
                  <Col xl="6" lg="6" className='button-ft'>
                    <button onClick={() => {setFurnish(true)}} className={furnish ? 'active': ''}>Yes</button>
                  </Col>
                  <Col xl="6" lg="6" className='button-ft'>
                    <button onClick={() => {setFurnish(false)}} className={!furnish ? 'active' :''}>No</button>
                  </Col>
                </Row>
              </div>
              <div>
                <span>Address</span>
                <div  className="input-ft" style={{
                  marginTop: "10px"
                }}>
                  <textarea value={address} onChange={(e) => {setAddress(e.target.value)}} required></textarea>
                </div>
              </div>
              <div>
                <span>Offer</span>
                <Row style={{
                  marginTop: "10px"
                }}>
                  <Col xl="6" lg="6" className='button-ft'>
                    <button onClick={() => {setOffer(true)}} className={offer ? 'active': ''} >Yes</button>
                  </Col>
                  <Col xl="6" lg="6" className='button-ft'>
                    <button onClick={() => {setOffer(false)}} className={!offer ? 'active': ''}>No</button>
                  </Col>
                </Row>
              </div>
              <div className="type-bath">
                <span>Regular Price</span>
                <input type="number" onChange={(e) =>{setPrice(e.target.value)}} value={price} required />
              </div>
              {offer && (
                <div className="type-bath">
                  <span>Discount Price $/month</span>
                  <input type="number" onChange={(e) =>{setDiscount(e.target.value)}} value={discount} />
                </div>
              )}
              {isPending && (
                <div>
                  <Loader />
                </div>
              )}
              <div>
                <span>Images</span>
                {/* <input multiple className='input-file' required onChange={handleChange} type="file" /> */}
                <input className='input-file' onChange={handleChange} required type="file" />
              </div>
              <button className='btn-create' style={{
                  marginTop: "10px"
                }}>Create</button>
            </form>
          </div>
        </Container>
      </Container>
      <BottomMenu />
    </>
  );
}
