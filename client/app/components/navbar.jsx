"use client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { GiClick } from "react-icons/gi";
import { MdAccountBox } from "react-icons/md";
import { useForm } from "react-hook-form";
import { AddGrains } from "./model/addGrains";

export default function Navbar() {
  const { user, isLoading } = useUser();
  const [showCompleatModal, setShowCompleatModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [profile, setProfile] = useState("farmer");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [Data, setData] = useState();
  const [showGrainsBtn, setShowGrainsBtn] = useState(false);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/addProfile",
        data
      );

      if (res.data.success) {
        console.log(res.data.message);
      } else {
        console.log(res.data.error);
      }
    } finally {
      console.log(data);
      reset();
      setShowCompleatModal(false);
    }
  };

  const open = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/profile/${user.email}`
      );
      let x = res.data;

      console.log(x);

      if (res.data) {
        setEditShowModal(true);
        setData(res.data);
      } else {
        setShowCompleatModal(true);
        console.log("registered user not found");
      }
    } catch (error) {
      setShowCompleatModal(true);
      console.log(`Data not Found`, error);
    }
  };

  useEffect(() => {
    const forGrains = async () => {
      try {
        if (!user) {
          return console.log("wait");
        }
        const res = await axios.get(
          `http://localhost:4000/api/profile/${user.email}`
        );
        console.log(res.data);

        if (res.data.isa == "farmer") {
          setShowGrainsBtn(true);
          console.log("yesssss");
        } else {
          console.log("user is not a f");
        }
      } catch (error) {
        console.log(`user is not a farmer`, error);
      }
    };

    forGrains();
  }, [user]);

  const fetchLocation = () => {
    return navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = JSON.stringify(position.coords.latitude);
        let lon = JSON.stringify(position.coords.longitude);
        console.log(lat + "," + lon);
        setLatitude(lat);
        setLongitude(lon);
      },
      () => {
        console.log("issue fetching location");
      }
    );
  };

  function Fill({
    emaill,
    nameLabel,
    abtLabel,
    name,
    website,
    add1,
    add2,
    about,
    phone,
  }) {
    return (
      <>
        <div className="  w-full ">
          <div className="flex-col mx-8">
            <div className="w-full  relative  ">
              <input
                {...register("name")}
                defaultValue={name}
                placeholder=" "
                className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                {nameLabel}
              </label>
            </div>

            <div className="w-full  relative pt-1">
              <input
                {...register("add1")}
                defaultValue={add1}
                placeholder=" "
                className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Address :- (Country, State)
              </label>
            </div>

            <div className="w-full  relative pt-1">
              <input
                {...register("add2")}
                defaultValue={add2}
                placeholder=" "
                className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                (City, Street, Pin, etc)
              </label>
            </div>

            <div className="w-full  relative pt-1">
              <input
                {...register("about")}
                defaultValue={about}
                placeholder=" "
                className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                {abtLabel}
              </label>
            </div>

            <div className="w-full pt-1 relative">
              <input
                {...register("mail")}
                defaultValue={emaill}
                placeholder=" "
                type="text"
                className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Mail ID
              </label>
            </div>

            <div className="w-full pt-1  relative">
              <input
                {...register("phone")}
                defaultValue={phone}
                placeholder=" "
                className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Phone
              </label>
            </div>

            <div className="w-full pt-1  relative">
              <input
                {...register("website/social")}
                defaultValue={website}
                placeholder=" "
                className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Website / Any social link
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-white text-black">
        {user && (
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <a className="btn btn-neutral text-xl">daisyUI</a>
            </div>
            <div className="flex-none gap-2">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
                />
              </div>
              {showGrainsBtn && (
                <button
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  className="rounded-2xl py-3 px-4 border-2"
                >
                  Add Your Grains
                </button>
              )}

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.picture}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 text-black rounded-box w-52"
                >
                  <li>
                    <a className="justify-between" onClick={open}>
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click on ✕ button to close
              </p>{" "}
              <AddGrains />
            </div>
          </dialog>
        </>

        {!isLoading && !user && (
          <p>
            <a href="/api/auth/login">Sign in</a>
          </p>
        )}
        {/* ------------------------------------------------------------------------------------------------------------------------------------------ */}
        {showCompleatModal && (
          <>
            <div className="mw  fixed left-0 right-0 bottom-0 top-0 backdrop-blur "></div>
            <div className="mc fixed  left-1/2 right-0 bottom-0 top-16 border  rounded-3xl p-6 bg-slate-300 text-center">
              <h2 className="font-bold text-3xl p-4">
                <span className="flex justify-center items-center gap-1">
                  {" "}
                  <MdAccountBox size={40} />
                  Compleat Profile
                </span>
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2 justify-center">
                  <div
                    className="border-2 p-2 rounded-xl bg-purple-400"
                    onClick={() => fetchLocation()}
                  >
                    <span className="flex gap-2">
                      Get Live Location <GiClick size={24} />
                    </span>
                  </div>

                  <div>
                    {latitude && (
                      <div className="text-sm">
                        <input
                          className="hidden"
                          type=""
                          id={latitude}
                          value={latitude}
                          {...register("lat")}
                        />
                        <span className="font-semibold">Latitude :-</span>{" "}
                        {latitude}
                      </div>
                    )}
                    {longitude && (
                      <div className="text-sm">
                        <input
                          className="hidden"
                          type=""
                          id={longitude}
                          value={longitude}
                          {...register("lon")}
                        />
                        <span className="font-semibold">Latitude :-</span>{" "}
                        {longitude}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="join gap-1 p-6">
                    <input
                      onClick={() => setProfile("farmer")}
                      className="join-item btn btn-square p-2 w-20"
                      type="radio"
                      name="options"
                      value="farmer"
                      aria-label="farmer"
                      id="farmer"
                      {...register("isA")}
                    />

                    <input
                      onClick={() => setProfile("ngo")}
                      className=" w-20 join-item btn btn-square p-2"
                      type="radio"
                      name="options"
                      aria-label="ngo"
                      id="ngo"
                      value="ngo"
                      {...register("isA")}
                    />
                  </div>
                </div>

                {profile == "farmer" && (
                  <Fill
                    emaill={user.email}
                    nameLabel={"Farmer full Name"}
                    abtLabel={"About Farmer"}
                  />
                )}
                {profile == "ngo" && (
                  <Fill
                    emaill={user.email}
                    nameLabel={"NGO Name"}
                    abtLabel={" Description (Which niche it is working on)"}
                  />
                )}

                <button
                  className=" py-4 px-6  m-2 rounded-2xl bg-zinc-500 text-black font-semibold"
                  type="submit"
                >
                  Submit!
                </button>
              </form>
            </div>
          </>
        )}
        {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
        {showEditModal && (
          <>
            {/* <addGrains /> */}

            <div className="mw  fixed left-0 right-0 bottom-0 top-0 backdrop-blur "></div>
            <div className="mc fixed  left-1/2 right-0 bottom-0 top-16 border  rounded-3xl p-6 bg-slate-300 text-center">
              <h2 className="font-bold text-3xl p-4">
                <span className="flex justify-center items-center gap-1">
                  {" "}
                  <MdAccountBox size={40} />
                  Edit Profile
                </span>
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2 justify-center">
                  <div
                    className="border-2 p-2 rounded-xl bg-purple-400"
                    onClick={() => fetchLocation()}
                  >
                    <span className="flex gap-2">
                      Get Live Location <GiClick size={24} />
                    </span>
                  </div>

                  <div>
                    {latitude && (
                      <div className="text-sm">
                        <input
                          className="hidden"
                          type=""
                          id={latitude}
                          value={latitude}
                          {...register("lat")}
                        />
                        <span className="font-semibold">Latitude :-</span>{" "}
                        {latitude}
                      </div>
                    )}
                    {longitude && (
                      <div className="text-sm">
                        <input
                          className="hidden"
                          type=""
                          id={longitude}
                          value={longitude}
                          {...register("lon")}
                        />
                        <span className="font-semibold">Latitude :-</span>{" "}
                        {longitude}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="join gap-1 p-6">
                    <input
                      className="join-item btn btn-circle p-2 bg-violet-500 w-20"
                      type="text"
                      defaultValue={Data.isa}
                      name="options"
                      value={Data.isa}
                      aria-label={Data.isa}
                      id={Data.isa}
                      {...register("isA")}
                    />
                  </div>
                </div>

                {Data.isa == "farmer" && (
                  <Fill
                    emaill={user.email}
                    name={Data.name}
                    website={Data.website}
                    add1={Data.add1}
                    add2={Data.add2}
                    about={Data.about}
                    phone={Data.phone}
                    nameLabel={"Farmer full Name"}
                    abtLabel={"About Farmer"}
                  />
                )}
                {Data.isa == "ngo" && (
                  <Fill
                    emaill={user.email}
                    name={Data.name}
                    website={Data.website}
                    add1={Data.add1}
                    add2={Data.add2}
                    about={Data.about}
                    phone={Data.phone}
                    nameLabel={"NGO Name"}
                    abtLabel={" Description (Which niche it is working on)"}
                  />
                )}

                <button
                  className=" py-4 px-6  m-2 rounded-2xl bg-zinc-500 text-black font-semibold"
                  type="submit"
                >
                  Submit!
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
