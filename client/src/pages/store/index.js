import React from "react";

import ProductsGrid from "./ProductsGrid";

const Store = () => {
  return (
    <div>
      <div className="text-center mt-5">
        <h1 style={{ fontFamily: "Cursive" }}
        >Store</h1>
      </div>
      <ProductsGrid />
    </div>
  );
};

export default Store;
