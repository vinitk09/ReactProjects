import React, { useState, useRef, useEffect } from 'react';
import { Microscope, X } from 'lucide-react';
import wsi from "../src/assets/wsi.png";
import { InfoPanel } from './components/InfoPanel';

const Viewer = React.forwardRef<HTMLDivElement, { imageUrl: string; zoomLevel: number; isFullScreen: boolean }>(
  ({ imageUrl, zoomLevel, isFullScreen }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-full h-full overflow-auto bg-gray-100 flex justify-center items-center ${
          isFullScreen ? 'fixed inset-0 z-50 bg-white' : ''
        }`}
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center',
        }}
      >
        <img src={imageUrl} alt="WSI" className={`max-w-none ${isFullScreen ? 'max-h-screen' : ''}`} />
        {isFullScreen && (
          <button
            // onClick={toggleFullPage}
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full shadow-lg hover:bg-gray-200 transition-colors"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        )}
      </div>
    );
  }
);

const ResizablePanel: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
}> = ({ left, right, defaultSize = 300, minSize = 300 }) => {
  const [size, setSize] = useState(defaultSize);

  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSize(e.clientX - rect.left);
  };

  return (
    <div className="flex h-full">
      <div style={{ width: size }} className="border-r border-gray-200 overflow-hidden">
        {left}
      </div>
      <div
        className="relative cursor-col-resize"
        onMouseDown={handleResize}
        style={{ width: '12px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      ></div>
      <div style={{ flex: '1' }} className="overflow-hidden">
        {right}
      </div>
    </div>
  );
};

function App() {
  const sampleImage = wsi;

  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pointerPosition, setPointerPosition] = useState({ x: 50, y: 50 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const mainViewRef = useRef<HTMLDivElement>(null);

  const toggleReportDialog = () => {
    setIsReportDialogOpen(!isReportDialogOpen);
  };

  const handleReportSubmit = () => {
    console.log("Report submitted:", reportMessage);
    alert("Report submitted successfully!");
    setReportMessage("");
    setIsReportDialogOpen(false);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom * 1.2, 10));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom / 1.2, 0.1));
  };

  const handlePointerDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPointerPosition({ x, y });
  };

  useEffect(() => {
    if (mainViewRef.current) {
      mainViewRef.current.scrollLeft = (pointerPosition.x / 100) * mainViewRef.current.scrollWidth;
      mainViewRef.current.scrollTop = (pointerPosition.y / 100) * mainViewRef.current.scrollHeight;
    }
  }, [pointerPosition]);

  const toggleFullPage = () => {
    setIsFullScreen((prevState) => !prevState);
  };

  return (
    <div className={`h-screen flex flex-col relative ${isFullScreen ? 'overflow-hidden' : ''}`}>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Microscope className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">WSI Viewer</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export
            </button>
            <button
              id="full-page"
              onClick={toggleFullPage}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {isFullScreen ? 'Exit Full Page' : 'Full Page'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden relative">
        <ResizablePanel
          left={<InfoPanel />}
          right={
            <div className="relative h-full">
              <Viewer imageUrl={sampleImage} zoomLevel={zoomLevel} ref={mainViewRef} isFullScreen={isFullScreen} />
              <div
                className="absolute top-6 right-6 bg-white border border-gray-300 rounded shadow-lg p-1 w-24 h-24 cursor-move"
                onDragOver={handlePointerDrag}
              >
                <img src={sampleImage} alt="Hub view" className="w-full h-full object-cover" />
                <div
                  className="absolute border border-blue-500 pointer-events-none"
                  style={{
                    width: '20%',
                    height: '20%',
                    top: `${pointerPosition.y}%`,
                    left: `${pointerPosition.x}%`,
                  }}
                ></div>
              </div>

              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 space-x-4 flex items-center">
                <button
                  onClick={handleZoomOut}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </button>
              </div>
            </div>
          }
          defaultSize={400}
          minSize={300}
        />
      </div>

      <div className="fixed bottom-6 right-6 flex gap-4">
        <button
          onClick={toggleReportDialog}
          className="p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          Report
        </button>
      </div>

      {isReportDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Submit a Report</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your report here..."
              rows={5}
              value={reportMessage}
              onChange={(e) => setReportMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={toggleReportDialog}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;