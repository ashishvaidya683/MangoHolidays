import { useEffect } from 'react';
import "./videoBlog.css";

// Add or update your video blogs titles & links here 
const videoBlogsSrc = [
    { title: 'Darjeeling - India', src: 'https://mangoholidays.businessezeepro.in/uploads/web/videos/darjeeling.mp4' },
    { title: 'Darjeeling - India', src: 'https://mangoholidays.businessezeepro.in/uploads/web/videos/darjeeling.mp4' },
    { title: 'Darjeeling - India', src: 'https://mangoholidays.businessezeepro.in/uploads/web/videos/darjeeling.mp4' },
    { title: 'Darjeeling - India', src: 'https://mangoholidays.businessezeepro.in/uploads/web/videos/darjeeling.mp4' },
    { title: 'Darjeeling - India', src: 'https://mangoholidays.businessezeepro.in/uploads/web/videos/darjeeling.mp4' },
    { title: 'Darjeeling - India', src: 'https://mangoholidays.businessezeepro.in/uploads/web/videos/darjeeling.mp4' }
];


const VideoBlog = () => {
    useEffect(() => {
        document.title = "Travel Video Blogs | Mango Holidays";
    }, []);

    return (
        <>
            {/* Banner Section */}
            <section className="banner-section-videoBlogs">
                <div className="img-container-videoBlogs">
                    <img src="/img/video-blog.webp" alt="Banner Unavailable" />
                </div>
                <div className="banner-overlay-videoBlogs">
                    <h1 className='banner-title-videoBlogs'>Video Blogs</h1>
                </div>
            </section>

            {/* Video Blogs Section */}
            <section className="video-blogs-section">
                {
                    videoBlogsSrc.map((videoSrc, index) => (
                        <div key={index} className="video-blog-container">
                            <div className='video-container'>
                                <video
                                    src={videoSrc.src}
                                    controls
                                    preload="metadata"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            <div className='video-title'>
                                <h2>{videoSrc.title}</h2>
                            </div>
                        </div>
                    ))
                }
            </section >
        </>
    )
}

export default VideoBlog