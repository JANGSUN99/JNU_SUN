function displayGreeting() {
    console.log('Hello, world!')
 }

displayGreeting();

// name 이라는 매개 변수(parameter)를 가진 함수
function displayGreeting(name) {
    // name을 문자열에 넣는 새로운 message 변수를 생성   
    const message = `Hello, ${name}!`;
    // message를 콘솔에 출력
    console.log(message);
}


displayGreeting('Christopher');

displayGreeting('Christopher', 'Hi');
