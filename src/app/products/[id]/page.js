// <<<<<<< SEO/improvization

// import dynamic from "next/dynamic"; 

=======
// import dynamic from "next/dynamic";

// >>>>>>> main
const ProductGallery = dynamic(() => import("../../../views/ProductGallery"));

export default function ProductPage() {
  return <ProductGallery />;
}
