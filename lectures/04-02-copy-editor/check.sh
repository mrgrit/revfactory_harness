#!/usr/bin/env bash
# copy-editor 결과 자동 채점.  ex-04-02-copy-editor/ 안에서 실행한다.
#   bash check.sh                      # sample-doc/ch-07-draft.md 채점
#   bash check.sh 다른/원고.md          # 다른 사본 채점
# grep 만 쓴다. 과잉 교정 검사는 git 저장소 안에서만 동작한다.
f="${1:-sample-doc/ch-07-draft.md}"
r="reviews/copy-edit-report.md"
pass=0; fail=0
ok(){ printf 'PASS  %s\n' "$1"; pass=$((pass+1)); }
ng(){ printf 'FAIL  %s\n' "$1"; fail=$((fail+1)); }
# 위반이 원고에 아직 남아 있으면 FAIL
absent(){ local hit; hit=$(grep -nE -- "$2" "$f" | cut -d: -f1 | paste -sd, -)
  if [ -n "$hit" ]; then ng "$1  ← 아직 남아 있음 (현재 ${hit}줄)"; else ok "$1"; fi; }
# 예외 케이스가 사라졌으면 FAIL
present(){ if grep -qF -- "$2" "$f"; then ok "$1"; else ng "$1  ← 예외 케이스가 훼손됨"; fi; }

[ -f "$f" ] || { echo "원고 없음: $f"; exit 2; }
echo "== 수정 대상 11건 (원고에 남아 있으면 FAIL) =="
absent "콜론 1  · 7줄   '정해야 합니다:'"              '정해야 합니다:'
absent "콜론 2  · 9줄   '다룰 내용은 다음과 같습니다:'" '다룰 내용은 다음과 같습니다:'
absent "콜론 3  · 16줄  '아래와 같습니다:'"             '아래와 같습니다:'
absent "콜론 4  · 31줄  '요약하면 다음과 같습니다:'"    '요약하면 다음과 같습니다:'
absent "콜론 5  · 33줄  '결과:로'  (보류 처리도 허용)"   '결과:로'
absent "Bold 1  · 11줄  **마구(harness)**가"           '\(harness\)\*\*[^[:space:][:punct:]]'
absent "Bold 2  · 12줄  **컨테이너(container)**의"     '\(container\)\*\*[^[:space:][:punct:]]'
absent "Bold 3  · 22줄  **검증(verification)**을"      '\(verification\)\*\*[^[:space:][:punct:]]'
absent "오탈자 1 · 23줄  '했습다습다'"                  '했습다습다'
absent "오탈자 2 · 31줄  '의 의'"                      '의 의 '
absent "오탈자 3 · 32줄  '그리고 그리고'"               '그리고 그리고'

echo "== 예외 케이스 3건 (사라지면 FAIL) =="
present "시간 콜론      12:30"                '12:30'
present "코드 콜론      \`model: sonnet\`"    '`model: sonnet`'
present "표 헤더 콜론   | 항목: 값 |"          '| 항목: 값 |'

echo "== 과잉 교정 (변경 줄 수, 기대 ≤ 10) =="
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  stat=$(git diff --numstat -- "$f")
  add=${stat%%	*}; rest=${stat#*	}; del=${rest%%	*}
  add=${add:-0}; del=${del:-0}
  if [ "$add" -gt 10 ] || [ "$del" -gt 10 ]; then ng "변경 줄 수 -$del +$add  ← 윤문·재배치 의심, git diff 로 확인"
  elif [ "$add" -eq 0 ]; then ng "변경 줄 수 0  ← 원고가 수정되지 않음"
  else ok "변경 줄 수 -$del +$add"; fi
else
  echo "SKIP  git 저장소가 아니라 변경 줄 수를 셀 수 없음 (git init && git add -A && git commit 후 재실행)"
fi

echo "== 리포트 $r =="
if [ -f "$r" ]; then
  for s in '# Copy Edit Report' '## 처리 요약' '## 파일별 처리 내역' '## 보류 항목'; do
    if grep -qF -- "$s" "$r"; then ok "섹션 '$s'"; else ng "섹션 '$s' 없음"; fi
  done
else ng "리포트 파일 없음 ($r)"; fi

echo; echo "PASS $pass / FAIL $fail"
[ "$fail" -eq 0 ]
