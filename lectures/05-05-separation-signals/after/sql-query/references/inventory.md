# 재고 쿼리 템플릿 (레시피 — 재고 요청일 때만 로드)

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
