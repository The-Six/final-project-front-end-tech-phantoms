import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import ShoppingItem from "../../Components/ShoppingItem";

function ShoppingList({ data }) {
  const [listData, setListData] = useState(data);

  function deleteItem(ingredientName) {
    listData.forEach((listItem, index) => {
      if (listItem.ingredient === ingredientName) { //find the ingredient in the shopping list
        setListData([ //update listData state immutably
          ...listData.slice(0, index), //remove matching item using slice
          ...listData.slice(index + 1, listData.length),
        ]);
      }
    });
  }

  function checkItem(ingredientName) {
    const newList = listData.map((listItem) => {
      if (listItem.ingredient === ingredientName) { //find the ingredient in the shopping list
        listItem = { ...listItem, needToBuy: !listItem.needToBuy }; //toggle boolean value
        return listItem; //return changed item
      }
      return listItem; //return unchanged items
    });
    setListData(newList);
  }

  return (
    <div>
      <NavBar />
      <h3 style={{ textAlign: "center" }}>Shopping List</h3>
      <hr />
      <div style={{ paddingLeft: "4vw" }}>
        {listData.map((item, index) => {
          return (
            <ShoppingItem
              checkItem={checkItem}
              deleteItem={deleteItem}
              key={index}
              data={item}
            />
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const email = encodeURI(context.params.email);
  const fetchURL = `http://localhost:3002/shopping/${email}`;
  const res = await fetch(fetchURL);
  const data = await res.json();
  return { props: { data: data.payload[0].shoppingList } };
}

export default ShoppingList;
