import React, { useEffect, useState } from "react";
import { Button } from "../components/UI/button";
import Input from "../components/UI/input";
import { blogProps } from "../types/types";
import { instance } from "../api/axios.api";
import toast from "react-hot-toast";
import AOS from 'aos';
import 'aos/dist/aos.css';
export const Home = () => {
  const [todos, setTodos] = useState<blogProps[]>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [action, setAction] = useState("Добавить");
  const [id, setId] = useState<number>();

  const getTodos = async () => {
    try {
      const { data } = await instance.get("/getTasks");
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id: number) => {
    const { data } = await instance.get<blogProps>(`/getTask/${id}`);
    setTitle(data.title);
    setDescription(data.description);
    setAction("Редактировать");
    setId(id);
  };

  const handleDelete = async (id: number) => {
    if (id) {
      await instance.delete(`/deleteTask/${id}`);
      toast.success("Задание успешно удалено!");
      getTodos();
    }
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (action == "Добавить") {
        await instance.post("/addTask", { title, description });
        getTodos();
        toast.success("Задание успешно добавлено!");
        setTitle("");
        setDescription("");
      }

      if (action == "Редактировать") {
        await instance.put(`/updateTask/${id}`, { title, description });
        toast.success("Задание успешно редактированно!");
        setTitle("");
        setDescription("");
        setAction("Добавить");
        getTodos();
      }
    } catch (error) {
      console.log(error);
      toast.error("Эта задача уже существует");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const toggleButton = (id: number) => {
    setTodos((prev) =>
      prev?.map((c) => (c.id == id ? { ...c, visible: !c.visible } : c))
    );
  };

  const taskActions = async (status: string, id: number) => {
    await instance.get(`/completeTask/${id}/${status}`)
    getTodos()
  }

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div className="bg-slate-800 w-full h-screen flex items-center justify-center">
      <div className="lg:w-[70%] w-[90%] 2xl:w-[50%] flex flex-col items-center h-[90%] border-purple-600 border-2 rounded-lg shadow-lg shadow-purple-600">
        <h3 className="text-purple-600 font-roboto mt-[4%] xl:text-3xl">
          Todo
        </h3>

        {/* Todos section */}
        <div className="h-[80%] w-[94%] my-4 overflow-y-auto flex flex-col gap-y-3">
          {todos?.map((c) => (
            <div
              key={c.id}
              data-aos="fade-up"
              className="w-full hover:scale-x-50 cursor-pointer flex flex-col relative min-h-14 border rounded-md border-purple-600 p-3"
            >
              {c.status == "выполнено" && (
                <div className="absolute right-2 bottom-2">
                <img src="/Mask group (1).svg" alt="" width={30} height={30} />
              </div>
              )}
              <p className="text-purple-400 text-[18px]">{c?.title}</p>
              <p className="text-purple-400 text-[13px]">{c?.description}</p>

              <div className="absolute top-1 flex gap-x-2 right-2 cursor-pointer ">
                <img
                  role="button"
                  onClick={() => handleEdit(c.id)}
                  src="/edit.svg"
                  alt="point"
                  width={18}
                  height={12}
                  className="fill-purple-600 cursor-pointer"
                />
                <img
                  role="button"
                  onClick={() => handleDelete(c.id)}
                  src="/delete.svg"                       
                  alt="point"
                  width={18}
                  height={12}
                  className="fill-purple-600 cursor-pointer"
                />
                <img
                  role="button"
                  onClick={() => toggleButton(c.id)}
                  src="/point.svg"
                  alt="point"
                  width={24}
                  height={12}
                  className="fill-purple-600 cursor-pointer"
                />
              </div>
              {c.visible && (
                <div className={` absolute flex z-40 flex-col gap-y-1 top-8 right-2 min-w-40 bg-slate-800 p-2 rounded-md border border-purple-600 `}>
                  <p role="button" onClick={() => taskActions("выполнено", c.id)} className={`${c.status == "выполнено" ? "bg-purple-400 text-black px-2 rounded-md" : "text-purple-400"} font-roboto text-base font-normal cursor-pointer`}>
                    выполнено
                  </p>
                  <p role="button" onClick={() => taskActions("в процессе", c.id)} className={`${c.status == "в процессе" ? "bg-purple-400 text-black px-2 rounded-md" : "text-purple-400"} font-roboto text-base font-normal cursor-pointer`}>
                    в процессе
                  </p>
                  <p role="button" onClick={() => taskActions("ожидает выполнения", c.id)} className={`${c.status == "ожидает выполнения" ? "bg-purple-400 text-black px-2 rounded-md" : "text-purple-400"} font-roboto text-base font-normal cursor-pointer`}>
                    ожидает выполнения
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Actions */}
        <form className="w-full px-4 h-[5%] flex gap-x-4" onSubmit={onSubmit}>
          <Input placeholder="Заголовок" setState={setTitle} state={title} />
          <Input
            placeholder="Описание"
            setState={setDescription}
            state={description}
          />
          <Button type="green" title={action} />
        </form>
      </div>
    </div>
  );
};
