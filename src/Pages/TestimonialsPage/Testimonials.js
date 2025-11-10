import { useEffect, useState } from "react";
import "./testimonials.css";

const Testimonials = () => {

    const [testimonial, setTestimonials] = useState([]);

    useEffect(() => {
        document.title = "Guest Reviews | Testimonials by Mango Holidays";
    }, []);

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

                console.log("✅ Parsed Testimonials:", parsed);
                setTestimonials(parsed);
            })
            .catch((err) => console.error("❌ Error loading testimonials:", err));
    }, []);

    return (
        <>
            {/* Banner Section */}
            <section className="banner-section-testimonials">
                <div className="img-container-testimonials">
                    <img src="/img/tour-talk-banner.webp" alt="Banner Unavailable" />
                </div>
                <div className="banner-overlay-testimonials">
                    <h1 className='banner-title-testimonials'>Our Clients Speak</h1>
                </div>
            </section>


            {/* Testimonials Section */}
            <section className="testimonials-section">
                {
                    testimonial.map((slide, index) => (
                        <div key={index} className="testimonial-card">
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
                    ))
                }
            </section>
        </>
    )
}

export default Testimonials