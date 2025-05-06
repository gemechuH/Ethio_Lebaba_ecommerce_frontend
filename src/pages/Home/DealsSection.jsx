import React from "react";
import dealsImg from "../../assets/deals.png";

const DealsSection = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt="deals image" />
      </div>
      <div className="deals__content">
        <h5>Get To 20% Discount</h5>
        <h4>Deals of This Month</h4>
        <p>
          Our women's Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Porro esse vero voluptatibus modi autem fuga id, accusamus quos
          commodi molestiae
        </p>
        <div className="deals__countdown flex-wrap">
          <div
            className="deals__countdown__card"
          >
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>15</h4>
            <p> Mins</p>
          </div>
          <div className="deals__countdown__card">
            <h4>05</h4>
            <p>Secs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
