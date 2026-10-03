// All site content lives here. Update this file each epoch — the UI renders from it.

export const site = {
  name: 'Nexus',
  fullName: 'Nexus Research, Space & Technology Club',
  university: 'Manipal University Jaipur',
  epoch: '2026–27',
  coords: '26.8439° N, 75.5652° E',
  station: 'MUJ-303007',
  email: 'nexus@jaipur.manipal.edu',
  address: 'Academic Block 1 · Manipal University Jaipur, RJ 303007',
};

export const pillars = [
  {
    id: 'P-01',
    title: 'Deep Space & Astrophysics',
    kicker: 'Celestial mechanics · Observation',
    body: 'Exploration of celestial mechanics, orbital dynamics, observational astronomy and the aerospace engineering principles behind flight.',
    points: [
      'Celestial mechanics & orbital dynamics',
      'Telescope observation nights',
      'Deep-sky astrophotography archive',
      'Aerospace engineering principles',
    ],
  },
  {
    id: 'P-02',
    title: 'Ground Stations & Telemetry',
    kicker: 'Projects & Research · PNR',
    body: 'Designing atmospheric sensor payloads and building the radio and software chain that brings their data back to the ground.',
    points: [
      'Atmospheric payloads — altitude, pressure, thermal',
      'Software-defined radio (SDR) systems',
      'Satellite telemetry downlinks',
      'Data pipelines & ground software',
    ],
  },
  {
    id: 'P-03',
    title: 'Spatial Web & Creative Computing',
    kicker: 'WebGL · Three.js · Data viz',
    body: 'Developing interactive 3D WebGL and Three.js platforms, data visualisation and creative digital experiences for science.',
    points: [
      'Interactive 3D WebGL & Three.js platforms',
      'Scientific data visualisation',
      'Shaders & real-time simulation',
      'Creative digital experiences',
    ],
  },
];

export const domains = [
  { id: 'DOM-01', tag: 'Visualization', title: 'Cosmic & 3D WebGL', body: 'Interactive 3D interfaces, visual simulations and new ways to represent scientific ideas on the web.', stack: ['Three.js', 'WebGL', 'Shaders'] },
  { id: 'DOM-02', tag: 'Hardware Telemetry', title: 'Telemetry & Ground Stations', body: 'How sensor readings and telemetry are collected, organised and presented in clear, real-time interfaces.', stack: ['WebSockets', 'Real-Time UI', 'Data Streams'] },
  { id: 'DOM-03', tag: 'Academic Repository', title: 'Research Publications Hub', body: 'Research communication, digital archives and accessible ways to share technical writing.', stack: ['Academic MDX', 'LaTeX', 'Archives'] },
  { id: 'DOM-04', tag: 'Digital Infrastructure', title: 'Community & Event Engines', body: 'Useful digital tools for clubs and communities — event information, registrations and member onboarding.', stack: ['TypeScript', 'Cloudflare', 'Distributed'] },
];

export const divisions = [
  {
    code: 'PNR',
    name: 'Projects & Research',
    body: 'Hardware sensor payloads, astrophysics simulations and telemetry. The engineering core of every Nexus mission.',
    filter: 'PNR',
  },
  {
    code: 'WEB',
    name: 'Web Development',
    body: 'WebGL and Three.js interactive web apps, and the platform architecture that powers Nexus online — including this site.',
    filter: 'Web Development',
  },
  {
    code: 'EVT',
    name: 'Events & Logistics',
    body: 'Organising hackathons, symposiums and stargazing sessions — from the first plan to the last telescope packed away.',
    filter: ['Events', 'Operations & Logistics'],
  },
  {
    code: 'DSM',
    name: 'Design, Social & Marketing',
    body: 'Creative direction, visual identity and community outreach. The voice and image of Nexus across campus and online.',
    filter: ['Marketing', 'Social Media', 'Graphic Design'],
  },
  {
    code: 'FIN',
    name: 'Finance & Sponsorship',
    body: 'Project funding, registrations and external partnerships that keep payloads flying and events running.',
    filter: 'Finance & Sponsorship',
  },
];

export const formats = [
  { code: 'OBS', title: 'Observation Nights', body: 'Telescope sessions under the Jaipur sky — planets, the Moon and deep-sky targets.' },
  { code: 'IMG', title: 'Astrophotography', body: 'Capturing and archiving deep-sky imagery from campus and dark-sky sites.' },
  { code: 'HCK', title: 'Hackathons', body: 'Long-form build sprints across space tech, data and the spatial web.' },
  { code: 'SYM', title: 'Symposiums', body: 'Talks and discussions bringing research, flight and industry voices to campus.' },
  { code: 'LAB', title: 'Hands-on Builds', body: 'Sensor payloads, SDR receivers and ground software — built by members.' },
  { code: 'WGL', title: 'Creative Code', body: 'WebGL, shaders and visualisation sessions for anyone curious about 3D on the web.' },
];

