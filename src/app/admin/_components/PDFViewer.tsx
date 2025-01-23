"use client";

import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { Button } from "@/components/ui/button"; // Import your Button component
import "react-pdf/dist/esm/Page/TextLayer.css"; // Import TextLayer styles
import "react-pdf/dist/esm/Page/AnnotationLayer.css"; // Import AnnotationLayer styles

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function PDFViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  // Handle document load success
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  // Go to the previous page
  const goToPreviousPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Go to the next page
  const goToNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages || 1));
  };

  // Get the container width dynamically
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Update the container width on mount and window resize
    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", updateContainerWidth);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* PDF Viewer */}
      <div
        ref={containerRef}
        className="overflow-auto border border-gray-200 rounded-lg"
      >
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            width={containerWidth || undefined} // Set the width dynamically
          />
        </Document>
      </div>

      {/* Page navigation controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button
          onClick={goToPreviousPage}
          disabled={pageNumber <= 1} // Disable if on the first page
          variant="outline"
        >
          Previous
        </Button>
        <p className="text-gray-600">
          Page {pageNumber} of {numPages}
        </p>
        <Button
          onClick={goToNextPage}
          disabled={pageNumber >= (numPages || 1)} // Disable if on the last page
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default PDFViewer;