import React from 'react';
import Navbar from '../Navbar';

import './index.css';

const About = () => {

    return (
        <>
            <Navbar />
            <div className='container about'>
                <h3 className='reiki-title'>What is Reiki</h3>
                <p>
                    From Wikipedia, the free encyclopedia
                </p>
                <p>
                    Reiki (霊気, reɪki) is a Japanese form of energy healing, a type of alternative medicine.
                    Reiki practitioners use a technique called palm healing or hands-on healing through which a
                    "universal energy" is said to be transferred through the palms of the practitioner to the
                    patient in order to encourage emotional or physical healing.
                </p>
                <p>
                    Reiki is a pseudoscience, and is used as an illustrative example of pseudoscience in scholarly
                    texts and academic journal articles. It is based on qi ("chi"), which practitioners say is a universal
                    life force, although there is no empirical evidence that such a life force exists.
                </p>
                <p>
                    Clinical research does not show reiki to be effective as a treatment for any medical condition,
                    including cancer, diabetic neuropathy, anxiety or depression; therefore it should not replace
                    conventional medical treatment. There is no proof of the effectiveness of reiki therapy compared
                    to placebo. Studies reporting positive effects have had methodological flaws.
                </p>
                <div className='row'>
                    <h3 className='team-title'>Our team</h3>
                    <div className='col-3'>
                        <div className='card'>
                            <div className='card-header'> Isa</div>
                            <div className='card-body'>
                            <i className="bi bi-person-fill"></i>
                                <div>10 years experience. Studied in Japan since she was 14.</div>
                            </div>
                        </div>
                    </div>


                    <div className='col-3'>
                        <div className='card'>
                            <div className='card-header'> Peter</div>
                            <div className='card-body'>
                                10 years experience. Studied in Japan since she was 14.
                            </div>
                        </div>
                    </div>


                    <div className='col-3'>
                        <div className='card'>
                            <div className='card-header'> Nancy</div>
                            <div className='card-body'>
                                10 years experience. Studied in Japan since she was 14.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default About;