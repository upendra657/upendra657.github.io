/* =========================================================
   CONTENT — this is the only file you edit to update the site.
   Everything on the page is rendered from the object below.

   Populated from your résumé. One item is still marked // CHECK —
   the Premier League Predictor year, which the résumé did not give.
   Everything else is taken directly from the PDF.
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
      'Data Engineer',
      'Python Developer'
    ],
    summary:
      'Computer science graduate working on enterprise data migration at ' +
      'Deloitte — validating and loading large datasets, and writing Python ' +
      'and SQL checks that keep source and target in agreement. I build ' +
      'machine-learning pipelines and web applications on the side.',
    // No résumé is published — the hero download button removes itself when
    // this is empty. Set it to a path or link if you ever want it back.
    resumeUrl: '',
    // Background removed and compressed to 60KB WebP so it sits cleanly on
    // both the light and dark backgrounds. Original kept as a .bak alongside.
    portrait: 'assets/img/portrait.webp'
  },

  /* ---- Quick facts, top-right of the hero ----------------------------- */
  facts: [
    { label: 'Based in',  value: 'Bengaluru, India' },
    { label: 'Focus',     value: 'Data engineering & backend' },
    { label: 'Education', value: 'B.E. Computer Science, MIT Manipal' }
  ],

  /* ---- Social links, under the hero ----------------------------------- */
  links: [
    { label: 'GitHub',   url: 'https://github.com/upendra657' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/upendra-sharma-21783a1a9/' },
    { label: 'Email',    url: 'mailto:sharmaupendra657@gmail.com' }
  ],

  /* ---- 01 About ------------------------------------------------------- */
  about: {
    // Each string becomes a paragraph. Inline HTML is allowed here.
    paragraphs: [
      'I graduated from <strong>Manipal Institute of Technology</strong> in 2025 ' +
      'with a degree in Computer Science and a minor specialization in Big Data. ' +
      'That minor is what pulled me toward data work, and it is where I have ' +
      'spent most of my time since.',

      'At <strong>Deloitte India</strong> I work on enterprise data migration — ' +
      'moving large datasets into target systems through SAP\'s Data Migration ' +
      'Cockpit, then writing <strong>Python and SQL</strong> reconciliation checks ' +
      'to prove that what arrived matches what left. Migration work is unforgiving ' +
      'about correctness, which suits how I like to build things.',

      'Before that I interned in Kampala, Uganda, where I built an HR management ' +
      'system end to end. Outside of work I train models on football data and ' +
      'keep looking for excuses to write more Python.'
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
      group: 'Languages',
      items: ['Python', 'C', 'C++', 'JavaScript', 'SQL', 'HTML/CSS']
    },
    {
      group: 'Databases',
      items: ['MySQL', 'MongoDB', 'SQLite3']
    },
    {
      group: 'Frameworks',
      items: ['Flask', 'Scikit-Learn', 'XGBoost', 'Hadoop', 'Bootstrap']
    },
    {
      group: 'Libraries',
      items: ['pandas', 'NumPy', 'Matplotlib']
    },
    {
      group: 'Enterprise',
      items: ['SAP Data Migration Cockpit', 'Doc-IT EDRMS']
    },
    {
      group: 'Tools',
      items: ['Git', 'AWS', 'VS Code', 'PyCharm', 'Jupyter', 'Eclipse', 'Visual Studio']
    }
  ],

  /* ---- 03 Experience -------------------------------------------------- */
  experience: [
    {
      period:   'Jul 2025 — Present',
      role:     'Intern',
      company:  'Deloitte India',
      location: 'Bengaluru, Karnataka',
      points: [
        'Support enterprise data migration by validating and loading large ' +
        'datasets into target systems using SAP Data Migration Cockpit (DMC), ' +
        'ensuring data completeness and consistency across testing phases.',

        'Apply Python and SQL-based validation checks to reconcile source and ' +
        'target data, identify discrepancies, and support reliable migration ' +
        'outcomes in a client-facing project environment.'
      ],
      stack: ['SAP DMC', 'Python', 'SQL', 'Data Migration']
    },
    {
      period:   'Jun — Jul 2024',
      role:     'Intern',
      company:  'MFI Document Solutions Ltd.',
      location: 'Kampala, Uganda',
      points: [
        'Gained exposure to Doc-IT (EDRMS) and implemented an HR management ' +
        'system to automate HR workflows.',

        'Collaborated with cross-functional teams to design user interfaces ' +
        'and back-end systems.'
      ],
      stack: ['Python', 'Flask', 'SQLite3', 'Doc-IT EDRMS']
    }
  ],

  /* ---- 04 Selected work ----------------------------------------------- */
  projects: [
    {
      name: 'Premier League Predictor',
      year: '2025',                                        // CHECK
      description:
        'A machine-learning pipeline that predicts Premier League match ' +
        'outcomes from over 1,500 historical fixtures. Feature extraction, ' +
        'label encoding and model tuning across Logistic Regression, Random ' +
        'Forest and XGBoost classifiers — reaching over 70% accuracy on ' +
        'multi-class outcome targets.',
      stack: ['Python', 'pandas', 'Scikit-Learn', 'XGBoost', 'Matplotlib'],
      links: [
        { label: 'Source', url: 'https://github.com/upendra657/Premier-League-Predictor' }
      ]
    },
    {
      name: 'HR Management System',
      year: '2024',
      description:
        'A web-based HRMS automating employee data management, attendance ' +
        'tracking and leave requests. Role-based authentication and session ' +
        'management keep admin and employee data separated; Flask routes were ' +
        'modularized and database queries optimized for maintainability.',
      stack: ['Python', 'Flask', 'JavaScript', 'Bootstrap', 'SQLite3'],
      links: [
        { label: 'Source', url: 'https://github.com/upendra657/HR-Management-System' }
      ]
    }
  ],

  /* ---- 05 Education & certifications ---------------------------------- */
  education: [
    {
      degree: 'B.E. Computer Science — Minor in Big Data',
      school: 'Manipal Institute of Technology, Manipal, Karnataka',
      meta:   'Aug 2021 — 2025'
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
      'I am open to software and data engineering roles, and happy to talk ' +
      'about anything involving Python, data pipelines or machine learning. ' +
      'Email reaches me fastest.',
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
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/upendra-sharma-21783a1a9/' }
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
