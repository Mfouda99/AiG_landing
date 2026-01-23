"""
Member Application Mapping Service
Maps universities and departments to LC and Podio IDs for member signups
Based on data from form2/assets/data/
"""

# LC Mappings: LC Name -> (EXPA ID, Podio ID)
LC_MAPPINGS = {
    "AEGEAN": {"lc_id": 811, "podio_id": 1079},
    "ATHENS": {"lc_id": 834, "podio_id": 56},
    "AUTH": {"lc_id": 762, "podio_id": 64},
    "Crete": {"lc_id": 1880, "podio_id": 198},
    "DUTH": {"lc_id": 1883, "podio_id": 236},
    "Kalamata": {"lc_id": 2553, "podio_id": 1081},
    "NKUA": {"lc_id": 974, "podio_id": 615},
    "Patras": {"lc_id": 186, "podio_id": 941},
    "Unipi": {"lc_id": 1347, "podio_id": 666},
    "UoI": {"lc_id": 1882, "podio_id": 985},
    "UoM": {"lc_id": 1563, "podio_id": 1051},
    "UoM THESSALONIKI": {"lc_id": 1563, "podio_id": 1051},
    "UoT": {"lc_id": 2555, "podio_id": 1082},
}

# University Mappings: University Name -> (Podio ID, LC Name)
UNIVERSITY_MAPPINGS = {
    "Agricultural University": {"podio_id": 4, "lc": "ATHENS"},
    "Agricultural University of Athens": {"podio_id": 55, "lc": "ATHENS"},
    "AKMI College": {"podio_id": 38, "lc": "UoM THESSALONIKI"},
    "AKMI Mediterranean College": {"podio_id": 69, "lc": "UoM THESSALONIKI"},
    "American College of Greece": {"podio_id": 78, "lc": "ATHENS"},
    "American College of Thessaloniki": {"podio_id": 77, "lc": "UoM THESSALONIKI"},
    "American University of Nicosia": {"podio_id": 59, "lc": "AEGEAN"},
    "Aristotle University of Thessaloniki": {"podio_id": 42, "lc": "AUTH"},
    "Athens Information Technology College": {"podio_id": 50, "lc": "Unipi"},
    "Athens IT College": {"podio_id": 15, "lc": "Unipi"},
    "Athens University of Economics and Business": {"podio_id": 51, "lc": "ATHENS"},
    "British Hellenic College": {"podio_id": 7, "lc": "ATHENS"},
    "Business College of Athens": {"podio_id": 8, "lc": "ATHENS"},
    "City College Thessaloniki": {"podio_id": 37, "lc": "UoM THESSALONIKI"},
    "City College Athens": {"podio_id": 90, "lc": "Unipi"},
    "Cyprus International Institute of Management": {"podio_id": 66, "lc": "AEGEAN"},
    "Cyprus University of Technology": {"podio_id": 60, "lc": "AEGEAN"},
    "DEI College": {"podio_id": 70, "lc": "UoM THESSALONIKI"},
    "Democritus University of Thrace": {"podio_id": 49, "lc": "DUTH"},
    "Harokopio University": {"podio_id": 23, "lc": "ATHENS"},
    "Hellenic American University": {"podio_id": 53, "lc": "ATHENS"},
    "Hellenic Open University": {"podio_id": 72, "lc": "ATHENS"},
    "Ionian University": {"podio_id": 24, "lc": "UoI"},
    "National and Kapodistrian University of Athens": {"podio_id": 1, "lc": "NKUA"},
    "National Technical University of Athens": {"podio_id": 2, "lc": "ATHENS"},
    "Panteion University": {"podio_id": 3, "lc": "ATHENS"},
    "Technological Educational Institute of Athens": {"podio_id": 44, "lc": "ATHENS"},
    "Technological Educational Institute of Central Macedonia": {"podio_id": 45, "lc": "AUTH"},
    "Technological Educational Institute of Crete": {"podio_id": 46, "lc": "Crete"},
    "Technological Educational Institute of Epirus": {"podio_id": 47, "lc": "UoI"},
    "Technological Educational Institute of Ionian Islands": {"podio_id": 48, "lc": "UoI"},
    "Technological Educational Institute of Kalamata": {"podio_id": 73, "lc": "Kalamata"},
    "Technological Educational Institute of Lamia": {"podio_id": 74, "lc": "ATHENS"},
    "Technological Educational Institute of Patras": {"podio_id": 75, "lc": "Patras"},
    "Technological Educational Institute of Piraeus": {"podio_id": 76, "lc": "Unipi"},
    "Technological Educational Institute of Serres": {"podio_id": 79, "lc": "AUTH"},
    "Technological Educational Institute of Sterea Ellada": {"podio_id": 80, "lc": "ATHENS"},
    "Technological Educational Institute of Thessaly": {"podio_id": 81, "lc": "UoT"},
    "Technological Educational Institute of Western Greece": {"podio_id": 82, "lc": "Patras"},
    "Technological Educational Institute of Western Macedonia": {"podio_id": 83, "lc": "UoM"},
    "University of Crete": {"podio_id": 18, "lc": "Crete"},
    "University of Ioannina": {"podio_id": 25, "lc": "UoI"},
    "University of Macedonia": {"podio_id": 26, "lc": "UoM"},
    "University of Patras": {"podio_id": 27, "lc": "Patras"},
    "University of Peloponnese": {"podio_id": 28, "lc": "Patras"},
    "University of Piraeus": {"podio_id": 29, "lc": "Unipi"},
    "University of Thessaly": {"podio_id": 30, "lc": "UoT"},
    "University of Western Attica": {"podio_id": 84, "lc": "ATHENS"},
    "University of Western Macedonia": {"podio_id": 85, "lc": "UoM"},
    "Other": {"podio_id": 999, "lc": "ATHENS"},  # Default to Athens for Other
}

