"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getVerificador, getAmazon, analyze, type VerificadorResponse, type AmazonResponse, type AnalysisResponse } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Minus, Zap, ExternalLink, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function ProductAnalysis() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  
  const [verificadorData, setVerificadorData] = useState<VerificadorResponse | null>(null);
  const [amazonData, setAmazonData] = useState<AmazonResponse | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setError("No se proporcionó URL del producto");
      setLoading(false);
      return;
    }

    loadProductData();
  }, [url]);

  const loadProductData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Siempre llamar primero al verificador
      const verificadorResponse = await getVerificador(url!);
      setVerificadorData(verificadorResponse);

      // Si es Amazon, obtener datos adicionales
      if (verificadorResponse.tienda.includes("amazon")) {
        const amazonResponse = await getAmazon(url!);
        setAmazonData(amazonResponse);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeWithAI = async () => {
    if (!verificadorData || !amazonData) return;

    try {
      setAnalyzing(true);
      const analysis = await analyze(amazonData.product, verificadorData);
      setAnalysisData(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en el análisis");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Analizando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto border rounded-xl p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error</h3>
          <p className="text-muted-foreground">{error}</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Volver
          </Button>
        </div>
      </div>
    );
  }

  if (!verificadorData) return null;

  const formatPrice = (price: number) => `€${price.toFixed(2)}`;
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("es-ES");

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      {/* Header del producto */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline">{verificadorData.tienda}</Badge>
          {verificadorData.has_serie_historica && (
            <Badge variant="secondary">Histórico disponible</Badge>
          )}
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          {verificadorData.titulo || "Producto sin título"}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imagen del producto */}
          {verificadorData.imagen && (
            <div className="md:w-1/3">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={verificadorData.imagen}
                  alt={verificadorData.titulo || "Producto"}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
          
          {/* Información principal */}
          <div className="md:w-2/3">
            {/* Precios destacados */}
            {verificadorData.precios_destacados.length > 0 && (
              <div className="mb-6 border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Precios Destacados</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {verificadorData.precios_destacados.map((precio, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">
                        {precio.tipo}
                      </div>
                      <div className="text-xl font-bold">{precio.precio}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(precio.fecha)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button asChild className="flex-1">
                <a href={verificadorData.verificador_url} target="_blank" rel="noopener noreferrer">
                  Ver en {verificadorData.tienda} <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              
              {amazonData && (
                <Button 
                  variant="outline" 
                  onClick={handleAnalyzeWithAI}
                  disabled={analyzing}
                  className="flex-1"
                >
                  {analyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Análisis con IA
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Histórico de precios */}
      {verificadorData.has_serie_historica && verificadorData.serie_historica.length > 0 && (
        <div className="mb-8 border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Histórico de Precios</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {verificadorData.serie_historica.slice(0, 10).map((punto, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span className="text-sm text-muted-foreground">{formatDate(punto.fecha)}</span>
                <span className="font-medium">{formatPrice(punto.precio)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Análisis con IA */}
      {analysisData && (
        <div className="border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Análisis con Inteligencia Artificial
          </h3>
          
          <div className="space-y-6">
            {/* Recomendación */}
            <div>
              <Badge 
                variant={
                  analysisData.json.recomendacion === "comprar" ? "default" :
                  analysisData.json.recomendacion === "no_comprar" ? "destructive" : "secondary"
                }
                className="mb-2"
              >
                {analysisData.json.recomendacion === "comprar" ? "✅ Recomendado comprar" :
                 analysisData.json.recomendacion === "no_comprar" ? "❌ No recomendado" : "⚠️ Depende"}
              </Badge>
              <p className="text-muted-foreground">{analysisData.json.argumentos}</p>
            </div>

            <Separator />

            {/* Análisis de precio */}
            <div>
              <h4 className="font-semibold mb-3">Análisis de Precio</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 border rounded">
                  <div className="text-sm text-muted-foreground">Actual</div>
                  <div className="font-bold">{formatPrice(analysisData.json.analisis_precio.precio_actual)}</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="text-sm text-muted-foreground">Mínimo 180d</div>
                  <div className="font-bold text-green-600">{formatPrice(analysisData.json.analisis_precio.min_180d)}</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="text-sm text-muted-foreground">Media 180d</div>
                  <div className="font-bold">{formatPrice(analysisData.json.analisis_precio.media_180d)}</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="text-sm text-muted-foreground">¿Buena oferta?</div>
                  <div className="font-bold">
                    {analysisData.json.analisis_precio.es_buena_oferta ? "✅ Sí" : "❌ No"}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{analysisData.json.analisis_precio.motivo_precio}</p>
            </div>

            <Separator />

            {/* Pros y contras */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">Pros</h4>
                <ul className="space-y-2">
                  {analysisData.json.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-sm">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-red-600">Contras</h4>
                <ul className="space-y-2">
                  {analysisData.json.contras.map((contra, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span className="text-sm">{contra}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator />

            {/* Resumen */}
            <div>
              <h4 className="font-semibold mb-3">Resumen</h4>
              <p className="text-muted-foreground">{analysisData.json.resumen}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}