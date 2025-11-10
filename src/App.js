// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/footer";

// Pages
import Home from "./Pages/HomePage/Home";
import About from "./Pages/AboutPage/About";
import { Contact } from "./Pages/ContactPage/Contact";
import TermsConditions from "./Pages/TermsConditionsPage/TermsConditions";
import Blogs from "./Pages/BlogsPage/Blogs";
import Careers from "./Pages/CareersPage/Careers";
import PhotoGallery from "./Pages/PhotoGalleryPage/PhotoGallery";
import VideoBlog from "./Pages/VideoBlogsPage/VideoBlog";
import Packages from "./Pages/PackagesPage/Packages";
import TourDetails from "./Pages/TourDetailsPage/TourDetails";
import Faq from "./Pages/FaqPage/Faq";
import HowToBook from "./Pages/HowToBookPage/HowToBook";
import Franchise from "./Pages/FranchisePage/Franchise";
import TourTalks from "./Pages/TourTalksPage/TourTalks";
import Testimonials from "./Pages/TestimonialsPage/Testimonials";
import BlogDetails from "./Pages/BlogDetailsPage/BlogDetails";
import Luxetours from "./Pages/LuxetoursPage/Luxetours";
import Search from "./Pages/SearchPage/Search";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />

        <main style={{ minHeight: "80vh", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/termCondition" element={<TermsConditions />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/photo-gallery" element={<PhotoGallery />} />
            <Route path="/video-blogs" element={<VideoBlog />} />
            <Route path="/faqs" element={<Faq />} />
            <Route path="/how-to-book" element={<HowToBook />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/tour-talks" element={<TourTalks />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/luxetours" element={<Luxetours/>} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog-details/:id" element={<BlogDetails />} />
            <Route path="/packages/:tour-type/:location" element={<Packages />} />
            <Route path="/tour-details/:product-id/:product-code/:product-title" element={<TourDetails />} />
            
            <Route path="/search/:search-elements" element={<Search />} />

            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
