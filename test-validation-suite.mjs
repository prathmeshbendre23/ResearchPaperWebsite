import { validateInquiry } from './src/services/inquiryService.js';
// We also import or test the validation logic from api/inquiry.js
// Since api/inquiry.js exports default handler, let's test its validator by calling it or mirroring its validateInput function

function validateInputServer(payload) {
  const errors = [];

  const fullName = typeof payload.fullName === 'string' ? payload.fullName.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  const institution = typeof payload.institution === 'string' ? payload.institution.trim() : '';
  const researchArea = typeof payload.researchArea === 'string' ? payload.researchArea.trim() : '';
  const paperTitle = typeof payload.paperTitle === 'string' ? payload.paperTitle.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const serviceNeeded = typeof payload.serviceNeeded === 'string' ? payload.serviceNeeded.trim() : '';

  if (fullName.length < 2 || fullName.length > 100) errors.push('fullName');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.length > 150 || !emailRegex.test(email)) errors.push('email');

  const phoneClean = phone.replace(/[\s\-()]/g, '');
  if (phoneClean.length > 0) {
    const indianMobileRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    if (!indianMobileRegex.test(phoneClean)) {
      errors.push('phone');
    }
  }

  if (institution.length > 200) errors.push('institution');
  if (researchArea.length < 2 || researchArea.length > 150) errors.push('researchArea');
  if (serviceNeeded.length < 2 || serviceNeeded.length > 150) errors.push('serviceNeeded');
  if (paperTitle.length > 400) errors.push('paperTitle');
  if (message.length < 10 || message.length > 5000) errors.push('message');

  return {
    isValid: errors.length === 0,
    errors
  };
}

