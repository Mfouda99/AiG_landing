"""
Complete University and Department Mapping
Based on form2/assets/data/ JSON files
Maps universities and departments to LC and Podio IDs
"""

# LC Mappings from lcs.json
LC_DATA = {
    "AEGEAN": {"podio_id": 1079, "expa_id": 811},
    "Aegean": {"podio_id": 1079, "expa_id": 811},
    "ATHENS": {"podio_id": 56, "expa_id": 834},
    "AUTH": {"podio_id": 64, "expa_id": 762},
    "Crete": {"podio_id": 198, "expa_id": 1880},
    "DUTH": {"podio_id": 236, "expa_id": 1883},
    "Kalamata": {"podio_id": 1081, "expa_id": 2553},
    "NKUA": {"podio_id": 615, "expa_id": 974},
    "Patras": {"podio_id": 941, "expa_id": 186},
    "Unipi": {"podio_id": 666, "expa_id": 1347},
    "UniPi": {"podio_id": 666, "expa_id": 1347},
    "UoI": {"podio_id": 985, "expa_id": 1882},
    "UoM THESSALONIKI": {"podio_id": 986, "expa_id": 1281},
    "Volos": {"podio_id": 1033, "expa_id": 2356},
}

# University Mappings from universities.json: University Name -> (Podio ID, LC Name)
UNIVERSITY_DATA = {
    "Agricultural University": {"podio_id": 4, "lc": "ATHENS"},
    "Agricultural University of Athens": {"podio_id": 55, "lc": "ATHENS"},
    "AKMI College": {"podio_id": 38, "lc": "UoM THESSALONIKI"},
    "AKMI Mediterranean College": {"podio_id": 69, "lc": "UoM THESSALONIKI"},
    "American College of Greece (DEREE, ALBA)": {"podio_id": 78, "lc": "ATHENS"},
    "American College of Thessaloniki": {"podio_id": 77, "lc": "UoM THESSALONIKI"},
    "American University of Nicosia": {"podio_id": 59, "lc": "Aegean"},
    "Aristotle University of Thessaloniki": {"podio_id": 42, "lc": "AUTH"},
    "Athens Information Technology College": {"podio_id": 50, "lc": "Unipi"},
    "Athens IT College": {"podio_id": 15, "lc": "Unipi"},
    "Athens University of Economics & Business": {"podio_id": 51, "lc": "ATHENS"},
    "British Hellenic College": {"podio_id": 7, "lc": "ATHENS"},
    "Business College of Athens": {"podio_id": 8, "lc": "ATHENS"},
    "City College Thessaloniki": {"podio_id": 37, "lc": "UoM THESSALONIKI"},
    "City College Athens": {"podio_id": 90, "lc": "Unipi"},
    "Cyprus International Institute of Management": {"podio_id": 66, "lc": "Aegean"},
    "Cyprus University of Technology": {"podio_id": 60, "lc": "Aegean"},
    "DEI College": {"podio_id": 70, "lc": "UoM THESSALONIKI"},
    "Democretus University of Thrace": {"podio_id": 49, "lc": "DUTH"},
    "DEREE - ALBA": {"podio_id": 6, "lc": "ATHENS"},
    "European University of Cyprus": {"podio_id": 61, "lc": "Aegean"},
    "Frederick University": {"podio_id": 62, "lc": "Aegean"},
    "Global Training": {"podio_id": 12, "lc": "NKUA"},
    "Hellenic Open University": {"podio_id": 27, "lc": "Patras"},
    "IEK Akmi": {"podio_id": 26, "lc": "AUTH"},
    "IEK Akmi (Patras Department)": {"podio_id": 53, "lc": "Patras"},
    "IEK Domi": {"podio_id": 19, "lc": "Unipi"},
    "IEK SBIE": {"podio_id": 5, "lc": "ATHENS"},
    "International University": {"podio_id": 40, "lc": "UoM THESSALONIKI"},
    "International University of Macedonia": {"podio_id": 82, "lc": "UoM THESSALONIKI"},
    "Ionian University": {"podio_id": 44, "lc": "AUTH"},
    "IST College": {"podio_id": 10, "lc": "NKUA"},
    "KES College": {"podio_id": 64, "lc": "Aegean"},
    "Mediterranean Agronomic Institute of Chania": {"podio_id": 57, "lc": "Crete"},
    "Mediterranean College": {"podio_id": 16, "lc": "AUTH"},
    "Mediterranean College (Athens Department)": {"podio_id": 73, "lc": "Unipi"},
    "Mediterranean College (Thessaloniki Department)": {"podio_id": 16, "lc": "AUTH"},  # Added missing entry
    "Mediterranean Insitute Chania": {"podio_id": 23, "lc": "Crete"},
    "National Kapodistrian University of Athens": {"podio_id": 11, "lc": "NKUA"},
    "National Technical University of Athens": {"podio_id": 9, "lc": "NKUA"},
    "Neapolis University Paphos": {"podio_id": 63, "lc": "Aegean"},
    "New York College": {"podio_id": 18, "lc": "AUTH"},
    "New York College (Athens's Department)": {"podio_id": 81, "lc": "Unipi"},
    "Open University of Cyprus": {"podio_id": 67, "lc": "Aegean"},
    "Panteion University": {"podio_id": 14, "lc": "Unipi"},
    "QS College": {"podio_id": 1, "lc": "ATHENS"},
    "Technical University of Crete": {"podio_id": 24, "lc": "Crete"},
    "TEI Chalkidas": {"podio_id": 13, "lc": "NKUA"},
    "TEI Kalamata": {"podio_id": 28, "lc": "Patras"},
    "TEI Kavalas": {"podio_id": 34, "lc": "UoM THESSALONIKI"},
    "TEI Messolonghi": {"podio_id": 30, "lc": "Patras"},
    "TEI of Crete": {"podio_id": 22, "lc": "Crete"},
    "TEI of Epirus": {"podio_id": 83, "lc": "UoI"},
    "TEI of Ionian Islands": {"podio_id": 43, "lc": "AUTH"},
    "TEI of Kalamata": {"podio_id": 72, "lc": "Patras"},
    "TEI of Lamia": {"podio_id": 47, "lc": "Volos"},
    "TEI of Larisa": {"podio_id": 45, "lc": "Volos"},
    "TEI of Patras": {"podio_id": 25, "lc": "Patras"},
    "TEI of Serres": {"podio_id": 41, "lc": "AUTH"},
    "TEI Thessalonikis": {"podio_id": 32, "lc": "UoM THESSALONIKI"},
    "TEI Western Macedonia": {"podio_id": 36, "lc": "UoM THESSALONIKI"},
    "University of Aegean": {"podio_id": 80, "lc": "Aegean"},
    "University of Athens": {"podio_id": 2, "lc": "ATHENS"},
    "University of Central Greece": {"podio_id": 46, "lc": "Volos"},
    "University of Crete": {"podio_id": 21, "lc": "Crete"},
    "University of Cyprus": {"podio_id": 58, "lc": "Aegean"},
    "University of Ioannina": {"podio_id": 84, "lc": "UoI"},
    "University of Macedonia": {"podio_id": 35, "lc": "UoM THESSALONIKI"},
    "University of Nicosia": {"podio_id": 65, "lc": "Aegean"},
    "University of Patras": {"podio_id": 31, "lc": "Patras"},
    "University of Peloponnese (Kalamata's Department)": {"podio_id": 29, "lc": "Patras"},
    "University of Peloponnese (Korinth's Department)": {"podio_id": 74, "lc": "Patras"},
    "University of Peloponnese (Nafplio's Department)": {"podio_id": 85, "lc": "Patras"},
    "University of Peloponnese (Sparta's Department)": {"podio_id": 87, "lc": "Patras"},
    "University of Peloponnese (Tripolis' Department)": {"podio_id": 86, "lc": "Patras"},
    "University of Piraeus": {"podio_id": 20, "lc": "Unipi"},
    "University of Thessaly": {"podio_id": 48, "lc": "Volos"},
    "University of Western Attica": {"podio_id": 17, "lc": "Unipi"},
    "University of Western Macedonia": {"podio_id": 33, "lc": "UoM THESSALONIKI"},
    "Vakalo Art & Design College": {"podio_id": 3, "lc": "ATHENS"},
    "Harokopio University of Athens": {"podio_id": 89, "lc": "ATHENS"},
    "American College of Greece": {"podio_id": 78, "lc": "ATHENS"},
    "Athens School of Fine Arts": {"podio_id": 2, "lc": "ATHENS"},
    "Athens University of Economics and Business": {"podio_id": 51, "lc": "ATHENS"},
    "Harokopio University": {"podio_id": 89, "lc": "ATHENS"},
    "Hellenic American University": {"podio_id": 7, "lc": "ATHENS"},
    "National and Kapodistrian University of Athens": {"podio_id": 11, "lc": "NKUA"},
    "Alexandrion TEI of Thessaloniki": {"podio_id": 32, "lc": "UoM THESSALONIKI"},
    "Technological Educational Institute of Athens": {"podio_id": 17, "lc": "Unipi"},
    "Technological Educational Institute of Central Macedonia": {"podio_id": 41, "lc": "AUTH"},
    "Technological Educational Institute of Crete": {"podio_id": 22, "lc": "Crete"},
    "Technological Educational Institute of Epirus": {"podio_id": 83, "lc": "UoI"},
    "Technological Educational Institute of Ionian Islands": {"podio_id": 43, "lc": "AUTH"},
    "Technological Educational Institute of Kalamata": {"podio_id": 72, "lc": "Patras"},
    "Technological Educational Institute of Lamia": {"podio_id": 47, "lc": "Volos"},
    "Technological Educational Institute of Patras": {"podio_id": 25, "lc": "Patras"},
    "Technological Educational Institute of Piraeus": {"podio_id": 17, "lc": "Unipi"},
    "Technological Educational Institute of Serres": {"podio_id": 41, "lc": "AUTH"},
    "Technological Educational Institute of Sterea Ellada": {"podio_id": 13, "lc": "NKUA"},
    "Technological Educational Institute of Thessaly": {"podio_id": 45, "lc": "Volos"},
    "Technological Educational Institute of Western Greece": {"podio_id": 25, "lc": "Patras"},
    "Technological Educational Institute of Western Macedonia": {"podio_id": 36, "lc": "UoM THESSALONIKI"},
    "University of Peloponnese": {"podio_id": 86, "lc": "Patras"},
    "Other": {"podio_id": 2, "lc": "ATHENS"},
}

