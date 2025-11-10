import "./pageNotFound.scss";

const PageNotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found-image-container">
                <img src="/htdocs_error/page_not_found.svg" alt='Page Not Found' />
            </div>
            <h2>This Page Does Not Exist</h2>
            <p>Sorry, the page you are looking for could not be found. It's just an accident that was not intentional.</p>
        </div>
    )
}

export default PageNotFound