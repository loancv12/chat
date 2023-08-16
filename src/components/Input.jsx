import React, { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ImageUpload from "./funtionIcons/ImageUpload";
import { PaperClip, Upload } from "./Icons";
import EmojiFunc from "./funtionIcons/EmojiFunc";

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [err, setErr] = useState("");
  const [previews, setPreviews] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const inputRef = useRef();

  const { currentUser } = useAuth();
  const { data } = useChat();

  const handleSend = async (e) => {
    e.preventDefault();
    // debugger;
    if (data?.user?.uid) {
      if (!!previews.length) {
        const metadata = {
          contentType: "image/jpeg",
        };
        const date = new Date().getTime();

        previews.map((preview) => {
          srcToFile(
            preview,
            `${data?.user?.displayName + uuidv4()}`,
            "image/jpeg"
          )
            .then(function (file) {
              const storageRef = ref(storage, `${uuidv4()}`);
              uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                  try {
                    await updateDoc(doc(db, "chats", data.chatId), {
                      messages: arrayUnion({
                        id: uuidv4(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        img: downloadURL,
                      }),
                    });
                  } catch (error) {
                    setErr(error.message);
                  }
                });
              });
            })

            .catch(console.error);
        });
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuidv4(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    } else {
      setErr("Choose what user y wnat to chat");
      alert("enter you user");
    }

    setText("");
    setPreviews([]);
  };

  const getPreviews = (objectUrl) => {
    if (objectUrl) {
      setPreviews((prev) => [...prev, objectUrl]);
    }
  };
  const getEmoji = (emojiData) => {
    setSelectedEmoji(emojiData);
    const cursor = inputRef.current.selectionStart;
    setText((prev) => {
      return prev.slice(0, cursor) + emojiData.emoji + prev.slice(cursor);
    });
    const newCursor = cursor + emojiData.emoji.length;
    setTimeout(
      () => inputRef.current.setSelectionRange(newCursor, newCursor),
      10
    );
  };

  const handleRemoveImg = (e) => {
    const removePreview = e.target.dataset.img;
    const otherPreviews = previews.filter((prev) => prev !== removePreview);
    setPreviews(otherPreviews);
  };

  //load src and convert to a File instance object
  //work for any type of src, not only image src.
  //return a promise that resolves with a File instance
  async function srcToFile(src, fileName, mimeType) {
    return fetch(src)
      .then(function (res) {
        return res.blob();
      })
      .then(function (blob) {
        // return new File([buf], fileName, { type: mimeType });
        return blob;
      });
  }

  useEffect(() => {
    // free memory when ever this component is unmounted
    return () => {
      previews.map((preview) => {
        URL.revokeObjectURL(preview);
      });
    };
  }, []);

  return (
    <form
      className={`input ${!!previews.length && "align-end"}`}
      onSubmit={handleSend}
    >
      <div className="functions">
        {!previews.length && (
          <ImageUpload icon={PaperClip} getPreviews={getPreviews} />
        )}
        <EmojiFunc selectedEmoji={selectedEmoji} getEmoji={getEmoji} />
      </div>
      <div className="show">
        <div className="previewShow">
          {!!previews.length && (
            <>
              <ImageUpload icon={Upload} getPreviews={getPreviews} />
              {previews.map((preview, i) => (
                <div key={i} className="previewImg">
                  <img src={preview} alt="" />
                  <span
                    className="removeBtn"
                    data-img={preview}
                    onClick={handleRemoveImg}
                  >
                    X
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
        <input
          type="text"
          id="inputChat"
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something"
        />
      </div>
      <div className="send">
        <button>Send</button>
      </div>
    </form>
  );
}

export default Input;
