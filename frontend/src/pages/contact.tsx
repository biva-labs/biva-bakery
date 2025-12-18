import { QUICK_LINKS } from "../../data/footer-data";

export default function Contact() {
    const contactInfo = QUICK_LINKS.address;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-[#002a3a] py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold outfit text-white mb-6 tracking-tight">
                        Let's <span className="text-orange-400">Connect</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Whether you have a question about our menu, want to book an event,
                        or just want to say hi, we're here for you.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-16 pb-24 relative z-10">
                <div className="flex flex-col items-center">
                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {contactInfo.map((item, index) => {
                            const Icon = item.icon;
                            let label = "Contact";
                            if (item.text.includes('@')) label = "Email Us";
                            else if (item.text.match(/\+?\d+/)) label = "Call Us";
                            else label = "Visit Us";

                            return (
                                <div key={index} className="bg-white p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-all hover:-translate-y-2 duration-300">
                                    <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                                        <Icon className="size-10" />
                                    </div>
                                    <h3 className="font-bold text-2xl outfit text-[#002a3a] mb-3">{label}</h3>
                                    <p className="text-gray-600 font-medium text-lg leading-relaxed">{item.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
