import React from 'react';

// Define the CellCount interface
interface CellCount {
  name: string;
  count: number;
  percentage: number;
}

// Define mock data for RBC, WBC, and Platelets
const rbcData: CellCount[] = [
  { name: 'Angled Cells', count: 222, percentage: 67 },
  { name: 'Borderline Ovalocytes', count: 50, percentage: 20 },
  { name: 'Burr Cells', count: 87, percentage: 34 },
  { name: 'Fragmented Cells', count: 2, percentage: 0.12 },
];

const wbcData: CellCount[] = [
  { name: 'Basophil', count: 222, percentage: 67 },
  { name: 'Eosinophil', count: 50, percentage: 20 },
  { name: 'Lymphocyte', count: 87, percentage: 34 },
  { name: 'Monocyte', count: 2, percentage: 0.12 },
];

const plateletData: CellCount[] = [
  { name: 'Platelet Count', count: 222, percentage: 100 },
];

// The CellCountTable component
interface CellCountTableProps {
  title: string;
  data: CellCount[];
}

export function CellCountTable({ title, data }: CellCountTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Cell Type</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Count</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-900 text-right">{item.count}</td>
                <td className="px-4 py-2 text-sm text-gray-900 text-right">{item.percentage.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main InfoPanel component
export const InfoPanel: React.FC = () => {
  return (
    <div className="bg-white p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Slide Information</h2>
      {/* RBC Table */}
      <CellCountTable title="RBC" data={rbcData} />
      {/* WBC Table */}
      <CellCountTable title="WBC" data={wbcData} />
      {/* Platelet Table */}
      <CellCountTable title="Platelets" data={plateletData} />
    </div>
  );
};
