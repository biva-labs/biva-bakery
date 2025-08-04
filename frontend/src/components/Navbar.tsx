import { Box, Flex, Strong, TabNav } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import { MobileSidebar } from "./MobileSidebar";

export default function Navbar() {
  return (
    <>  
      <div className="bg-green-950 backdrop-blur-md sticky top-0 left-0 w-full z-50 h-12 px-1 flex items-center justify-center">
        <div className="absolute left-2">
            <MobileSidebar/>
        </div>

        <h2 className="text-2xl font-bold text-white">
            THE BIVA
        </h2>
      </div>
      <div>
        <TabNav.Root justify={"center"} size={"2"}>
          <TabNav.Link href="#" active>
            <Strong>Hotel</Strong>
          </TabNav.Link>
          <TabNav.Link href="#">
            <Strong>Food Court</Strong>
          </TabNav.Link>
          <TabNav.Link href="#">
            <Strong>Bakery</Strong>
          </TabNav.Link>
        </TabNav.Root>
      </div>
    </>
  );
}
