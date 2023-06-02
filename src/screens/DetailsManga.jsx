import React, { useEffect, useState } from "react";
import { View, Text, Image, Button } from "react-native";
import axios from "axios";

const apiUrl = "https://minga-violeta-back.onrender.com/";

export default function DetailsManga({ id }) {
 
  const [manga, setManga] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + "mangas/" + id);
        setManga(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!manga) {
    return <Text>Loading...</Text>; 
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: "12vh",
        backgroundColor: "#EBEBEB",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          maxHeight: "50vh",
          height: "100%",
          width: "100%",
          paddingHorizontal: 5,
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          paddingVertical: 5,
        }}
      >
        {manga && (
          <Image
            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
            source={{ uri: manga.cover_photo }}
          />
        )}
      </View>
      <View
        style={{
          minHeight: "100%",
          width: "100%",
          paddingHorizontal: 5,
          backgroundColor: "#EBEBEB",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          paddingHorizontal: "6vw",
        }}
      >
        <View>
          {manga && (
            <Text style={{ fontSize: 32, paddingVertical: 5 }}>
              {manga.title}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              flex: 1,
              alignItems: "center",
              paddingHorizontal: 4,
              borderRadius: 20,
              fontSize: 18,
              textShadowColor: "rgba(0, 0, 0, 0.16)",
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 4,
              backgroundColor: manga?.category_id.hover,
              color: manga?.category_id.color,
            }}
          >
            {manga?.category_id.name}
          </Text>
          {manga && (
            <Text style={{ padding: 8, fontSize: 32, color: "#9D9D9D" }}>
              {manga.company_id.name}
            </Text>
          )}
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          <Button title="👍" onPress={() => {}} />
          <Button title="👎" onPress={() => {}} />
          <Button title="😮" onPress={() => {}} />
          <Button title="😍" onPress={() => {}} />
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            margin: 10,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            padding: 10,
            shadowColor: "rgba(0, 0, 0, 0.56)",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
          }}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={{ fontSize: 32 }}>4.5/5</Text>
            <Text style={{ fontSize: 10 }}>Rating</Text>
          </View>
          <View
            style={{ width: 2, height: 8, backgroundColor: "slategray" }}
          ></View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={{ fontSize: 32 }}>265</Text>
            <Text style={{ fontSize: 10 }}>Chapters</Text>
          </View>
          <View
            style={{ width: 2, height: 8, backgroundColor: "slategray" }}
          ></View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={{ fontSize: 32 }}>Eng</Text>
            <Text style={{ fontSize: 10 }}>Language</Text>
          </View>
        </View>
        <SwitchButton />
      </View>
    </View>
  );
}
