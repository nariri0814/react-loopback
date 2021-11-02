import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

function App() {
  const [coffeeShop, setCoffeeShop] = useState();
  const [review, setReview] = useState();
  const [reviewer, setReviewer] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

useEffect(() => {
  const getCafe = async() => {
    try{
      const api = await axios.get('http://localhost:3000/api/CoffeeShops')
        .then(res => res.data)
      console.log('cafe',api)
      setCoffeeShop(api)
    } catch(err) {
      console.log(err)
    }
  }
  const getReview = async() => {
    try{
      const api = await axios.get('http://localhost:3000/api/Reviews',{
        params: {
          filter: {
            include: [
              'coffeeShop'
            ]
          }
        }
      })
      .then(res => res.data)
      console.log('review',api)
      setReview(api)
    } catch(err) {
      console.log(err)
    }
  }
  const getReviewer = async() => {
    try{
      const api = await axios.get('http://localhost:3000/api/Reviewers')
      .then(res => res.data)
      console.log('reviewer',api)
      setReviewer(api)
    } catch(err) {
      console.log(err)
    }
  }

  getCafe();
  getReview();
  getReviewer();
},[])

  const onClick = () => {
    try {
      axios.post('http://localhost:3000/api/Reviewers',{
        email: email,
        password: pass
      })
    } catch {
      console.log("error")
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Coffee shop reviews</h1>
        <ul className="header-ul">
          <li className="header-li">All reviews</li>
        </ul>
        <div>
          <form id="userForm">
            <label>Email</label>
            <input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="password" placeholder="password" onChange={e=> setPass(e.target.value)}/>
            <button form="userForm" onClick={onClick}>추가</button>
          </form>
        </div>
      </header>
      <main>
        <div>
          {review?.map((item,i)=> {
            return (
              <div className="review-wrap" key={item.id}>
                작성자: {reviewer?.filter(el => el.publisherId||el.id === item.publisherId)[0]?.email}
                <br />
                {item.coffeeShopId && <div className="review-item">
                {coffeeShop?.filter(el => el.id === item.coffeeShopId)[0].city}{" - "}
                  <span className="cafe-name">{coffeeShop?.filter(el => el.id === item.coffeeShopId)[0].name}</span>
                </div>}
                <br />
                <div className="review-item">{item.rating}점⭐</div>
                <div className="review-item">{item.comments}</div>
              </div>
            )
          })}
        </div>
        <div>
        </div>
      </main>
    </div>
  );
}

export default App;
