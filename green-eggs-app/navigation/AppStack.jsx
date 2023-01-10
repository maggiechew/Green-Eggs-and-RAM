import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IconButton from "../components/IconButton";

import { MapPage } from "../screens";
import { signOut } from "firebase/auth";
import { auth } from "../config";

const Stack = createStackNavigator();
const handleLogout = () => {
  signOut(auth).catch((error) => console.log("Error logging out: ", error));
};
export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={MapPage}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={handleLogout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
