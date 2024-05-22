import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Tournament = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Дебатный клуб "Парасат"</Text>
      <Text style={styles.subheading}>Республиканский турнир "СЕНИМ III"</Text>
      <Text style={styles.info}>Дата: 5-6 ноября</Text>
      <Text style={styles.info}>
        Место проведения: Нью-Йоркский университет
      </Text>
      <Text style={styles.info}>Количество команд: 32</Text>
      <Text style={styles.info}>Формат: BPF</Text>
      <Text style={styles.description}>Игры в формате BPF</Text>
      <Text style={styles.description}>
        Специальный молодежный финал для молодых поколений
      </Text>
      <Text style={styles.description}>
        Опытные судьи и качественная обратная связь
      </Text>
      <Text style={styles.description}>Уникальные, интересные решения</Text>
      <Text style={styles.description}>Призовой фонд для победителей</Text>
      <Text style={styles.description}>
        Новая атмосфера, интересные воспоминания и незабываемое настроение
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#555",
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: "#777",
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
    color: "#999",
    textAlign: "center",
  },
});

export default Tournament;
