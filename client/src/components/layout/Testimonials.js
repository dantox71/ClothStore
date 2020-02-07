import React from "react";

const Testimonials = props => {
  return (
    <section id="testimonials">
      <h1>What our clients thinks about us ?</h1>

      <div className="container">
        <div className="testimonial">
          <p className="testimonial-text">
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum
            totam labore minima, pariatur ducimus aliquam voluptate sit vitae
            reprehenderit esse enim laborum suscipit est ratione alias culpa
            eveniet voluptatibus porro veniam asperiores rerum impedit possimus!
            Nesciunt rerum iusto fuga magni"
          </p>

          <div className="testimonial-info">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              className="img-rounded"
              alt="User Avatar"
            />
            <div className="d-flex-column">
              <p>
                Added by <span className="text-bold">John Doe</span>
              </p>
              <p>
                On <span className="text-bold">1 january 2020</span>
              </p>
            </div>
          </div>
        </div>

        <div className="testimonial">
          <p className="testimonial-text">
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum
            totam labore minima, pariatur ducimus aliquam voluptate sit vitae
            reprehenderit esse enim laborum suscipit est ratione alias culpa
            eveniet voluptatibus porro veniam asperiores rerum impedit possimus!
            Nesciunt rerum iusto fuga magni"
          </p>

          <div className="testimonial-info">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              className="img-rounded"
              alt="User Avatar"
            />
            <div className="d-flex-column">
              <p>
                Added by <span className="text-bold">John Doe</span>
              </p>
              <p>
                On <span className="text-bold">1 january 2020</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
