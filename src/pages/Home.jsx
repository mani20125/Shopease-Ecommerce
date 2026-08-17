import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import TrendingProducts from "../components/home/TrendingProducts";

function Home() {
  return (
    <div className="bg-[#F9F9FB] min-h-screen">
      <Hero />
      <Categories />
      <TrendingProducts />
    </div>
  );
}

export default Home;