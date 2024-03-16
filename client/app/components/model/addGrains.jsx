import { useForm } from "react-hook-form";

export const AddGrains = () => {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {},
  });

  return (
    <>
      <div className="  w-full ">
        <div className="flex-col mx-8">
          <div className="w-full  relative  ">
            <input
              {...register("grainName")}
              placeholder=" "
              className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
            />
            <label
              className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
            >
              Name of the grain
            </label>
          </div>

          <div className="w-full  relative pt-1">
            <input
              {...register("quantity")}
              placeholder=" "
              className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
            />
            <label
              className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
            >
              Quantity in Kgs
            </label>
          </div>

          <div className="w-full  relative pt-1">
            <input
              {...register("add2")}
              // defaultValue={add2}
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
              // {...register("about")}
              // defaultValue={about}
              placeholder=" "
              className={` peer  w-full p-5  font-light bg-white border-2 rounded-md outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
            />
            <label
              className={`absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
            >
              {/* {abtLabel} */}
            </label>
          </div>

          <div className="w-full pt-1 relative">
            <input
              // {...register("mail")}
              // defaultValue={emaill}
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
              // {...register("phone")}
              // defaultValue={phone}
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
              // {...register("website/social")}
              // defaultValue={website}
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
      <button>hlo</button>
    </>
  );
};
