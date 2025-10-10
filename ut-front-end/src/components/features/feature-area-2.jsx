"use client";
import React from "react";
import { Heart, Home, Calendar, CheckCircle } from "lucide-react";


export const feature_data = [
  {
    icon: <Heart size={24} color="#84994F" />,
    title: "Healthy Ingredients",
    subtitle:
      "We use only the freshest, highest quality vegetables and ingredients sourced daily",
  },
  {
    icon: <Home size={24} color="#B45253" />,
    title: "Hygienic Kitchen",
    subtitle:
      "Our kitchen follows strict hygiene standards with regular sanitization and quality control measures",
  },
  {
    icon: <Calendar size={24} color="#FCB53B" />,
    title: "Homely Taste",
    subtitle:
      "Experience the authentic taste of home-cooked meals prepared with traditional recipes and love",
  },
  {
    icon: <CheckCircle size={24} color="#FFE797" />,
    title: "100% Veg",
    subtitle:
      "Completely vegetarian menu with no meat, fish, or eggs - perfect for all dietary preferences",
  },
];


const FeatureAreaTwo = () => {
  return (
    <section className={`tp-feature-area tp-feature-border-2 pb-50`}>
      <div className="container">
        {/* Header Section */}
        <div className="row mb-30">
          <div className="col-xl-12">
            <div className="tp-section-title-wrapper-3 text-center">
              <h3
                className="tp-section-title-3"
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "12px",
                }}
              >
                Why Choose Us?
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#6b7280",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                Discover what makes Urban Thali the perfect choice for your
                authentic Indian meal experience.
              </p>
            </div>
          </div>
        </div>


        <div className="tp-feature-inner-2" style={{ padding: "0 30px" }}>
          <div
            className="row align-items-center"
            style={{ marginLeft: "-10px", marginRight: "-10px" }}
          >
            {feature_data?.map((item, i) => (
              <div
                key={i}
                className="col-xl-3 col-lg-3 col-md-6 col-sm-6"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              >
                <div
                  className="tp-feature-item-2 d-flex align-items-start mb-40"
                  style={{
                    padding: "20px 16px",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    height: "100%",
                  }}
                >
                  <div className="tp-feature-icon-2 mr-10">
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div className="tp-feature-content-2">
                    <h3 className="tp-feature-title-2">{item.title}</h3>
                    <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureAreaTwo;
