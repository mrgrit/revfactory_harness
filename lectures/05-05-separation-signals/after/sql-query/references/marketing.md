# 마케팅 쿼리 템플릿 (레시피 — 마케팅 요청일 때만 로드)

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
