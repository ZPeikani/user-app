import { useState } from "react";
import { Button } from "../button/button";
import axios from "axios";
export type PostProps = {
  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  relation: string;
  email: string;
};
export type GetInfoProp = {
  setPostData: React.Dispatch<React.SetStateAction<PostProps[]>>;
};
export function GetInfo({ setPostData }: GetInfoProp) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [relation, setRelation] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [relationError, setRelationError] = useState("");
  const [emailError, setEmailError] = useState("");
  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && lastName && phoneNumber && relation && email) {
      axios
        .post("http://localhost:3000/post", {
          id: Date.now(),
          name,
          lastName,
          phoneNumber,
          relation,
          email,
        })
        .then((res) => {
          console.log(res.data);
          setPostData((prevData) => [
            ...prevData,
            {
              id: Date.now(),
              name,
              lastName,
              phoneNumber,
              relation,
              email,
            },
          ]);
        })
        .catch((err) => console.log(err));
      setName("");
      setLastName("");
      setPhoneNumber("");
      setRelation("");
      setEmail("");
    }
    if (!name) {
      setNameError("لطفا نام را وارد کنید");
    } else {
      setNameError("");
    }
    if (!lastName) {
      setLastNameError("لطفا نام خانوادگی را وارد کنید");
    } else {
      setLastNameError("");
    }
    if (!phoneNumber) {
      setPhoneNumberError("لطفا شماره موبایل را وارد کنید");
    } else {
      setPhoneNumberError("");
    }
    if (!relation) {
      setRelationError("لطفا نسبت خود را وارد کنید");
    } else {
      setRelationError("");
    }
    if (!email) {
      setEmailError("لطفا ایمیل را وارد کنید");
    } else {
      setEmailError("");
    }
  };
  return (
    <form className="flex flex-col gap-4 font-semibold" onSubmit={handelSubmit}>
      <label htmlFor="name" className="flex flex-col gap-2">
        نام:
        <input
          type="text"
          placeholder="نام ..."
          className="px-3 py-1 border shadow-md"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <p className="text-red-500 text-sm">{nameError}</p>
      </label>
      <label htmlFor="lastName" className="flex flex-col gap-2">
        نام خانوادگی:
        <input
          name="lastName"
          value={lastName}
          type="text"
          placeholder="نام خانوادگی ..."
          className="px-3 py-1 border shadow-md"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <p className="text-red-500 text-sm">{lastNameError}</p>
      </label>
      <label htmlFor="phoneNumber" className="flex flex-col gap-2">
        شماره موبایل:
        <input
          name="phoneNumber"
          value={phoneNumber}
          type="number"
          placeholder="شماره موبایل ..."
          className="px-3 py-1 border shadow-md"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <p className="text-red-500 text-sm">{phoneNumberError}</p>
      </label>
      <label htmlFor="relation" className="flex flex-col gap-2">
        نسبت:
        <input
          name="relation"
          value={relation}
          type="text"
          placeholder="نسبت"
          className="px-3 py-1 border shadow-md"
          onChange={(e) => {
            setRelation(e.target.value);
          }}
        />
        <p className="text-red-500 text-sm">{relationError}</p>
      </label>
      <label htmlFor="email" className="flex flex-col gap-2">
        ایمیل:
        <input
          name="email"
          value={email}
          type="email"
          placeholder="ایمیل ..."
          className="px-3 py-1 border shadow-md"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p className="text-red-500 text-sm">{emailError}</p>
      </label>
      <Button
        text="اضافه کردن"
        className="bg-gray-500 hover:bg-gray-600 rounded-md"
      />
    </form>
  );
}
