---
name: sql-query
description: "데이터베이스 쿼리 생성: 매출·재고·마케팅 도메인. 사용자가 'Q4 매출', '재고 현황', '캠페인 ROI' 등을 언급하면 호출. 단순 SELECT는 직접 작성하고, 도메인 템플릿이 필요할 때 이 스킬을 검토."
allowed-tools: Read, Write
---

# sql-query

분석용 SQL 을 만들 때 쓰는 스킬이다. 아래 공통 규칙을 지킨 뒤, 요청이 속한 도메인 절의 템플릿을 골라 채운다.

## 공통 규칙

- 모든 쿼리는 읽기 전용이다. `INSERT`/`UPDATE`/`DELETE`/`DDL` 은 만들지 않는다.
- 날짜 범위는 반드시 파라미터(`:from`, `:to`)로 받는다. 상수 날짜를 박지 않는다.
- 결과 컬럼에는 단위를 별칭으로 붙인다. 예: `amount_krw`, `qty_ea`, `rate_pct`.
- 집계 쿼리는 `GROUP BY` 컬럼을 `SELECT` 에 그대로 노출한다.
- 1,000행 이상이 예상되면 `LIMIT` 과 정렬 기준을 함께 붙인다.
- 테이블 별칭은 두 글자 이하로 쓰지 않는다. `s`, `i` 대신 `sales`, `inv`.

## 매출 요청이면

매출 요청은 `sales` 테이블과 `customers` 테이블을 쓴다. 금액 컬럼은 세전 `amount` 이며 부가세는 별도 컬럼 `vat` 이다. "매출" 이라고만 하면 세전 기준으로 답한다.

### 1. 일별 매출
```sql
SELECT sale_date, SUM(amount) AS daily_revenue_krw
FROM sales
WHERE sale_date BETWEEN :from AND :to
GROUP BY sale_date
ORDER BY sale_date;
```

### 2. 카테고리별 매출
```sql
SELECT category, SUM(amount) AS revenue_krw
FROM sales
WHERE sale_date BETWEEN :from AND :to
GROUP BY category
ORDER BY revenue_krw DESC;
```

### 3. 전년 동기 비교 (YoY)
```sql
SELECT EXTRACT(YEAR FROM sale_date) AS yr, SUM(amount) AS revenue_krw
FROM sales
WHERE sale_date BETWEEN :from AND :to
GROUP BY yr
ORDER BY yr;
```

### 4. 월별 누적 매출
```sql
SELECT DATE_TRUNC('month', sale_date) AS month,
       SUM(SUM(amount)) OVER (ORDER BY DATE_TRUNC('month', sale_date)) AS cumulative_krw
FROM sales
WHERE sale_date BETWEEN :from AND :to
GROUP BY month
ORDER BY month;
```

### 5. 상위 고객
```sql
SELECT customers.name, SUM(sales.amount) AS revenue_krw
FROM sales
JOIN customers ON customers.id = sales.customer_id
WHERE sales.sale_date BETWEEN :from AND :to
GROUP BY customers.name
ORDER BY revenue_krw DESC
LIMIT 20;
```

매출 요청에서 자주 틀리는 것: 환불(`refunds`)을 빼 달라는 말이 없으면 빼지 않는다. 뺄 때는 별도 컬럼 `net_revenue_krw` 로 표시한다.

## 재고 요청이면

재고 요청은 `inventory` 와 `inventory_stats` 테이블을 쓴다. `on_hand` 는 현재고, `safety_stock` 은 안전재고다. 수량 단위는 개(`ea`)이며 무게·부피로 환산하지 않는다.

### 1. 재고 현황
```sql
SELECT sku, on_hand AS on_hand_ea
FROM inventory
ORDER BY sku;
```

### 2. 부족 알림
```sql
SELECT sku, on_hand AS on_hand_ea, safety_stock AS safety_ea
FROM inventory
WHERE on_hand < safety_stock
ORDER BY on_hand - safety_stock;
```

### 3. 회전율
```sql
SELECT sku, shipped_qty * 1.0 / NULLIF(avg_stock, 0) AS turnover
FROM inventory_stats
WHERE period_start BETWEEN :from AND :to
ORDER BY turnover DESC;
```

### 4. 입고 예정
```sql
SELECT sku, eta_date, qty AS incoming_ea
FROM purchase_orders
WHERE status = 'open' AND eta_date BETWEEN :from AND :to
ORDER BY eta_date;
```

### 5. 창고별 재고
```sql
SELECT warehouse, sku, on_hand AS on_hand_ea
FROM inventory
ORDER BY warehouse, sku;
```

재고 요청에서 자주 틀리는 것: "부족" 은 `on_hand < safety_stock` 이지 `on_hand = 0` 이 아니다.

## 마케팅 요청이면

마케팅 요청은 `campaigns`, `spend`, `conversions` 테이블을 쓴다. ROI 는 `(수익 - 비용) / 비용` 이며 퍼센트로 표기한다.

### 1. 캠페인 ROI
```sql
SELECT campaigns.name,
       (SUM(conversions.revenue) - SUM(spend.cost)) * 100.0 / NULLIF(SUM(spend.cost), 0) AS roi_pct
FROM campaigns
JOIN spend ON spend.campaign_id = campaigns.id
JOIN conversions ON conversions.campaign_id = campaigns.id
WHERE campaigns.started_at BETWEEN :from AND :to
GROUP BY campaigns.name
ORDER BY roi_pct DESC;
```

### 2. 채널별 전환율
```sql
SELECT channel,
       COUNT(*) FILTER (WHERE converted) * 100.0 / COUNT(*) AS conversion_pct
FROM conversions
WHERE occurred_at BETWEEN :from AND :to
GROUP BY channel
ORDER BY conversion_pct DESC;
```

### 3. 주간 코호트 잔존
```sql
SELECT DATE_TRUNC('week', first_seen) AS cohort,
       COUNT(*) FILTER (WHERE last_seen >= first_seen + INTERVAL '4 weeks') * 100.0 / COUNT(*) AS retained_4w_pct
FROM users
WHERE first_seen BETWEEN :from AND :to
GROUP BY cohort
ORDER BY cohort;
```

마케팅 요청에서 자주 틀리는 것: 비용이 0인 캠페인의 ROI 는 무한대가 아니라 `NULL` 로 둔다.

## 출력 형식

- SQL 코드 블록 하나 + 두 줄 이내 설명.
- 파라미터 목록(`:from`, `:to` 등)을 코드 블록 아래에 적는다.
