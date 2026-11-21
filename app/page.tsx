"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { categories, type Category, type MenuItem } from "@/constants/categories";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61574972720972";
const INSTAGRAM_URL = "https://www.instagram.com/oishii_imported_goodies";

export default function MenuBoard() {
  const [viewing, setViewing] = useState<MenuItem | null>(null);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-board">
      <Header />

      {/* お品書き divider */}
      <div className="mx-5 mt-[26px] flex items-center gap-3.5 text-washi">
        <div className="flex-1 border-t border-board-line" />
        <div className="flex flex-col items-center gap-0.5">
          <h2 className="font-mincho text-[34px] font-extrabold leading-tight tracking-[0.12em]">
            お品書き
          </h2>
          <span className="text-[11px] tracking-[0.3em] text-washi-muted">MENU</span>
        </div>
        <div className="flex-1 border-t border-board-line" />
      </div>

      <main className="flex flex-col gap-4 px-3 pt-[22px]">
        {categories.map((category) => (
          <CategoryCard key={category.title} category={category} onView={setViewing} />
        ))}
        <p className="mx-2 my-0 text-xs leading-normal text-washi-muted">
          Prices are for reference only and may change without prior notice.
        </p>
      </main>

      <Delivery />
      <Footer />

      {viewing && <PhotoViewer item={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
}

function Header() {
  return (
    <header className="flex flex-col">
      <div className="h-3.5 border-b-[3px] border-board-edge bg-board-deep" />
      {/* Noren tiles */}
      <div className="grid h-[168px] grid-cols-4 gap-[3px] px-3.5" aria-hidden="true">
        {["お", "い", "し", "い"].map((ch, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-b bg-shu font-mincho text-[46px] font-extrabold text-white"
          >
            {ch}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1.5 px-5 pt-[22px] text-washi">
        <h1 className="font-mincho text-[26px] font-extrabold tracking-[0.04em]">
          Oishii Imported Goodies
        </h1>
        <p className="text-[13px] text-washi-muted">Japanese &amp; Korean ramen and snacks</p>
      </div>
    </header>
  );
}

function CategoryCard({
  category,
  onView,
}: {
  category: Category;
  onView: (item: MenuItem) => void;
}) {
  return (
    <section
      aria-label={category.title}
      className="flex overflow-hidden rounded bg-washi shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
    >
      <div
        className={`flex w-[58px] flex-none flex-col items-center gap-2.5 py-[18px] text-white ${
          category.tone === "red" ? "bg-shu" : "bg-ink"
        }`}
      >
        <span className="font-mincho text-[30px] font-extrabold" aria-hidden="true">
          {category.kanji}
        </span>
        <span className="text-[11px] font-bold tracking-[0.3em] [writing-mode:vertical-rl]">
          {category.title}
        </span>
      </div>

      <ul className="flex min-w-0 flex-1 flex-col gap-3.5 px-3.5 pt-4 pb-1">
        {category.items.map((item) => (
          <li
            key={item.name}
            className="flex items-start gap-3 border-b border-washi-rule pb-3.5"
          >
            <button
              type="button"
              onClick={() => onView(item)}
              aria-label={`View photo of ${item.name}`}
              className="relative size-[76px] flex-none cursor-zoom-in overflow-hidden rounded border border-kraft-line bg-kraft transition hover:border-shu focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu"
            >
              <Image
                src={item.photos[0]}
                alt=""
                fill
                sizes="76px"
                className="object-contain p-1"
              />
            </button>

            <div className="flex min-w-0 flex-1 flex-col gap-1 pt-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[15px] font-bold">{item.name}</span>
                <span className="min-w-3 flex-1 border-b-2 border-dotted border-kraft-line" />
                <span className="font-mincho text-lg font-extrabold whitespace-nowrap">
                  {item.price}
                </span>
              </div>
              {item.note && <p className="text-xs text-umber">{item.note}</p>}
              {item.flavors && (
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {item.flavors.map((flavor) => (
                    <li
                      key={flavor}
                      className="rounded-full border border-kraft-line px-2.5 py-[3px] text-xs text-umber-dark"
                    >
                      {flavor}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Delivery() {
  const options = [
    {
      kanji: "即日",
      title: "Same-day",
      body: "Greater Manila — NCR, Bulacan, Cavite and nearby",
    },
    {
      kanji: "全国",
      title: "Nationwide",
      body: "Shipped anywhere in the Philippines via LBC",
    },
  ];

  return (
    <section
      aria-label="Delivery"
      className="mx-5 mt-7 grid grid-cols-2 gap-2.5 text-washi"
    >
      {options.map((o) => (
        <div
          key={o.title}
          className="flex flex-col gap-1.5 rounded border border-board-line p-3.5"
        >
          <span className="font-mincho text-2xl font-extrabold text-gold" aria-hidden="true">
            {o.kanji}
          </span>
          <span className="text-[13px] font-bold">{o.title}</span>
          <span className="text-xs leading-[1.45] text-washi-muted">{o.body}</span>
        </div>
      ))}
    </section>
  );
}

function Footer() {
  const button =
    "flex h-[46px] flex-1 items-center justify-center rounded bg-shu text-sm font-bold text-white no-underline transition-colors hover:bg-shu-dark";

  return (
    <footer className="mt-7 flex flex-col gap-3.5 border-t-[3px] border-board-edge bg-board-deep px-5 pt-6 pb-9 text-xs leading-relaxed text-washi-muted">
      <h2 className="font-mincho text-lg font-extrabold text-washi">Message us to order</h2>
      <div className="flex gap-2.5">
        <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className={button}>
          Facebook
        </a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={button}>
          Instagram
        </a>
      </div>
      <p>Bulk and wholesale orders get a discount. No cash on delivery — payment before shipping.</p>
      <p className="font-mincho text-base font-extrabold text-washi" lang="ja">
        ごちそうさまでした
      </p>
    </footer>
  );
}

function PhotoViewer({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-full w-full max-w-sm flex-col overflow-hidden rounded bg-washi shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
      >
        <div className="flex items-center gap-3 bg-shu px-4 py-3 text-white">
          <span className="flex-1 font-mincho text-lg font-extrabold">{item.name}</span>
          <span className="font-mincho text-lg font-extrabold">{item.price}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 flex size-8 items-center justify-center rounded text-2xl leading-none hover:bg-shu-dark"
            autoFocus
          >
            ×
          </button>
        </div>
        <div className="flex flex-col gap-3 overflow-y-auto p-4">
          {item.photos.map((src) => (
            <Image
              key={src}
              src={src}
              alt={item.name}
              width={750}
              height={750}
              sizes="(max-width: 400px) 90vw, 352px"
              className="h-auto w-full rounded bg-kraft object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
