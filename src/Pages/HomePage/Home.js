import { useEffect, useRef, useState } from "react";
import { Buffer } from "buffer";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate, NavLink } from "react-router-dom";
import { Navigation, Autoplay, Pagination } from "swiper/modules"; // Import necessary modules
import matter from "gray-matter";
import "swiper/css"; // Core Swiper styles
import "swiper/css/navigation"; // Navigation buttons styles
import "swiper/css/pagination";
import "./home.css"; // Our custom SCSS
import ClipLoader from "react-spinners/ClipLoader";
import { getProductList } from "../../API/mangoholidayAPI";

if (typeof window !== "undefined" && !window.Buffer) {
  window.Buffer = Buffer;
}

const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(
  require.context("../../BlogsMdFiles", false, /\.md$/)
);

// Add / Update your Banners here (Add the static links for navigation here in "navigationLink" key as either "india-tour/xyz" / "internation-tour/xyz")
const bannerData = [
  {
    id: 1,
    image: "/img/home-banner.webp",
    title: "JAPAN 2026",
    subtitle: "Say Konnichiwa Japan with us!",
    navigationLink: "internation-tour/japan",
  },
  {
    id: 2,
    image: "/img/home-banner.webp",
    title: "Vietnam 2026",
    subtitle: "Say Xin chào Vietnam with us!",
    navigationLink: "internation-tour/vietnam-cambodia",
  },
  {
    id: 3,
    image: "/img/home-banner.webp",
    title: "Europe 2026",
    subtitle: "Say Hola Europe with us!",
    navigationLink: "internation-tour/europe",
  },
  {
    id: 4,
    image: "/img/home-banner.webp",
    title: "Dubai 2026",
    subtitle: "Say مرحبًا Dubai with us!",
    navigationLink: "internation-tour/dubai",
  },
  // Add more banner objects as needed
];

// Add or Update the BEST SELLING TOURS here (Add the static links for navigation here in "navigationLink" key)
// const best_selling = [
//   {
//     navigationLink: "503/SAM4/mysteries-of-south-america",
//     img: "/img/BestSelling/South-American-mysteries.jpg",
//     ProductTitle: "MYSTERIES OF SOUTH AMERICA",
//     days: "18",
//     nights: "17",
//   },
//   {
//     navigationLink: "280/DX5/super-saver-dubai-vacation",
//     img: "/img/BestSelling/Dubai-Dreams.jpg",
//     ProductTitle: "Dubai Dreams",
//     days: "5",
//     nights: "4",
//   },
//   {
//     navigationLink: "513/GE/glimpses-of-europe",
//     img: "/img/BestSelling/Glimpses-of-europe.jpg",
//     ProductTitle: "Glimpses of Europe",
//     days: "14",
//     nights: "13",
//   },
//   {
//     navigationLink: "478/V2/vietnam-cambodia",
//     img: "/img/BestSelling/Vietnam-Combodia.jpg",
//     ProductTitle: "Vietnam Cambodia",
//     days: "8",
//     nights: "7",
//   },
//   {
//     navigationLink: "523/NL/northern-lights",
//     img: "/img/BestSelling/Northern-Lights.webp",
//     ProductTitle: "Northern Lights",
//     days: "9",
//     nights: "8",
//   },
//   {
//     navigationLink: "#",
//     img: "/img/BestSelling/South-africa-with-kruger.jpg",
//     ProductTitle: "South Africa with Kruger",
//     days: "15",
//     nights: "14",
//   },
//   {
//     navigationLink: "11/D1/dubai-abu-dhabi",
//     img: "/img/BestSelling/Dubai-Abu-dhabi.jpg",
//     ProductTitle: "Dubai Abu Dhabi",
//     days: "6",
//     nights: "5",
//   },
//   {
//     navigationLink: "522/S3/south-african-safari",
//     img: "/img/BestSelling/South-africa-Safari.webp",
//     ProductTitle: "South African Safari",
//     days: "10",
//     nights: "9",
//   },
//   {
//     navigationLink: "5/E1/exotic-Europe",
//     img: "/img/BestSelling/Exotic-Europe.jpg",
//     ProductTitle: "Exotic Europe",
//     days: "18",
//     nights: "17",
//   },
// ];