export const channels = [
  { label: 'LinkedIn', handle: 'company/nexus-manipal-jaipur', href: 'https://www.linkedin.com/company/nexus-manipal-jaipur/', note: 'Research collaborations, achievements & project highlights' },
  { label: 'Instagram', handle: '@nexus_muj', href: 'https://www.instagram.com/nexus_muj/', note: 'Sky-watch sessions, hackathon nights & event stories' },
  { label: 'MUJ DSW', handle: 'jaipur.manipal.edu/dsw', href: 'https://www.jaipur.manipal.edu/dsw-student-clubs.php', note: 'Accredited under the Directorate of Student Welfare' },
  { label: 'GitHub', handle: 'Nexus-Web-Development/Nexus-Web-Page', href: 'https://github.com/Nexus-Web-Development/Nexus-Web-Page', note: 'WebGL portal source, shaders & space software' },
];

// Crew filters group the roster's raw division labels.
export const crewFilters = [
  { key: 'all', label: 'All' },
  { key: 'Executive Committee', label: 'Executive' },
  { key: 'Core Committee', label: 'Core' },
  { key: 'PNR', label: 'PNR' },
  { key: 'Web Development', label: 'Web Dev' },
  { key: 'Events', label: 'Events' },
  { key: 'Operations & Logistics', label: 'Ops & Logistics' },
  { key: 'Finance & Sponsorship', label: 'Finance' },
  { key: 'Marketing', label: 'Marketing' },
  { key: 'Social Media', label: 'Social' },
  { key: 'Graphic Design', label: 'Design' },
];

const groupOf = (division) => {
  if (division.startsWith('Finance')) return 'Finance & Sponsorship';
  if (division === 'Logistics' || division === 'Operations & Logistics') return 'Operations & Logistics';
  return division;
};

