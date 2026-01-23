// Mapping from university names to LC names
const UNIVERSITY_TO_LC_MAP: { [key: string]: string } = {
  'Know Crunch': 'UniPi',
  "IEK Delta (Thessaloniki's Department)": 'UoM THESSALONIKI',
  "University of Thessaly (Lamia's Department)": 'Volos',
  "University of Thessaly (Volos' Department)": 'Volos',
  "ASPAITE": 'UniPi',
  "IEK KORIDALLOU": 'UniPi',
  "IEK AIGALEO": 'UniPi',
  "IEK AMMAROUSIOU": 'UniPi',
  "D.IEK NEAS IONIAS": 'UniPi',
  "IEK OMEGA PEIRAIA": 'UniPi',
  "IEK PEIRAIA": 'UniPi',
  "Aegean College Piraeus": 'UniPi',
  "University of Peloponnese (Patras' Department)": 'Patras',
  "University of Patras (Pyrgos Department)": 'Patras',
  "University of Patras (Aigio Department)": 'Patras',
  "University of Patras (Mesologgi Department)": 'Patras',
  "University of Patras (Agrinio Department)": 'Patras',
  "University of Patras (Patras Department)": 'Patras',
  "IEK DELTA (Patras Department)": 'Patras',
  "IEK EUROTEAM (Patras Department)": 'Patras',
  "IEK SBIE (Patras Department)": 'Patras',
  "IEK VERGI (Patras Department)": 'Patras',
  "City Unity College (Patras Department)": 'Patras',
  "IEK MBS Rethymnon": 'Crete',
  "IEK MORFI of Heraklion": 'Crete',
  "D.IEK of Siteia": 'Crete',
  "IEK AKMI (Herakleion Department)": 'Crete',
  "D.IEK of Rethymno": 'Crete',
  "D.IEK of Chania": 'Crete',
  "IEK of Ag. Nikolaos": 'Crete',
  "2nd D.IEK of  Heraklion": 'Crete',
  "1st D.IEK of  Heraklion": 'Crete',
  "Hellenic Mediterranean University (Siteia Department)": 'Crete',
  "Hellenic Mediterranean University (Ag.Nikolaos Department)": 'Crete',
  "Hellenic Mediterranean University (Chania Department)": 'Crete',
  "Hellenic Mediterranean University (Rethumno Department)": 'Crete',
  "Hellenic Mediterranean University (Herakleion Department)": 'Crete',
  "University of Crete (Rethymno Department)": 'Crete',
  "University of Crete (Herakleion Department)": 'Crete',
  "National Theatre": 'ATHENS',
  "Hellenic Conservatory": 'ATHENS',
  "IEK AKMI Athens": 'ATHENS',
  "Metropolitan College": 'ATHENS',
  "University of Aegean (Limnos)": 'Aegean',
  "University of Aegean (Samos)": 'Aegean',
  "University of Aegean (Siros)": 'Aegean',
  "University of Aegean (Rodos)": 'Aegean',
  "University of Aegean (Chios)": 'Aegean',
  "University of Aegean (Mitilini)": 'Aegean',
  "Open University of Chios": 'Aegean',
  "Public IEK of Chios": 'Aegean',
  "IEK DATA Chios": 'Aegean',
  "School of Fine Arts": 'ATHENS',
  "University of Central Lancashire": 'UoM THESSALONIKI',
  "City College Athens": 'UniPi',
  "Harokopio University of Athens": 'ATHENS',
  "Technological Institute of Thessaloniki": 'UoM THESSALONIKI',
  "University of Peloponnese (Sparta's Department)": 'Patras',
  "University of Peloponnese (Tripolis' Department)": 'Patras',
  "University of Peloponnese (Nafplio's Department)": 'Patras',
  "University of Ioannina": 'UoI',
  "TEI of Epirus": 'UoI',
  "International University of Macedonia": 'UoM THESSALONIKI',
  "New York College (Athens's Department)": 'UniPi',
  "University of Aegean": 'Aegean',
  "Deree  -  The American College of Greece": 'ATHENS',
  "American College of Thessaloniki": 'UoM THESSALONIKI',
  "University of Peloponnese (Korinth's Department)": 'Patras',
  "Mediterranean College (Athens Department)": 'UniPi',
  "TEI of Kalamata": 'Patras',
  "DEI College": 'UoM THESSALONIKI',
  "AKMI Mediterranean College (Thessaloniki's Departments)": 'UoM THESSALONIKI',
  "Open University of Cyprus": 'Aegean',
  "Cyprus International Institute of Management": 'Aegean',
  "University of Nicosia": 'Crete',
  "KES College": 'Aegean',
  "Neapolis University Paphos": 'AUTH',
  "Frederick University": 'UoM THESSALONIKI',
  "European University of Cyprus": 'ATHENS',
  "Cyprus University of Technology": 'Aegean',
  "American University of Nicosia": 'Aegean',
  "University of Cyprus": 'UniPi',
  "Mediterranean Agronomic Institute of Chania": 'Crete',
  "Agricultural University of Athens": 'ATHENS',
  "IEK Akmi (Patras Department)": 'Patras',
  "Athens University of Economics & Business": 'ATHENS',
  "Athens Information Technology College": 'UniPi',
  "Democretus University of Thrace": 'DUTH',
  "University of Thessaly": 'Volos',
  "TEI of Lamia": 'Volos',
  "University of Central Greece": 'Volos',
  "TEI of Larisa": 'Volos',
  "Ionian University": 'AUTH',
  "TEI of Ionian Islands": 'AUTH',
  "Aristotle University of Thessaloniki": 'AUTH',
  "TEI of Serres": 'AUTH',
  "International University": 'UoM THESSALONIKI',
  "AKMI College (Thessaloniki's Departments)": 'UoM THESSALONIKI',
  "City College Thessaloniki": 'UoM THESSALONIKI',
  "TEI Western Macedonia": 'UoM THESSALONIKI',
  "University of Macedonia": 'UoM THESSALONIKI',
  "TEI Kavalas": 'UoM THESSALONIKI',
  "University of Western Macedonia": 'UoM THESSALONIKI',
  "TEI Thessalonikis": 'UoM THESSALONIKI',
  "University of Patras": 'Patras',
  "TEI Messolonghi": 'Patras',
  "University of Peloponnese (Kalamata's Department)": 'Patras',
  "TEI Kalamata": 'Patras',
  "Hellenic Open University": 'Patras',
  "IEK Akmi (Thessaloniki Department)": 'AUTH',
  "TEI of Patras": 'Patras',
  "Technical University of Crete": 'Crete',
  "Mediterranean Insitute Chania": 'Crete',
  "TEI of Crete": 'Crete',
  "University of Crete": 'Crete',
  "University of Piraeus": 'UniPi',
  "IEK Domi": 'UniPi',
  "New York College (Thessaloniki Department)": 'AUTH',
  "University of Western Attica": 'UniPi',
  "Mediterranean College (Thessaloniki Department)": 'AUTH',
  "Athens IT College": 'UniPi',
  "Panteion University": 'UniPi',
  "TEI Chalkidas": 'NKUA',
  "Global Training": 'NKUA',
  "National Kapodistrian University of Athens": 'NKUA',
  "IST College": 'NKUA',
  "National Technical University of Athens": 'NKUA',
  "Business College of Athens": 'NKUA',
  "British Hellenic College (Athens Department)": 'ATHENS',
  "ALBA - The American College of Greece": 'ATHENS',
  "IEK SBIE (Athens Department)": 'ATHENS',
  "Agricultural University": 'ATHENS',
  "Vakalo Art & Design College": 'ATHENS',
  "University of Athens": 'NKUA',
  "QS College (Athens Department)": 'ATHENS'
};

