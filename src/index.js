// 변수로 정의해둬서 코드의 반복을 줄인다.
const $ = (selector) => document.querySelector(selector);
function App() {

    // 총 개수 업데이트
    function updateMenuCount() {
        let menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount} 개`;
    }


    // 이벤트 위임 : 이벤트를 추가하는 시점에 해당 태그가 없기 떄문에 상위 태그에 이벤트를 위임
    $("#espresso-menu-list").addEventListener("click", (e) => {
        /**
         * 메뉴 수정
         */
        if (e.target.classList.contains("menu-edit-button")) {
            // 현재 위치에서 상위로 올라가면서 가장 가까운 li 태그를 찾고 다시 그 아래 menu-name 쿼리를 선택
            let $menuName = e.target.closest("li").querySelector(".menu-name");
            let updatedMenuName = prompt("메뉴 이름을 수정해주세요.", $menuName.innerText);
            $menuName.innerText = updatedMenuName;
        }

        /**
         * 메뉴 삭제
         */
        if (e.target.classList.contains("menu-remove-button")){
            if (confirm("정말로 삭제하시겠습니까?")) {
                e.target.closest("li").remove();
                updateMenuCount();
            }
        }
    })

    /**
     * 메뉴 추가
     */
    // form 테그가 자동으로 전송되는 것을 막는다.
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    })
    // 메뉴의 이름을 입력 받는다.
    function addEspressoMenuName() {
        if ($("#espresso-menu-name").value === "") {
            alert("값을 입력해주세요.")
            return;
        }
        let espressoMenuName = $("#espresso-menu-name").value;
        const menuItemTemplate = (espressoMenuName) => {
            return (`
                    <li class="menu-list-item d-flex items-center py-2">
                      <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
                    </li>
                `);
        }
        // 기존에 있던 li 에 추가로 붙이기 위해선 insertAdjacentHTML 사용
        $("#espresso-menu-list").insertAdjacentHTML('beforeend', menuItemTemplate(espressoMenuName));

        updateMenuCount();

        // input 값 빈 값으로 초기화
        $("#espresso-menu-name").value = "";
    }

    $("#espresso-menu-submit-button").addEventListener("click", () =>{
        addEspressoMenuName();
    })

    // 엔터 키
    $("#espresso-menu-name")
        .addEventListener('keypress', (e) => {
            if (e.key !== 'Enter') {
                return ;
            }
            addEspressoMenuName();
        });

}

App();