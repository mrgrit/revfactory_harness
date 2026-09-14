---
name: sql-query
description: "데이터베이스 쿼리 생성: 매출·재고·마케팅 도메인. 사용자가 'Q4 매출', '재고 현황', '캠페인 ROI' 등을 언급하면 호출. 단순 SELECT는 직접 작성하고, 도메인 템플릿이 필요할 때 이 스킬을 검토."
allowed-tools: Read, Write
---

# sql-query (메뉴판 — 라우터만)

분석용 SQL 을 만들 때 쓰는 스킬이다. 도메인 본문은 여기 없다. 공통 규칙을 지킨 뒤 요청 도메인의 references 파일 하나만 로드해 템플릿을 채운다.

## 공통 규칙

- 모든 쿼리는 읽기 전용이다. `INSERT`/`UPDATE`/`DELETE`/`DDL` 은 만들지 않는다.
- 날짜 범위는 반드시 파라미터(`:from`, `:to`)로 받는다. 상수 날짜를 박지 않는다.
- 결과 컬럼에는 단위를 별칭으로 붙인다. 예: `amount_krw`, `qty_ea`, `rate_pct`.
- 집계 쿼리는 `GROUP BY` 컬럼을 `SELECT` 에 그대로 노출한다.
- 1,000행 이상이 예상되면 `LIMIT` 과 정렬 기준을 함께 붙인다.
- 테이블 별칭은 두 글자 이하로 쓰지 않는다. `s`, `i` 대신 `sales`, `inv`.

## 라우팅

- 매출 관련 요청이면 → `references/finance.md`
- 재고 관련 요청이면 → `references/inventory.md`
- 마케팅 관련 요청이면 → `references/marketing.md`

단순 SELECT 는 references 없이 직접 작성한다. 도메인 템플릿이 필요할 때만 해당 파일을 로드한다.

## 출력 형식

- SQL 코드 블록 하나 + 두 줄 이내 설명, 그 아래에 파라미터 목록(`:from`, `:to` 등).
