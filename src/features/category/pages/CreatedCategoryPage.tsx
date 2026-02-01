import { useForm } from "react-hook-form";
import { useCategory } from "../hooks/useCategory";
import { categorySchema, type CategoryDto } from "../schemas/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tag, PlusCircle, Hash, Eraser, Info, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

/**
 * CreatedCategoryPage - Internal system for organizing the digital acervo into scholarly categories.
 */
const CreatedCategoryPage = () => {
  const { createCategory } = useCategory();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryDto>({
    resolver: zodResolver(categorySchema),
  });

  const categoryName = watch("name");

  // Auto-generate slug from name for academic convenience
  useEffect(() => {
    if (categoryName) {
      const slug = categoryName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setValue("slug", slug, { shouldValidate: true });
    }
  }, [categoryName, setValue]);

  const onSubmit = (data: CategoryDto) => {
    createCategory.mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/admin/categories");
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-black text-white tracking-tight">
          Gestión de <span className="text-[#b59a5d]">Categorías</span>
        </h1>
        {/* <p className="text-slate-400 font-serif italic text-lg leading-relaxed">
          "Organice el conocimiento para que el buscador encuentre su camino con
          precisión."
        </p>
        <div className="h-1.5 w-32 bg-linear-to-r from-[#b59a5d] to-transparent rounded-full mt-2" /> */}
      </div>

      {/* Form Card */}
      <Card className="bg-[#0d1627]/50 backdrop-blur-2xl border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
        <CardHeader className="p-8 border-b border-white/5 bg-white/2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#b59a5d]/10 text-[#b59a5d]">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-white uppercase tracking-tight">
                Nueva Clasificación
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-8">
              {/* Category Name */}
              <div className="space-y-2 group">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Nombre del Género / Categoría
                  </label>
                </div>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                  <Input
                    {...register("name")}
                    placeholder="Ej: Filosofía Antigua, Ciencia Ficción"
                    className="h-14 pl-12 bg-white/5 border-white/10 text-white focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-2xl text-lg font-medium"
                  />
                </div>
                {errors.name && (
                  <p className="text-xs font-bold text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-left-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Slug Field */}
              <div className="space-y-2 group">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Identificador de Sistema (Slug)
                  </label>
                  <div className="flex items-center gap-1 text-[10px] text-slate-600 italic">
                    <Info className="w-3 h-3" />
                    Generado automáticamente para el archivo
                  </div>
                </div>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#b59a5d] transition-colors" />
                  <Input
                    {...register("slug")}
                    placeholder="filosofia-antigua"
                    className="h-12 pl-12 bg-white/5 border-white/10 text-slate-400 font-mono text-sm focus:ring-[#b59a5d]/50 focus:border-[#b59a5d]/50 transition-all rounded-xl"
                  />
                </div>
                {errors.slug && (
                  <p className="text-xs font-bold text-red-500 mt-1 ml-1">
                    {errors.slug.message}
                  </p>
                )}
              </div>
            </div>

            {/* Insight Note */}
            <div className="p-4 bg-[#b59a5d]/5 border border-[#b59a5d]/10 rounded-2xl">
              <p className="text-[11px] font-serif italic text-slate-400 leading-relaxed">
                <span className="text-[#b59a5d] font-bold not-italic mr-1">
                  Nota del Archivero:
                </span>
                Las categorías permiten una indexación precisa de los
                manuscritos digitales. El slug debe ser único para evitar
                colisiones en los registros.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => reset()}
                className="h-12 px-8 flex-1 sm:flex-none border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
              >
                <Eraser className="w-4 h-4 mr-2" />
                Limpiar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 px-10 flex-1 bg-[#b59a5d] text-[#0b1120] font-black uppercase tracking-[0.15em] hover:bg-[#c6a96e] rounded-2xl transition-all shadow-xl shadow-[#b59a5d]/20 active:scale-95 disabled:opacity-50"
              >
                <PlusCircle className="w-5 h-5 mr-3" />
                Establecer Categoría
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Footer Branding */}
      {/* <div className="mt-12 text-center opacity-20 group hover:opacity-40 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">
          Indexador de Acervo v1.2
        </p>
      </div> */}
    </div>
  );
};

export default CreatedCategoryPage;
