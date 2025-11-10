import { useEffect } from "react";
import "./howToBook.css";

const tableData = [
    { range: "0 – 100000", amount: "30000" },
    { range: "100001 – 200000", amount: "50000" },
    { range: "200001 – 300000", amount: "75000" },
    { range: "300001 – 400000", amount: "100000" },
    { range: "400001 – 500000", amount: "150000" },
    { range: "500001 – 700000", amount: "200000" },
    { range: "700001 +++", amount: "300000" },
];

const HowToBook = () => {
    useEffect(() => {
        document.title = `How to Book with Mango Holidays`;
    }, []);

    return (
        <>
            {/* Banner Section */}
            <section className="banner-section-how-to-book">
                <div className="img-container-how-to-book">
                    <img src="/img/how-to-book.webp" alt="Banner Unavailable" />
                </div>

                {/* Tour title - upon banner */}
                <div className="banner-overlay-how-to-book">
                    <div className="title-card">
                        <h1>How to Book Your <span>Dream Vacation</span> with Mango Holidays</h1>
                        <h3>Simple Steps to Secure Your Spot</h3>
                    </div>
                </div>
            </section>


            {/* Content Section */}
            <section className="how-to-book-context">
                <div className="context-left">
                    <div className="context-container">
                        <h2>How to Book?</h2>
                        <p>Dear Guest,</p>
                        <p>
                            Once you have finalized the tour you wish to book, you can visit any of our offices and place your booking with us.
                            If time does not permit you to do so, for your convenience, we can send our representative to you to complete the booking formalities.
                        </p>
                    </div>

                    <div className="context-container">
                        <h2>Requirements at the Time of Booking:</h2>
                        <div>
                            <h1>Booking Form</h1>
                            <p>Complete and submit the booking form.</p>
                        </div>

                        <div>
                            <h1>Passport</h1>
                            <p>Passport must be valid for a minimum of 6 months from the date of arrival at the destination (for all guests traveling).</p>
                            <p>For Malaysian visas, the passport must be valid for 9 months from the date of arrival.</p>
                        </div>

                        <div>
                            <h1>Payment</h1>
                            <p>Booking amount or full payment, depending on the time of booking.</p>
                            <p>Note: Passport/document requirements may differ for certain embassies/consulates and are subject to change.</p>
                        </div>
                    </div>

                    <div className="context-container">
                        <h2>Visa Documentation</h2>
                        <p>
                            After you book your preferred tour, our visa officer will guide you through the applicable visa formalities.
                            Please submit the required documents within the timeframe given by our visa officer. Some consulates may require a personal interview.
                        </p>
                    </div>

                    <div className="context-container">
                        <h2>Changes in the Pre-Defined Tour Programme</h2>
                        <p>
                            Please inform the booking person in advance of any amendments to the tour program so that necessary arrangements can be made.
                            Additional charges may apply depending on the amendments needed.
                        </p>
                    </div>

                    <div className="context-container">
                        <h2>Cancellation Policy</h2>
                        <p>In the event of cancellations, kindly inform us in writing. The cancellation charges will be levied as follows:</p>
                        <ul>
                            <li><img src="/img/list-mark.webp" alt="Icon" /><p>More than 45 days prior to the tour departure date: Booking Amount</p></li>
                            <li><img src="/img/list-mark.webp" alt="Icon" /><p>45 – 30 days prior to the tour departure date: 50% of the total cost</p></li>
                            <li><img src="/img/list-mark.webp" alt="Icon" /><p>30 – 15 days prior to the tour departure date: 75% of the total cost</p></li>
                            <li><img src="/img/list-mark.webp" alt="Icon" /><p>15 – 0 days prior to the tour departure date: 100% cancellation will apply</p></li>
                        </ul>
                        <p>Visa Fee & Service charges are non-refundable. No refund, either in part or in full, will be made for any unused part of the services provided in the package.</p>
                    </div>
                </div>

                <div className="context-right">
                    <div className="booking-amount-section">
                        <div className="booking-card">
                            <h2>Booking Amount</h2>
                            <table className="booking-table">
                                <thead>
                                    <tr>
                                        <th><p>Package Price Per Person In INR</p></th>
                                        <th><p>Booking Amount Per Person In INR</p></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tableData.map((item, index) => (
                                            <tr key={index}>
                                                <td><p>{item.range}</p></td>
                                                <td><p>{item.amount}</p></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HowToBook