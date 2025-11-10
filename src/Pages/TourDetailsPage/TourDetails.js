import { useEffect, useState, useRef } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import "./tourDetails.scss";
import {
  getProductDetails,
  getTourPricingDetails,
} from "../../API/mangoholidayAPI";
import ClipLoader from "react-spinners/ClipLoader";
import emailjs from "@emailjs/browser";

const navbar = [
  {
    text: "Itinerary",
    iconSrc: "/img/itinerary.png",
  },
  {
    text: "Date & Price",
    iconSrc: "/img/date-price.png",
  },
  {
    text: "Highlights",
    iconSrc: "/img/highlights.png",
  },
  {
    text: "Inclusions / Exclusions",
    iconSrc: "/img/inclu-exclu.png",
  },
  {
    text: "Tour Information",
    iconSrc: "/img/tour-info.png",
  },
];

const TourDetails = () => {
  const {
    "product-id": productId,
    "product-code": productCode,
    "product-title": packageTitle,
  } = useParams();
  const location = useLocation();
  const { productImg } = location.state || {};
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [modalType, setModalType] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tourDetails, setTourDetails] = useState([]);
  const [priceDetails, setPriceDetails] = useState([]);
  const [tourDetailID, setTourDetailID] = useState(null);
  const [tourCode, setTourCode] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tour's Details API Extraction
  useEffect(() => {
    if (!productId || !productCode) return;

    async function fetchTourDetails() {
      setLoading(true);

      try {
        const data = await getProductDetails(
          String(productId),
          String(productCode)
        );
        // console.log("Raw Tour details: ", data)

        if (
          !data ||
          data.StatusCode !== "200" ||
          data.StatusMessage === "Product not found"
        ) {
          console.warn("Invalid response or no data found");
          setTourDetails([]);
          return;
        }

        const today = new Date();
        const updatedUpcomingTours = Array.isArray(data?.UpcomingTours)
          ? data.UpcomingTours.map((detail) => {
              if (!detail?.DepartureDate) return null;

              const [day, month, year] =
                detail.DepartureDate.split("/").map(Number);
              const dateObj = new Date(year, month - 1, day);

              return {
                ...detail,

                DepartureDateObj: dateObj,
                BookingDateFromMonth: dateObj.toLocaleString("en-US", {
                  month: "short",
                }), // e.g. "Apr"
                BookingDateFromYear: dateObj.getFullYear(), // e.g. 2026
                BookingDateFromDay: dateObj.getDate(), // e.g. 15
                BookingDateFromDayName: dateObj.toLocaleString("en-US", {
                  weekday: "short",
                }), // e.g. "Wed"
              };
            })

              // Keep only tours whose ArrivalDate is *after* today
              .filter((tour) => tour && tour.DepartureDateObj > today)

              // Sort chronologically (optional, newest first)
              .sort((a, b) => a.DepartureDateObj - b.DepartureDateObj)
          : [];

        const extractedDetails = {
          ProductID: data?.ProductID || null,
          ProductCode: data?.ProductCode,
          ProductTitle: data?.ProductTitle,
          SectorName: data?.SectorName,
          ProductType: data?.ProductType,
          TravelType: data?.TravelType,
          Days: data?.Days || 0,
          Nights: data?.Nights || 0,
          LowestTwinSharingPrice: data?.LowestTwinSharingPrice,
          RegistrationAmount: data?.RegistrationAmount,
          RegistrationAmountCurrency: data?.RegistrationAmountCurrency,
          ProductSliderImages: data?.ProductSliderImages,
          ProductPricingHeader: data?.ProductPricingHeader || [],
          RelatedProducts: data?.RelatedProducts || [],
          UpcomingTours: updatedUpcomingTours,

          // --- Mapped Text Arrays ---
          productFeatures: Array.isArray(data?.ProductFeatures)
            ? data.ProductFeatures.map((f) => f?.FeatureItem)
            : [],

          highlights: Array.isArray(data?.ProductHighlights)
            ? data.ProductHighlights.map((h) => h?.HighlightItem)
            : [],

          inclusions: Array.isArray(data?.Inclusions)
            ? data.Inclusions.map((i) => i?.InclusionItem)
            : [],

          exclusions: Array.isArray(data?.Exclusions)
            ? data.Exclusions.map((e) => e?.ExclusionItem)
            : [],

          notes: Array.isArray(data?.Notes)
            ? data.Notes.map((n) => n?.NoteItem)
            : [],

          termsConditions: Array.isArray(data?.TermsConditions)
            ? data.TermsConditions.map((t) => t?.TermConditionItem)
            : [],

          bookingInstructions: Array.isArray(data?.BookingInstructions)
            ? data.BookingInstructions.map((b) => b?.BookingInstructionItem)
            : [],

          visaInstructions: Array.isArray(data?.VisaInstructions)
            ? data.VisaInstructions.map((v) => v?.VisaInstructionItem)
            : [],

          airTravelInstructions: Array.isArray(data?.AirTravelInstructions)
            ? data.AirTravelInstructions.map((a) => a?.AirTravelInstructionItem)
            : [],

          // Iternary array
          ProductItineraryByDay: Array.isArray(data?.ProductItineraryByDay)
            ? data.ProductItineraryByDay.flatMap((day) =>
                Array.isArray(day?.ProductItineraryByDayItem)
                  ? day.ProductItineraryByDayItem.map((item) => ({
                      ...item,
                    }))
                  : []
              )
            : [],

          ProductItineraryByStay: Array.isArray(data?.ProductItineraryByStay)
            ? data.ProductItineraryByStay.flatMap((stay) =>
                Array.isArray(stay?.ProductItineraryByStayItem)
                  ? stay.ProductItineraryByStayItem.map((item) => ({
                      ...item,
                    }))
                  : []
              )
            : [],
        };
        // console.log("Extracted Tour Details:", data);
        setTourDetails(extractedDetails);
      } catch (err) {
        console.error("Failed to load tour details:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTourDetails();
  }, [productId, productCode]);

  // --- Price Details API Extraction ---
  useEffect(() => {
    if (!tourDetailID || !tourCode) return;

    async function fetchPriceDetails() {
      setLoading(true);
      try {
        const data = await getTourPricingDetails(
          parseInt(tourDetailID),
          String(tourCode)
        );
        // console.log("Raw Price Data:", data);

        if (!data || data.StatusMessage !== "Success") {
          console.warn("Invalid response or no data found");
          setPriceDetails([]);
          return;
        }

        const flattenedPriceDetails = Array.isArray(data?.TourPricingHeaders)
          ? data.TourPricingHeaders.flatMap((header) =>
              Array.isArray(header?.TourPricingDetails)
                ? header.TourPricingDetails.map((detail) => ({
                    Amount1: detail?.Amount1 ?? null,
                    Amount1INRValue: detail?.Amount1INRValue ?? null,
                    Amount2: detail?.Amount2 ?? null,
                    Amount2INRValue: detail?.Amount2INRValue ?? null,
                    Amount3: detail?.Amount3 ?? null,
                    Amount3INRValue: detail?.Amount3INRValue ?? null,
                    Amount4: detail?.Amount4 ?? null,
                    Amount4INRValue: detail?.Amount4INRValue ?? null,

                    CurrencyCode1: detail?.CurrencyCode1 || "",
                    CurrencyCode1SellingRate:
                      detail?.CurrencyCode1SellingRate ?? null,

                    CurrencyCode2: detail?.CurrencyCode2 || "",
                    CurrencyCode2SellingRate:
                      detail?.CurrencyCode2SellingRate ?? null,

                    CurrencyCode3: detail?.CurrencyCode3 || "",
                    CurrencyCode3SellingRate:
                      detail?.CurrencyCode3SellingRate ?? null,

                    CurrencyCode4: detail?.CurrencyCode4 || "",
                    CurrencyCode4SellingRate:
                      detail?.CurrencyCode4SellingRate ?? null,

                    RoomOccupancyCode: detail?.RoomOccupancyCode || "",
                    TotalINRValue: detail?.TotalINRValue ?? null,
                  }))
                : []
            )
          : [];

        // console.log("Extracted Price Details:", flattenedPriceDetails);
        setPriceDetails(flattenedPriceDetails);
      } catch (err) {
        console.error("Failed to load tour pricing details:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPriceDetails();
  }, [tourDetailID, tourCode]);

  const openModal = (type) => {
    setModalType(type);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setModalType(null), 300);
  };

  const formatTitle = (str) =>
    str
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    document.title = `${formatTitle(packageTitle)} Mango Holidays`;
  }, [packageTitle]);

  const [errorField, setErrorField] = useState(null);

  // Contact Form units
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const contactNameRef = useRef();
  const contactEmailRef = useRef();
  const contactPhoneRef = useRef();
  const contactMessageRef = useRef();

  const handleChangeContact = (e) => {
    const { id, value } = e.target;
    setContactFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitContact = () => {
    if (!contactFormData.name.trim()) {
      setErrorField("name");
      contactNameRef.current.focus();
      return;
    } else if (
      !contactFormData.email.trim() ||
      !/^\S+@\S+\.\S+$/.test(contactFormData.email)
    ) {
      setErrorField("email");
      contactEmailRef.current.focus();
      return;
    } else if (
      !contactFormData.phone.trim() ||
      !/^\d{10}$/.test(contactFormData.phone)
    ) {
      setErrorField("phone");
      contactPhoneRef.current.focus();
      return;
    } else if (!contactFormData.message.trim()) {
      setErrorField("message");
      contactMessageRef.current.focus();
      return;
    } else {
      setErrorField(null);

      // Add loading or message if you want
      console.log("EmailJS sending data:", {
        from_name: contactFormData.name,
        from_email: contactFormData.email,
        phone: contactFormData.phone,
        message: contactFormData.message,
        tour_title: tourDetails.ProductTitle,
        travel_type: tourDetails.TravelType,
      });

      // --- EmailJS Send ---
      emailjs
        .send(
          "service_8r4n6wa", // ✅ Replace with your EmailJS Service ID
          "template_4xt1y1y", // ✅ Replace with your EmailJS Template ID
          {
            from_name: contactFormData.name,
            from_email: contactFormData.email,
            phone: contactFormData.phone,
            message: contactFormData.message,
            tour_title: tourDetails.ProductTitle, // ✅ new field
            travel_type: tourDetails.TravelType, // ✅ new field
          },
          "e2zd94HBpOuWFzJ4-" // ✅ Replace with your EmailJS Public Key
        )
        .then(
          () => {
            alert("Your enquiry has been sent successfully!");
            setContactFormData({
              name: "",
              email: "",
              phone: "",
              message: "",
            });
          },
          (error) => {
            console.error("EmailJS Error:", error);
            alert("Failed to send message. Please try again later.");
          }
        );
    }
  };

  // Modal Whatsapp Form units
  const [modalFormDataWhatsapp, setModalFormDataWhatsapp] = useState({
    name: "",
    phone: "",
  });

  const whatsappNameRef = useRef();
  const whatsappPhoneRef = useRef();

  const handleChangeWhatsapp = (e) => {
    const { id, value } = e.target;
    setModalFormDataWhatsapp((prev) => ({ ...prev, [id]: value }));
  };

  const handleModalSubmitWhatsapp = () => {
    if (!modalFormDataWhatsapp.name.trim()) {
      setErrorField("name");
      whatsappNameRef.current.focus();
      return;
    } else if (
      !modalFormDataWhatsapp.phone.trim() ||
      !/^\d{10}$/.test(modalFormDataWhatsapp.phone)
    ) {
      setErrorField("phone");
      whatsappPhoneRef.current.focus();
      return;
    } else {
      setErrorField(null);
      console.log("Email JS", modalFormDataWhatsapp);
      setModalFormDataWhatsapp({ name: "", phone: "" });
      return;
    }
  };

  // Modal Email Form units
  const [modalFormDataEmail, setModalFormDataEmail] = useState({
    name: "",
    email: "",
  });

  const emailNameRef = useRef();
  const emailEmailRef = useRef();

  const handleChangeEmail = (e) => {
    const { id, value } = e.target;
    setModalFormDataEmail((prev) => ({ ...prev, [id]: value }));
  };

  const handleModalSubmitEmail = () => {
    if (!modalFormDataEmail.name.trim()) {
      setErrorField("name");
      emailNameRef.current.focus();
      return;
    } else if (
      !modalFormDataEmail.email.trim() ||
      !/^\S+@\S+\.\S+$/.test(modalFormDataEmail.email)
    ) {
      setErrorField("email");
      emailEmailRef.current.focus();
      return;
    } else {
      console.log("Email JS", modalFormDataEmail);
      setErrorField(null);
      setModalFormDataEmail({ name: "", email: "" });
      return;
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = modalType ? "hidden" : "auto";
  }, [modalType]);

  const openPriceModal = (detail) => {
    // console.log(detail.TourCode, detail.TourDetailID)
    setModalType("dates-details");
    setTimeout(() => setIsModalVisible(true), 10);

    setTourCode(detail.TourCode);
    setTourDetailID(detail.TourDetailID);
  };
  console.log("tourdetails", tourDetails);

  return (
    <>
      {/* Banner Section */}
      <section className="banner-section-tour-details">
        <div className="img-container-tour-details">
          <img src={productImg} alt="Banner Unavailable" />
        </div>

        {/* Tour title - upon banner */}
        <div className="banner-overlay-tour-details">
          <div className="tour-title-card">
            {loading ? (
              <div className="loader-container">
                <ClipLoader color="#0c5728" loading={loading} size={100} />
              </div>
            ) : (
              <>
                <h2 className="package-title">
                  {tourDetails.ProductTitle ? tourDetails?.ProductTitle : "--"}
                </h2>
                <h3 className="package-duration">
                  {tourDetails.Nights} Nights | {tourDetails.Days} Days
                </h3>
              </>
            )}
          </div>

          <div className="tour-quote">
            <div className="quote-card">
              <i className="fa-solid fa-quote-left quote-icon quote-open"></i>
              <p className="quote-text">
                All Delicious Unlimited Indian Jain / Vegetarian /
                Non-vegetarian Meals with Variety of Indian, Italian &
                Continental Meals included
              </p>
              <i className="fa-solid fa-quote-right quote-icon quote-close"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="details-section">
        {/* Navigation Bar */}
        <div className="tour-detail-nav-bar">
          {navbar.map((tab, index) => (
            <div
              key={index}
              className={`nav-item ${activeTabIndex === index ? "active" : ""}`}
              onClick={() => setActiveTabIndex(index)}
            >
              <div className="icon">
                <img src={tab.iconSrc} alt="Icon" />
              </div>
              <h3>{tab.text}</h3>
            </div>
          ))}
        </div>

        {/* Content */}
        <div key={activeTabIndex} className="content fade-in">
          {activeTabIndex === 0 ? (
            // Iternary
            <div className="iternary-details">
              <div className="iternary-cards-container">
                {loading ? (
                  <div className="loader-container-tour-details">
                    <ClipLoader color="#ff5f10" loading={loading} size={150} />
                    <p className="loading-text">Fetching Iternary Details...</p>
                  </div>
                ) : Array.isArray(tourDetails?.ProductItineraryByDay) &&
                  (tourDetails?.ProductItineraryByDay).length > 0 ? (
                  tourDetails.ProductItineraryByDay.map((iternary, index) => (
                    <div className="card-objects" key={index}>
                      <div className="circles">
                        <div className="green-small-circle" />
                        <div className="day-circle">
                          <div className="day-circle-content">
                            <h3>DAY</h3>
                            <p>{iternary.DayNo}</p>
                          </div>
                        </div>
                        <div className="green-small-circle" />
                      </div>

                      <div className="day-details">
                        <h2>{iternary.DayTitle}</h2>
                        <p>{iternary.DayProgram}</p>
                        {(iternary.IsBreakfast === true ||
                          iternary.IsDinner === true ||
                          iternary.IsLunch === true) && (
                          <div className="meals">
                            {iternary.IsBreakfast === true && <p>Breakfast</p>}
                            {iternary.IsLunch === true && <p>Lunch</p>}
                            {iternary.IsDinner === true && <p>Dinner</p>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="data-unavailable-banner">
                    <img
                      src="/img/data-not-available.webp"
                      alt="No Data available"
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="button-group">
                <div
                  className="pop-up-button-itinerary"
                  onClick={() => openModal("whatsapp")}
                >
                  <img src="/img/whatsapp.png" alt="Icon" />
                  <p>Send Itinerary</p>
                </div>

                <div
                  className="pop-up-button-print"
                  onClick={() => openModal("print")}
                >
                  <img src="/img/printer.png" alt="Icon" />
                  <p>Print Itinerary</p>
                </div>

                <div
                  className="pop-up-button-email"
                  onClick={() => openModal("email")}
                >
                  <img src="/img/email.png" alt="Icon" />
                  <p>Email Itinerary</p>
                </div>
              </div>
            </div>
          ) : // Date & Price
          activeTabIndex === 1 ? (
            <div className="date-price">
              {loading ? (
                <div className="loader-container-tour-details">
                  <ClipLoader color="#ff5f10" loading={loading} size={150} />
                  <p className="loading-text">
                    Fetching Date & Price Details...
                  </p>
                </div>
              ) : Array.isArray(tourDetails?.UpcomingTours) &&
                tourDetails.UpcomingTours.length > 0 ? (
                <div>
                  <h2>Select Tour Date</h2>
                  {console.log(tourDetails)}
                  {tourDetails.UpcomingTours.map((detail, index) => (
                    <div className="dates-container" key={index}>
                      <div className="price-card">
                        <div className="date-box">
                          <h3>{detail.BookingDateFromMonth}</h3>
                          <hr />
                          <h3>{detail.BookingDateFromYear}</h3>
                        </div>

                        <div className="price-container">
                          <div className="price-details">
                            <h3 className="day">
                              {detail.BookingDateFromDayName} -{" "}
                              {detail.BookingDateFromDay}
                            </h3>
                            <hr />
                            <p className="amount">
                              {detail?.UpcomingTourPricingDetails &&
                              detail.UpcomingTourPricingDetails.length > 0
                                ? `₹ ${Math.min(
                                    ...(detail?.UpcomingTourPricingDetails?.map(
                                      (item) => item.TotalINRValue
                                    ) || [])
                                  ).toLocaleString("en-IN")}`
                                : "--"}
                            </p>
                          </div>

                          <button
                            className="view-price-btn"
                            onClick={() => {
                              openPriceModal(detail ? detail : []);
                            }}
                          >
                            <p>View Price</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="date-img-container">
                  <img src="/img/tour-coming-soon.png" alt="Unavailable" />
                </div>
              )}

              {/* Contact form */}
              <div>
                <h2>Contact Us</h2>
                <div className="form-container">
                  <p>Fill the form and book your tour</p>
                  <div className="input-group">
                    <input
                      ref={contactNameRef}
                      id="name"
                      type="text"
                      value={contactFormData.name}
                      onChange={handleChangeContact}
                      placeholder=" "
                      className={errorField === "name" ? "inputError" : ""}
                    />
                    <label htmlFor="name">First Name</label>
                  </div>

                  <div className="input-group">
                    <input
                      ref={contactEmailRef}
                      id="email"
                      type="email"
                      value={contactFormData.email}
                      onChange={handleChangeContact}
                      placeholder=" "
                      className={errorField === "email" ? "inputError" : ""}
                    />
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className="input-group">
                    <input
                      ref={contactPhoneRef}
                      id="phone"
                      type="text"
                      value={contactFormData.phone}
                      onChange={handleChangeContact}
                      placeholder=" "
                      maxLength={10}
                      className={errorField === "phone" ? "inputError" : ""}
                    />
                    <label htmlFor="phone">Phone No.</label>
                  </div>

                  <div className="input-group">
                    <textarea
                      ref={contactMessageRef}
                      id="message"
                      rows="4"
                      value={contactFormData.message}
                      onChange={handleChangeContact}
                      placeholder=" "
                      className={errorField === "message" ? "inputError" : ""}
                    />
                    <label htmlFor="message">Message</label>
                  </div>

                  <button className="btn-c" onClick={handleSubmitContact}>
                    <p>Submit Enquiry</p>
                  </button>
                </div>
              </div>
            </div>
          ) : // Highlights
          activeTabIndex === 2 ? (
            <>
              <ul>
                {loading ? (
                  <div className="loader-container-tour-details">
                    <ClipLoader color="#ff5f10" loading={loading} size={150} />
                    <p className="loading-text">Fetching Highlights...</p>
                  </div>
                ) : Array.isArray(tourDetails?.highlights) &&
                  tourDetails.highlights.length > 0 ? (
                  tourDetails.highlights.map((highlight, index) => (
                    <li key={index}>
                      <img src="/img/list-mark.webp" alt="Icon" />
                      <p>{highlight}</p>
                    </li>
                  ))
                ) : (
                  <div className="data-unavailable-banner">
                    <h3>
                      No Highlights are available for this tour Package !!
                    </h3>
                  </div>
                )}
              </ul>
            </>
          ) : // Inclusions & Exclusions
          activeTabIndex === 3 ? (
            <>
              {loading ? (
                <div className="loader-container-tour-details">
                  <ClipLoader color="#ff5f10" loading={loading} size={150} />
                  <p className="loading-text">
                    Fetching Inclusions & Exclusions...
                  </p>
                </div>
              ) : (
                <>
                  <h2>Inclusions</h2>
                  <ul>
                    {Array.isArray(tourDetails?.inclusions) &&
                    tourDetails.inclusions.length > 0 ? (
                      tourDetails.inclusions.map((inclusion, index) => (
                        <li key={index}>
                          <img src="/img/list-mark.webp" alt="Icon" />
                          <p>{inclusion}</p>
                        </li>
                      ))
                    ) : (
                      <div className="data-unavailable-banner">
                        <h3>
                          No Inclusions are available for this tour Package !!
                        </h3>
                      </div>
                    )}
                  </ul>

                  <h2>Exclusions</h2>
                  <ul>
                    {Array.isArray(tourDetails?.exclusions) &&
                    tourDetails.exclusions.length > 0 ? (
                      tourDetails.exclusions.map((exclusion, index) => (
                        <li key={index}>
                          <img src="/img/list-mark.webp" alt="Icon" />
                          <p>{exclusion}</p>
                        </li>
                      ))
                    ) : (
                      <div className="data-unavailable-banner">
                        <h3>
                          No Exclusions are available for this tour Package !!
                        </h3>
                      </div>
                    )}
                  </ul>
                </>
              )}
            </>
          ) : (
            // Tour Information
            activeTabIndex === 4 && (
              <>
                {loading ? (
                  <div className="loader-container-tour-details">
                    <ClipLoader color="#ff5f10" loading={loading} size={150} />
                    <p className="loading-text">Fetching Tour Information...</p>
                  </div>
                ) : (
                  <>
                    <h2>Booking Instructions</h2>
                    <ul>
                      {Array.isArray(tourDetails?.bookingInstructions) &&
                      tourDetails.bookingInstructions.length > 0 ? (
                        tourDetails.bookingInstructions.map(
                          (bookingInstruction, index) => (
                            <li key={index}>
                              <img src="/img/list-mark.webp" alt="Icon" />
                              <p>{bookingInstruction}</p>
                            </li>
                          )
                        )
                      ) : (
                        <div className="data-unavailable-banner">
                          <h3>
                            No Booking Instructions are available for this tour
                            Package !!
                          </h3>
                        </div>
                      )}
                    </ul>

                    <h2>Notes</h2>
                    <ul>
                      {Array.isArray(tourDetails?.notes) &&
                      tourDetails.notes.length > 0 ? (
                        tourDetails.notes.map((note, index) => (
                          <li key={index}>
                            <img src="/img/list-mark.webp" alt="Icon" />
                            <p>{note}</p>
                          </li>
                        ))
                      ) : (
                        <div className="data-unavailable-banner">
                          <h3>
                            No Notes are available for this tour Package !!
                          </h3>
                        </div>
                      )}
                    </ul>

                    <h2>Terms & Conditions</h2>
                    <ul>
                      {Array.isArray(tourDetails?.termsConditions) &&
                      tourDetails.termsConditions.length > 0 ? (
                        tourDetails.termsConditions.map(
                          (termCondition, index) => (
                            <li key={index}>
                              <img src="/img/list-mark.webp" alt="Icon" />
                              <p>{termCondition}</p>
                            </li>
                          )
                        )
                      ) : (
                        <div className="data-unavailable-banner">
                          <h3>
                            No Terms & Conditions are available for this tour
                            Package !!
                          </h3>
                        </div>
                      )}
                    </ul>
                  </>
                )}
              </>
            )
          )}
        </div>

        {/* Modal Popups */}
        <div>
          {modalType && (
            <div
              className={`modal-overlay ${
                isModalVisible ? "active" : "closing"
              }`}
              onClick={closeModal}
            >
              {/* Whatsapp Modal */}
              {modalType === "whatsapp" && (
                <div
                  className="modal-whatsapp"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="icon-container">
                    <img src="/img/travel.webp" alt="Icon" />
                  </div>
                  <h3>Enter your details to receive Itinerary</h3>
                  <div className="input-group">
                    <input
                      ref={whatsappNameRef}
                      id="name"
                      type="text"
                      value={modalFormDataWhatsapp.name}
                      onChange={handleChangeWhatsapp}
                      placeholder=" "
                      className={errorField === "name" ? "inputError" : ""}
                    />
                    <label htmlFor="name">Name</label>
                  </div>

                  <div className="input-group">
                    <input
                      ref={whatsappPhoneRef}
                      id="phone"
                      type="text"
                      value={modalFormDataWhatsapp.phone}
                      onChange={handleChangeWhatsapp}
                      placeholder=" "
                      maxLength={10}
                      className={errorField === "phone" ? "inputError" : ""}
                    />
                    <label htmlFor="phone">Phone No.</label>
                  </div>

                  <div className="button-container">
                    <button
                      className="btn-c"
                      onClick={handleModalSubmitWhatsapp}
                    >
                      <p>Submit</p>
                    </button>
                  </div>
                  <span className="close" onClick={closeModal}>
                    ✖
                  </span>
                </div>
              )}

              {/* Print modal */}
              {modalType === "print" && (
                <div
                  className="modal-print"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-image-container">
                    <img src="/img/itibg.webp" alt="Unavailable" />
                  </div>
                  <div className="print-modal-content">
                    <h2>
                      You’re printing the itinerary & price details for tour
                    </h2>
                    <p>
                      Please go back to calendar if you wish to change the date
                      or click on Print.
                    </p>
                    <button className="btn-c" onClick={closeModal}>
                      <p>Print</p>
                    </button>
                    <span className="close" onClick={closeModal}>
                      ✖
                    </span>
                  </div>
                </div>
              )}

              {/* Email modal */}
              {modalType === "email" && (
                <div
                  className="modal-email"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-image-container">
                    <img src="/img/itibg.webp" alt="Unavailable" />
                  </div>
                  <div className="email-modal-content">
                    <h2>
                      You're mailing the itinerary & price details for tour
                    </h2>
                    <p>
                      Please go back to calendar if you wish to change the date
                      or click on Send Email.
                    </p>
                    <p className="hoilday-detail-for">Holiday Details For:</p>
                    <div className="input-group">
                      <input
                        ref={emailNameRef}
                        id="name"
                        type="text"
                        value={modalFormDataEmail.name}
                        onChange={handleChangeEmail}
                        placeholder=" "
                        className={errorField === "name" ? "inputError" : ""}
                      />
                      <label htmlFor="name">Name</label>
                    </div>

                    <div className="input-group">
                      <input
                        ref={emailEmailRef}
                        id="email"
                        type="email"
                        value={modalFormDataEmail.email}
                        onChange={handleChangeEmail}
                        placeholder=" "
                        className={errorField === "email" ? "inputError" : ""}
                      />
                      <label htmlFor="email">Email address</label>
                    </div>

                    <button className="btn-c" onClick={handleModalSubmitEmail}>
                      <p>Send Email</p>
                    </button>
                    <span className="close" onClick={closeModal}>
                      ✖
                    </span>
                  </div>
                </div>
              )}

              {/* Dates-details modal */}
              {modalType === "dates-details" && (
                <div
                  className="modal-dates-details"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="dates-details-modal-content">
                    <h2>Package Details</h2>
                    <hr />
                    <h1>Tour Code: {tourCode}</h1>

                    {loading ? (
                      <div className="loader-container-tour-details">
                        <ClipLoader
                          color="#ff5f10"
                          loading={loading}
                          size={100}
                        />
                        <p className="loading-text">
                          Fetching Pricing Details...
                        </p>
                      </div>
                    ) : priceDetails.length > 0 ? (
                      <>
                        <div className="table-wrapper">
                          <table>
                            <thead>
                              <tr>
                                <th>
                                  <p>Currency</p>
                                </th>
                                <th>
                                  <p>Twin Sharing</p>
                                </th>
                                <th>
                                  <p>Triple Sharing</p>
                                </th>
                                <th>
                                  <p>Single Occupancy</p>
                                </th>
                                <th>
                                  <p>Child With Bed</p>
                                </th>
                                <th>
                                  <p>Infant</p>
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {/* Dynamic Currency Rows */}
                              {(() => {
                                if (!priceDetails || priceDetails.length === 0)
                                  return null;

                                // Extract unique currency codes (CurrencyCode1 to 4)
                                const currencyCodes = [
                                  ...new Set(
                                    priceDetails.flatMap((item) => [
                                      item.CurrencyCode1,
                                      item.CurrencyCode2,
                                      item.CurrencyCode3,
                                      item.CurrencyCode4,
                                    ])
                                  ),
                                ].filter((code) => code && code.trim() !== ""); // Remove empty/null

                                // Define room types for consistent order
                                const roomTypes = [
                                  "Twin Sharing",
                                  "Triple Sharing",
                                  "Single Occupancy",
                                  "Child With Bed",
                                  "Infant",
                                ];

                                // Render a row for each currency code found
                                return currencyCodes.map((currency) => (
                                  <tr key={currency}>
                                    <td>
                                      <p>{currency}</p>
                                    </td>

                                    {roomTypes.map((type) => {
                                      const item = priceDetails.find(
                                        (d) => d.RoomOccupancyCode === type
                                      );

                                      if (!item)
                                        return (
                                          <td key={type}>
                                            <p>-</p>
                                          </td>
                                        );

                                      // Determine which Amount field to use based on currency
                                      let amountValue = null;
                                      if (item.CurrencyCode1 === currency)
                                        amountValue = item.Amount1;
                                      else if (item.CurrencyCode2 === currency)
                                        amountValue = item.Amount2;
                                      else if (item.CurrencyCode3 === currency)
                                        amountValue = item.Amount3;
                                      else if (item.CurrencyCode4 === currency)
                                        amountValue = item.Amount4;

                                      return (
                                        <td key={type}>
                                          <p>
                                            {amountValue
                                              ? Number(
                                                  amountValue
                                                ).toLocaleString("en-IN")
                                              : "-"}
                                          </p>
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ));
                              })()}

                              {/* Total Row */}
                              <tr className="total-row">
                                <td>
                                  <p>Total in INR</p>
                                </td>
                                {[
                                  "Twin Sharing",
                                  "Triple Sharing",
                                  "Single Occupancy",
                                  "Child With Bed",
                                  "Infant",
                                ].map((type) => {
                                  const item = priceDetails.find(
                                    (d) => d.RoomOccupancyCode === type
                                  );
                                  return (
                                    <td key={type}>
                                      <p>
                                        {item
                                          ? Number(
                                              item.TotalINRValue || 0
                                            ).toLocaleString("en-IN")
                                          : "-"}
                                      </p>
                                    </td>
                                  );
                                })}
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="notes">
                          {/* Dynmaic Currency conversion Note */}
                          {priceDetails &&
                            priceDetails.length > 0 &&
                            (() => {
                              const detail = priceDetails[0];
                              const currencies = [];

                              for (let i = 2; i <= 4; i++) {
                                const code = detail[`CurrencyCode${i}`];
                                const rate =
                                  detail[`CurrencyCode${i}SellingRate`];
                                if (code && code.trim() !== "" && rate) {
                                  currencies.push(
                                    `${code} ${Number(rate).toLocaleString(
                                      "en-IN"
                                    )}`
                                  );
                                }
                              }

                              return (
                                <p>
                                  Tour price variations are expected depending
                                  on the prevailing conversion rate. Payment to
                                  be calculated on the prevailing rate of
                                  exchange of {currencies} INR on the day of
                                  actual payment to Mango Holidays.
                                </p>
                              );
                            })()}

                          {/* Dynamic Minimum Pricing with its category Note */}
                          {priceDetails &&
                            priceDetails.length > 0 &&
                            (() => {
                              // Find the minimum TotalINRValue
                              const minPrice = Math.min(
                                ...priceDetails.map(
                                  (detail) =>
                                    Number(detail.TotalINRValue) || Infinity
                                )
                              );

                              // Find the corresponding occupancy type for that min price
                              const minDetail = priceDetails.find(
                                (detail) =>
                                  Number(detail.TotalINRValue) === minPrice
                              );

                              return (
                                <p>
                                  Tour Price Starting From:&nbsp; INR{" "}
                                  {Number(minPrice).toLocaleString("en-IN")} per
                                  adult on{" "}
                                  {minDetail?.RoomOccupancyCode ||
                                    "Twin Sharing"}{" "}
                                  basis!
                                </p>
                              );
                            })()}

                          <p className="price-note">
                            **Prices increase as seats get filled.**
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="data-unavailable-banner">
                        <img
                          src="/img/data-not-available.webp"
                          alt="No Data available"
                        />
                      </div>
                    )}
                    <span className="close" onClick={closeModal}>
                      ✖
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {Array.isArray(tourDetails?.RelatedProducts) &&
        tourDetails.RelatedProducts.length > 0 && (
          <section className="related-prodducts-section">
            <h1>Related Products</h1>
            <div className="container">
              <div className="packages-grid">
                {tourDetails.RelatedProducts.map((pkg) => (
                  <div
                    key={pkg.ProductCode}
                    className="package-image-container"
                  >
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
                        <h3>
                          {pkg.LowestTwinSharingPrice &&
                            `₹ ${Number(
                              pkg.LowestTwinSharingPrice
                            ).toLocaleString("en-IN")}`}
                        </h3>
                        <NavLink
                          to={`/tour-details/${pkg.ProductID}/${
                            pkg.ProductCode
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
            </div>
          </section>
        )}
    </>
  );
};

export default TourDetails;
