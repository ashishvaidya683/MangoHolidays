import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "./packages.css";
import { getProductList } from "../../API/mangoholidayAPI";
import { Helmet } from "react-helmet";

// --- SEO Data Map ---
const TOUR_SEO = {
  europe: {
    title:
      "Europe Group Tours for Seniors | 55+ Escorted Europe Holidays | Mango Holidays",
    description:
      "Explore Europe with comfort & care. Mango Holidays offers 55+ senior citizen group tours across London, Paris, Switzerland, Italy & more — Indian meals, expert tour managers, premium hotels.",
  },
  japan: {
    title:
      "Japan Group Tours for Seniors | Cherry Blossom & Cultural Holidays | Mango Holidays",
    description:
      "Experience Japan’s charm with senior-friendly tours by Mango Holidays. Tokyo, Hiroshima, Osaka & more with Indian meals, comfort hotels, and caring tour managers.",
  },
  "south-america": {
    title:
      "South America Group Tours | Senior Citizen Escorted Holidays | Mango Holidays",
    description:
      "Discover South America with Mango Holidays — senior-friendly tours to Brazil, Argentina, Peru, Bolivia & Chile. Enjoy comfortable stays, expert tour leaders & authentic experiences.",
  },
  vietnam: {
    title:
      "Vietnam Group Tours for Seniors | Escorted Asia Holidays | Mango Holidays",
    description:
      "Travel through Vietnam with comfort & care. Explore Hanoi, Halong Bay, Da Nang & Ho Chi Minh City on senior-friendly group tours with Indian meals & caring tour managers.",
  },
  dubai: {
    title:
      "Dubai Group Tours for Seniors | Escorted Holidays to UAE | Mango Holidays",
    description:
      "Discover Dubai with Mango Holidays’ senior-friendly group tours. Visit Burj Khalifa, Desert Safari & more with Indian meals, comfortable hotels & expert tour escorts.",
  },
};

