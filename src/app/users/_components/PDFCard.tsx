"use client";

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import usePdfStore from '@/store/usePDFStore';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import PDFViewer from '@/app/admin/_components/PDFViewer';

function PDFCard() {
    const { pdf, fetchPdf, loading, error } = usePdfStore();
    const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null); // Track the selected PDF URL

    useEffect(() => {
        fetchPdf();
    }, [fetchPdf]);

    console.log("Fetched PDFs:", pdf);

    const handleView = (pdfUrl: string) => {
        setSelectedPdfUrl(pdfUrl); // Set the selected PDF URL
    };
    
    if (loading)
        return (
            <div className="flex justify-center items-center my-5">
                <Loader className="animate-spin" />
            </div>
        );
    
    if (error)
        return (
            <div className="flex justify-center items-center my-5">
                <p className="text-red-500">{error}</p>
            </div>
        );
    
    if (pdf.length === 0)
        return (
            <div className="flex justify-center items-center my-5">
                <p className="text-gray-500">No PDFs found.</p>
            </div>
        );
    return (
        <div>
        <div className="sm:px-6 lg:px-8 w-full p-5">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-12">
            Study Materials
          </h1>
          <Card className="p-4 my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pdf.length > 0 &&
          pdf?.map((pdf) => (
            <div key={pdf.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-4">
                <h3 className="font-semibold text-lg">{pdf.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600">{pdf.description}</p>
                <div className="flex flex-col gap-3 mt-4">
                  <Button onClick={() => handleView(pdf.pdfFile)}>View PDF</Button>
                </div>
              </div>
              <Separator />
            </div>
          ))}
      </div>

      {/* Modal for PDF Viewer */}
      {selectedPdfUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">PDF Viewer</h2>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <PDFViewer url={selectedPdfUrl} />
            </div>
            <div className="p-4 border-t">
              <Button onClick={() => setSelectedPdfUrl(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
        </div>
      </div>
    </div>  
  )
}

export default PDFCard
