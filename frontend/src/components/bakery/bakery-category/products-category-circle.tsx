
type ProductCategoryCircleType = {
  image: string,
  name: string;
}


export default function ProductCategoryCircle(props: ProductCategoryCircleType) {

  return (

    <div
      className="flex flex-col items-center justify-center space-y-6 flex-shrink-0"
    >
      <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl border-3 border-[#DE4243]">
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">{props.name}</h3>
    </div>

  );
}