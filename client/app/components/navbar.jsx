"use client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GiClick } from "react-icons/gi";
import { MdAccountBox } from "react-icons/md";

export default function Navbar() {
  const { user, isLoading } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState("farmer");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    // if (data.woman !== "WIT") {
    //   data.woman = "No";
    // }

    // if (data.experience !== "Experienced") {
    //   data.experience = "No";
    // }
    // try {
    //   const res = await axios.post(
    //     "http://localhost:4000/api/addProfile",
    //     data
    //   );

    //   if (res.data.success) {
    //     console.log(res.data.message);
    //   } else {
    //     console.log(res.data.error);
    //   }
    // } finally {
    //   reset();
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   window.location.href = "/";
    console.log(data);
    reset();
    setShowModal(!showModal);
    // }
  };

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

  const Farmer = () => {
    return (
      <>
        <div className="  w-full ">
          <div className="flex-col mx-8">
            <div className="w-full  relative  ">
              <input
                {...register("name")}
                placeholder=" "
                className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Farmer full Name
              </label>
            </div>

            <div className="w-full  relative pt-1">
              <input
                {...register("add1")}
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
                placeholder=" "
                className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                About
              </label>
            </div>

            <div className="w-full pt-1 relative">
              <input
                {...register("mail")}
                defaultValue={user.email}
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
  };

  const Ngo = () => {
    return (
      <>
        <div className="  w-full ">
          <div className="flex-col mx-8">
            <div className="w-full  relative  ">
              <input
                {...register("name")}
                placeholder=" "
                className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                NGO Name
              </label>
            </div>

            <div className="w-full  relative pt-1">
              <input
                {...register("add1")}
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
                placeholder=" "
                className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Description (Which niche it is working on)
              </label>
            </div>

            <div className="w-full pt-1 relative">
              <input
                {...register("mail")}
                // defaultValue={user.email}
                placeholder=" "
                type="text"
                className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
              />
              <label
                className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
              >
                Mail
              </label>
            </div>

            <div className="w-full pt-1  relative">
              <input
                {...register("phone")}
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
  };

  const EditProfile = () => {
    return (
      <>
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

            {profile == "farmer" && <Farmer />}
            {profile == "ngo" && <Ngo />}

            <button
              className=" py-4 px-6  m-2 rounded-2xl bg-zinc-500 text-black font-semibold"
              type="submit"
            >
              Submit!
            </button>
          </form>
        </div>
      </>
    );
  };

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
                    <a
                      className="justify-between"
                      onClick={() => setShowModal(!showModal)}
                    >
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

        {!isLoading && !user && (
          <p>
            <a href="/api/auth/login">Sign in</a>
          </p>
        )}

        {showModal && <EditProfile />}
      </div>
    </>
  );
}
