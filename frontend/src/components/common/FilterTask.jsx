import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTask } from "../../slices/task";

const FilterTask = ({ status }) => {
  const { alltask } = useSelector((state) => state.task);
  const ref = useRef(alltask);
  const dispatch = useDispatch();

  const btnValue = ["all", "low", "medium", "high"];
  const [activePriority,setActivePriority]=useState('all');

  const handleFilter = (item) => {
    setActivePriority(item);
    item === "all"
      ? dispatch(setTask(ref.current))
      : dispatch(
          setTask(
            ref.current.filter((val) =>
              status
                ? val.priority == item && val.status == status
                : val.priority == item
            )
          )
        );
  };

  return (
    <div className="flex gap-4 m-3 bg-gray-100 rounded-full w-fit p-2">
      {btnValue.map((item) => (
        <button
          className={`capitalize px-2 py-1 transition-all ease-in-out rounded-full ${item==activePriority?"bg-orange-500 text-white" :'bg-gray-200 hover:bg-gray-300'}`}
          key={item}
          onClick={() => handleFilter(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterTask;
