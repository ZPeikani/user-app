import { useState } from "react";
import Card from "../card/card";
import { GetInfo, PostProps } from "../getInfo/getInfo";

export default function Home() {
  const [postData, setPostData] = useState<PostProps[] | []>([]);
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-center text-xl">
          اضافه/ ویرایش کاربران
        </p>
        <div className="border shadow-md rounded-md p-4">
          <GetInfo setPostData={setPostData} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-center text-xl">لیست کاربران</p>
        <div className="border shadow-md rounded-md bg-slate-100 p-4">
          <Card data={postData} />
        </div>
      </div>
    </div>
  );
}
