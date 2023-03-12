// 변수로 정의해둬서 코드의 반복을 줄인다.
const $ = (selector) => document.querySelector(selector);
const store = {
    setLocalStorage(menu) {
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage(){
        return JSON.parse(localStorage.getItem("menu"));
    }
}
function App() {
    this.menu = {
        espresso : [],
        frappuccino : [],
        blended : [],
        teavana : [],
        desert : []
    };
    this.currentCategory = 'espresso';

    const render = () => {
        const template = this.menu[this.currentCategory]
            .map((item, index) => {
                return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                          <span class="w-100 pl-2 menu-name">${item.name}</span>
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
                        </li>`;
            })
            .join("");
        $("#menu-list").innerHTML = template;
        updateMenuCount();
    }
    this.init = () => {
        if (store.getLocalStorage()) {
            this.menu = store.getLocalStorage();
        }
        render();
    }

    // 총 개수 업데이트
    const updateMenuCount = () => {
        let menuCount = $("#menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount} 개`;
    }
    const updateMenuName = (e) => {
        // 현재 위치에서 상위로 올라가면서 가장 가까운 li 태그를 찾고 다시 그 아래 menu-name 쿼리를 선택
        const menuId = e.target.closest("li").dataset.menuId;
        let $menuName = e.target.closest("li").querySelector(".menu-name");
        let updatedMenuName = prompt("메뉴 이름을 수정해주세요.", $menuName.innerText);
        this.menu[this.currentCategory][menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu);
        $menuName.innerText = updatedMenuName;
    }
    const deleteMenuName = (e) => {
        if (confirm("정말로 삭제하시겠습니까?")) {
            const menuId = e.target.closest("li").dataset.menuId;
            this.menu[this.currentCategory].splice(menuId, 1);
            store.setLocalStorage(this.menu);
            e.target.closest("li").remove();
            updateMenuCount();
        }
    }
    const addMenuName = () => {
        if ($("#menu-name").value === "") {
            alert("값을 입력해주세요.")
            return;
        }
        let menuName = $("#menu-name").value;
        this.menu[this.currentCategory].push({name : menuName});
        store.setLocalStorage(this.menu);
        render();

        // input 값 빈 값으로 초기화
        $("#menu-name").value = "";
    }

    $("#menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")){
            updateMenuName(e);
        }
        if (e.target.classList.contains("menu-remove-button")){
            deleteMenuName(e);
        }
    })
    $("#menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    })
    $("#menu-submit-button").addEventListener("click", addMenuName);
    $("#menu-name").addEventListener('keypress', (e) => {
            if (e.key !== 'Enter') {
                return ;
            }
            addMenuName();
        });
    $("nav").addEventListener("click", (e) => {
        const isCategory = e.target.classList.contains("cafe-category-name");
        if (isCategory) {
            const categoryName = e.target.dataset.categoryName;
            this.currentCategory = categoryName;
            $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`
            render();
        }
    })
}

const app = new App();
app.init();
