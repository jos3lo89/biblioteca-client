import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { Document, Page, pdfjs } from "react-pdf";

// Styling for PDF layers
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  RotateCw,
  Search,
  BookOpen,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Configure PDF.js Worker to use unpkg CDN for high reliability.
 */
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * BookReadingPage - High-End Scholarly PDF Viewer.
 * Features:
 * - Full-screen immersive layout.
 * - Precision Zoom Controls.
 * - Fluid Page Navigation.
 * - Scholarly Dark Theme.
 * - Security: Context menu disabled.
 */
const BookReadingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookForReading } = useBook();

  // PDF State
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);

  // Container ref for responsive width calculations
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Security: Discourage saving via context menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  // Update container width for responsive PDF rendering
  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth - 48); // minus padding
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  /**
   * Data Fetching
   */
  const { data: book, isLoading, isError } = getBookForReading(id || "");

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber((prev) =>
      Math.min(Math.max(1, prev + offset), numPages || 1),
    );
  };

  const handleZoom = (delta: number) => {
    setScale((prev) => Math.min(Math.max(0.5, prev + delta), 3.0));
  };

  if (!id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b1120]">
        <ErrorState
          title="Acceso Denegado"
          message="Identificador de manuscrito faltante."
          onRetry={() => navigate("/")}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b1120]">
        <LoadingState message="Preparando el lector del acervo..." />
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b1120]">
        <ErrorState
          title="Error de Carga"
          message="No se pudo recuperar el flujo de datos del libro."
          onRetry={() => navigate(`/book/${id}`)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0b1120] text-slate-100 overflow-hidden font-sans">
      {/* 1. Sticky Professional Header */}
      <header className="h-16 flex items-center justify-between px-6 bg-[#0b1120] border-b border-white/10 z-50">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/book/${id}`)}
            className="text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Cerrar Lector</span>
          </Button>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#b59a5d]" />
            <span className="font-bold text-sm tracking-tight hidden md:inline truncate max-w-[300px]">
              Lectura Digital de Seguridad
            </span>
          </div>
        </div>

        {/* Header Center: Page Navigation Control */}
        <div className=" lg:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1 gap-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white"
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 px-2 text-sm font-bold">
              <span className="text-[#b59a5d]">{pageNumber}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">{numPages || "..."}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white"
              onClick={() => changePage(1)}
              disabled={pageNumber >= (numPages || 1)}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Header Right: Metadata & Search Help */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Sesión Protegida
            </span>
            <span className="text-[10px] font-bold text-[#b59a5d]">
              ID: {id.slice(0, 8)}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-[#b59a5d]"
          >
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* 2. Main Reader Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Scrollable Document Wrapper */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden flex justify-center p-6 md:p-12 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent custom-reader-scroller"
        >
          <div className="relative  animate-in fade-in zoom-in-95 duration-700 origin-top">
            <Document
              file={book.url}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<LoadingState message="Cifrando páginas..." />}
              error={
                <ErrorState
                  title="Falla crítica"
                  message="El archivo PDF no pudo ser procesado."
                />
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                rotate={rotation}
                width={containerWidth ? containerWidth : undefined}
                className="rounded-lg overflow-hidden border border-white/20 select-none shadow-2xl"
                loading={
                  <div className="h-[800px] w-full  animate-pulse rounded-lg" />
                }
                renderAnnotationLayer={true}
                renderTextLayer={true}
              />
            </Document>

            {/* Elegant Corner Decorative - Virtual Library Signature */}
            {/* <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#b59a5d]/40 rounded-tl-3xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#b59a5d]/40 rounded-br-3xl pointer-events-none" /> */}
          </div>
        </div>

        {/* Quick Navigation Floating Controls (Mobile/Compact) */}
        {/* <div className="absolute bottom-8 right-8 flex flex-col gap-3 lg:hidden">
          <Button
            className="w-12 h-12 rounded-full bg-[#b59a5d] text-[#0b1120] shadow-2xl"
            onClick={() => changePage(1)}
            disabled={pageNumber >= (numPages || 1)}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
          <Button
            className="w-12 h-12 rounded-full bg-[#b59a5d] text-[#0b1120] shadow-2xl"
            onClick={() => changePage(1)}
            disabled={pageNumber >= (numPages || 1)}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div> */}
      </main>

      {/* 3. Immersive Toolbar Footer */}
      <footer className="h-14 bg-[#0d1627] border-t border-white/5 flex items-center justify-center px-6 gap-6 z-50">
        {/* Zoom Controls Section */}
        <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-white"
            onClick={() => handleZoom(-0.1)}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <div className="px-3 text-[10px] font-black text-slate-400 select-none uppercase tracking-tighter w-14 text-center">
            {Math.round(scale * 100)}%
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-white"
            onClick={() => handleZoom(0.1)}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        <div className="h-4 w-px bg-white/5" />

        {/* View Controls Section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            title="Ajustar Ancho"
            className="h-9 w-9 text-slate-400 hover:text-white hover:bg-white/10"
            onClick={() => {
              setScale(1.0);
              updateWidth();
            }}
          >
            <Maximize className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="Rotar Documento"
            className="h-9 w-9 text-slate-400 hover:text-white hover:bg-white/10"
            onClick={() => setRotation((prev) => (prev + 90) % 360)}
          >
            <RotateCw className="w-5 h-5" />
          </Button>
        </div>

        <div className="h-4 w-px bg-white/5 hidden sm:block" />

        {/* Search indicator */}
        <div className="hidden sm:flex items-center gap-3 text-slate-600">
          <Search className="w-4 h-4" />
          <span className="text-[10px] uppercase font-bold tracking-widest hidden md:inline">
            Presione Ctrl+F para buscar
          </span>
        </div>
      </footer>

      {/* Global Watermark Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none" />
    </div>
  );
};

export default BookReadingPage;
