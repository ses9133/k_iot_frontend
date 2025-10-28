// * JSONPlaceholder 의 photos 데이터 사용
// https://jsonplaceholder.typicode.com/photos?albumId=1
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var currentPage = 1; // 현재 페이지 번호를 추적(기본값1 - 첫페이지)
var photoPerPage = 4; // 한 페이지 당 표시할 사진 개수
function fetchPhotos(page) {
    return __awaiter(this, void 0, void 0, function () {
        var response, photos, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('데이터를 가져오는데에 실패하였습니다.');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    photos = _a.sent();
                    // * slice(시작인덱스, 끝인덱스): 배열의 메서드, 특정 부분(시작인덱스부터 끝 인덱스 직전까지)을 새로운 배열로 반환
                    // 1페이지: 0 ~ 3 인덱스 (slice(0, 4))
                    // 2페이지: 4 ~ 7 인덱스 (slice(4, 8))
                    // 3페이지 : 8 ~ 11 ...
                    // (page - 1) * photoPerPage: 시작 인덱스
                    // page * photoPerPage: 끝 인덱스
                    return [2 /*return*/, photos.slice((page - 1) * photoPerPage, page * photoPerPage)];
                case 3:
                    e_1 = _a.sent();
                    console.error('Failed');
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// * 사진을 렌더링하는 함수: 4개씩 나누어진 사진 배열을 매개변수로 받음
function renderPhotos(photos) {
    var container = document.getElementById('photo-container'); // HTMLElement 로 타입단언하면 null 값 방지할수있음(즉, if 문 통해 검증 생략 가능)
    container.innerHTML = '';
    // 각 사진에 대한 HTML 요소 생성
    photos.forEach(function (photo) {
        var photoElements = document.createElement('div');
        photoElements.className = 'photo-item';
        photoElements.innerHTML = "\n      <img src='".concat(photo.thumbnailUrl, "' alt='").concat(photo.title, "' />\n      <p>").concat(photo.title, "</p>\n    ");
        container.appendChild(photoElements);
    });
}
// * 전체 프로젝트 실행
function updatePhotos() {
    return __awaiter(this, void 0, void 0, function () {
        var photos, nextBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchPhotos(currentPage)];
                case 1:
                    photos = _a.sent();
                    if (currentPage === 13) {
                        nextBtn = document.getElementById('next-button');
                        nextBtn.style.visibility = 'hidden';
                    }
                    renderPhotos(photos);
                    return [2 /*return*/];
            }
        });
    });
}
updatePhotos();
// * 
document.addEventListener('DOMContentLoaded', function () {
    var currentPageNumber = document.getElementById('page-number');
    currentPageNumber.textContent = "".concat(currentPage);
    // * 버튼 이벤트 등록
    document.getElementById('prev-button').addEventListener('click', function () {
        // 이벤트가 등록될 DOM 요소에 대한 단언 (!, 느낌표 사용)
        if (currentPage > 1) {
            currentPage--;
            currentPageNumber.textContent = "".concat(currentPage);
            updatePhotos();
        }
    });
    document.getElementById('next-button').addEventListener('click', function () {
        if (currentPage < 13) {
            currentPage++;
            currentPageNumber.textContent = "".concat(currentPage);
            updatePhotos();
        }
    });
});
