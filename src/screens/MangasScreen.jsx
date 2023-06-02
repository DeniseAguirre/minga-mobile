import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Color,
  FontSize,
  Padding,
  Border,
} from "../../assets/styles/GlobalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SearchBar } from "react-native-elements";
import axios, { Axios } from "axios";
import { React, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import inputs_filter_actions from "../store/actions/mangasFilter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import DetailsManga from "./DetailsManga";

export const Mangas = () => {
  const buscador = useRef("");
  const category_id = useRef(""); /* 
    const nextP = useRef()
    const prevP = useRef() */
  const { title, categories } = useSelector((store) => store.inputs);
  const dispatch = useDispatch();
  const [mangas, setMangas] = useState();
  const [reload, setReload] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [count, setCount] = useState();
  const [pagAct, setNextPag] = useState(1);
  const { mangasFilter } = inputs_filter_actions;
  const [token, setToken] = useState("");
  const [headers, setHeaders] = useState({});
  const apiUrl = "https://minga-violeta-back.onrender.com/";

  useEffect(() => {
    async function getToken() {
      try {
        const value = await AsyncStorage.getItem("token");
        setToken(value);
        const headers1 = { headers: { Authorization: `Bearer ${value}` } };
        setHeaders(headers1);
      } catch (error) {
        console.log(error);
      }
    }
    getToken();
  }, []);

  useEffect(
    () => {
      axios
        .get(
          apiUrl +
            `mangas?title=${buscador.current.valueOf()}&category_id=${categories.join(
              ","
            )}&order=1&page=${pagAct}`,
          headers
        )

        .then((res) => {
          setMangas(res.data.response);
          setCount(res.data.count);
        })
        .catch((err) => console.log(err));
    },
    [reload, pagAct] //el efecto se ejecuta cada vez que una dependencia sufra cambios
  );
  //console.log(count)
  function next() {
    setNextPag(pagAct + 1);
  }
  function prev() {
    setNextPag(pagAct - 1);
  }
  //console.log(mangas)

  useEffect(() => {
    axios
      .get(apiUrl + "categories")
      .then((response) => {
        setCategorias(response.data.categories);
      })
      .catch((error) => console.log(error));
  }, []);

  function capture() {
    dispatch(
      mangasFilter({
        title: buscador.current?.valueOf(),
        categories: Object.values(category_id.current)
          .filter((each) => each.checked)
          .map((each) => each.valueOf()),
      })
    );
    setReload(!reload);
    console.log(categories);
    console.log(title);
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.mangas}>
        <View style={styles.pexelsLisaFotios14549061Parent}>
          <Image
            style={[
              styles.pexelsLisaFotios14549061Icon,
              styles.wrapperIconPosition,
            ]}
            contentFit="cover"
            source={require("../../assets/pexelsmanga.png")}
          />
          <View style={[styles.frameChild, styles.frameChildBg]} />

          <Text style={styles.mangas1}>Mangas</Text>
        </View>
        <View style={styles.search}>
          <SearchBar
            placeholder="Find your manga here"
            onChangeText={capture}
            value={title}
            ref={buscador}
            containerStyle={{
              backgroundColor: "transparent",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            inputContainerStyle={{
              backgroundColor: "#ffffff3d",
              color: "#fff",
            }}
            inputStyle={{ color: "black" }}
          />
        </View>

        <View style={styles.seccin}>
        <ScrollView style={styles.conteinerCards}>
            {mangas && mangas.length > 0 ? (
              mangas.map((manga) => (
                <View key={manga._id} style={styles.mangaContainer}>
                  <View style={styles.leftContainer}>
                    <View
                      style={[
                        styles.categoryContainer,
                        { borderColor: manga.category_id.color },
                      ]}
                    >
                      <Text style={styles.title}>{manga.title}</Text>
                      <Text
                        style={[
                          styles.category,
                          { color: manga.category_id.color },
                        ]}
                      >
                        {manga.category_id.name.charAt(0).toUpperCase() +
                          manga.category_id.name.slice(1)}
                      </Text>
                      <TouchableOpacity
                        style={styles.readButton}
                        onPress={() => DetailsManga(manga._id)}
                      >
                        <Text style={styles.readButtonText}>Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.coverContainer}
                    onPress={() => navigateToMangaDetails(manga._id)}
                  >
                    <Image
                      source={{ uri: manga.cover_photo }}
                      style={styles.coverImage}
                    />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.noMangaContainer}>
                <Text style={styles.noMangaText}>No manga has been found</Text>
              </View>
            )}
  
          </ScrollView>
          <View style={[styles.categoryList, styles.cardLayout]}>
            <View style={styles.categorioas}>
            
              <View style={styles.formContainer}>
                {categorias.map((category) => (
                  <TouchableOpacity
                    key={category._id}
                    onPress={capture}
                    style={[
                      styles.categoryButton,
                      categories.includes(category._id) && {
                        backgroundColor: category.color,
                        borderColor: "white",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryLabel,
                        categories.includes(category._id) && { color: "white" },
                      ]}
                    >
                      {category.name.charAt(0).toUpperCase() +
                        category.name.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <Text style={styles.explore}>Explore</Text>
          <View style={[styles.imagen16Parent, styles.imagen16ParentLayout]}>
            <Image
              style={[styles.imagen16Icon, styles.imagen16ParentLayout]}
              contentFit="cover"
              source={require("../../assets/imagen-16.png")}
            />
            <View
              style={[styles.adventurersWrapper, styles.imagen17ParentLayout]}
            >
              <Text style={[styles.adventurers, styles.popularTypo]}>
                Adventurers
              </Text>
            </View>
          </View>
          <View style={[styles.imagen18Parent, styles.imagen16ParentLayout]}>
            <Image
              style={[styles.imagen16Icon, styles.imagen16ParentLayout]}
              contentFit="cover"
              source={require("../../assets/imagen-18.png")}
            />
            <View
              style={[styles.adventurersWrapper, styles.imagen17ParentLayout]}
            >
              <Text style={[styles.popular, styles.popularTypo]}>Popular</Text>
            </View>
          </View>
          <View style={[styles.imagen17Parent, styles.imagen17ParentLayout]}>
            <Image
              style={[styles.imagen16Icon, styles.imagen16ParentLayout]}
              contentFit="cover"
              source={require("../../assets/imagen-17.png")}
            />
            <View
              style={[styles.adventurersWrapper, styles.imagen17ParentLayout]}
            >
              <Text style={[styles.nostalgic, styles.popularTypo]}>
                Nostalgic
              </Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  wrapperIconPosition: {
    top: 0,
    left: 0,
  },
  frameChildBg: {
    backgroundColor: Color.gray_100,
    top: 0,
  },
  cardLayout: {
    width: 330,
    left: 22,
  },
  imagen16ParentLayout: {
    height: 100,
    width: 100,
    position: "absolute",
  },
  imagen17ParentLayout: {
    borderRadius: Border.br_5xs,
    height: 100,
    width: 100,
    position: "absolute",
    overflow: "hidden",
  },
  popularTypo: {
    top: 71,
    lineHeight: 13,
    fontSize: FontSize.size_sm,
    fontWeight: "500",
    color: Color.white,
    textAlign: "left",
    position: "absolute",
  },
  pexelsLisaFotios14549061Icon: {
    width: Dimensions.get("window").width,
    height: 469,
    left: 0,
    position: "absolute",
  },
  frameChild: {
    left: -50,
    width: 508,
    height: 440,
    position: "absolute",
    overflow: "hidden",
  },
  searchIcon: {
    width: 37,
    height: 37,
  },
  findYourManga: {
    color: "#9795a4",
    marginLeft: 10,
    textAlign: "left",
    lineHeight: 23,
    fontSize: FontSize.size_5xl,
  },
  search: {
    top: 140,
    borderRadius: Border.br_61xl,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    width: "90%",
    height: 65,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    elevation: 4,
    shadowRadius: 4,
    backgroundColor: Color.white,
    left: 18,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    position: "absolute",
    overflow: "hidden",
  },
  mangas1: {
    top: 60,
    left: 120,
    fontSize: 36,
    lineHeight: 38,
    fontWeight: "600",
    color: Color.white,
    textAlign: "center",
    position: "absolute",
  },
  pexelsLisaFotios14549061Parent: {
    height: 369,
    width: Dimensions.get("window").width,
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  categorioas: {
    width: Dimensions.get("window").width,
    height: 35,
  },
  categoryList: {
    top: 208,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  explore: {
    top: 45,
    color: Color.black,
    fontWeight: "500",
    left: 22,
    textAlign: "left",
    lineHeight: 23,
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  imagen16Icon: {
    left: 0,
    top: 0,
  },
  adventurers: {
    left: 7,
  },
  adventurersWrapper: {
    backgroundColor: Color.gray_100,
    top: 0,
    left: 0,
  },
  imagen16Parent: {
    backgroundColor: "#5683df",
    top: 88,
    left: 22,
    width: 100,
    overflow: "hidden",
    borderRadius: Border.br_3xs,
  },
  popular: {
    left: 23,
  },
  imagen18Parent: {
    left: 257,
    backgroundColor: "#ff857d",
    top: 88,
    overflow: "hidden",
    borderRadius: Border.br_3xs,
    width: 100,
  },
  nostalgic: {
    left: 17,
  },
  imagen17Parent: {
    left: 140,
    backgroundColor: "#ff9875",
    top: 88,
  },
  seccin: {
    top: 270,
    borderTopLeftRadius: 58,
    borderTopRightRadius: 58,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowRadius: 30,
    elevation: 38,
    height: 639,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    width: Dimensions.get("window").width,
    left: 0,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: Color.bkg,
  },
  mangas: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: 900,
    overflow: "hidden",
    backgroundColor: Color.bkg,
  },
  formContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "start",
    marginTop: 8,
  },
  categoryButton: {
    height: 40,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  mangaContainer: {
    width: '90%',
    height: '20%',
    marginTop: 16,
    marginLeft:22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  leftContainer: {
    width: '50%',
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    width: '100%',
    
    borderLeftWidth: 4,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  category: {
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  readButton: {
    marginTop: 24,
    marginLeft: 8,
    backgroundColor: 'green',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  readButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  coverContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  noMangaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '30%',
    marginTop: 16,
  },
  noMangaText: {
    backgroundColor: 'black',
    opacity: 0.8,
    borderRadius: 20,
    padding: 8,
    color: 'white',
    textAlign: 'center',
  },
  conteinerCards: {
    top: 260,
    height: "100%",
  },
});
