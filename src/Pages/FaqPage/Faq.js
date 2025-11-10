import { useEffect, useState, useRef } from 'react'
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import "./faq.css";

// Add Common FAQs here (if required in future)
const commonFaqs = [
    {
        faqId: 1,
        question: "How many members are there in a group?",
        answer: "Number of Guests travelling in a group tour varies as per the destination. Average size of the group for an international tour is 40 to 48 people.",
    },
    {
        faqId: 2,
        question: "Can I do only a part of the Group tour?",
        answer: "Yes that is possible. Our sales staff will give you information regarding the same.",
    },
    {
        faqId: 3,
        question: "Is it possible for me to extend my stay at any of the destinations that are part of the itinerary?",
        answer: "Yes you can extend their stay by informing the sales staff at the time of booking or at least one month prior to the tour / before the journey tickets are issued. Additional charges for the changes will be applicable and these have to be borne by you over and above the tour price. Once the tour departs, no changes can be made.",
    },
    {
        faqId: 4,
        question: "Visa Documentation",
        answer: "After you book our tour,our visa oficer will guide you about the applicable visa formalities. You are requested to submit the required documnets within the time frame given by our visa officer.Some consulates may call you for personal interview.",
    },
    {
        faqId: 5,
        question: "Changes in pre-defined tour program",
        answer: "Kindly intimate the booking person in advance for any amendment in tour program so that the necessary arrangements can be made .Depending on the amendments needed ,additional charges would be applicable.",
    },
    {
        faqId: 6,
        question: "Cancelletion policy",
        answer: "In case you need to cancel the tour,you will need to inform us in writing. The cancellation charges are follows: .More than 45 days prior to the tour departure date-Booking Amount. 44-31 days prior to the tour departure date-50% of the total cost. 15-10 days prior to the tour departure date-75% of the total cost. Visa Fee & Service charges are non refundable. No refund either in part or in full will be made for any unused part of the services provided in the package.",
    }
];


// Add Booking FAQs here (if required in future)
const bookingFaqs = [
    {
        faqId: 7,
        question: "How many days in advance should I book?",
        answer: "You can book your tour as per your convenience ensuring that you have enough time to apply for the required Visas. However, the earlier you book, the better. Booking early (2 months or more before the departure date) is recommended so that there is adequate time for Visa processing.",
    },
    {
        faqId: 8,
        question: "Requirements at the time of booking",
        answer: "Note: Passport / document requirements may differ for certain Embassies/Consulates and are subject to change.",
    }
];


// Add After Booking FAQs here (if required in future)
const afterBookingFaqs = [
    {
        faqId: 9,
        question: "When will I be informed about the reporting place other information related to my tour?",
        answer: "You will be given pre-departure information about 1 week prior to the departure date of your tour.",
    },
    {
        faqId: 10,
        question: "If I cancle my tour, is the tour cost refunded?",
        answer: "If the tour is cancelled on medical grounds, if supporting medical reports are given, then Insurance company at it’s own discretion may consider the refund (Subject to Cancellation Policy, Terms & Conditions of Mango Holidays India Pvt. Ltd.)",
    },
    {
        faqId: 11,
        question: "Do you provide leave travel certificate?",
        answer: "Leave Travel Certificate can be issued only if you inform us about the same at the time of booking the tour. Such requests cannot be processed if intimated later.",
    },
    {
        faqId: 12,
        question: "Can I modify my travel plan once the booking is done?",
        answer: "You can modify your travel plans by informing the sales staff about it. Additional charges are applicable for cancelling the old booking and making the new arrangements & these charges will be borne by you.",
    }
];


// Add While Travelling FAQs here (if required in future)
const whileTravellingFaqs = [
    {
        faqId: 13,
        question: "Will the tour be hectic?",
        answer: "Most of our group tours have a medium to fast pace, as we need to cover maximum sightseeing places in limited time/days.",
    },
    {
        faqId: 14,
        question: "Does the group tour involve a lot of walking?",
        answer: "Generally, you are required to walk while at sightseeing places, airports and parks. Tour manager will instruct you from time to time.",
    },
    {
        faqId: 15,
        question: "What type of food do you provide?",
        answer: "On our group tours, we provide Indian food for lunch and dinner because we understand that gratifying your taste buds is also a way to win your heart. With Mango Holidays we promise delicious, hygienic & healthy food keeping international quality standards in mind.",
    }
]


