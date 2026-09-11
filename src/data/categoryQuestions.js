// Defines the question(s) shown in the modal for each care log category.
export const categoryQuestions = {
  "Food Intake": [
    {
      question: "EATING: SELF PERFORMANCE - How does resident eats and drinks, regardless of skill. Do not include eating/drinking during mediacation pass.",
      options: [
        "INDEPENDENT - No help or staff oversight at any time",
        "SUPERVISION - Oversight, encouragement or cueing",
        "LIMITED ASSISTANCE - Resident highly involved in activity; staff providing guided or other non-weight-bearing assistance",
        "EXTENSIVE ASSISTANCE - Resident involved in activity, staff provide weight-bearing support",
        "TOTAL DEPENDENCE - Full staff performance",
      ],
    },
    {
      question: "How much did they eat?",
      options: ["0-25%", "25-50%", "50-75%", "75-100%"],
    },
  ],

  "Fluid Intake": [
    {
      question: "How many cups of fluid?",
      type: "number",
    },
  ],

  "Bowel Movement": [
    {
      question: "Did the client have a BM?",
      options: ["Yes", "No"],
    },
    {
      question: "What type?",
      options: ["Normal", "Loose", "Hard", "Constipated", "N/A"],
    //   showIf: { questionIndex: 0, equals: "Yes" },
    },
  ],

  "Transfer": [
    {
      question: "How did the client transfer?",
      options: [
        "Independent",
        "Supervision",
        "Limited Assistance",
        "Extensive Assistance",
        "Total Dependence",
      ],
    },
    {
      question: "Support provided?",
      options: [
        "No setup or physical help from staff",
        "Setup help only",
        "One person physical assist",
        "Two person physical assist",
      ],
    },
  ],

  "General Note": [
    {
      question: "Note",
      type: "text",
    },
  ],
};