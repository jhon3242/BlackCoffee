

const $ = (element) => document.querySelector(element);

function App() {
    this.state = {
        espresso : []
    };
    this.category = "espresso";

    const render = () => {
        const template = (name) => `
        <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`
        const menuList = this.state[this.category].map(template).join("");
        const count = this.state[this.category].length;
        $("#espresso-menu-list").innerHTML = menuList;
        $(".menu-count").innerText = `총 ${count}개`;
    }

    const addMenu = () => {
        const menuName = $("#espresso-menu-name").value;
        this.state[this.category].push(menuName);
        render();
        $("#espresso-menu-name").value = "";
    }

    // form 테그가 자동으로 전송되는 것을 막는다.
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    })


    $("#espresso-menu-name").addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addMenu();
            }
        });
    $("#espresso-menu-submit-button").addEventListener('click', addMenu);
}

new App();