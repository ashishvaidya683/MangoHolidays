// src/components/Header/DesktopHeader.js
import React, { useState, useEffect } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { getProductList } from "../../API/mangoholidayAPI";
import ClipLoader from "react-spinners/ClipLoader";

const DesktopHeader = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [internationalToursList, setInternationalToursList] = useState([]);
  const [customizedToursList, setCustomizedToursList] = useState([]);
  const [indiaToursList, setIndiaToursList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleMouseEnter = (menu) => setActiveMenu(menu);
  const handleMouseLeave = () => setActiveMenu(null);

  const handleScrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    async function fetchTours() {
      try {
        const worldParams = { ProductType: "World" };
        const worldData = await getProductList(worldParams);
        const indiaParams = { ProductType: "India" };
        const indiaData = await getProductList(indiaParams);

        const internationalTours = worldData.ProductList.filter(
          (item) => item.TravelType === "GIT"
        );
        const customizedTours = worldData.ProductList.filter(
          (item) => item.TravelType === "FIT"
        );

        const uniqueGit = [
          ...new Set(internationalTours.map((i) => i.SectorName)),
        ].sort();
        const uniqueFit = [
          ...new Set(customizedTours.map((i) => i.SectorName)),
        ].sort();
        const uniqueIndia = [
          ...new Set(indiaData.ProductList.map((i) => i.SectorName)),
        ].sort();

        setInternationalToursList(uniqueGit);
        setCustomizedToursList(uniqueFit);
        setIndiaToursList(uniqueIndia);
      } catch (err) {
        console.error("Error loading tours:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  return (
    <header className="header-container">
      <div className="header-logo">
        <img src="/img/logo.webp" alt="Mango Holidays" className="logo-img" />
      </div>

      <nav className="header-nav">
        <ul className="nav-links">
          <li>
            <NavLink to="/" onClick={handleScrollToTop}>
              Home
            </NavLink>
          </li>

          {/* International Tours */}
          <li
            onMouseEnter={() => handleMouseEnter("international")}
            onMouseLeave={handleMouseLeave}
          >
            <span>
              International Tours <i className="fa-solid fa-chevron-down"></i>
            </span>
            {activeMenu === "international" && (
              <ul className="dropdown-menu">
                {loading ? (
                  <ClipLoader color="#ff5f10" size={60} />
                ) : (
                  internationalToursList.map((tour, i) => (
                    <li key={i}>
                      <NavLink
                        to={`packages/internation-tour/${tour
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        onClick={handleScrollToTop}
                      >
                        {tour}
                      </NavLink>
                    </li>
                  ))
                )}
              </ul>
            )}
          </li>

          {/* India Tours */}
          <li
            onMouseEnter={() => handleMouseEnter("india")}
            onMouseLeave={handleMouseLeave}
          >
            <span>
              India Tours <i className="fa-solid fa-chevron-down"></i>
            </span>
            {activeMenu === "india" && (
              <ul className="dropdown-menu">
                {loading ? (
                  <ClipLoader color="#ff5f10" size={60} />
                ) : (
                  indiaToursList.map((tour, i) => (
                    <li key={i}>
                      <NavLink
                        to={`packages/india-tour/${tour
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        onClick={handleScrollToTop}
                      >
                        {tour}
                      </NavLink>
                    </li>
                  ))
                )}
              </ul>
            )}
          </li>

          {/* Customized Tours */}
          <li
            onMouseEnter={() => handleMouseEnter("customized")}
            onMouseLeave={handleMouseLeave}
          >
            <span>
              Customized Tours <i className="fa-solid fa-chevron-down"></i>
            </span>
            {activeMenu === "customized" && (
              <ul className="dropdown-menu">
                {loading ? (
                  <ClipLoader color="#ff5f10" size={60} />
                ) : (
                  customizedToursList.map((tour, i) => (
                    <li key={i}>
                      <NavLink
                        to={`packages/customized-tour/${tour
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        onClick={handleScrollToTop}
                      >
                        {tour}
                      </NavLink>
                    </li>
                  ))
                )}
              </ul>
            )}
          </li>

          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/termCondition">T&C</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DesktopHeader;
