import { useEffect } from "react";
import "./tourTalks.css";

// Add or update your tour talk youtube video links & titles here 
const videos = [
    {
        videoLink: "https://www.youtube.com/embed/smMDJE4skeo",
        title: "We bring to you #ThursdayswithMango."
    },
    {
        videoLink: "https://www.youtube.com/embed/4ip-Xcyh87k",
        title: "Europe Specialities with Mango Holidays"
    },
    {
        videoLink: "https://www.youtube.com/embed/3znfrfjEQg0",
        title: "Europe Specialties With Mango Part-2"
    },
    {
        videoLink: "https://www.youtube.com/embed/IIikslclNNY",
        title: "Europe Visa Process"
    },
    {
        videoLink: "https://www.youtube.com/embed/Li4bdKKGixA",
        title: "Europe FIT vs Group Tours"
    },
    {
        videoLink: "https://www.youtube.com/embed/hQmmt-CFPDg",
        title: "Offbeat Europe Tour With Mango Holidays"
    },
    {
        videoLink: "https://www.youtube.com/embed/g4vEkqv3T_4",
        title: "Offbeat Europe Tours"
    },
    {
        videoLink: "https://www.youtube.com/embed/gK-yWH6CIVU",
        title: "Why Travel Japan"
    },
    {
        videoLink: "https://www.youtube.com/embed/eeSyfIxWdWk",
        title: "Japan Traditions and Culture"
    }
];

const TourTalks = () => {
    useEffect(() => {
        document.title = `Explore Tour Insights | Mango Holidays`;
    }, []);

    return (
        <>
            {/* Banner Section */}
            <section className="banner-section-tour-talks">
                <div className="img-container-tour-talks">
                    <img src="/img/tour-talk-banner.webp" alt="Banner Unavailable" />
                </div>
                <div className="banner-overlay-tour-talks">
                    <h1 className='banner-title-tour-talks'>Tour Talks</h1>
                </div>
            </section>


            {/* Tour Talks Section */}
            <section className="tour-talks-section">
                {
                    videos.map((video, index) => (
                        <div key={index} className="tour-talk-container">
                            <div className="video-container">
                                <iframe
                                    src={video.videoLink}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="video-title">
                                <h2>{video.title}</h2>
                            </div>
                        </div>
                    ))
                }
            </section>
        </>
    )
}

export default TourTalks