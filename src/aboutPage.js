import React from "react";
import { useGlobalContext } from "./context";

function AboutPage() {
  let { setIsMainPage } = useGlobalContext();
  setIsMainPage(false);
  return (
    <div>
      <div className="blank-space">
        <div className="blank-space-center">
          <p>Home / About</p>
        </div>
      </div>
      <div className="about-page">
        <h1 className="featured-heading about-heading">
          <span>/ </span>About Us
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eius
          numquam, sed eveniet consequatur consectetur dolorum cumque, iste
          reprehenderit quas in voluptatem, neque nihil doloremque inventore
          obcaecati ad repudiandae reiciendis ipsa voluptatum. Porro quam earum
          esse explicabo reprehenderit. Eos architecto repudiandae, incidunt
          optio iste reiciendis quia. Numquam harum dolor sequi sunt et, facilis
          a vel itaque quas officiis eligendi dignissimos debitis perspiciatis
          esse eius ducimus doloremque sit voluptate praesentium! Nemo obcaecati
          eligendi nulla assumenda vero velit voluptates itaque, repellendus
          repudiandae repellat perspiciatis? Adipisci, praesentium quas libero
          dolores quae neque laborum qui ut dolor odio consectetur, molestias
          quis omnis iusto rem. Lorem ipsum dolor.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
