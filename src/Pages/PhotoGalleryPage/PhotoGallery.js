import { useEffect } from 'react';
import { PhotoProvider, PhotoView } from "react-photo-view";
import { MdOutlineZoomIn, MdOutlineZoomOut, MdFullscreen } from "react-icons/md";
import { TbBoxMultiple } from "react-icons/tb";
import { FaRegCirclePlay } from "react-icons/fa6";
import "react-photo-view/dist/react-photo-view.css";
import "./photoGallery.css";


// Add your new Photo Gallery images here (Once added into the folder - public/img/photo-gallery) 
const travelImagesSrc = [
    '/img/photo-gallery/1.webp',
    '/img/photo-gallery/2.webp',
    '/img/photo-gallery/3.webp',
    '/img/photo-gallery/4.webp',
    '/img/photo-gallery/5.webp',
    '/img/photo-gallery/6.webp',
    '/img/photo-gallery/7.webp',
    '/img/photo-gallery/8.webp',
    '/img/photo-gallery/9.webp',
    '/img/photo-gallery/10.webp',
    '/img/photo-gallery/11.webp',
    '/img/photo-gallery/12.webp',
    '/img/photo-gallery/13.webp',
    '/img/photo-gallery/14.webp',
    '/img/photo-gallery/15.webp',
    '/img/photo-gallery/16.webp',
    '/img/photo-gallery/17.jpeg',
    '/img/photo-gallery/18.jpeg',
    '/img/photo-gallery/19.jpeg',
    '/img/photo-gallery/20.png',
    '/img/photo-gallery/21.png',
    '/img/photo-gallery/22.png',
    '/img/photo-gallery/23.png',
    '/img/photo-gallery/24.png',
    '/img/photo-gallery/25.png',
    '/img/photo-gallery/26.png'
];


const PhotoGallery = () => {
    useEffect(() => {
        document.title = "Travel Photo Gallery | Mango Holidays";
    }, []);

    return (
        <>
            {/* Banner Section */}
            <section className="banner-section-photoGallery">
                <div className="img-container-photoGallery">
                    <img src="/img/photo-gallery.webp" alt="Banner Unavailable" />
                </div>
                <div className="banner-overlay-photoGallery">
                    <h1 className='banner-title-photoGallery'>Photo Gallery</h1>
                </div>
            </section>

            {/* Photos Section */}
            <section className="photos-section">
                <PhotoProvider
                    maskOpacity={0}
                    loop={true}
                    toolbarRender={({ onScale, scale, onFullscreen, loop }) => (
                        <div className='photo-provider-toolbar'>
                            <button ><TbBoxMultiple /></button>
                            <button onClick={() => onScale(scale + 1)} title="Zoom In"><MdOutlineZoomIn /></button>
                            <button onClick={() => onScale(scale - 1)} title="Zoom Out"><MdOutlineZoomOut /></button>
                            <button onClick={onFullscreen} title="Fullscreen"><MdFullscreen /></button>
                            <button onClick={loop} title="Loop"><FaRegCirclePlay /></button>
                        </div>
                    )}
                >
                    {travelImagesSrc.map((imageSrc, index) => (
                        <div key={index} className="travel-image-container">
                            <PhotoView src={imageSrc}>
                                <img src={imageSrc} alt={`Travel ${index + 1}`} />
                            </PhotoView>
                        </div>
                    ))}
                </PhotoProvider>
            </section>
        </>
    );
};

export default PhotoGallery;
