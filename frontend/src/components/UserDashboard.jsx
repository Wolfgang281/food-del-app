import { useRef, useState } from "react";
// scrollbar hidden via inline style: scrollbarWidth:"none"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";
import FoodCard from "./FoodCard";
import Navbar from "./Navbar";

const MOCK_CATEGORIES = [
  {
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
  },
  {
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
  },
  {
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300",
  },
  {
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300",
  },
  {
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300",
  },
  {
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1604508021597-f6fe54c4cd7a?w=300",
  },
];
const MOCK_SHOPS = [
  {
    _id: "1",
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300",
  },
  {
    _id: "2",
    name: "Burger Palace",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828a9b4?w=300",
  },
  {
    _id: "3",
    name: "Pizza Hub",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300",
  },
];
const MOCK_ITEMS = [
  {
    _id: "1",
    name: "Paneer Tikka",
    price: 180,
    category: "snacks",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300",
    rating: { average: 4, count: 120 },
  },
  {
    _id: "2",
    name: "Chicken Burger",
    price: 220,
    category: "burgers",
    foodType: "non-veg",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
    rating: { average: 5, count: 89 },
  },
  {
    _id: "3",
    name: "Margherita Pizza",
    price: 299,
    category: "pizza",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
    rating: { average: 3, count: 54 },
  },
  {
    _id: "4",
    name: "Gulab Jamun",
    price: 80,
    category: "desserts",
    foodType: "veg",
    image: "https://images.unsplash.com/photo-1601303516534-bf4d7f2d4a15?w=300",
    rating: { average: 4, count: 200 },
  },
];

// Reusable scroll row with wired buttons
function ScrollRow({ children, label, badge }) {
  const ref = useRef();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = () => {
    const el = ref.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  // Check on mount
  const onRefMount = (el) => {
    ref.current = el;
    if (el) {
      updateArrows();
      el.addEventListener("scroll", updateArrows);
    }
  };

  const scroll = (dir) =>
    ref.current?.scrollBy({
      left: dir === "left" ? -220 : 220,
      behavior: "smooth",
    });

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400 mb-0.5">
            {label[0]}
          </p>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            {label[1]}
          </h2>
        </div>
        {badge && (
          <span className="text-xs font-semibold text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Left arrow — hidden when at start */}
        <button
          className={`shrink-0 w-8 h-8 bg-white border border-stone-200 rounded-full shadow-sm flex items-center justify-center text-stone-400 hover:text-orange-500 hover:border-orange-200 transition-all cursor-pointer ${
            showLeft
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => scroll("left")}
        >
          <FaChevronLeft size={11} />
        </button>

        {/* Hide scrollbar cross-browser via inline style */}
        <div
          ref={onRefMount}
          className="flex-1 flex overflow-x-auto gap-3 pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>

        {/* Right arrow — hidden when at end */}
        <button
          className={`shrink-0 w-8 h-8 bg-white border border-stone-200 rounded-full shadow-sm flex items-center justify-center text-stone-400 hover:text-orange-500 hover:border-orange-200 transition-all cursor-pointer ${
            showRight
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => scroll("right")}
        >
          <FaChevronRight size={11} />
        </button>
      </div>
    </section>
  );
}

function UserDashboard() {
  const { city, shopsInMyCity } = useSelector((state) => state.user);

  const [activeCategory, setActiveCategory] = useState("");

  return (
    <div className="w-full min-h-screen bg-stone-50 flex flex-col items-center pb-16">
      <Navbar />

      <div className="w-full max-w-6xl flex flex-col gap-10 px-4 sm:px-6 pt-6">
        {/* ── Hero Banner ── */}
        <section className="w-full bg-orange-500 rounded-2xl px-6 py-8 sm:px-10 sm:py-10 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-orange-400 rounded-full opacity-40" />
          <div className="absolute -bottom-10 -right-4 w-28 h-28 bg-orange-600 rounded-full opacity-30" />
          <div className="relative z-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-100 mb-2">
              {city}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-1">
              Hungry? We've got you 🍔
            </h1>
            <p className="text-sm text-orange-100 font-medium">
              Explore the best food around you
            </p>
          </div>
        </section>

        {/* ── Categories ── */}
        <ScrollRow label={["Browse", "What are you craving?"]}>
          {MOCK_CATEGORIES.map((cate, index) => (
            <CategoryCard
              key={index}
              name={cate.category}
              image={cate.image}
              active={activeCategory === cate.category}
              onClick={() => setActiveCategory(cate.category)}
            />
          ))}
        </ScrollRow>

        {/* ── Best Shops ── */}
        <ScrollRow
          label={["Near You", `Best shops in ${city}`]}
          badge={`${shopsInMyCity} shops`}
        >
          {shopsInMyCity.map((shop, index) => (
            <CategoryCard key={index} name={shop.name} image={shop.image} />
          ))}
        </ScrollRow>

        {/* ── Food Items Grid ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400 mb-0.5">
                {activeCategory === "All" ? "All Items" : activeCategory}
              </p>
              <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                Suggested for you
              </h2>
            </div>
            <span className="text-xs font-semibold text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
              {MOCK_ITEMS.length} items
            </span>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {MOCK_ITEMS.map((item, index) => (
              <FoodCard key={index} data={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserDashboard;
