#!/usr/bin/env bash
# 스킬 분리 3신호 기계 측정.  SKILL.md 경로를 인자로 준다 (여러 개 가능).
#   bash signals.sh fixtures/samples/*/SKILL.md
# 측정 기준 (skill-size-auditor 의 진단 룰을 grep/awk 로 고정한 것):
#   크기        : wc -l >= 500
#   도메인 분기  : "~이면" / "~인 경우" 로 끝나는 헤딩(#, ##, ###) >= 2
#   조건부 상세  : "때만" / "경우에만" / "에 한해" 가 들어간 헤딩 >= 1 이고,
#                 그 헤딩 아래 본문(같은 깊이 이상의 다음 헤딩 전까지, 하위 헤딩 포함) >= 20줄
SIZE_MIN=500; DOMAIN_MIN=2; COND_BODY_MIN=20
[ $# -gt 0 ] || { echo "usage: bash signals.sh <SKILL.md> [...]"; exit 2; }
for f in "$@"; do
  [ -f "$f" ] || { echo "$f: 파일 없음"; continue; }
  lines=$(wc -l < "$f")
  domain_heads=$(grep -E '^#+ .*(이면|인 경우)[[:space:]]*$' "$f" | sed -E 's/^#+ //' | paste -sd'|' -)
  domain=$(grep -cE '^#+ .*(이면|인 경우)[[:space:]]*$' "$f")
  # 조건부 마커 헤딩의 본문 길이(가장 긴 것)와 그 헤딩 이름
  cond=$(awk '
    function close_blk() { if (inblk) { if (len > best) { best = len; bestname = name } inblk = 0 } }
    /^#+ / {
      match($0, /^#+/); d = RLENGTH
      if (inblk && d <= depth) close_blk()
      if ($0 ~ /때만|경우에만|에 한해/) { close_blk(); inblk = 1; depth = d; len = 0; n++; name = $0; sub(/^#+ /, "", name); next }
    }
    inblk { len++ }
    END { close_blk(); printf "%d\t%d\t%s", n + 0, best + 0, bestname }' "$f")
  IFS=$'\t' read -r cond_n cond_len cond_name <<< "$cond"
  s1=no; s2=no; s3=no; sig=""
  [ "$lines" -ge $SIZE_MIN ] && { s1=YES; sig="$sig 크기"; }
  [ "$domain" -ge $DOMAIN_MIN ] && { s2=YES; sig="$sig 도메인분기"; }
  [ "$cond_n" -ge 1 ] && [ "$cond_len" -ge $COND_BODY_MIN ] && { s3=YES; sig="$sig 조건부상세"; }
  [ -n "$sig" ] || sig=" (없음)"
  echo "$f"
  printf '  크기        %-3s  %d줄 (기준 %d)\n' "$s1" "$lines" "$SIZE_MIN"
  printf '  도메인 분기  %-3s  분기 헤딩 %d개 (기준 %d)%s\n' "$s2" "$domain" "$DOMAIN_MIN" "${domain_heads:+ — $domain_heads}"
  printf '  조건부 상세  %-3s  마커 헤딩 %d개, 최장 본문 %d줄 (기준 %d)%s\n' "$s3" "$cond_n" "$cond_len" "$COND_BODY_MIN" "${cond_name:+ — $cond_name}"
  echo "  발현:$sig"
done
