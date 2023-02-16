import HeadingText from "@/components/HeadingText";
import Image from "next/image";
import React, { useState } from "react";

import { db } from "@/utils/firebase/Firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

type Props = {};

import Profile from "../assets/profile.jpg";
import { AiFillBackward } from "react-icons/ai";
import Input from "@/components/Input";
import ThanksMessage from "@/components/ThanksMessage";
import Star from "@/components/Star";
import FormError from "@/components/FormError";

const INITIAL_VALUE = {
  name: "",
  email: "",
  website: "",
  headline: "",
  testimonial: "",
  image: "",
};

export default function AddingTestimonial(props: Props) {
  const [star, setStar] = useState(5);
  const [formNum, setFormNum] = useState(1);
  const [userInformation, setUserInformation] = useState(INITIAL_VALUE);
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  const submittingTheForm = async (e: any) => {
    if (!userInformation.name || !userInformation.testimonial)
      return setError(true);

    e.preventDefault();
    const docRef = doc(
      db,
      "testimonial",
      userInformation.name.toLocaleLowerCase()
    );
    await setDoc(docRef, {
      name: userInformation.name,
      headline: userInformation.headline,
      order: 100,
      star: star,
      testimonial: userInformation.testimonial,
      homePage: false,
      testimonialPage: false,
      img: userInformation.image,
      createdAt: serverTimestamp(),
    }).then(() => {
      setSent(true);
    });
  };

  const onChangeHandler = (e: any) => {
    const { value, name } = e.target;
    setUserInformation({ ...userInformation, [name]: value });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {sent ? (
        <ThanksMessage />
      ) : (
        <>
          <form className="relative w-full max-w-[726px] h-full overflow-x-hidden">
            {/* First Form */}
            <div
              className={`w-full max-w-[412px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-2xl rounded-xl space-y-3 ${
                formNum == 2 && "-translate-x-[700px]"
              } duration-300`}
            >
              <Image src={Profile} width={44} height={44} alt="" />
              <HeadingText className="text-2xl font-medium">
                Write a text testimonial
              </HeadingText>
              <ul className="list-disc text-sm pl-8">
                <li>What do you like most about me?</li>
                <li>Should I continue making this kind of content?</li>
              </ul>
              <Star star={star} setStar={setStar} /> {/* Star Component */}
              <textarea
                name="testimonial"
                rows={6}
                className="w-full outline-none border-2 border-[#CFCFCF] rounded-md p-3"
                onChange={onChangeHandler}
              ></textarea>
              <button
                type="button"
                className="w-full text-center bg-black text-white py-2 px-8 rounded-md shadow-button"
                onClick={() => setFormNum(2)}
              >
                Next
              </button>
            </div>

            {/* Second Form */}
            <div
              className={`w-full max-w-[412px] bg-white absolute top-[55%] -translate-x-1/2 -translate-y-1/2 p-4 shadow-2xl rounded-xl space-y-3 ${
                formNum == 2 ? "left-[50%]" : "left-[850px]"
              } duration-300`}
            >
              <div className="flex justify-between items-center">
                <Image src={Profile} width={44} height={44} alt="" />
                <div
                  className="bg-black text-white py-2 px-3 rounded-md cursor-pointer"
                  onClick={() => setFormNum(1)}
                >
                  <AiFillBackward />
                </div>
              </div>
              <HeadingText className="text-2xl font-medium">
                Almost done 🙌
              </HeadingText>
              <Input
                title="Your Name"
                value="name"
                placeHolder="Ali Reza"
                type="text"
                onChange={onChangeHandler}
              />
              <Input
                title="Email Address"
                value="email"
                placeHolder="ali@example.com"
                type="email"
                onChange={onChangeHandler}
              />
              <Input
                title="Headline"
                value="headline"
                placeHolder="ex. DevRel"
                type="text"
                onChange={onChangeHandler}
              />
              <Input
                title="Your Website"
                value="website"
                placeHolder="https://example.com"
                type="url"
                onChange={onChangeHandler}
              />
              <Input
                title="Your Avatar"
                value="image"
                placeHolder="https://example.png"
                type="url"
                onChange={onChangeHandler}
              />
              <button
                type="button"
                onClick={submittingTheForm}
                className="w-full text-center bg-black text-white py-2 px-8 rounded-md shadow-button"
              >
                Submit
              </button>

              {error && <FormError />}
            </div>

            <div
              className={`w-[30%] h-full absolute top-0 from-transparent to-white pointer-events-none hidden md:block ${
                formNum == 1
                  ? "bg-gradient-to-r right-0"
                  : "bg-gradient-to-l left-0"
              }`}
            ></div>
          </form>
        </>
      )}
    </div>
  );
}
