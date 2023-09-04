import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';


// Configure the worker path for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



const PDFViewer= ({ url }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [fileUrl, setFileUrl] = useState("")

    useEffect(() => {
        console.log('url',url)
       setFileUrl(url);
    }, [url])



    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div>
            <div className="pdf-container">
                <div className="pdf-content">
                    <Document
                        file={fileUrl ? fileUrl : ""}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                scale={4}
                            />
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    );
};

export default PDFViewer