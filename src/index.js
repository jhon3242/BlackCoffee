// 변수로 정의해둬서 코드의 반복을 줄인다.
const $ = (selector) => document.querySelector(selector);
function App() {
    // form 테그가 자동으로 전송되는 것을 막는다.
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    })

    // 메뉴의 이름을 입력 받는다.
    $("#espresso-menu-name")
        .addEventListener('keypress', (e) => {
            if (e.key !== 'Enter') {
                return ;
            }
            if ($("#espresso-menu-name").value === ""){
                alert("값을 입력해주세요.")
                return ;
            }
            if (e.key === 'Enter') {
                let espressoMenuName = $("#espresso-menu-name").value;
                const menuItemTemplate = (espressoMenuName) => {
                    return (`
                        <li className="menu-list-item d-flex items-center py-2">
                            <span className="w-100 pl-2 menu-name">${espressoMenuName}</span>
                            <button
                                type="button"
                                className="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                            >
                                수정
                            </button>
                            <button현
                                type="button"
                                className="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                            >
                                삭제
                            </button현>
                        </li>
                    `);
                }
                // 기존에 있던 li 에 추가로 붙이기 위해선 insertAdjacentHTML 사용
                $("#espresso-menu-list").insertAdjacentHTML('beforeend', menuItemTemplate(espressoMenuName));

                // 총 개수
                let menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
                $(".menu-count").innerText = `총 ${menuCount} 개`;

                // input 값 빈 값으로 초기화
                $("#espresso-menu-name").value = "";

            }

        })
}

App();