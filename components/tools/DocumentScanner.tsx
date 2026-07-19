"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Camera, FileText, X, Check, AlertCircle, Loader2, FileImage, FileType, Info } from "lucide-react";

interface ExtractedData {
  hsCode?: string;
  productDescription?: string;
  cifValue?: number;
  currency?: string;
  originCountry?: string;
  destinationCountry?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  rawText: string;
  confidence: number;
  documentType?: string;
}

interface DocumentScannerProps {
  onDataExtracted: (data: ExtractedData) => void;
  label?: string;
}

const API_URL = process.env.NEXT_PUBLIC_OCR_API_URL || "http://localhost:8000";

export default function DocumentScanner({
  onDataExtracted,
  label = "📄 Upload Document to Auto-fill"
}: DocumentScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPDF, setIsPDF] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  const processImage = async (file: File) => {
    setIsScanning(true);
    setError(null);
    setIsPDF(false);

    try {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("File size must be less than 10MB");
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG, WebP, and PDF files are supported");
      }

      // Create preview
      if (file.type === 'application/pdf') {
        setIsPDF(true);
        setPreview("PDF");
      } else {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      }

      // Send to Python OCR service
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_URL}/api/ocr/scan`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setExtractedData(result.data);
        onDataExtracted(result.data);
      } else {
        throw new Error(result.error || 'Failed to extract data from document');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to process document';
      setError(errorMsg);
      console.error('Document scanning error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleClearScan = () => {
    setPreview(null);
    setExtractedData(null);
    setError(null);
    setIsPDF(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (confidence >= 0.6) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="w-full space-y-4">
      {label && (
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-green-700" />
          <label className="text-sm font-bold text-gray-900">
            {label}
          </label>
        </div>
      )}

      {/* Upload Area */}
      {!preview && !isScanning && (
        <div className="space-y-3">
          {/* Single unified upload section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* File Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center p-8 sm:p-10 border-2 border-dashed border-gray-200 rounded-2xl hover:border-green-700 hover:bg-green-50/40 transition-all cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 group-hover:bg-green-100 flex items-center justify-center mb-4 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 group-hover:text-green-700 transition-colors" />
              </div>
              <span className="text-base font-bold text-gray-900 mb-1">Upload Document</span>
              <span className="text-sm text-gray-500">PDF, JPG, PNG</span>
              <span className="text-xs text-gray-400 mt-2">Max 10MB</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Camera Capture - Always visible, browser handles availability */}
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="flex flex-col items-center justify-center p-8 sm:p-10 border-2 border-dashed border-gray-200 rounded-2xl hover:border-green-700 hover:bg-green-50/40 transition-all cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 group-hover:bg-green-100 flex items-center justify-center mb-4 transition-colors">
                <Camera className="w-8 h-8 text-gray-400 group-hover:text-green-700 transition-colors" />
              </div>
              <span className="text-base font-bold text-gray-900 mb-1">
                {isMobile ? "Take Photo" : "Use Camera"}
              </span>
              <span className="text-sm text-gray-500">Quick capture</span>
              <span className="text-xs text-gray-400 mt-2">
                {isMobile ? "Device camera" : "If available"}
              </span>
            </button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Scanning Loader */}
      {isScanning && (
        <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 shadow-sm">
          <Loader2 className="w-12 h-12 text-green-700 animate-spin mb-4" />
          <p className="text-base font-bold text-gray-900 mb-1">Processing Document...</p>
          <p className="text-sm text-gray-600">Extracting customs information using AI</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
            <span>OCR in progress</span>
          </div>
        </div>
      )}

      {/* Preview and Results */}
      {preview && !isScanning && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md">
          {/* Image/PDF Preview Header */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100">
            {!isPDF && preview !== "PDF" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Scanned document"
                className="w-full h-56 sm:h-64 object-cover"
              />
            ) : (
              <div className="w-full h-56 sm:h-64 flex flex-col items-center justify-center">
                <FileType className="w-20 h-20 text-gray-400 mb-3" />
                <p className="text-gray-600 font-medium">PDF Document Uploaded</p>
                <p className="text-sm text-gray-400">First page will be scanned</p>
              </div>
            )}
            <button
              type="button"
              onClick={handleClearScan}
              className="absolute top-4 right-4 p-2.5 bg-black/70 hover:bg-black/90 text-white rounded-full transition-all shadow-lg backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Extracted Data */}
          {extractedData && (
            <div className="p-5 sm:p-6 space-y-4">
              {/* Document Type & Confidence */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Document Type</p>
                    <p className="text-sm font-bold text-gray-900">
                      {extractedData.documentType || 'Document Detected'}
                    </p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg text-sm font-bold border ${getConfidenceColor(extractedData.confidence)}`}>
                  {Math.round(extractedData.confidence * 100)}% Match
                </div>
              </div>

              {/* Extracted Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extractedData.hsCode && (
                  <div className="flex items-start gap-3 p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-emerald-700 font-medium block mb-1">HS Code</span>
                      <span className="font-bold text-gray-900 block truncate">{extractedData.hsCode}</span>
                    </div>
                  </div>
                )}

                {extractedData.cifValue && (
                  <div className="flex items-start gap-3 p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-emerald-700 font-medium block mb-1">CIF Value</span>
                      <span className="font-bold text-gray-900 block truncate">
                        {extractedData.currency} {extractedData.cifValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {extractedData.productDescription && (
                  <div className="flex items-start gap-3 p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 sm:col-span-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-emerald-700 font-medium block mb-1">Product Description</span>
                      <span className="font-bold text-gray-900 block">{extractedData.productDescription}</span>
                    </div>
                  </div>
                )}

                {extractedData.originCountry && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-500 font-medium">Origin:</span>
                    <span className="font-bold text-gray-900 text-sm">{extractedData.originCountry}</span>
                  </div>
                )}

                {extractedData.destinationCountry && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-500 font-medium">Destination:</span>
                    <span className="font-bold text-gray-900 text-sm">{extractedData.destinationCountry}</span>
                  </div>
                )}

                {extractedData.invoiceNumber && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-500 font-medium">Invoice:</span>
                    <span className="font-bold text-gray-900 text-sm">{extractedData.invoiceNumber}</span>
                  </div>
                )}

                {extractedData.invoiceDate && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-500 font-medium">Date:</span>
                    <span className="font-bold text-gray-900 text-sm">{extractedData.invoiceDate}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleClearScan}
                  className="flex-1 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors shadow-sm"
                >
                  Scan Another Document
                </button>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-5 bg-rose-50 border-t border-rose-100">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4 text-rose-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-rose-900 mb-1">Scanning Error</p>
                  <p className="text-sm text-rose-700">{error}</p>
                  {error.toLowerCase().includes('fetch') && (
                    <p className="text-xs text-rose-600 mt-2">
                      💡 Make sure the Python OCR service is running on port 8000
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Helper Text */}
      <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong className="font-bold">Supported documents:</strong> Commercial Invoice, Packing List, Bill of Lading (PDF or Image). 
          The AI will automatically extract HS codes, values, and country information to speed up your calculation.
        </p>
      </div>
    </div>
  );
}
