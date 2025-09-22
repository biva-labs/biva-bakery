import ProductCategoryCircle from "./products-category-circle";

export default function ProductCategoryRow() {
  const categories = [
    { id: 1, name: 'Patties', image: '/bakery-hero.jpg' },
    { id: 2, name: 'Pastries', image: '/bakery-hero.jpg' },
    { id: 3, name: 'Birthday Cakes', image: '/bakery-hero.jpg' },
    { id: 4, name: 'Egg-less Cakes', image: '/bakery-hero.jpg' },
    { id: 5, name: 'Bento Cakes', image: '/bakery-hero.jpg' },
    { id: 6, name: 'Muffins', image: '/bakery-hero.jpg' },
    { id: 7, name: 'Sweets', image: '/bakery-hero.jpg' },
    { id: 8, name: 'Pastries', image: '/bakery-hero.jpg' },
    { id: 9, name: 'Cakes', image: '/bakery-hero.jpg' },
    { id: 10, name: 'Cookies', image: '/bakery-hero.jpg' },
  ];

  const firstRow = categories.slice(0, 3);
  const secondRow = categories.slice(3, 6);


  const duplicatedFirstRow = [...firstRow, ...firstRow, ...firstRow, ...firstRow, ...firstRow];
  const duplicatedSecondRow = [...secondRow, ...secondRow, ...secondRow, ...secondRow, ...secondRow];

  return (
    <div className="w-full mt-16 mb-12 overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-60%); }
          }
          
          @keyframes scroll-right {
            0% { transform: translateX(-60%); }
            100% { transform: translateX(0%); }
          }
          
          .scroll-left {
            animation: scroll-left 60s linear infinite;
          }
          
          .scroll-right {
            animation: scroll-right 60s linear infinite;
          }
        `
      }} />


      <div className="relative mb-12">

        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white via-white/70 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white via-white/70 to-transparent z-10"></div>

        <div className="flex space-x-16 scroll-left">
          {duplicatedFirstRow.map((category, index) => (
            <ProductCategoryCircle key={`${category.id}-${index}`} {...category} />
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white via-white/70 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white via-white/70 to-transparent z-10"></div>

        <div className="flex space-x-16 scroll-right">
          {duplicatedSecondRow.map((category, index) => (
            <ProductCategoryCircle key={`${category.id}-${index}`} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
}