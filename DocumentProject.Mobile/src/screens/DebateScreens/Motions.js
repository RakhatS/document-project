import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  SectionList,
} from "react-native";
import * as SecureStore from "expo-secure-store";

const itemSeperator = (
  <View style={{ backgroundColor: "powderblue", height: 0.5 }} />
);

const DataExcel = [
  {
    Tournament: "WSDA Greater Bay Area Regional Championship Winter 2023",
    Motions: [
      {
        Motion:
          "Kids should have the freedom to choose their own extracurricular activities",
        Infoslide: null,
      },
      {
        Motion:
          "Learning about coding is more important than learning traditional art skills",
        Infoslide: null,
      },
      {
        Motion: "Daily leisure time is a good substitute for a yearly vacation",
        Infoslide: null,
      },
    ],
  },
  {
    Tournament: "Makiling Pre-ABP 2023",
    Motions: [
      {
        Motion: "TH, as the Pevensie siblings, would stay in Narnia",
        Infoslide:
          "During World War II, the Pevensie children, Peter, Susan, Edmund and Lucy, are evacuated from London to live in a stranger’s country house. While playing hide and seek, they discover a wardrobe and enters the fantasy world of Narnia. After defeating the White Witch and saving Narnia, the siblings are crowned Kings and Queens of Narnia. Fifteen years later, the Pevensies, now young adults, discover the wardrobe they entered Narnia from. Presume for the purposes of this debate that the Pevensies are aware that, should they depart Narnia, they may never return, and will return to their residence in their former child forms (but with memories intact) seconds after they left.",
      },
      {
        Motion: 'THR the trend of "self-centricity"',
        Infoslide:
          "The trend of self-centricity refers to the growing emphasis on priortising one's needs, desires, and well-being in various aspects of life.",
      },
      {
        Motion: 'THS the "Russia Interference" law',
        Infoslide:
          'The "Russian Interference" law is a new law being passed in Poland as a way to respond against the potential of Russian influence being present in the country. The law seeks to create a committee that is designed to investigate individuals or parties suspected of having ties with Russia, with the permission to breach privacy rights if needed.',
      },
      {
        Motion:
          "THBT states should regulate firms using traditional anti-monopoly regulations instead of mandating that companies meet a threshold of public good proportionate to their size",
        Infoslide:
          "Traditional anti-monopoly policies may include but not be limited to breaking up firms, preventing mergers and acquisitions and collusion or setting price caps on products. Public good policies may include but not be limited to environmental and/or social activism, providing infrastructure to underprivileged communities, or establishing scholarship or educational funds",
      },
      {
        Motion: 'THR the trend of the "f2p" business model in gaming',
        Infoslide:
          "F2P is a model which allows games to be downloaded and played for free; therefore, pushing game developers to monetize through cosmetics, battle passes (seasonal achievements), DLCs (downloadable content), or advertising Some games that have adopted the f2p model include Clash of Clans, Apex Legends, Genshin Impact, etc...",
      },
      {
        Motion: "THS vigilantism in high-crime areas",
        Infoslide:
          "A vigilante is a member of a self-appointed group of citizens, who undertake law enforcement in their community without legal authority, typically because the legal agencies are thought to be inadequate. Vigilanteism is by definition illegal.",
      },
      {
        Motion: "THR the narrative that humans are rational beings",
        Infoslide: null,
      },
    ],
  },
  {
    Tournament: "CDS Kenya & CUHKSZ Fundraised Debate 2023",
    Motions: [
      {
        Motion:
          "Is the call for women to be independent a new barrier to equality",
        Infoslide: null,
      },
    ],
  },
  {
    Tournament: "WSDA National Championship 2023",
    Motions: [
      {
        Motion: "Social media connects us more than it disconnects us",
        Infoslide: null,
      },
      {
        Motion:
          "Primary-aged students should be restricted to use electronic devices for no more than 2 hours each day",
        Infoslide: null,
      },
      {
        Motion:
          "Everyone should pay the same percentage of tax on the money they make",
        Infoslide: null,
      },
    ],
  },
  {
    Tournament: "TOC Asia Summer 2023",
    Motions: [
      {
        Motion: "We prefer a world where humans are immortal",
        Infoslide: null,
      },
      {
        Motion:
          "We should tax food and beverages according to their negative health impacts",
        Infoslide: null,
      },
      {
        Motion:
          "We should not allow employers to access the criminal records of employees and job applicants",
        Infoslide: null,
      },
      {
        Motion:
          "Adult children should have a legal obligation to financially support their parents",
        Infoslide: null,
      },
      {
        Motion:
          "Governments should invest in public housing in traditionally wealthy areas",
        Infoslide: null,
      },
      {
        Motion:
          "As parents, we should raise our children to have a pessimistic outlook on life",
        Infoslide: null,
      },
      {
        Motion: "We should abolish private schools",
        Infoslide: null,
      },
    ],
  },
  {
    Tournament: "CDS Kenya & CUHKSZ Fundraised Debate 2023",
    Motions: [
      {
        Motion:
          "Are gender quotas beneficial to achieving gender equality in the workplace",
        Infoslide: null,
      },
    ],
  },
  {
    Tournament: "Intertext Pro Am 2023",
    Motions: [
      {
        Motion: "THW impose restrictions on rural to urban migrations",
        Infoslide: null,
      },
      {
        Motion:
          "THBT social media's content moderation policies should be determined by users",
        Infoslide: null,
      },
      {
        Motion:
          "THW grant the right to assisted suicide to all mentally sound adults",
        Infoslide: null,
      },
      {
        Motion:
          "THS ecoterrorism in countries with inadequate environmental regulations",
        Infoslide: null,
      },
    ],
  },
  {
    Tournament: "HELP BP Debate Open 2023",
    Motions: [
      {
        Motion: "THW legalise acts of vigilantism in high crime areas",
        Infoslide: null,
      },
      {
        Motion:
          "THR the creation of youth wings in political parties (Eg. Socialist Youth and DAP, Putera UMNO)",
        Infoslide: null,
      },
    ],
  },
  {
    Tournament: "Vitark BPD Eighth Edition",
    Motions: [
      {
        Motion: "TH, as X & Y, would choose to debate with each other.",
        Infoslide:
          "Context: I) X & Y are budding debaters from the Indian circuit who are in a happy relationship. They share common aspirations of doing well at major tournaments (WUDC, UADC etc.) and have briefly debated as a team previously. However, this took a significant toll on their relationship since both of them are highly-competitive teammates prone to bouts of stress and anger. Based on this experience, they have teamed up extensively with a different set of teammates which has been successful. II) For the purposes of this debate, this is likely to be the last year majors are going to be online, post which it is uncertain whether they will be able to access these tournaments. X & Y have spent time preparing for majors with their current teammates. However, in the run up to majors, they realize their current teammates won’t be able to make it to the competition. This leaves them with the choice of either debating with each other or settling for an untested partner. Both X & Y are still quite skeptical of the potential fallout teaming up may have on their relationship.",
      },
    ],
  },
  {
    Tournament: "NHSDLC Junior WSD July - August 2023",
    Motions: [
      {
        Motion: "THBT it is immoral to lie to avoid hurting someone's feelings",
        Infoslide: null,
      },
      {
        Motion:
          "THR the global increase in interest rates following the end of the COVID pandemic",
        Infoslide: null,
      },
      {
        Motion: "THO the narrative that life should be lived in the moment",
        Infoslide: null,
      },
      {
        Motion: "THS harsh punishment for bullying in school",
        Infoslide: null,
      },
    ],
  },
];

const Motions = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const onRefresh = React.useCallback(() => {
    // getMotions();
  }, []);

  // const getMotions = async () => {
  //     try {
  //         const response = await fetch(ServerUrl + '/api/Motions');
  //         const json = await response.json();
  //         setData(json);
  //     } catch (error) {
  //         console.error(error);
  //     } finally {
  //         setLoading(false);
  //     }
  // }

  // useEffect(() => {
  //     getMotions();
  // }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={DataExcel}
          keyExtractor={({ id }, index) => index}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <TouchableHighlight
              style={styles.item}
              onPress={() => navigation.navigate("TimerScreen")}
              underlayColor="#f1f1f1"
            >
              <Text style={styles.itemText}>{item.Tournament}</Text>
            </TouchableHighlight>
          )}
          ItemSeparatorComponent={() => itemSeperator}
        />
      )}
    </View>
  );
};

export default Motions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: "flex-start",
    justifyContent: "center",
    height: 40,
  },
  itemText: {
    fontSize: 17,
    padding: 10,
  },
  taskItem: {
    padding: 10,
    marginVertical: 15,
    fontSize: 16,
  },
  taskTitle: {
    backgroundColor: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    elevation: 4,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
});
