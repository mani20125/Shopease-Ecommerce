import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../../utils/auth";
import { Heart, ShoppingBag, Menu, X } from "lucide-react";
import { getCartItems } from "../../services/cartService";
import { getWishlistItems } from "../../services/wishlistService";
import { useSearchParams } from "react-router-dom";
import { isAdmin } from "../../utils/auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileCategoryGroup, setMobileCategoryGroup] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
  ];
  const categoryGroups = [
    {
      title: "Fashion",
      items: [
        {
          name: "Men's Wear",
          category: ["mens-shirts", "mens-shoes"],
        },
        {
          name: "Women's Wear",
          category: [
            "womens-dresses",
            "womens-shoes",
            "womens-jewellery",
          ],
        },
        {
          name: "Watches",
          category: [
            "mens-watches",
            "womens-watches",
          ],
        },
      ],
    },

    {
      title: "Electronics",
      items: [
        {
          name: "Smartphones",
          category: ["smartphones"],
        },
        {
          name: "Laptops",
          category: ["laptops"],
        },
        {
          name: "Tablets",
          category: ["tablets"],
        },
      ],
    },

    {
      title: "Lifestyle",
      items: [
        {
          name: "Beauty",
          category: [
            "beauty",
            "fragrances",
            "skin-care",
          ],
        },
        {
          name: "Accessories",
          category: [
            "sunglasses",
            "bags",
            "jewellery",
          ],
        },
        {
          name: "Home & Living",
          category: [
            "home-decoration",
          ],
        },
      ],
    },

    {
      title: "Food & Sports",
      items: [
        {
          name: "Groceries",
          category: [
            "groceries",
          ],
        },
        {
          name: "Kitchen",
          category: [
            "kitchen-accessories",
          ],
        },
        {
          name: "Sports",
          category: [
            "sports-accessories",
          ],
        },
      ],
    },

    {
      title: "Automotive",
      items: [
        {
          name: "Cars & Bikes",
          category: [
            "motorcycle",
            "vehicle",
          ],
        },
      ],
    },
  ];
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const cartItems = await getCartItems();
        setCartCount(cartItems.length);
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    };

    const fetchWishlistCount = async () => {
      try {
        const user = getCurrentUser();

        if (!user) {
          setWishlistCount(0);
          return;
        }

        const wishlistItems = await getWishlistItems(user.id);

        setWishlistCount(wishlistItems.length);
      } catch (error) {
        console.error("Failed to fetch wishlist count:", error);
      }
    };
    fetchCartCount();
    fetchWishlistCount();

    // Update navbar when login/logout changes localStorage
    const syncUser = () => {
      setCurrentUser(getCurrentUser());
      fetchCartCount();
      fetchWishlistCount();
    };

    window.addEventListener("storage", syncUser);

    // Refresh when window/tab gets focus
    window.addEventListener("focus", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("focus", syncUser);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    navigate("/");
  };
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
    } else {
      navigate("/shop");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-[#1F2340]"
        >
          ShopEase
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">

          {links.map((link) => (
            link.name === "Categories" ? (

              <div className="relative">

                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="text-[15px] font-medium text-gray-500 hover:text-[#1F2340] transition"
                >
                  Categories
                </button>


                {categoryOpen && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] bg-white rounded-3xl shadow-xl border border-gray-100 p-6 z-50">

                    <div className="grid grid-cols-3 gap-8">

                      {categoryGroups.map((group) => (
                        <div key={group.title}>

                          <h3 className="font-bold text-[#1F2340] mb-4">
                            {group.title}
                          </h3>


                          <div className="space-y-2">

                            {group.items.map((item) => (
                              <button
                                key={item.name}
                                onClick={() => {
                                  navigate(
                                    `/category/${encodeURIComponent(
                                      JSON.stringify(item.category)
                                    )}?title=${item.name}`
                                  );

                                  setCategoryOpen(false);
                                }}
                                className="block text-sm text-gray-500 hover:text-[#7C8CF8] transition"
                              >
                                {item.name}
                              </button>
                            ))}

                          </div>

                        </div>
                      ))}

                    </div>

                  </div>
                )}

              </div>

            ) : (

              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-[15px] font-medium transition ${isActive
                    ? "text-[#1F2340]"
                    : "text-gray-500 hover:text-[#1F2340]"
                  }`
                }
              >
                {link.name}
              </NavLink>

            )
          ))}

        </nav>

        <div className="hidden lg:block">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-72 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7C8CF8] focus:border-transparent"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          <Link
            to="/wishlist"
            className="relative flex text-gray-500 hover:text-[#1F2340] transition"
          >
            <Heart size={20} strokeWidth={1.8} />

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#7C8CF8] text-white text-[10px] flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative text-gray-500 hover:text-[#1F2340] transition"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#7C8CF8] text-white text-[10px] flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {currentUser ? (
            <div className="hidden md:flex items-center gap-3">

              <Link
                to="/profile"
                className="flex items-center gap-2 hover:opacity-80 transition"
              >

                {/* User Avatar */}
                <div className="w-9 h-9 rounded-full bg-[#7C8CF8] text-white flex items-center justify-center font-semibold text-sm border-2 border-white shadow-sm">
                  {currentUser.name?.charAt(0).toUpperCase()}
                </div>


                <span className="text-sm font-medium text-[#1f2340]">
                  Hi, {currentUser.name}
                </span>

              </Link>

              {isAdmin() && (
                <Link
                  to="/admin"
                  className="bg-[#7C8CF8] text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-[#1c2252] text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition"
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="text-[#1F2340] font-medium hover:text-[#7C8CF8] transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-[#1F2340] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-y-auto transition-all duration-300 ${isOpen ? "max-h-screen py-6" : "max-h-0"
          } bg-[#F9F9FB]`}
      >
        <div className="px-6 space-y-5">
          <div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7C8CF8] focus:border-transparent"
            />
          </div>
          {links.map((link) => (
            link.name === "Categories" ? (

              <div key={link.name}>

                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="block text-gray-700"
                >
                  Categories
                </button>
                


                {categoryGroups.map((group) => (
                  <div key={group.title}>

                    <button
                      onClick={() =>
                        setMobileCategoryGroup(
                          mobileCategoryGroup === group.title
                            ? null
                            : group.title
                        )
                      }
                      className="w-full flex justify-between items-center text-sm font-semibold text-[#1F2340] py-2"
                    >
                      {group.title}

                      <span>
                        {mobileCategoryGroup === group.title ? "−" : "+"}
                      </span>

                    </button>


                    {mobileCategoryGroup === group.title && (

                      <div className="ml-4 mt-2 space-y-2">

                        {group.items.map((item) => (

                          <button
                            key={item.name}
                            onClick={() => {
                              navigate(
                                `/category/${encodeURIComponent(
                                  JSON.stringify(item.category)
                                )}?title=${item.name}`
                              );

                              setIsOpen(false);
                              setCategoryOpen(false);
                              setMobileCategoryGroup(null);
                            }}
                            className="block text-sm text-gray-600"
                          >
                            {item.name}
                          </button>

                        ))}

                      </div>

                    )}

                  </div>
                ))}

              </div>

            ) : (

              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700"
              >
                {link.name}
              </NavLink>

            )
          ))}
          {currentUser ? (
            <>
              <p className="font-medium text-[#1F2340]">
                Hi, {currentUser.name}
              </p>

              {isAdmin() && (
                <Link
                  to="/admin"
                  className="block bg-[#7C8CF8] text-white px-4 py-3 rounded-xl text-center font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-3 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-center border border-[#1F2340] text-[#1F2340] px-6 py-3 rounded-full"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="text-center bg-[#1F2340] text-white px-6 py-3 rounded-full"
              >
                Sign Up
              </Link>
            </div>
          )}

        </div>

      </div>
    </header >
  );
}

export default Navbar;