// Mapping from LC names to LC IDs (office_id.txt)
const LC_TO_ID_MAP: { [key: string]: number } = {
  'ATHENS': 834,
  'AUTH': 762,
  'UniPi': 1347,
  'UoI': 1882,
  'UoM THESSALONIKI': 1281,
  'Volos': 2356,
  'NKUA': 834, // Assuming NKUA maps to ATHENS
  'Aegean': 834, // Default to ATHENS for unmapped LCs
  'Crete': 834, // Default to ATHENS for unmapped LCs
  'Patras': 834, // Default to ATHENS for unmapped LCs
  'DUTH': 834 // Default to ATHENS for unmapped LCs
};

/**
 * Maps a university name to its corresponding LC ID
 * @param universityName - The name of the university
 * @returns The LC ID number, or 834 (ATHENS) as default
 */
export function getUniversityLCId(universityName: string): number {
  // First, get the LC name from the university
  const lcName = UNIVERSITY_TO_LC_MAP[universityName];
  
  // If university not found in mapping, default to ATHENS
  if (!lcName) {
    console.warn(`University "${universityName}" not found in mapping. Defaulting to ATHENS (834).`);
    return 834;
  }
  
  // Then, get the LC ID from the LC name
  const lcId = LC_TO_ID_MAP[lcName];
  
  // If LC name not found in ID mapping, default to ATHENS
  if (!lcId) {
    console.warn(`LC "${lcName}" not found in ID mapping. Defaulting to ATHENS (834).`);
    return 834;
  }
  
  return lcId;
}

/**
 * Maps a faculty name to a faculty ID (placeholder - needs actual EXPA faculty IDs)
 * @param facultyName - The name of the faculty
 * @returns A placeholder faculty ID string
 */
export function getFacultyId(facultyName: string): string {
  // This is a placeholder. In production, you'd need to fetch actual faculty IDs from EXPA
  // or maintain a mapping like the university mapping
  const facultyMap: { [key: string]: string } = {
    'Engineering': 'RmFjdWx0eU5vZGU6MQ==',
    'Business': 'RmFjdWx0eU5vZGU6Mg==',
    'Arts': 'RmFjdWx0eU5vZGU6Mw==',
    'Science': 'RmFjdWx0eU5vZGU6NA==',
    'Medicine': 'RmFjdWx0eU5vZGU6NQ==',
    'Law': 'RmFjdWx0eU5vZGU6Ng==',
    'Other': 'RmFjdWx0eU5vZGU6Nw=='
  };
  
  return facultyMap[facultyName] || facultyMap['Other'];
}

/**
 * Gets campaign ID from URL parameter or returns null
 * @returns Campaign ID string or null
 */
export function getCampaignId(): string | null {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('c');
}
