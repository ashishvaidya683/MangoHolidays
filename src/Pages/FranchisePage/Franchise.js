import { useEffect, useState, useRef } from "react";
import { countries } from "countries-list";
import "./franchise.css";

const Franchise = () => {
    useEffect(() => {
        document.title = `Franchise | Mango Holidays`;
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        country: ""
    });
    const [errorField, setErrorField] = useState(null);

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {

        if (!formData.name.trim()) {
            setErrorField("name");
            nameRef.current.focus();
            setErrorField(null);
            return;

        } else if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            setErrorField("email");
            emailRef.current.focus();
            setErrorField(null);
            return;

        } else if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
            setErrorField("phone");
            phoneRef.current.focus();
            setErrorField(null);
            return;

        } else if (!formData.country.trim()) {
            setErrorField("country");
            setErrorField(null);
            return;
            
        } else if (!formData.address.trim()) {
            setErrorField("address");
            addressRef.current.focus();
            setErrorField(null);
            return;

        } else {
            setErrorField(null);
            console.log('Email JS', formData)
            setFormData({ name: "", email: "", phone: "", address: "", country: "" });
            return
        }
    };

    const sortedCountries = Object.values(countries)
        .map((country) => country.name)
        .sort((a, b) => a.localeCompare(b));

    return (
        <>
            {/* Banner Section */}
            <section className="banner-section-franchise">
                <div className="img-container-franchise">
                    <img src="/img/how-to-book.webp" alt="Banner Unavailable" />
                </div>

                {/* Tour title - upon banner */}
                <div className="banner-overlay-franchise">
                    <div className="title-card">
                        <h1>Partner with Mango Holidays for <span>A Thriving Franchise</span></h1>
                        <h3>Join Our Journey of Growth and Excellence</h3>
                        <p>Since our inception on January 1st, 2008, Mango Holidays has experienced phenomenal growth.
                            In a short span of time, we have established offices in prime locations such as Mumbai, Pune, Thane, and Nagpur, as well as franchisees in
                            Nanded and Pimpri-Chinchwad (Pune Suburbs).
                        </p>
                    </div>
                </div>
            </section>

            <section className="our-mission">
                <div className="our-mission-context">
                    <h2>Our Mission</h2>
                    <p>
                        At Mango Holidays, our mission is to prioritize values over volumes and quality over quantity, ensuring absolutely honest and ethical interactions at every stage.
                        We invite you to partner with our fast-growing organization and achieve greater heights together.
                    </p>
                </div>

                <div className="franchise-form">
                    <div className="form-card">
                        <h2 className="form-title">Become Our Franchisee Partner</h2>

                        <div className="form-container">
                            <div className="input-group">
                                <input
                                    ref={nameRef}
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className={errorField === "name" ? "inputError" : ""}
                                />
                                <label htmlFor="name">Name</label>
                            </div>

                            <div className="input-group">
                                <input
                                    ref={emailRef}
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className={errorField === "email" ? "inputError" : ""}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-group">
                                <input
                                    ref={phoneRef}
                                    id="phone"
                                    type="text"
                                    maxLength={10}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className={errorField === "phone" ? "inputError" : ""}
                                />
                                <label htmlFor="phone">Phone No.</label>
                            </div>

                            <div className="input-group">
                                <select
                                    id="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className={
                                        errorField === "country" ? "inputError" : ""
                                    }
                                >
                                    <option value="">Select</option>
                                    {sortedCountries.map((country, index) => (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="country">Country</label>
                            </div>

                            <div className="input-group full-width">
                                <textarea
                                    ref={addressRef}
                                    id="address"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className={errorField === "address" ? "inputError" : ""}
                                />
                                <label htmlFor="address">Address</label>
                            </div>
                        </div>

                        <button className="btn-c full-width" onClick={handleSubmit}>
                            <p>Submit Enquiry</p>
                        </button>
                    </div>
                </div>
            </section>

            <section className="why-mango-holidays-section">
                <h1>Why Mango Holidays?</h1>

                <div className="why-containers">
                    <div className="why-cell">
                        <h2>Growth Opportunity</h2>
                        <p>Align with a fast-growing and vibrant organization.</p>
                    </div>

                    <div className="why-cell">
                        <h2>Unique Brand</h2>
                        <p>Be part of a brand that stands out in terms of products and services.</p>
                    </div>

                    <div className="why-cell">
                        <h2>Honest Policies</h2>
                        <p>Enjoy clear, precise, and honest policies that ensure a healthy and smooth collaboration.</p>
                    </div>

                    <div className="why-cell">
                        <h2>Solid Reputation</h2>
                        <p>Benefit from a strong and solid reputation developed over a short period.</p>
                    </div>

                    <div className="why-cell">
                        <h2>Long-Term Vision</h2>
                        <p>Join a company with long-term plans and vision, ensuring alignment and sustained success.</p>
                    </div>
                </div>
            </section>

            <section className="requirement-support-section">
                <div className="requirement-container">
                    <h2>Basic Requirements</h2>
                    <ul>
                        <li><img src="/img/list-mark.webp" alt="Icon" /><p>Retail Premises: Fully furnished retail space with a minimum area of 350 sq feet, capable of renovation as per Mango Holidays specifications, with provision for a visible signboard.</p></li>
                        <li><img src="/img/list-mark.webp" alt="Icon" /><p>Trained Employees: A minimum of two experienced and trained employees to handle sales and visa operations.</p></li>
                        <li><img src="/img/list-mark.webp" alt="Icon" /><p>Basic Infrastructure: Office equipped with essential infrastructure including washroom, internet, telephone, tea/coffee facilities, computer, printer/photocopy machine, and basic stationery.</p></li>
                        <li><img src="/img/list-mark.webp" alt="Icon" /><p>Entrepreneurial Spirit: A passion for travel, commitment to Mango Holidays’ mission, vision, and core values.</p></li>
                        <li><img src="/img/list-mark.webp" alt="Icon" /><p>Social Connectivity: Good presence in local clubs and organizations, and socially well-connected.</p></li>
                    </ul>
                </div>
                <div className="support-container">
                    <h2>Support Offered</h2>
                    <ul>
                        <li><img src="/img/list-mark.webp" alt="Icon" /><p>Intranet Access: Full access to our intranet system for tour positions, availability, and other details.</p></li>
                        <li><img src="/img/list-mark.webp" alt="Icon" /><p>Comprehensive Training: Complete training for franchisee owners and staff on our product portfolio and standard operating procedures.</p></li>
                        <li><img src="/img/list-mark.webp" alt="Icon" /><p>Assistance: Backup and assistance for large groups and special requirements.</p></li>
                        <li><img src="/img/list-mark.webp" alt="Icon" /><p>Branding Materials: Provision of signboards, posters, and all other branding/marketing materials (soft copy).</p></li>
                        <li><img src="/img/list-mark.webp" alt="Icon" /><p>Promotional Presence: Inclusion in our website, advertisements, and other promotional materials (area-wise).</p></li>
                    </ul>
                </div>
            </section>

            <section className="next-step-section">
                <h1>Take the Next Step with Mango Holidays</h1>
                <p>Join us in creating exceptional travel experiences and become a part of our success story. For more details, <a href="/contact">contact us</a> today!</p>
            </section>
        </>
    )
}

export default Franchise