const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const contentRefs = useRef({});

    useEffect(() => {
        document.title = `FAQs | Mango Holidays`;
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            {/* Banner Section */}
            <section className="banner-section-faq">
                <div className="img-container-faq">
                    <img src="/img/Uttar-pradesh.webp" alt="Banner Unavailable" />
                </div>
                <div className="banner-overlay-faq">
                    <h1 className='banner-title-faq'>FAQs</h1>
                </div>
            </section>


            {/* FAQs Section*/}
            <section className='faq-section'>

                {/* Common FAQs */}
                <section className="faq-container">
                    {
                        commonFaqs.map((faq) => (
                            <div
                                key={faq.faqId}
                                className={`faq-item ${openIndex === faq.faqId ? "open" : ""}`}
                                style={{
                                    borderBottomLeftRadius: openIndex === faq.faqId ? "10px" : "0px",
                                    borderBottomRightRadius: openIndex === faq.faqId ? "10px" : "0px",
                                }}
                            >
                                <div className="faq-header" onClick={() => toggleFAQ(faq.faqId)}>
                                    <h2>{faq.question}</h2>
                                    <span className="icon">
                                        {openIndex === faq.faqId ? <FaChevronUp /> : <FaChevronDown />}
                                    </span>
                                </div>
                                <div
                                    className="faq-content"
                                    ref={(el) => (contentRefs.current[faq.faqId] = el)}
                                    style={{
                                        maxHeight:
                                            openIndex === faq.faqId
                                                ? `${contentRefs.current[faq.faqId]?.scrollHeight}px`
                                                : "0px",
                                        overflow: "hidden",
                                        transition: "max-height 0.4s ease, padding 0.3s ease",
                                    }}
                                >
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))
                    }
                </section>


                {/* Booking FAQs*/}
                <h2 className='faq-title'>Booking</h2>
                <section className="faq-container">
                    {
                        bookingFaqs.map((faq) => (
                            <div
                                key={faq.faqId}
                                className={`faq-item ${openIndex === faq.faqId ? "open" : ""}`}
                                style={{
                                    borderBottomLeftRadius: openIndex === faq.faqId ? "10px" : "0px",
                                    borderBottomRightRadius: openIndex === faq.faqId ? "10px" : "0px",
                                }}
                            >
                                <div className="faq-header" onClick={() => toggleFAQ(faq.faqId)}>
                                    <h2>{faq.question}</h2>
                                    <span className="icon">
                                        {openIndex === faq.faqId ? <FaChevronUp /> : <FaChevronDown />}
                                    </span>
                                </div>
                                <div
                                    className="faq-content"
                                    ref={(el) => (contentRefs.current[faq.faqId] = el)}
                                    style={{
                                        maxHeight:
                                            openIndex === faq.faqId
                                                ? `${contentRefs.current[faq.faqId]?.scrollHeight}px`
                                                : "0px",
                                        overflow: "hidden",
                                        transition: "max-height 0.4s ease, padding 0.3s ease",
                                    }}
                                >
                                    {
                                        faq.faqId === 8 ?
                                            <ul className='listing'>
                                                <li>Booking forms</li>
                                                <li>Passport valid for minimum 6 months from the date of arrival at the destination (of all the guests who are travelling). For Malaysian visa, the passport must be valid for 9 months from the date of arrival at the destination.</li>
                                                <li>Booking amount / Full payment depending on the time of booking.</li>
                                                <p>Note: Passport / document requirements may differ for certain Embassies/Consulates and are subject to change.</p>
                                            </ul>
                                            :
                                            <p>{faq.answer}</p>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </section>


                {/* After Booking FAQs*/}
                <h2 className='faq-title'>After Booking</h2>
                <section className="faq-container">
                    {
                        afterBookingFaqs.map((faq) => (
                            <div
                                key={faq.faqId}
                                className={`faq-item ${openIndex === faq.faqId ? "open" : ""}`}
                                style={{
                                    borderBottomLeftRadius: openIndex === faq.faqId ? "10px" : "0px",
                                    borderBottomRightRadius: openIndex === faq.faqId ? "10px" : "0px",
                                }}
                            >
                                <div className="faq-header" onClick={() => toggleFAQ(faq.faqId)}>
                                    <h2>{faq.question}</h2>
                                    <span className="icon">
                                        {openIndex === faq.faqId ? <FaChevronUp /> : <FaChevronDown />}
                                    </span>
                                </div>
                                <div
                                    className="faq-content"
                                    ref={(el) => (contentRefs.current[faq.faqId] = el)}
                                    style={{
                                        maxHeight:
                                            openIndex === faq.faqId
                                                ? `${contentRefs.current[faq.faqId]?.scrollHeight}px`
                                                : "0px",
                                        overflow: "hidden",
                                        transition: "max-height 0.4s ease, padding 0.3s ease",
                                    }}
                                >
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))
                    }
                </section>


                {/* While Travelling FAQs*/}
                <h2 className='faq-title'>While Travelling</h2>
                <section className="faq-container">
                    {
                        whileTravellingFaqs.map((faq) => (
                            <div
                                key={faq.faqId}
                                className={`faq-item ${openIndex === faq.faqId ? "open" : ""}`}
                                style={{
                                    borderBottomLeftRadius: openIndex === faq.faqId ? "10px" : "0px",
                                    borderBottomRightRadius: openIndex === faq.faqId ? "10px" : "0px",
                                }}
                            >
                                <div className="faq-header" onClick={() => toggleFAQ(faq.faqId)}>
                                    <h2>{faq.question}</h2>
                                    <span className="icon">
                                        {openIndex === faq.faqId ? <FaChevronUp /> : <FaChevronDown />}
                                    </span>
                                </div>
                                <div
                                    className="faq-content"
                                    ref={(el) => (contentRefs.current[faq.faqId] = el)}
                                    style={{
                                        maxHeight:
                                            openIndex === faq.faqId
                                                ? `${contentRefs.current[faq.faqId]?.scrollHeight}px`
                                                : "0px",
                                        overflow: "hidden",
                                        transition: "max-height 0.4s ease, padding 0.3s ease",
                                    }}
                                >
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </section>
        </>
    )
}

export default Faq