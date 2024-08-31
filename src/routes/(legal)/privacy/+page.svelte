<!-- routes/privacy/+page.svelte -->

<script>
  import EmailForm from '$lib/components/EmailForm.svelte';
  const lastUpdated = 'Jun 3, 2024';
</script>

<!-- ---------------------------------------------- -->

<main class="container mx-auto px-6 sm:px-8 md:px-20 lg:px-44 py-12 space-y-6">
  
	<h1 class="text-5xl md:text-7xl">Privacy Policy</h1>

  <p class="inline-block text-sm bg-gray-500 rounded-xl bg-opacity-20 py-1 px-3">
    Last updated: {lastUpdated}
  </p>

  <div class="privacy-text space-y-6 w-richtext">
    <p>
      We love you, fellow human, and believe that your destiny &amp; data belong to you. So here’s a
      full disclosure of how we, you know, treat that pretty data of yours. If you’re a non-human
      web crawler, scraper or similar reading this, we also love you but don’t have the same
      obligation towards your privacy. <a
        href="https://web.archive.org/web/20220118223338/https://en.wikipedia.org/wiki/Algorithmic_entities"
        target="_blank">Not yet</a
      >, at least.
    </p>
    <p>But first, a quick look at who’s who:</p>
    <p>
      “<strong>We</strong>” “<strong>our</strong>” “<strong>(the) company</strong>” means Pipewriter
      OÜ, a pretty awesome limited liability company registered at Sepapaja 6, Tallinn 15551,
      Estonia, reg. no. 14904870. (Note: you have no legal obligation to consider the company
      awesome).
    </p>
    <p>
      The “<strong>Site</strong>” or “<strong>Website</strong>” means pipewriter.io, while “<strong
        >Product</strong
      >” refers to the Google Docs template (free and paid) and the custom Google Apps Script (paid
      only). “<strong>Service(s)</strong>” refers to copywriting, UX writing and other creative
      services for hire provided by Pipewriter founders, employees and contractors.
    </p>
    <p>Yes, we kind of do it all.</p>
    <p>
      The TL;DR (<em>too long; didn’t read</em>, i.e. the gist) of this Privacy Policy would be the
      following: Pipewriter sells a UX writing product (the Product) and gets hired to deliver
      creative services. For both to function smooth as silk, you need to give us some of your data,
      which we treat with utmost respect and using some of the world’s most secure providers (like
      Stripe). When you just visit our website, we also collect some data by tracking what you’re
      doing on it. Nothing out of the norm. We do not sell user data, that’d be pretty terrible.
    </p>
    <p>
      This Privacy Policy (herein the “<strong>Policy</strong>”) applies to the Site, Product and
      Service, and it administers the ways we collect, process and store data. The Policy has a
      direct reference to the Terms of Service and applies to it.
    </p>
    <p>&zwj;</p>
    <h2>1. User, Customer and Site Visitor Data</h2>
    <h3>1.1. Personal data you provide</h3>
    <p>
      Pipewriter may collect, process and store the following data: your name, email, bank card
      details, and billing address. This may happen when you:
    </p>
    <ul role="list">
      <li>buy, subscribe to or get the free version of the Product</li>
      <li>make an online payment</li>
      <li>participate in a survey</li>
      <li>email us or in any other way submit your Personal Information to us</li>
      <li>contract Services</li>
      <li>apply to work as a writer or contractor for Pipewriter</li>
    </ul>
    <p>
      When you get the paid Product, which includes a Google Apps Script, you authorize Google to
      share your data with us. You do NOT provide us with access to documents you create with the
      Product. You will know when we gather your data through Google's pop-up form which suggests to
      use the Google Account in order to activate the Product, and informs you about the information
      Google will share with us once you activate it.
    </p>
    <p>
      We will keep a record of your Subscription Plan, purchases, any marketing-, sales- and
      support-related communication and replies, and general Product usage &nbsp;statistics in order
      to provide you with the high level Product quality and support services. Basically, when you
      buy from us we get your data, easy peasy.
    </p>
    <p>&zwj;</p>
    <h3>1.2. Data we collect automatically</h3>
    <p>
      Pipewriter may collect information through the Site, Product and Google Workspace Marketplace.
    </p>
    <p>
      Data we gather from your device: its type, IP address, the browser you are using, OS
      (operating system), as well as the referral site from which you entered the Site. We may also
      monitor your online behavior, including the time of your visit, your online activity at the
      website including the URL clickstream through the pipewriter.io website, the pages you
      visited, the time you spent viewing them, and the frequency of your visits. We also aggregate
      extra data that refers to the user flow, such as the start and the end of a web session, page
      views, purchase and checkout.
    </p>
    <p>
      The Product may, at some point in the future, become a full-fledged Google Workspace
      Marketplace add-on. In that case, we may collect your data via Google’s tracking services
      specific to their Google Workspace Marketplace listings.
    </p>
    <p>
      We gather this data automatically through common data-gathering technologies, like cookies,
      web beacons and behavioral trackers, in order to understand what visitors do on the Site, the
      Google Workspace Marketplace listing, and use the Product. This data helps us manage the Site
      and the Product, analyze general online behavior and usage trends, and provide targeted
      advertisements. We also collect demographic information about our Product users and Customers,
      as well as Site and Google Workspace Marketplace listing visitor base that helps us tailor
      both the Site’s content and the Product functionality in order to meet your expectations and
      requirements, as well as our marketing communications and analytics.<br />
    </p>
    <h3>1.3. Google Sign-in Authentication (OAuth)</h3>
    <p>
      You install our Product using Google’s Sign-in authentication system (OAuth). When you use
      Google Sign-in authentication, you give us access to your full name and email address. This
      data is stored by us in compliance with the Privacy Policy. The Google Sign-in authentication
      system will also let you know that by installing the Product you will be asked to allow the
      Product to:
    </p>
    <ul role="list">
      <li>
        <strong><em>View and manage your Google Docs documents:</em></strong><em><br />&zwj;</em>The
        Script can read the Google Doc that it is installed on, but not transfer any data that's in
        it outside of the document itself. This does NOT&nbsp;give Pipewriter access to what's
        written in your documents. This permission is required in order to enable the script to
        insert ready-made elements (blurbs, layouts, hero sections, tables etc.)&nbsp;where your
        cursor is.
      </li>
    </ul>
    <ul role="list">
      <li>
        <strong
          ><em
            >Display and run third-party web content in prompts and sidebars inside Google
            applications</em
          >:</strong
        ><br />The script loads a sidebar (codename: "Yuriy's Awesome Sidebar")&nbsp;that lets you
        browse pre-made elements and insert them inside your document with one click. The sidebar
        runs as a (<a
          href="https://web.archive.org/web/20220118223338/https://quasar.dev/"
          target="_blank">SvelteKit</a
        >) loaded via iFrame. The communication is one-way, i.e. Pipewriter NOT&nbsp;view what you're writing inside documents that the script is installed
        on.
      </li>
    </ul>
    <p>
      You should note that each Google Doc that you made with Pipewriter is still subject to
      Google's Privacy Policy and Terms of Service, since, well, Google Docs is their product. You
      can review these documents here <a
        href="https://web.archive.org/web/20220118223338/https://support.google.com/drive/answer/2450387?hl=en"
        target="_blank">https://support.google.com/drive/answer/2450387?hl=en</a
      >
      or by browsing Google's full Privacy Policy here
      <a
        href="https://web.archive.org/web/20220118223338/https://policies.google.com/privacy?hl=en-US"
        target="_blank">https://policies.google.com/privacy?hl=en-US</a
      >
    </p>
    <h2>2. Types of information</h2>
    <h3>2.1. Personal Information</h3>
    <p>
      ‘Personal Information’ would mean any data that you provide of your own free will, such as
      your first and last name, phone number, your email address, company name, billing address, IP
      address, geographical location, as well as any other information that refers to you or your
      workplace/business. We also collect a Customer ID that is assigned to your browser, and User
      ID that is associated with the use of the Product.
    </p>
    <p>
      Personal Information also refers to other information that is available on the internet, such
      as from Facebook, LinkedIn, Twitter and Google, and includes any other publicly available data
      that you previously agreed to share and that is available from public databases and other
      service providers.
    </p>
    <p>
      Finally, when you hire Pipewriter to deliver Services, you will probably share with us
      information about yourself or your business that will help us deliver the best writing and
      creative services. We vow to treat this data and assets with utmost respect, privacy and
      stewardship.
    </p>
    <h4>2.1.1. Categories of Personal Information</h4>
    <p>
      &zwj;<strong>Identifiers</strong>. First and last name, phone number, email address, company
      name, bank card details, billing address, IP address. We also collect User IDs that are
      assigned to your browser and associated with your use of the Product. You provide this data on
      your free will when obtaining and paying for the Product and Services.
      <strong>Purpose of collection</strong>: to fulfil Pipewriter’s obligations as the Product
      &amp; Service provider, and Site owner.
    </p>
    <p>
      &zwj;<strong>Usage of Site, Product and Services</strong>. Information on the User interaction
      with the Site, Product and Google Workspace Marketplace. This data refers to your computer and
      your visits to the Site and the Product such as your browser type, referral source, length of
      visit and pages viewed, as well as geolocation data, limited to country, state and city. It’s
      collected via cookies, web beacons, tracking services and other technologies.
      <strong>Purpose of collection</strong>: To enhance user experience while browsing the Site and
      using the Product for your projects.
    </p>
    <p>
      <strong>Service-related data and information</strong>, which you may voluntarily share with
      us, including data about your customers, business/marketing strategy, product IP (e.g. your
      “secret sauce” and unique selling proposition), and a host of proprietary assets (e.g. code or
      design collateral). <strong>Purpose of collection</strong>: to deliver the best writing and
      creative Services personalized to your product, business or undertaking.
    </p>
    <h3>2.2. Navigational information</h3>
    <p>
      ‘Navigational information’ refers to your use of the Site, browser versions, browser type, IP
      address, referral source, OS (operating system), geographical location, length of visit and
      pages viewed, as well as the general Site usage statistics.
    </p>
    <h4>2.2.1. Cookies Definition and Categories</h4>
    <p>
      Cookies are small files which are received from a web server and are either stored on your web
      browser until its expiry date, or until the end of each session. You may not agree to accept
      cookies and refuse them.
    </p>
    <p>
      Our Product being a Google Docs template, it doesn’t require particular cookies beside those
      required by Google Docs and other Google Drive products. As for our Site, it uses cookies that
      are divided into several categories:
    </p>
    <ul role="list">
      <li>
        <strong>Essential cookies</strong> are necessary to provide you with our Site’s and Product core
        services and functionality;
      </li>
      <li>
        &zwj;<strong>Analytics cookies</strong> help us understand how our Site and Product are being
        used, how good our marketing campaigns perform, and based on the information - customize and
        enhance both the Site and Product for you.
      </li>
      <li>
        <strong>Performance cookies</strong> improve the Site’s and Product performance by leveraging
        non-essential functionality, such as allowing remembering the last position a Site’s visitor
        or a user watched a video before this process was interrupted due to problems with internet connection
        or other reasons.
      </li>
      <li>
        <strong>Uncategorized cookies</strong>, which fall into categories other than these.
      </li>
    </ul>
    <h4>2.2.3. Disabling Cookies</h4>
    <p>
      Website visitors and Product users have the right to opt out from using the cookies on the
      Site and as part of the Product. You can easily reject or accept these cookies in your browser
      settings. You’ll have to search for browser-specific procedures because they may change all
      the time.
    </p>
    <p>
      Opting out from the Essential cookies may result in not being able to access certain
      functionality that is available on our Site and as part of the Product. You can also opt out
      of targeted advertising such as Google Ads, see here or search for the latest info on Google’s
      support pages: <a
        href="https://web.archive.org/web/20220118223338/https://support.google.com/ads/answer/2662922?hl=en"
        >https://support.google.com/ads/answer/2662922?hl=en</a
      >
    </p>
    <h4>2.2.4. Web Beacons</h4>
    <p>
      In addition to cookies, we may use other technologies like web beacons to track user behavior
      on the Site and the Product. In contrast to cookies, web beacons are small pieces of code
      (pixel) embedded into our website.
    </p>
    <p>
      Web beacons provide the data on what pages website users visit and when, allowing to group
      them by shared behavior and advertise to them. Web beacons may also rely on cookies that help
      record such activities, as conversion. That is why disabling cookies may result in incorrect
      web beacon functioning.
    </p>
    <h4>2.3. Product content: templates &amp; sidebar</h4>
    <p>
      Pipewriter is (a) a template with pre-made Google Docs elements, and (b) a Google Apps Script
      written on top of Google Docs that extends its functionality by letting you insert elements
      into your doc.
    </p>
    <p>
      The template and script don't give Pipewriter access to data in your docs. The Script simply
      pulls a list of pre-made tables from a Google Doc in Pipewriter's account and pastes them
      inside your document. It cannot read or send us what's written in the document it's installed
      on.
    </p>
    <h3>2.4. Sensitive Information</h3>
    <p>
      Pipewriter does not intentionally collect, and both Customers and Users should not provide any
      information about your medical or health conditions, race and ethnic origin, political
      opinions, religious and philosophical beliefs, as well as bank account information, tax and
      passport numbers, driver's license or other similar personal identifiers.
    </p>
    <p>
      We do not store your bank card details on any of our internal resources / databases, but
      transfer them instantly to the Payment Card Industry Data Security Standard (PCI-DSS)
      compliant service provider for further processing. When receiving an online payment, we
      collect shipping and billing address(es), your card details: number, cardholder name, card
      number, expiry date, Postal Code and the Card Security Code (CSC) or the Card Verification
      Value (CVV).
    </p>
    <h2>3. Use of information we collect</h2>
    <h3>3.1. Compliance with this Privacy Policy</h3>
    <p>
      Pipewriter uses the data it collects only in compliance and according to this Privacy Policy.
      While this sounds obvious – and it is – it’s definitely worth noting. You’re supposed to read
      this very entertaining document from beginning to end before engaging with our Product,
      Service(s) or Site.
    </p>
    <h3>3.2. We Never Sell Personal Information</h3>
    <p>Pipewriter does not sell Personal Information. You can rest easy.</p>
    <h3>3.3. How We Use the Information We Collect</h3>
    <p>We use the Personal Information we collect from our Product users to:</p>
    <ul role="list">
      <li>
        Enable smooth functioning of our Product, allowing Customers and Users to load data from
        third-party systems (Data Sources) to other systems, Data Destinations (for example, Google
        Sheets)
      </li>
      <li>Enhance the Product's functionality</li>
      <li>Manage Product and Site security and system administration</li>
      <li>
        Create accounts and provide information to a PCI-compliant service provider for payment
        processing
      </li>
      <li>Respond to customer support and other Product- and Service-related requests</li>
      <li>
        Communicate with the Product users, inform them about important product- and company-related
        updates
      </li>
      <li>
        Contact the carefully-selected Product users to inform about other Pipewriter products and
        services that we think may be of interest to them
      </li>
      <li>Distribute other personalized marketing information</li>
      <li>
        Hold surveys, send out questionnaires that help us understand our customer requirements and
        expectations from the Product, support or any other services that we provide
      </li>
      <li>Put together and analyze the statistic data of the Product usage</li>
      <li>
        Conduct an investigation of unauthorized access and use of Product, fraud, breach and other
        illegitimate actions
      </li>
    </ul>
    <h3>3.4. Use of Navigational Information</h3>
    <p>
      We use Navigational Information to operate and improve the Site and the Product. We may also
      use Navigational Information alone or in combination with Personal Information to provide you
      with personalized experience while using the Product or navigating the Site.
    </p>
    <h3>3.5. Use of Bank Card Information</h3>
    <p>
      The bank card details you provide when paying for the Product are neither stored nor processed
      by Pipewriter, but are passed over to &ZeroWidthSpace;Stripe&ZeroWidthSpace; for processing.
      This third party stores data with the highest security standards. You can learn more about
      Stripe’s Privacy Policy right here: <a
        href="https://web.archive.org/web/20220118223338/https://stripe.com/privacy"
        >https://stripe.com/privacy</a
      >
    </p>
    <h3>3.6. Service Providers</h3>
    <p>
      Pipewriter may employ other organizations and persons ("Agents”) to perform tasks or provide
      services to Product and Service users, and may need to share your Personal or Navigational
      Information with them to provide information, Products, and Services to you. In case we do so,
      we shall request for the agent to accept and strictly observe our Privacy Policy.
    </p>
    <h3>3.7. Data Security</h3>
    <p>
      Pipewriter applies different security technologies, guidelines and procedures to ensure
      complete security, as well as full confidentiality of the Personal Information you provide. We
      also take measures to avoid unauthorized access to personal data and electronic communication
      systems.
    </p>
    <p>
      The transfer of bank card details to an authorized third party happens through the use of
      encryption (such as the Secure Socket Layer protocol and the Transport Layer Security) which
      guarantees complete safety and security of your data.
    </p>
    <p>
      For any questions that relate to the security of your Personal Information, please email us at
      hello@pipewriter.io
    </p>
    <h3>3.8. Data Retention</h3>
    <p>
      Pipewriter will retain your Personal Information for the period required to fulfill the
      obligations it took as a Product provider, or unless a longer period of time is required by
      law for tax, legal or other regulatory reasons. Pipewriter will delete all Personal
      Information at the earliest date per your request.
    </p>
    <h3>3.10. Links and Third-Party Sites</h3>
    <p>
      The pipewriter.io Site includes links to third-party websites. These websites may offer
      certain services to end-users. Pipewriter does not take any responsibility for their content,
      services, administrators, practices and policies, and does not endorse them. Pipewriter also
      does not bear any responsibility for the privacy of information that you submit on these
      resources, since this Privacy Policy does not apply to them. We recommend you to familiarize
      with the Privacy Policy and other legal documents before submitting or sharing any personal
      information with them.
    </p>
    <h3>3.11. International Transfer of Information</h3>
    <p>
      To perform our operations, we may transfer and access Personal Information from around the
      world, including the United States, the EU, and other countries. While transferring the data,
      we take the necessary measures to safeguard the activity in general, and the data subjects in
      particular to ensure an appropriate level of protection for their fundamental rights. The
      Privacy Policy shall apply even if Personal Information is transferred or accessed from other
      countries.
    </p>
    <h3>3.13. Compelled Disclosure</h3>
    <p>
      Pipewriter reserves the right to disclose personal data to public authorities in accordance
      with a legal liability to perform their duties, such as customs and tax authorities, financial
      investigation units, judicial administration and other parties. We’re far from diehard fans of
      formal authority, but you gotta do what you gotta do.
    </p>
    <h2>4. Data Subject Rights</h2>
    <h3>4.1 Product User Rights</h3>
    <p>If you are our Product’s User or Customer, you have the following rights:</p>
    <ul role="list">
      <li>
        To request Pipewriter to disclose what Personal Information it collects, uses and discloses
        (to request to know)
      </li>
      <li>To request access to your Personal Information</li>
      <li>
        To remove consent from being contacted by email, phone and other means of communication
      </li>
      <li>
        To request for all Personal Data that was received from you to be deleted from all our
        records<br />To request that we update, correct or remove any omissions in your Personal
        Information that we store
      </li>
      <li>To opt out from all kinds of direct marketing and other communication</li>
      <li>To request us to delete your Personal Information</li>
      <li>
        To object to the processing of your Personal Information, or ask us to restrict the
        processing of your Personal Information, or request portability of your Personal Information
      </li>
      <li>
        To withdraw your consent from collection and processing of your Personal Information at any
        time. Withdrawing your consent will not affect the lawfulness of any processing we conducted
        prior to your withdrawal, nor will it affect the processing of your Personal Information
        conducted in reliance on lawful processing grounds other than consent.
      </li>
    </ul>
    <h3>4.2. How Data Subjects can Exercise their Rights</h3>
    <p>
      In order for Data Subjects to exercise any of the rights listed in the Article 4.1 of this
      Privacy Policy, please email your request at hello@pipewriter.io. After we receive your
      request, our team will verify your request. We will provide a response to your request within
      forty-five (45) days, informing you about the steps we have taken to ensure that your rights
      are exercised.
    </p>
    <h3>4.3. Opting Out from Our Communication</h3>
    <p>
      You may opt-out from our marketing communication by pressing the 'unsubscribe' link located at
      the bottom of our email, or sending your unsubscribe request at hello@pipewriter.io. We’ll be
      sad to see you go, but hey, it’s a free country.
    </p>
    <p>
      You cannot unsubscribe from our transactional emailing (which also includes Welcome,
      Confirmation, Billing/Payment-related emails, invoicing, as well as Product updates), and
      other information which refers to your status as a Customer or User.
    </p>
    <h3>4.4. Children's Information</h3>
    <p>
      Our Product is not intended for children's use. We do not knowingly collect any data from
      children under the age of 16. If you think that we might have gathered some information from
      children under the age of 16, please let us know at hello@pipewriter.io and we will delete
      this data from our databases and other applicable resources if any.
    </p>
    <h2>6. General Clauses</h2>
    <h3>6.1. Changes to the Privacy Policy</h3>
    <p>
      We reserve the right to review and make amendments to this Policy. When the changes are made,
      we will update the Privacy Policy and amend the 'Last modified' date, which is indicated at
      the beginning of this Policy, to the day when the latest amendments were made.
    </p>
    <h3>6.2 Contact us</h3>
    <p>
      For any additional questions or inquiries about the Privacy Policy, please send an email at
      hello@pipewriter.io. Seriously, we’d love to hear from you. Should your question prove too
      hard to answer for our highly trained team of freshly graduated law school interns, we reserve
      the right to ask our high-street corporate lawyers for a formal opinion, which they shall
      promptly send by fax to both our HQ and to our doomsday bunker, which was built to withstand
      nuclear winter and the wrath of GDPR regulation.
    </p>
    <p>👆 That was a joke. We don’t actually hire legal interns.</p>
    <p>&zwj;</p>
  </div>
</main>

<style>
  a {
    @apply text-blue-500;
  }

	h2 {
		@apply text-4xl font-bold;
	}

	h3 {
		@apply text-3xl;
	}

	ul {
    @apply list-disc list-outside pl-5;
  }
  
  ol {
    @apply list-decimal list-outside pl-5;
  }

</style>
