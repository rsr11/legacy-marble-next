import dynamic from "next/dynamic";

const ProductGallery = dynamic(() => import("../../../views/ProductGallery"));

export default function ProductPage() {
  return <ProductGallery />;
}
