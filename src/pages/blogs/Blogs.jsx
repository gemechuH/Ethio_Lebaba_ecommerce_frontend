import React from "react";
import blogsData from "../../data/blogs.json";

const Blogs = () => {
  return (
    <section className="section__container blog__container">
      <h2 className="section__header">Latest From Blog</h2>
      <p className="section__subheader">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, eos
        Lorem ipsum dolor sit.
      </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {blogsData.map((blogs, index) => (
          <div
            key={index}
            className="blog__Card cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <img src={blogs.imageUrl} alt="blogs image" className="rounded-xl" />
                <div className="blog__card__content">
                    <h6>{blogs.subtitle}</h6>
                    <h4>{blogs.title}</h4>
                    <p>{blogs.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
