import React from "react";
import RecipeCard from "../RecipeCard";

const Recipes = ({ data }) => {
  return (
    <div>
      {data.map((item) => {
        return (
          <>
            <RecipeCard recipe={item.recipe} />
          </>
        );
      })}
    </div>
  );
};

export default Recipes;