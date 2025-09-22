// import { instance } from "@/utils/axios";
// import { useMutation } from "@tanstack/react-query";

// export function useForm() {
//     return useMutation({
//         mutationFn: async (data, path) => {
//             try {
//                 return instance.post(path, {
//                     data
//                 });

//             } catch (error: any) {

//                 if (error.response?.data?.error) {
//                     throw new Error(error.response.data.error);
//                 }
//                 throw new Error("Failed to get response");

//             }
//         },
//         onError: (error) => {
//             console.error("Error:", error.message);
//         }
//     })
// }