# Department Mappings from departments.json: Department Name -> Podio ID
DEPARTMENT_DATA = {
    "Accounting": 1,
    "Anthropology": 61,
    "Archaeology": 62,
    "Architecture": 2,
    "Arts": 3,
    "Astronomy": 47,
    "Automotive Engineering": 4,
    "Banking": 5,
    "Biology": 56,
    "Business Administration": 6,
    "Chemical Engineering": 7,
    "Chemistry": 8,
    "Cinema": 59,
    "Civil Engineering": 9,
    "Communication and Journalism": 10,
    "Computer Engineering": 11,
    "Computer Sciences": 12,
    "Cultural Studies": 49,
    "Dance": 60,
    "Dentistry": 52,
    "Economics": 13,
    "Education": 14,
    "Electrical Engineering": 15,
    "Entrepreneurship": 16,
    "Finance": 17,
    "Geography": 43,
    "Geology": 44,
    "Geophysics": 63,
    "Graphic Design": 18,
    "History": 42,
    "Human Resources": 19,
    "Industrial Design": 20,
    "Industrial Engineering": 21,
    "International Relations": 22,
    "International Trade": 23,
    "Languages": 24,
    "Law": 53,
    "Logistics": 25,
    "Marketing": 26,
    "Material Engineering": 27,
    "Mathematics": 28,
    "Mechanical Engineering": 29,
    "Media Arts": 30,
    "Medicine": 31,
    "Meteorology": 48,
    "Music": 41,
    "Nursing": 50,
    "Oceanography": 46,
    "Other": 32,
    "Pharmacy": 51,
    "Phylosophy": 40,
    "Physical Education": 55,
    "Physics": 45,
    "Physiotherapy": 65,
    "Policital Sciences": 37,
    "Psychology": 38,
    "Public Administration": 33,
    "Public Relations": 34,
    "Social Work": 35,
    "Sociology": 39,
    "Software Development and Programming": 36,
    "Statistics": 64,
    "Theatre": 54,
    "Theology": 57,
    "Visual Arts": 58,
}