const testCases = [
  {
    name: "Valid standard inquiry",
    payload: {
      fullName: "Dr. Aris Thorne",
      email: "aris.thorne@oxford.ac.uk",
      phone: "+91 9876543210",
      institution: "University of Oxford",
      serviceNeeded: "Research Paper Writing & Guidance",
      researchArea: "Artificial Intelligence & Robotics",
      paperTitle: "Neural Architectures in Computational Biology",
      message: "We need expert peer-review guidance for our upcoming IEEE Transactions submission."
    },
    expectClientValid: true,
    expectServerValid: true
  },
  {
    name: "Empty required fields",
    payload: {
      fullName: "",
      email: "",
      phone: "",
      institution: "",
      serviceNeeded: "",
      researchArea: "",
      paperTitle: "",
      message: ""
    },
    expectClientValid: false,
    expectServerValid: false
  },
  {
    name: "Whitespace-only input",
    payload: {
      fullName: "   ",
      email: "   ",
      phone: "   ",
      institution: "   ",
      serviceNeeded: "   ",
      researchArea: "   ",
      paperTitle: "   ",
      message: "          "
    },
    expectClientValid: false,
    expectServerValid: false
  },
  {
    name: "Valid Gmail address",
    payload: {
      fullName: "Prathmesh Bendre",
      email: "prathmesh.bendre@gmail.com",
      serviceNeeded: "Journal Selection & Submission Support",
      researchArea: "Computer Science & Engineering",
      message: "Requesting assistance for high-impact journal submission."
    },
    expectClientValid: true,
    expectServerValid: true
  },
  {
    name: "Valid institutional email (.edu / .ac.in)",
    payload: {
      fullName: "Prof. Sarah Jenkins",
      email: "sjenkins@iitd.ac.in",
      serviceNeeded: "Research Paper Writing & Guidance",
      researchArea: "Materials Science & Nanotechnology",
      message: "Consultation needed for experimental data interpretation."
    },
    expectClientValid: true,
    expectServerValid: true
  },
  {
    name: "Valid email alias with plus (+)",
    payload: {
      fullName: "Alex Rivera",
      email: "alex.rivera+research2026@stanford.edu",
      serviceNeeded: "Systematic Literature Review",
      researchArea: "Biomedical & Health Sciences",
      message: "Synthesizing clinical trial outcomes across multiple datasets."
    },
    expectClientValid: true,
    expectServerValid: true
  },
  {
    name: "Invalid email (no @ or domain)",
    payload: {
      fullName: "Alex Rivera",
      email: "not-an-email",
      serviceNeeded: "Systematic Literature Review",
      researchArea: "Biomedical & Health Sciences",
      message: "Synthesizing clinical trial outcomes across multiple datasets."
    },
    expectClientValid: false,
    expectServerValid: false
  },
  {
    name: "Valid Indian mobile: 10 digits starting with 9 (9876543210)",
    payload: {
      fullName: "Rohan Sharma",
      email: "rohan.sharma@gmail.com",
      phone: "9876543210",
      serviceNeeded: "Plagiarism Check & Similarity Reduction",
      researchArea: "Electrical & Electronics Engineering",
      message: "Need grammar check and plagiarism reduction below 10%."
    },
    expectClientValid: true,
    expectServerValid: true
  },
  {
    name: "Valid Indian mobile: +91 prefix (+919876543210)",
    payload: {
      fullName: "Rohan Sharma",
      email: "rohan.sharma@gmail.com",
      phone: "+919876543210",
      serviceNeeded: "Plagiarism Check & Similarity Reduction",
      researchArea: "Electrical & Electronics Engineering",
      message: "Need grammar check and plagiarism reduction below 10%."
    },
    expectClientValid: true,
    expectServerValid: true
  },
  {
    name: "Valid Indian mobile: +91 with space (+91 9876543210)",
    payload: {
      fullName: "Rohan Sharma",
      email: "rohan.sharma@gmail.com",
      phone: "+91 9876543210",
      serviceNeeded: "Plagiarism Check & Similarity Reduction",
      researchArea: "Electrical & Electronics Engineering",
      message: "Need grammar check and plagiarism reduction below 10%."
    },
    expectClientValid: true,
    expectServerValid: true
  },
  {
    name: "Valid Indian mobile: 91 prefix without plus (919876543210)",
    payload: {
      fullName: "Rohan Sharma",
      email: "rohan.sharma@gmail.com",
      phone: "919876543210",
      serviceNeeded: "Plagiarism Check & Similarity Reduction",
      researchArea: "Electrical & Electronics Engineering",
      message: "Need grammar check and plagiarism reduction below 10%."
    },
    expectClientValid: true,
    expectServerValid: true
  },
  {
    name: "Valid Indian mobile: 10 digits starting with 6, 7, 8 (e.g. 7890123456)",
    payload: {
      fullName: "Rohan Sharma",
      email: "rohan.sharma@gmail.com",
      phone: "7890123456",
      serviceNeeded: "Plagiarism Check & Similarity Reduction",
      researchArea: "Electrical & Electronics Engineering",
      message: "Need grammar check and plagiarism reduction below 10%."
    },
    expectClientValid: true,
    expectServerValid: true
  },
  {
    name: "Invalid Indian mobile: first digit is 1 (1234567890)",
    payload: {
      fullName: "Rohan Sharma",
      email: "rohan.sharma@gmail.com",
      phone: "1234567890",
      serviceNeeded: "Plagiarism Check & Similarity Reduction",
      researchArea: "Electrical & Electronics Engineering",
      message: "Need grammar check and plagiarism reduction below 10%."
    },
    expectClientValid: false,
    expectServerValid: false
  },
  {
    name: "Invalid Indian mobile: 9 digits (987654321)",
    payload: {
      fullName: "Rohan Sharma",
      email: "rohan.sharma@gmail.com",
      phone: "987654321",
      serviceNeeded: "Plagiarism Check & Similarity Reduction",
      researchArea: "Electrical & Electronics Engineering",
      message: "Need grammar check and plagiarism reduction below 10%."
    },
    expectClientValid: false,
    expectServerValid: false
  },
  {
    name: "Invalid Indian mobile: 11 digits (98765432101)",
    payload: {
      fullName: "Rohan Sharma",
      email: "rohan.sharma@gmail.com",
      phone: "98765432101",
      serviceNeeded: "Plagiarism Check & Similarity Reduction",
      researchArea: "Electrical & Electronics Engineering",
      message: "Need grammar check and plagiarism reduction below 10%."
    },
    expectClientValid: false,
    expectServerValid: false
  },
  {
    name: "Invalid Indian mobile: contains letters (98765abc10)",
    payload: {
      fullName: "Rohan Sharma",
      email: "rohan.sharma@gmail.com",
      phone: "98765abc10",
      serviceNeeded: "Plagiarism Check & Similarity Reduction",
      researchArea: "Electrical & Electronics Engineering",
      message: "Need grammar check and plagiarism reduction below 10%."
    },
    expectClientValid: false,
    expectServerValid: false
  },
  {
    name: "Invalid Indian mobile: +91 prefix with invalid starting digit 1 (+911234567890)",
    payload: {
      fullName: "Rohan Sharma",
      email: "rohan.sharma@gmail.com",
      phone: "+911234567890",
      serviceNeeded: "Plagiarism Check & Similarity Reduction",
      researchArea: "Electrical & Electronics Engineering",
      message: "Need grammar check and plagiarism reduction below 10%."
    },
    expectClientValid: false,
    expectServerValid: false
  },
  {
    name: "Invalid Indian mobile: +91 prefix with 9 digits (+91987654321)",
    payload: {
      fullName: "Rohan Sharma",
      email: "rohan.sharma@gmail.com",
      phone: "+91987654321",
      serviceNeeded: "Plagiarism Check & Similarity Reduction",
      researchArea: "Electrical & Electronics Engineering",
      message: "Need grammar check and plagiarism reduction below 10%."
    },
    expectClientValid: false,
    expectServerValid: false
  },
  {
    name: "Invalid Indian mobile: +91 prefix with 11 digits (+9198765432101)",
    payload: {
      fullName: "Rohan Sharma",
      email: "rohan.sharma@gmail.com",
      phone: "+9198765432101",
      serviceNeeded: "Plagiarism Check & Similarity Reduction",
      researchArea: "Electrical & Electronics Engineering",
      message: "Need grammar check and plagiarism reduction below 10%."
    },
    expectClientValid: false,
    expectServerValid: false
  },
  {
    name: "Multiline message with academic punctuation (; : - “ ” ( ) / . ,)",
    payload: {
      fullName: "Dr. Elena Rostova",
      email: "elena.rostova@mit.edu",
      phone: "+91 9876543210",
      institution: "MIT Media Lab; Department of EECS",
      serviceNeeded: "Research Paper Writing & Guidance",
      researchArea: "Data Science & Big Data Analytics",
      paperTitle: "Graph Neural Networks (GNNs): A Survey of 2024-2026 Architectures",
      message: `Dear Brain & Pen Team,\n\nWe have prepared a 14-page manuscript titled "GNNs in Large-Scale Heterogeneous Networks".\nOur key objectives are:\n1) Rigorous mathematical notation verification (Sections 3.2 - 4.1);\n2) Structural alignment with IEEE / ACM guidelines;\n3) Journal recommendations (Impact Factor > 4.5).\n\nLooking forward to your evaluation.`
    },
    expectClientValid: true,
    expectServerValid: true
  },
  {
    name: "Oversized message (> 5000 characters)",
    payload: {
      fullName: "Dr. Elena Rostova",
      email: "elena.rostova@mit.edu",
      serviceNeeded: "Research Paper Writing & Guidance",
      researchArea: "Data Science & Big Data Analytics",
      message: "A".repeat(5001)
    },
    expectClientValid: true, // client only checks min 10 chars
    expectServerValid: false // server enforces <= 5000 chars
  }
];

