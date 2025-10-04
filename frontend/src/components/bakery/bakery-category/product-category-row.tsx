import ProductCategoryCircle from "./products-category-circle";

export default function ProductCategoryRow() {
  const categories = [
    { id: 1, name: 'Patties', image: '/patties.png' },
    { id: 2, name: 'Pastries', image: '/pastries.png' },
    { id: 3, name: 'Birthday Cakes', image: '/birthday-cakes.png' },
    { id: 4, name: 'Egg-less Cakes', image: '/eggless-cakes.png' },
    { id: 5, name: 'Bento Cakes', image: '/bento-cakes.png' },
    { id: 6, name: 'Muffins', image: '/muffins.png' },
    { id: 7, name: 'Sweets', image: '/sweets.png' },
    { id: 8, name: 'Pastries', image: '/pastries.jpg' },
    { id: 9, name: 'Cakes', image: '/cakes.png' },
    { id: 10, name: 'Cookies', image: '/cookies.png' },
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
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }

            @keyframes scroll-right {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(0); }
            }

            .scroll-left {
              display: flex;
              white-space: nowrap;
              animation: scroll-left 30s linear infinite;
            }

            .scroll-right {
              display: flex;
              white-space: nowrap;
              animation: scroll-right 30s linear infinite;
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