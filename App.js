import * as React from "react";
import { View, Text } from "react-native";

const SERVER_ADDR = 'localhost:3000'
const sock_client = require('socket.io-client')

export default function App() {
  const [msg, setMessage] = React.useState("")

  React.useEffect(() => {
    const socket = sock_client(SERVER_ADDR)
    /*socket.emit('join', 'room_name')*/
    socket.on('chat_msg', data => {
      setMessage(data)
    })
  })

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{data}</Text>
    </View>
  );
}
