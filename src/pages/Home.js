import { useEffect } from "react";
import Header from "../components/Header";
import ListBook from "../components/Listbook";

const Home = (props) => {
  useEffect(() => {
    document.title = "Kitaplik";
  }, []);
  return (
    <div className="App">
      <Header />
      <ListBook />
    </div>
  );
};
export default Home;
