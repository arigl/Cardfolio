import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import "../styles/animations.css";

const PlayingCard = ({ card, isSelected, onClick, animation }) => {
  const { isDark } = useTheme();
  const { suit, rank, content } = card;

  const getTypeColor = () => {
    switch (content.type) {
      case "project":
        return "text-blue-500";
      case "about":
        return "text-red-500";
      case "skill":
        return "text-green-500";
      case "hobby":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  const getCardStyle = () => {
    const baseStyle = isDark
      ? { background: "#1f2937" }
      : { background: "#ffffff" };

    switch (content.type) {
      case "project":
        return {
          ...baseStyle,
          border: `2px solid ${isDark ? "#3b82f6" : "#60a5fa"}`,
        };
      case "about":
        return {
          ...baseStyle,
          border: `2px solid ${isDark ? "#ef4444" : "#f87171"}`,
        };
      case "skill":
        return {
          ...baseStyle,
          border: `2px solid ${isDark ? "#10b981" : "#34d399"}`,
        };
      case "hobby":
        return {
          ...baseStyle,
          border: `2px solid ${isDark ? "#9333ea" : "#a855f7"}`,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div
      className={`relative transform transition-transform duration-200 ${
        isSelected ? "-translate-y-5" : ""
      }`}
      onClick={() => onClick(card)}
    >
      <div
        className={`
          w-32 h-48 cursor-pointer
          ${animation || ""}
        `}
      >
        <div
          style={getCardStyle()}
          className={`
            w-full h-full rounded-lg
            ${isDark ? "text-gray-100" : "text-gray-900"}
            ${
              isSelected
                ? "shadow-[0_0_15px_rgba(251,191,36,0.5)] ring-2 ring-yellow-400"
                : "shadow-lg"
            }
          `}
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute top-0 left-[-100%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-45 transition-transform duration-1000 group-hover:translate-x-full" />
          </div>

          {/* Card Corner */}
          <div className="absolute top-2 left-2 flex flex-col items-center">
            <span className={`text-sm font-bold ${getTypeColor()}`}>
              {rank}
            </span>
            <span className={`text-lg ${getTypeColor()}`}>{content.suit}</span>
          </div>

          {/* Card Content */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-center">
              {content.title !== "Blank Card" && (
                <>
                  <div className="font-bold mb-1">
                    {content.title || content.name}
                  </div>
                  {content.type === "skill" && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${content.level}%` }}
                      />
                    </div>
                  )}
                  {content.tags && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {content.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Bottom Corner */}
          <div className="absolute bottom-2 right-2 flex flex-col items-center rotate-180">
            <span className={`text-sm font-bold ${getTypeColor()}`}>
              {rank}
            </span>
            <span className={`text-lg ${getTypeColor()}`}>{content.suit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Move evaluation logic outside of HandEvaluator component
const evaluatePokerHand = (selectedCards) => {
  if (selectedCards.length < 2) return null;

  // Check for pairs
  const ranks = selectedCards.map((card) => card.rank);
  const rankCounts = ranks.reduce((acc, rank) => {
    acc[rank] = (acc[rank] || 0) + 1;
    return acc;
  }, {});

  // Sort ranks for straights
  const sortedRanks = ranks
    .map((rank) => {
      const rankOrder = {
        A: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        J: 11,
        Q: 12,
        K: 13,
      };
      return rankOrder[rank];
    })
    .sort((a, b) => a - b);

  // Check for straight
  const isConsecutive = sortedRanks.every((num, i) => {
    return i === 0 || num === sortedRanks[i - 1] + 1;
  });

  // Check for flush
  const suits = selectedCards.map((card) => card.content.suit);
  const isFlush = new Set(suits).size === 1;

  // Evaluate hand combinations
  const pairs = Object.entries(rankCounts).filter(
    ([_, count]) => count === 2
  ).length;
  const threeOfAKind = Object.values(rankCounts).some((count) => count === 3);
  const fourOfAKind = Object.values(rankCounts).some((count) => count === 4);
  const fiveOfAKind = Object.values(rankCounts).some((count) => count === 5);

  // Return hand type and base score
  if (fiveOfAKind) return { name: "Five of a Kind!", score: 1000 };
  if (isFlush && isConsecutive && selectedCards.length >= 5)
    return { name: "Straight Flush!", score: 800 };
  if (fourOfAKind) return { name: "Four of a Kind!", score: 600 };
  if (threeOfAKind && pairs === 1) return { name: "Full House!", score: 500 };
  if (isFlush) return { name: "Flush!", score: 400 };
  if (isConsecutive && selectedCards.length >= 5)
    return { name: "Straight!", score: 300 };
  if (threeOfAKind) return { name: "Three of a Kind!", score: 200 };
  if (pairs === 2) return { name: "Two Pair!", score: 100 };
  if (pairs === 1) return { name: "Pair!", score: 50 };

  return { name: "High Card", score: 0 };
};

const HandEvaluator = ({ selectedCards }) => {
  const { isDark } = useTheme();
  const handResult = evaluatePokerHand(selectedCards);

  if (!handResult) return null;

  return (
    <div
      className={`text-center py-2 px-4 rounded-lg font-bold text-lg
      ${isDark ? "bg-gray-800 text-yellow-400" : "bg-white text-yellow-600"}
      animate-bounce shadow-lg
    `}
    >
      {handResult.name}
    </div>
  );
};

const CardGame = ({ data, onBack }) => {
  const { isDark } = useTheme();
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [cardAnimations, setCardAnimations] = useState({});
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [consecutiveHands, setConsecutiveHands] = useState(0);
  const [remainingHands, setRemainingHands] = useState(5);
  const [remainingDiscards, setRemainingDiscards] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [sortBySuitActive, setSortBySuitActive] = useState(false);
  const [lastScoredHand, setLastScoredHand] = useState(null);

  const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  useEffect(() => {
    // Create a deck based on the data
    const newDeck = [];
    const usedCombinations = new Set(); // Track used rank-suit combinations

    // First, create cards from actual data
    data.forEach((content) => {
      const suit = content.suit;
      // Find first available rank for this content
      for (const rank of ranks) {
        const combination = `${rank}-${suit}`;
        if (!usedCombinations.has(combination)) {
          const cardId = `${rank}-${suit}-${Math.random()}-${Date.now()}`; // More unique ID
          newDeck.push({
            id: cardId,
            suit,
            rank,
            content,
          });
          usedCombinations.add(combination);
          break;
        }
      }
    });

    // Fill remaining slots with blank cards to reach 52
    const suits = ["💻", "❤️", "✏️", "🎮"];
    for (const suit of suits) {
      for (const rank of ranks) {
        const combination = `${rank}-${suit}`;
        if (!usedCombinations.has(combination)) {
          const cardId = `${rank}-${suit}-${Math.random()}-${Date.now()}`; // More unique ID
          newDeck.push({
            id: cardId,
            suit,
            rank,
            content: {
              type:
                suit === "💻"
                  ? "project"
                  : suit === "❤️"
                  ? "about"
                  : suit === "✏️"
                  ? "skill"
                  : "hobby",
              title: "Blank Card",
              description: "This card has no special effects",
              suit: suit,
            },
          });
          usedCombinations.add(combination);
        }
      }
    }

    // Verify we have exactly 52 cards
    if (newDeck.length !== 52) {
      console.warn(`Deck size is ${newDeck.length}, expected 52`);
    }

    // Shuffle the deck
    const shuffledDeck = [...newDeck].sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);

    // Deal initial hand
    setHand(shuffledDeck.slice(0, 6));
  }, [data]);

  useEffect(() => {
    // Automatically sort the hand whenever it changes
    if (hand.length > 0) {
      const newHand = [...hand];
      if (sortBySuitActive) {
        const suitOrder = {
          "💻": 1,
          "❤️": 2,
          "✏️": 3,
          "🎮": 4,
        };
        newHand.sort((a, b) => {
          if (suitOrder[a.content.suit] === suitOrder[b.content.suit]) {
            const rankOrder = {
              A: 1,
              2: 2,
              3: 3,
              4: 4,
              5: 5,
              6: 6,
              7: 7,
              8: 8,
              9: 9,
              10: 10,
              J: 11,
              Q: 12,
              K: 13,
            };
            return rankOrder[a.rank] - rankOrder[b.rank];
          }
          return suitOrder[a.content.suit] - suitOrder[b.content.suit];
        });
      } else {
        const rankOrder = {
          A: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          10: 10,
          J: 11,
          Q: 12,
          K: 13,
        };
        newHand.sort((a, b) => rankOrder[a.rank] - rankOrder[b.rank]);
      }

      // Only update if the order has actually changed
      const currentOrder = hand.map((card) => card.id).join(",");
      const newOrder = newHand.map((card) => card.id).join(",");
      if (currentOrder !== newOrder) {
        setHand(newHand);
      }
    }
  }, [sortBySuitActive, hand]); // Re-run when sort mode or hand changes

  // Add a separate effect for initial hand sorting
  useEffect(() => {
    if (hand.length > 0) {
      const newHand = [...hand];
      const rankOrder = {
        A: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        J: 11,
        Q: 12,
        K: 13,
      };
      newHand.sort((a, b) => rankOrder[a.rank] - rankOrder[b.rank]);
      setHand(newHand);
    }
  }, []); // Only run once on mount

  const handleCardClick = (card) => {
    if (selectedCards.some((s) => s.id === card.id)) {
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const getNextCard = () => {
    const remainingCards = deck.filter(
      (card) =>
        !hand.some(
          (h) => h.rank === card.rank && h.content.suit === card.content.suit
        ) &&
        !discardPile.some(
          (d) => d.rank === card.rank && d.content.suit === d.content.suit
        )
    );

    if (remainingCards.length === 0) {
      // If no cards left, shuffle discard pile back into deck
      const shuffledDiscard = [...discardPile]
        .map((card) => ({
          ...card,
          id: `${card.rank}-${
            card.content.suit
          }-${Math.random()}-${Date.now()}`,
        }))
        .sort(() => Math.random() - 0.5);
      setDiscardPile([]);
      return shuffledDiscard[0];
    }

    // Get a random card from remaining cards instead of always the first one
    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    const nextCard = remainingCards[randomIndex];
    return {
      ...nextCard,
      id: `${nextCard.rank}-${
        nextCard.content.suit
      }-${Math.random()}-${Date.now()}`,
    };
  };

  const dealNewHand = () => {
    // Add discard animation to current hand
    const newAnimations = {};
    hand.forEach((card, index) => {
      newAnimations[index] = "animate-discard";
    });
    setCardAnimations(newAnimations);

    // Delay new hand dealing for animation
    setTimeout(() => {
      setDiscardPile([...discardPile, ...hand]);
      const remainingCards = deck.filter(
        (card) =>
          !hand.some(
            (h) => h.rank === card.rank && h.content.suit === card.content.suit
          ) &&
          !discardPile.some(
            (d) => d.rank === card.rank && d.content.suit === d.content.suit
          )
      );

      let newHand;
      if (remainingCards.length < 6) {
        // If not enough cards, shuffle discard pile back in
        const shuffledDiscard = [...discardPile].sort(
          () => Math.random() - 0.5
        );
        const availableCards = [...remainingCards, ...shuffledDiscard];

        // Get 6 unique cards
        newHand = [];
        const usedCombos = new Set();

        for (const card of availableCards) {
          const combo = `${card.rank}-${card.content.suit}`;
          if (!usedCombos.has(combo) && newHand.length < 6) {
            usedCombos.add(combo);
            newHand.push({
              ...card,
              id: `${card.rank}-${
                card.content.suit
              }-${Math.random()}-${Date.now()}`,
            });
          }
        }
        setDiscardPile([]);
      } else {
        // Get 6 random cards from remaining cards
        newHand = [];
        const usedCombos = new Set();
        const shuffledRemaining = [...remainingCards].sort(
          () => Math.random() - 0.5
        );

        for (const card of shuffledRemaining) {
          const combo = `${card.rank}-${card.content.suit}`;
          if (!usedCombos.has(combo) && newHand.length < 6) {
            usedCombos.add(combo);
            newHand.push({
              ...card,
              id: `${card.rank}-${
                card.content.suit
              }-${Math.random()}-${Date.now()}`,
            });
          }
        }
      }

      // Add deal animation to new hand
      const dealAnimations = {};
      newHand.forEach((_, index) => {
        dealAnimations[index] = "animate-deal";
      });
      setCardAnimations(dealAnimations);

      setHand(newHand);
      setSelectedCards([]);

      // Clear animations after dealing
      setTimeout(() => {
        setCardAnimations({});
      }, 500);
    }, 500);
  };

  const discardSelected = () => {
    if (selectedCards.length === 0 || remainingDiscards === 0) return;

    // Add discard animation to selected cards
    const newAnimations = {};
    hand.forEach((card, index) => {
      if (selectedCards.some((s) => s.id === card.id)) {
        newAnimations[index] = "animate-discard";
      }
    });
    setCardAnimations(newAnimations);

    // Delay card replacement for animation
    setTimeout(() => {
      // Get indices of selected cards
      const selectedIndices = hand
        .map((card, index) =>
          selectedCards.some((s) => s.id === card.id) ? index : -1
        )
        .filter((index) => index !== -1);

      // Add selected cards to discard pile
      setDiscardPile([...discardPile, ...selectedCards]);

      // Replace selected cards with new ones
      const newHand = [...hand];
      selectedIndices.forEach((index) => {
        const newCard = getNextCard();
        if (newCard) {
          newHand[index] = newCard;
          // Add replace animation for new cards
          newAnimations[index] = "animate-replace";
        }
      });

      setHand(newHand);
      setSelectedCards([]);
      setCardAnimations(newAnimations);
      setRemainingDiscards((prev) => prev - 1);

      // Clear animations after replacement
      setTimeout(() => {
        setCardAnimations({});
      }, 500);
    }, 500);
  };

  const getCardScore = (rank) => {
    const scoreMap = {
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      J: 11,
      Q: 12,
      K: 13,
      A: 14,
    };
    return scoreMap[rank] || 0;
  };

  const playHand = () => {
    if (selectedCards.length < 2 || remainingHands === 0) return;

    const handResult = evaluatePokerHand(selectedCards);
    if (handResult && handResult.score > 0) {
      // Calculate base score from individual cards
      const cardScores = selectedCards.map((card) => getCardScore(card.rank));
      const baseScore = cardScores.reduce((sum, score) => sum + score, 0);
      const finalScore = Math.floor(baseScore * multiplier);

      // Set last scored hand for animation
      setLastScoredHand({
        ...handResult,
        finalScore,
        cardScores,
        multiplier,
      });

      // Update the total score immediately
      setScore((prev) => prev + finalScore);

      setRemainingHands((prev) => prev - 1);

      // Add discard animation to selected cards
      const newAnimations = {};
      hand.forEach((card, index) => {
        if (selectedCards.some((s) => s.id === card.id)) {
          newAnimations[index] = "animate-discard";
        }
      });
      setCardAnimations(newAnimations);

      // Clear the last scored hand after animation duration
      setTimeout(() => {
        setLastScoredHand(null);
      }, 1000);

      // Replace played cards
      setTimeout(() => {
        const selectedIndices = hand
          .map((card, index) =>
            selectedCards.some((s) => s.id === card.id) ? index : -1
          )
          .filter((index) => index !== -1);

        setDiscardPile([...discardPile, ...selectedCards]);

        const newHand = [...hand];
        selectedIndices.forEach((index) => {
          const newCard = getNextCard();
          if (newCard) {
            newHand[index] = newCard;
            newAnimations[index] = "animate-replace";
          }
        });

        setHand(newHand);
        setSelectedCards([]);
        setCardAnimations(newAnimations);

        // Check if game is over
        if (remainingHands === 1) {
          setTimeout(() => {
            setIsGameOver(true);
          }, 1000);
        }

        setTimeout(() => {
          setCardAnimations({});
        }, 500);
      }, 500);
    }
  };

  const resetGame = () => {
    setScore(0);
    setMultiplier(1);
    setConsecutiveHands(0);
    setRemainingHands(5);
    setRemainingDiscards(3);
    setIsGameOver(false);
    setSelectedCards([]);
    setDiscardPile([]);

    // Reshuffle and deal new hand
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);
    setHand(shuffledDeck.slice(0, 6));
  };

  const handleSortToggle = () => {
    setSortBySuitActive(!sortBySuitActive);
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-[#1a1a2e]" : "bg-gray-100"
      } flex items-stretch`}
    >
      <div className="flex min-h-screen">
        {/* Left Sidebar - Fixed width */}
        <div className="w-72 flex-shrink-0 bg-black">
          <div className="flex flex-col gap-4 p-6 h-full">
            {/* Hand Score */}
            <div
              className={`bg-[#252547] p-6 rounded-lg shadow-lg border border-blue-900/30`}
            >
              {selectedCards.length >= 2 ? (
                <>
                  <div className="text-2xl text-white mb-3">
                    {evaluatePokerHand(selectedCards).name} lvl.1
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    {lastScoredHand ? (
                      <>
                        <span className="text-2xl text-blue-400 transition-all duration-1000">
                          {lastScoredHand.cardScores.reduce(
                            (sum, score) => sum + score,
                            0
                          )}
                        </span>
                        <span className="text-xl text-red-400">×</span>
                        <span className="text-2xl text-red-400">
                          {multiplier.toFixed(1)}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl text-blue-400">
                          {evaluatePokerHand(selectedCards).score}
                        </span>
                        <span className="text-xl text-red-400">×</span>
                        <span className="text-2xl text-red-400">
                          {multiplier.toFixed(1)}
                        </span>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-xl text-gray-400">
                  Select cards to see possible hand
                </div>
              )}
            </div>

            {/* Total Score */}
            <div
              className={`bg-[#252547] p-6 rounded-lg shadow-lg border border-blue-900/30`}
            >
              <div className="text-3xl font-bold text-yellow-400">{score}</div>
            </div>

            {/* Run Info */}
            <div
              className={`bg-[#252547] p-6 rounded-lg shadow-lg border border-blue-900/30`}
            >
              <div className="text-2xl text-red-400 mb-3">
                Hands: {remainingHands}
              </div>
              <div className="text-2xl text-green-400 mb-3">
                Discards: {remainingDiscards}
              </div>
              <div className="text-xl text-gray-400">
                Pile: {discardPile.length}
              </div>
            </div>

            {/* Options button renamed to Quit Game */}
            <button
              onClick={onBack}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg text-lg mt-auto"
            >
              Quit Game
            </button>
          </div>
        </div>

        {/* Main Game Area - Responsive */}
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="hidden lg:block max-w-5xl w-full">
            {/* Existing game area content */}
            <div className="h-64 mb-8 flex flex-col items-center justify-center">
              {selectedCards.length > 0 && (
                <div className="flex justify-center gap-4 mb-4">
                  {selectedCards.map((card, index) => (
                    <PlayingCard
                      key={card.id}
                      card={card}
                      isSelected={true}
                      onClick={() => {}}
                      animation="animate-float"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4 mb-8">
              {hand.map((card, index) => (
                <PlayingCard
                  key={card.id}
                  card={card}
                  isSelected={selectedCards.some((s) => s.id === card.id)}
                  onClick={handleCardClick}
                  animation={cardAnimations[index]}
                />
              ))}
            </div>

            <div className="flex justify-between items-center px-4 mt-8">
              <button
                onClick={handleSortToggle}
                className={`
                  px-6 py-3 rounded-lg font-bold text-base
                  ${
                    sortBySuitActive
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }
                  text-white
                `}
              >
                {sortBySuitActive ? "Sort by Rank" : "Sort by Suit"}
              </button>
              <div className="flex gap-4">
                <button
                  onClick={discardSelected}
                  disabled={
                    selectedCards.length === 0 || remainingDiscards === 0
                  }
                  className={`
                    px-6 py-3 rounded-lg font-bold text-base
                    ${
                      selectedCards.length === 0 || remainingDiscards === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }
                    text-white
                  `}
                >
                  Discard
                </button>
                <button
                  onClick={playHand}
                  disabled={selectedCards.length < 2 || remainingHands === 0}
                  className={`
                    px-6 py-3 rounded-lg font-bold text-base
                    ${
                      selectedCards.length < 2 || remainingHands === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }
                    text-white
                  `}
                >
                  Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Over Modal */}
      {isGameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#252547] p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 border border-blue-900/30">
            <h2 className="text-3xl font-bold mb-4 text-center text-white">
              Game Over!
            </h2>
            <div className="text-xl mb-6 text-center text-gray-300">
              Final Score: {score}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
              >
                Play Again
              </button>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGame;
