"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

const SearchSection = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    // Aquí iría la lógica de búsqueda
    // Por ahora solo simulamos la carga
    setTimeout(() => {
      setIsLoading(false);
      // Redirigir a página de resultados
      window.location.href = `/producto?url=${encodeURIComponent(url)}`;
    }, 1000);
  };

  return (
    <div className="py-20 px-6 bg-accent/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Compara Precios Ahora
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Pega la URL de cualquier producto de Amazon, MediaMarkt, Carrefour o El Corte Inglés
        </p>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Input
              type="url"
              placeholder="https://www.amazon.es/producto-ejemplo..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-12 pl-4 pr-12 text-base"
              disabled={isLoading}
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Button 
            type="submit" 
            size="lg" 
            className="h-12 px-8"
            disabled={isLoading || !url.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Analizando...
              </>
            ) : (
              "Comparar Precios"
            )}
          </Button>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <span>Ejemplos:</span>
          <button 
            type="button"
            className="text-primary hover:underline"
            onClick={() => setUrl("https://www.amazon.es/ejemplo")}
          >
            Amazon
          </button>
          <button 
            type="button"
            className="text-primary hover:underline"
            onClick={() => setUrl("https://www.mediamarkt.es/ejemplo")}
          >
            MediaMarkt
          </button>
          <button 
            type="button"
            className="text-primary hover:underline"
            onClick={() => setUrl("https://www.carrefour.es/ejemplo")}
          >
            Carrefour
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;