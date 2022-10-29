import React,{useState} from 'react';
import {Container, Row, Col} from "reactstrap";
import { Link } from 'react-router-dom';
import {AiFillHome} from "react-icons/ai";
import {BsArrowRightShort} from "react-icons/bs";
import BottomMenu from '../../components/bottom-menu';
import { useSignOut } from '../../hook/useSignOut';
import {useContextHook} from '../../hook/useContext';
import {useUpdateUser} from "../../hook/useUpdateUser";
import UserData from '../../components/list-data-user';
import { useUserData } from '../../hook/useUserData';
import * as Images from "../../constant/image";
import * as Routes from "../../routes";
import '../sign-in/sign-in.scss';
import './profile.scss';

export default function Profile() {

  const { isPending, signOut } = useSignOut()
  const {user, isSocial} = useContextHook();
  const [editItem, setEditItem] = useState(false)
  const [named, setNamed] = useState('')
  const [email, setEmail] = useState('')
  const {updateUser, isLoading, error} = useUpdateUser();
  const {document, noData} = useUserData('listing',user.uid)

  const handleChange= () =>{
    setNamed(user.displayName)
    setEmail(user.email)
    setEditItem(true)
  }

  const handleUpdate = async () =>{
    await updateUser(named, email)
    setEditItem(false)
  }
  

  return (
    <>
      <Container fluid>
        <Container>
          <div className="contain-page">
            <h1>My Profile</h1>
            <div className="btn-logout" onClick={signOut}>
              {isPending && <button>Logging out...</button>}
              {!isPending && <button>Logout</button>}
            </div>
            <div className="personal-detail">
              <Row>
                <Col xl="6" lg="6">
                  <span className="details">Personal Details</span>
                </Col>
                <Col xl="6" lg="6">
                  {isLoading && <span className='change' style={{
                    pointerEvents:"none"
                  }}>Loading...</span>}
                  {editItem && !isLoading && <span className='change' onClick={handleUpdate}>Done</span>}
                  {!editItem && !isLoading && <span className='change' onClick={handleChange}>{!isSocial && <span>Change</span>}</span>}
                </Col>
              </Row>
              <div className="information-user">
                <div className="title-user">
                  {editItem && <input type="text" onChange={(e) => {setNamed(e.target.value)}} value={named} required />}
                  {!editItem && <span>{user["displayName"]}</span>}
                </div>
                <div className="email-user">
                  {editItem && <input type="text" onChange={(e) => {setEmail(e.target.value)}} value={email} required />}
                  {user.email && !editItem && <span style={{textTransform:"capitalize"}}>{user.email}</span>}
                  {!user.email && !editItem && <span style={{textTransform:"lowercase"}}><span style={{textTransform:"lowercase"}}>n</span>oemail@gmail.com</span>}
                </div>
              </div>
              {error && (
                <div className="errror-message">
                  <span>{error}</span>
                </div>
              )}
            </div>
            <Link to={Routes.CREATE} style={{
              textDecoration:"none",
              color:"black"
            }}>
              <div className="create-list">
                <span className='icon-home'><AiFillHome /></span>
                <span>Sell or rent your home</span>
                <span className='arrow-icon'><BsArrowRightShort /></span>
              </div>
            </Link>
            <div className="blog-data-user">
              <span>User Data</span>
              <div className="data-user">
                {noData && (
                  <div className="no-data">
                    <img src={Images.NO_DATA} alt="no-data" />
                    <div>
                      <span>No Data</span>
                    </div>
                  </div>
                )}
                {document && document.map((val, index) =>(
                  <>
                    <UserData key={index} data={val} />
                  </>
                ))}
                
              </div>
            </div>
          </div>
        </Container>
      </Container>
      <BottomMenu />
    </>
  );
}
