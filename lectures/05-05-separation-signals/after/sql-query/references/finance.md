# 매출 쿼리 템플릿 (레시피 — 매출 요청일 때만 로드)

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
