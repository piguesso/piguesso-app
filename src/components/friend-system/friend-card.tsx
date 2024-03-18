import Image from "next/image";
import React, { useState } from "react";
import profilePicture from "@/images/profilePicture.png";
import addFriendButton from "@/images/addFriendButton.png";
import friendAdded from "@/images/friendAdded.png";

interface FriendCardProps {
  UserName: string;
  Status: boolean;
  Friends: boolean;
}

const FriendCard: React.FC<FriendCardProps> = ({
  UserName,
  Status,
  Friends,
}: FriendCardProps) => {
  const textColor = Status ? "text-success" : "text-red-500";
  const [friend, setFriend] = useState(false);
  const [friendAddedVisible, setFriendAddedVisible] = useState(false);

  let currentPlayerStatus = "Offline";
  if (Status == true) {
    currentPlayerStatus = "Online";
  } else {
    currentPlayerStatus = "Offline";
  }

  const handleButtonClick = () => {
    setFriend(true);
    setFriendAddedVisible(true);
  };

  const handleButtonRemoveFriendClick = () => {
    setFriend(false);
    setFriendAddedVisible(false);
  };

  return (
    <div className="flex flex-row bg-surface border border-border sm:w-80 md:w-[75%] rounded-xl p-2 m-2 gap-x-2 items-center justify-between">
      <div className="flex flex-row gap-x-3 items-align">
        <Image src={profilePicture} width={55} height={55} alt="Profile" />
        <div className="gap-y-1 flex flex-col">
          <h3 className="font-bold">{UserName}</h3>
          <p className={textColor}>{currentPlayerStatus}</p>
        </div>
      </div>
      {!friendAddedVisible && (
        <button title="AddFriendButton" onClick={handleButtonClick}>
          <Image
            src={addFriendButton}
            width={50}
            height={50}
            alt="Button for adding friends"
          />
        </button>
      )}
      {friendAddedVisible && (
        <button
          title="RemoveFriendButton"
          onClick={handleButtonRemoveFriendClick}
        >
          <Image
            src={friendAdded}
            width={50}
            height={50}
            alt="Friend Added Image"
          />
        </button>
      )}
    </div>
  );
};

export default FriendCard;
