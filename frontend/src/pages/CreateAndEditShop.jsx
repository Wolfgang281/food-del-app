import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateAndEditShop() {
  const navigate = useNavigate();
  const { shopData } = useSelector((state) => state.owner);
  const { city: userCity, state: userState } = useSelector(
    (state) => state.user,
  );

  const [name, setName] = useState(shopData ? shopData.name : "");
  const [city, setCity] = useState(shopData ? shopData.city : userCity || "");
  const [state, setState] = useState(
    shopData ? shopData.state : userState || "",
  );
  const [address, setAddress] = useState(shopData ? shopData.address : "");
  const [loading] = useState(false);

  const handleSubmit = () => {};

  return (
    <div className="min-h-screen w-full bg-stone-50 flex flex-col items-center px-4 py-10">
      {/* Back button */}
      <div className="w-full max-w-md mb-6">
        <button
          className="flex items-center gap-1.5 text-stone-700 hover:text-orange-500 transition-colors cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <IoIosArrowRoundBack
            size={20}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span className="text-xs font-medium uppercase tracking-widest">
            Back
          </span>
        </button>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-2xl shadow-sm p-7 sm:p-9">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400 mb-1">
            {shopData ? "Update details" : "New restaurant"}
          </p>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            {shopData ? "Edit your shop" : "List your shop"}
          </h1>
          <p className="mt-1.5 text-sm text-stone-700">
            {shopData
              ? "Update your restaurant information below."
              : "Fill in the details to get listed on OrderKaro."}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Shop Name */}
          <div>
            <label className="block text-[10px] font-semibold text-stone-700 uppercase tracking-[0.15em] mb-2">
              Shop Name
            </label>
            <input
              type="text"
              placeholder="e.g. Spice Garden"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder:text-stone-600 focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all duration-200"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-[10px] font-semibold text-stone-700 uppercase tracking-[0.15em] mb-2">
              Shop Image
            </label>

            {/* Preview or upload trigger */}
            <div className="w-full h-36 rounded-xl border-2 border-dashed border-stone-200 bg-stone-50 hover:border-orange-300 hover:bg-orange-50/30 transition-all duration-200 cursor-pointer overflow-hidden flex items-center justify-center relative">
              {/* {frontendImage ? (
                <img
                  src={frontendImage}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-stone-600">
                  <FaUtensils size={22} />
                  <span className="text-xs font-medium">
                    Click to upload image
                  </span>
                </div>
              )} */}

              {/* Change overlay when image exists */}
              {/* {frontendImage && (
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-semibold uppercase tracking-widest">
                    Change
                  </span>
                </div>
              )} */}
            </div>

            {/* <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            /> */}
          </div>

          {/* City + State */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-semibold text-stone-700 uppercase tracking-[0.15em] mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="Gurugram"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder:text-stone-600 focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-stone-700 uppercase tracking-[0.15em] mb-2">
                State
              </label>
              <input
                type="text"
                placeholder="Haryana"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder:text-stone-600 focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-[10px] font-semibold text-stone-700 uppercase tracking-[0.15em] mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Full shop address"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder:text-stone-600 focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all duration-200"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>

          {/* Submit */}
          <button
            className="w-full bg-stone-900 hover:bg-orange-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl text-sm tracking-wide transition-all duration-300 cursor-pointer shadow-sm mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Saving…
              </span>
            ) : shopData ? (
              "Save Changes →"
            ) : (
              "Create Shop →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAndEditShop;
