import { HTMLAttributes } from "react";

function StoreLogos(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <p className="text-center">Comparamos precios de las mejores tiendas</p>
      <div className="mt-6 flex items-center justify-center flex-wrap gap-8 text-muted-foreground">
        {/* Amazon */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          Amazon
        </div>
        
        {/* MediaMarkt */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-sm font-bold">
            M
          </div>
          MediaMarkt
        </div>
        
        {/* Carrefour */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">
            C
          </div>
          Carrefour
        </div>
        
        {/* El Corte Inglés */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white text-sm font-bold">
            E
          </div>
          El Corte Inglés
        </div>
      </div>
    </div>
  );
}

export default StoreLogos;