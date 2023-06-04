import React from 'react';
import Navbar from '../Navbar';
import nurseIcon from '../../assets/images/nurseIcon.jpeg';
import nurseGuy from '../../assets/images/nurseGuy.jpeg';
import nurseLady from '../../assets/images/nurseLady.jpeg';

import './index.css';

const About = () => {

    return (
        <>
            <Navbar />
            <div className='container about'>
                <h3 className='reiki-title'>What is Reiki</h3>
                <p style={{ fontSize: '1.2rem' }}>
                        Please modify the fields you would like to update with your new information.</p>
                   
                <p style={{ fontSize: '1.2rem' }}>
                    From Wikipedia, the free encyclopedia.
                </p>
                <p style={{ fontSize: '1.2rem' }}>
                    Reiki reɪki is a Japanese form of energy healing, a type of alternative medicine.
                    Reiki practitioners use a technique called palm healing or hands-on healing through which a
                    "universal energy" is said to be transferred through the palms of the practitioner to the
                    patient in order to encourage emotional or physical healing.
                </p>
                <p style={{ fontSize: '1.2rem' }}>
                    Reiki is a pseudoscience, and is used as an illustrative example of pseudoscience in scholarly
                    texts and academic journal articles. It is based on qi ("chi"), which practitioners say is a universal
                    life force, although there is no empirical evidence that such a life force exists.
                </p>
                <p style={{ fontSize: '1.2rem' }}>
                    Clinical research does not show reiki to be effective as a treatment for any medical condition,
                    including cancer, diabetic neuropathy, anxiety or depression; therefore it should not replace
                    conventional medical treatment. There is no proof of the effectiveness of reiki therapy compared
                    to placebo. Studies reporting positive effects have had methodological flaws.
                </p>
                <h3 className='team-title'>Our team</h3>
                <div className='row'>
                    {/* <div className='col-lg-3 col-sm-12'>
                        <div className='card mt-3 mb-3'>
                            <div className='card-header'> Isa</div>
                            <img className='profile-picture' src={nurseIcon} alt='nurse icon' height={300} />
                            <div className='card-body'>
                                <i className="bi bi-person-fill"></i>
                                <div>10 years experience. Studied in Japan since age 14.</div>
                            </div>
                        </div>
                    </div> */}
                    <div className='col-lg-4 col-sm-12'>
                        <div className='card mt-3 mb-3'>
                            <div className='card-header' style={{ fontSize: '1.2rem' }}> Peter</div>
                            <div className='card-body'>
                                <img className="responsive" src={nurseGuy} alt='nurse icon' height={300} />
                                <p style={{ fontSize: '1.2rem' }}>
                                    10 years experience. Studied in Japan since she was 14.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-sm-12'>
                        <div className='card mt-3 mb-3'>
                            <div className='card-header' style={{ fontSize: '1.2rem' }}> Nancy</div>
                            <div className='card-body'>
                                <img className="responsive" src={nurseLady} alt='nurse icon' height={300} />
                                <p style={{ fontSize: '1.2rem' }}>
                                    Born in Reiki
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default About;