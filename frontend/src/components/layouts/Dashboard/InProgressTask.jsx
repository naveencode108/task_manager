import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAlltask } from '../../../services/actions/taskApi';
import EditTask from '../../common/EditTask';
import FilterTask from '../../common/FilterTask';
import Card from '../../common/Card';

const InProgressTask = () => {

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { alltask, loading } = useSelector((state) => state.task);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(null);

  useEffect(() => {
    getAlltask(token, dispatch);
  }, [token, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-1">
    <h1 className="text-3xl font-bold mb-8 text-center border-b-2">
      InProgress Tasks
    </h1>

    <FilterTask status="in-progress" />
    {open && <EditTask setOpen={setOpen} data={task} />}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
      {alltask?.filter((item) => item.status == "in-progress").length > 0 ? (
        alltask.map(
          (tasks, index) =>
            tasks?.status == "in-progress" && (
              <Card key={index} task={tasks} token={token} dispatch={dispatch} alltask={alltask} setOpen={setOpen} setTask={setTask}/>
            )
        )
      ) : (
        <div className="w-full text-2xl capitalize ">No task yet.</div>
      )}
    </div>
  </div>
  )
}

export default InProgressTask
