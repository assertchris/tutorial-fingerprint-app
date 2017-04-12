import React, { Component } from "react";
import { AppRegistry } from "react-native"
import TouchID  from "react-native-touch-id"

class Fingerprints extends Component {
  componentDidMount() {
    const socket = new WebSocket("ws://127.0.0.1:8080/ws")

    socket.addEventListener("message", (e) => {
      const data = JSON.parse(e.data)

      if (data.type === "scan") {
        TouchID.authenticate("Trying TouchID")
          .then(success => {
            // alert("Success")

            socket.send(JSON.stringify({
              "type": "success",
              "data": success,
              "promise": data.promise
            }))
          })
          .catch(error => {
            // alert("Failure")

            socket.send(JSON.stringify({
              "type": "error",
              "data": error,
              "promise": data.promise
            }))
          })
      }
    })

    // socket.addEventListener("open", e => socket.send("hi"))
  }

  render() {
    return null
  }
}

AppRegistry.registerComponent("Fingerprints", () => Fingerprints)
