import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function OwnerItemCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {};

  return (
    <div className="w-full flex items-stretch bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all duration-300 group">
      {/* Image */}
      <div className="w-24 sm:w-32 shrink-0 overflow-hidden bg-stone-100 relative">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Veg / Non-veg dot */}
        <span
          className={`absolute top-2 left-2 w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${data.foodType === "veg" ? "bg-green-500" : "bg-red-500"}`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 px-4 py-3.5 sm:px-5 min-w-0">
        <div>
          {/* Badge row */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-400">
              {data.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-200" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400">
              {data.foodType}
            </span>
          </div>

          {/* Name + price */}
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-sm sm:text-base font-bold text-stone-900 leading-snug truncate">
              {data.name}
            </h2>
            <span className="shrink-0 text-sm font-bold text-orange-500">
              ₹{data.price}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 mt-3">
          <button
            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-stone-400 hover:text-orange-500 hover:bg-orange-50 px-3 py-1.5 rounded-full border border-stone-200 hover:border-orange-200 transition-all duration-200 cursor-pointer"
            onClick={() => navigate(`/edit-item/${data._id}`)}
          >
            <FaPen size={10} />
            Edit
          </button>
          <button
            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-stone-400 hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-full border border-stone-200 hover:border-red-200 transition-all duration-200 cursor-pointer"
            onClick={handleDelete}
          >
            <FaTrashAlt size={10} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default OwnerItemCard;
