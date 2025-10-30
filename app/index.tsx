// import { Text, View, TextInput, StyleSheet, Button, Alert } from "react-native";
// import { useState } from "react";

// export default function Index() {
//   const [text, setText] = useState("");

//   const styles = StyleSheet.create({
//     input: {
//       height: 40,
//       margin: 12,
//       borderWidth: 1,
//       padding: 10,
//       width: 250,
//     },
//   });

//   const submit = () => {
//     if (text.trim() === "") {
//       Alert.alert("Empty Input", "Please type something before submitting!");
//     } else {
//       Alert.alert("Your Thoughts", text);
//       setText(""); // clear input after submit
//     }
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Hey, what's on your mind?</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="How was your day?"
//         value={text}
//         onChangeText={(value) => setText(value)}
//       />
//       <Button
//         onPress={submit}
//         title="Press Me"
//         color="#841584"
//         accessibilityLabel="Submit your thoughts"
//       />
//     </View>
//   );
// }


import { Text, View, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useState } from "react";

export default function Index() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 250,
      borderRadius: 8,
    },
  });

  const submit = async () => {
  const trimmed = text.trim();
  if (!trimmed) {
    Alert.alert("Error", "Please enter something before submitting!");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://10.30.7.24:5000/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: trimmed }),
      
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to submit");
    }

    Alert.alert("Success", "Your message was submitted!");
    setText("");
  } catch (err) {
    console.error("Submit error:", err);
    Alert.alert("Error", "Network error, please try again");
  } finally {
    setLoading(false);
  }
};


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hey, what's on your mind?</Text>
      <TextInput
        style={styles.input}
        placeholder="How was your day?"
        value={text}
        onChangeText={setText}
      />
      <Button
        onPress={submit}
        title={loading ? "Submitting..." : "Submit"}
        color="#841584"
        disabled={loading}
      />
    </View>
  );
}
