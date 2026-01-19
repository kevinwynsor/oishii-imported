'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Phone, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';
import { categories } from '@/constants/categories';

const RamenPricelist = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // On mount, mark everything visible
    const indexes = ['header', 'contact', 'footer', ...categories.map(c => `category-${c.title}`)];
    setVisibleElements(new Set(indexes));
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!(entry.target instanceof HTMLElement)) return;
          const index = entry.target.dataset.index;
          if (!index) return;

          setVisibleElements((prev) => {
            const next = new Set(prev);
            entry.isIntersecting ? next.add(index) : next.delete(index);
            return next;
          });
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Ref callback for IntersectionObserver
  const observe = (index: string) => (el: HTMLElement | null) => {
    if (!el || !observerRef.current) return;
    el.dataset.index = index;
    observerRef.current.observe(el);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-50 to-orange-50
    py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div
          ref={observe('header')}
          className={`text-center mb-12 transition-all duration-1000 transform ${
            visibleElements.has('header')
              ? 'translate-y-0 opacity-100'
              : '-translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-5xl font-bold text-red-800 mb-2 tracking-wide">
            PRICELIST
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((category) => {
            const index = `category-${category.title}`;
            return (
              <div
                key={category.title}
                ref={observe(index)}
                className={`transition-all duration-700 transform  ${
                  visibleElements.has(index)
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-20 opacity-0'
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-red-800 hover:shadow-2xl transition-shadow duration-300 ">
                  <div className="bg-gradient-to-r from-red-800 to-red-700 p-4">
                    <h2 className="text-3xl font-bold text-amber-50 text-center tracking-wider">
                      {category.title}
                    </h2>
                  </div>

                  <div className="p-6 space-y-4 ">
                    {category.items.map((item, itemIndex) => (
                      <div
                        onClick={() => setModalImage(item.photo)}
                        key={itemIndex}
                        className="group flex items-center justify-between p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-xl md:text-4xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                            {item.image}
                          </div>
                          <div className='flex flex-col'>
                            <span className="text-lg md:text-2xl font-bold text-red-800 tracking-wide">
                              {item.name}
                            </span>
                            {item.flavors && item.flavors.map((flavor)=>(
                              <span key={flavor} className="text-sm md:text-md font-bold text-red-800 tracking-wide">{flavor}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg md:text-2xl font-bold text-red-700">
                            {item.price}
                          </span>
                          <ShoppingCart className="w-6 h-6 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* delivery */}
        <div
          ref={observe('delivery')}
          className={`transition-all duration-1000 transform mt-8 ${
            visibleElements.has('delivery') ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-red-800 hover:shadow-2xl transition-shadow duration-300">
            {/* Contact Header */}
            <div className="bg-gradient-to-r from-red-800 to-red-700 p-4">
              <h2 className="text-3xl font-bold text-amber-50 text-center tracking-wider">
                SHIPMENT
              </h2>
            </div>

            <div className="p-8 space-y-6 flex flex-row">
              <div className='h-64 basis-1/2 group flex flex-col items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg mr-8'>
                <div className='flex flex-col basis-1/2 justify-center'>
                <img src="/courier.png" alt="delivery" width={200} height={150} className="mx-auto"/>
                </div>
                <div className='flex flex-col basis-1/2 text-center'>
                  <p className="text-lg md:text-xl font-bold text-red-800">Same-day delivery for greater manila (NCR, Bulacan, Cavite etc) via your selected courier</p>
                </div>
              </div>
              <div className='h-64 basis-1/2 flex-col group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg justify-center'>
                <div className='flex flex-col basis-1/2 justify-center'>
                <img src="/ph.png" alt="delivery" width={200} height={150} className="mx-auto"/>
                </div>
                <div className='flex flex-col basis-1/2 text-center justify-center'>
                  <p className="text-lg md:text-xl font-bold text-red-800">Shipping nationwide via LBC</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to order */}
        <div
          ref={observe('contact')}
          className={`transition-all duration-1000 transform mt-8 ${
            visibleElements.has('contact') ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-red-800 hover:shadow-2xl transition-shadow duration-300">
            {/* Contact Header */}
            <div className="bg-gradient-to-r from-red-800 to-red-700 p-4">
              <h2 className="text-3xl font-bold text-amber-50 text-center tracking-wider">
                HOW TO ORDER
              </h2>
            </div>

            {/* Contact Info */}
            <div className="p-8 space-y-6">
              {/* STEP1 */}
              <div
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div>
                  <p className="text-lg md:text-xl font-bold text-red-800">1. Browse our products </p>
                </div>
              </div>

              {/* STEP2 */}
              <div
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div>
                  <p className="text-lg sm:text-xl font-bold text-red-800">2. Send a message on our <a
                href="https://www.facebook.com/profile.php?id=61574972720972"
                target="_blank" className='text-blue-600'>FB </a> or <a
                href="https://instagram.com/oishii_imported_goodies"
                target="_blank" className='text-blue-600'>IG</a> account with your order</p>
                </div>
              </div>

              {/* STEP3 */}
              <div
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div>
                  <p className="text-lg md:text-xl font-bold text-red-800">3. Wait for our confirmation message. You may choose which courier you prefer</p>
                </div>
              </div>

              {/* STEP4 */}
              <div
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div>
                  <p className="text-lg md:text-xl font-bold text-red-800">4. Settle payment. Once confirmed, we'll ship your order.</p>
                </div>
              </div>

              {/* STEP5 */}
              <div
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div>
                  <p className="text-lg md:text-xl font-bold text-red-800">5. Enjoy your imported goodies!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Policy */}
        <div
          ref={observe('terms')}
          className={`transition-all duration-1000 transform mt-8 ${
            visibleElements.has('terms') ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-red-800 hover:shadow-2xl transition-shadow duration-300">
            {/* Contact Header */}
            <div className="bg-gradient-to-r from-red-800 to-red-700 p-4">
              <h2 className="text-3xl font-bold text-amber-50 text-center tracking-wider">
                TERMS AND POLICY
              </h2>
            </div>

            {/* Contact Info */}
            <div className="p-8 space-y-6">
              <div
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div>
                  <p className="text-lg md:text-xl font-bold text-red-800">- Discount will be given for bulk orders</p>
                </div>
              </div>

              <div
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div>
                  <p className="text-lg md:text-xl font-bold text-red-800">- No cash on delivery. Please pay before shipment.</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {modalImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setModalImage(null)}
          >
            <div
              className="bg-white rounded-2xl p-6 max-w-sm mx-auto relative"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal content
            >
              <button
                className="absolute top-2 right-2 text-red-700 font-bold text-xl"
                onClick={() => setModalImage(null)}
              >
                ×
              </button>
              <img src={modalImage} height={750} width={750} alt={modalImage}/>
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          ref={observe('footer')}
          className={`text-center mt-12 transition-all duration-1000 transform ${
            visibleElements.has('footer')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-red-800 text-lg font-semibold">
            Order now and enjoy authentic imported products!
          </p>
        </div>

      </div>
    </div>
  );
};

export default RamenPricelist;
