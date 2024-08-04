import Directory from "../../components/directory/directory.component";
import HomeSlider from "../../components/home-slider/home-slider.component";
import phoneImg from "../../assets/images/phones.jpg";
import laptopImg from "../../assets/images/laptops.jpg";
import tabletImg from "../../assets/images/tablets.jpg";
import speakerImg from "../../assets/images/speakers.jpg";
import accessoryImg from "../../assets/images/accessories.jpg";

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "Phones",
      imageUrl: phoneImg,
    },
    {
      id: 2,
      title: "Laptops",
      imageUrl: laptopImg,
    },
    {
      id: 3,
      title: "Tablets",
      imageUrl: tabletImg,
    },
    {
      id: 4,
      title: "Audio",
      imageUrl: speakerImg,
    },
    {
      id: 5,
      title: "Accessories",
      imageUrl: accessoryImg,
    },
  ];

  return (
    <div>
      <HomeSlider />
      <Directory categories={categories} />
    </div>
  );
};

export default Home;
