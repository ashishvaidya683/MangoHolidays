import { useEffect } from 'react'
import "./careers.css";

const Careers = () => {
    useEffect(() => {
        document.title = "Careers | Mango Holidays";
    }, []);

    // in case you want to chnage your careers email - do it here
    const openMail = () => {
        const email = 'careers@mangoholidays.in'  // <- here
        window.location.href = `mailto:${email}`;
    };

    return (
        <>
            {/* -- Banner Section -- */}
            <section className="banner-section-careers">
                <div className="img-container-careers">
                    <img src="/img/careers.webp" alt="Banner Unavailable" />
                </div>
                <div className="banner-overlay-careers">
                    <h1 className='banner-title-careers'>Careers</h1>
                </div>
            </section>

            <section className='careers-content'>
                {/* -- Text Content Left -- */}
                <div className='text-content-left'>
                    <h2>Careers with Mango Holidays</h2>
                    <p>
                        We at Mango Holidays are a group of young, passionate,
                        committed and like-minded individuals who are relentlessly contributing towards
                        discovering innovative ways of making holidays cherished experiences for our customers.
                        At Mango Holidays, we have witnessed exceptional progress since inception, and we owe that to our fantastic team of people,
                        who we consider as our most valuable asset.
                    </p>

                    <p>
                        Our rapid growth demands highly energetic people who have a fire to learn,
                        a passion to excel and an urge to contribute. We provide for an entrepreneurial environment, unlimited growth potential,
                        and strong interpersonal relationships. We provide for a motivating and inspiring atmosphere so that each person’s true
                        potential is brought out into the limelight.
                    </p>

                    <p>
                        If you have the passion towards travel, you have good communication skills, you want to work in an organization where people are treated with
                        equality and dignity & you believe in teamwork then we would be glad to have you on board! <br />
                        If you wish to make your career & be a part of this exceptional growth story at Mango Holidays, please send in your CV to
                        <span onClick={openMail}> careers@mangoholidays.in</span>.
                    </p>

                    <p>
                        If your CV is shortlisted, you will be called for an interview with a prior appointment. <br />
                        Thank you for your interest in Mango Holidays.
                    </p>
                </div>

                {/* -- Image Content Right -- */}
                <div className='image-right'>
                    <img src="/img/career-2.webp" alt="Banner Unavailable" />
                </div>
            </section>
        </>
    )
}

export default Careers