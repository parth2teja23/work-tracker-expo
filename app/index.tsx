// import { Text, View, TextInput, StyleSheet, Button, Alert } from "react-native";
// import { useState } from "react";

// export default function Index() {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const styles = StyleSheet.create({
//     input: {
//       height: 40,
//       margin: 12,
//       borderWidth: 1,
//       padding: 10,
//       width: 250,
//       borderRadius: 8,
//     },
//   });

//   const submit = async () => {
//   const trimmed = text.trim();
//   if (!trimmed) {
//     Alert.alert("Error", "Please enter something before submitting!");
//     return;
//   }

//   setLoading(true);

//   try {
//     const res = await fetch("http://10.30.7.24:5000/api/submit", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: trimmed }),
      
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data?.message || "Failed to submit");
//     }

//     Alert.alert("Success", "Your message was submitted!");
//     setText("");
//   } catch (err) {
//     console.error("Submit error:", err);
//     Alert.alert("Error", "Network error, please try again");
//   } finally {
//     setLoading(false);
//   }
// };


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
//         onChangeText={setText}
//       />
//       <Button
//         onPress={submit}
//         title={loading ? "Submitting..." : "Submit"}
//         color="#841584"
//         disabled={loading}
//       />
//     </View>
//   );
// }


import { Text, View, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";

export default function Index() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 250,
      borderRadius: 8,
    },
    responseBox: {
      marginTop: 20,
      padding: 15,
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
      width: 280,
    },
  });

  const submit = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      Alert.alert("Error", "Please enter something before submitting!");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://172.16.0.2:5000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to submit");
      }

      // ✅ Display the LLM response sent by backend
      // setResponse(data?.reply || "No response from model.");
      setResponse(data?.data?.aiResponse || "No response from model.");

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

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      {response ? (
        <View style={styles.responseBox}>
          <Text style={{ fontWeight: "bold" }}>AI says:</Text>
          <Text>{response}</Text>
        </View>
      ) : null}
    </View>
  );
}
