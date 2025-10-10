"use client";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { add_cart_product } from "@/redux/features/cartSlice";
import { useGetThaliItemsQuery } from "@/redux/features/foodItemApi";

const BestSellingThalis = () => {
  const dispatch = useDispatch();
  const { cart_products } = useSelector((state) => state.cart);

  // Call your API
  const { data, isLoading, error } = useGetThaliItemsQuery();

  // Normalize the API response to always be an array
  const thaliProducts = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    :Array.isArray(data?.thalis)
    ? data.thalis
    : [];
  
    // Add safe default
    const safeThalis = thaliProducts.map((t,i) => ({
      ...t,
      _id: t._id || `thali-${i}-${Date.now()}`,
      name: t.name || 'Unnamed Thali',
      img: t.img || '/placeholder.png',
      price: t.price || 0,
      originalPrice: t.originalPrice || 0,
      available: t.available ?? true,
      category: t.category || { name: 'Thali' },
      _key: `${t._id || `thali-${i}-${Dtae.now()}`}-${i}-${Math.random().toString(36).substr(2,19)}`
    }))



  // handle add product
  const handleAddProduct = (product) => {
    const cartProduct = {
      ...product,
      id: product._id,
      title: product.name,
      image: product.img,
      category: product.category || { name: "Thali" }, 
      parent: "Thali", 
      productType: "thali", 
      quantity: product.quantity || 2, 
    };
    dispatch(add_cart_product(cartProduct));
  };

  const getCustomOrder = (thalis = []) => {
    if (!Array.isArray(thalis) || thalis.length === 0) return [];

    const orderPriority = [
      "Urban Premium Thali",
      "Everyday Thali",
      "Mini Urban Thali",
      "Urban Feast Thali",
      "Maharaja Urban Thali",
    ];

    // Sort known thalis first
    const known = thalis.filter((t) =>
      orderPriority.some((name) =>
        t?.name?.toLowerCase()?.includes(name.toLowerCase())
      )
    );

    // Sort the rest (new ones) by latest createdAt
    const others = thalis.filter(
      (t) =>
        !orderPriority.some((name) =>
          t?.name?.toLowerCase()?.includes(name.toLowerCase())
        )
    );

    known.sort((a, b) => {
      const aIndex = orderPriority.findIndex((n) =>
        a.name.toLowerCase().includes(n.toLowerCase())
      );
      const bIndex = orderPriority.findIndex((n) =>
        b.name.toLowerCase().includes(n.toLowerCase())
      );
      return aIndex - bIndex;
    });

    others.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Return all thalis — known first, then new ones
    return [...known, ...others];
  };

  const displayThalis = getCustomOrder(thaliProducts);

  // ✅ Now safely define displayThalis
  // const displayThalis = getCustomOrder(thaliProducts);

  // Show loading state
  if (isLoading) {
    return (
      <section className="tp-product-area pt-60 pb-60">
        <div className="container">
          <div className="text-center">
            <p>Loading thali products...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="tp-product-area pt-60 pb-60">
        <div className="container">
          <div className="text-center">
            <p>Error loading thali products. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="tp-product-area pt-60"
      style={{
        marginLeft: "0",
        marginRight: "0",
        paddingLeft: "0",
        paddingRight: "0",
        paddingBottom: "0",
      }}
    >
      <div
        className="container-fluid"
        style={{ paddingLeft: "0", paddingRight: "0" }}
      >
        <div className="row" style={{ marginLeft: "0", marginRight: "0" }}>
          <div
            className="col-xl-12"
            style={{ paddingLeft: "0", paddingRight: "0" }}
          >
            <div
              className="tp-section-title-wrapper-3 mb-30 text-center"
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <h3
                className="tp-section-title-3"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                Best Selling Thalis
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                Discover our premium thali collection, from mini portions to
                luxury gold thalis, carefully curated for every appetite
              </p>
            </div>
          </div>
        </div>

        <div
          className="row"
          style={{
            marginLeft: "0",
            marginRight: "0",
            display: "flex",
            gap: "12px",
            paddingLeft: "20px",
            paddingRight: "20px",
            flexWrap: "wrap",
          }}
        >
          {displayThalis?.map((product) => (
            <div
              key={product._id}
              style={{
                width: "calc(20% - 9.6px)",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  height: "100%",
                  width: "100%",
                }}
              >
                {/* Product Image */}
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <div
                    style={{
                      backgroundImage: `url(${product.img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  ></div>
                </div>

                {/* Product Content */}
                <div style={{ padding: "12px" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      marginBottom: "2px",
                      color: "#1f2937",
                    }}
                  >
                    <Link
                      href={`/product-details/${product._id}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {product.name}
                    </Link>
                  </h3>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "4px",
                      fontWeight: "500",
                    }}
                  >
                    {product?.category?.name || "Thali"}
                  </p>

                  {/* Veg Thali Label */}
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#FCB53B",
                      fontWeight: "600",
                      marginBottom: "4px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Veg Thali
                  </div>

                  {/* Rating */}
                  <div style={{ marginBottom: "4px" }}>
                    {/* Custom rating display based on thali name */}
                    {(() => {
                      const getRating = (thaliName) => {
                        const name = thaliName?.toLowerCase() || "";
                        if (name.includes("urban premium")) return 4.9;
                        if (name.includes("everyday")) return 4.6;
                        if (name.includes("mini urban")) return 4.5;
                        if (name.includes("urban feast")) return 4.2;
                        if (name.includes("maharaja")) return 4.0;
                        return product.rating || 4.5; // fallback to API rating
                      };

                      const rating = getRating(product.name);
                      const fullStars = Math.floor(rating);
                      const hasHalfStar = rating % 1 !== 0;

                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              style={{
                                color: i < fullStars ? "#fbbf24" : "#d1d5db",
                                fontSize: "12px",
                              }}
                            >
                              ★
                            </span>
                          ))}
                          {hasHalfStar && (
                            <span
                              style={{
                                color: "#fbbf24",
                                fontSize: "12px",
                              }}
                            >
                              ☆
                            </span>
                          )}
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#6b7280",
                              marginLeft: "4px",
                            }}
                          >
                            {rating}
                          </span>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Product Details - Time and Servings */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "4px",
                    }}
                  >
                    {/* Time */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        style={{ width: "16px", height: "16px" }}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      <span>{product.prepTime || "20 min"}</span>{" "}
                      {/* Dynamic prepTime from API */}
                    </div>

                    {/* Servings */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        style={{ width: "16px", height: "16px" }}
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span>{product.unit || "1"} serving</span>
                    </div>
                  </div>

                  {/* Description or Tags */}
                  {/* <div style={{ marginBottom: "8px" }}>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        lineHeight: "1.4",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.description}
                    </p>
                  </div> */}

                  {/* Ingredients */}
                  {/* Ingredients */}
                  {/* Description Section */}
                  {product?.description && (
                    <div style={{ marginBottom: "6px" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          lineHeight: "1.4",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.description}
                      </p>
                    </div>
                  )}

                  {/* Ingredients Section */}
                  {product?.ingredients && product?.ingredients.length > 0 && (
                    <div style={{ marginBottom: "8px" }}>
                      <h4
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#1f2937",
                          marginBottom: "2px",
                        }}
                      >
                        Ingredients
                      </h4>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          lineHeight: "1.4",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.ingredients.join(", ")}
                      </p>
                    </div>
                  )}

                  {/* Price and Add to Cart */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#FCB53B",
                        }}
                      >
                        ₹{product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#9ca3af",
                            textDecoration: "line-through",
                            marginLeft: "8px",
                          }}
                        >
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => handleAddProduct(product)}
                        disabled={!product.available}
                        style={{
                          backgroundColor: product.available
                            ? "#FCB53B"
                            : "#d1d5db",
                          color: "white",
                          padding: "6px 16px",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontSize: "13px",
                          fontWeight: "600",
                          border: "none",
                          cursor: product.available ? "pointer" : "not-allowed",
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          height: "32px",
                          minWidth: "80px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {product.available ? "Add" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingThalis;

// 'use client';
// import React from "react";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { add_cart_product } from "@/redux/features/cartSlice";
// import { useGetThaliItemsQuery } from "@/redux/features/foodItemApi";

// const BestSellingThalis = () => {
//   const dispatch = useDispatch();
//   const { cart_products } = useSelector((state) => state.cart);

//   const { data, isLoading, error } = useGetThaliItemsQuery();

//   // Normalize API response to an array
//   const thaliProducts = Array.isArray(data)
//     ? data
//     : Array.isArray(data?.data)
//       ? data.data
//       : Array.isArray(data?.thalis)
//         ? data.thalis
//         : [];

//   // Add safe defaults so UI never breaks
// const safeThalis = thaliProducts.map((t, i) => ({
//   ...t,
//   _id: t._id || `thali-${i}-${Date.now()}`,
//   name: t.name || 'Unnamed Thali',
//   img: t.img || '/placeholder.png',
//   price: t.price || 0,
//   originalPrice: t.originalPrice || 0,
//   available: t.available ?? true,
//   category: t.category || { name: 'Thali' },
//   _key: `${t._id || `thali-${i}-${Date.now()}`}-${i}-${Math.random().toString(36).substr(2, 9)}`
// }));

//   const handleAddProduct = (product) => {
//     const cartProduct = {
//       ...product,
//       id: product._id,
//       title: product.name,
//       image: product.img,
//       category: product.category || { name: "Thali" },
//       parent: "Thali",
//       productType: "thali",
//       quantity: product.quantity || 100,
//     };
//     dispatch(add_cart_product(cartProduct));
//   };

//   if (isLoading) return <p>Loading thalis...</p>;
//   if (error) return <p>Error loading thalis.</p>;

//   return (
//     <section className="tp-product-area pt-60" style={{ margin: 0, padding: 0, paddingBottom: 0 }}>
//       <div className="container-fluid" style={{ padding: 0 }}>
//         <div className="row" style={{ margin: 0 }}>
//           <div className="col-xl-12" style={{ padding: 0 }}>
//             <div className="tp-section-title-wrapper-3 mb-30 text-center" style={{ padding: '0 20px' }}>
//               <h3 className="tp-section-title-3" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '15px' }}>
//                 Best Selling Thalis
//               </h3>
//               <p style={{ fontSize: '16px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
//                 Discover our premium thali collection, from mini portions to luxury gold thalis, carefully curated for every appetite
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="row" style={{ margin: 0, display: 'flex', gap: '12px', padding: '0 20px', flexWrap: 'wrap' }}>
//           {safeThalis.map(product => (
//             <div key={product._key} style={{ width: 'calc(20% - 9.6px)', marginBottom: '30px' }}>
//               <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden', height: '100%', width: '100%' }}>
//                 <div style={{ height: '180px', overflow: 'hidden' }}>
//                   <div style={{ backgroundImage: `url(${product.img})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', width: '100%' }}></div>
//                 </div>
//                 <div style={{ padding: '12px' }}>
//                   <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '2px', color: '#1f2937' }}>
//                     <Link href={`/product-details/${product?._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{product.name}</Link>
//                   </h3>
//                   <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>
//                     {product?.category?.name || 'Thali'}
//                   </p>
//                   <div style={{ fontSize: '12px', color: '#FCB53B', fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//                     Veg Thali
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <div>
//                       <span style={{ fontSize: '20px', fontWeight: '700', color: '#FCB53B' }}>₹{product.price}</span>
//                       {product.originalPrice > product.price && (
//                         <span style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through', marginLeft: '8px' }}>₹{product.originalPrice}</span>
//                       )}
//                     </div>
//                     <div>
//                       <button
//                         onClick={() => handleAddProduct(product)}
//                         disabled={!product.available}
//                         style={{
//                           backgroundColor: product?.available ? '#FCB53B' : '#d1d5db',
//                           color: 'white',
//                           padding: '6px 16px',
//                           borderRadius: '6px',
//                           textDecoration: 'none',
//                           fontSize: '13px',
//                           fontWeight: '600',
//                           border: 'none',
//                           cursor: product.available ? 'pointer' : 'not-allowed',
//                           transition: 'all 0.3s ease',
//                           boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                           height: '32px',
//                           minWidth: '80px',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center'
//                         }}
//                       >
//                         {product?.available ? 'Add' : 'Out of Stock'}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BestSellingThalis;
