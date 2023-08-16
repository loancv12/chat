import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
} from "emoji-picker-react";
import { useState } from "react";

export default function EmojiFunc({ getEmoji, selectedEmoji }) {
  const [showPopper, setShowPopper] = useState(false);
  function onClick(emojiData, event) {
    getEmoji(emojiData);
  }
  const defaultEmoji = "😊";

  return (
    <div className="emoji">
      <div className="show-emoji" onClick={() => setShowPopper(!showPopper)}>
        {defaultEmoji}
      </div>
      {/* {selectedEmoji ? (
        <Emoji
          unified={selectedEmoji}
          emojiStyle={EmojiStyle.APPLE}
          size={22}
        />
      ) : null} */}

      {showPopper && (
        <EmojiPicker
          onEmojiClick={onClick}
          autoFocusSearch={false}
          emojiStyle={EmojiStyle.NATIVE}
        />
      )}
    </div>
  );
}
