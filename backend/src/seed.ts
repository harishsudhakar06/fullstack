import pool from "./db";

const colleges = [
  {
    name: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    fees_min: 100000,
    fees_max: 200000,
    rating: 4.8,
    courses: ["B.Tech CSE", "B.Tech EE", "B.Tech Mechanical", "M.Tech", "PhD"],
    placement_avg: 1800000,
    placement_top: 6000000,
    placement_pct: 95,
    top_recruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs"],
    students: 9000,
    established: 1959,
    type: "Government",
    exam: "JEE",
    cutoff_rank: 500,
    description:
      "IIT Madras is an autonomous public technical university in Chennai. It is one of the most prestigious engineering institutes in India.",
  },
  {
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    fees_min: 100000,
    fees_max: 220000,
    rating: 4.9,
    courses: ["B.Tech CSE", "B.Tech EE", "B.Tech Civil", "M.Tech", "MBA"],
    placement_avg: 2000000,
    placement_top: 7000000,
    placement_pct: 96,
    top_recruiters: ["Apple", "Google", "DE Shaw", "Flipkart"],
    students: 10000,
    established: 1958,
    type: "Government",
    exam: "JEE",
    cutoff_rank: 200,
    description:
      "IIT Bombay is one of the premier engineering institutes of India known for its research and placements.",
  },
  {
    name: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    state: "Tamil Nadu",
    fees_min: 80000,
    fees_max: 150000,
    rating: 4.5,
    courses: ["B.Tech CSE", "B.Tech ECE", "B.Tech Mechanical", "MCA"],
    placement_avg: 1200000,
    placement_top: 4000000,
    placement_pct: 90,
    top_recruiters: ["TCS", "Infosys", "Wipro", "Samsung"],
    students: 6000,
    established: 1964,
    type: "Government",
    exam: "JEE",
    cutoff_rank: 5000,
    description:
      "NIT Trichy is one of the top National Institutes of Technology with excellent placement records.",
  },
  {
    name: "VIT Vellore",
    location: "Vellore, Tamil Nadu",
    state: "Tamil Nadu",
    fees_min: 180000,
    fees_max: 300000,
    rating: 4.2,
    courses: ["B.Tech CSE", "B.Tech IT", "B.Tech ECE", "MBA", "MCA"],
    placement_avg: 800000,
    placement_top: 3000000,
    placement_pct: 85,
    top_recruiters: ["Amazon", "Zoho", "Cognizant", "Accenture"],
    students: 35000,
    established: 1984,
    type: "Private",
    exam: "VITEEE",
    cutoff_rank: 50000,
    description:
      "VIT Vellore is a deemed university known for its technology programs and large campus life.",
  },
  {
    name: "Anna University",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    fees_min: 50000,
    fees_max: 100000,
    rating: 4.0,
    courses: ["B.E CSE", "B.E ECE", "B.E Civil", "MBA", "MCA"],
    placement_avg: 600000,
    placement_top: 2000000,
    placement_pct: 80,
    top_recruiters: ["TCS", "HCL", "Infosys", "CTS"],
    students: 13000,
    established: 1978,
    type: "Government",
    exam: "TNEA",
    cutoff_rank: 10000,
    description:
      "Anna University is the premier state technical university of Tamil Nadu offering quality technical education.",
  },
  {
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    state: "Rajasthan",
    fees_min: 400000,
    fees_max: 550000,
    rating: 4.7,
    courses: ["B.E CSE", "B.E Mechanical", "B.Pharm", "M.E", "MBA"],
    placement_avg: 1600000,
    placement_top: 5500000,
    placement_pct: 93,
    top_recruiters: ["Microsoft", "Google", "Qualcomm", "Tata Motors"],
    students: 7000,
    established: 1964,
    type: "Private",
    exam: "BITSAT",
    cutoff_rank: 2000,
    description:
      "BITS Pilani is one of India's top private engineering universities with a strong industry connection.",
  },
  {
    name: "PESIT Bangalore",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    fees_min: 150000,
    fees_max: 250000,
    rating: 3.9,
    courses: ["B.E CSE", "B.E ECE", "B.E ISE", "M.Tech"],
    placement_avg: 700000,
    placement_top: 2500000,
    placement_pct: 82,
    top_recruiters: ["Infosys", "Wipro", "TCS", "IBM"],
    students: 8000,
    established: 1988,
    type: "Private",
    exam: "KCET",
    cutoff_rank: 20000,
    description:
      "PESIT Bangalore is a well-known engineering college in Bangalore with a focus on industry-ready curriculum.",
  },
  {
    name: "IIT Delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    fees_min: 100000,
    fees_max: 210000,
    rating: 4.8,
    courses: ["B.Tech CSE", "B.Tech EE", "B.Tech Chemical", "M.Tech", "PhD"],
    placement_avg: 1900000,
    placement_top: 6500000,
    placement_pct: 95,
    top_recruiters: ["Google", "Microsoft", "Intel", "Morgan Stanley"],
    students: 8500,
    established: 1961,
    type: "Government",
    exam: "JEE",
    cutoff_rank: 300,
    description:
      "IIT Delhi is one of the original five IITs and consistently ranks among the top engineering colleges in India.",
  },
  {
    name: "Manipal Institute of Technology",
    location: "Manipal, Karnataka",
    state: "Karnataka",
    fees_min: 250000,
    fees_max: 400000,
    rating: 4.1,
    courses: ["B.Tech CSE", "B.Tech ME", "B.Tech Civil", "MBA"],
    placement_avg: 900000,
    placement_top: 3200000,
    placement_pct: 83,
    top_recruiters: ["Oracle", "SAP", "Deloitte", "Capgemini"],
    students: 15000,
    established: 1957,
    type: "Private",
    exam: "MET",
    cutoff_rank: 30000,
    description:
      "MIT Manipal is a top private engineering college known for its diverse student community and global exposure.",
  },
  {
    name: "SRM Institute of Science and Technology",
    location: "Kattankulathur, Tamil Nadu",
    state: "Tamil Nadu",
    fees_min: 200000,
    fees_max: 350000,
    rating: 3.8,
    courses: ["B.Tech CSE", "B.Tech IT", "B.Tech Biotech", "MBA"],
    placement_avg: 650000,
    placement_top: 2200000,
    placement_pct: 78,
    top_recruiters: ["TCS", "Cognizant", "Amazon", "Zoho"],
    students: 52000,
    established: 1985,
    type: "Private",
    exam: "SRMJEEE",
    cutoff_rank: 60000,
    description:
      "SRM is one of the largest private universities in India with a vast campus and diverse programs.",
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS colleges (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        location VARCHAR(200),
        state VARCHAR(100),
        fees_min INTEGER,
        fees_max INTEGER,
        rating DECIMAL(3,1),
        courses TEXT[],
        placement_avg INTEGER,
        placement_top INTEGER,
        placement_pct INTEGER,
        top_recruiters TEXT[],
        students INTEGER,
        established INTEGER,
        type VARCHAR(50),
        exam VARCHAR(50),
        cutoff_rank INTEGER,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`DELETE FROM colleges;`);

    for (const c of colleges) {
      await client.query(
        `INSERT INTO colleges 
          (name, location, state, fees_min, fees_max, rating, courses, 
           placement_avg, placement_top, placement_pct, top_recruiters,
           students, established, type, exam, cutoff_rank, description)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
        [
          c.name,
          c.location,
          c.state,
          c.fees_min,
          c.fees_max,
          c.rating,
          c.courses,
          c.placement_avg,
          c.placement_top,
          c.placement_pct,
          c.top_recruiters,
          c.students,
          c.established,
          c.type,
          c.exam,
          c.cutoff_rank,
          c.description,
        ]
      );
    }

    console.log("✅ Seeded 10 colleges successfully.");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();