import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Flickity from "flickity";
import "flickity/dist/flickity.min.css";
import "./home-slider.style.scss";
import bg1 from "../../assets/images/devicesbg.jpg";
import bg2 from "../../assets/images/excitedbg.jpg";
import bg3 from "../../assets/images/servicebg.jpg";

const HomeSlider = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const options = {
      accessibility: true,
      prevNextButtons: true,
      pageDots: true,
      setGallerySize: false,
      wrapAround: true,
      arrowShape: {
        x0: 10,
        x1: 60,
        y1: 50,
        x2: 60,
        y2: 45,
        x3: 15,
      },
    };

    const flkty = new Flickity(carouselRef.current, options);
    const $slideContent = document.querySelectorAll(".slide-content");

    flkty.on("settle", () => {
      const selectedSlide = flkty.selectedElement;
    });

    flkty.on("change", (index) => {
      $slideContent[index].classList.remove("mask");

      setTimeout(() => {
        $slideContent.forEach((el) => el.classList.add("mask"));
      }, 500);
    });

    flkty.on("dragStart", (event) => {
      const selectedSlide = flkty.selectedElement;
      let index = 0;

      if (event.layerX > 0) {
        // direction right
        index =
          Array.from(selectedSlide.parentNode.children).indexOf(selectedSlide) +
          1;
      } else {
        // direction left
        index =
          Array.from(selectedSlide.parentNode.children).indexOf(selectedSlide) -
          1;
      }

      $slideContent[index]?.classList.remove("mask");
    });

    setTimeout(() => {
      $slideContent.forEach((el) => el.classList.add("mask"));
    }, 500);

    const interval = setInterval(() => {
      flkty.next();
    }, 7000);

    return () => {
      flkty.destroy();
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className="hero-slider" ref={carouselRef} data-carousel>
        <div
          className="carousel-cell"
          style={{
            backgroundImage: `url(${bg1})`,
          }}
        >
          <div className="overlay"></div>
          <div className="slide-content">
            <div className="mask">
              <h2 className="title">Quality</h2>
            </div>
            <div className="divider"></div>
            <div className="mask">
              <p className="caption">
                All Our Products are carefully inspected for great quality
              </p>
              <Link to="/shop" className="btn">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div
          className="carousel-cell"
          style={{
            backgroundImage: `url(${bg2})`,
          }}
        >
          <div className="overlay"></div>
          <div className="slide-content">
            <div className="mask">
              <h2 className="title">Affordable</h2>
            </div>
            <div className="divider"></div>
            <div className="mask">
              <p className="caption">
                Great prices and deals, especially for returning customers!
              </p>
              <Link to="/auth" className="btn">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div
          className="carousel-cell"
          style={{
            backgroundImage: `url(${bg3})`,
          }}
        >
          <div className="overlay"></div>
          <div className="slide-content">
            <div className="mask">
              <h2 className="title">Excellent Customer Service</h2>
            </div>
            <div className="divider"></div>
            <div className="mask">
              <p className="caption">
                We aim to please. Feel free to contact us
              </p>
              <Link to="/contact" className="btn">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