// Add or Update the UPCOMMING INTERNATIONAL TOURS here (Add the static links for navigation here in "navigationLink" key)
const upcoming_international_tours = [
  {
    navigationLink: "#",
    img: "/img/LuxeHolidays/Russia-with-northern-lights.jpg",
    ProductTitle: "Russia with Northern lights",
  },
  {
    navigationLink: "#",
    img: "/img/LuxeHolidays/Iceland-with-northern-lights.jpg",
    ProductTitle: "Iceland with Northern lights",
  },
  {
    navigationLink: "503/SAM4/mysteries-of-south-america",
    img: "/img/LuxeHolidays/South-American-mysteries.jpg",
    ProductTitle: "Mysteries of South America",
  },
  {
    navigationLink: "535/KM1/kenyan-migration",
    img: "/img/LuxeHolidays/Africa-with-Kenyan-Migration.webp",
    ProductTitle: "Africa with Kenyan Migration",
  },
  {
    navigationLink: "523/NL/northern-lights",
    img: "/img/LuxeHolidays/northern-Lights.webp",
    ProductTitle: "Northern Lights",
  },
  {
    navigationLink: "#",
    img: "/img/LuxeHolidays/South-africa-with-Kruger.jpg",
    ProductTitle: "South Africa with Kruger",
  },
  {
    navigationLink: "16/A1/new-zealand-Australia",
    img: "/img/LuxeHolidays/Australia-Newzealand.jpg",
    ProductTitle: "Australia New Zealand",
  },
];

// Add or Update the POPULAR POCKET FRIENDLY Tours here (Add the static links for navigation here in "navigationLink" key)
const pocket_friendly_tours = [
  {
    navigationLink: "#",
    img: "/img/PocketFriendlyTours/Russia-with-northern-lights.jpg",
    ProductTitle: "Russia with Northern lights",
  },
  {
    navigationLink: "478/V2/vietnam-cambodia",
    img: "/img/PocketFriendlyTours/Vietnam-Cambodia.jpg",
    ProductTitle: "Vietnam Cambodia",
  },
  {
    navigationLink: "#",
    img: "/img/PocketFriendlyTours/South-africa-with-kruger.jpg",
    ProductTitle: "South Africa with kruger",
  },
  {
    navigationLink: "513/GE/glimpses-of-europe",
    img: "/img/PocketFriendlyTours/Glimpses-of-europe.jpg",
    ProductTitle: "Glimpses of Europe",
  },
  {
    navigationLink: "280/DX5/super-saver-dubai-vacation",
    img: "/img/PocketFriendlyTours/Dubai-Dreams.jpg",
    ProductTitle: "Dubai Dreams",
  },
  {
    navigationLink: "503/SAM4/mysteries-of-south-america",
    img: "/img/PocketFriendlyTours/South-American-mysteries.jpg",
    ProductTitle: "Mysteries of South America",
  },
];

// Add or Update the youtube videos here
const videos = [
  {
    video: "https://youtu.be/sVx3ZNPHi78",
    author: "Mrs Dhanashree Bhide",
  },

  {
    video: "https://youtu.be/t2YP3NYK46c",
    author: "Mrs Ashwini",
  },
  {
    video: "https://youtu.be/SJTkhsxb2bo",
  },
  {
    video: "https://youtu.be/sVx3ZNPHi78",
    author: "Mrs Dhanashree Bhide",
  },

  {
    video: "https://youtu.be/t2YP3NYK46c",
    author: "Mrs Ashwini",
  },
  {
    video: "https://youtu.be/SJTkhsxb2bo",
  },
];

