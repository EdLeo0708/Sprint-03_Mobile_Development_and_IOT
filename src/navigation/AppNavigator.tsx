import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { TrackScreen } from '../screens/TrackScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { User } from '../types';

import { Colors } from '../theme/colors';
import { Screen } from '../enums';

const Tab = createBottomTabNavigator();

interface Props {
  user: User;
  onLogout: () => void;
}


const icon = (emoji: string) => <Text style={{ fontSize: 20 }}>{emoji}</Text>;

const ProfileAvatar = () => {
  const navigation = useNavigation<any>(); 
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate(Screen.PROFILE)}
      style={{ marginRight: 20, backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 20 }}
    >
      <Text style={{ fontSize: 18 }}>👤</Text>
    </TouchableOpacity>
  );
};

export const AppNavigator: React.FC<Props> = ({ user, onLogout }) => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        headerStyle: {
          backgroundColor: Colors.secondary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontWeight: '800', fontSize: 22 },
      }}
    >
      <Tab.Screen
        name={Screen.HOME}
        options={{ 
          tabBarIcon: () => icon('🏠'), 
          title: 'H-bit',
          headerRight: () => <ProfileAvatar />
        }}
      >
        {() => <HomeScreen userName={user.name} />}
      </Tab.Screen>

      <Tab.Screen
        name={Screen.TRACK}
        options={{ 
          tabBarIcon: () => icon('📊'), 
          title: 'Registrar dados',
          headerRight: () => <ProfileAvatar />
        }}
      >
        {() => <TrackScreen userId={user.id} />}
      </Tab.Screen>

      <Tab.Screen
        name={Screen.PROFILE}
        options={{
          tabBarIcon: () => icon('👤'),
          title: 'Meu perfil',
          headerRight: () => (
            <TouchableOpacity
              onPress={onLogout}
              style={{
                marginRight: 20,
                backgroundColor: 'rgba(255,255,255,0.15)',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 10
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Sair</Text>
            </TouchableOpacity>
          )
        }}
      >
        {() => <ProfileScreen user={user} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  </NavigationContainer>
);