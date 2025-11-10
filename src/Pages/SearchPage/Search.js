import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { getProductList } from "../../API/mangoholidayAPI";
import "./search.css";

const Search = () => {
    const { "search-elements": searchElements } = useParams();
    const [tourPackages, setTourPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // API Calling function
    useEffect(() => {
        async function fetchTours() {
            if (!searchElements) return;
            setLoading(true);

            try {
                const [worldData, indiaData] = await Promise.all([
                    getProductList({ ProductType: "World" }),
                    getProductList({ ProductType: "India" }),
                ]);

                const allTours = [
                    ...(worldData?.ProductList || []).map((item) => ({
                        ...item,
                        ProductType: "World",
                    })),
                    ...(indiaData?.ProductList || []).map((item) => ({
                        ...item,
                        ProductType: "India",
                    })),
                ];

                const searchTerm = searchElements.toLowerCase().trim();

                const filteredTours = allTours.filter((item) => {
                    const {
                        ProductTitle = "",
                        SectorName = "",
                        ProductType = "",
                        TravelType = "",
                        Days = "",
                        Nights = "",
                    } = item;

                    return (
                        ProductTitle.toLowerCase().includes(searchTerm) ||
                        SectorName.toLowerCase().includes(searchTerm) ||
                        ProductType.toLowerCase().includes(searchTerm) ||
                        TravelType.toLowerCase().includes(searchTerm) ||
                        Days.toString().includes(searchTerm) ||
                        Nights.toString().includes(searchTerm)
                    );
                });

                const today = new Date();
                const formattedTours = filteredTours.map((item) => {
                    const {
                        ProductID,
                        ProductCode,
                        ProductTitle,
                        Days,
                        Nights,
                        ProductImage,
                        ProductPricingHeader,
                        TravelType,
                        LowestTwinSharingPrice,
                        SectorName,
                        ProductType,
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

                    return {
                        ProductID,
                        ProductCode,
                        ProductTitle,
                        Days,
                        Nights,
                        ProductImage,
                        NETINRValue: matchedNetINRValue,
                        TravelType,
                        LowestTwinSharingPrice,
                        SectorName,
                        ProductType,
                    };
                });

                setTourPackages(formattedTours);
            } catch (err) {
                console.error("Failed to load products:", err.message);
                setTourPackages([]);
            } finally {
                setLoading(false);
            }
        }

        fetchTours();
    }, [searchElements]);

    return (
        <>
            {/* Banner Section */}
            <section className="banner-section-search">
                <div className="img-container-search">
                    <img src="/img/exotic-europe-banner.webp" alt="Banner Unavailable" />
                </div>
                <div className="banner-overlay-search" />
            </section>


            {/* Search Context */}
            <section className="search-context">
                <h2>Search Results for:</h2>
                <h3>{searchElements}</h3>
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
                                                to={`/tour-details/${pkg.ProductID}/${pkg.ProductCode
                                                    }/${pkg.ProductTitle.toLowerCase().replace(
                                                        /\s+/g,
                                                        "-"
                                                    )}`}
                                                onClick={handleScrollToTop}
                                            >
                                                <p>See Details</p>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) :
                        <div className="no-search-context">
                            <h3>Sorry, No Search Results found !!! </h3>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default Search