const Home = () => {
  const swiperRef = useRef(null); // Ref for Swiper instance
  const [activeIndex, setActiveIndex] = useState(1); // middle by default
  const [testimonial, setTestimonials] = useState([]);
  const [videoModal, setVideoModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagePopupVisible, setImagePopupVisible] = useState(false); // **NEW: State for image popup**
  const [loading, setLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home | Mango Holidays";
  }, []);

  useEffect(() => { });

  // Best Sellers API Calling function
  useEffect(() => {
    async function fetchTours() {
      try {
        const worldParams = { ProductType: "World" };
        const worldData = await getProductList(worldParams);
        // console.log("Raw Data:", worldData);

        if (!worldData?.ProductList || !Array.isArray(worldData.ProductList)) {
          console.warn("No tours found or invalid data structure");
          setBestSellers([]);
          return;
        }

        const bestSellingGITTours = worldData.ProductList.filter(
          (item) => item.IsBestSelling === true && item.TravelType === "GIT"
        );

        // console.log("Best-Selling GIT Tours:", bestSellingGITTours);
        setBestSellers(bestSellingGITTours);

      } catch (err) {
        console.error("Failed to load products:", err.message);
        setBestSellers([]);

      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  // **NEW: useEffect to auto-show the image popup after 3 seconds**
  useEffect(() => {
    // Set the timer to show the image popup after 3 seconds
    const timer = setTimeout(() => {
      setImagePopupVisible(true);
    }, 3000);

    // Cleanup: clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []); // Run only once on mount

  // **UPDATED: Combined useEffect to handle scroll lock for BOTH modals**
  useEffect(() => {
    // Lock scroll if EITHER videoModal OR imagePopupVisible is true
    const isAnyModalOpen = videoModal || imagePopupVisible;
    document.body.style.overflow = isAnyModalOpen ? "hidden" : "auto";
  }, [videoModal, imagePopupVisible]); // Reruns whenever any modal state changes

  useEffect(() => {
    import("../../Testimonials/testimonial.md")
      .then((res) => fetch(res.default))
      .then((r) => r.text())
      .then((text) => {
        const blocks = text.split("---").filter((b) => b.trim());

        const parsed = blocks.map((block) => {
          const obj = {};

          block
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line && line.includes(":"))
            .forEach((line) => {
              const [rawKey, ...rawValueParts] = line.split(":");
              const key = rawKey.trim();
              let value = rawValueParts.join(":").trim();

              value = value.replace(/^"|"$/g, "").replace(/\r/g, "");

              if (key === "img") {
                // When using create-react-app, PUBLIC_URL points to /public
                value = `${process.env.PUBLIC_URL}${value}`;
              }

              obj[key] = value;
            });

          return obj;
        });

        // console.log("✅ Parsed Testimonials:", parsed);
        setTestimonials(parsed);
      })
      .catch((err) => console.error("❌ Error loading testimonials:", err));
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToTourDetails = (navLink) => {
    // console.log(`/tour-details/${navLink}`)
    handleScrollToTop();
    navigate(`/tour-details/${navLink}`);
  };

  const gotoPackagesPage = (navLink) => {
    // console.log(`/packages/${navLink}`)
    handleScrollToTop();
    navigate(`/packages/${navLink}`);
  };

  const openModal = () => {
    setVideoModal(true);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setVideoModal(false), 300);
  };

  // **NEW: Function to close the new image popup**
  const closeImagePopup = () => {
    setImagePopupVisible(false);
  };

  // Blogs context
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    document.title = "Travel Blogs | Insights by Mango Holidays";

    const loadBlogs = async () => {
      const loadedBlogs = await Promise.all(
        markdownFiles.map(async (file) => {
          const response = await fetch(file);
          const text = await response.text();
          const { data } = matter(text);
          return data;
        })
      );

      // Blogs to be renddered based upon their Dates (Newest to Oldest)
      const sortedBlogs = loadedBlogs.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setBlogs(sortedBlogs);
    };

    loadBlogs();
  }, []);

  const goToReadMore = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/blog-details/${id}`);
  };

  return (
    <>
      {/* Banner Section */}
      <section className="hero-banner-section">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          autoplay={{
            delay: 5000, // 5 seconds
            disableOnInteraction: false,
          }}
          loop={true} // Loop the slides
          speed={800} // Transition speed
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="hero-swiper"
        >
          {bannerData.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="banner-slide">
                <div className="img-container">
                  <img src={banner.image} alt="Banner Unavailable" />
                </div>

                <div
                  className="banner-overlay"
                  onClick={() => gotoPackagesPage(banner.navigationLink)}
                >
                  <h1>{banner.title}</h1>
                  <h2>{banner.subtitle}</h2>
                  <div className="global-experience-badge">
                    <img
                      src="/img/global-experience-local-comfort.webp"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Arrows */}
          <div
            className="swiper-button-prev-custom"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            &#10094; {/* Left arrow */}
          </div>
          <div
            className="swiper-button-next-custom"
            onClick={() => swiperRef.current?.slideNext()}
          >
            &#10095; {/* Right arrow */}
          </div>
        </Swiper>

        <div className="cloud-img-container">
          <img src="/img/banner-wave.webp" alt="" />
        </div>
      </section>

      {/* Best selling packges section */}
      <section className="best_selling_packges">
        <div className="section-heading">
          <div className="top-heading">
            <h2>Explore</h2>
          </div>
          <h1>Best Selling Packages</h1>
          <p>
            Discover handpicked tours tailored just for you. Leave the planning
            to us, and indulge in unforgettable adventures hassle-free.
          </p>
        </div>

        <div className="best_selling_swiper">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            slidesPerGroup={3}
            pagination={{ clickable: true, el: ".custom-pagination-2" }}
            breakpoints={{
              320: { slidesPerView: 1, slidesPerGroup: 1 },
              700: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 3, slidesPerGroup: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {
              loading ?
                <div className="loader-container-home" >
                  <ClipLoader color="#ff5f10" loading={loading} size={100} />
                  <p className="loading-text">Fetching Best Selling tours...</p>
                </div>
                :
                Array.isArray(bestSellers) && bestSellers.length > 0 &&
                bestSellers.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="best-selling-image-container">
                      <div className="best-selling-image">
                        <img src={slide.ProductImage} alt="Banner Unavailable" />
                      </div>

                      <NavLink
                        className="hover-overlay"
                        to={`/tour-details/${slide.ProductID}/${slide.ProductCode}/${slide.ProductTitle.toLowerCase().replace(/\s+/g,"-")}`}
                        onClick={handleScrollToTop}
                      >
                        <i className="fas fa-link fa-2x"></i>
                      </NavLink>

                      <div className="best-selling-overlay-content">
                        <h3>{slide.ProductTitle}</h3>
                        <p>
                          {slide.Days} days | {slide.Nights} nights
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
            }
          </Swiper>
          {/* Custom Pagination */}
          <div className="custom-pagination-2"></div>
        </div>
      </section>

      {/* Upcoming international tours section */}
      <section className="upcoming_international_tours">
        <div className="section-heading">
          <div className="top-heading">
            <h2>Upcoming International Tours</h2>
          </div>
          <h1>Luxe Holidays</h1>
        </div>

        <div className="upcoming_international_swiper">
          <Swiper
            modules={[Pagination]}
            spaceBetween={12}
            slidesPerView={5}
            slidesPerGroup={4}
            pagination={{ clickable: true, el: ".custom-pagination-3" }}
            breakpoints={{
              320: { slidesPerView: 1, slidesPerGroup: 1 },
              700: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 3 },
              1200: { slidesPerView: 5 },
            }}
          >
            {upcoming_international_tours.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="upcomming-tour-image-container">
                  <div className="upcomming-tour-image">
                    <img src={slide.img} alt="Banner Unavailable" />
                  </div>

                  <div
                    className="hover-overlay"
                    onClick={() => goToTourDetails(slide.navigationLink)}
                  >
                    <i className="fas fa-link fa-2x"></i>
                  </div>

                  <h3>{slide.ProductTitle}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Pagination */}
          <div className="custom-pagination-3"></div>
        </div>

        <NavLink to="/luxetours" onClick={handleScrollToTop}>
          <button className="btn-c">View All</button>
        </NavLink>
      </section>

      {/* Pocket friendly tours */}
      <section className="popular-pocket-friendly-tours">
        <div className="section-heading">
          <div className="top-heading">
            <h2>Popular</h2>
          </div>
          <h1>Our Most Popular Pocket Friendly Tours</h1>
        </div>

        <div className="popular-pocket-friendly-tours-swiper">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={6}
            slidesPerGroup={3}
            pagination={{ clickable: true, el: ".custom-pagination-4" }}
            breakpoints={{
              300: { slidesPerView: 1, slidesPerGroup: 1 },
              400: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1200: { slidesPerView: 6 },
            }}
          >
            {pocket_friendly_tours.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="slide-card">
                  <div
                    className="img-container"
                    onClick={() => goToTourDetails(slide.navigationLink)}
                  >
                    <img src={slide.img} alt={slide.ProductTitle} />
                  </div>
                  <p>{slide.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Pagination */}
          <div className="custom-pagination-4"></div>
        </div>
      </section>

      {/* Testimonials - Our Client Speaks */}
      <section className="our-client-says">
        <div className="section-heading">
          <div className="top-heading">
            <h2>Our Clients Speak</h2>
          </div>
          <h1>Our Clients Say!!!</h1>
        </div>

        <div className="our-client-says-swiper">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            slidesPerGroup={1}
            pagination={{ clickable: true, el: ".custom-pagination-5" }}
            navigation={{
              prevEl: ".prev-custom",
              nextEl: ".next-custom",
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1200: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              const middleIndex =
                swiper.activeIndex +
                Math.floor(swiper.params.slidesPerView / 2);
              setActiveIndex(middleIndex);
            }}
          >
            {testimonial.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`testimonial-card ${index === activeIndex ? "active" : ""
                    }`}
                >
                  <div className="content">
                    <p className="testimonial-text">{slide.text}</p>
                    <h4 className="testimonial-author">{slide.author}</h4>
                  </div>

                  <div className="testimonial-footer">
                    <div className="testimonial-image">
                      <img src={slide.img} alt={slide.author} />
                    </div>
                    <div className="testimonial-stamp">
                      <img
                        src="/img/Happy-traveller-webp-200x109.webp"
                        alt="stamp"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 💡 2. ADD THE CUSTOM NAVIGATION HTML ELEMENTS */}
          <div className="swiper-navigation-wrapper">
            <div className="prev-custom">
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="next-custom">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          {/* Custom Pagination */}
          <div className="custom-pagination-5"></div>
        </div>
      </section>

      {/* Youtube Videos - Our Client speaks  */}
      <section className="our-client-videos">
        <div className="section-heading">
          <h1>Our Clients Video</h1>
        </div>

        <div className="our-client-videos-swiper">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            slidesPerGroup={1}
            pagination={{ clickable: true, el: ".custom-pagination-6" }}
            navigation={{
              prevEl: ".video-prev-custom",
              nextEl: ".video-next-custom",
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1200: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {videos.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="video-container">
                  <iframe
                    src={`https://www.youtube.com/embed/${slide.video.split("youtu.be/")[1]
                      }?rel=0`}
                    title={`YouTube video ${index}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <h2 className="video-author">{slide.author}</h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 💡 2. ADD THE CUSTOM NAVIGATION HTML ELEMENTS */}
          <div className="swiper-navigation-wrapper-videos">
            <div className="video-prev-custom">
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="video-next-custom">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          {/* Custom Pagination */}
          <div className="custom-pagination-6"></div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="blog-section">
        <div className="blog-grid">
          {blogs.length === 0 ? (
            <p className="no-blogs">No blogs found.</p>
          ) : (
            blogs.slice(0, 3).map((blog) => (
              <div key={blog.id} className="blog-card">
                <div className="blog-image-container">
                  <div className="blog-image">
                    <img src={blog.background_image} alt={blog.title} />
                  </div>
                  <p className="blog-date">
                    <i className="fa fa-calendar-alt" /> {blog.date}
                  </p>
                </div>

                <div className="blog-content">
                  <h2 onClick={() => goToReadMore(blog.id)}>{blog.title}</h2>
                  <p>{blog.subtitle}</p>
                  <div className="button-container">
                    <button
                      className="btn-c"
                      onClick={() => goToReadMore(blog.id)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="bottom-video-section">
        <div className="bottom-image-container">
          <img src="/img/videobg.webp" alt="Unavailable" />
        </div>
        <div className="overlay-video-icon">
          <img src="/img/video.png" alt="Unavailable" />
        </div>
      </section>

      {/* -- Why Choose Us Section -- */}
      <section className="why-choose-us-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>

          <div className="choose-us-grid">
            {/* Left cards */}
            <div className="cards-left">
              <div className="card-left">
                <div className="card-text">
                  <h2>Values Over Volumes</h2>
                  <p>
                    Unlike mass tour operators, we organize a select number of
                    exclusive tours to each destination annually, allowing us to
                    focus on quality and personalized experiences.
                  </p>
                </div>

                <div className="icon-container">
                  <img src="/img/values.webp" alt="Icon Unavailable" />
                </div>
              </div>

              <div className="card-left">
                <div className="card-text">
                  <h2>Quality Over Quantity</h2>
                  <p>
                    We prioritize quality in every aspect of our service, from
                    selecting the finest airlines and accommodations to
                    providing premium transportation and tour experiences.
                  </p>
                </div>

                <div className="icon-container">
                  <img src="/img/quality.webp" alt="Icon Unavailable" />
                </div>
              </div>
            </div>

            {/* Right cards */}
            <div className="cards-right">
              <div className="card-right">
                <div className="icon-container">
                  <img src="/img/team.webp" alt="Icon Unavailable" />
                </div>
                <div className="card-text">
                  <h2>Qualified Team</h2>
                  <p>
                    Our team comprises passionate and experienced individuals
                    who are dedicated to making your holidays memorable.
                  </p>
                </div>
              </div>

              <div className="card-right">
                <div className="icon-container">
                  <img src="/img/honesty.webp" alt="Icon Unavailable" />
                </div>
                <div className="card-text">
                  <h2>Honest & Ethical Interactions</h2>
                  <p>
                    With Mango Holidays, you can trust that you’ll receive
                    transparent and honest dealings, with no hidden costs or
                    surprises along the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Youtube circle Fixed - With Modal */}
      <section className="youtube-circle fade-in" onClick={openModal}>
        <img src="/img/videofloat.png" alt="Unavailable" />

        {videoModal && (
          <div
            className={`modal-overlay ${isModalVisible ? "active" : "closing"}`}
            onClick={closeModal}
          >
            <div
              className="modal-youtube-video"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-video-container">
                <iframe
                  src="https://youtube.com/embed/AkJA2D2P2_w?feature=share"
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <span className="close" onClick={closeModal}>
                ✖
              </span>
            </div>
          </div>
        )}
      </section>

      {/* **NEW: Auto-show Image Popup Section** */}
      {imagePopupVisible && (
        <div className="image-popup-overlay" onClick={closeImagePopup}>
          <div
            className="image-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="close-image-popup" onClick={closeImagePopup}>
              &times;
            </span>
            {/* NOTE: You MUST replace '/img/popup-offer.webp' with the actual path to your desired popup image. */}
            <img src="/img/popup-banner.jpg" alt="Special Offer Popup" />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
