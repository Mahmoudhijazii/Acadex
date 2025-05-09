import React, { useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ids = [5, 7, 9, 11, 12]
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          ids.map(async (id) => {
            try {
              const res = await fetch(`https://student-x.onrender.com/api/listings/${id}`);
              if (!res.ok) {
                console.warn(`Failed to fetch item ${id}: ${res.status}`);
                return null;
              }
              return await res.json();
            } catch (err) {
              console.warn(`Error fetching item ${id}:`, err);
              return null;
            }
          })
        );

        // Filter out failed requests
        const validResults = results.filter(result => result !== null);
        console.log("Valid API Results:", validResults);
        
        if (validResults.length === 0) {
          throw new Error("No products could be loaded");
        }
        
        setLatestProducts(validResults);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <p className="text-center py-8">Loading latest collection…</p>;
  if (error)
    return (
      <p className="text-center py-8 text-red-500">
        Error loading products: {error}
      </p>
    );

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="mx-auto w-3/4 text-gray-600 text-sm md:text-base">
          Explore Student-X's latest collection—dorm essentials, unique finds, and more!
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* This wrapper prevents jumps during animation */}
        <div className="flex whitespace-nowrap">
          {/* First copy that moves from right to left */}
          <div className="flex animate-marquee">
            {latestProducts.map((item, i) => (
              <div
                key={`product-${item?.id || i}`}
                className="flex-shrink-0 w-[250px] mr-5"
              >
                <ProductItem
                  id={item?.id || item?._id || `temp-${i}`}
                  image={item?.image_urls?.[0] || ''}
                  name={item?.name || item?.users?.name || 'Product'}
                  price={parseFloat(item?.price) || 0}
                />
              </div>
            ))}
          </div>
          
          {/* Second copy that follows the first */}
          <div className="flex animate-marquee">
            {latestProducts.map((item, i) => (
              <div
                key={`product-copy-${item?.id || i}`}
                className="flex-shrink-0 w-[250px] mr-5"
              >
                <ProductItem
                  id={item?.id || item?._id || `temp-copy-${i}`}
                  image={item?.image_urls?.[0] || ''}
                  name={item?.name || item?.users?.name || 'Product'}
                  price={parseFloat(item?.price) || 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;