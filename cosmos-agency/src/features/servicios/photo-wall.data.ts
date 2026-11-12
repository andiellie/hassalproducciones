import type { PhotoWallItem } from "@/components/ui/PhotoWall";

// Fotos del muro de Servicios: public/imagenes/Servicios/fotografia-servicios/<fila>/<archivo>
function toItems(folder: string, files: string[]): PhotoWallItem[] {
  return files.map((file, i) => ({
    id: `${folder}-${i}`,
    label: file,
    image: `/imagenes/Servicios/fotografia-servicios/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`,
  }));
}

const filaGrandeArriba = toItems("FILA GRANDE ARRIBA", [
  "BODA L&R-3.jpg",
  "DSC02117.jpg",
  "DSC02175.jpg",
  "DSC02292.jpg",
  "DSC05772.jpg",
  "DSC05787.jpg",
  "DSC05789.jpg",
  "DSC06055.jpg",
  "DSC06301.jpg",
  "IMG_0591.jpg",
  "IMG_0747.jpg",
  "_MG_1087.jpg",
]);

const filaMedio = toItems("FILA EN MEDIO MEDIANA", [
  "Copia de _MG_1010 2.jpg",
  "Copia de _MG_1037.jpg",
  "DSC02065.jpg",
  "DSC02067.jpg",
  "DSC02083.jpg",
  "IMG_1467.jpg",
  "IMG_1587.jpg",
  "IMG_1612.jpg",
  "IMG_2373.jpg",
  "IMG_2893.jpg",
  "IMG_3406.jpg",
  "IMG_3479.jpg",
  "IMG_3595.jpg",
  "IMG_3630.jpg",
  "IMG_3666.jpg",
  "IMG_3698.jpg",
  "IMG_3714.jpg",
]);

const filaAbajo = toItems("FILA ABAJO MEDIANA", [
  "Copia de DSC01185.jpg",
  "Copia de DSC01220.jpg",
  "Copia de DSC01274.jpg",
  "DSC05874.jpg",
  "IMG_0167.jpg",
  "IMG_0601.jpg",
  "IMG_1206.jpg",
  "IMG_1339.jpg",
  "IMG_3035.jpg",
  "IMG_3372.jpg",
  "IMG_4217.JPG",
  "IMG_6876.jpg",
  "_MG_0385.jpg",
  "_MG_4843.jpg",
  "_MG_4917.jpg",
  "_MG_4950.jpg",
]);

export const photoWallRows: [PhotoWallItem[], PhotoWallItem[], PhotoWallItem[]] = [
  filaGrandeArriba,
  filaMedio,
  filaAbajo,
];
