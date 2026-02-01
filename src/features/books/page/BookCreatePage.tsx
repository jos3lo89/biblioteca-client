import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBook } from "../hooks/useBook";
import { useCategory } from "@/features/category/hooks/useCategory";
import { bookSchema, type BookDto } from "../schemas/book.schema";
import {
  BookOpen,
  Image as ImageIcon,
  FileText,
  User,
  Layers,
  CheckCircle2,
  ArrowLeft,
  X,
  Upload,
  PlusCircle,
  Info,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const BookCreatePage = () => {
  const navigate = useNavigate();
  const { createBook } = useBook();
  const { getAllCategories } = useCategory();
  const [preview, setPreview] = useState<string | null>(null);
  const [createdBook, setCreatedBook] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookDto>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      isDownloadable: true,
    },
  });

  const coverFile = watch("cover");

  useEffect(() => {
    if (coverFile && coverFile[0]) {
      const file = coverFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [coverFile]);

  const onSubmit = (data: BookDto) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    if (data.description) formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);
    formData.append("isDownloadable", String(data.isDownloadable));
    formData.append("cover", data.cover[0]);
    formData.append("file", data.file[0]);

    createBook.mutate(formData, {
      onSuccess: (response) => {
        setCreatedBook(response);
      },
    });
  };

  const categories = getAllCategories.data || [];

  if (createdBook) {
    return (
      <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
        <Card className="bg-[#0d1627]/50 backdrop-blur-2xl border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden text-center p-12 space-y-8">
          <div className="flex justify-center">
            <div className="p-6 rounded-full bg-[#b59a5d]/10 text-[#b59a5d] border border-[#b59a5d]/20 scale-125">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white tracking-tight">
              ¡Registro Exitoso!
            </h2>
            <p className="text-slate-400 font-serif italic text-lg">
              El nuevo tomo ha sido catalogado correctamente en el acervo.
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center gap-6 text-left">
            <div className="w-20 h-28 rounded-xl overflow-hidden border border-white/10 shrink-0">
              <img
                src={createdBook.coverUrl}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">
                {createdBook.title}
              </h3>
              <p className="text-[#b59a5d] font-serif italic">
                {createdBook.author}
              </p>
              <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white/5 py-1 px-3 rounded-full border border-white/5 w-fit">
                ID: {createdBook.id.slice(0, 8)}...
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => {
                setCreatedBook(null);
                reset();
                setPreview(null);
              }}
              className="h-14 px-8 flex-1 bg-white/5 text-white border border-white/10 hover:bg-white/10 rounded-2xl transition-all font-black uppercase tracking-widest"
            >
              Nuevo Registro
            </Button>
            <Button
              onClick={() => navigate("/admin/books")}
              className="h-14 px-8 flex-1 bg-[#b59a5d] text-[#0b1120] hover:bg-[#c6a96e] rounded-2xl transition-all shadow-xl shadow-[#b59a5d]/20 font-black uppercase tracking-widest"
            >
              Ir al Archivo
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/books">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-xl border border-white/5 hover:bg-white/5 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Registrar <span className="text-[#b59a5d]">Nuevo Tomo</span>
          </h1>
          <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Left Column: Cover Preview & Upload */}
        <div className="lg:col-span-4 space-y-6">
          <div className="group relative aspect-[3/4.5] bg-white/5 rounded-[2rem] border-2 border-dashed border-white/10 hover:border-[#b59a5d]/40 transition-all overflow-hidden flex flex-col items-center justify-center p-4">
            {preview ? (
              <>
                <img
                  src={preview}
                  className="w-full h-full object-cover rounded-2xl"
                  alt="Preview"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setValue("cover", null as any);
                  }}
                  className="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="p-5 bg-[#b59a5d]/5 rounded-full border border-[#b59a5d]/10 text-[#b59a5d] inline-block">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-white font-bold">Portada del Libro</p>
                  <p className="text-slate-500 text-xs">JPG, PNG (Máx 2MB)</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  {...register("cover")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="text-[#b59a5d] font-bold uppercase tracking-widest text-[10px]"
                >
                  Seleccionar
                </Button>
              </div>
            )}
          </div>
          {errors.cover && (
            <p className="text-xs font-bold text-red-500 text-center">
              {errors.cover.message as string}
            </p>
          )}

          <div className="p-6 bg-[#b59a5d]/5 border border-[#b59a5d]/10 rounded-3xl space-y-3">
            <h4 className="text-[#b59a5d] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Info className="w-3 h-3" />
              Requisitos de Archivo
            </h4>
            <ul className="text-[11px] text-slate-400 space-y-2 font-serif italic">
              <li>• El manuscrito debe estar en formato PDF.</li>
              <li>• La portada debe ser una imagen de alta resolución.</li>
              <li>• Tamaño máximo total: 50MB.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Form Fields */}
        <div className="lg:col-span-8">
          <Card className="bg-[#0d1627]/50 backdrop-blur-2xl border-white/10 rounded-[2.5rem] shadow-2xl">
            <CardContent className="p-10 space-y-8">
              {/* Title & Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Título de la Obra
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 transition-colors" />
                    <Input
                      {...register("title")}
                      placeholder="Ej: El Quijote de la Mancha"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:ring-[#b59a5d]/50"
                    />
                  </div>
                  {errors.title && (
                    <p className="text-[10px] font-bold text-red-500 ml-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Autor / Escritor
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 transition-colors" />
                    <Input
                      {...register("author")}
                      placeholder="Ej: Miguel de Cervantes"
                      className="h-12 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:ring-[#b59a5d]/50"
                    />
                  </div>
                  {errors.author && (
                    <p className="text-[10px] font-bold text-red-500 ml-1">
                      {errors.author.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Category & File Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Clasificación / Categoría
                  </label>
                  <div className="relative">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 transition-colors" />
                    <select
                      {...register("categoryId")}
                      className="h-12 w-full pl-12 bg-white/5 border-white/10 text-white rounded-xl outline-none focus:ring-2 focus:ring-[#b59a5d]/50 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0b1120]">
                        Seleccione...
                      </option>
                      {categories.map((cat) => (
                        <option
                          key={cat.id}
                          value={cat.id}
                          className="bg-[#0b1120]"
                        >
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.categoryId && (
                    <p className="text-[10px] font-bold text-red-500 ml-1">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Archivo PDF (Obra Completa)
                  </label>
                  <div className="relative">
                    <div
                      className={cn(
                        "h-12 w-full flex items-center px-4 bg-white/5 border border-white/10 rounded-xl transition-all",
                        watch("file") && watch("file")?.[0]
                          ? "border-[#b59a5d]/40"
                          : "",
                      )}
                    >
                      <FileText className="w-4 h-4 text-slate-500 mr-3" />
                      <span className="text-sm text-slate-400 truncate flex-1">
                        {watch("file") && watch("file")?.[0]
                          ? (watch("file") as any)[0].name
                          : "Seleccionar archivo PDF..."}
                      </span>
                      <Upload className="w-4 h-4 text-[#b59a5d]" />
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      {...register("file")}
                    />
                  </div>
                  {errors.file && (
                    <p className="text-[10px] font-bold text-red-500 ml-1">
                      {errors.file.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                  Resumen / Sinopsis
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Describa brevemente la esencia de este tomo..."
                  className="w-full min-h-[120px] p-5 bg-white/5 border border-white/10 text-white rounded-[1.5rem] outline-none focus:ring-2 focus:ring-[#b59a5d]/50 transition-all font-serif italic"
                />
              </div>

              {/* Options & Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                {/* <div className="flex items-center gap-3">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("isDownloadable")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b59a5d] peer-checked:after:bg-white"></div>
                    <span className="ml-3 text-xs font-black uppercase tracking-widest text-slate-500">
                      Permitir Descarga
                    </span>
                  </div>
                </div> */}

                <div className="flex gap-4 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      reset();
                      setPreview(null);
                    }}
                    className="h-12 px-6 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-black uppercase tracking-widest text-[11px]"
                  >
                    <PlusCircle className="w-4 h-4 mr-2 rotate-45" />
                    Limpiar
                  </Button>
                  <Button
                    type="submit"
                    disabled={createBook.isPending}
                    className="h-14 px-10 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-[0.15em] hover:bg-[#c6a96e] rounded-xl transition-all shadow-xl shadow-[#b59a5d]/20 active:scale-95 disabled:opacity-50"
                  >
                    <PlusCircle className="w-5 h-5 mr-3" />
                    Catalogar Tomo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default BookCreatePage;
