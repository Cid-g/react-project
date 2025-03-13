export const ROLES = {
    ADMIN: "Admin",
    TEACHER: "Teacher",
    STUDENT: "Student",
  };

  export const drawerWidth = 240;

  export const colleges = [
    "College of Engineering and Technology",
    "College of Arts and Sciences",
    "College of Business and Management",
    "College of Agriculture and Forestry"
  ];
  
  export const availableCourses = {
    "College of Engineering and Technology": [
      "BS Information Technology",
      "BS Computer Science",
      "BS Civil Engineering",
      "BS Electrical Engineering",
      "BS Mechanical Engineering"
    ],
    "College of Arts and Sciences": [
      "BS Psychology",
      "BS Education"
    ],
    "College of Business and Management": [
      "BS Business Administration",
      "BS Accountancy",
      "BS Hospitality Management",
      "BS Tourism Management"
    ],
    "College of Agriculture and Forestry": [
      "BS Agriculture",
      "BS Forestry",
      "BS Environmental Science",
      "BS Food Technology"
    ]
  };

  export const yearLevels = [
    "First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year", "Sixth Year"
  ];
  
  export const sections = ["A", "B", "C", "D", "E"];

  export  const months = ["January", "February", "March","April", "May",
    "June", "July", "August","September",
    "October", "November", "December"];

  export  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  export const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

  
  