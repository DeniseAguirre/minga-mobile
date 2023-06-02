import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from '../screens/HomeScreen';
import {Mangas} from '../screens/MangasScreen'
import { StyleSheet, View,  Dimensions, Image, Text  } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      setUser(JSON.parse(userData));
    };
    getUser();
  }, []);
  console.log(user)

  const handleLogout = async () => {
    try {
      // Elimina los datos de usuario almacenados en AsyncStorage
      await AsyncStorage.removeItem('user');
      // Redirige al usuario a la pantalla de inicio de sesión
      navigation.navigate('Home'); // Asegúrate de tener definida la ruta 'Login' en tus rutas de navegación
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  return (
    <DrawerContentScrollView style={styles.viewScroll}>
      <LinearGradient
        style={styles.drawerBackground}
        locations={[0, 1]}
        colors={['#434343', '#000']}
      >
        {/* Contenido del Drawer */}
        <View style={styles.top}>
          <View style={[styles.userParent, styles.userIconFlexBox]}>
            
              <Image
                style={styles.userChild}
                contentFit="cover"
                source={{ uri: user?.photo }}
              />
              <View style={styles.name}>
                <Text style={styles.lucasezequielsilvagmailcom}>
                  {user?.email}
                </Text>
              </View>
            
          </View>
        </View>
        <View style={styles.drawerContent}>
          <DrawerItem
            label="Home"
            onPress={() => navigation.navigate('Home')}
            // Establece aquí tus estilos para los elementos del Drawer
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Mangas"
            onPress={() => navigation.navigate('Mangas')}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="My Mangas"
            onPress={() => navigation.navigate('My Mangas')}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Favourites"
            onPress={() => navigation.navigate('Favourites')}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Logout"
            onPress={handleLogout}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />
        </View>
      </LinearGradient>
    </DrawerContentScrollView>
  );
};

function MingaDrawer() {
  
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        width: '100%',
        backgroundColor:'#000',
        
      },
    }}
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          
        }} />
      <Drawer.Screen name="Mangas" component={Mangas} options={{
          title: 'Mangas',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          
        }}/>
      <Drawer.Screen name="My Mangas" component={HomeScreen} options={{
          title: 'My Mangas',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          
        }}/>
      <Drawer.Screen name="Favourites" component={HomeScreen} options={{
          title: 'Favourites',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          
        }} />
      <Drawer.Screen name="Logout" component={HomeScreen} options={{
          title: 'Logout',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          
        }} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({

  viewScroll: {
    padding: 0,
    margin:0,
  },
  drawerBackground: {
    
    flex: 1,
    height: Dimensions.get('window').height,
  },
  drawerContent: {
    marginTop: 50,
    paddingHorizontal: 16,
  },
  drawerLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
   
  },
  drawerItem: {
    marginBottom: 16,
    
  },
  
  userParent: {
    alignSelf: "stretch",
  },
  userIconFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  userChild: {
    borderRadius: 50,
    width: 46,
    height: 46,
  },
  

  iconPosition: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  
  top: {
    padding: 10,
  },
  
  lucasEzequielSilva: {
    color: 'white',
    letterSpacing: -0.2,
    textAlign: "left",
    fontWeight: "600",
    lineHeight: 24,
    alignSelf: "stretch",
    padding: 1,
  },
  lucasezequielsilvagmailcom: {
    color: 'white',
    lineHeight: 12,
    fontWeight: "500",
    letterSpacing: -0.1,
    textAlign: "left",
    alignSelf: "stretch",
    padding: 1,
  },
  name: {
    marginLeft: 12,
    flex: 1,
  },
  user: {
    flex: 1,
  },
  icon: {
    borderRadius: 24,
    borderStyle: "solid",
    borderColor: "#efefef",
    borderWidth: 2,
    padding: 8,
    justifyContent: "center",
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  uiIconclosefilled: {
    height: 24,
    width: 24,
    marginLeft: 12,
    overflow: "hidden",
  },
  
});

export default MingaDrawer;
