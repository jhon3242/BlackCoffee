

const $ = (element) => document.querySelector(element);

function App() {
    this.state = {
        espresso : []
    };
    this.category = "espresso";

    const render = () => {
        const template = (name, idx) => `
        <li data-menu-id="${idx}" class="menu-list-item d-flex items-center py-2">
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
        $("#menu-list").innerHTML = menuList;
        $(".menu-count").innerText = `총 ${count}개`;
    }


    const addMenu = () => {
        const menuName = $("#menu-name").value;
        if (menuName === '') {
            alert("값을 입력해주세요.");
            return ;
        }

        this.state[this.category].push(menuName);
        render();
        $("#menu-name").value = "";
    }
    const updateMenu = (e) => {
        const newName = prompt("수정할 이름을 입력해주세요.");
        if (newName === '') {
            alert("값을 입력해주세요.");
            return ;
        }
        const menuId = e.target.closest("li").dataset.menuId;
        this.state[this.category][menuId] = newName;
        render();
    }


    // form 테그가 자동으로 전송되는 것을 막는다.
    $("#menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    })
    $("#menu-name").addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addMenu();
            }
        });
    $("#menu-submit-button").addEventListener('click', addMenu);
    $("#menu-list").addEventListener('click', (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            updateMenu(e);
        }
    })
}

new App();