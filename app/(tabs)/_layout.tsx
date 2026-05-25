import { Tabs } from "expo-router";
import { Home, User } from "lucide-react-native";
import { BottomNav, TabConfig } from "@widgets/navigation/BottomNav";

const TABS: TabConfig[] = [
  { name: "home", label: "Home", Icon: Home },
  { name: "post", label: "Posts", Icon: User },
];

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomNav {...props} tabs={TABS} />}
      screenOptions={{ headerShown: false }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name} />
      ))}
    </Tabs>
  );
}
