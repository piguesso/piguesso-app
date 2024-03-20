import TextStyles from "@/utils/textstyles";
import textstyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { List, ListItem } from "@mui/material";

export default function Page() {
  return (
    <div className={"w-full h-full p-10 pb-40 overflow-y-auto bg-black"}>
      <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-y-10 mx-auto">
        <h2 className={twMerge(TextStyles.H2, "items-center")}>About</h2>
        <div className="gap-y-5 flex flex-col">
          <p className={twMerge(TextStyles.H4, "")}>Anschrift:</p>
          <div className="gap-y-2 flex flex-col">
            <p>Piguesso GbR</p>
            <p>Bredower Straße 16</p>
            <p>14612 Falkensee, Germany</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <p className={twMerge(TextStyles.H4, "")}>Kontakt: </p>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row gap-x-5">
              <LocalPhoneIcon />
              <p>+49 162 3487112</p>
            </div>
            <div className="flex flex-row gap-x-5">
              <EmailIcon /> <p>skuesser@gmail.com</p>
            </div>
          </div>
        </div>
        <div>
          <div className={twMerge(textstyles.BigText, "!font-bold mt-12")}>
            Privacy Policy
          </div>
          <div className={twMerge(textstyles.BigText, "mt-6")}>
            1 Data protection at a glance
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-3 ml-4")}>
            General information
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            The following information provides a simple overview of what
            happens to your personal data personal data when you visit this
            website. Personal data is all data with which you can be
            personally identified. Detailed information on the subject of data
            protection can be found in our data protection data protection
            declaration.
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-3 ml-4")}>
            Data collection on this website
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            Who is responsible for data collection on this website? Data
            processing on this website is carried out by the website operator.
            The operator&apos;s contact details can be found in the section
            &quot;Information on the controller&quot; in this privacy policy.
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-3 ml-4")}>
            How do we collect your data?
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            On the one hand, your data is collected when you provide it to us.
            This may data that you enter in a contact form, for example. Other
            data is collected automatically or with your consent by our IT
            systems when you visit the website. our IT systems when you visit
            the website. This is primarily technical data (e.g. internet
            browser, operating system or time of the page view). This data is
            collected automatically automatically as soon as you enter this
            website.
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-3 ml-4")}>
            What do we use your data for?
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            Some of the data is collected in order to ensure the error-free
            provision of the website. guarantee error-free provision of the
            website. Other data may be used to analyse your user behaviour.
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-3 ml-4")}>
            What rights do you have regarding your data?
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            You have the right to receive information free of charge at any
            time about the origin, recipient and purpose of your stored
            personal data free of charge. You also have the right to request
            the correction or deletion of this data. If you have given your
            consent to data processing, you can revoke this consent at any
            time for the future. revoked. You also have the right, under
            certain circumstances, to request the restriction of the
            processing of your personal data under certain circumstances.
            Furthermore, you have a right to lodge a complaint with the
            competent supervisory authority. You can contact us at any time
            regarding this and other questions on the subject of data
            protection at any time.
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-3 ml-4")}>
            Analysis tools and tools from third-party providers
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            When you visit this website, your surfing behaviour may be
            statistically analysed. This is mainly done with so-called
            analysis programmes. Detailed information on these analysis
            programmes can be found in the following privacy policy.
          </div>
          <div className={twMerge(textstyles.BigText, "mt-6")}>
            2 Hosting and content delivery networks (CDN)
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            This website is hosted externally. The personal data that is
            collected on this website is are stored on the servers of the
            hoster(s). This may IP addresses, contact requests, meta and
            communication data, contract data, contact data, names, website
            accesses and other data generated via a website. generated via a
            website. External hosting is carried out for the purpose of
            contract fulfilment vis-à-vis our potential and existing customers
            (Art. 6 para. 1 lit. b GDPR) and in the interest of a secure, fast
            and and efficient provision of our online offering by a
            professional provider (Art. provider (Art. 6 para. 1 lit. f GDPR).
            If a corresponding consent has been requested has been requested,
            the processing is carried out exclusively on the basis of Art. 6
            para. 1 lit. a GDPR and § 25 para. 1 TTDSG, insofar as the consent
            allows the storage of cookies or access to information information
            in the user&apos;s end device (e.g. device fingerprinting) within
            the meaning of the TTDSG includes. Consent can be revoked at any
            time. Our hoster(s) will only process your data to the extent that
            this is necessary for the fulfilment of its fulfil its performance
            obligations and follow our instructions with regard to this data.
            follow. We use the following host(s):
            <div
              className={twMerge(
                textstyles.SmallText,
                "flex flex-col mt-3 ml-4"
              )}
            >
              <div>Namecheap, Inc.</div>
              <div>4600 East Washington Street, Suite 305,</div>
              <div>Phoenix, AZ 85034, USA</div>
            </div>
          </div>
          <div className={twMerge(textstyles.BigText, "mt-6")}>
            3 General notes and mandatory information
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-6 ml-4")}>
            Data protection
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            The operators of these pages take the protection of your personal
            data very seriously. We treat your personal data confidentially
            and in accordance with the statutory data protection data
            protection regulations and this privacy policy. When you use this
            website, various personal data is collected. Personal data is data
            that can be used to identify you personally. The This privacy
            policy explains what data we collect and what we use it for. use
            them. It also explains how and for what purpose this is done. We
            would like to point out that data transmission over the Internet
            (e.g. when communicating by by e-mail) can have security gaps.
            Complete protection of data against access by access by third
            parties is not possible. Note on the responsible body
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-6 ml-4")}>
            Note on the responsible body
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            The controller responsible for data processing on this website is
            Lukas Klockenhoff Bredower Straße, 16 14612 Falkensee Germany
            Phone: 01623487112 Email: l@lukaskl.com The controller is the
            natural or legal person who alone or jointly with others with
            others, decides on the purposes and means of processing personal
            data (e.g. names, email addresses, etc.). names, e-mail addresses,
            etc.).
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-6 ml-4")}>
            Storage period
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            Unless a more specific storage period has been specified in this
            privacy policy your personal data will remain with us until the
            purpose for the data processing no longer applies. If you assert a
            justified request for deletion or revoke your consent to data
            processing, your data processing, your data will be deleted unless
            we have other legally permissible reasons for reasons for storing
            your personal data (e.g. retention periods under tax or commercial
            law). retention periods under tax or commercial law); in the
            latter case, the deletion will take place after these reasons no
            longer apply.
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-6 ml-4")}>
            General information on the legal basis for data processing on this
            website
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            If you have consented to data processing, we process your personal
            data on the basis of personal data on the basis of Art. 6 para. 1
            lit. a GDPR or Art. 9 para. 2 lit. a GDPR, insofar as special
            categories of data are processed in accordance with Art. 9 para. 1
            GDPR. In the In the event of express consent to the transfer of
            personal data to third third countries, the data processing is
            also carried out on the basis of Art. 49 para. 1 lit. a GDPR. If
            you consent to the storage of cookies or access to information in
            your end device (e.g. via device fingerprinting), the data
            processing is also carried out data processing is also carried out
            on the basis of Section 25 (1) TTDSG. The consent is revocable at
            any time. If your data is required to fulfil a contract or to
            carry out pre-contractual measures, we process your data on the
            basis of Art. 6 para. 1 lit. b GDPR. para. 1 lit. b GDPR.
            Furthermore, we process your data if this is necessary for the
            fulfilment fulfilment of a legal obligation on the basis of Art. 6
            para. 1 lit. c GDPR. Data processing may also be based on our
            legitimate interest in accordance with Art. 6 para. 1 lit. f GDPR.
            The relevant legal bases in each individual case legal basis is
            provided in the following paragraphs of this privacy policy.
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-6 ml-4")}>
            Recipients of personal data
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            As part of our business activities, we work with various external
            organisations. together. In some cases, it is also necessary to
            transfer personal data to these external external organisations.
            We only pass on personal data to external bodies if this is
            necessary external bodies if this is necessary as part of the
            fulfilment of a contract, if we are legally are legally obliged to
            do so (e.g. transfer of data to tax authorities), if we have a
            legitimate interest pursuant to Art. 6 para. 1 lit. f GDPR in the
            transfer or if another legal basis permits the transfer of data.
            When using processors, we only pass on our customers&apos;
            personal data on the basis of a valid valid contract for order
            processing. In the case of joint processing a joint processing
            agreement is concluded.
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-6 ml-4")}>
            Revocation of your consent to data processing
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            Many data processing operations are only possible with your
            express consent. She can revoke consent that has already been
            given at any time. The legality of the until The data processing
            carried out for the purpose of revocation remains unaffected by
            the revocation. Right to object to data collection in special
            cases and to direct advertising (Article 21 GDPR) IF THE DATA
            PROCESSING IS BASED ON ART. 6 ABS. 1 LITER. E OR F DSGVO IS MADE,
            YOU HAVE THE RIGHT AT ANY TIME, FOR REASONS ARISING FROM YOUR
            PARTICULAR SITUATION, TO OBJECT TO THE PROCESSING OF YOUR PERSONAL
            DATA; THIS IS ALSO VALID FOR PROFILING BASED ON THESE TERMS. THE
            APPLICABLE LEGAL BASIS TO WHICH PROCESSING ARISES, PLEASE READ
            THIS PRIVACY POLICY. IF YOU IF YOU OBJECT, WE WILL NO LONGER
            PROCESS YOUR PERSONAL DATA PROCESSING UNLESS WE HAVE COMPLETE
            REASONS FOR PROCESSING THAT WOULD BE PROTECTED EVIDENCE THAT
            OUTWEIGHES YOUR INTERESTS, RIGHTS AND FREEDOM OR PROCESSING SERVES
            TO ASSERT, EXERCISE OR DEFEND LEGAL CLAIMS (OBJECTION ACCORDING TO
            ART. 21 ABS. 1 GDPR). IF YOUR PERSONAL DATA IS PROCESSED TO
            OPERATE DIRECT ADVERTISING, YOU HAVE THE RIGHT TO OBJECT TO THE
            PROCESSING OF PERSONAL DATA CONCERNING YOU AT ANY TIME TO INCLUDE
            DATA FOR THE PURPOSES OF SUCH ADVERTISING; THIS ALSO APPLIES TO
            PROFILING, IF ANY ASSOCIATED WITH SUCH DIRECT ADVERTISING. IF YOU
            OBJECT, YOURS WILL PERSONAL DATA WILL NO LONGER BE USED FOR THE
            PURPOSE OF DIRECT ADVERTISING (OBJECTION ACCORDING TO ARTICLE 21
            (2) GDPR).
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-6 ml-4")}>
            Right to lodge a complaint with the responsible supervisory
            authority
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            In the event of violations of the GDPR, those affected have the
            right to lodge a complaint with one Supervisory authority, in
            particular in the Member State of your habitual residence
            workplace or the location of the alleged violation. The right to
            lodge a complaint exists without prejudice to any other
            administrative or judicial remedies. Right to data portability You
            have the right to receive data that we collect based on your
            consent or in fulfillment of a request Process the contract
            automatically, to yourself or to a third party in a common, in
            machine-readable format. Unless you transfer the data directly If
            you request data to be sent to another person responsible, this
            will only be done to the extent that it is technically feasible
            is.
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-6 ml-4")}>
            Information, correction and deletion
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            You have the right to do so at any time within the framework of
            the applicable legal provisions Free information about your stored
            personal data, their origin and Recipient and the purpose of data
            processing and, if applicable, a right to correction or Deletion
            of this data. This and other questions on the subject of personal
            data you can contact us at any time.
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-6 ml-4")}>
            Right to restriction of processing
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            You have the right to restrict the to request processing of your
            personal data. You can do this at any time contact us. The right
            to restriction of processing exists in the following cases:
          </div>
          <List
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            <ListItem>
              If you dispute the accuracy of your personal data stored by us,
              We usually need time to check this. For the duration of the exam
              you have the right to request the restriction of the processing
              of your personal data.
            </ListItem>
            <ListItem>
              If the processing of your personal data was/is occurring
              unlawfully, you may You request the restriction of data
              processing instead of deletion.
            </ListItem>
            <ListItem>
              If we no longer need your personal data, but you need it to
              exercise, defend or assert legal claims, you have the right to
              request that the processing of your personal data be restricted
              instead of deletion.
            </ListItem>
            <ListItem>
              If you have lodged an objection in accordance with Article 21
              Para. 1 GDPR, a consideration must be made between your
              interests and ours. As long as it is not yet certain whose
              interests prevail, you have the right to restrict the processing
              of your data to request personal data.
            </ListItem>
          </List>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            If you have restricted the processing of your personal data, you
            may do so Data - apart from their storage - only with your consent
            or for Assertion, exercise or defense of legal claims or to
            protect rights another natural or legal person or for reasons of
            important importance processed in the public interest of the
            European Union or a Member State.
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-6 ml-4")}>
            SSL or TLS encryption
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            This site uses SSL or TLS encryption for security reasons and to
            protect the transmission of confidential content, such as orders
            or inquiries that you send to us as the site operator. You can
            recognize an encrypted connection by the browser address line
            changing from “http://” to “https://” and by the lock symbol in
            your browser line. If SSL or TLS encryption is activated, the data
            you transmit to us cannot be read by third parties.
          </div>
          <div className={twMerge(textstyles.BigText, "mt-6")}>
            4 Data collection on this website
          </div>
          <div className={twMerge(textstyles.BigHint, "mt-3 ml-4")}>
            Cookies
          </div>
          <div
            className={twMerge(
              textstyles.SmallText,
              "flex flex-col mt-3 ml-8"
            )}
          >
            Our websites use so-called “cookies”. Cookies are small data
            packages and do not cause any damage to your device. They are
            stored on your device either temporarily for the duration of a
            session (session cookies) or permanently (persistent cookies).
            Session cookies are automatically deleted at the end of your
            visit. Permanent cookies remain stored on your device until you
            delete them yourself or your web browser automatically deletes
            them. Cookies can come from us (first-party cookies) or from
            third-party companies (so-called third-party cookies). Third-party
            cookies enable the integration of certain services from
            third-party companies within websites (e.g. cookies for processing
            payment services). Cookies have various functions. Numerous
            cookies are technically necessary because certain website
            functions would not work without them (e.g. the shopping cart
            function or the display of videos). Other cookies can be used to
            evaluate user behavior or for advertising purposes. Cookies that
            are necessary to carry out the electronic communication process,
            to provide certain functions you want (e.g. for the shopping cart
            function) or to optimize the website (e.g. cookies to measure the
            web audience) (necessary cookies). stored on the basis of Art. 6
            Para. 1 lit. f GDPR, unless another legal basis is stated. The
            website operator has a legitimate interest in storing necessary
            cookies for the technically error-free and optimized provision of
            its services. If consent to the storage of cookies and comparable
            recognition technologies has been requested, processing is carried
            out exclusively on the basis of this consent (Art. 6 Para. 1 lit.
            a GDPR and Section 25 Para. 1 TTDSG); consent can be revoked at
            any time. You can set your browser so that you are informed about
            the setting of cookies and only allow cookies in individual cases,
            exclude the acceptance of cookies for certain cases or in general,
            and activate the automatic deletion of cookies when you close the
            browser. If cookies are deactivated, the functionality of this
            website may be restricted. You can find out which cookies and
            services are used on this website in this data protection
            declaration.
          </div>
        </div>
      </div>
    </div>
  );
}
