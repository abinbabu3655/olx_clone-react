import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';
import {FirebaseContext,AuthContext} from '../../store/Context'

const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const history = useHistory()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [error,setError] = useState('')
  const date = new Date()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length === 0 && category.length === 0 && price.length===0 && !image) {
      setError("true")
    }

    if(name.length !== 0 && category.length !==0 && price.length !==0 && image ){
        
    
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        // console.log(url);
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        alert('uploaded Successfully')
        history.push('/')
        })
      })
    }
    
  }

  
  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
            onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="name"
              defaultValue="John"
              
            />
            <br />
           <span>{error && name.length <= 0 ? 
               <label style={{ color: "red" }} >name cannot be empty </label> : ""}</span><br/>
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
            onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br /><span>{error && category.length <= 0 ? 
               <label style={{ color: "red" }} >Category cannot be empty </label> : ""}</span><br/>
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
            type="number" 
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            id="fname" 
            name="price" />
            <br />
            <span>{error && price.length <= 0 ? 
               <label style={{ color: "red" }} >Price cannot be empty </label> : ""}</span><br/>
          </form>
          <br />
          <img name="image"  alt="Posts" width="200px" height="200px" src={image ?URL.createObjectURL(image)  : ''} ></img><br/>
          <span>{error && !image ? 
               <label style={{ color: "red" }} >Image cannot be empty </label> : ""}</span><br/>
          <form>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
     </>
  );
};


export default Create;
