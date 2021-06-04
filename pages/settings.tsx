import { LoadingOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import firebase from "firebase/app";
import "firebase/storage";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { isSameUser, PrototypeUser } from "../components/GlobalUserContext";
import Header from "../components/header";
import SettingsComponent from "../components/SettingsComponent";
import initializeFirebase from "../services/firebase";

const Settings = () => {
  const [isChecking, setIsChecking] = useState(true);
  let [user, setUser] = useState(PrototypeUser);
  const [msg, setMsg] = useState("");

  const checkLoginSession = () => {
    initializeFirebase();

    if (user === PrototypeUser) {
      firebase.auth().onAuthStateChanged((currentUser: firebase.User) => {
        if (currentUser) {
          var username = currentUser.displayName
            ? currentUser.displayName
            : currentUser.uid.slice(0, 5);

          const cUser = {
            email: currentUser.email,
            displayName: username,
            id: currentUser.uid,
            photoURL: currentUser.photoURL,
          };

          if (!isSameUser(cUser, user)) {
            setUser({
              email: currentUser.email,
              displayName: username,
              id: currentUser.uid,
              photoURL: currentUser.photoURL,
            });
          }
          setIsChecking(false);
        } else {
          router.push("../login");
        }
      });
    }
  };

  // This validates the login session at component load.
  useEffect(() => {
    checkLoginSession();
  }, []);

  const onSave = (props) => {
    console.log(props);
    setMsg("");
    let completedCounter = 0;
    let totalCounter = 0;

    if (props.image) {
      totalCounter++;
    }
    if (props.password) {
      totalCounter++;
    }
    if (props.newName) {
      totalCounter++;
    }

    let credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      props.currentPass
    );

    firebase
      .auth()
      .currentUser.reauthenticateWithCredential(credential)
      .then(() => {
        message.info({
          content: "Saving (" + completedCounter + "/" + totalCounter + ")..",
          key: "save",
        });
        if (props.image) {
          initializeFirebase();
          let storageRef = firebase.storage().ref();
          let imageRef = storageRef.child("profilePics/" + user.id);
          let imageUploadTask = imageRef.put(props.image[0]);

          imageUploadTask.on(
            "state_changed",
            (snapshot) => {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              message.info(
                {
                  content: "Uploading avatar: " + progress.toFixed(2) + "%",
                  key: "avatarUpload",
                },
                5
              );
            },
            (error) => {
              // Handle unsuccessful uploads
              message.error("Avatar upload unsuccessful!");
            },
            () => {
              imageUploadTask.snapshot.ref
                .getDownloadURL()
                .then((downloadURL) => {
                  firebase
                    .auth()
                    .currentUser.updateProfile({ photoURL: downloadURL })
                    .then(() => {
                      completedCounter++;

                      if (completedCounter < totalCounter) {
                        message.info(
                          {
                            content:
                              "Saving (" +
                              completedCounter +
                              "/" +
                              totalCounter +
                              ")..",
                            key: "save",
                          },
                          5
                        );
                      } else {
                        message.success(
                          {
                            content:
                              "Saved (" +
                              completedCounter +
                              "/" +
                              totalCounter +
                              ")..",
                            key: "save",
                          },
                          5
                        );
                        router.reload();
                      }
                    });
                });
            }
          );
        }

        if (props.newName) {
          firebase
            .auth()
            .currentUser.updateProfile({ displayName: props.newName })
            .then(() => {
              completedCounter++;
              if (completedCounter < totalCounter) {
                message.info(
                  {
                    content:
                      "Saving (" +
                      completedCounter +
                      "/" +
                      totalCounter +
                      ")..",
                    key: "save",
                  },
                  5
                );
              } else {
                message.success(
                  {
                    content:
                      "Saved (" + completedCounter + "/" + totalCounter + ")..",
                    key: "save",
                  },
                  5
                );

                router.reload();
              }
            });
        }

        if (props.password) {
          firebase
            .auth()
            .currentUser.updatePassword(props.password)
            .then(() => {
              completedCounter++;
              if (completedCounter < totalCounter) {
                message.error(
                  {
                    content:
                      "Save Failed (" +
                      completedCounter +
                      "/" +
                      totalCounter +
                      ")..",
                    key: "save",
                  },
                  5
                );
              } else {
                message.success(
                  {
                    content:
                      "Saved (" + completedCounter + "/" + totalCounter + ")..",
                    key: "save",
                  },
                  5
                );

                router.reload();
              }
            });
        }
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setMsg("Invalid password!");
          console.log("Invalid Password");
        }
        console.log(error);
        message.error("Save failed!");
      });
  };

  return !isChecking ? (
    <div>
      <Header active="NONE" />
      <SettingsComponent user={user} onSave={onSave} message={msg} />
    </div>
  ) : (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <Spin indicator={<LoadingOutlined />} size="large" />
    </div>
  );
};

export default Settings;
