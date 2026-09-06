# 하네스 엔지니어링 with Claude Code — 실습 강의

> 사이트: https://mrgrit.github.io/revfactory_harness/

《하네스엔지니어링 with Claude Code》(한빛미디어) 와 저자의 공개 예제 저장소
[revfactory/harness-engineering-with-cc](https://github.com/revfactory/harness-engineering-with-cc) 를 바탕으로,
실습을 한 개씩 순서대로 따라 하며 배우는 강의 자료입니다.

## 구조

```
.
├── index.html            # 강의 홈 (커리큘럼)
├── assets/
│   ├── css/site.css      # 공통 스타일
│   └── js/site.js        # 커리큘럼 매니페스트 + 사이드바/페이저
├── lectures/
│   ├── _template.html    # 강의 페이지 템플릿
│   ├── _build.py         # {{FILE:}} / {{CODE:}} / {{DIFF:}} 치환 빌더
│   └── <NN-NN-slug>/     # 실습별 강의 페이지 (index.html)
└── exercises/
    └── ex-<NN-NN-slug>/  # 실습 원본 자료 (참고 저장소에서 복사)
```

## 실습 추가 절차

강의 페이지는 템플릿에 원문을 삽입하는 방식으로 만든다. `lectures/_build.py` 가
`{{FILE:경로}}` 를 HTML 이스케이프한 원문으로, `{{CODE:경로|강조줄|보조강조줄}}` 을 라인 번호 코드 블록으로, `{{DIFF:경로}}` 를 색 구분된 unified diff 블록으로 바꾼다.

```bash
python3 lectures/_build.py <템플릿.html> lectures/<NN-NN-slug>/index.html
```


1. `exercises/` 에 참고 저장소의 해당 예제 폴더를 복사한다.
2. `lectures/_template.html` 을 `lectures/<NN-NN-slug>/index.html` 로 복사해 내용을 채운다.
3. `assets/js/site.js` 의 `CURRICULUM` 에서 해당 항목의 `status` 를 `"ready"` 로 바꾼다.
4. 커밋 → `main` 푸시 → GitHub Pages 가 자동 반영한다.

## 로컬 미리보기

```bash
python3 -m http.server 8000
# http://localhost:8000/
```

빌드 단계가 없는 순수 정적 사이트입니다. GitHub Pages 설정은 **Deploy from a branch → `main` / `/ (root)`** 입니다.

## 라이선스

- 이 저장소의 강의 페이지(`index.html`, `lectures/`, `assets/`): © mrgrit
- `exercises/` 의 실습 예제: [Apache License 2.0](https://github.com/revfactory/harness-engineering-with-cc/blob/main/LICENSE), © revfactory
- 책 본문·도판의 저작권은 저자 및 한빛미디어에 귀속됩니다.
