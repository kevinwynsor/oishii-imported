'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Phone, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';

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

  const categories = [
    {
      title: "STRAIGHT RAMEN",
      items: [
        { name: "ICHIRAN 5", price: "₱1200", image: "🍜", photo: '/ichiran_5.png' },
        { name: "ICHIRAN 2", price: "₱650", image: "🍜", photo: '/ichiran_2.png' }
      ]
    },
    {
      title: "CURLY RAMEN",
      items: [
        { name: "ICHIRAN 5", price: "₱1200", image: "🍜", photo: '/ichiran_curly.png' },
      ]
    },
    {
      title: "NISSIN",
      items: [
        { name: "NISSIN SEAFOOD", price: "₱120", image: "🥡", photo: '/nissin.png' }
      ]
    },
    {
      title: "BULDAK",
      items: [
        { name: "BULDAK CARBONARA", price: "₱375", image: "🥵🍜", photo: '/buldak_carbo.png' }
      ]
    },
    {
      title: "PEPERO",
      items: [
        { name: "PEPERO ORIGINAL", price: "₱45", image: "╱", photo: '/pepero_original.png' },
        { name: "PEPERO ALMOND", price: "₱45", image: "╱", photo: '/pepero_almond.jpg' },
        { name: "PEPERO STRAWBERRY", price: "₱45", image: "╱", photo: '/pepero_strawberry.png' },
        { name: "PEPERO WHITE COOKIE", price: "₱45", image: "╱", photo: '/pepero_white_cookie.png' },
      ]
    },
  ];

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
                          <span className="text-lg md:text-2xl font-bold text-red-800 tracking-wide">
                            {item.name}
                          </span>
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

        {/* Contact Us Card */}
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
                CONTACT US
              </h2>
            </div>

            {/* Contact Info */}
            <div className="p-8 space-y-6">
              {/* Phone */}
              <a
                href="tel:+1234567890"
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-red-800 p-3 rounded-full transition-transform duration-300 group-hover:rotate-12">
                  <Phone className="w-6 h-6 text-amber-50" />
                </div>
                <div>
                  <p className="text-sm text-red-700 font-semibold">Phone</p>
                  <p className="text-lg md:text-xl font-bold text-red-800">+63 908 422 2891</p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/oishii_imported_goodies"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-full transition-transform duration-300 group-hover:rotate-12">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-red-700 font-semibold">Instagram</p>
                  <p className="text-lg md:text-xl font-bold text-red-800">@oishii_imported_goodies</p>
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61574972720972"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-blue-600 p-3 rounded-full transition-transform duration-300 group-hover:rotate-12">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-red-700 font-semibold">Facebook</p>
                  <p className="text-lg md:text-xl font-bold text-red-800">Oishii Imported Goodies 
</p>
                </div>
              </a>
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
            Order now and enjoy authentic Japanese ramen!
          </p>
        </div>

      </div>
    </div>
  );
};

export default RamenPricelist;
