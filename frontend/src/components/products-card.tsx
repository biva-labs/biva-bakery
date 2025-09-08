export default function ProductCategoryDisplay() {
  const categories = [
    { id: 1, name: 'Patties', image: '/bakery-hero.jpg' },
    { id: 2, name: 'Pastries', image: '/bakery-hero.jpg' },
    { id: 3, name: 'Birthday Cakes', image: '/bakery-hero.jpg' },
    { id: 4, name: 'Egg-less Cakes', image: '/bakery-hero.jpg' },
    { id: 5, name: 'Bento Cakes', image: '/bakery-hero.jpg' },
    { id: 6, name: 'Muffins', image: '/bakery-hero.jpg' },
    { id: 7, name: 'Sweets', image: '/bakery-hero.jpg' }, // NOTE: Corrected duplicate IDs
    { id: 8, name: 'Pastries', image: '/bakery-hero.jpg' },
    { id: 9, name: 'Cakes', image: '/bakery-hero.jpg' },
    { id: 10, name: 'Cookies', image: '/bakery-hero.jpg' },
  ];

  return (
    <div className="w-full px-6 lg:px-20 mt-16 mb-12">
      {/*
        Changed `grid-cols-6` to `grid-cols-5` on `lg` breakpoint.
        Also added a `md:grid-cols-5` for an extra breakpoint, which is a common practice.
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-8">
        {categories.map((category) => (
          <div
            // IMPORTANT: Make sure your `key` is unique. I've corrected the duplicate IDs
            // in your `categories` array for this example.
            key={category.id}
            className="flex flex-col items-center justify-center space-y-4 "
          >
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-[#DE4243]">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}