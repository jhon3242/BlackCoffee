
function App() {
    // form 테그가 자동으로 전송되는 것을 막는다.
    document.querySelector("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    })

    // 메뉴의 이름을 입력 받는다.
    document
        .querySelector("#espresso-menu-name")
        .addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log(document.querySelector("#espresso-menu-name").value)
            }
        })
}

App();