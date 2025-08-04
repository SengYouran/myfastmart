import { Link } from "react-router-dom";
import "../style/all_policy.css";
import React from "react";

function Policy({ policy, setPolicy }) {
  return (
    <React.Fragment>
      <div className={`background_policy ${policy ? "active" : ""}`}></div>
      <div className={`container_policy ${policy ? "active" : " "}`}>
        <i
          className={`fa-solid fa-xmark `}
          onClick={() => setPolicy(false)}
        ></i>
        <div className="child_policy">
          {/*==========Policy===============*/}

          <h2 className="text_policy">Privacy Policy</h2>
          <div className="text_policy_s1">
            <h2 className="text_s1">
              FAST MART Co., Ltd built the FAST MART app as a Free app. This
              SERVICE is provided by FAST MART Co., Ltd at no cost and is
              intended for use as is.
            </h2>
            <h2 className="text_s2">
              This page is used to inform visitors regarding our policies with
              the collection, use, and disclosure of Personal Information if
              anyone decides to use our Services.
            </h2>
            <h2 className="text_s3">
              If you choose to use our Services, then you agree to the
              collection and use of information in accordance with this policy.
              The Personal Information that we collect is used for providing and
              improving the Service. We do not use or share your information
              with anyone except as described in this Privacy Policy.
            </h2>
            <h2 className="text_s4">
              The terms used in this Privacy Policy have the same meanings as in
              our Terms and Conditions unless otherwise defined in this Privacy
              Policy.
            </h2>
          </div>
          <div className="border_policy"></div>
          <h2 className="text_policy_info">Information Collection and Use</h2>
          <div className="text_policy_info2">
            <h2 className="text_info_s1">
              For a better experience, while using our Service, we may require
              you to provide us with certain personally identifiable
              information. This information may include: <br /> — Login ID and
              profile information <br />— Contact information (e.g., email
              address and phone number) <br />— Location data (if enabled by the
              user) <br />
              — Location data (if enabled by the user) <br />
              — Usage and interaction data within the app <br />
              — Crash and performance analytics <br />
              This information is retained on your device or securely stored and
              used solely for the purpose of improving our services. <br />
              We may use third-party services that collect information used to
              identify you. These may include (but are not limited to): <br />
              <Link className="google_facebook">
                — Google Play Services
              </Link>{" "}
              <br />
              <Link className="google_facebook">
                — Facebook Login Services
              </Link>{" "}
              <br />
            </h2>
          </div>

          {/*==========Log Data===============*/}

          <div className="border_policy"></div>
          <div className="text_policy_logData">Log Data</div>
          <div className="log_data">
            <h2 className="text_log_data">
              In case of an error in the app, we collect data and information
              (via third-party services) on your phone called Log Data. This may
              include details such as your IP address, device name, operating
              system version, the app configuration when using our Service, time
              and date of usage, and other statistics.
            </h2>
          </div>

          {/*==========Cookie===============*/}

          <div className="border_policy"></div>
          <div className="text_policy_logData">Cookie</div>
          <div className="cookie">
            <h2 className="text_cookie">
              Although we do not explicitly use cookies, the app may include
              third-party code and libraries that use cookies to collect data
              and enhance their services. You can choose to accept or refuse
              these cookies. Refusing cookies may limit certain functionalities
              of the app.
            </h2>
          </div>

          {/*==========Service Provider===============*/}

          <div className="border_policy"></div>
          <div className="text_policy_logData">Service Providers</div>
          <div className="service_provider">
            <h2 className="text_service_provider">
              We may employ third-party companies and individuals for the
              following purposes: <br />
              — To facilitate our Service <br />
              — To provide the Service on our behalf <br />— To perform —
              Service-related tasks <br />— To assist in analyzing Service usage{" "}
              <br /> These third parties may access your Personal Information
              only to perform specific tasks on our behalf and are contractually
              obligated not to use or disclose it for any other purpose.
            </h2>
          </div>

          {/*==========Security===============*/}

          <div className="border_policy"></div>
          <div className="text_policy_logData">Security</div>
          <div className="security">
            <h2 className="text_security">
              We value your trust and take data security seriously. We implement
              commercially reasonable measures to protect your Personal
              Information. However, please note that no method of internet
              transmission or electronic storage is 100% secure.
            </h2>
          </div>

          {/*==========Third-Party Links===============*/}

          <div className="border_policy"></div>
          <div className="text_policy_logData">Third-Party Links</div>
          <div className="security">
            <h2 className="text_security">
              Our Service may contain links to third-party websites, services,
              or promotions. FAST MART Co., Ltd does not control or assume
              responsibility for the content, privacy policies, or practices of
              these third-party sites. Your interaction with any third-party
              service is at your own risk.
            </h2>
          </div>

          {/*==========Children’s Privacy===============*/}

          <div className="border_policy"></div>
          <div className="text_policy_logData">Children’s Privacy</div>
          <div className="security">
            <h2 className="text_security">
              Our Service is not intended for children under the age of 13. We
              do not knowingly collect personal information from children. If
              you believe your child has provided us with personal information,
              please contact us immediately so we can take appropriate action.
            </h2>
          </div>

          {/*==========Changes to This Privacy Policy===============*/}

          <div className="border_policy"></div>
          <div className="text_policy_logData">
            Changes to This Privacy Policy
          </div>
          <div className="security">
            <h2 className="text_security">
              We may update our Privacy Policy from time to time. Please review
              this page periodically for any changes. Any updates will be posted
              on this page and are effective immediately upon posting. <br />{" "}
              <span className="noted">Effective date:</span> 2021-08-01
            </h2>
          </div>
          {/*==========End===============*/}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Policy;
