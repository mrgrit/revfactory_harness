# skill-size-auditor 예상 진단 (dry-run)

> 강사 작성. wc/grep 수치는 `signals.sh` 실측값이고, "발현 판정" 과 "분리 권고" 는 에이전트 정의의 진단 룰을
> 그대로 적용했을 때 나와야 하는 결과다. 실제 실행 결과가 아니다.

## fixtures/samples/size/SKILL.md (release-runbook)

| 신호 | 발현 | 근거 |
|------|:----:|------|
| 크기 | **yes** | `wc -l` = 890 (기준 500) |
| 도메인 분기 | no | "~이면" 분기 헤딩 0개. 8단계가 모두 같은 릴리스 도메인 |
| 조건부 상세 | no | "때만" 류 조건부 헤딩 0개. 모든 절차가 매 릴리스에 적용됨 |

분리 권고: 단계별(사전 점검·빌드·스테이징·카나리·배포·검증·문서화·정리)로 `references/<phase>.md` 를 나누고 SKILL.md 에는 8단계 목차와 진행 규칙만 남긴다. 부록 A·B 는 `references/appendix.md` 로.

## fixtures/samples/domain/SKILL.md (sql-query)

| 신호 | 발현 | 근거 |
|------|:----:|------|
| 크기 | no | `wc -l` = 159 |
| 도메인 분기 | **yes** | 분기 헤딩 3개: "매출 요청이면", "재고 요청이면", "마케팅 요청이면" (기준 2) |
| 조건부 상세 | no | 조건부 헤딩 0개 |

분리 권고: 도메인 절 3개를 `references/{finance,inventory,marketing}.md` 로 옮기고 SKILL.md 에는 공통 규칙과 "~이면 → 파일" 라우팅 3줄만 남긴다 (`after/sql-query/` 참고).

## fixtures/samples/conditional/SKILL.md (db-migration)

| 신호 | 발현 | 근거 |
|------|:----:|------|
| 크기 | no | `wc -l` = 92 |
| 도메인 분기 | no | 분기 헤딩 0개 |
| 조건부 상세 | **yes** | 헤딩 "운영 스키마를 변경할 때만" 아래 본문 56줄 (전체의 61%). 그 조건이 아닌 호출에서는 전부 불필요 |

분리 권고: "운영 스키마를 변경할 때만" 절 전체를 `references/prod-schema-change.md` 로 옮기고 SKILL.md 에는 "운영 스키마를 변경할 때만 → `references/prod-schema-change.md` 참조" 한 줄을 남긴다.

## fixtures/samples/clean/SKILL.md (commit-message) — 대조군

| 신호 | 발현 | 근거 |
|------|:----:|------|
| 크기 | no | `wc -l` = 31 |
| 도메인 분기 | no | 분기 헤딩 0개 |
| 조건부 상세 | no | 조건부 헤딩 0개 |

분리 권고: 없음. 현재 크기와 구조를 유지한다.

## 채점 기준

- 발현 판정 12칸(4샘플 × 3신호)이 위 표와 모두 같아야 PASS. 한 칸이라도 다르면 정의의 검증 루프대로 REDO 1회.
- 근거에 수치(줄 수·헤딩 이름)가 없으면 "판정은 맞았으나 근거 없음" 으로 따로 기록한다.
- 대조군에서 신호가 하나라도 yes 면 오탐(false positive)이다.
