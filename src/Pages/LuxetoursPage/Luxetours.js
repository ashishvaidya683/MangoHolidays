import { useEffect } from 'react';
import "./luxetours.css";

const upcoming_international_tours = [
    {
        img: "/img/classic-europe.webp",
        link: "/packages",
        title: "South Africa with Kruger"
    },
    {
        img: "/img/classic-europe.webp",
        link: "/packages",
        title: "South Africa with Kruger"
    },
    {
        img: "/img/classic-europe.webp",
        link: "/packages",
        title: "South Africa with Kruger"
    },
    {
        img: "/img/classic-europe.webp",
        link: "/packages",
        title: "South Africa with Kruger"
    },
    {
        img: "/img/classic-europe.webp",
        link: "/packages",
        title: "South Africa with Kruger"
    },
    {
        img: "/img/classic-europe.webp",
        link: "/packages",
        title: "South Africa with Kruger"
    },
    {
        img: "/img/classic-europe.webp",
        link: "/packages",
        title: "South Africa with Kruger"
    }
];


const Luxetours = () => {
    useEffect(() => {
        document.title = "Luxe Tours by Mango Holidays";
    }, []);

    const goToTourDetails = (tour_id) => {
        console.log(tour_id)
    }
    return (
        <>
            {/* Banner Section */}
            <section className="banner-section-luxetours">
                <div className="img-container-luxetours">
                    <img src="/img/International-Banner-03-copy.webp" alt="Banner Unavailable" />
                </div>
                <div className="banner-overlay-luxetours">
                    <h1 className='banner-title-luxetours'>Luxe Holidays</h1>
                </div>
            </section>

            {/* Tours section */}
            <section className='tours-container'>
                {
                    upcoming_international_tours.map((slide, index) => (
                        <div key={index} className="blog-image-container">
                            <div className="blog-image">
                                <img src={slide.img} alt="Banner Unavailable" />
                            </div>

                            <div className="hover-overlay" onClick={() => goToTourDetails(slide.link)}>
                                <i className="fas fa-link fa-2x"></i>
                            </div>

                            <p>{slide.title}</p>
                        </div>
                    ))
                }
            </section>
        </>
    )
}

export default Luxetours