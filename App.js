import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import xkcd from './xkcd';

const PLACEHOLDER_TITLE = 'title';
const PLACEHOLDER_IMAGE = require('./assets/icon.png');
const PLACEHOLDER_ALT = 'alt';

export default function App() {
  const [current, setCurrent] = useState(614);
  const [comic, setComic] = useState(null);

  const loadComic =async ()=>{
    setComic(await xkcd.getComic(current));
  }

  useEffect(() =>{
    loadComic()
  })

  return (
    <View style={styles.container}>
      <Text style={styles.current}>{current}</Text>
      <Text style={styles.title}>
        {comic ? comic.title : PLACEHOLDER_TITLE}
      </Text>
      <Image
        style={styles.strip}
        source={comic ? comic.image : PLACEHOLDER_IMAGE}
      />
      <Text style={styles.alt} numberOfLines={4}>
        {comic ? comic.alt : PLACEHOLDER_ALT}
      </Text>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText} onPress={() => setCurrent(current-1)}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText} onPress={() => setCurrent(current+1)}>Next</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000530',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  current: {
    color: '#ffffff',
    fontSize: 14,
  },
  title: {
    color: '#ffffff',
    fontWeight: "bold",
    fontSize: 25,
  },
  strip: {
    height: 500,
    width: "100%",
    resizeMode: 'contain',
    backgroundColor: "#ffffff"
  },
  alt: {
    height: 80,
    color: '#ffffff',
    fontSize: 14,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  navButton: {
    backgroundColor: '#0013be',
    padding: 10,
    width: 150,
    borderRadius: 10,
  },
  navButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
