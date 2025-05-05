import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu/navigation-menu.tsx";
import logo from "./assets/alexoodev-logo.png";

import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};
const Container = ({ children }: ContainerProps) => {
  return <div className="bg-gray-900  min-h-svh">{children}</div>;
};

function App() {
  return (
    <>
      <NavigationMenu className="bg-gray-800 min-w-full max-h-12 justify-between">
        <img src={logo} className="w-1.5" />
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent className="bg-gray-800 text-white">
              <NavigationMenuLink>Task Board</NavigationMenuLink>
              <NavigationMenuLink>Weather App</NavigationMenuLink>
              <NavigationMenuLink>Pomodor Timer</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Container>
        <text>content</text>
      </Container>
    </>
  );
}

export default App;
