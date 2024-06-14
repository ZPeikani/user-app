import { useEffect, useState } from "react";
import { PostProps } from "../getInfo/getInfo";
import axios from "axios";
import { Button } from "../button/button";

type CardProps = {
  data: PostProps[];
};
export default function Card({ data }: CardProps) {
  const [posts, setPosts] = useState<PostProps[] | []>([]);
  const [showModal, setShowModal] = useState(false);
  const [itemDelete, setItemDelete] = useState<PostProps | null>(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/post")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [data]);

  const handelDelete = async (item: PostProps) => {
    try {
      await axios.delete(`http://localhost:3000/post/${item.id}`);
      setPosts(posts.filter((post) => post.id !== item.id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col justify-between p-4 bg-gray-200 font-semibold rounded-md shadow-md"
            >
              <p>
                نام:{" "}
                <span className="opacity-75">
                  {item.name} {item.lastName}
                </span>
              </p>
              <p>
                شماره موبایل:{" "}
                <span className="opacity-75">{item.phoneNumber}</span>
              </p>
              <p>
                نسبت: <span className="opacity-75">{item.relation}</span>
              </p>
              <p>
                ایمیل: <span className="opacity-75">{item.email}</span>
              </p>
              <div className="flex items-end justify-end mt-4">
                <Button text="ویرایش" className="bg-blue-500 rounded-r-md" />
                <Button
                  text="حذف"
                  className="bg-red-500 rounded-l-md"
                  onClick={() => {
                    setItemDelete(item);
                    setShowModal(true);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {showModal && (
        <div className="flex items-center justify-center">
          <div className="fixed z-10 flex flex-col gap-5  bg-purple-300 shadow-lg rounded-md border-spacing-1 border-black p-4 px-6 w-1/3">
            <p className="font-semibold text-start">
              آیا مطمئن هستید که می خواهید اطلاعات مورد نظر را حذف کنید؟
            </p>
            <div className="flex gap-3 items-end justify-end ">
              <Button
                text="خیر"
                className="bg-green-500 rounded-md font-bold"
                onClick={() => {
                  setItemDelete(null)
                  setShowModal(false)
                }}
              />
              <Button
                text="بله"
                className="bg-red-500 rounded-md font-bold"
                onClick={() => {
                  if (itemDelete) {
                    handelDelete(itemDelete);
                  }
                  setItemDelete(null)
                  setShowModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