let allPassed = true;

testCases.forEach((tc, idx) => {
  const clientRes = validateInquiry(tc.payload);
  const serverRes = validateInputServer(tc.payload);

  const clientMatch = clientRes.isValid === tc.expectClientValid;
  const serverMatch = serverRes.isValid === tc.expectServerValid;

  if (clientMatch && serverMatch) {
    console.log(`[PASS] Test ${idx + 1}: ${tc.name}`);
  } else {
    allPassed = false;
    console.error(`[FAIL] Test ${idx + 1}: ${tc.name}`);
    if (!clientMatch) console.error(`  Client mismatch: got ${clientRes.isValid}, expected ${tc.expectClientValid}`);
    if (!serverMatch) console.error(`  Server mismatch: got ${serverRes.isValid}, expected ${tc.expectServerValid}`);
  }
});

console.log("\n--- API Handler Unit & Edge Case Tests ---");

async function invokeHandler(method, body, headers = {}) {
  let statusCode = 200;
  let responseData = null;
  const resHeaders = {};

  const req = {
    method,
    headers: { ...headers },
    body
  };

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    setHeader(name, value) {
      resHeaders[name.toLowerCase()] = value;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    }
  };

  const { default: handler } = await import('./api/inquiry.js');
  await handler(req, res);
  return { statusCode, responseData, headers: resHeaders };
}

// Handler Test 1: GET method rejection (405)
const getRes = await invokeHandler('GET', null);
if (getRes.statusCode === 405 && getRes.responseData?.success === false && getRes.headers['allow']) {
  console.log('[PASS] Handler Test 1: GET returns 405 Method Not Allowed with Allow header');
} else {
  allPassed = false;
  console.error('[FAIL] Handler Test 1: Expected 405, got', getRes.statusCode);
}

// Handler Test 2: Malformed JSON string (400)
const malformedRes = await invokeHandler('POST', '{"fullName": "Invalid JSON');
if (malformedRes.statusCode === 400 && malformedRes.responseData?.success === false) {
  console.log('[PASS] Handler Test 2: Malformed JSON payload returns 400 Bad Request');
} else {
  allPassed = false;
  console.error('[FAIL] Handler Test 2: Expected 400 for malformed JSON, got', malformedRes.statusCode);
}

// Handler Test 3: Empty object payload (400)
const emptyRes = await invokeHandler('POST', JSON.stringify({}));
if (emptyRes.statusCode === 400 && emptyRes.responseData?.success === false) {
  console.log('[PASS] Handler Test 3: Empty object returns 400 Bad Request (required fields enforced)');
} else {
  allPassed = false;
  console.error('[FAIL] Handler Test 3: Expected 400 for empty object, got', emptyRes.statusCode);
}

// Handler Test 4: Missing required fields (400)
const partialRes = await invokeHandler('POST', JSON.stringify({ fullName: 'John Doe' }));
if (partialRes.statusCode === 400 && partialRes.responseData?.success === false) {
  console.log('[PASS] Handler Test 4: Missing required fields returns 400 Bad Request');
} else {
  allPassed = false;
  console.error('[FAIL] Handler Test 4: Expected 400 for partial fields, got', partialRes.statusCode);
}

console.log("\nValidation & Handler Test Suite Result:", allPassed ? "ALL PASSED" : "FAILURES DETECTED");
process.exit(allPassed ? 0 : 1);
