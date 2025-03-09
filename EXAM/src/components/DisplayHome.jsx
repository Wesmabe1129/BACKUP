import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import backgroundMusic from "../assets/sounds/background-music.mp3";

import { io } from "socket.io-client";
import CountDown from "./CountDown";

const getUsername = () => sessionStorage.getItem("username");

const DisplayHome = () => {
  const navigator = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [drawNumbers, setDrawNumbers] = useState(Array(6).fill(null));

  const [users, setUsers] = useState([]);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // useEffect(() => {
  //   socket.on("countdown", (timeLeft) => {
  //     setTimeLeft(timeLeft);
  //     console.log(timeLeft);
  //   });
  // });
  // useEffect(() => {
  //   socket.on("draw", (numbers) => {
  //     setDrawNumbers(numbers); // Update the state with the latest draw
  //   });

  //   return () => {
  //     socket.off("draw");
  //   };
  // }, []);

  useEffect(() => {
    // ✅ Create audio only once
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.75;

    return () => {
      // ✅ Cleanup: Stop music when component unmounts
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .catch((error) => console.error("Audio play error:", error));
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // useEffect(() => {
  //   const username = getUsername(); // Get the username from localStorage

  //   if (username) {
  //     socket.emit("userConnected", {
  //       username: username,
  //     });
  //   } else {
  //     console.log("⚠️ No username found in localStorage!");
  //   }

  //   const handleUsersUpdate = (onlineUsers) => {
  //     setUsers(onlineUsers);
  //   };

  //   const handleUserDisconnected = (disconnectedUser) => {
  //     setUsers((prevUsers) =>
  //       prevUsers.map((user) =>
  //         user.username === disconnectedUser.username
  //           ? { ...user, online: false } // Mark user as offline
  //           : user
  //       )
  //     );
  //   };

  //   // Listen for the updateOnlineUsers event from the server
  //   socket.on("updateOnlineUsers", handleUsersUpdate);
  //   socket.on("userDisconnected", handleUserDisconnected);

  //   // Notify the server when the user leaves the page
  //   window.addEventListener("beforeunload", () => {
  //     if (username) {
  //       socket.emit("userDisconnected", { username });
  //     }
  //   });

  //   return () => {
  //     socket.off("updateOnlineUsers", handleUsersUpdate); // Cleanup on unmount
  //     socket.off("userDisconnected", handleUserDisconnected);
  //   };
  // }, []);

  // useEffect(() => {
  //   const loadAccountData = async () => {
  //     const data = await fetchAccountData();
  //     if (data) {
  //       setAccountData(data);
  //     } else {
  //       setError("Failed to load account data.");
  //     }
  //   };

  //   loadAccountData();
  //   setLoading(false);
  // }, []);

  const handleHstioryClick = () => {
    navigator("/history");
  };

  const handleAccountClick = () => {
    navigator("/account");
  };

  // if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  // if (error) return <p className="text-center text-red-500">Error: {error}</p>;z

  return (
    <div
      className="h-screen w-screen bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('src/assets/images/bg-main-page.png')",
      }}
    >
      <div className="absolute top-4 left-60 pl-10 px-2">
        <div className="flex items-center justify-center">
          <div
            className="p-4 px-6 py-6 mr-5 bg-center bg-no-repeat "
            style={{
              backgroundImage: "url('src/assets/images/prize.png')",
              backgroundSize: "contain", // or "cover"
            }}
          ></div>
          <h1
            style={{
              fontFamily: "'Jersey 20', sans-serif",
              backgroundColor: "#FFCF50",
              fontSize: "20px", // Set your desired px value here
            }}
            className="flex justify-left px-6 py-2 rounded-lg"
          >
            JACKPOT PRIZE: $1,500.00
          </h1>
        </div>
      </div>

      {/* ✅ Sound Toggle Button */}
      <CountDown />
      {/* <ButtonWithSound
        onClick={toggleSound}
        className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
      >
        {isPlaying ? "🔊 On" : "🔇 Off"}
      </ButtonWithSound> */}
      {/* <div className="bg-white shadow-md rounded-lg p-4 w-64 mb-6">
        <h2
          style={{ fontFamily: "'Jersey 20', sans-serif" }}
          className="text-lg font-semibold text-gray-700 border-b pb-2"
        >
          Online Users ( {users.length} )
        </h2>
        <ul className="mt-2 text-sm text-gray-600">
          {users.length > 0 ? (
            users.map((user, index) => (
              <li key={index} className="py-1">
                {user.username} is online 🟢
              </li>
            ))
          )}
        </ul>
      </div> */}

      <div className="flex  justify-center">
        <h1
          style={{ fontFamily: "'Jersey 20', sans-serif", fontSize: "40px" }}
          className="mt-10 left-10  text-gray-800 text-center font-bold mb-10  border-blue-500 pb-5 pt-10"
        >
          WINNING COMBINATIONS
        </h1>
      </div>

      <div
        className="flex flex-column justify-center"
        style={{ marginTop: -40 }}
      >
        {drawNumbers.map((num, index) => (
          <div
            key={index}
            className="p-15 bg-no-repeat mr-2 bg-contain w-[110px] h-[110px]"
            style={{
              backgroundImage: "url('src/assets/images/winning-bg.png')",
              fontFamily: "'Jersey 20', sans-serif",
            }}
          >
            <p className="text-black mt-4 ml-6 text-7xl">
              {num} {/* Show "--" before draw */}
            </p>
          </div>
        ))}
      </div>

      {/* FRAME WRAPPER */}
      <div className="flex w-full h-auto justify-between">
        {/* FRAME 1 */}
        <div className="flex flex-col ml-80 ">
          {/* Ticket Number Input */}
          <div className="flex w-[220px] mt-5 h-[50px] justify-between">
            <span
              className=" text-black"
              style={{
                fontFamily: "'Jersey 20', sans-serif",
                fontSize: "28px",
              }}
            >
              TICKET COUNTER:
            </span>
            <span
              className=" text-black"
              style={{
                fontFamily: "'Jersey 20', sans-serif",
                fontSize: "28px",
              }}
            >
              0
            </span>
          </div>
          <div className="flex justify-between items-center  w-[220px] h-[50px]">
            <p
              className="justify-left text-left text-black"
              style={{
                fontFamily: "'Jersey 20', sans-serif",
                fontSize: "28px",
              }}
            >
              QUANTITY:
            </p>
            <div className="flex p-2 rounded-lg mt-1 ml-12">
              <button
                onClick={decreaseQuantity}
                className="py-1 px-2 bg-[#EEEEEE] text-black text-[20px]"
              >
                -
              </button>
              <p
                className="px-4 text-black bg-[#FFFFFF] text-center items-center justified-center"
                style={{ fontFamily: "'Jersey 20', sans-serif" }}
              >
                {quantity}
              </p>
              <button
                onClick={increaseQuantity}
                className="py-1 px-2 bg-[#EEEEEE] text-black text-[20px]"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex w-full mt-5 h-auto justify-between gap-6">
            <div
              className="w-[120px] h-auto ml-10  rounded-lg"
              style={{ backgroundColor: "#C14600" }}
            >
              <p className="text-[18px] text-center mt-1 cursor-pointer">
                TOP UP
              </p>
            </div>
            <div
              className="w-[100px] h-10  rounded-lg"
              style={{ backgroundColor: "#41644A" }}
            >
              <p className="text-[18px] text-center mt-1 cursor-pointer">PAY</p>
            </div>
          </div>
          <div className="flex w-full mt-5">
            <p
              style={{
                fontFamily: "'Jersey 20', sans-serif",
                fontSize: "30px", // Set your desired px value here
              }}
              className="flex justify-left text-black"
            >
              WALLET BALANCE:
            </p>
          </div>

          <div
            style={{
              fontFamily: "'Jersey 20', sans-serif",
              backgroundColor: "#FFCF50",
            }}
          >
            <div className="flex flex-row items-center">
              <div
                className="w-[80px] h-[80px] ml-2 bg-center bg-no-repeat "
                style={{
                  backgroundImage: "url('src/assets/images/money-img.png')",
                  backgroundSize: "contain", // or "cover"
                }}
              ></div>
              <p className="ml-2 text-center text-black text-[36px]">
                $ 1500.00
              </p>
            </div>
          </div>
        </div>

        {/* FRAME 2 */}
        <div
          className="flex flex-col mr-80 text-white"
          style={{ fontFamily: "'Jersey 20', sans-serif" }}
        >
          <div className="mt-10 mr-20">
            <input
              type="email"
              placeholder="Enter Bet"
              className="w-full p-2 border-b-2 border-black bg-transparent text-4xl text-black mb-3 focus:outline-none"
            />
          </div>
          <div className="flex mt-5 mr-16 relative items-center justify-center">
            <button
              style={{ backgroundColor: "#C14600" }}
              className="w-60 text-[18px]"
            >
              LOCK IN
            </button>
          </div>
          <div className="flex mt-5 mr-16 relative items-center justify-center">
            <button
              style={{ backgroundColor: "#41644A" }}
              className="w-60 text-[18px]"
            >
              WITHDRAW CASH
            </button>
          </div>
          <div className="flex mt-5 mr-16 relative items-center justify-center">
            <button
              onClick={handleHstioryClick}
              style={{ backgroundColor: "#FFCF50" }}
              className="w-60 text-[18px]"
            >
              HISTORY
            </button>
          </div>

          <div className="flex w-[340px] mt-[50px] ml-[65px] text-[24px] h-auto justify-between">
            <div>
              <p
                style={{ backgroundColor: "#C14600" }}
                className="w-[150px] text-center rounded-lg"
              >
                GAMBLERS (2)
              </p>
            </div>
            <div>
              <p
                onClick={handleAccountClick}
                style={{ backgroundColor: "#41644A" }}
                className="w-[150px] text-center rounded-lg cursor-pointer"
              >
                user_nemo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayHome;
