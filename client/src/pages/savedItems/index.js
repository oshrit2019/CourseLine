import React from "react";

import SavedItemsGrid from "./SavedItemsGrid";

const Store = () => {
  return (
    <div>
      <div className="text-center mt-5">
        <h1 style={{ fontFamily: "Cursive" }}
        >Saved Courses</h1>
      </div>
      <SavedItemsGrid />
    </div>
  );
};

export default Store;
