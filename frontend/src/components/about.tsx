export default function About() {
    return (
        <div className="mt-20 px-4 lg:px-10 mb-10">

            <h2 className="text-3xl lg:text-4xl text-green-950 outfit font-extrabold md:mt-6">
                About Us
            </h2>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
              
                <div className="bg-white rounded-2xl  p-6 flex flex-col items-center text-center h-100 border">
                    <img
                        src="/room.jpg"
                        alt="Team Member"
                        className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold text-green-900">John Doe</h3>
                    <p className="text-gray-600 mt-2">
                        Passionate baker with 10+ years of experience creating artisan bread and pastries.
                    </p>
                </div>

           
                <div className="bg-white rounded-2xl h-100 border p-6 flex flex-col items-center text-center ">
                    <img
                        src="/room.jpg"
                        alt="Team Member"
                        className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold text-green-900">Jane Smith</h3>
                    <p className="text-gray-600 mt-2">
                        Expert cake decorator who loves turning sweet ideas into beautiful creations.
                    </p>
                </div>

             
                <div className="bg-white rounded-2xl h-100 border p-6 flex flex-col items-center text-center">
                    <img
                        src="/room.jpg"
                        alt="Team Member"
                        className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold text-green-900">Michael Lee</h3>
                    <p className="text-gray-600 mt-2">
                        Handles customer service with a smile and ensures every guest feels at home.
                    </p>
                </div>

              
                <div className="bg-white rounded-2xl h-100 border p-6 flex flex-col items-center text-center">
                    <img
                        src="/room.jpg"
                        alt="Team Member"
                        className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold text-green-900">Sarah Khan</h3>
                    <p className="text-gray-600 mt-2">
                        Innovator behind our seasonal menus, always bringing fresh flavors to the bakery.
                    </p>
                </div>
            </div>
        </div>
    );
}

