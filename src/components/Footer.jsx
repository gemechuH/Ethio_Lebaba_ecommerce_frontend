import React from 'react'
import instaImg1 from '../assets/instagram-1.jpg'
import instaImg2 from '../assets/instagram-2.jpg'
import instaImg3 from '../assets/instagram-3.jpg'
import instaImg4 from '../assets/instagram-4.jpg'
import instaImg5 from '../assets/instagram-5.jpg'
import instaImg6 from '../assets/instagram-6.jpg'

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT US</h4>
          <p>
            <span>
              <i className="ri-map-pin-fill"></i>
              1000, Addis Ababa, Ethiopia
            </span>
          </p>
          <p>
            <span>
              <i className="ri-mail-fill"></i>
            </span>
            support@EthioLebaba.com <br />
            <span>
              <i className="ri-mail-fill"></i>
            </span>
            gemechuhunduma100@gmail.com
          </p>
          <p>
            <span>
              <i class="ri-phone-fill"></i>
            </span>
            (+2519) 34 78 58 50
          </p>
        </div>
        <div className="footer__col">
          <h4>COMPANY</h4>
          <a href="/">Home</a>
          <a href="/">About Us</a>
          <a href="/">Work With Us</a>
          <a href="/">Our Blogs</a>
          <a href="/">Trems & Condition</a>
        </div>
              <div className="footer__col">
                  <h4>USEFUL LINK</h4>
          <a href="/">Help</a>
          <a href="/">Track your order</a>
          <a href="/">men</a>
          <a href="/">women</a>
          <a href="/">Dresses</a>
              </div>
              <div className="footer__div">
                  <h4>INSTAGRAM</h4>
                  <div className="instagram__grid">
                      <img src={instaImg1} alt="" />
                      <img src={instaImg2} alt="" />
                      <img src={instaImg3} alt="" />
                      <img src={instaImg4} alt="" />
                      <img src={instaImg5} alt="" />
                      <img src={instaImg6} alt="" />
                  </div>
              </div>
          </footer>
          <div className='footer__bar'>copyright ©️ 2025 EthioLebaba gemechu hunduma. All rights reserved.</div>
    </>
  );
}

export default Footer