const Packages = () => {
  const { "tour-type": type, location, tourSlug } = useParams();

  const [tourLocation, setTourLocation] = useState(null);
  const [tourType, setTourType] = useState(null);
  const [currentProductType, setCurrentProductType] = useState(null);
  const [tourPackages, setTourPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to Convert the params, as for example: "south-america" to "South America"
  const formatTitle = (str) =>
    str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    setTourType(formatTitle(type));
    setTourLocation(formatTitle(location));
  }, [type, location]);

  // Fallback SEO if slug not found
  const seo = TOUR_SEO[tourSlug] || {
    title: "Mango Holidays | Group Tours for Seniors",
    description:
      "Explore senior-friendly group tours across the world with Mango Holidays — Indian meals, comfort stays, and expert tour managers.",
  };

  useEffect(() => {
    document.title = `${tourLocation} ${tourType} | Mango Holidays`;
  }, [tourLocation, tourType]);

  useEffect(() => {
    // console.log(type)
    if (type === "india-tour") {
      setCurrentProductType("India");
    } else {
      setCurrentProductType("World");
    }
  }, [type]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // API Calling function
  useEffect(() => {
    async function fetchTours() {
      if (!currentProductType || !tourLocation || !tourType) return;
      setLoading(true);

      try {
        const data = await getProductList({
          ProductType: currentProductType,
          SectorName: tourLocation,
        });
        // console.log(
        //   "Raw Data:",
        //   data,
        //   currentProductType,
        //   tourLocation,
        //   tourType
        // );

        if (!data?.ProductList || !Array.isArray(data.ProductList)) {
          console.warn("No tours found or invalid data structure");
          setTourPackages([]);
          return;
        }

        const today = new Date();
        // Group by SectorName
        const groupedData = data.ProductList.reduce((acc, item) => {
          const {
            SectorName,
            ProductID,
            ProductCode,
            ProductTitle,
            Days,
            Nights,
            ProductPricingHeader,
            ProductImage,
            TravelType,
            LowestTwinSharingPrice,
          } = item;
          let matchedNetINRValue = null;

          if (Array.isArray(ProductPricingHeader)) {
            for (const header of ProductPricingHeader) {
              const fromParts = header.TourDateFrom?.split("/") || [];
              const toParts = header.TourDateTo?.split("/") || [];

              const fromDate = new Date(
                `${fromParts[2]}-${fromParts[1]}-${fromParts[0]}`
              );
              const toDate = new Date(
                `${toParts[2]}-${toParts[1]}-${toParts[0]}`
              );

              if (today >= fromDate && today <= toDate) {
                matchedNetINRValue =
                  header?.ProductPricingDetail?.[0]?.NETINRValue ?? null;
                break;
              }
            }
          }

          if (!acc[SectorName]) acc[SectorName] = [];
          acc[SectorName].push({
            SectorName,
            ProductID,
            ProductCode,
            ProductTitle,
            Days,
            Nights,
            ProductImage,
            ProductPricingHeader,
            NETINRValue: matchedNetINRValue,
            TravelType,
            LowestTwinSharingPrice,
          });

          return acc;
        }, {});

        // Convert object to array
        const groupedArray = Object.keys(groupedData).map((sector) => ({
          sector,
          tours: groupedData[sector],
        }));

        let toursToShow = groupedArray[0]?.tours || [];
        if (tourType === "Internation Tour") {
          toursToShow = toursToShow.filter((tour) => tour.TravelType === "GIT");
        } else if (tourType === "Customized Tour") {
          toursToShow = toursToShow.filter((tour) => tour.TravelType === "FIT");
        }

        // console.log("Grouped Tours:", toursToShow.length, toursToShow);
        setTourPackages(toursToShow);
      } catch (err) {
        console.error("Failed to load products:", err.message);
        setTourPackages([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, [currentProductType, tourLocation, tourType]);

  return (
    <>
      {/* SEO Snippet */}
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>
      {/* Banner Section */}
      <section className="banner-section-packages">
        <div className="img-container-packages">
          {/* {console.log("tourPackagesssss:", tourPackages[0].ProductImage)} */}
          {tourPackages && tourPackages.length > 0 && (
            <img src={tourPackages[0].ProductImage} alt="Banner Unavailable" />
          )}{" "}
        </div>
        <div className="banner-overlay-packages">
          <h1 className="banner-title-packages">
            {tourPackages[0]?.SectorName ? tourPackages[0]?.SectorName : ""}{" "}
          </h1>
        </div>
      </section>

      {/* Packages Section */}
      <section className="packages-cards-section">
        <div className="container">
          {loading ? (
            <div className="loader-container">
              <ClipLoader color="#ff5f10" loading={loading} size={100} />
              <p className="loading-text">Fetching tours...</p>
            </div>
          ) : tourPackages.length > 0 ? (
            <div className="packages-grid">
              {tourPackages.map((pkg) => (
                <div key={pkg.ProductCode} className="package-image-container">
                  <div className="package-image">
                    <img src={pkg.ProductImage} alt="Banner Unavailable" />
                  </div>

                  <div className="hover-overlay">
                    <i className="fas fa-link fa-2x"></i>
                  </div>

                  <div className="package-overlay-content">
                    <h3>{pkg.ProductTitle}</h3>
                    <p>
                      {pkg.Days} days | {pkg.Nights} nights
                    </p>
                    <div className="price-bar">
                      {/* <h3>{pkg.NETINRValue && '₹ ' + Number(pkg.NETINRValue).toLocaleString("en-IN")}</h3> */}
                      {/* <h3>{pkg.LowestTwinSharingPrice && '₹ ' + Number(pkg.LowestTwinSharingPrice).toLocaleString("en-IN")}</h3> */}
                      <h3>
                        {pkg.LowestTwinSharingPrice
                          ? "₹ " +
                            Number(pkg.LowestTwinSharingPrice).toLocaleString(
                              "en-IN"
                            )
                          : pkg.NETINRValue
                          ? "₹ " +
                            Number(pkg.NETINRValue).toLocaleString("en-IN")
                          : ""}
                      </h3>
                      <NavLink
                        to={`/tour-details/${pkg.ProductID}/${
                          pkg.ProductCode
                        }/${pkg.ProductTitle.toLowerCase().replace(
                          /\s+/g,
                          "-"
                        )}`}
                        state={{ productImg: pkg.ProductImage }} // Add state here
                        onClick={handleScrollToTop}
                      >
                        <p>See Details</p>
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="data-unavailable-banner">
              <img
                src="/img/data-not-available.webp"
                alt="No Tours available"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Packages;
