import React, { useEffect, useState } from "react";
import Sy from "../../assets/images/IMG-0105 copy.jpg";
import nurseGuy from "../../assets/images/nurseGuy.jpeg";
import nurseLady from "../../assets/images/nurseLady.jpeg";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useMonitorWidth from "../Dashboard/useMonitorWidth";
import authServiceInstance from "../../utils/auth";
import "./index.css";

const About = () => {
  const [mediaAbout, setMediaAbout] = useState(false);

  const { showDashboardMediaNav } = useMonitorWidth();

  useEffect(() => {
    const urlVal = window.location.pathname;
    if (urlVal.includes("/Dashboard/About") && authServiceInstance.loggedIn()) {
      setMediaAbout(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className={!mediaAbout ? "about-main" : "about-main-media"}>
        <h3 className="text-light py-5">What is Reiki</h3>
        <div className="card global-card ">
          <p className="p-2">From Wikipedia, the free encyclopedia.</p>
          <p className="p-2">
            Reiki reiki is a Japanese form of energy healing, a type of
            alternative medicine. Reiki practitioners use a technique called
            palm healing or hands-on healing through which a "universal energy"
            is said to be transferred through the palms of the practitioner to
            the patient in order to encourage emotional or physical healing.
          </p>
          <p className="p-2">
            Reiki is a pseudoscience, and is used as an illustrative example of
            pseudoscience in scholarly texts and academic journal articles. It
            is based on qi ("chi"), which practitioners say is a universal life
            force, although there is no empirical evidence that such a life
            force exists.
          </p>
          <p className="p-2">
            Clinical research does not show reiki to be effective as a treatment
            for any medical condition, including cancer, diabetic neuropathy,
            anxiety or depression; therefore it should not replace conventional
            medical treatment. There is no proof of the effectiveness of reiki
            therapy compared to placebo. Studies reporting positive effects have
            had methodological flaws.
          </p>
        </div>

        <h3 className="text-light my-5">Our team</h3>
        {/* will do a map when refactoring */}
        <div className="card review-list card-about mb-4">
          <div className="row text-light">
            <div
              className="col-lg-4 col-sm-12"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="container-fluid choo p-2">
                <img className="responsive" src={Sy} alt="nurse icon" />
              </div>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="p-2"> Peter</div>{" "}
              <div className="container-fluid">
                <p>
                  10 years experience. Studied reiki in Japan since she was 14
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                  corporis. Fugit amet asperiores numquam, fuga explicabo
                  commodi debitis fugiat? Tempora voluptatum nostrum fuga
                  obcaecati? Praesentium ipsa voluptatibus quos provident nemo..
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card review-list card-about mb-4">
          <div className="row text-light nancy">
            <div className="col-lg-8 col-sm-12">
              <div className="p-2"> Nancy</div>
              <div className="container-fluid">
                <p>
                  Born in Reiki Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat quos repellendus natus maxime esse
                  numquam in obcaecati fugiat non. Quis quasi exercitationem
                  voluptatum laudantium recusandae enim rerum a officiis velit.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-12"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                className="container-fluid"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img className="responsive" src={nurseLady} alt="nurse icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="card review-list card-about mb-4 p-2">
          <div className="row text-light">
            <div
              className="col-lg-4 col-sm-12"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                className="container-fluid"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img className="responsive" src={nurseGuy} alt="nurse icon" />
              </div>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="p-2"> Peter</div>{" "}
              <div className="container-fluid">
                <p>
                  10 years experience. Studied reiki in Japan since she was 14
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                  corporis. Fugit amet asperiores numquam, fuga explicabo
                  commodi debitis fugiat? Tempora voluptatum nostrum fuga
                  obcaecati? Praesentium ipsa voluptatibus quos provident nemo..
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* {showDashboardMediaNav ? null : <Footer />} */}
      {!mediaAbout && <Footer />}
    </>
  );
};

export default About;
