export default function HomePage() {
  const categories = [
    "Restaurant",
    "Hospital",
    "School",
    "Bank",
    "Hotel",
    "Pharmacy",
    "Salon",
    "Supermarket"
  ]

  return (
    <div className="bg-white min-h-screen">

      {/* HERO SECTION */}
      <section
        className="h-[60vh] flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505691723518-36a5ac3be353')"
        }}
      >
        <div className="backdrop-blur-sm bg-white/60 p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Rate.it
          </h1>

          <p className="text-gray-600 mb-6">
            Discover and review local providers
          </p>

          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="Search restaurants, hospitals, schools..."
            className="w-80 md:w-96 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat}
              className="bg-gray-50 border rounded-xl p-6 text-center hover:shadow-md cursor-pointer"
            >
              <p className="font-medium text-gray-700">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOP RATED */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Top Rated Providers
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <h3 className="font-semibold text-lg">City Hospital</h3>
            <p className="text-gray-500 text-sm mb-2">Hospital</p>
            <p className="text-yellow-500">★★★★★</p>
            <p className="text-gray-600 text-sm mt-2">
              Excellent service and care.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <h3 className="font-semibold text-lg">Sunrise Restaurant</h3>
            <p className="text-gray-500 text-sm mb-2">Restaurant</p>
            <p className="text-yellow-500">★★★★☆</p>
            <p className="text-gray-600 text-sm mt-2">
              Great food and ambience.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <h3 className="font-semibold text-lg">Green Valley School</h3>
            <p className="text-gray-500 text-sm mb-2">School</p>
            <p className="text-yellow-500">★★★★★</p>
            <p className="text-gray-600 text-sm mt-2">
              Highly recommended by parents.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}