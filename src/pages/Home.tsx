import type { FC } from "react";

// Import components
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <>
      <Header />

      <section className="relative h-screen w-full bg-[url('/hero-section-bg.jpg')] bg-cover bg-fixed bg-center pt-50 sm:pt-0">
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 z-0 bg-black/60" />

        {/* Content in the hero section */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="container">
            <h1 className="text-5xl leading-tight font-bold text-white md:text-7xl">
              Temukan Petualangan Anda <br />
              <span className="text-blue-500">Berikutnya</span>
            </h1>
            <p className="mt-4 text-lg text-white">
              Jelajahi destinasi yang memukau, temukan permata tersembunyi, dan
              ciptakan kenangan tak terlupakan dengan panduan perjalanan kami
              yang lengkap dan kiat orang dalam.
            </p>

            <Link to="/articles">
              <Button size="lg" className="mt-14 hover:cursor-pointer">
                Mulai Petualangan
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
