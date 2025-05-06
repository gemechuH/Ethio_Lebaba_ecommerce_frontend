import React from "react";

const ShopFiltering = ({
  filters,
  filterState,
  setFilterState,
  clearFilter,
}) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filters</h3>

      {/* CATEGORIES */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg ">Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="category"
              id="category"
              value={category}
              ckecked={filterState.category === category}
              onChange={(e) =>
                setFilterState({ ...filterState, category: e.target.value })
              }
            />
            <span className="ml-1">{category}</span>
          </label>
        ))}
      </div>

      {/* COLOR */}

      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg ">Color</h4>
        <hr />
        {filters.colors.map((color) => (
          <label key={color} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="color"
              id="color"
              value={color}
              ckecked={filterState.color === color}
              onChange={(e) =>
                setFilterState({ ...filterState, color: e.target.value })
              }
            />
            <span className="ml-1">{color}</span>
          </label>
        ))}
      </div>

      {/* PRICE RANGE */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg ">price range</h4>
        <hr />
        {filters.priceRanges.map((range) => (
          <label key={range.label} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="price"
              id="price"
              value={`${range.min}- ${range.max}`}
              ckecked={filterState.priceRange === `${range.min}- ${range.max}`}
              onChange={(e) =>
                setFilterState({ ...filterState, priceRange: e.target.value })
              }
            />
            <span className="ml-1">{range.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShopFiltering;
