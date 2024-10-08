const readline = require('readline');

// 카드 무작위 뽑기 함수
function getRandomCard() {
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]; // 10은 J, Q, K에 해당, 11은 A
    return cards[Math.floor(Math.random() * cards.length)];
}

// 점수 계산 함수
function calculateScore(hand) {
    let score = hand.reduce((acc, card) => acc + card, 0);
    
    // Ace (11) 값 조정 (21을 넘으면 1로 취급)
    if (score > 21 && hand.includes(11)) {
        score -= 10;
    }
    
    return score;
}

// 블랙잭 게임 함수
function blackjackGame() {
    // 플레이어와 딜러의 첫 두 장
    let playerHand = [getRandomCard(), getRandomCard()];
    let dealerHand = [getRandomCard(), getRandomCard()];

    console.log(`Player's cards: ${playerHand}`);
    console.log(`Dealer's first card: ${dealerHand[0]}`);

    let playerScore = calculateScore(playerHand);
    let dealerScore = calculateScore(dealerHand);

    // readline 인터페이스 생성
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // 플레이어가 카드를 더 받을지 결정
    function askPlayer() {
        // 플레이어가 21점 달성하면 블랙잭 승리
        if (playerScore === 21) {
            console.log("블랙잭! 플레이어 승리!");
            rl.close();
            return;
        }

        if (playerScore < 21) {
            rl.question("카드를 더 받으시겠습니까? (y/n) ", (answer) => {
                if (answer === 'y') {
                    playerHand.push(getRandomCard());
                    playerScore = calculateScore(playerHand);
                    console.log(`Player's cards: ${playerHand}, Score: ${playerScore}`);
                    askPlayer(); // 다시 묻기
                } else {
                    rl.close();
                    playDealer();
                }
            });
        } else {
            // 플레이어가 21점을 초과하면 Bust
            console.log("Bust! 플레이어 패배!");
            rl.close();
        }
    }

    // 딜러가 카드를 받는 로직
    function playDealer() {
        console.log(`Dealer's cards: ${dealerHand}, Score: ${dealerScore}`);

        // 딜러는 17점 이상이 될 때까지 카드를 받음
        while (dealerScore < 17) {
            dealerHand.push(getRandomCard());
            dealerScore = calculateScore(dealerHand);
            console.log(`Dealer's cards: ${dealerHand}, Score: ${dealerScore}`);
        }

        // 딜러가 21점을 초과하면 Bust
        if (dealerScore > 21) {
            console.log("Bust! 딜러 패배! 플레이어 승리!");
            return;
        }

        // 승패 판정
        if (playerScore > dealerScore && playerScore <= 21) {
            console.log("플레이어 승리!");
        } else if (dealerScore > playerScore) {
            console.log("딜러 승리!");
        } else if (dealerScore === playerScore) {
            console.log("무승부!");
        }
    }

    askPlayer();
}

blackjackGame();
