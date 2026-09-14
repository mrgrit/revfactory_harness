---
name: commit-message
description: "커밋 메시지 작성. 사용자가 '커밋 메시지', '커밋해줘' 를 말하거나 스테이징된 변경을 커밋하려 할 때 호출."
allowed-tools: Bash(git diff *), Bash(git log *)
---

# commit-message

스테이징된 변경(`git diff --cached`)을 읽고 커밋 메시지를 만든다.

## 형식

```
<type>(<scope>): <제목, 50자 이내, 마침표 없음>

<본문: 무엇을 왜 바꿨는지, 72자 줄바꿈>
```

- `type` 은 `feat` `fix` `refactor` `docs` `test` `chore` 중 하나.
- `scope` 는 바뀐 최상위 디렉터리 이름. 여러 개면 가장 많이 바뀐 것.
- 제목은 명령형 현재 시제로 쓴다. "추가했다" 가 아니라 "추가".

## 규칙

- diff 에 없는 내용을 쓰지 않는다.
- 파일 3개 이상이 바뀌었으면 본문에 파일별 한 줄 요약을 넣는다.
- 최근 커밋 5개(`git log -5 --oneline`)와 같은 어투를 유지한다.

## 출력

메시지만 코드 블록으로 출력한다. 설명은 붙이지 않는다.
