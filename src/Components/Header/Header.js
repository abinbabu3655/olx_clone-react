import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import swal from 'sweetalert';
function Header() {
  const history = useHistory()
  const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  console.log(user);
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      history.push('/')
    }
  }, [])

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <Link to='/login'> <span>{user ? `Welcome ${user.displayName}` : 'Login'}</span></Link>
          <hr />

        </div>
        {user && <span onClick={() => {

          swal({
            title: "Are you sure?",
            text: "You want to Log Out",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                firebase.auth().signOut();
                localStorage.removeItem('token')
                swal("Logout Succesfully", {
                  icon: "success",
                }).then(()=>history.push('/'))

              } else {
                swal("Ok");
              }
            });
        }}>Logout</span>}
        <Link to={'/create'}><div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div></Link>

      </div>
    </div>
  );
}

export default Header;
