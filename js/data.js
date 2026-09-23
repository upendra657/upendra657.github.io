/* =========================================================
   CONTENT — this is the only file you edit to update the site.
   Everything on the page is rendered from the object below.

   Last synced with the Data Analyst résumé (Sept 2026). One item is
   still marked // CHECK — the Premier League Predictor year, which the
   résumé does not give. Everything else is taken directly from the PDF.
   ========================================================= */

const DATA = {

  /* ---- Header / hero -------------------------------------------------- */
  profile: {
    initials:  'US',
    name:      'Upendra Sharma',
    year:      '2026',
    available: 'Open to opportunities',
    // Rotating job titles for the typewriter effect in the hero.
    roles: [
      'Data Analyst',
      'Business Analyst',
      'Product Analyst'
    ],
    summary:
      'Data Analyst at Deloitte India, with experience across Retail, IT ' +
      'Operations and Manufacturing. I automate workflows and translate ' +
      'business requirements into data-driven solutions, working in SQL, ' +
      'Python and data visualisation alongside cross-functional teams.',
    // No résumé is published. Leave empty and the hero shows the "email for
    // résumé" button below instead; set a path or URL and it becomes a
    // download button automatically.
    resumeUrl: '',

    // Hero secondary button, used whenever resumeUrl is empty. Opens a
    // pre-addressed email with the subject filled in. If you switch on the
    // Formspree form, this points at the form instead so your address stays
    // out of the page. Set to null to show no second button at all.
    resumeCta: {
      label:   'Email for résumé',
      subject: 'Résumé request'
    },
    // Background removed and compressed to 60KB WebP so it sits cleanly on
    // both the light and dark backgrounds. Original kept as a .bak alongside.
    portrait: 'assets/img/portrait.webp'
  },

  /* ---- Quick facts, top-right of the hero ----------------------------- */
  facts: [
    { label: 'Based in',  value: 'Bengaluru, India' },
    { label: 'Focus',     value: 'Data analysis, SQL & Python' },
    { label: 'Education', value: 'B.Tech Computer Science, MIT Manipal' }
  ],

  /* ---- Social links, under the hero ----------------------------------- */
  links: [
    { label: 'GitHub',   url: 'https://github.com/upendra657' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/upendra657/' },
    { label: 'Email',    url: 'mailto:sharmaupendra657@gmail.com' }
  ],

  /* ---- 01 About ------------------------------------------------------- */
  about: {
    // Each string becomes a paragraph. Inline HTML is allowed here.
    paragraphs: [
      'I graduated from <strong>Manipal Institute of Technology</strong> in 2025 ' +
      'with a B.Tech in Computer Science and a minor in Big Data. That minor ' +
      'is what pulled me toward data work, and it is where I have spent my ' +
      'time since.',

      'At <strong>Deloitte India</strong> I am a Data Analyst on the largest ' +
      'South Asian greenfield SAP S/4HANA transformation, and the primary ' +
      'point of contact for cost center migration — more than 15,000 cost ' +
      'centers across five business units. I work with senior stakeholders ' +
      'from implementation to go-live, turning business requirements into ' +
      'data validation rules, and the <strong>Python and SQL</strong> checks ' +
      'I wrote brought validation down to ten minutes per load. That work ' +
      'earned a formal client commendation for error prevention and data ' +
      'governance.',

      'Before that I interned in Kampala, Uganda, building a full-stack HR ' +
      'management system that digitized processes from the company\'s legacy ' +
      'DOC-IT EDRMS. Outside work I build data projects — most recently a ' +
      'Premier League model benchmarked against real-world market odds.'
    ],
    details: [
      { label: 'Location',     value: 'Bengaluru, Karnataka, India' },
      { label: 'Email',        value: 'sharmaupendra657@gmail.com',
        url: 'mailto:sharmaupendra657@gmail.com' },
      { label: 'Availability', value: 'Open to opportunities' }
    ]
  },

  /* ---- 02 Skills ------------------------------------------------------ */
  skills: [
    {
      group: 'Analytics & Querying',
      items: ['SQL', 'Window functions', 'CTEs', 'Subqueries', 'Query optimisation',
              'PostgreSQL', 'Python', 'pandas', 'NumPy', 'Advanced Excel']
    },
    {
      group: 'Data Engineering & Architecture',
      items: ['ETL pipelines', 'Docker', 'GitHub Actions (CI/CD)', 'API integration',
              'FastAPI', 'Flask']
    },
    {
      group: 'Statistical Reasoning',
      items: ['Hypothesis testing', 't-test', 'Mann–Whitney U', 'Chi-square', 'ANOVA',
              'Confidence intervals', 'Effect size', 'Selection bias']
    },
    {
      group: 'Visualisation & Reporting',
      items: ['Power BI', 'Tableau', 'Matplotlib', 'Seaborn']
    },
    {
      group: 'Data Quality & Delivery',
      items: ['Data profiling', 'Validation', 'Reconciliation', 'SAP S/4HANA', 'SAP DMC',
              'Agile', 'Stakeholder management']
    }
  ],

  /* ---- 03 Experience -------------------------------------------------- */
  experience: [
    {
      period:   'Jul 2025 — Present',
      role:     'Data Analyst',
      company:  'Deloitte India',
      location: 'Bengaluru, Karnataka',
      points: [
        'Primary point of contact for cost center migration on the largest ' +
        'South Asian greenfield SAP S/4HANA transformation, delivering 15,000+ ' +
        'cost centers across 5 business units.',

        'Worked cross-functionally with Finance, Materials Management, Sales ' +
        'and Distribution, Planning and client teams to ensure accurate loads ' +
        'of master data and transactional objects — Cost Center, Vendor, ' +
        'Article, Profit Center, Purchase Order, CAPEX and OPEX.',

        'Developed Python scripts and SQL queries to automate validation, ' +
        'saving up to 10 hours/week in manual checks and reducing validation ' +
        'time to 10 minutes per load.',

        'Collaborated with C-suite and senior management stakeholders end to ' +
        'end, from implementation to go-live, to translate business ' +
        'requirements into data validation rules, resolve issues at source ' +
        'and improve data quality across migration loads.',

        'Received formal client commendation for proactive error prevention ' +
        'and data governance.'
      ],
      stack: ['SAP S/4HANA', 'SAP DMC', 'Python', 'SQL', 'Data Validation']
    },
    {
      period:   'Jun — Jul 2024',
      role:     'Intern',
      company:  'MFI Document Solutions Ltd.',
      location: 'Kampala, Uganda',
      points: [
        'Developed a full-stack HR management system to digitize internal ' +
        'processes and automate manual employee workflows, mapping existing ' +
        'operations from the company\'s legacy DOC-IT EDRMS.',

        'Collaborated directly with cross-functional teams to gather business ' +
        'requirements and design user-centric interfaces and back-end systems.'
      ],
      stack: ['Python', 'Flask', 'SQLite3', 'DOC-IT EDRMS']
    }
  ],

  /* ---- 04 Selected work ----------------------------------------------- */
  projects: [
    {
      name: 'HR Management System',
      year: '2026',
      description:
        'HR leave and attendance policies translated into database ' +
        'constraints, so PostgreSQL enforces the rules rather than application ' +
        'code — a production-ready system that eliminates manual ' +
        'administrative errors. Its reconciliation module processes 214K ' +
        'records in under a second, surfacing critical discrepancies between ' +
        'leave and timesheet data so business reporting stays accurate. ' +
        'Rebuilt from a prototype I wrote during my internship in Kampala; ' +
        '278 tests run against PostgreSQL in CI.',
      stack: ['Python', 'Flask', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Docker', 'pytest'],
      links: [
        { label: 'Live demo', url: 'https://hrms-5e8y.onrender.com' },
        { label: 'Source', url: 'https://github.com/upendra657/HR-Management-System' }
      ]
    },
    {
      name: 'Premier League Predictor',
      year: '2025',                                        // CHECK
      description:
        'A predictive model forecasting 9,380 matches, benchmarked against ' +
        'real-world market odds so that success is measured in viable ' +
        'business KPIs rather than raw accuracy. Strict data validation and ' +
        'probability calibration keep the outputs reliable and risk-adjusted, ' +
        'and guard against algorithmic bias.',
      stack: ['Python', 'XGBoost', 'Scikit-learn', 'FastAPI'],
      links: [
        { label: 'Live results', url: 'https://upendra657.github.io/Premier-League-Predictor/' },
        { label: 'Source', url: 'https://github.com/upendra657/Premier-League-Predictor' }
      ]
    }
  ],

  /* ---- 05 Education & certifications ---------------------------------- */
  education: [
    {
      degree: 'B.Tech Computer Science — Minor in Big Data',
      school: 'Manipal Institute of Technology, Manipal, Karnataka',
      meta:   'Aug 2021 — May 2025'
    },
    {
      degree: 'CBSE, Senior Secondary',
      school: 'Indian Language School, Lagos, Nigeria',
      meta:   'Oct 2014 — May 2021'
    }
  ],

  certifications: [
    { name: 'Big Data Specialization', issuer: 'UC San Diego', year: '', url: '' },
    { name: 'Data Science Professional Certificate', issuer: 'IBM', year: '', url: '' }
  ],

  /* ---- 06 Contact ----------------------------------------------------- */
  contact: {
    pitch:
      'I am open to data, business and product analyst roles, especially ' +
      'stakeholder-facing ones, and happy to talk about SQL, data quality or ' +
      'turning business requirements into something measurable. Email ' +
      'reaches me fastest.',
    // Formspree form ID — the part after /f/ in your endpoint URL.
    // Sign up free at https://formspree.io, create a form, paste the ID here.
    //
    // While this is set, the contact form is shown and your email address is
    // NOT written into the page, so scrapers cannot harvest it. Clear it back
    // to '' and the plain email address returns instead.
    formspreeId: '',

    // Only rendered when formspreeId is empty. Kept out of the page entirely
    // once the form is live.
    email: 'sharmaupendra657@gmail.com',

    // Small line shown under the email address or form. Set to '' to hide.
    note: 'Email for résumé.',
    links: [
      { label: 'GitHub',   url: 'https://github.com/upendra657' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/upendra657/' }
    ]
  },

  /* ---- Navigation ----------------------------------------------------- */
  /* `id` must match a section id in index.html. */
  nav: [
    { id: 'about',      label: 'About' },
    { id: 'skills',     label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Work' },
    { id: 'education',  label: 'Education' },
    { id: 'contact',    label: 'Contact' }
  ]
};
