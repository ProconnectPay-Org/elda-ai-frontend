import HomeNavBar from "@/components/HomeNav";
import Man from "../../assets/hero-man.png";
import Line from "../../assets/headerline.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HomeFooter from "@/components/HomeFooter";

const Home = () => {
  return (
    <div>
      <HomeNavBar />
      <div className="flex flex-col md:flex-row md:items-center gap-8 py-8 px-8 sm:px-12 lg:px-16">
        <div className="md:w-1/2 flex flex-col gap-6 lg:gap-10 items-start">
          <div className="relative">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-500 md:tracking-wide">
              <span className="block relative mb-4">AI Assisted</span>
              <span className="block relative lg:mb-2 whitespace-nowrap sm:whitespace-normal">Human Intelligence</span>
              <span className="block">Software Portal</span>
            </h1>
            <img
              src={Line}
              alt="Line Image"
              className="w-full max-w-[200px] top-10 h-4 lg:max-w-[340px] lg:h-6 mx-auto absolute lg:top-[58px]"
            />
          </div>
          <p className="text-lg lg:text-2xl sm:w-3/4 text-gray-500 md:leading-relaxed">
            Leverage our personalized AI to refine your resume, craft your
            personalized statement of purpose, and get your school application
            in front of 5,000 Universities and Colleges Globally.
          </p>
          <Button className="bg-red rounded-lg p-3 w-28 h-12 text-lg flex items-center justify-center">
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </div>
        <div className="w-full md:w-1/2">
          <img src={Man} alt="a man" />
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default Home;
