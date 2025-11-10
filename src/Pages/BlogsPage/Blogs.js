import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import matter from "gray-matter";
import "./blogs.css";

if (typeof window !== "undefined" && !window.Buffer) {
    window.Buffer = Buffer;
}

const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(require.context("../../BlogsMdFiles", false, /\.md$/));

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Travel Blogs | Insights by Mango Holidays";

        const loadBlogs = async () => {
            const loadedBlogs = await Promise.all(
                markdownFiles.map(async (file) => {
                    const response = await fetch(file);
                    const text = await response.text();
                    const { data } = matter(text);
                    return data;
                })
            );

            // Blogs to be renddered based upon their Dates (Newest to Oldest) 
            const sortedBlogs = loadedBlogs.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );

            setBlogs(sortedBlogs);
        };

        loadBlogs();
    }, []);

    const goToReadMore = (id) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(`/blog-details/${id}`);
    };

    return (
        <>
            {/* Banner Section */}
            <section className="banner-section-blogs">
                <div className="img-container-blogs">
                    <img src="/img/Andaman.webp" alt="Banner Unavailable" />
                </div>
                <div className="banner-overlay-blogs">
                    <h1 className="banner-title-blogs">Blogs</h1>
                </div>
            </section>


            {/* Blogs Section */}
            <section className="blog-section">
                <div className="blog-grid">
                    {blogs.length === 0 ? (
                        <p className="no-blogs">No blogs found.</p>
                    ) : (
                        blogs.map((blog) => (
                            <div key={blog.id} className="blog-card">
                                <div className="blog-image-container">
                                    <div className="blog-image">
                                        <img src={blog.background_image} alt={blog.title} />
                                    </div>
                                    <p className="blog-date">
                                        <i className="fa fa-calendar-alt" /> {blog.date}
                                    </p>
                                </div>

                                <div className="blog-content">
                                    <h2 onClick={() => goToReadMore(blog.id)}>{blog.title}</h2>
                                    <p>{blog.subtitle}</p>
                                    <div className="button-container">
                                        <button className="btn-c" onClick={() => goToReadMore(blog.id)}>
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </>

    );
};

export default Blogs;
