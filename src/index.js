

const $ = (element) => document.querySelector(element);

function App() {
    this.state = {
        espresso : []
    };
    this.category = "espresso";
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
    const render = () => {
        const menuList = this.state[this.category].map(template).join("");
        $("#espresso-menu-list").innerHTML = menuList;
    }

    const addMenu = (menuName) => {
        this.state[this.category].push(menuName);
        render();
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