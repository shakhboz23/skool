<template>
  <main class="sm:-mt-2 -mt-5 -mb-[80px]">
    <nav
      v-show="store.is_open"
      @click="store.is_open = false"
      class="sm:hidden flex items-center cursor-pointer -mt-10 mb-[10px] h-[60px] px-5"
    >
      <div class="full_flex gap-4 font-semibold _c07">
        <img src="@/assets/svg/icon/back_route.svg" alt="" />
        <p>{{ store.is_open_name }}</p>
      </div>
    </nav>
    <div class="flex gap-6">
      <aside
        :class="store.is_open ? 'sm:block hidden' : 'min-w-full'"
        class="md:min-w-[280px] sm:min-w-[200px] h-[calc(100vh_-140px)] overflow-hidden overflow-y-auto !duration-300"
      >
        <ul v-if="store.is_open_name" class="_c07 text-sm">
          <li
          @click="openData(index, i)"
          :class="
              store.is_open_name == i[1]
              ? '_c2a font-medium bg-[#F0F5FA]'
              : 'bg-white'
              "
            class="flex gap-4 items-center cursor-pointer r_8 overflow-hidden"
            v-for="(i, index) in legal_tabs"
            >
            <p
              :class="store.is_open_name == i[1] ? 'b_c2a' : ''"
              class="w-1 h-[44px]"
            ></p>
            <p>{{ i[0] }}</p>
          </li>
        </ul>
      </aside>
      <div
        class="w-full bg-white r_16 h-[calc(100vh_-140px)] overflow-hidden profile_accordion"
        :class="store.is_open ? '' : 'sm:block hidden'"
      >
        <div class="mainSlider h-[calc(100vh_-140px)] duration-700">
          <section
            class="h-[calc(100vh_-140px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full"
          >
            <div
              class="styled__CardWrapper-sc-jrheml-0 hesuCC styled__TabContentWrapper-sc-19crpt3-0 BWXAE"
            >
              <div class="space-y-4">
                <h1>Learnify rules</h1>
                <p>
                  This policy is a "living" document, and subject to refinement
                  and expansion in the future.
                </p>
                <p>
                  Learnify is dedicated to providing a harassment-free experience
                  for everyone, regardless of gender, gender identity and
                  expression, sexual orientation, disability, physical
                  appearance, body size, age, race, or religion. We do not
                  tolerate harassment of members in any form.
                </p>
                <p>
                  This code of conduct applies to all Learnify groups, including
                  our community, both online and off. Anyone who violates this
                  code of conduct may be sanctioned or expelled from these
                  groups at the discretion of the Learnify team.
                </p>
                <p>
                  Some Learnify groups may have additional rules in place, which
                  will be made clearly available to members. Members are
                  responsible for knowing and abiding by these rules.
                </p>
                <h2>Definitions</h2>
                <p>Harassment includes:</p>
                <ul class="pl-6 !list-disc space-y-2">
                  <li>
                    Offensive comments related to gender, gender identity and
                    expression, sexual orientation, disability, mental illness,
                    neuro(a)typicality, physical appearance, body size, age,
                    race, or religion.
                  </li>
                  <li>
                    Unwelcome comments regarding a person’s lifestyle choices
                    and practices, including those related to food, health,
                    parenting, drugs, and employment.
                  </li>
                  <li>
                    Deliberate misgendering or use of 'dead’ or rejected names.
                  </li>
                  <li>
                    Gratuitous or off-topic sexual images or behaviour in spaces
                    where they’re not appropriate.
                  </li>
                  <li>
                    Physical contact and simulated physical contact (eg, textual
                    descriptions like “*hug*” or “*backrub*”) without consent or
                    after a request to stop.
                  </li>
                  <li>Threats of violence.</li>
                  <li>
                    Incitement of violence towards any individual, including
                    encouraging a person to commit suicide or to engage in
                    self-harm.
                  </li>
                  <li>Deliberate intimidation.</li>
                  <li>Stalking or following.</li>
                  <li>
                    Harassing photography or recording, including logging online
                    activity for harassment purposes.
                  </li>
                  <li>Sustained disruption of discussion.</li>
                  <li>Unwelcome sexual attention.</li>
                  <li>
                    Pattern of inappropriate social contact, such as
                    requesting/assuming inappropriate levels of intimacy with
                    others
                  </li>
                  <li>
                    Continued one-on-one communication after requests to cease.
                  </li>
                  <li>
                    Deliberate “outing” of any aspect of a person’s identity
                    without their consent except as necessary to protect
                    vulnerable people from intentional abuse.
                  </li>
                  <li>Publication of non-harassing private communication.</li>
                  <li>
                    Learnify prioritizes marginalized people’s safety over
                    privileged people’s comfort. The Learnify team reserves the
                    right not to act on complaints regarding:
                  </li>
                  <li>
                    ‘Reverse’ -isms, including ‘reverse racism,’ ‘reverse
                    sexism,’ and ‘cisphobia’
                  </li>
                  <li>
                    Reasonable communication of boundaries, such as “leave me
                    alone,” “go away,” or “I’m not discussing this with you.”
                  </li>
                  <li>Communicating in a ‘tone’ you don’t find congenial</li>
                  <li>
                    Criticizing racist, sexist, cis sexist, or otherwise
                    oppressive behavior or assumptions
                  </li>
                </ul>
                <h2>Reporting</h2>
                <p>
                  If you are being harassed by a member of Learnify, notice that
                  someone else is being harassed, or have any other concerns,
                  please contact the Learnify team at help@learnify.com. If the person
                  who is harassing you is on the team, they will recuse
                  themselves from handling your incident. We will respond as
                  promptly as we can.
                </p>
                <p>
                  This code of conduct applies to Learnify spaces, but if you are
                  being harassed by a member of Learnify outside our spaces, we
                  still want to know about it. We will take all good-faith
                  reports of harassment by Learnify members seriously. This
                  includes harassment outside our spaces and harassment that
                  took place at any point in time. The abuse team reserves the
                  right to exclude people from Learnify based on their past
                  behavior, including behavior outside Learnify spaces and behavior
                  towards people who are not in Learnify.
                </p>
                <p>
                  In order to protect volunteers from abuse and burnout, we
                  reserve the right to reject any report we believe to have been
                  made in bad faith. Reports intended to silence legitimate
                  criticism may be deleted without response.
                </p>
                <p>
                  We will respect confidentiality requests for the purpose of
                  protecting victims of abuse. At our discretion, we may
                  publicly name a person about whom we’ve received harassment
                  complaints, or privately warn third parties about them, if we
                  believe that doing so will increase the safety of Learnify
                  members or the general public. We will not name harassment
                  victims without their affirmative consent.
                </p>
                <h2>Consequences</h2>
                <p>
                  Members asked to stop any harassing behavior are expected to
                  comply immediately.
                </p>
                <p>
                  If a participant engages in harassing behavior, the Learnify team
                  may take any action they deem appropriate, up to and including
                  expulsion from all Learnify groups and identification of the
                  participant as a harasser to other Learnify members or the
                  general public.
                </p>
                <h2>Diversity</h2>
                <p>
                  Learnify welcomes and encourages participation by everyone. No
                  matter how you identify yourself or how others perceive you:
                  we welcome you. We welcome contributions from everyone as long
                  as they interact constructively with our communities.
                </p>
              </div>
            </div>
          </section>
          <section
            class="pb-[500px] h-[calc(100vh_-140px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full"
          >
            <div
              class="styled__CardWrapper-sc-jrheml-0 hesuCC styled__TabContentWrapper-sc-19crpt3-0 BWXAE"
            >
              <div class="space-y-4">
                <h1>Learnify Privacy Policy</h1>
                <p>Last Updated: September 29, 2021</p>
                <p>
                  This Privacy Policy (“Privacy Policy") explains our privacy
                  practices for the activities described herein. Please read
                  this Privacy Policy carefully to learn how we collect, use,
                  share, and otherwise process information relating to
                  individuals (“Personal Data”), and to learn about your rights
                  and choices regarding your Personal Data.
                </p>
                <p>
                  A reference to “Learnify,” “we,” “us” or the “Company” is a
                  reference to Learnify.COM, INC. and its relevant affiliates
                  involved in the collection, use, sharing, or other processing
                  of Personal Data.
                </p>
                <p>
                  Please click the following links to learn more about our
                  Privacy Policy:
                </p>
                <ol class="list-decimal ml-8 space-y-1">
                  <li><a href="#responsible-entry"> Responsible Entity </a></li>
                  <li>
                    <a href="#processing-activities-covered"
                      >Processing Activities Covered</a
                    >
                  </li>
                  <li>
                    <a href="#personal-data-collection"
                      >What Personal Data Do We Collect?</a
                    >
                  </li>
                  <li>
                    <a href="#device-and-usage-data"
                      >What Device and Usage Data Do We Process?</a
                    >
                  </li>
                  <li>
                    <a href="#processing-personal-data"
                      >Purposes for Which We Process Personal Data</a
                    >
                  </li>
                  <li>
                    <a href="#data-sharing">
                      Who Do We Share Personal Data With?
                    </a>
                  </li>
                  <li>
                    <a href="#international-transfer"
                      >International Transfer of Personal Data</a
                    >
                  </li>
                  <li><a href="#children"> Children </a></li>
                  <li>
                    <a href="#storage-length"
                      >How Long Do We Keep Your Personal Data?</a
                    >
                  </li>
                  <li>
                    <a href="#personal-data-rights"
                      >Your Rights Relating to Your Personal Data</a
                    >
                  </li>
                  <li>
                    <a href="#personal-data-security"
                      >How We Secure Your Personal Data</a
                    >
                  </li>
                  <li>
                    <a href="#changes"> Changes to This Privacy Policy </a>
                  </li>
                  <li><a href="#contact"> Contact Us </a></li>
                </ol>
                <section
                  id="responsible-entry"
                  class="space-y-4"
                  style="scroll-margin-top: 64px"
                >
                  <h2>1. Responsible Entity</h2>
                  <p>
                    Learnify is the controller of your Personal Data as described
                    in this Privacy Policy, unless specified otherwise.
                  </p>
                  <p>
                    This Privacy Policy does not apply to the extent we process
                    Personal Data in the role of a processor or service provider
                    on behalf of our customers, including where we offer to our
                    customers various software products, platforms, and services
                    through which our customers (or their affiliates) collect,
                    use, share or process Personal Data.
                  </p>
                  <p>
                    For detailed privacy information related to a Learnify customer
                    or a customer affiliate who uses the Learnify software
                    products, platforms, and services as the controller, please
                    contact our customer directly. We are not responsible for
                    the privacy or data security practices of our customers,
                    which may differ from those explained in this Privacy
                    Policy.
                  </p>
                  <p>
                    For more information, please also see Section 10.5 below.
                  </p>
                </section>
                <section
                  id="processing-activities-covered"
                  style="scroll-margin-top: 64px"
                  class="space-y-4"
                >
                  <h2>2. Processing Activities Covered</h2>
                  <p>
                    This Privacy Policy applies to the processing of Personal
                    Data collected by us when you:
                  </p>
                  <ul class="list-desc ml-6 space-y-1">
                    <li>
                      Visit our websites that display or link to this Privacy
                      Policy;
                    </li>
                    <li>Visit our branded social media pages;</li>
                    <li>
                      Receive communications from us, including emails, phone
                      calls, texts or fax;
                    </li>
                    <li>
                      Use our software products, platforms, and services as an
                      authorized user where we act as a controller of your
                      Personal Data; or
                    </li>
                    <li>Apply for employment opportunities with us.</li>
                  </ul>
                  <p>
                    Our websites, platforms, and services may contain links to
                    and from the websites of third parties. If you follow a link
                    to any of these websites, please note that these websites
                    have their own privacy policies and that we do not accept
                    any responsibility or liability for these policies. Please
                    check these policies before you submit any data to these
                    websites.
                  </p>
                </section>
                <section
                  id="personal-data-collection"
                  style="scroll-margin-top: 64px"
                  class="space-y-4"
                >
                  <h2>3. What Personal Data Do We Collect?</h2>
                  <p>
                    The Personal Data we collect from you includes identifiers,
                    geolocation data, professional or employment-related
                    information, visual information, internet activity
                    information, and inferences drawn from any of these
                    categories. We collect such information in the following
                    situations:
                  </p>
                  <ul class="list-desc space-y-1 ml-6">
                    <li>
                      If you express an interest in obtaining additional
                      information about our services; request customer support;
                      sign up for our platform; or otherwise register to use our
                      services, we may require that you provide to us your
                      contact information, such as your name, school or company
                      name, address, phone number, email address or username and
                      password;
                    </li>
                    <li>
                      If you interact with our websites or emails, we
                      automatically collect information about your device and
                      your usage of our websites or emails (such as Internet
                      Protocol (IP) addresses or other identifiers), which may
                      qualify as Personal Data (please see the “What device and
                      usage data do we process?” section, below) using cookies,
                      web beacons, or similar technologies;
                    </li>
                    <li>
                      If you use and interact with our services, we
                      automatically collect information about your device and
                      your usage of our services through log files and other
                      technologies, some of which may qualify as Personal Data
                      (please see the “What device and usage data do we
                      process?” section, below);
                    </li>
                    <li>
                      If you communicate with us via a phone call from us, we
                      may record that call; and
                    </li>
                    <li>
                      If you voluntarily submit certain information to our
                      services, such as submitting online forms or surveys, we
                      collect the information you have provided as part of that
                      request.
                    </li>
                  </ul>
                  <p>
                    If you provide us or our service providers with any Personal
                    Data relating to other individuals, you represent that you
                    have the authority to do so, and, where required, have
                    obtained the necessary consent, and acknowledge that it may
                    be used in accordance with this Privacy Policy. If you
                    believe that your Personal Data has been provided to us
                    improperly, or want to exercise your rights relating to your
                    Personal Data, please contact us by using the information in
                    the “Contact us” section below.
                  </p>
                </section>
                <section
                  id="device-and-usage-data"
                  style="scroll-margin-top: 64px"
                  class="space-y-4"
                >
                  <h2>4. What Device and Usage Data Do We Process?</h2>
                  <p>
                    We use common information-gathering tools, such as tools for
                    collecting usage data, cookies, web beacons, pixels, and
                    similar technologies to automatically collect information
                    that may contain Personal Data as you navigate our websites,
                    our services, or interact with emails we have sent to you.
                  </p>
                  <h3>1. Device and Usage Data</h3>
                  <p>
                    As is true of most websites, we gather certain information
                    automatically when individual users visit our websites. This
                    information may include identifiers, commercial information,
                    and internet activity information such as IP address (or
                    proxy server information), device and application
                    information, identification numbers and features, location,
                    browser type, plug-ins, integrations, Internet service
                    provider, mobile carrier, the pages and files viewed,
                    searches, referring website, app or ad, operating system,
                    system configuration information, advertising and language
                    preferences, date and time stamps associated with your
                    usage, and frequency of visits to the websites.
                  </p>
                  <p>
                    This information is used to analyze overall trends, help us
                    provide and improve our websites, offer a tailored
                    experience for website users, and secure and maintain our
                    websites. In addition, we gather certain information
                    automatically as part of your use of our software products
                    and services. This information may include identifiers,
                    commercial information, and internet activity information
                    such as IP address (or proxy server), mobile device number,
                    device and application identification numbers, location,
                    browser type, Internet service provider or mobile carrier,
                    the pages and files viewed, website and webpage interactions
                    including searches and other actions you take, operating
                    system and system configuration information and date and
                    time stamps associated with your usage. This information is
                    used to maintain the security of the services, to provide
                    necessary functionality, to improve performance of the
                    services, to assess and improve customer and user experience
                    of the services, to review compliance with applicable usage
                    terms, to identify future opportunities for development of
                    the services, to assess capacity requirements, to identify
                    customer opportunities, and for the security of Learnify
                    generally (in addition to the security of our products and
                    services). Some of the device and usage data collected by
                    the services, whether alone or in conjunction with other
                    data, could be personally identifying to you. Please note
                    that this device and usage data is primarily used to
                    identify the uniqueness of each user logging on (as opposed
                    to specific individuals), apart from where it is strictly
                    required to identify an individual for security purposes or
                    as required as part of our provision of the services to our
                    customers.
                  </p>
                  <h3>
                    2. Cookies, Web Beacons and Other Tracking Technologies
                  </h3>
                  <p>
                    To make our websites and services work properly, we
                    sometimes place small data files called cookies on your
                    device. A cookie is a small text file that a website saves
                    on your computer or mobile device when you visit the site.
                    It enables the website to remember your actions and
                    preferences (such as login, shopping cart, or other
                    preferences) over a period of time, so you do not have to
                    keep re-entering them whenever you come back to the site or
                    browse from one page to another. To learn more, please see
                    our <a href="/legal?t=cookies"> Cookie Policy. </a>
                  </p>
                  <p>
                    You may wish to restrict the use of cookies. Please be aware
                    that some ofthe features of our website may not function
                    correctly if you disable cookies.
                  </p>
                  <p>
                    Most modern browsers allow you to change your cookie
                    settings. You can usually find these settings in the options
                    or preferences menu of your browser. To understand these
                    settings, the following links for commonly used browsers may
                    be helpful:
                  </p>
                  <ul class="space-y-1">
                    <li>
                      <a
                        href="https://support.google.com/chrome/answer/95647?hl=en&amp;ref_topic=14666"
                        target="_blank"
                        rel="noreferrer"
                        >Cookie settings in Chrome</a
                      >
                    </li>
                    <li>
                      <a
                        href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer?redirectslug=Cookies&amp;redirectlocale=en-US"
                        target="_blank"
                        rel="noreferrer"
                        >Cookie settings in Firefox</a
                      >
                    </li>
                    <li>
                      <a
                        href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d#ie=ie-10"
                        target="_blank"
                        rel="noreferrer"
                        >Cookie settings in Internet Explorer</a
                      >
                    </li>
                    <li>
                      <a
                        href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                        target="_blank"
                        rel="noreferrer"
                        >Cookie settings in Safari web</a
                      >
                      and
                      <a
                        href="https://support.apple.com/en-us/HT201265"
                        target="_blank"
                        rel="noreferrer"
                        >iOS</a
                      >
                    </li>
                  </ul>
                  <h3>3. Do-Not-Track Signals</h3>
                  <p>
                    Do Not Track (“DNT”) is a privacy preference that users can
                    set in certain web browsers. DNT is a way for users to
                    inform websites and services that they do not want certain
                    information about their webpage visits collected over time
                    and across websites or online services. We do not recognize
                    or respond to browser-initiated DNT signals, as the Internet
                    industry is currently still working toward defining exactly
                    what DNT means, what it means to comply with DNT, and a
                    common approach to responding to DNT.
                  </p>
                </section>
                <section
                  id="processing-personal-data"
                  style="scroll-margin-top: 64px"
                  class="space-y-4"
                >
                  <h2>5. Purposes for Which We Process Personal Data</h2>
                  <p>
                    We collect and process your Personal Data for the following
                    purposes:
                  </p>
                  <ul class="space-y-1">
                    <li>
                      Providing our websites, platforms, and services (including
                      necessary functionality for both): We process your
                      Personal Data to perform our contract with you for the use
                      of our websites, platforms, and services and to fulfill
                      our obligations under the applicable terms of use and
                      service;
                    </li>
                    <li>
                      Promoting the security of our websites and services: We
                      process your Personal Data by tracking use of our websites
                      and services, creating aggregated non-personal data,
                      verifying accounts and activity, investigating suspicious
                      activity, and enforcing our terms and policies to the
                      extent it is necessary for promoting the safety and
                      security of the services, systems and applications;
                    </li>
                    <li>
                      Managing user registrations: If you have registered for an
                      account with us, we process your Personal Data by managing
                      your user account for the purpose of performing our
                      contract with you according to applicable terms of
                      service;
                    </li>
                    <li>
                      Handling contact and user support requests: If you fill
                      out a web form or request user support, or if you contact
                      us by other means including via a phone call, we process
                      your Personal Data to perform our contract with you and to
                      the extent it is necessary for fulfilling your requests
                      and communicating with you;
                    </li>
                    <li>
                      Developing and improving our websites and services: We may
                      process your Personal Data to analyze trends and to track
                      usage of and interactions with our websites and services
                      to the extent it is necessary for developing and improving
                      our websites and services;
                    </li>
                    <li>
                      Assessing and improving user experience: We process device
                      and usage data as described in Section 4.1 above, which in
                      some cases may be associated with your Personal Data, to
                      analyze trends and assess and improve the overall user
                      experience to the extent it is necessary for developing
                      and improving the service offering;
                    </li>
                    <li>
                      Identifying customer opportunities: We process your
                      Personal Data to assess new potential customer
                      opportunities to ensure that we are meeting the demands of
                      our customers and their users’ experiences;
                    </li>
                    <li>
                      Recording phone calls: We may record phone calls for
                      training, quality assurance, and administration purposes.
                      If required under applicable law, we will obtain your
                      prior consent or give you the option to object to a call
                      being recorded; and
                    </li>
                    <li>
                      Complying with legal obligations: We process your Personal
                      Data when cooperating with public and government
                      authorities, courts or regulators in accordance with our
                      legal obligations under applicable laws, to protect
                      against misuse or abuse of our websites, protect personal
                      property or safety, pursue remedies available to us, and
                      limit our damages, comply with judicial proceedings, court
                      orders or legal processes, respond to lawful requests, or
                      for auditing purposes.
                    </li>
                  </ul>
                  <p>
                    If we need to collect and process Personal Data by law, or
                    under a contract we have entered into with you, and you fail
                    to provide the required Personal Data when requested, we may
                    not be able to perform our contract with you.
                  </p>
                </section>
                <section
                  id="data-sharing"
                  style="scroll-margin-top: 64px"
                  class="space-y-4"
                >
                  <h2>6. Who Do We Share Personal Data With?</h2>
                  <p>We may share your Personal Data as follows:</p>
                  <ul class="space-y-1">
                    <li>
                      <strong>Service Providers:</strong>With our contracted
                      service providers and any subcontractors as required to
                      offer you our products and services. The service providers
                      we use help us to run, operate and maintain our Services
                      through third party platform and software tools; perform
                      content moderation and crash analytics; run email or
                      mobile messaging campaigns; and provide technical and
                      customer support. Some external service providers may also
                      collect information directly from you in accordance with
                      their own privacy policy.
                    </li>
                    <li>
                      <strong>Professional Advisers:</strong>In individual
                      instances, we may share your Personal Data with
                      professional advisers acting as service providers,
                      processors, or joint controllers - including lawyers,
                      bankers, auditors, and insurers who provide consultancy,
                      banking, legal, insurance and accounting services; and
                    </li>
                    <li>
                      <strong
                        >Third Parties Involved in a Corporate
                        Transaction:</strong
                      >If we are involved in a merger, reorganization,
                      dissolution or other fundamental corporate change, or sell
                      a website or business unit, or if all or a portion of our
                      business, assets or stock are acquired by a third party.
                      In accordance with applicable laws, we will use reasonable
                      efforts to notify you of any transfer of Personal Data to
                      an unaffiliated third party.
                    </li>
                  </ul>
                  <p>
                    We may also share anonymous or de-identified usage data with
                    Learnify’s service providers for the purpose of helping Learnify
                    in such analysis and improvements. Additionally, Learnify may
                    share such anonymous or de-identified usage data on an
                    aggregate basis in the normal course of operating our
                    business; for example, we may share information publicly to
                    show trends about the general use of our services.
                  </p>
                  <p>
                    For more information on the recipients of your Personal
                    Data, please contact us by using the information in the
                    “Contact us” section, below.
                  </p>
                </section>
                <section
                  id="international-transfer"
                  style="scroll-margin-top: 64px"
                  class="space-y-4"
                >
                  <h2>7. International Transfer of Personal Data</h2>
                  <p>
                    Any data that you provide to us may be accessed, shared or
                    processed by our offices, located in the United States, and
                    service providers located in the United States, if such data
                    transfer is necessary for the specific purpose for which you
                    submitted your data (such as the provision of goods or
                    services under a written contract).
                  </p>
                  <p>
                    This may entail a transfer of your personal information
                    across international borders. The data protections standards
                    may differ and be lower than the standards enforced in your
                    jurisdiction. We maintain appropriate safeguards as required
                    by applicable law for any personal information transferred
                    internationally, including, where applicable, standard
                    contractual clauses. For a copy of these clauses, please
                    contact us as set forth in the “Contact Us” section below.
                  </p>
                </section>
                <section
                  id="children"
                  style="scroll-margin-top: 64px"
                  class="space-y-4"
                >
                  <h2>8. Children</h2>
                  <p>
                    Our websites are not directed at individuals under the age
                    of 13. We do not knowingly collect personal information from
                    children under 13. If you become aware that a child has
                    provided us with personal information, please contact us
                    using the contact details provided in the “Contact Us”
                    section below. If we become aware that a child under 16 has
                    provided us with personal information, we will take steps to
                    delete such information.
                  </p>
                </section>
                <section
                  id="storage-length"
                  style="scroll-margin-top: 64px"
                  class="space-y-4"
                >
                  <h2>9. How Long Do We Keep Your Personal Data?</h2>
                  <p>
                    We may retain your Personal Data for a period of time
                    consistent with the original purpose of collection (see the
                    “Purposes for which we process Personal Data” section above)
                    or as long as required to fulfill our legal obligations. We
                    determine the appropriate retention period for Personal Data
                    on the basis of the amount, nature, and sensitivity of the
                    Personal Data being processed, the potential risk of harm
                    from unauthorized use or disclosure of the Personal Data,
                    whether we can achieve the purposes of the processing
                    through other means, and on the basis of applicable legal
                    requirements (such as applicable statutes of limitation).
                  </p>
                  <p>
                    After expiry of the applicable retention periods, your
                    Personal Data will be deleted. If there is any data that we
                    are unable, for technical reasons, to delete entirely from
                    our systems, we will implement appropriate measures to
                    prevent any further use of or access to such data.
                  </p>
                  <p>
                    For more information on data retention periods, please
                    contact us by using the information in the “Contact us”
                    section, below.
                  </p>
                </section>
                <section
                  id="personal-data-rights"
                  style="scroll-margin-top: 64px"
                  class="space-y-4"
                >
                  <h2>10. Your Rights Relating to Your Personal Data</h2>
                  <h3>1. Your Rights</h3>
                  <p>
                    You may have certain rights relating to your Personal Data,
                    subject to local data protection laws. Depending on the
                    applicable laws these rights may include the right to:
                  </p>
                  <ul class="space-y-1">
                    <li>Access your Personal Data held by us;</li>
                    <li>Know more about how we process your Personal Data;</li>
                    <li>
                      Erase or delete your Personal Data, to the extent
                      permitted by applicable data protection laws;
                    </li>
                    <li>
                      Restrict our processing of your Personal Data, to the
                      extent permitted by law;
                    </li>
                    <li>
                      Object to our processing of your Personal Data. Where we
                      process your Personal Data for direct marketing purposes
                      or share it with third parties for their own direct
                      marketing purposes, you can exercise your right to object
                      at any time to such processing without having to provide
                      any specific reason for such objection;
                    </li>
                    <li>
                      Opt-out of certain disclosures of your Personal Data to
                      third parties; and
                    </li>
                    <li>
                      Not be discriminated against for exercising your rights
                      described above.
                    </li>
                  </ul>
                  <h3>
                    2. Additional Disclosures for California, Colorado or
                    Virginia Residents
                  </h3>
                  <p>
                    We have listed the privacy rights for several U.S. state
                    jurisdictions below, but we understand you may have
                    additional rights in your jurisdiction. You may contact us
                    directly at any time about exercising your data protection
                    rights. We will consider your request in accordance with
                    applicable laws.
                  </p>
                  <p>
                    Certain state laws require that we detail the categories of
                    Personal Data that we disclose for certain “business
                    purposes,” such as to service providers that assist us with
                    securing our services or marketing our products.
                  </p>
                  <p>
                    We disclose the following categories of Personal Data for
                    our business purposes:
                  </p>
                  <ul class="space-y-1">
                    <li>Identifiers;</li>
                    <li>
                      Personal information under
                      <a
                        href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1798.80.&amp;lawCode=CIV"
                        target="_blank"
                        rel="noreferrer"
                        >California Civil Code section 1798.80</a
                      >;
                    </li>
                    <li>Internet activity information;</li>
                    <li>Visual information;</li>
                    <li>Professional or employment-related information;</li>
                    <li>Education information; and</li>
                    <li>
                      Inferences drawn from any of the above information
                      categories.
                    </li>
                  </ul>
                  <p>Sensitive Categories of Personal Data:</p>
                  <ul class="space-y-1">
                    <li>Account log-in information; and</li>
                    <li>Geolocation data.</li>
                  </ul>
                  <p>
                    Several jurisdictions grant state residents certain rights,
                    including the right to access specific types of Personal
                    Data, the right to learn how we process Personal Data, the
                    right to know whether and how we disclose or sell Personal
                    Data, the right to opt out of any sale of Personal Data, the
                    right to request deletion of Personal Data in certain
                    circumstances, and the right not to be denied goods or
                    services for exercising these rights.
                  </p>
                  <p>
                    California law further permits you to request information
                    regarding the disclosure of your personal information to
                    third parties for the third parties’ direct marketing
                    purposes. We do not disclose your personal information to
                    third parties for the third parties’ direct marketing
                    purposes.
                  </p>
                  <p>
                    In the preceding twelve months we have not sold personal
                    information.
                  </p>
                  <p>
                    For information on how to exercise your rights, please refer
                    to Section 10.4 below.
                  </p>
                  <p>
                    If you are an authorized agent wishing to exercise rights on
                    behalf of a state resident, please contact us using the
                    information in the “Contact us” section below and provide us
                    with a copy of the consumer’s written authorization
                    designating you as their agent. We may need to verify your
                    identity and place of residence before completing your
                    rights request.
                  </p>
                  <h3>
                    3. Additional Disclosures for Data Subjects in the EEA and
                    the U.K.
                  </h3>
                  <p>
                    Residents in the European Economic Area and the United
                    Kingdom (together, for purposes of this section of the
                    Privacy Policy, “EEA”), as well ascertain other
                    jurisdictions, are entitled to certain rights and
                    disclosures with respect to their Personal Data.
                  </p>
                  <p>
                    Our legal bases for collecting and using your Personal Data
                    include:
                  </p>
                  <ul class="space-y-1">
                    <li>
                      The performance of your contract or to enter into the
                      contract and to take action on your requests. For example,
                      the processing of your account registration, providing our
                      services, platforms, and products to you, providing
                      customer service to you.
                    </li>
                    <li>
                      Our legitimate business interests. For example, fraud
                      prevention, maintaining the security of our network and
                      services, and maintaining, analyzing, and improving our
                      products and services.
                    </li>
                    <li>
                      Compliance with a mandatory legal obligation. For example,
                      maintaining administrative records which are subject to
                      mandatory retention periods. We may also collect your
                      Personal Data to record your requests to exercise your
                      rights and to verify your identity for such requests.
                    </li>
                    <li>
                      Consent you provide where we do not rely on another legal
                      basis. Consent may be withdrawn at any time.
                    </li>
                  </ul>
                  <p>
                    In some countries, and in particular if you are located in
                    the EEA, you may have the right to:
                  </p>
                  <ul class="space-y-1">
                    <li>Access your personal information;</li>
                    <li>Correct inaccurate personal information;</li>
                    <li>
                      Request erasure of your personal information without undue
                      delay;
                    </li>
                    <li>
                      Request the restricted processing of your personal
                      information;
                    </li>
                    <li>
                      Request portability of the personal information that you
                      have given us; and
                    </li>
                    <li>
                      To object to the processing of your personal information.
                    </li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact us as set
                    forth in the “Contact Us” section below and specify which
                    privacy right(s) you wish to exercise. We may need to verify
                    your identity in order to honor your request.
                  </p>
                  <p>
                    If you have any issues with our compliance, you have the
                    right to lodge a complaint with an
                    <a
                      href="https://ec.europa.eu/justice/article-29/structure/data-protection-authorities/index_en.htm"
                      target="_blank"
                      rel="noreferrer"
                      >EEA supervisory authority</a
                    >. We would, however, appreciate the opportunity to first
                    address your concerns and would welcome you directing an
                    inquiry first to us per the “Contact us” section below.
                  </p>
                  <h3>4. How to Exercise Your Rights</h3>
                  <p>
                    To exercise your rights, please contact us by using the
                    information in the“Contact us” section below. Your personal
                    data may be processed in responding to these rights. We will
                    respond to all legitimate requests ina timely manner and in
                    accordance with applicable laws, and will contact you if we
                    need additional information from you in order to honor your
                    request or verify your identity.
                  </p>
                  <h3>5. Your Rights Relating to Customer Data</h3>
                  <p>
                    As described above, we may also process Personal Data
                    submitted by or for a customer to our software products,
                    platforms, and services. To this end, if not stated
                    otherwise in this Privacy Policy or in a separate
                    disclosure, we process such Personal Data as a processor on
                    behalf of our customer (and its affiliates) who is the
                    controller of the Personal Data(see the “Responsible entity”
                    section above). We are not responsible for and have no
                    control over the privacy and data security practices of our
                    customers, which may differ from those explained in this
                    Privacy Policy. If your data has been submitted to us by or
                    on behalf of a Learnify customer and you wish to exercise any
                    rights you may have under applicable data protection laws,
                    please inquire with them directly. Because we may only
                    access a customer’s data upon their instructions, if you
                    wish to make your request directly to us, please provide us
                    the name of the Learnify customer who submitted your data to
                    us. We will refer your request to that customer, and will
                    support them as needed in responding to your request within
                    a reasonable timeframe.
                  </p>
                </section>
                <section
                  id="personal-data-security"
                  style="scroll-margin-top: 64px"
                  class="space-y-4"
                >
                  <h2>11. How We Secure Your Personal Data</h2>
                  <p>
                    We implement a variety of security measures to maintain the
                    safety of your personal information when you enter, submit,
                    or access your personal information. For example, when
                    possible, we use encryption to transfer and store data. We
                    further limit access to this data using access controls and
                    confidentiality commitments.
                  </p>
                  <p>
                    However, no website, application, or transmission can
                    guarantee security. Thus, while we have established and
                    maintain what we believe to be reasonable procedures to
                    protect the confidentiality, security, and integrity of
                    personal information obtained through the Sites, we cannot
                    ensure or warrant the security of any information you
                    transmit to us.
                  </p>
                </section>
                <section
                  id="changes"
                  style="scroll-margin-top: 64px"
                  class="space-y-4"
                >
                  <h2>12. Changes to This Privacy Policy</h2>
                  <p>
                    We may change our Privacy Policy at any time. If we make
                    material changes to this privacy policy, we may notify you
                    either by prominently posting a notice of such changes or by
                    directly sending you a notification. We encourage you to
                    periodically review this Privacy Policy to ensure you are
                    familiar with the most current version.
                  </p>
                </section>
                <section
                  id="contact"
                  style="scroll-margin-top: 64px"
                  class="space-y-4"
                >
                  <h2>13. Contact us</h2>
                  <p>
                    If you wish to contact us or have any questions about or
                    complaints in relation to this Privacy Policy, please
                    contact us at the following contact details:<a
                      href="mailto:help@learnify.com"
                    >
                      help@learnify.com
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </section>
          <section
            class="h-[calc(100vh_-140px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full"
          >
            <div
              class="styled__CardWrapper-sc-jrheml-0 hesuCC styled__TabContentWrapper-sc-19crpt3-0 BWXAE"
            >
              <div class="styled__LegalContentWrapper-sc-dw1jdk-1 iyTwjP">
                <h1>Learnify Terms and Conditions</h1>
                <p>Effective: July 1, 2023</p>
                <p>
                  PLEASE READ THE TERMS AND CONDITIONS CAREFULLY. THE TERMS AND
                  CONDITIONS(“AGREEMENT”) CONSTITUTE A LEGAL AGREEMENT BETWEEN
                  YOU AND Learnify.
                </p>
                <p>
                  SECTION 16 OF THIS AGREEMENT CONTAINS PROVISIONS THAT GOVERN
                  HOW CLAIMS THAT YOU AND WE HAVE AGAINST EACH OTHER ARE
                  RESOLVED, INCLUDING, WITHOUT LIMITATION, ANY CLAIMS THAT AROSE
                  OR WERE ASSERTED BEFORE THE EFFECTIVE DATE OF THIS AGREEMENT.
                  IN PARTICULAR, SECTION 16 SETS FORTH OUR ARBITRATION AGREEMENT
                  WHICH WILL, WITH LIMITED EXCEPTIONS, REQUIRE DISPUTES BETWEEN
                  US TO BE SUBMITTED TO BINDING AND FINAL ARBITRATION.UNLESS YOU
                  OPT OUT OF THE ARBITRATION AGREEMENT: (1) YOU WILL ONLY BE
                  PERMITTED TO PURSUE CLAIMS AND SEEK RELIEF AGAINST US ON AN
                  INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY
                  CLASS OR REPRESENTATIVE ACTION OR PROCEEDING; AND (2) YOU ARE
                  WAIVING YOUR RIGHT TO SEEK RELIEF IN A COURT OF LAW AND TO
                  HAVE A JURY TRIAL ON YOUR CLAIMS. PLEASE SEE SECTION 16 FOR
                  MORE INFORMATION REGARDING THIS ARBITRATION AGREEMENT, THE
                  POSSIBLE EFFECTS OF THIS ARBITRATION AGREEMENT, AND HOW TO OPT
                  OUT OF THE ARBITRATION AGREEMENT.
                </p>
                <h2>1. Purpose</h2>
                <p>
                  Learnify.COM, INC. (“Learnify,” “we,” “us,” or “our”) provides a
                  platform which allows people to host communities with which
                  they can share education content and course materials. By
                  using the Learnify website and any of the information and
                  services offered through the application (“Services”), you
                  agree to be bound by this Agreement. The success of the
                  Services, however, depends on the adherence to the terms of
                  this Agreement by you and other Users (collectively “you,”
                  “your,” or “Users”). While we will do our best to enforce the
                  terms of this Agreement, we cannot warrant or represent that
                  other Users will in fact adhere to this Agreement and cannot
                  act as insurers or accept any liability for their failure to
                  do so.
                </p>
                <h2>2. Eligibility</h2>
                <p>
                  By accessing or using the Services in any way, clicking on a
                  button or taking similar action to signify your affirmative
                  acceptance of this Agreement, you hereby represent that:
                </p>
                <ul style="list-style-type: lower-alpha">
                  <li>
                    You have read, understand, and agree to be bound by this
                    Agreement and any future amendments and additions to this
                    Agreement as published from time to time at this link or
                    through the Services;
                  </li>
                  <li>You are 13 or older;</li>
                  <li>
                    You have the authority to enter into the Agreement
                    personally. Except as otherwise provided herein, if you do
                    not agree to be bound by the Agreement, you may not access
                    or use the Services; and,
                  </li>
                  <li>
                    You will comply with all applicable laws, including those of
                    the country, state and city in which you are present while
                    using the Services.
                  </li>
                </ul>
                <h2>3. Access</h2>
                <ul style="list-style-type: lower-alpha">
                  <li>
                    <span style="text-decoration: underline">Access.</span> By
                    entering into this Agreement, you will be granted a
                    revocable license to access the Services. Your access
                    privileges, however, are conditioned on your adherence to
                    the terms of this Agreement. We reserve the right to
                    temporarily deny you access to the Services or permanently
                    terminate your access privileges at any time if, in our sole
                    discretion, you have failed to abide by the terms of this
                    Agreement or appear to us likely to do so. By agreeing to
                    grant you access, we do not obligate ourselves to do so or
                    to maintain the Services, or to maintain it in its present
                    form, and we expressly reserve the right to modify, suspend,
                    or terminate your access privileges.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Prohibited Uses.</span
                    >
                    For members of a group community (“Members”): You
                    understand, acknowledge, and agree that any access or use of
                    the Services shall be for your personal, non-commercial use
                    only, and that you will not commercially exploit any portion
                    of the Services. For content creators and group
                    administrators (“Admins”): You understand, acknowledge, and
                    agree that any access or use of the Services shall be solely
                    on behalf of you or your organization, and that you have all
                    authorizations and rights necessary to use any portion of
                    the Services on behalf of your organization.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Privileges Nontransferable.</span
                    >
                    Your access privileges may not be transferred by you to any
                    third parties.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Passwords and Security.</span
                    >
                    You agree not to disclose to anyone your confidential
                    password and to notify us immediately if there has been a
                    breach of your security that affects our Services.
                  </li>
                </ul>
                <h2>4. Acceptable Use Policy</h2>
                <p>By using the Services, you agree that:</p>
                <ul style="list-style-type: lower-alpha">
                  <li>
                    You will only use the Services for lawful purposes, and not
                    for deceptive or fraudulent purposes; you will not send or
                    store any unlawful material.
                  </li>
                  <li>
                    You will not use the Services to cause nuisance, annoyance
                    or inconvenience.
                  </li>
                  <li>
                    You will not use the Services, or any content accessible
                    through the Services, for any commercial purpose, including
                    but not limited to contacting, advertising to, soliciting or
                    selling to, any Users.
                  </li>
                  <li>
                    You will not violate the publicity or privacy rights of
                    another individual.
                  </li>
                  <li>
                    You will not copy or distribute any content displayed
                    through the Services.
                  </li>
                  <li>
                    You will not create or compile, directly or indirectly, any
                    collection, compilation, or other directory from any content
                    displayed through the Services except for your personal, non
                    commercial use.
                  </li>
                  <li>
                    The information you provide to us or otherwise communicate
                    with us is accurate.
                  </li>
                  <li>
                    You will not use the Services in any way that could damage,
                    disable, overburden or impair any of our servers, or the
                    networks connected to any of our servers.
                  </li>
                  <li>
                    You will not attempt to gain unauthorized access to any part
                    of the Services and/or to any service, account, resource,
                    computer system and/or network connected to any of our
                    servers.
                  </li>
                  <li>
                    You will not deep-link to the Services or access the
                    Services manually or with any robot, spider, web crawler,
                    extraction software, automated process and/or device to
                    scrape, copy or monitor any portion of the Services or any
                    content on the Services.
                  </li>
                  <li>
                    You will report any errors, bugs, unauthorized access
                    methodologies or any breach of our intellectual property
                    rights that you uncover in your use of the Services.
                  </li>
                  <li>
                    You will not impersonate another person, act as another
                    entity without authorization, or create multiple accounts.
                  </li>
                  <li>
                    Your self-submitted content (“User Content”) does not
                    contain material that solicits personal information from
                    anyone under 18 or exploits people under the age of 18 in a
                    sexual or violent manner, and does not violate any federal
                    or state law concerning child pornography or otherwise
                    intended to protect the health or wellbeing of minors.
                  </li>
                  <li>
                    Your User Content does not violate any state or federal law
                    designed to regulate electronic advertising.
                  </li>
                  <li>
                    Your User Content does not contain pictures, data, audio or
                    visual files, or any other content that is excessive in
                    size, as determined by us in our sole discretion.
                  </li>
                  <li>
                    The creation, distribution, transmission, public display and
                    performance, accessing, downloading and copying of your User
                    Content does not and will not infringe the proprietary
                    rights, including but not limited to the copyright, patent,
                    trademark or trade secret rights of any third party.
                  </li>
                  <li>
                    You have fully complied with any third-party licenses
                    relating to your User Content, and have done all things
                    necessary to successfully pass through to viewers any
                    required terms.
                  </li>
                </ul>
                <h2>5. Information on our Services</h2>
                <p>
                  While we will always use our best efforts to ensure the
                  accuracy and completeness of information provided on our
                  Services, we cannot guarantee the accuracy, adequacy, quality,
                  or suitability of any data on our Services and expressly
                  disclaim liability for errors and omissions in the contents of
                  our Services. Any use or reliance on any content or materials
                  posted via the Services or obtained by you through the
                  Services is at your own risk. Any link to a website or phone
                  number owned by a third party does not constitute an
                  endorsement, approval, association, sponsorship, or
                  affiliation with the linked site or phone number.
                </p>
                <h2>6. Payment Terms for Group Admins</h2>
                <p>
                  <span style="text-decoration: underline"
                    >On-Time Payment.</span
                  >
                  Admin hereby authorizes Learnify to charge Admin's payment method
                  (as specified below), in advance, for the amount of Admin's
                  regular subscription fees, inclusive of any and all Services
                  that Admin has signed up for (collectively, “Subscription
                  Fees”), for each agreed term of the Admin's selected
                  subscription term. Admin hereby authorizes Learnify to modify the
                  Subscription Fees charged for a selected subscription term
                  upon thirty (30) days’ notice to Admin sent by e-mail to the
                  address provided on registration. The Subscription Fees, when
                  paid, are non-refundable and accrue on the first day of each
                  term or successive renewal term until canceled, regardless of
                  whether or not the Admin actually uses the Site or the
                  Services. Various Services on the Site, whether offered by
                  Learnify, third-party service providers or others, may require
                  additional fees or charges not included within a subscription.
                </p>
                <p>
                  Admin is required to pay all charges on time and agrees to
                  submit an accompanying payment authorization in connection
                  with these charges when requested by Learnify. Learnify may
                  terminate or disable Admin's subscription if Admin fails to
                  pay fully and in a timely manner all amounts due to Learnify. If
                  Admin's payment method expires or is otherwise declined for
                  payment, access to the Services and the Site may be modified,
                  suspended or cancelled, in Learnify's sole discretion and without
                  notice to Admin. All fees are quoted and payable in United
                  States Dollars. Admin is also responsible for paying all
                  applicable taxes for Services and/or Content, and any other
                  costs incurred in connection with the use of or access to the
                  Site or its Services.
                </p>
                <p>
                  <span style="text-decoration: underline"
                    >Payment Methods.</span
                  >
                  Admin agrees to the
                  <a href="/legal?t=privacy" target="_blank" rel="noreferrer"
                    >Privacy Policy</a
                  >
                  when providing any necessary personal information for the
                  purposes of processing payment for a Learnify subscription. Learnify
                  may use third-party service providers for payment processing.
                  In such cases, the third-party payment processor’s terms and
                  conditions apply. Please review these third-party terms and
                  conditions before completing payment.
                </p>
                <p>
                  <span style="text-decoration: underline"
                    >Subscription Term; Auto Renewal.</span
                  >
                  Subscriptions are normally assessed on a monthly or annual
                  basis, but other Services and their respective billing
                  arrangements may be made available to Admins at Learnify's sole
                  discretion. The Subscription Fees are calculated from the day
                  upon which Admin's paid Subscription commences. From time to
                  time and at its sole discretion, Learnify may offer different
                  subscription terms on its Site, and the fees for such
                  subscriptions may vary. The term of Admin's access to the
                  Site, Services and Content is based upon Admin's express
                  agreement and adherence to these Terms and to Admin's fully
                  paid subscription and/or other fees.<strong>
                    Admin's subscription to the Site shall be for the initial
                    term (e.g., monthly or annually) as may be agreed by Admin
                    and Learnify through online registration and shall
                    automatically renew for indefinite successive renewal terms
                    for the same period as the initial term, unless terminated
                    by Admin or Learnify in accordance with the provisions of these
                    Terms.</strong
                  >
                </p>
                <p>
                  <span style="text-decoration: underline">Cancellation.</span>
                  Either Learnify or Admin may cancel Admin’s Subscription at any
                  time for any reason (unless otherwise stated in an applicable
                  promotional offer). In the event of cancellation by Learnify or
                  by Admin, all fees due to Learnify up to the end of the
                  then-current term billing cycle at time of cancellation shall
                  remain payable to Learnify. No refunds will be provided for
                  partial billing periods, unless otherwise specifically stated
                  in an applicable promotional offer. Upon cancellation, Admin
                  will retain access to Learnify through the end of Admin’s billing
                  period. After the end of such billing period, Admin’s group
                  will be archived, whereas then-current content will be
                  available on a read-only basis, and no new content may be
                  added.
                </p>
                <p>
                  Admins may cancel their subscription by any of the methods
                  below:
                </p>
                <ul>
                  <li>
                    Sign into Admin’s Learnify account, click on “Settings” and
                    click on “Billing” then “Cancel Subscription”; or
                  </li>
                  <li>
                    Send a cancellation request via email to
                    <a href="mailto:help@learnify.com">help@learnify.com</a>
                  </li>
                </ul>
                <p>
                  If at any time Learnify believes, in its sole discretion, that an
                  Admin has violated any provision of these Terms, Learnify may
                  immediately terminate that Admin’s Subscription and all other
                  Services without any refund or other remedy, and all fees due
                  to Learnify up to the end of the then-current billing cycle at
                  the time of such termination shall remain payable to Learnify.
                  Such termination will not limit any other right by Learnify under
                  contract, tort or any other legal theory to pursue any claim
                  or cause of action against the Admin for violating these
                  Terms, including without limitation, monetary damages,
                  injunctive relief, attorney's fees and court costs.
                </p>
                <p>
                  <span style="text-decoration: underline"
                    >Account Discrepancies.</span
                  >
                  Admin may contact Learnify by e-mail at
                  <a href="mailto:help@learnify.com">help@learnify.com</a> concerning
                  charges or other questions regarding the status of Admin's
                  account. However, if Admin's account-related questions are not
                  satisfactorily resolved within fifteen (15) business days of
                  Admin's first calling or sending an e-mail to Learnify Support
                  regarding such questions, Admin must write to Learnify at:
                  Learnify.COM, Inc., 111 Main St. El Segundo, CA 90245, delivered
                  by United States mail.
                </p>
                <p>
                  Notwithstanding the foregoing, in no event may Admin dispute
                  any charge or account billing hereunder later than ninety (90)
                  days after such questionable account billing or other
                  discrepancy should have been or could have been reasonably
                  discovered by Admin. Otherwise, except as required by
                  applicable law, any and all such Admin complaints are waived
                  by Admin.
                </p>
                <p>
                  <span style="text-decoration: underline"
                    >Admin/Member Transactions.</span
                  >
                  This section describes the terms which apply to Admin/Member
                  Transactions:
                </p>
                <ul>
                  <li>
                    The
                    <a
                      href="/legal?t=transaction"
                      target="_blank"
                      rel="noreferrer"
                      >Transaction Terms between Admins and Members</a
                    >
                    governs and sets out the terms applicable to transactions
                    between Members and Admins (“Admin/Member Transaction(s)”).
                  </li>
                  <li>
                    Third-party payment provider terms and conditions, which
                    include Stripe's
                    <a
                      href="https://stripe.com/legal/ssa/"
                      target="_blank"
                      rel="noreferrer"
                      >US Services Agreement</a
                    >
                    and
                    <a
                      href="https://stripe.com/legal/connect-account"
                      target="_blank"
                      rel="noreferrer"
                      >Connected Account Agreement,</a
                    >
                    and may be modified by the third-party from time to time.
                  </li>
                  <li>
                    All Admin/Member Transactions are contracts between Members
                    and Admins, subject to the Transaction Terms between Admins
                    and Members and any additional terms agreed upon between
                    Admins and Members. Although we facilitate Admin/Member
                    Transactions by providing the Learnify platform and storing
                    Admin content, we are not a party to the Transaction Terms
                    between Admins and Members or any other contract which may
                    exist between a Member and Admin, and we are not responsible
                    for any Admin/Member Transaction.
                  </li>
                  <li>
                    When you receive confirmation from Learnify, either in your
                    Admin account or by email, that the Admin/Member Transaction
                    has been confirmed, you must perform your part of such
                    Admin/Member Transaction (e.g., by allowing the Member to
                    access your community).
                  </li>
                </ul>
                <p>
                  <span style="text-decoration: underline"
                    >Payouts to Admins.</span
                  >
                </p>
                <ul>
                  <li>
                    All payments to an Admin's community by a Member (“Member
                    Payment(s)”) will be received by a third-party payment
                    provider approved by us.
                  </li>
                  <li>
                    Your Admin account will be updated within a reasonable time
                    with your earnings from your Admin communities (“Admin
                    Earnings”). Your Admin Earnings will become available for
                    withdrawal by you from your Learnify account once such Admin
                    Earnings appear in your Learnify account.
                  </li>
                  <li>
                    To make a withdrawal of your Admin Earnings from your Learnify
                    account, you must have at least the minimum payout amount in
                    your Admin account.
                  </li>
                  <li>
                    The amount that you see in your 'current balance' in your
                    Learnify account is your Creator Earnings at the relevant time.
                    All Creator Earnings are transacted in UZS only. Your bank
                    may charge you currency conversion or transfer fees for
                    access the money.
                  </li>
                  <li>
                    If a Member successfully seeks a refund or chargeback from
                    their credit card provider in respect of a Member Payment
                    made to you, we may investigate and may decide to deduct
                    from your account an amount equal to the Admin Earnings
                    earned by you on the charged-back or refunded amount.
                  </li>
                  <li>
                    Except for payouts involving payment by direct bank
                    transfer, we do not store any data disclosed by you when you
                    register a payout option with a third-party payment
                    provider.
                  </li>
                </ul>
                <p>
                  <span style="text-decoration: underline"
                    >Circumstances in which we may withhold Admin
                    Earnings.</span
                  >
                </p>
                <ul>
                  <li>
                    We may withhold all or any part of the Admin Earnings due to
                    you but not yet paid out:
                  </li>
                  <ul>
                    <li>
                      if we think that you have or may have seriously or
                      repeatedly breached any part of this Agreement;
                    </li>
                    <li>
                      if you attempt or threaten to breach any part of this
                      Agreement in a way which we think has or could have
                      serious consequences for us or another User (including
                      actual or possible loss caused to us or another User); or
                    </li>
                    <li>
                      if we suspect that all or any part of the Admin Earnings
                      result from unlawful or fraudulent activity, either by you
                      or by the Member who made the Member Payment resulting in
                      the Admin Earnings,
                    </li>
                  </ul>
                  <span
                    >for as long as is necessary to investigate the actual,
                    threatened or suspected breach by you or the suspected
                    unlawful activity (as applicable). If following our
                    investigation, we conclude that (i) you have seriously or
                    repeatedly breached any part of the Agreement; (ii) you have
                    attempted or threatened to breach any part of the Agreement
                    in a way which has or could have serious consequences for us
                    or another User (including actual or possible loss caused to
                    us or another User); and/or (iii) the Admin Earnings result
                    from unlawful or fraudulent activity, we may notify you that
                    you have forfeited your Admin Earnings.</span
                  >
                  <li>
                    We may withhold all or any part of the Admin Earnings due to
                    you but not yet paid out if we receive notice that you have
                    secured, encumbered, pledged, assigned or otherwise allowed
                    a lien to be placed on Admin Earnings. We undertake no duty
                    to pay Admin Earnings to third-party lienholders and may
                    withhold payment of Admin Earnings until the lien has been
                    removed.
                  </li>
                  <li>
                    We shall not have any responsibility to you if we withhold
                    or forfeit any of your Admin Earnings where we have a right
                    to do so under this Agreement.
                  </li>
                  <li>
                    If we are withholding all or any part of the Admin Earnings
                    due to you and we determine that part of the Admin Earnings
                    withheld by us is unrelated to breaches by you of the
                    Agreement or suspected unlawful or fraudulent activity, then
                    we may arrange for you to be paid the part of the Admin
                    Earnings which we determine to be unrelated to breaches by
                    you of the Agreement or suspected unlawful or fraudulent
                    activity. However, you agree that if we consider that your
                    breach(es) of the Agreement has or may cause us loss, we may
                    withhold all Admin Earnings due to you but not yet paid and
                    we may set off such amounts against any losses suffered by
                    us.
                  </li>
                </ul>
                <h2>7. User Submissions and Content</h2>
                <p>
                  We may provide you with interactive opportunities through the
                  Services. You represent and warrant that you are the owner of,
                  or otherwise have the right to provide, all User Content that
                  you submit, post and/or otherwise transmit through the
                  Services. You hereby grant us a perpetual, irrevocable,
                  transferable, fully paid, royalty-free, non-exclusive,
                  worldwide, fully sublicensable right and license to use, copy,
                  display, publish, modify, remove, publicly perform, translate,
                  create derivative works, distribute and/or otherwise use the
                  User Content in connection with our business and in all forms
                  now known or hereafter invented, without notification to
                  and/or approval by you, except as otherwise required bylaw.
                </p>
                <p>
                  <span style="text-decoration: underline">Feedback.</span>You
                  agree that any submission of any ideas, suggestions, and/or
                  proposals to us through our suggestion, feedback, or similar
                  pages (“Feedback”) is at your own risk and that we have no
                  obligations (including without limitation, obligations of
                  confidentiality) with respect to such Feedback. You represent
                  and warrant that you have all rights necessary to submit the
                  Feedback and you hereby grant to us a perpetual, irrevocable,
                  transferable, fully paid, royalty-free, non-exclusive,
                  worldwide, fully sublicensable right and license to use, copy,
                  display, publish, modify, remove, publicly perform, translate,
                  create derivative works, distribute and/or otherwise use such
                  Feedback, except as otherwise required by law.
                </p>
                <h2>
                  8. Good Samaritan Content Policy &amp; Complaint Procedures.
                </h2>
                <ul style="list-style-type: lower-alpha">
                  <li>
                    <span style="text-decoration: underline">Policy.</span> It
                    is the policy of the owners and operators of these Services
                    to not tolerate any acts of intellectual property
                    infringement or violations of U.S. law or to allow for any
                    child pornography or obscene or defamatory material to be
                    posted at these Services. We will do our best, in good
                    faith, to purge or otherwise restrict the availability of
                    material that is infringing, racist, sexist, obscene,
                    harassing, or otherwise objectionable. The provisions of
                    this Section 8 are intended to implement this policy but are
                    not intended to impose a contractual obligation on the
                    owners or operators of these Services to undertake, or
                    refrain from undertaking, any particular course of conduct.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Complaint Procedures.</span
                    >
                    If you believe that someone has posted material at these
                    Services which infringes the intellectual property or other
                    rights of third parties or which is in violation of U.S. law
                    or which is racist, sexist, obscene, harassing, defamatory,
                    or otherwise objectionable, or which constitutes child
                    pornography, we ask you to flag the post to our attention,
                    or promptly notify us by email at the following address:<a
                      href="mailto:help@learnify.com"
                    >
                      help@learnify.com. </a
                    >You must use this address if you want to ensure that your
                    complaint is actually received by the appropriate person
                    charged with responding to such communications.
                  </li>
                  <li>
                    In order to respond as quickly as possible to any complaint,
                    please provide us with as much detail as possible, including
                    <ul style="list-style-type: lower-roman">
                      <li>
                        the nature of the right infringed or violated (including
                        the registration numbers of any registered copyrights,
                        trademarks or patents allegedly infringed);
                      </li>
                      <li>
                        all facts which lead you to believe that a right has
                        been violated or infringed; the precise location where
                        the offending material is located;
                      </li>
                      <li>
                        any grounds to believe that the person who posted the
                        material was not authorized to do so or did not have a
                        valid defense (including the defense of fair use); and
                      </li>
                      <li>
                        if known, the identity of the person or persons who
                        posted the infringing or offending material
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Indemnification/Waiver of Certain Rights.</span
                    >
                    By lodging a complaint, you agree that the substance of your
                    complaint shall be deemed to constitute a representation
                    made under penalty of perjury under the laws of the State of
                    California. In addition, you agree, at your own expense, to
                    defend us and indemnify us against any liability which we
                    may incur by our response to your complaint.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Waiver of Claims and Remedies.</span
                    >
                    We expect visitors to take responsibility for their own
                    actions, and, asset forth below in sections 14 and 15,
                    cannot assume liability for any acts of users or third
                    parties which take place at these Services. By this
                    Agreement, you acknowledge that in establishing a complaint
                    procedure we are taking on the role of a Good Samaritan and,
                    in order to allow us to do our best, in good faith, to purge
                    or otherwise restrict the availability of material that is
                    infringing, racist, sexist, obscene, harassing, or otherwise
                    objectionable, you agree to waive any claims or remedies
                    which you might otherwise be able to make against us under
                    any theory of law (including, but not limited to,
                    intellectual property laws) arising out of or relating in
                    any way to the content at these Services or our response, or
                    failure to respond, to a complaint.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Investigation/Right to Purge Postings.</span
                    >
                    You agree that we have the right (but not the obligation) to
                    investigate any complaint received and, at any time and for
                    any reason, to remove any material which you post to these
                    Services, with or without your permission, and with or
                    without cause, in our sole discretion. By reserving this
                    right, we do not undertake any responsibility in fact to
                    remove content posted online, whether or not a complaint has
                    been received.
                  </li>
                </ul>
                <h2>9. Intellectual Property Ownership</h2>
                <p>
                  We (and our licensors, where applicable) shall own all right,
                  title and interest, including all related intellectual
                  property rights, in and to the Services. This Agreement is not
                  a sale and does not convey to you any rights of ownership in
                  or related to the Services, or any intellectual property
                  rights owned by us. Our name, logo, and the product names
                  associated with the Services are our trademarks or belong to
                  third parties, and no right or license is granted to use them.
                  You agree that you will not remove, alter or obscure any
                  copyright, trademark, service mark or other proprietary rights
                  notices incorporated in or accompanying the Services.
                </p>
                <h2>10. Copyright Policy</h2>
                <p>
                  We will terminate the account and access rights of any repeat
                  infringer.If you are a copyright owner or the legal agent of a
                  copyright owner, and you believe that any User Content
                  infringes on your copyrights, you may submit a notification
                  pursuant to the Learnify Digital Millennium CopyrightAct (DMCA)
                  Notice. Please see our
                  <a href="#dmca" target="_blank" rel="noreferrer"
                    >DMCA Policy</a
                  >
                  for more information.
                </p>
                <h2>11. Privacy</h2>
                <p>
                  We have adopted a Privacy Policy outlining our personal data
                  collection and use practices. Please refer to it for details
                  about how we collect and use your personal information. By
                  agreeing to the terms of this Agreement, you are automatically
                  agreeing to our
                  <a href="/legal?t=privacy" target="_blank" rel="noreferrer"
                    >Privacy Policy</a
                  >, which is incorporated herein by reference.
                </p>
                <h2>12. Third-Party Interactions</h2>
                <p>
                  The Services may contain links to or display content
                  originating from third-party websites and advertisements
                  (collectively, “Third-Party Websites &amp; Advertisements”).
                  Such Third-Party Websites &amp; Advertisements are not under
                  our control. We are not responsible for any Third-Party
                  Websites or any Third-Party Advertisements. We do not review,
                  approve, monitor, endorse, warrant, or make any
                  representations with respect to such Third-Party Websites
                  &amp; Advertisements, or their products or services. When you
                  click on a link to a Third-Party Website or Advertisement, we
                  will not warn you that you have left our Services and will not
                  warn you that you are subject to the terms and conditions
                  (including privacy policies) of another website or
                  destination. You use all links in Third-Party Websites &amp;
                  Advertisements at your own risk. You should review applicable
                  terms and policies, including privacy and data gathering
                  practices of any Third-Party Websites, and make whatever
                  investigation you feel necessary or appropriate before
                  proceeding with any transaction with any third party.
                </p>
                <h2>13. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Learnify and its
                  officers, directors, employees, agents and affiliates (each,
                  an “Indemnified Party”), from and against any losses, claims,
                  actions, costs, damages, penalties, fines and expenses,
                  including without limitation attorneys’ fees and expenses,
                  that may be incurred by an Indemnified Party arising out of,
                  relating to or resulting from (a) your User Content; (b) your
                  misuse of the Services; (c) your violation of this Agreement;
                  or (d) your violation of any applicable laws, rules or
                  regulations through or related to the use of the Services. In
                  the event of any claim, allegation, suit or proceeding
                  alleging any matter potentially covered by the agreements in
                  this section, you agree to pay for the defense of the
                  Indemnified Party, including reasonable costs and attorneys’
                  fees incurred by the Indemnified Party. We reserve the right,
                  at our own cost, to assume the exclusive defense and control
                  of any matter otherwise subject to indemnification by you, in
                  which event you will fully cooperate with us in asserting any
                  available defenses. This provision does not require you to
                  indemnify any Indemnified Party for any unconscionable
                  commercial practice by such party, or for such party’s
                  negligence, fraud, deception, false promise, misrepresentation
                  or concealment, suppression or omission of any material fact
                  in connection with the Services. You agree that the provisions
                  in this section will survive any termination of your account,
                  this Agreement, or your access to the Services.
                </p>
                <h2>14. Disclaimer of Warranties</h2>
                <p>
                  YOU EXPRESSLY UNDERSTAND AND AGREE THAT TO THE FULLEST EXTENT
                  OF LAW, YOUR USE OF THE SERVICES IS ENTIRELY AT YOUR OWN RISK.
                  CHANGES ARE PERIODICALLY MADE TO THE SERVICES AND MAY BE MADE
                  AT ANY TIME WITHOUT NOTICE TO YOU.THE SERVICES ARE PROVIDED ON
                  AN “AS IS” BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER
                  EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES
                  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                  NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS
                  ABOUT THE ACCURACY, RELIABILITY, COMPLETENESS OR TIMELINESS OF
                  THE CONTENT MADE AVAILABLE THROUGH THE SERVICES, OR THE TEXT,
                  GRAPHICS OR LINKS.
                </p>
                <p>
                  WE DO NOT WARRANT THAT THE SERVICES WILL OPERATE ERROR-FREE OR
                  THAT THE SERVICES ARE FREE OF COMPUTER VIRUSES AND OTHER
                  HARMFUL MALWARE. IF YOUR USE OF THE SERVICES RESULTS IN THE
                  NEED FOR SERVICING OR REPLACING EQUIPMENT OR DATA, WE SHALL
                  NOT BE RESPONSIBLE FOR THOSE ECONOMIC COSTS.
                </p>
                <h2>15. Limitation of Liability</h2>
                <p>
                  UNDER NO CIRCUMSTANCES AND UNDER NO LEGAL THEORY (WHETHER IN
                  CONTRACT,TORT, OR OTHERWISE) SHALL Learnify BE LIABLE TO YOU OR
                  ANY THIRD PARTY FOR(A) ANY INDIRECT, INCIDENTAL, SPECIAL,
                  EXEMPLARY, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING LOST
                  PROFITS, LOST SALES OR BUSINESS, LOST DATA OR DATA BREACH, OR
                  (B) FOR ANY DIRECT DAMAGES, COSTS, LOSSES OR LIABILITIES
                  (INCLUDING ATTORNEYS’ FEES) IN EXCESS OF THE FEES ACTUALLY
                  PAID BY YOU IN THE TWO (2) MONTHS PRECEDING THE EVENT GIVING
                  RISE TO YOUR CLAIM OR, IF NO FEES APPLY, ONE HUNDRED ($100)
                  U.S. DOLLARS. THE PROVISIONS OF THIS SECTION ALLOCATE THE
                  RISKS UNDER THIS AGREEMENT BETWEEN THE PARTIES, AND THE
                  PARTIES HAVE RELIED ON THESE LIMITATIONS IN DETERMINING
                  WHETHER TO ENTER INTO THIS AGREEMENT. Some states do not allow
                  the exclusion of implied warranties or limitation of liability
                  for incidental or consequential damages, which means that some
                  of the above limitations may not apply to you. IN THESE
                  STATES, OUR LIABILITY WILL BE LIMITED TO THE GREATEST EXTENT
                  PERMITTED BY LAW.
                </p>
                <p>
                  WE MAKE NO REPRESENTATIONS OR WARRANTIES WITH RESPECT TO THE
                  SERVICES, ORANY OTHER ITEMS OR SERVICES PROVIDED BY US,
                  INCLUDING, WITHOUT LIMITATION,ANY IMPLIED WARRANTY ARISING BY
                  USAGE OF TRADE, COURSE OF DEALING OR COURSE OF PERFORMANCE,
                  ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A
                  PARTICULAR PURPOSE AND ANY IMPLIED WARRANTY OF
                  NON-INFRINGEMENT. YOU ACKNOWLEDGE THAT THE SERVICES (INCLUDING
                  ANY SERVERS OR OTHER HARDWARE, SOFTWARE AND ANY OTHER ITEMS
                  USED OR PROVIDED BY US IN CONNECTION WITH THE SERVICES) ARE
                  PROVIDED "AS IS" AND THAT WE MAKE NO WARRANTY THAT THE
                  SERVICES WILL BE FREE FROM BUGS, FAULTS, DEFECTS OR ERRORS OR
                  THAT ACCESS TO THE SERVICES WILL BE UNINTERRUPTED.
                </p>
                <h2>16. Dispute Resolution</h2>
                <p>
                  PLEASE READ THE FOLLOWING SECTION CAREFULLY. IT REQUIRES YOU
                  TO ARBITRATE DISPUTES WITH US AND LIMITS THE MANNER IN WHICH
                  YOU CAN SEEK RELIEF. THIS SECTION 16 OF THIS AGREEMENT SHALL
                  BE REFERRED TO AS THE “ARBITRATION AGREEMENT.”
                </p>
                <ul style="list-style-type: lower-alpha">
                  <li>
                    <span style="text-decoration: underline"
                      >Scope of Arbitration Agreement.</span
                    >You agree that any dispute or claim relating in any way to
                    your accessor use of the Services or as a consumer of our
                    services, to any advertising or marketing communications
                    regarding us or our Services, to any products or services
                    sold or distributed through the Services that you received
                    as a consumer, or to any aspect of your relationship or
                    transactions with us as a consumer of our services will be
                    resolved by binding arbitration, rather than in court,
                    except that (1) you may assert claims in small claims court
                    if your claims qualify, so long as the matter remains in
                    such court and advances only on an individual (non-class,
                    non-representative) basis; and (2) you or Learnify may seek
                    equitable relief in court for infringement or other misuse
                    of intellectual property rights (such as trademarks, trade
                    dress, domain names, trade secrets, copyrights, and
                    patents). This Arbitration Agreement shall apply, without
                    limitation, to all claims that arose or were asserted before
                    the Effective Date of this Agreement. IF YOU AGREE TO
                    ARBITRATION WITH Learnify, YOU ARE AGREEING IN ADVANCE THAT YOU
                    WILL NOT PARTICIPATE IN OR SEEK TO RECOVER MONETARY OR OTHER
                    RELIEF IN ANY SUCH CLASS, COLLECTIVE, AND/OR REPRESENTATIVE
                    LAWSUIT. INSTEAD, BY AGREEING TO ARBITRATION, YOU MAY BRING
                    YOUR CLAIMS AGAINST US IN AN INDIVIDUAL ARBITRATION
                    PROCEEDING. IF SUCCESSFUL ON SUCH CLAIMS, YOU COULD BE
                    AWARDED MONEY OR OTHER RELIEF BY AN ARBITRATOR.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Informal Resolution.</span
                    >
                    You and Learnify agree that good-faith informal efforts to
                    resolve disputes often can result in a prompt, low-cost and
                    mutually beneficial outcome.You and Learnify therefore agree
                    that, before either you or Learnify demands arbitration against
                    the other, we will personally meet and confer, via telephone
                    or video conference, in a good-faith effort to resolve
                    informally any claim covered by this mutual Arbitration
                    Agreement. If you are represented by counsel, your counsel
                    may participate in the conference, but you shall also fully
                    participate in the conference. The party initiating the
                    claim must give notice to the other party in writing of its,
                    his, or her intent to initiate an informal dispute
                    resolution conference, which shall occur within 60 days
                    after the other party receives such notice, unless an
                    extension is mutually agreed upon by the parties. To notify
                    Learnify that you intend to initiate an informal dispute
                    resolution conference, email help@learnify.com, providing your
                    username associated with your Learnify account (if any), the
                    email address associated with your Learnify account (if any),
                    and a description of your claim. In the interval between the
                    party receiving such notice and the informal dispute
                    resolution conference, the parties shall be free to attempt
                    to resolve the initiating party’s claims. Engaging in an
                    informal dispute resolution conference is a requirement that
                    must be fulfilled before commencing arbitration. The statute
                    of limitations and any filing fee deadlines shall be tolled
                    while the parties engage in the informal dispute resolution
                    process required by this paragraph.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Arbitration Rules and Forum.</span
                    >This Arbitration Agreement is governed by the Federal
                    Arbitration Act in all respects. To begin an arbitration
                    proceeding, you must send a letter requesting arbitration
                    and describing your claim to our registered agent, COGENCY
                    GLOBAL, INC. 850 New Burton Rd, Suite 201. Dover, DE19904.
                    The arbitration will be conducted by JAMS under its rules
                    and pursuant to the terms of this Agreement. Disputes
                    involving claims and counterclaims under $250,000, not
                    inclusive of attorneys’ fees and interest, shall be subject
                    to JAMS’s most current version of the Streamlined
                    Arbitration Rules and procedures available at
                    <a
                      href="http://www.jamsadr.com/rules-streamlined-arbitration/"
                      >http://www.jamsadr.com/rules-streamlined-arbitration/</a
                    >; all other claims shall be subject to JAMS’s most current
                    version of the Comprehensive Arbitration Rules and
                    Procedures, available at
                    <a
                      href="http://www.jamsadr.com/rules-comprehensive-arbitration/"
                      >http://www.jamsadr.com/rules-comprehensive-arbitration/</a
                    >. JAMS’s rules are also available at
                    <a href="http://jamsadr.com">www.jamsadr.com</a> (under the
                    Rules/Clauses tab) or by calling JAMS at 800-352-5267.
                    Payment of all filing, administration, and arbitration fees
                    will be governed by JAMS’s rules. If the arbitrator finds
                    that you cannot afford to pay JAMS’s filing, administrative,
                    hearing and/or other fees and cannot obtain a waiver of fees
                    from JAMS, we will pay them for you. In addition, we will
                    reimburse all such JAMS’s filing, administrative, hearing
                    and/or other fees for claims with an amount in controversy
                    totaling less than $10,000. If JAMS is not available to
                    arbitrate, the parties will select an alternative arbitral
                    forum. You may choose to have the arbitration conducted by
                    telephone, video conference, based on written submissions,
                    or in person in the county where you live or at another
                    mutually agreed location.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Arbitrator Powers.</span
                    >The arbitrator, and not any federal, state, or local court
                    or agency, shall have exclusive authority to resolve any
                    dispute relating to the interpretation, applicability,
                    enforceability or formation of this Arbitration Agreement
                    including, but not limited to any claim that all or any part
                    of this Arbitration Agreement is void or voidable. The
                    arbitration will decide the rights and liabilities, if any,
                    of you and Learnify. The arbitration proceeding will not be
                    consolidated with any other matters or joined with any other
                    proceedings or parties. The arbitrator will have the
                    authority to grant motions dispositive of all or part of any
                    claim or dispute. The arbitrator will have the authority to
                    award monetary damages and to grant any non-monetary remedy
                    or relief available to an individual under applicable law,
                    the arbitral forum’s rules, and this Agreement (including
                    this Arbitration Agreement). The arbitrator will issue a
                    written statement of decision describing the essential
                    findings and conclusions on which any award (or decision not
                    to render an award) is based, including the calculation of
                    any damages awarded. The arbitrator shall follow the
                    applicable law. The arbitrator has the same authority to
                    award relief on an individual basis that a judge in a court
                    of law would have. The arbitrator’s decision is final and
                    binding on you and Learnify.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Waiver of Jury Trial.</span
                    >YOU AND Learnify WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS
                    TO SUE IN COURT AND RECEIVE A JUDGE OR JURY TRIAL. You and
                    Learnify are instead electing to have claims and disputes
                    resolved by arbitration, except as specified in Section
                    16(a) above. There is no judge or jury in arbitration, and
                    court review of an arbitration award is limited.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Waiver of Class or Consolidated Actions.</span
                    >YOU AND Learnify AGREE TO WAIVE ANY RIGHT TO RESOLVE CLAIMS
                    WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT ON A CLASS,
                    COLLECTIVE, OR REPRESENTATIVE BASIS. ALL CLAIMS AND DISPUTES
                    WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT MUST BE
                    ARBITRATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS BASIS.
                    CLAIMS OF MORE THAN ONE CUSTOMER OR USER CANNOT BE
                    ARBITRATED OR LITIGATED JOINTLY OR CONSOLIDATED WITH THOSE
                    OF ANY OTHER CUSTOMER OR USER. If, however, this waiver of
                    class or consolidated actions is deemed invalid or
                    unenforceable with respect to a particular claim or dispute,
                    neither you nor Learnify is entitled to arbitration of such
                    claim or dispute. Instead, all such claims and disputes will
                    then be resolved in a court as set forth in Section 17.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Batch Arbitrations.</span
                    >To increase efficiency of resolution, in the event 100 or
                    more similar arbitration demands against Learnify, presented by
                    or with the assistance of the same law firm or organization,
                    are submitted to an arbitration provider selected in
                    accordance with the rules described above within a 30-day
                    period, the arbitration provider shall (i) group the
                    arbitration demands into batches of no more than 100 demands
                    per batch (plus, to the extent there are less than 100
                    arbitration demands left over after the batching described
                    above, a final batch consisting of the remaining demands);
                    and (ii) provide for resolution of each batch as a single
                    arbitration with one set of filing and administrative fees
                    and one arbitrator assigned per batch. You agree to
                    cooperate in good faith with Learnify and the arbitration
                    provider to implement such a batch approach to resolution
                    and fees.
                  </li>
                  <li>
                    <span style="text-decoration: underline">Opt Out.</span> You
                    may opt out of this Arbitration Agreement. If you do so,
                    neither you nor Learnify can force the other to arbitrate as a
                    result of this Agreement. To opt out, you must notify Learnify
                    in writing no later than 30 days after first becoming
                    subject to this Arbitration Agreement. Your notice must
                    include your name and address, your email address (if you
                    have one), anda CLEAR statement that you want to opt out of
                    this Arbitration Agreement. You must send your opt-out
                    notice to:
                    <a href="mailto:help@learnify.com"> help@learnify.com </a>. If you
                    opt out of this Arbitration Agreement, all other parts of
                    this Agreement will continue to apply to you. Opting out of
                    this Arbitration Agreement has no effect on any other
                    arbitration agreements that you may have entered into with
                    us or may enter into in the future with us.
                  </li>
                  <li>
                    <span style="text-decoration: underline">Survival.</span>
                    This Arbitration Agreement will survive any termination of
                    your relationship with us.
                  </li>
                  <li>
                    <span style="text-decoration: underline">Modification.</span
                    >Not withstanding any provision in the Agreement to the
                    contrary, we agree that if we make any future material
                    change to this Arbitration Agreement, it will not apply to
                    any individual claim(s) that you had already provided notice
                    of to us.
                  </li>
                </ul>
                <h2>17. Exclusive Venue</h2>
                <p>
                  To the extent the parties are permitted under this Agreement
                  to initiate litigation in a court, both you and Learnify agree
                  that all claims and disputes arising out of or relating to the
                  Agreement will be litigated exclusively within the State of
                  Delaware for courts situated in Kent County, Delaware, or in
                  federal court for the District of Delaware.
                </p>
                <h2>18. Termination</h2>
                <p>
                  At our sole discretion, WE MAY MODIFY OR DISCONTINUE THE
                  SERVICES, OR MAY MODIFY, SUSPEND OR TERMINATE YOUR ACCESS TO
                  THE SERVICES, FOR ANY REASON, WITH OR WITHOUT NOTICE TO YOU
                  AND WITHOUT LIABILITY TO YOU OR ANY THIRD PARTY. In addition
                  to suspending or terminating your access to the Services, we
                  reserve the right to take appropriate legal action, including
                  without limitation pursuing civil, criminal or injunctive
                  redress. Even after your right to use the Services is
                  terminated, this Agreement will remain enforceable against
                  you. All provisions which by their nature should survive to
                  give effect to those provisions shall survive the termination
                  of this Agreement.
                </p>
                <h2>19. General</h2>
                <ul style="list-style-type: lower-alpha">
                  <li>
                    <span style="text-decoration: underline"
                      >No Joint Venture or Partnership.</span
                    >
                    No joint venture, partnership, employment, or agency
                    relationship exists between you, Learnify or any third-party
                    provider as a result of this Agreement or use of the
                    Services.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Choice of Law.</span
                    >
                    This Agreement is governed by the laws of the State of
                    Delaware consistent with the Federal Arbitration Act,
                    without giving effect to any principles that provide for the
                    application of the law of any other jurisdiction.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Severability.</span
                    >
                    Except as otherwise provided herein, if any provision of
                    this Agreement is found to be invalid, the invalidity of
                    such provision shall not affect the validity of the
                    remaining provisions of this Agreement, which shall remain
                    in full force and effect.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Electronic Communications.</span
                    >
                    For contractual purposes, you (1) consent to receive
                    communications from us in an electronic form; and (2) agree
                    that all terms and conditions, agreements, notices,
                    disclosures, and other communications that we provide to you
                    electronically satisfy any legal requirement that such
                    communications would satisfy if they were in writing. This
                    subparagraph does not affect your statutory rights.
                  </li>
                  <li>
                    <span style="text-decoration: underline"
                      >Entire Agreement.</span
                    >
                    This Agreement is the final, complete and exclusive
                    agreement of the parties with respect to the subject matter
                    hereof and supersedes and merges all prior discussions
                    between the parties with respect to such subject matter.
                  </li>
                </ul>
                <h2>20. Contact Information</h2>
                <p>111 Main St. El Segundo, CA 90245</p>
                <p><a href="mailto:help@learnify.com"> help@learnify.com </a></p>
                <section id="dmca" style="scroll-margin-top: 64px">
                  <h1>Learnify DMCA POLICY</h1>
                  <p>
                    We respect the copyright and other intellectual property
                    rights of others and expect users of our website and
                    application (collectively, the "Services") to do the same.
                    In accordance with the United States Digital Millennium
                    Copyright Act (the "DMCA") and other applicable law, we have
                    a policy of terminating, in appropriate circumstances and at
                    our sole discretion, users of the Service who are deemed to
                    be repeat infringers. We also may, in our sole discretion,
                    limit access to the Service and terminate the accounts of
                    any users of the Service who infringe any intellectual
                    property rights of others, whether or not there is any
                    repeat infringement. See our <a href="#">Terms</a> for more
                    information.
                  </p>
                  <h2>Notification of Alleged Copyright Infringement</h2>
                  <p>
                    If you believe that content available on or through our
                    Services infringes one or more of your copyrights, please
                    immediately notify our Copyright Agent by mail, email or
                    faxed notice (“Notification”) providing the information
                    described below, which Notification is pursuant to DMCA 17
                    U.S.C. § 512(c)(3). A copy of your Notification will be sent
                    to the person who posted or stored the material addressed in
                    the Notification. Please be advised that pursuant to federal
                    law you may be held liable for damages if you make material
                    misrepresentations in a Notification. Thus, if you are not
                    sure that content located on or linked to by our Website
                    infringes your copyright, you should consider first
                    contacting an attorney.
                  </p>
                  <h2>All Notifications should include the following:</h2>
                  <ul>
                    <li>
                      A physical or electronic signature of a person authorized
                      to act on behalf of the owner of an exclusive right that
                      is allegedly infringed.
                    </li>
                    <li>
                      Identification of the copyrighted work claimed to have
                      been infringed, or, if multiple copyrighted works at a
                      single online website are covered by a single
                      notification, a representative list of such works at that
                      website.
                    </li>
                    <li>
                      Identification of the material that is claimed to be
                      infringing or to be the subject of infringing activity and
                      that is to be removed or access to which is to be
                      disabled, and information reasonably sufficient to permit
                      us to locate the material (e.g. the URL link of the
                      material).
                    </li>
                    <li>
                      Information reasonably sufficient to permit us to contact
                      the complaining party, such as the name, account name,
                      address, telephone number, and e-mail address at which the
                      complaining party may be contacted.
                    </li>
                    <li>
                      A statement that the complaining party has a good faith
                      belief that use of the material in the manner complained
                      of is not authorized by the copyright owner, its agent, or
                      the law.
                    </li>
                    <li>
                      A statement that the information in the notification is
                      accurate, and under penalty of perjury, that the
                      complaining party is authorized to act on behalf of the
                      owner of an exclusive right that is allegedly infringed.
                    </li>
                  </ul>
                  <p>
                    Submit your notice to our designated DMCA agent by mail or
                    email as set forth below:
                  </p>
                  <p><a href="mailto:help@learnify.com"> help@learnify.com</a></p>
                  <p>
                    Please note that you may be liable for damages, including
                    court costs and attorney's fees, if you materially
                    misrepresent that content on the Services is copyright
                    infringing.
                  </p>
                  <p>
                    Upon receiving a proper notification of alleged copyright
                    infringement, we will remove or disable access to the
                    allegedly infringing material and promptly notify the
                    alleged infringer of your claim. We also will advise the
                    alleged infringer of the DMCA statutory counter-notification
                    procedure described below by which the alleged infringer may
                    respond to your claim and request that we restore this
                    material.
                  </p>
                  <p>
                    Please note that our furnishing your claim to the alleged
                    infringer will include the personal information you provide
                    in your notification, which the alleged infringer may use to
                    contact you directly. As such, by submitting a notification
                    of alleged copyright infringement, you consent to disclosure
                    of your information in the aforementioned manner.
                  </p>
                  <h2>Counter Notification</h2>
                  <p>
                    If you believe your copyrighted material has been removed
                    from the Services as a result of a mistake or
                    misidentification, you may submit a written
                    counter-notification letter to us. To be an effective
                    counter-notification under the DMCA, your letter must
                    include substantially the following:
                  </p>
                  <ul>
                    <li>
                      Identification of the material that has been removed or
                      disabled and the location at which the material appeared
                      before it was removed or disabled.
                    </li>
                    <li>
                      A statement that you consent to the jurisdiction of the
                      Federal District Court in which your address is located,
                      or if your address is outside the United States, for any
                      judicial district in which our Company is located.
                    </li>
                    <li>
                      A statement that you will accept service of process from
                      the party that filed the Notification or the party's
                      agent.
                    </li>
                    <li>Your name, address and telephone number.</li>
                    <li>
                      A statement under penalty of perjury that you have a good
                      faith belief that the material in question was removed or
                      disabled as a result of mistake or misidentification of
                      the material to be removed or disabled.
                    </li>
                    <li>Your physical or electronic signature.</li>
                    <li>
                      You may submit your Counter Notification to our Copyright
                      Agent by mail, or email as set forth above.
                    </li>
                  </ul>
                  <p>
                    If you send us a valid, written Counter Notification meeting
                    the requirements described above, we will restore your
                    removed or disabled material after 10 business days but no
                    later than 14 business days from the date we receive your
                    Counter Notification, unless our Copyright Agent first
                    receives notice from the party filing the original
                    Notification informing us that such party has filed a court
                    action to restrain you from engaging in infringing activity
                    related to the material in question. Please note that if you
                    materially misrepresent that the disabled or removed content
                    was removed by mistake or misidentification, you may be
                    liable for damages, including costs and attorney's fees.
                    Filing a false Counter Notification constitutes perjury.
                  </p>
                </section>
              </div>
            </div>
          </section>
          <section
            class="h-[calc(100vh_-140px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full"
          >
            <div
              class="styled__CardWrapper-sc-jrheml-0 hesuCC styled__TabContentWrapper-sc-19crpt3-0 BWXAE"
            >
              <div class="styled__LegalContentWrapper-sc-dw1jdk-1 iyTwjP">
                <h1>Learnify.COM, INC COOKIE POLICY</h1>
                <p>
                  To make this site work properly, we sometimes place small data
                  files called cookies on your device. A cookie is a small text
                  file that a website saves on your computer or mobile device
                  when you visit the site. It enables the website to remember
                  your actions and preferences (such as login, language, or
                  other preferences) over a period of time, so you do not have
                  to keep re-entering them whenever you come back to the site or
                  browse from one page to another.
                </p>
                <h2>Cookies on www.learnify.com</h2>
                <p>
                  The following table sets out the different categories of
                  cookies that our site uses, and why we use them. The lists of
                  third-party cookie providers are intended merely as
                  illustrative and should not be viewed as a comprehensive list.
                </p>
                <table>
                  <tr>
                    <th style="background: rgb(228, 228, 228)">
                      Type of Cookie
                    </th>
                    <th style="background: rgb(228, 228, 228)">Purpose</th>
                    <th style="background: rgb(228, 228, 228)">Who serves</th>
                  </tr>
                  <tr style="border: 1px solid rgb(228, 228, 228)">
                    <td>Strictly Necessary</td>
                    <td>
                      These cookies are essential to enable your use of the site
                      or services, and are used to help make our website work
                      efficiently and provide services you have asked for.
                    </td>
                    <td>
                      <ul>
                        <li><a href="https://learnify.com">Learnify.com</a></li>
                        <li>
                          <a href="https://aws.amazon.com/legal/cookies/"
                            >Amazon Web Services</a
                          >
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Functionality</td>
                    <td>
                      These cookies help to enhance your experience by
                      remembering choices you have made concerning the features
                      of the website. For example, they allow you to view videos
                      on our site and services and remember your video viewing
                      preferences.
                    </td>
                    <td>
                      <ul>
                        <li>
                          <a href="https://vimeo.com/cookie_policy">Vimeo</a>
                        </li>
                        <li>
                          <a
                            href="https://policies.google.com/technologies/cookies?hl=en"
                            >YouTube (Google)</a
                          >
                        </li>
                        <li>
                          <a href="https://www.loom.com/privacy-policy">Loom</a>
                        </li>
                        <li>
                          <a
                            href="https://wistia.com/privacy#b-information-collected-automatically"
                            >Wistia</a
                          >
                        </li>
                      </ul>
                    </td>
                  </tr>
                </table>
                <h2>Cookies and You</h2>
                <p>
                  To sign up for an account, you must have cookies enabled on
                  your internet browser. If you choose not to enable cookies,
                  you will still be able to browse our website, but it may
                  restrict some of the functionality of our website or what you
                  can do.
                </p>
                <h2>Controlling your cookies</h2>
                <p>
                  You can control cookies in your browser to enable or disable
                  them. If you wish to restrict or block the cookies which are
                  set by any website, you should do this through the web browser
                  settings for each web browser you use, on each device you use
                  to access the internet.
                </p>
                <p>
                  You can also manage many companies’ cookies used for online
                  advertising via the consumer choice tools created under
                  self-regulation programs in many countries, such as the
                  US-based
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noreferrer"
                    >aboutads.info</a
                  >
                  choices page or the EU-based
                  <a
                    href="https://www.youronlinechoices.com/uk/your-ad-choices"
                    target="_blank"
                    rel="noreferrer"
                    >Your Online Choices.</a
                  >
                </p>
              </div>
            </div>
          </section>
          <section
            class="h-[calc(100vh_-140px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full"
          >
            <div
              class="styled__CardWrapper-sc-jrheml-0 hesuCC styled__TabContentWrapper-sc-19crpt3-0 BWXAE"
            >
              <div class="styled__LegalContentWrapper-sc-dw1jdk-1 iyTwjP">
                <h1>Learnify Transaction Terms</h1>
                <p>
                  <strong>1.</strong> <strong>Introduction: </strong>These
                  Transaction Terms between Admins and Members ("<strong
                    >Transaction Terms</strong
                  >") set out the terms which govern each transaction between an
                  Admin and a Member (as defined below) on Learnify.
                </p>
                <p>
                  <strong>2. Applicability of Transaction Terms: </strong>Each
                  time an Admin/Member Transaction (as defined below) is
                  initiated on Learnify, these Transaction Terms will apply to the
                  exclusion of any other terms which the Admin or Member may
                  propose to each other, and these Transaction Terms will
                  legally bind the Admin and Member participating in the
                  Admin/Member Transaction. All terms set forth in Learnify's
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.learnify.com/legal?t=privacy"
                    >Privacy Policy</a
                  >
                  and
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.learnify.com/legal?t=terms"
                    >Terms and Conditions</a
                  >
                  are hereby incorporated by reference with the same force and
                  effect as though fully set forth herein. To the extent there
                  is any inconsistency between the terms within those documents
                  and these Transactions Terms, the Transaction Terms shall
                  prevail solely in relation to the Admin/Member Transaction.
                </p>
                <p>
                  <strong>3. Parties: </strong>The only parties to these
                  Transaction Terms are the Admin and Member participating in
                  the Admin/Member Transaction. Neither Learnify.Com, Inc., nor any
                  of its subsidiaries or affiliates grant any rights in respect
                  of, nor participate in, any Admin/Member Transaction, except
                  that Learnify.Com, Inc., or any of its subsidiaries or affiliates
                  may act as a payment intermediary in accordance with the
                  Admin's or Member's instructions set out in Section 5 of these
                  Transaction Terms.
                </p>
                <p>
                  <strong>4. Interpretation: </strong>In these Transaction
                  Terms, defined terms have the following meanings:
                </p>
                <p>
                  <strong>a. "Learnify" </strong>means the website, applications,
                  and subdomains;
                </p>
                <p>
                  <strong>b. "Content" </strong>means any material uploaded to
                  Learnify by any User (as defined in Learnify's
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.learnify.com/legal?t=terms"
                    >Terms and Conditions</a
                  >, whether an Admin or a Member, including any photos, videos,
                  audio (e.g., music and other sounds), livestream material,
                  data, text (such as comments and hashtags), metadata, images,
                  interactive features, emojis, GIFs, memes, and other material
                  whatsoever;
                </p>
                <p>
                  <strong>c. "Admin" </strong>means a User who has set up their
                  Learnify account as a creator account to post Content on Learnify to
                  be viewed by other Users;
                </p>
                <p>
                  <strong>d. "Member"</strong> means a User who subscribes to an
                  Admin to view the Admin's restricted Content;
                </p>
                <p>
                  <strong>e. "Admin/Member Transaction"</strong> means any
                  transaction between an Admin and a Member on Learnify by which
                  access is granted to the Admin's Content, including a
                  Subscription;
                </p>
                <p>
                  <strong>f. "Member Payment"</strong> means (i) any and all
                  payments made by a Member in respect of any Admin/Member
                  Transaction; and
                </p>
                <p>
                  <strong>g. "Subscription"</strong> means a Member's
                  subscription to an Admin's community.
                </p>
                <p>
                  <strong
                    >5. Automatic Renewal Subscription and Payment
                    Terms:</strong
                  >
                </p>
                <p>
                  <strong>a. </strong>By entering into an Admin/Member
                  Transaction, the Member agrees to pay the Member Payment
                  applicable to the relevant Admin/Member Transaction in
                  accordance with the pricing published on the communities'
                  respective about page. The Member and the Admin participating
                  in the Admin/Member Transaction authorize Learnify.Com, Inc., or
                  any of its subsidiaries or affiliates to act as a payment
                  intermediary and to collect, hold, and process the Member
                  Payment, and to pay out the sums due to Admins.
                </p>
                <p>
                  <strong>b. </strong>Admins are solely responsible for
                  determining (within the parameters for pricing on Learnify) the
                  pricing applicable to the Admin/Member Transaction and the
                  Content to which a Member may be given access.
                </p>
                <p><strong>c.</strong> All prices appear in UZS only.</p>
                <p>
                  <strong>d.</strong> To be able to enter an Admin/Member
                  Transaction with a particular Admin, Members must have added a
                  payment card to their account and then click the "Subscribe"
                  button on the relevant Admin's community.
                </p>
                <p>
                  <strong>e.</strong> By entering into these Transaction Terms,
                  the Member authorizes Learnify.Com, Inc., and any of its
                  subsidiaries or affiliates to supply the Member's payment card
                  details to a third-party payment provider, including Stripe,
                  Inc., for the purpose of processing the Member Payment. These
                  third-party payment providers are subject to separate terms
                  and conditions, which may be modified by such third parties
                  from time to time. Members agree and undertake to be bound by
                  these third-party terms and conditions, which include Stripe's
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://stripe.com/legal/ssa"
                    >US Services Agreement</a
                  >
                  and
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://stripe.com/legal/connect-account"
                    >Connected Account Agreement</a
                  >
                  . All Member Payments will be charged in UZS. The Member's
                  payment card provider may charge the Member currency
                  conversion fees. Learnify.Com, Inc., has no control over currency
                  exchange rates or charges imposed by the Member's payment card
                  provider or ban, and Learnify.Com, Inc., and its subsidiary or
                  affiliate companies will not be responsible for paying any
                  charges or fees imposed by the Member's payment card provider
                  or bank.
                </p>
                <p>
                  <strong>f. </strong>If a Member provides details of two or
                  more payment cards, then if the Member tries to make a Member
                  Payment from the first card and the card is rejected for any
                  reason, then the other payment card will be used to collect
                  the full Member Payment.
                </p>
                <p>
                  <strong>g. </strong>The payment provider will take (i)
                  periodic payments from the Member's payment card for Member
                  Payments which are Subscriptions; and (ii) immediate payments
                  from Member's payment card for Member Payments other than
                  Subscriptions. Members authorize and consent to each of these
                  payments being debited using the Member's supplied payment
                  card details.
                </p>
                <p>
                  <strong>h.</strong> Apart from free-trial Subscriptions, all
                  Subscriptions to an Admin will automatically renew at the end
                  of the relevant subscription period, except if the Member's
                  payment card is declined, the subscription price for the
                  Subscription has increased, or the Member has canceled the
                  subscription.
                </p>
                <p>
                  <strong>i. <u>Cancellation. </u></strong>Either Learnify or Admin
                  may cancel a Member's Subscription at any time for any reason
                  (unless otherwise stated in an applicable promotional offer).
                  In the event of cancellation by Learnify or by Admin, all fees
                  due to Admin up to the end of the then-current term renewal
                  period at the time of cancellation shall remain payable to
                  Admin. No refunds will be provided for partial billing
                  periods, unless otherwise specifically stated in an applicable
                  promotional offer. Upon cancellation, Member will retain
                  access to Content through the end of the renewal period.
                </p>
                <p>
                  Members may cancel their subscription by any of the methods
                  below:
                </p>
                <p>
                  • By clicking "cancel subscription" in the memberships tab of
                  your user settings;
                </p>
                <p>
                  • Contacting the Admin of the community via chat or support
                  email; or
                </p>
                <p>
                  • Contacting us at
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="mailto:help@learnify.com"
                    >help@learnify.com</a
                  ><u>.</u>
                </p>
                <p>
                  SUBSCRIPTION PAYMENTS AUTOMATICALLY RENEW FOR INDEFINITE
                  SUCCESSIVE RENEWAL TERMS FOR THE SAME PERIOD AS THE INITIAL
                  TERM, UNTIL CANCELED BY THE MEMBER OR Learnify. IF A MEMBER WANTS
                  TO STOP SUBSCRIBING TO AN ADMIN'S COMMUNITY AND THEREFORE STOP
                  PAYING CONTINUING MONTHLY SUBSCRIPTION CHARGES, THE MEMBER
                  MUST CANCEL THEIR SUBSCRIPTION BY CLICKING "CANCEL
                  SUBSCRIPTION" IN THE MEMBERSHIP TAB OF THE MEMBER'S SETTINGS,
                  CONTACTING THE ADMIN OF THE COMMUNITY TO WHICH THE MEMBER IS
                  SUBSCRIBED, OR CONTACTING US AT
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="mailto:help@learnify.com"
                    >help@learnify.com</a
                  >
                  For free-trial Subscriptions, unless the Member cancels their
                  Subscription for the Admin's community before the free trial
                  ends, the Member will be charged for the first time after the
                  specified free trial period ends and the Member will start an
                  automatically renewing paid Subscription of the type
                  associated with the particular free trial.
                </p>
                <p>
                  <strong>j. </strong>If a Member cancels a Subscription, the
                  Member will continue to be permitted to view the relevant
                  Admin's Content until the end of the subscription period in
                  which the Member canceled, after which no further payments
                  will be taken from the Member's payment card in respect of
                  Subscriptions to that Admin's community (unless the Member
                  chooses to pay for a new Subscription to that Admin's
                  community), and the Member will no longer be able to view the
                  relevant Admin's Content.
                </p>
                <p>
                  <strong>j. </strong>The Member agrees that the Member will not
                  make unjustified requests for a refund in respect of any
                  Admin/Member Transaction, or unjustified chargeback requests
                  of the Member's payment card provider in relation to any
                  Admin/Member Transaction.
                </p>
                <p>
                  <strong>6. License of Content: </strong>Once the Member has
                  made the Member Payment for an Admin/Member Transaction, the
                  Admin grants to the Member a revocable, limited license to
                  access the applicable Content of that Admin to which the
                  Admin/Creator Transaction relates (the "<strong
                    >Relevant Content</strong
                  >"). This license is non-transferable, non-sublicensable, and
                  non-exclusive, and permits the Member to access and view the
                  Relevant Content for the Member's private, personal,
                  non-promotional, non-commercial use, on the Member's personal
                  device and via a normal web browser (and to make a temporary
                  copy of such Content only to the extent that this is an
                  incidental and technical process forming part of the Member's
                  accessing the Content (i.e., caching)), in accordance with
                  Learnify's
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.google.com/url?q=https://www.learnify.com/legal?t%3Dterms&amp;sa=D&amp;source=docs&amp;ust=1689124927144460&amp;usg=AOvVaw21gWJdw7RFIjRBGYzUyrvr"
                    >Acceptable Use Policy</a
                  >.
                </p>
                <p>
                  <strong>7. Ownership of Content: </strong>The Member
                  participating in the Admin/Member Transaction acknowledges and
                  agrees that the license of the Relevant Content provided in
                  Section 6 of these Transaction Terms does not result in the
                  Member acquiring any rights in or to the Relevant Content,
                  which rights shall be retained by the Admin of the Relevant
                  Content.
                </p>
                <p>
                  <strong>8. Expiry of License: </strong>The license granted to
                  a Member in relation to the Relevant Content will expire
                  automatically without notice in the following circumstances:
                </p>
                <p>
                  <strong>a. </strong>if the Member Payment related to the
                  Admin/Member Transaction was unsuccessful, or is charged back
                  or reversed for any reason;
                </p>
                <p>
                  <strong>b. </strong>in respect of Subscriptions, at the end of
                  the subscription period, unless the Subscription is configured
                  to automatically renew;
                </p>
                <p>
                  <strong>c. </strong>if the Member's User account is suspended
                  or terminated for any reason;
                </p>
                <p>
                  <strong>d.</strong> if the Member acts in breach of Learnify's
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.learnify.com/legal?t=terms"
                    >Acceptable Use Policy</a
                  >
                  (whether in relation to the Relevant Content or at all);
                </p>
                <p>
                  <strong>e. </strong>if the Content is removed from the Admin's
                  community; and
                </p>
                <p>
                  <strong>f.</strong> if the Member closes their Learnify User
                  account.
                </p>
                <p>
                  <strong>9. Cancellation and Refunds: </strong>Learnify's policy
                  is to not provide refunds. Learnify lets Creators offer refunds
                  to Members at their discretion. If you want a refund, you need
                  to contact the Creator you purchased from directly, their
                  support email should be on your receipt. Learnify reserves the
                  right to issue refunds, at its discretion, depending on
                  circumstances. In most cases, Learnify will not refund on behalf
                  of Creators.
                </p>
                <p>
                  <strong>10. Obligations between Admin and Member: </strong>In
                  respect of every Admin/Member Transaction:
                </p>
                <p>
                  <strong>a. </strong>the Admin and the Member participating in
                  the Admin/Member Transaction agree to comply at all times with
                  the Learnify
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.learnify.com/legal?t=terms"
                    >Acceptable Use Policy</a
                  >
                  in relation to the Relevant Content, including when accessing,
                  viewing, and interacting with it;
                </p>
                <p>
                  <strong>b. </strong>the Member participating in the
                  Admin/Member Transaction agrees to make the Member Payment
                  required to access, view, or interact with the Relevant
                  Content, and agrees not to initiate a chargeback other than if
                  the Member disputes the Admin/Member Transaction in good
                  faith;
                </p>
                <p>
                  <strong>c. </strong>the Admin participating in the
                  Admin/Member Transaction agrees to make the Relevant Content
                  available to the Member once the Member has made the Member
                  Payment applicable to the Relevant Content;
                </p>
                <p>
                  <strong>d.</strong>the Admin warrants that it possesses all
                  necessary rights in and to the Relevant Content sufficient to
                  license it to the Member in the territory in which the Admin
                  will be uploading the Relevant Content, and has obtained any
                  and all permission and consents needed to grant the license in
                  Section 6 of these Transaction Terms;
                </p>
                <p>
                  <strong>e.</strong>the Admin is solely responsible for
                  creating and uploading the Relevant Content, and the Admin
                  provides no guarantees that it will continue to create and
                  upload Relevant Content on an ongoing basis; and
                </p>
                <p>
                  <strong>f.</strong>unless there has been negligence or other
                  breach of duty by the Admin, the accessing by the Member of
                  the Admin's Content is entirely at the Member's own risk.
                </p>
                <p>
                  <strong>11. No Guarantees:</strong>The Member participating in
                  the Admin/Member Transaction acknowledges that Admins may add
                  and remove Content at any time from their Admin community, and
                  that Admins have the discretion to decide what sort of Content
                  to make available on their community. In addition, the Member
                  participating in the Admin/Member Transaction acknowledges
                  that there may be circumstances where it is not possible for
                  the Member to access the Relevant Content to be provided under
                  the Admin/Member Transaction, including:
                </p>
                <p>
                  <strong>a. </strong>if the Admin's account is suspended or
                  deleted;
                </p>
                <p>
                  <strong>b. </strong>if the Member's account is suspended or
                  deleted;
                </p>
                <p>
                  <strong>c. </strong>if the availability of all or any part of
                  the Learnify site is suspended or inaccessible; or
                </p>
                <p>
                  <strong>d.</strong>if the Admin is unable to create or upload
                  Relevant Content in the future.
                </p>
                <p>
                  <strong>12. Terms Relating to Disputes:</strong>If there is a
                  dispute between an Admin and a Member relating to an
                  Admin/Member Transaction or these Transaction Terms, the Admin
                  and Member agree that Learnify.Com, Inc., is under no obligation
                  to become involved and that we will not be held liable for any
                  such dispute. We are not liable for the relationship between
                  the Admin and the Member, and we will not provide legal advice
                  regarding such matters.
                </p>
              </div>
            </div>
          </section>
          <section
            class="h-[calc(100vh_-140px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 p-5 w-full"
          >
            <div class="styled__CardWrapper-sc-jrheml-0 hesuCC styled__TabContentWrapper-sc-19crpt3-0 BWXAE"><div class="styled__LegalContentWrapper-sc-dw1jdk-1 iyTwjP"><h1>Acceptable use policy</h1><p>We do not allow any activity or content that promotes or encourages discrimination based on race, sex, religion, nationality, disability, sexual orientation, or age. To provide specific examples (though by no means an exhaustive list), you cannot: <ul><li>Threaten any specific individual</li><li>Incite violence against a specific person, place, or group</li><li>Share private information about a citizen without their permission</li></ul></p><h2>Prohibited businesses (for Learnify payments)</h2><p>The following products and activities are not allowed to be monetized using Learnify's payments system. This is almost always because they violate U.S. federal law, they are prohibited by card network rules, or they are restricted by our payment processing partners. If you are unsure whether your content is prohibited on Learnify, please contact us at<a href="mailto:help@learnify.com"> help@learnify.com </a>with a description or example of the content.<ol><li>Unlicensed proprietary content</li><li>Food products and ingredients (including consumer packaged goods, livestock, plants, and seeds)</li><li>Airlines</li><li>Bail bonds</li><li>Bankruptcy lawyers</li><li>Bidding fee or penny auctions</li><li>Age or legally restricted products or services</li><li> Sexually-oriented or pornographic content (including but not limited to adult books or video, adult telephone conversations or audio, membership to adult websites or content, companion or escort services, dating services, mail-order brides, massage parlors and prostitution, or content of any format that features characters who are minors, are depicted as minors, or are suggested to be minors in any sexual or sensual context)</li><li>Cell phones/pagers</li><li>Centralized reservation services</li><li>Collection agencies</li><li>Chain letters</li><li>Check cashing</li><li>Counterfeit goods/replicas</li><li>Currency exchange (including physical, digital or cryptographic currency exchange)</li><li>Consulting firms</li><li>Services (including, but not limited to, "get rich quick" schemes, business opportunities, investment opportunities, mortgage consulting, real estate purchases, mortgage reduction services and credit repair and protection)</li><li>Billing services (including, but not limited to, accepting payment for services rendered and billing for services to be performed in the future)</li><li>Credit card and identity theft protection</li><li>Cruise lines</li><li>Flea markets</li><li>Drug paraphernalia</li><li>Essay mills/paper mills</li><li>Extended warranties</li><li>Fortune tellers</li><li> Gambling (including legal gambling where the cardholder is not present when the bet is made, lotteries, illegal gambling, internet gambling, sports forecasting and odds making)</li><li>Illegal products or services</li><li>Marijuana dispensaries and related businesses</li><li>Money transmission</li><li>Money service businesses</li><li>Multi-level marketing or pyramid schemes</li><li>Wire transfers or money orders</li><li>Pharmacies or internet pharmacies</li><li> Pseudo pharmaceuticals (including anti-aging pills, sexual stimulants, weight loss pills, diet pills)</li><li>Quasi-cash or stores of value</li><li>Security brokerage</li><li>Door-to-door sales</li><li> Offering substantial rebates or special incentives that are awarded to the cardholder subsequent to the original purchase</li><li>Negative response marketing techniques</li><li>Deceptive marketing practices</li><li>Reselling private label rights products</li><li>Shipping/forwarding brokers</li><li>Substances designed to mimic illegal drugs</li><li>Telemarketing</li><li>Timeshares</li><li>Tobacco products</li><li>Weapons or ammunition</li><li>Jewelry or beauty products</li></ol></p><p>This list is maintained separately from Learnify's <a target="_blank" rel="noreferrer" href="https://www.learnify.com/legal?t=terms">Terms and conditions</a> Learnify makes every effort to keep this list as current as possible. However, because of the unpredictable nature of card network rules, legislation and payment processor relationships, this list may change abruptly and without notice. Changes to this list take effect immediately.</p></div></div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { legal_tabs } from "@/composables";

const router = useRouter();
const store = reactive({
  is_open: false,
  is_open_name: "",
  slideStep: 0,
  activeCollapse: "",
});

onBeforeMount(() => {
    store.slideStep = 0;
    const legal = router.currentRoute.value.query.t;
    for (let i of legal_tabs) {
    if (legal == i[1]) {
        store.is_open_name = legal;
        store.is_open = true;
        break;
    }
    store.slideStep += 1;
}
})

function openData(index, name) {
  router.push(`?t=${name[1]}`)
  store.slideStep = index;
  store.is_open_name = name[1];
  store.is_open = true;
}

watch(
  () => store.slideStep,
  () => {
    try {
      const slide = document.querySelector(".mainSlider");
      slide.style.transform = `translateY(-${store.slideStep * 100}%)`;
    } catch (error) {}
  }
);
</script>

<style lang="scss" scoped>
h1 {
  font-size: 28px;
  font-weight: 600;
}

h2 {
  font-size: 20px;
  font-weight: 600;
}

h3 {
  font-size: 18px;
  font-weight: 600;
}

.mainSlider {
  ul {
    list-style-type: disc !important;
    margin-left: 24px;
  }

  ol {
    list-style-type: decimal !important;
    margin-left: 32px;
  }

  ul,
  ol {
    & > * + * {
      margin-top: 4px;
    }
  }

  * > * + * {
    margin-top: 1rem; /* 16px */
  }
}
</style>
