

const $ = (element) => document.querySelector(element);

function App() {
    this.state = {
        espresso : []
    };
    this.category = "espresso";

    const addMenu = (menuName) => {
        this.state[this.category].push(menuName);
        console.log(this.state[this.category])
    }


    // form 테그가 자동으로 전송되는 것을 막는다.
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    })


    $("#espresso-menu-name").addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addMenu($("#espresso-menu-name").value);
            }
        });
    $("#espresso-menu-submit-button").addEventListener('click', () => {
        addMenu($("#espresso-menu-name").value);
    })
}

new App();