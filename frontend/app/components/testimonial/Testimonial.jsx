"use client";
import { FetchWatyLearningHomepageData } from "@/app/hooks/pageData";
import Image from "next/image";
import EnhancedShimmer from "../shimmer/enhancedShimmer";

const Testimonial = () => {
  const { watyLearningData } = FetchWatyLearningHomepageData();
  const { title = "", items = [] } = watyLearningData?.testimonials || {};
  const isLoading = !watyLearningData;

  // Shimmer card for loading state
  const ShimmerCard = () => (
    <div className="bg-gray-800/50 2xl:w-[20%] xl:w-[20%] lg:w-[30%] md:w-[30%] max-sm:w-[60%] h-[180px] border-2 border-gray-700 rounded-xl p-5">
      {/* Quote Shimmer */}
      <div className="space-y-2">
        <EnhancedShimmer className="h-3 w-full rounded" />
        <EnhancedShimmer className="h-3 w-[90%] rounded" />
        <EnhancedShimmer className="h-3 w-[80%] rounded" />
      </div>

      {/* Profile Shimmer */}
      <div className="flex gap-3 pt-5 items-center">
        <EnhancedShimmer className="w-8 h-8 rounded-full" />
        <div className="space-y-2">
          <EnhancedShimmer className="h-2 w-24 rounded" />
          <EnhancedShimmer className="h-2 w-20 rounded" />
        </div>
      </div>
    </div>
  );

  // Array of 6 items for shimmer loading
  const shimmerCount = Array.from({ length: 6 }, (_, index) => index);

  return (
    <section className="bg-mainColor 2xl:h-auto xl:h-auto lg:h-auto md:h-auto sm:h-screen text-white pb-20">
      {/* Title */}
      <h1 className="text-center text-testiColor font-primary text-testHeading max-sm:text-[25px] font-semibold pt-20 max-sm:pt-10">
        {isLoading ? (
          <div className="flex flex-col items-center gap-2">
            <EnhancedShimmer className="h-8 w-96 max-sm:w-64 rounded-lg" />
            <EnhancedShimmer className="h-8 w-64 max-sm:w-48 rounded-lg" />
          </div>
        ) : (
          title
        )}
      </h1>

      {/* Testimonials Grid */}

      <div className="2xl:flex xl:flex lg:flex md:flex sm:flex-wrap max-sm:space-y-5 gap-10 justify-center items-center mt-20 max-sm:mt-10">
        {isLoading
          ? // Map through shimmerCount array to create shimmer cards
            shimmerCount.map((index) => (
              <ShimmerCard key={`shimmer-${index}`} />
            ))
          : items.map((testimonial, index) => (
              <div
                key={index}
                className="bg-testimonial relative 2xl:w-[25%] xl:w-[25%] lg:w-[25%] md:w-[70%] max-sm:w-[70%] h-auto border-2 border-white/35 rounded-xl p-5 flex flex-col justify-between group max-sm:mx-auto"
              >
                {/* Tooltip with Increased Width and Border Styling */}
                {testimonial.review && (
                  <div
                    className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm p-3 rounded-md shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden lg:block xl:block 2xl:block max-sm:hidden"
                    style={{
                      width: "35rem", // Set a fixed width for the tooltip
                      maxWidth: "35rem", // Add a max width for responsiveness
                      border: "2px solid rgba(255, 255, 255, 0.35)", // Apply the same border as testimonial
                      borderRadius: "0.75rem", // Same rounded corners as testimonials
                    }}
                  >
                    <div
                      className="max-h-[12em] overflow-y-scroll text-ellipsis"
                      style={{
                        lineHeight: "1.5em", // Consistent spacing
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {testimonial.review}
                    </div>
                  </div>
                )}

                {/* Review Section */}
                <div className="min-h-[100px]">
                  {testimonial.review ? (
                    <p className="font-secondary font-semibold text-sm text-testiColor lg:line-clamp-4 xl:line-clamp-4 2xl:line-clamp-4 overflow-hidden text-ellipsis">
                      {testimonial.review}
                    </p>
                  ) : (
                    <p className="font-secondary font-semibold text-sm text-transparent">
                      Placeholder for consistent height
                    </p>
                  )}
                </div>

                {/* Reviewer Info */}
                <div className="flex gap-3 items-center mt-5">
                  {/* Reviewer Image */}
                  <div>
                    {testimonial.reviewerImage ? (
                      <Image
                        src={testimonial.reviewerImage}
                        width="32"
                        height="32"
                        alt={`person ${index}`}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-600 rounded-full" />
                    )}
                  </div>

                  {/* Reviewer Name and Role */}
                  <div>
                    <h2 className="font-secondary text-xs text-testiColor">
                      {testimonial.reviewer || "Anonymous"}
                    </h2>
                    <p className="font-secondary text-card text-testiColor/80">
                      {testimonial.reviewerRole}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default Testimonial;