# Department Mappings: Department Name -> Podio ID
DEPARTMENT_MAPPINGS = {
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
    "Computer Science": 12,
    "Cultural Studies": 49,
    "Dance": 60,
    "Dentistry": 52,
    "Economics": 13,
    "Education": 14,
    "Electrical Engineering": 15,
    "Entrepreneurship": 16,
    "Finance": 17,
    "Food Science and Technology": 18,
    "Forestry": 57,
    "Geography": 50,
    "Geology": 51,
    "Health Management": 19,
    "History": 48,
    "Hotel Management": 20,
    "Industrial Engineering": 21,
    "Information Systems": 22,
    "International Relations": 23,
    "Journalism": 24,
    "Law": 25,
    "Linguistics": 53,
    "Management": 26,
    "Management Information Systems": 27,
    "Management Science": 28,
    "Marketing": 29,
    "Mathematics": 30,
    "Mechanical Engineering": 31,
    "Medicine": 32,
    "Music": 58,
    "Nursing": 33,
    "Nutrition and Dietetics": 34,
    "Pharmacy": 35,
    "Philosophy": 54,
    "Physical Education and Sport Science": 36,
    "Physics": 37,
    "Physiotherapy": 38,
    "Political Science": 39,
    "Primary Education": 40,
    "Psychology": 41,
    "Public Administration": 42,
    "Social Work": 43,
    "Sociology": 44,
    "Software Engineering": 45,
    "Statistics": 46,
    "Theatre Studies": 55,
    "Theology": 63,
    "Tourism": 64,
    "Veterinary Medicine": 65,
    "Other": 999,
}


def get_university_mapping(university_name):
    """
    Get LC and Podio mapping for a university
    
    Args:
        university_name (str): Name of the university
        
    Returns:
        dict or None: {'lc_id': int, 'lc_podio_id': int, 'university_podio_id': int}
    """
    university = UNIVERSITY_MAPPINGS.get(university_name)
    if not university:
        return None
    
    lc_info = LC_MAPPINGS.get(university['lc'])
    if not lc_info:
        return None
    
    return {
        'lc_id': lc_info['lc_id'],
        'lc_podio_id': lc_info['podio_id'],
        'university_podio_id': university['podio_id']
    }


def get_department_mapping(department_name):
    """
    Get Podio ID for a department
    
    Args:
        department_name (str): Name of the department
        
    Returns:
        int or None: Podio ID of the department
    """
    return DEPARTMENT_MAPPINGS.get(department_name)