def get_university_mapping(university_name):
    """
    Get complete mapping for a university including LC and Podio IDs
    
    Returns:
        dict with keys: lc_id, lc_podio_id, university_podio_id
        None if university not found
    """
    university = UNIVERSITY_DATA.get(university_name)
    if not university:
        return None
    
    lc_name = university['lc']
    lc_info = LC_DATA.get(lc_name)
    
    if not lc_info:
        return None
    
    return {
        'lc_id': lc_info['expa_id'],  # EXPA LC ID
        'lc_podio_id': lc_info['podio_id'],  # Podio LC ID
        'university_podio_id': university['podio_id'],  # Podio University ID
        'lc_name': lc_name  # Podio LC Name (for Category fields)
    }


def get_department_mapping(department_name):
    """Get Podio ID for a department"""
    # First try direct match
    direct_match = DEPARTMENT_DATA.get(department_name)
    if direct_match:
        return direct_match
    
    # Handle simplified frontend values - map to default departments
    # Case-insensitive mapping for frontend lowercase values
    simplified_mappings = {
        'engineering': 11,  # Computer Engineering as default
        'Engineering': 11,
        'business': 6,  # Business Administration
        'Business': 6,
        'arts': 3,  # Arts
        'Arts': 3,
        'Arts & Humanities': 3,
        'science': 12,  # Computer Sciences
        'Science': 12,
        'mathematics': 12,  # Map mathematics to Computer Sciences (STEM)
        'Mathematics': 12,
        'languages': 3,  # Map languages to Arts & Humanities
        'Languages': 3,
        'education': 3,  # Map education to Arts & Humanities
        'Education': 3,
        'medicine': 31,  # Medicine
        'Medicine': 31,
        'law': 53,  # Law
        'Law': 53,
        'other': 32,  # Other
        'Other': 32,
    }
    
    return simplified_mappings.get(department_name, DEPARTMENT_DATA.get(department_name))
