// // src/pages/ReportPage.tsx
// import React, { useState } from 'react';

// const ReportPage: React.FC = () => {
//   const [report, setReport] = useState<string>('');

//   const handleReportSubmit = () => {
//     // Here, you can add functionality to send the report to the main person, e.g., API call.
//     console.log("Report submitted:", report);
//     alert("Report submitted successfully!");
//     setReport(''); // Clear the input field after submission
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg p-6 rounded-lg w-1/3">
//         <h2 className="text-xl font-semibold mb-4">Submit a Report</h2>
//         <textarea
//           className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//           placeholder="Enter your report here..."
//           rows={5}
//           value={report}
//           onChange={(e) => setReport(e.target.value)}
//         ></textarea>
//         <button
//           onClick={handleReportSubmit}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
//         >
//           Submit Report
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReportPage;
