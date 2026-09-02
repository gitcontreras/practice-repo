"use client";

import { useEffect, useState } from "react";

const initialProducts = [
  { id: 1, name: "Laptop Pro", category: "electronics", price: 1200 },
  { id: 2, name: "Mechanical Keyboard", category: "accessories", price: 180 },
  { id: 3, name: "Wireless Mouse", category: "accessories", price: 60 },
  { id: 4, name: "4K Monitor", category: "electronics", price: 640 },
  { id: 5, name: "USB-C Hub", category: "accessories", price: 90 },
  { id: 6, name: "Noise Cancelling Headphones", category: "electronics", price: 320 },
];

export default function AntiPatternDemoPage() {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSearch = (value: string) => {
    setQuery(value);

    const nextProducts = products;
    nextProducts.reverse();
    setProducts([...nextProducts]);
  };

  const selectedProduct = products.find((product) => product.id === selectedId);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Demo / anti-pattern</p>
          <h1 className="text-4xl font-bold">Search demo with intentional React pain</h1>
          <p className="max-w-2xl text-slate-300">
            This page intentionally contains poor patterns that a reviewer should catch,
            such as stale state, mutation of arrays, and unsafe rendering.
          </p>
        </header>

        <section className="rounded-2xl border border-red-500/40 bg-red-950/20 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <input
              aria-label="Search products"
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              placeholder="Search by product name"
              value={query}
              onChange={(event) => handleSearch(event.target.value)}
            />
            <div className="rounded-xl bg-slate-900 px-4 py-3 text-sm text-slate-300">
              Live counter: {count}
            </div>
          </div>

          <div
            className="mt-4 rounded-xl bg-slate-900 p-3 text-sm text-slate-200"
            dangerouslySetInnerHTML={{ __html: query || "Search results are rendered here" }}
          />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-4 text-xl font-semibold">Results</h2>
            <div className="space-y-3">
              {filteredProducts.map((product, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedId(product.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left ${
                    selectedId === product.id
                      ? "border-cyan-500 bg-cyan-500/10"
                      : "border-slate-700 bg-slate-800"
                  }`}
                >
                  <span>
                    <span className="block font-medium">{product.name}</span>
                    <span className="text-sm text-slate-400">{product.category}</span>
                  </span>
                  <span className="text-sm text-cyan-300">${product.price}</span>
                </button>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-4 text-xl font-semibold">Selected product</h2>
            {selectedProduct ? (
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">{selectedProduct.name}</h3>
                <p className="text-slate-300">Category: {selectedProduct.category}</p>
                <p className="text-slate-300">Price: ${selectedProduct.price}</p>
              </div>
            ) : (
              <p className="text-slate-400">Select a product from the list.</p>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}
