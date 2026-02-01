import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BooksTable from "../components/BooksTable";

/**
 * ListBooksPage - Administrative view for managing the virtual library's book collection.
 */
const ListBooksPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Archivo de <span className="text-[#b59a5d]">Tomos Virtuales</span>
          </h1>
          {/* <p className="text-slate-400 font-serif italic text-lg leading-relaxed">
            Gestione la colección de manuscritos y obras digitales del acervo.
          </p> */}
          <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2" />
        </div>

        <Link to="/admin/books/create">
          <Button className="h-12 px-6 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-widest hover:bg-[#c6a96e] rounded-xl transition-all shadow-lg shadow-[#b59a5d]/20 flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Nuevo Registro
          </Button>
        </Link>
      </div>

      {/* Table Component */}
      <BooksTable />
    </div>
  );
};

export default ListBooksPage;