// [name, role, division] — Official 2026–27 roster.
// Executive Committee, Core Committee and Team Heads follow the signed
// "Executive Committee & Team Heads 2026-2027" document; JCs follow the previous site.
const roster = [
  ['Aaroh Sinha', 'President', 'Executive Committee'],
  ['Vedant Mohan Sharma', 'Vice President', 'Executive Committee'],
  ['Renesh Balaji Lachireddy', 'Technical Secretary', 'Executive Committee'],
  ['Maulik Sharma', 'General Secretary', 'Executive Committee'],
  ['Eeshaan Singh', 'Managing Director', 'Executive Committee'],
  ['Shrikar Chennamsetty', 'Events Director', 'Executive Committee'],
  ['Sahanaa Vashishth', 'Community Director', 'Executive Committee'],
  ['Saket Sharma', 'Creative Director', 'Executive Committee'],
  ['Rahul Kumawat', 'Treasurer', 'Executive Committee'],

  ['Aaishmeen', 'Deputy Secretary', 'Core Committee'],
  ['Aarshee Aarya', 'Head of Operation', 'Core Committee'],
  ['Sachjyot Kour', 'Creative Head', 'Core Committee'],
  ['Tejas Narula', 'TechOps Lead', 'Core Committee'],
  ['Kavyansh Prabhakar', 'Finance Head', 'Core Committee'],

  ['Labya Chandrakar', 'Team Head', 'Events'],
  ['Avni Balodia', 'Team Head', 'Events'],
  ['Aarushi Agarwal', 'Team Head', 'Events'],
  ['Aryan Tyagi', 'Team Head', 'Events'],
  ['Reneeka Sharma', 'Team Head', 'Events'],
  ['Dishi Shreemal', 'Team Head', 'Events'],
  ['Swati Dash', 'JC', 'Events'],
  ['Bhavya Katiyar', 'JC', 'Events'],
  ['Huzaif', 'JC', 'Events'],
  ['Subhod Kumar', 'JC', 'Events'],
  ['Amritansh Singh', 'JC', 'Events'],
  ['Kamakshi Bharti', 'JC', 'Events'],
  ['Punika Pamnani', 'JC', 'Events'],
  ['Sanvee', 'JC', 'Events'],
  ['Rudra Pratap Singh', 'JC', 'Events'],

  ['Rashi Singh', 'Team Head', 'Marketing'],
  ['Yash Pandey', 'Team Head', 'Marketing'],
  ['Aryan Kumar', 'Team Head', 'Marketing'],
  ['Lakshita Annapareddy', 'Team Head', 'Marketing'],
  ['Mannat', 'JC', 'Marketing'],
  ['Ishika', 'JC', 'Marketing'],
  ['Advaita', 'JC', 'Marketing'],
  ['Asmi', 'JC', 'Marketing'],
  ['Daksh Vasudeva', 'JC', 'Marketing'],
  ['Abhinav Sinha', 'JC', 'Marketing'],
  ['Nishit Sharma', 'JC', 'Marketing'],
  ['Aditi', 'JC', 'Marketing'],

  ['Preksha Jain', 'Team Head', 'Finance & Registration · Sponsorship & Curation'],
  ['Ved Malya', 'Team Head', 'Finance & Registration · Sponsorship & Curation'],
  ['Shaurya Goel', 'Team Head', 'Finance & Registration · Sponsorship & Curation'],
  ['Aditya Sarkar', 'Team Head', 'Finance & Registration · Sponsorship & Curation'],
  ['Vidit Mittal', 'JC', 'Finance & Registration'],
  ['Agrim Gupta', 'JC', 'Finance & Registration'],
  ['Divy', 'JC', 'Finance & Registration'],
  ['Bhavya', 'JC', 'Finance & Registration'],
  ['Saksham', 'JC', 'Finance & Registration'],
  ['Keshav', 'JC', 'Finance & Registration'],
  ['Dakshesh', 'JC', 'Finance & Registration'],
  ['Ayush', 'JC', 'Finance & Registration'],
  ['Shourya', 'JC', 'Finance & Registration'],
  ['Sahas', 'JC', 'Finance & Registration'],

  ['Chinmay Lal', 'Team Head', 'Operations & Logistics'],
  ['Arnav Mohapatra', 'Team Head', 'Operations & Logistics'],
  ['Sarvagya Singh', 'Team Head', 'Operations & Logistics'],
  ['Kunal Jaiswal', 'JC', 'Logistics'],
  ['Rithvik Krishna Dusa', 'JC', 'Logistics'],
  ['Shaurya Thapliyal', 'JC', 'Logistics'],
  ['Darsh Gupta', 'JC', 'Logistics'],
  ['Animesh Kushwaha', 'JC', 'Logistics'],
  ['Pavan Wagh', 'JC', 'Logistics'],

  ['Ridhima Gupta', 'Team Head', 'Social Media'],
  ['Divyanshi Kumar', 'Team Head', 'Social Media'],
  ['Angad Singh', 'JC', 'Social Media'],
  ['Soumya', 'JC', 'Social Media'],
  ['Kritika Sinha', 'JC', 'Social Media'],
  ['Rachit Agarwal', 'JC', 'Social Media'],
  ['Rana Chowdary', 'JC', 'Social Media'],
  ['Bhavya Katiyar', 'JC', 'Social Media'],
  ['Neelabh Sati', 'JC', 'Social Media'],
  ['Neev Gupta', 'JC', 'Social Media'],
  ['Sarthak Rana', 'JC', 'Social Media'],
  ['Divyanshi Singh', 'JC', 'Social Media'],
  ['Himanshu Sharma', 'JC', 'Social Media'],

  ['Anwesha', 'Team Head', 'Graphic Design'],
  ['Hrithvrik Puram', 'Team Head', 'Graphic Design'],
  ['Yashaditya', 'Team Head', 'Graphic Design'],
  ['Sarthak Srivastava', 'JC', 'Graphic Design'],
  ['Ratnajit Dutta', 'JC', 'Graphic Design'],

  ['Kaustav Paul', 'Team Head', 'Web Development'],
  ['Tamanna Bal', 'Team Head', 'Web Development'],
  ['Shaaz Adil', 'Team Head', 'Web Development'],
  ['Aakanksha Kumar', 'Team Head', 'Web Development'],
  ['Vansh Sood', 'JC', 'Web Development'],
  ['Jatin Pandey', 'JC', 'Web Development'],
  ['Lakshya Agarwal', 'JC', 'Web Development'],
  ['Vivan Bhardwaj', 'JC', 'Web Development'],
  ['Ritvik Bansal', 'JC', 'Web Development'],
  ['Aditya Goyal', 'JC', 'Web Development'],
  ['Gunika Madan', 'JC', 'Web Development'],
  ['Aarav Srivastava', 'JC', 'Web Development'],
  ['Rashmi Raj', 'JC', 'Web Development'],
  ['Devika Sharma', 'JC', 'Web Development'],

  ['Aditya Goyal', 'JC', 'PNR'],
  ['G. Shrihari Kshitij', 'JC', 'PNR'],
  ['Sahas Reddy Pingili', 'JC', 'PNR'],
  ['Karthikeya Kollimarla', 'JC', 'PNR'],
  ['Bhavya Gupta', 'JC', 'PNR'],
  ['Jyotirmay Sharma', 'JC', 'PNR'],
  ['Udita Sau', 'JC', 'PNR'],
  ['Nia Kunwar Nirban', 'JC', 'PNR'],
  ['Alok Singh', 'JC', 'PNR'],
  ['Arsh Rana', 'JC', 'PNR'],
  ['Muddam Jaswanth Reddy', 'JC', 'PNR'],
  ['Saatvik Shyam Chakravarthi', 'JC', 'PNR'],
];

export const crew = roster.map(([name, role, division], i) => ({
  n: i + 1,
  name,
  role,
  division,
  group: groupOf(division),
  initials: name.replace(/^[A-Z]\.\s*/, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase(),
}));

export const countFor = (key) => (key === 'all' ? crew.length : crew.filter((c) => c.group === key).length);
