---
name: release-runbook
description: "서비스 릴리스 전 과정(사전 점검·빌드·스테이징·카나리·전체 배포·검증·문서화·정리)을 순서대로 안내. 사용자가 '릴리스', '배포', '태그 따기' 를 언급하면 호출."
allowed-tools: Bash, Read, Write
---

# release-runbook

릴리스는 8단계 64절차로 진행한다. 각 절차는 명령, 확인 기준, 실패 대응으로 구성된다. 절차를 건너뛰지 않는다.

## 진행 규칙

- 각 절차의 확인 기준을 통과한 뒤 다음 절차로 넘어간다.
- 실패 대응에 적힌 조치를 취한 뒤에도 실패하면 릴리스 담당자에게 알리고 멈춘다.
- 모든 명령 출력은 `release/logs/<version>/` 아래에 저장한다.
- 릴리스 채널에는 단계가 끝날 때마다 한 줄 보고를 남긴다.

## 1단계 · 사전 점검

### 1.1 브랜치 상태 확인

브랜치 상태 확인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 4분이다.

```bash
make release/pre-01
make release/pre-01-verify | tee release/logs/$VERSION/release/pre-01.log
```

- 확인 기준: `release/pre-01-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/pre-01-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/pre-01.log` 와 소요 시간을 체크리스트에 적는다.

### 1.2 CI 결과 확인

CI 결과 확인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 5분이다.

```bash
make release/pre-02
make release/pre-02-verify | tee release/logs/$VERSION/release/pre-02.log
```

- 확인 기준: `release/pre-02-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/pre-02-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/pre-02.log` 와 소요 시간을 체크리스트에 적는다.

### 1.3 의존성 취약점 스캔

의존성 취약점 스캔 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 6분이다.

```bash
make release/pre-03
make release/pre-03-verify | tee release/logs/$VERSION/release/pre-03.log
```

- 확인 기준: `release/pre-03-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/pre-03-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/pre-03.log` 와 소요 시간을 체크리스트에 적는다.

### 1.4 변경 로그 초안

변경 로그 초안 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 7분이다.

```bash
make release/pre-04
make release/pre-04-verify | tee release/logs/$VERSION/release/pre-04.log
```

- 확인 기준: `release/pre-04-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/pre-04-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/pre-04.log` 와 소요 시간을 체크리스트에 적는다.

### 1.5 릴리스 노트 리뷰 요청

릴리스 노트 리뷰 요청 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 8분이다.

```bash
make release/pre-05
make release/pre-05-verify | tee release/logs/$VERSION/release/pre-05.log
```

- 확인 기준: `release/pre-05-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/pre-05-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/pre-05.log` 와 소요 시간을 체크리스트에 적는다.

### 1.6 버전 번호 결정

버전 번호 결정 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 9분이다.

```bash
make release/pre-06
make release/pre-06-verify | tee release/logs/$VERSION/release/pre-06.log
```

- 확인 기준: `release/pre-06-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/pre-06-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/pre-06.log` 와 소요 시간을 체크리스트에 적는다.

### 1.7 태그 이름 예약

태그 이름 예약 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 3분이다.

```bash
make release/pre-07
make release/pre-07-verify | tee release/logs/$VERSION/release/pre-07.log
```

- 확인 기준: `release/pre-07-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/pre-07-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/pre-07.log` 와 소요 시간을 체크리스트에 적는다.

### 1.8 릴리스 채널 공지

릴리스 채널 공지 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 4분이다.

```bash
make release/pre-08
make release/pre-08-verify | tee release/logs/$VERSION/release/pre-08.log
```

- 확인 기준: `release/pre-08-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/pre-08-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/pre-08.log` 와 소요 시간을 체크리스트에 적는다.

## 2단계 · 빌드

### 2.1 클린 빌드

클린 빌드 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 5분이다.

```bash
make release/build-01
make release/build-01-verify | tee release/logs/$VERSION/release/build-01.log
```

- 확인 기준: `release/build-01-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/build-01-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/build-01.log` 와 소요 시간을 체크리스트에 적는다.

### 2.2 아티팩트 서명

아티팩트 서명 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 6분이다.

```bash
make release/build-02
make release/build-02-verify | tee release/logs/$VERSION/release/build-02.log
```

- 확인 기준: `release/build-02-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/build-02-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/build-02.log` 와 소요 시간을 체크리스트에 적는다.

### 2.3 체크섬 생성

체크섬 생성 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 7분이다.

```bash
make release/build-03
make release/build-03-verify | tee release/logs/$VERSION/release/build-03.log
```

- 확인 기준: `release/build-03-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/build-03-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/build-03.log` 와 소요 시간을 체크리스트에 적는다.

### 2.4 아티팩트 업로드

아티팩트 업로드 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 8분이다.

```bash
make release/build-04
make release/build-04-verify | tee release/logs/$VERSION/release/build-04.log
```

- 확인 기준: `release/build-04-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/build-04-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/build-04.log` 와 소요 시간을 체크리스트에 적는다.

### 2.5 빌드 메타데이터 기록

빌드 메타데이터 기록 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 9분이다.

```bash
make release/build-05
make release/build-05-verify | tee release/logs/$VERSION/release/build-05.log
```

- 확인 기준: `release/build-05-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/build-05-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/build-05.log` 와 소요 시간을 체크리스트에 적는다.

### 2.6 재현 빌드 검증

재현 빌드 검증 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 3분이다.

```bash
make release/build-06
make release/build-06-verify | tee release/logs/$VERSION/release/build-06.log
```

- 확인 기준: `release/build-06-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/build-06-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/build-06.log` 와 소요 시간을 체크리스트에 적는다.

### 2.7 라이선스 목록 갱신

라이선스 목록 갱신 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 4분이다.

```bash
make release/build-07
make release/build-07-verify | tee release/logs/$VERSION/release/build-07.log
```

- 확인 기준: `release/build-07-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/build-07-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/build-07.log` 와 소요 시간을 체크리스트에 적는다.

### 2.8 빌드 로그 보관

빌드 로그 보관 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 5분이다.

```bash
make release/build-08
make release/build-08-verify | tee release/logs/$VERSION/release/build-08.log
```

- 확인 기준: `release/build-08-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/build-08-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/build-08.log` 와 소요 시간을 체크리스트에 적는다.

## 3단계 · 스테이징 배포

### 3.1 스테이징 배포

스테이징 배포 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 6분이다.

```bash
make release/staging-01
make release/staging-01-verify | tee release/logs/$VERSION/release/staging-01.log
```

- 확인 기준: `release/staging-01-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/staging-01-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/staging-01.log` 와 소요 시간을 체크리스트에 적는다.

### 3.2 스모크 테스트

스모크 테스트 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 7분이다.

```bash
make release/staging-02
make release/staging-02-verify | tee release/logs/$VERSION/release/staging-02.log
```

- 확인 기준: `release/staging-02-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/staging-02-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/staging-02.log` 와 소요 시간을 체크리스트에 적는다.

### 3.3 회귀 테스트

회귀 테스트 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 8분이다.

```bash
make release/staging-03
make release/staging-03-verify | tee release/logs/$VERSION/release/staging-03.log
```

- 확인 기준: `release/staging-03-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/staging-03-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/staging-03.log` 와 소요 시간을 체크리스트에 적는다.

### 3.4 성능 기준선 비교

성능 기준선 비교 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 9분이다.

```bash
make release/staging-04
make release/staging-04-verify | tee release/logs/$VERSION/release/staging-04.log
```

- 확인 기준: `release/staging-04-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/staging-04-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/staging-04.log` 와 소요 시간을 체크리스트에 적는다.

### 3.5 로그 오류율 확인

로그 오류율 확인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 3분이다.

```bash
make release/staging-05
make release/staging-05-verify | tee release/logs/$VERSION/release/staging-05.log
```

- 확인 기준: `release/staging-05-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/staging-05-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/staging-05.log` 와 소요 시간을 체크리스트에 적는다.

### 3.6 마이그레이션 드라이런

마이그레이션 드라이런 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 4분이다.

```bash
make release/staging-06
make release/staging-06-verify | tee release/logs/$VERSION/release/staging-06.log
```

- 확인 기준: `release/staging-06-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/staging-06-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/staging-06.log` 와 소요 시간을 체크리스트에 적는다.

### 3.7 롤백 리허설

롤백 리허설 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 5분이다.

```bash
make release/staging-07
make release/staging-07-verify | tee release/logs/$VERSION/release/staging-07.log
```

- 확인 기준: `release/staging-07-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/staging-07-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/staging-07.log` 와 소요 시간을 체크리스트에 적는다.

### 3.8 스테이징 승인

스테이징 승인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 6분이다.

```bash
make release/staging-08
make release/staging-08-verify | tee release/logs/$VERSION/release/staging-08.log
```

- 확인 기준: `release/staging-08-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/staging-08-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/staging-08.log` 와 소요 시간을 체크리스트에 적는다.

## 4단계 · 카나리

### 4.1 카나리 1% 배포

카나리 1% 배포 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 7분이다.

```bash
make release/canary-01
make release/canary-01-verify | tee release/logs/$VERSION/release/canary-01.log
```

- 확인 기준: `release/canary-01-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/canary-01-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/canary-01.log` 와 소요 시간을 체크리스트에 적는다.

### 4.2 오류율 관찰

오류율 관찰 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 8분이다.

```bash
make release/canary-02
make release/canary-02-verify | tee release/logs/$VERSION/release/canary-02.log
```

- 확인 기준: `release/canary-02-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/canary-02-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/canary-02.log` 와 소요 시간을 체크리스트에 적는다.

### 4.3 지연 시간 관찰

지연 시간 관찰 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 9분이다.

```bash
make release/canary-03
make release/canary-03-verify | tee release/logs/$VERSION/release/canary-03.log
```

- 확인 기준: `release/canary-03-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/canary-03-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/canary-03.log` 와 소요 시간을 체크리스트에 적는다.

### 4.4 카나리 10% 확대

카나리 10% 확대 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 3분이다.

```bash
make release/canary-04
make release/canary-04-verify | tee release/logs/$VERSION/release/canary-04.log
```

- 확인 기준: `release/canary-04-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/canary-04-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/canary-04.log` 와 소요 시간을 체크리스트에 적는다.

### 4.5 알림 규칙 확인

알림 규칙 확인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 4분이다.

```bash
make release/canary-05
make release/canary-05-verify | tee release/logs/$VERSION/release/canary-05.log
```

- 확인 기준: `release/canary-05-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/canary-05-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/canary-05.log` 와 소요 시간을 체크리스트에 적는다.

### 4.6 고객 문의 채널 모니터링

고객 문의 채널 모니터링 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 5분이다.

```bash
make release/canary-06
make release/canary-06-verify | tee release/logs/$VERSION/release/canary-06.log
```

- 확인 기준: `release/canary-06-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/canary-06-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/canary-06.log` 와 소요 시간을 체크리스트에 적는다.

### 4.7 카나리 50% 확대

카나리 50% 확대 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 6분이다.

```bash
make release/canary-07
make release/canary-07-verify | tee release/logs/$VERSION/release/canary-07.log
```

- 확인 기준: `release/canary-07-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/canary-07-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/canary-07.log` 와 소요 시간을 체크리스트에 적는다.

### 4.8 카나리 승인

카나리 승인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 7분이다.

```bash
make release/canary-08
make release/canary-08-verify | tee release/logs/$VERSION/release/canary-08.log
```

- 확인 기준: `release/canary-08-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/canary-08-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/canary-08.log` 와 소요 시간을 체크리스트에 적는다.

## 5단계 · 전체 배포

### 5.1 전체 배포 시작

전체 배포 시작 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 8분이다.

```bash
make release/prod-01
make release/prod-01-verify | tee release/logs/$VERSION/release/prod-01.log
```

- 확인 기준: `release/prod-01-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/prod-01-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/prod-01.log` 와 소요 시간을 체크리스트에 적는다.

### 5.2 배포 진행률 확인

배포 진행률 확인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 9분이다.

```bash
make release/prod-02
make release/prod-02-verify | tee release/logs/$VERSION/release/prod-02.log
```

- 확인 기준: `release/prod-02-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/prod-02-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/prod-02.log` 와 소요 시간을 체크리스트에 적는다.

### 5.3 헬스 체크

헬스 체크 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 3분이다.

```bash
make release/prod-03
make release/prod-03-verify | tee release/logs/$VERSION/release/prod-03.log
```

- 확인 기준: `release/prod-03-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/prod-03-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/prod-03.log` 와 소요 시간을 체크리스트에 적는다.

### 5.4 캐시 무효화

캐시 무효화 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 4분이다.

```bash
make release/prod-04
make release/prod-04-verify | tee release/logs/$VERSION/release/prod-04.log
```

- 확인 기준: `release/prod-04-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/prod-04-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/prod-04.log` 와 소요 시간을 체크리스트에 적는다.

### 5.5 CDN 전파 확인

CDN 전파 확인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 5분이다.

```bash
make release/prod-05
make release/prod-05-verify | tee release/logs/$VERSION/release/prod-05.log
```

- 확인 기준: `release/prod-05-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/prod-05-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/prod-05.log` 와 소요 시간을 체크리스트에 적는다.

### 5.6 배포 완료 공지

배포 완료 공지 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 6분이다.

```bash
make release/prod-06
make release/prod-06-verify | tee release/logs/$VERSION/release/prod-06.log
```

- 확인 기준: `release/prod-06-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/prod-06-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/prod-06.log` 와 소요 시간을 체크리스트에 적는다.

### 5.7 대시보드 스냅샷

대시보드 스냅샷 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 7분이다.

```bash
make release/prod-07
make release/prod-07-verify | tee release/logs/$VERSION/release/prod-07.log
```

- 확인 기준: `release/prod-07-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/prod-07-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/prod-07.log` 와 소요 시간을 체크리스트에 적는다.

### 5.8 배포 기록 저장

배포 기록 저장 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 8분이다.

```bash
make release/prod-08
make release/prod-08-verify | tee release/logs/$VERSION/release/prod-08.log
```

- 확인 기준: `release/prod-08-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/prod-08-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/prod-08.log` 와 소요 시간을 체크리스트에 적는다.

## 6단계 · 배포 후 검증

### 6.1 핵심 시나리오 수동 확인

핵심 시나리오 수동 확인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 9분이다.

```bash
make release/verify-01
make release/verify-01-verify | tee release/logs/$VERSION/release/verify-01.log
```

- 확인 기준: `release/verify-01-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/verify-01-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/verify-01.log` 와 소요 시간을 체크리스트에 적는다.

### 6.2 결제 흐름 확인

결제 흐름 확인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 3분이다.

```bash
make release/verify-02
make release/verify-02-verify | tee release/logs/$VERSION/release/verify-02.log
```

- 확인 기준: `release/verify-02-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/verify-02-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/verify-02.log` 와 소요 시간을 체크리스트에 적는다.

### 6.3 로그인 흐름 확인

로그인 흐름 확인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 4분이다.

```bash
make release/verify-03
make release/verify-03-verify | tee release/logs/$VERSION/release/verify-03.log
```

- 확인 기준: `release/verify-03-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/verify-03-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/verify-03.log` 와 소요 시간을 체크리스트에 적는다.

### 6.4 알림 발송 확인

알림 발송 확인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 5분이다.

```bash
make release/verify-04
make release/verify-04-verify | tee release/logs/$VERSION/release/verify-04.log
```

- 확인 기준: `release/verify-04-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/verify-04-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/verify-04.log` 와 소요 시간을 체크리스트에 적는다.

### 6.5 백그라운드 작업 확인

백그라운드 작업 확인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 6분이다.

```bash
make release/verify-05
make release/verify-05-verify | tee release/logs/$VERSION/release/verify-05.log
```

- 확인 기준: `release/verify-05-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/verify-05-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/verify-05.log` 와 소요 시간을 체크리스트에 적는다.

### 6.6 에러 트래커 확인

에러 트래커 확인 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 7분이다.

```bash
make release/verify-06
make release/verify-06-verify | tee release/logs/$VERSION/release/verify-06.log
```

- 확인 기준: `release/verify-06-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/verify-06-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/verify-06.log` 와 소요 시간을 체크리스트에 적는다.

### 6.7 지원팀 브리핑

지원팀 브리핑 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 8분이다.

```bash
make release/verify-07
make release/verify-07-verify | tee release/logs/$VERSION/release/verify-07.log
```

- 확인 기준: `release/verify-07-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/verify-07-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/verify-07.log` 와 소요 시간을 체크리스트에 적는다.

### 6.8 검증 완료 기록

검증 완료 기록 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 9분이다.

```bash
make release/verify-08
make release/verify-08-verify | tee release/logs/$VERSION/release/verify-08.log
```

- 확인 기준: `release/verify-08-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/verify-08-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/verify-08.log` 와 소요 시간을 체크리스트에 적는다.

## 7단계 · 문서화

### 7.1 릴리스 노트 게시

릴리스 노트 게시 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 3분이다.

```bash
make release/docs-01
make release/docs-01-verify | tee release/logs/$VERSION/release/docs-01.log
```

- 확인 기준: `release/docs-01-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/docs-01-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/docs-01.log` 와 소요 시간을 체크리스트에 적는다.

### 7.2 API 문서 갱신

API 문서 갱신 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 4분이다.

```bash
make release/docs-02
make release/docs-02-verify | tee release/logs/$VERSION/release/docs-02.log
```

- 확인 기준: `release/docs-02-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/docs-02-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/docs-02.log` 와 소요 시간을 체크리스트에 적는다.

### 7.3 변경 로그 병합

변경 로그 병합 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 5분이다.

```bash
make release/docs-03
make release/docs-03-verify | tee release/logs/$VERSION/release/docs-03.log
```

- 확인 기준: `release/docs-03-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/docs-03-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/docs-03.log` 와 소요 시간을 체크리스트에 적는다.

### 7.4 마이그레이션 가이드 게시

마이그레이션 가이드 게시 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 6분이다.

```bash
make release/docs-04
make release/docs-04-verify | tee release/logs/$VERSION/release/docs-04.log
```

- 확인 기준: `release/docs-04-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/docs-04-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/docs-04.log` 와 소요 시간을 체크리스트에 적는다.

### 7.5 지원 문서 갱신

지원 문서 갱신 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 7분이다.

```bash
make release/docs-05
make release/docs-05-verify | tee release/logs/$VERSION/release/docs-05.log
```

- 확인 기준: `release/docs-05-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/docs-05-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/docs-05.log` 와 소요 시간을 체크리스트에 적는다.

### 7.6 내부 위키 갱신

내부 위키 갱신 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 8분이다.

```bash
make release/docs-06
make release/docs-06-verify | tee release/logs/$VERSION/release/docs-06.log
```

- 확인 기준: `release/docs-06-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/docs-06-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/docs-06.log` 와 소요 시간을 체크리스트에 적는다.

### 7.7 데모 영상 갱신

데모 영상 갱신 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 9분이다.

```bash
make release/docs-07
make release/docs-07-verify | tee release/logs/$VERSION/release/docs-07.log
```

- 확인 기준: `release/docs-07-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/docs-07-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/docs-07.log` 와 소요 시간을 체크리스트에 적는다.

### 7.8 문서 링크 점검

문서 링크 점검 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 3분이다.

```bash
make release/docs-08
make release/docs-08-verify | tee release/logs/$VERSION/release/docs-08.log
```

- 확인 기준: `release/docs-08-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/docs-08-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/docs-08.log` 와 소요 시간을 체크리스트에 적는다.

## 8단계 · 정리

### 8.1 임시 브랜치 삭제

임시 브랜치 삭제 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 4분이다.

```bash
make release/cleanup-01
make release/cleanup-01-verify | tee release/logs/$VERSION/release/cleanup-01.log
```

- 확인 기준: `release/cleanup-01-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/cleanup-01-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/cleanup-01.log` 와 소요 시간을 체크리스트에 적는다.

### 8.2 기능 플래그 정리

기능 플래그 정리 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 5분이다.

```bash
make release/cleanup-02
make release/cleanup-02-verify | tee release/logs/$VERSION/release/cleanup-02.log
```

- 확인 기준: `release/cleanup-02-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/cleanup-02-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/cleanup-02.log` 와 소요 시간을 체크리스트에 적는다.

### 8.3 오래된 아티팩트 삭제

오래된 아티팩트 삭제 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 6분이다.

```bash
make release/cleanup-03
make release/cleanup-03-verify | tee release/logs/$VERSION/release/cleanup-03.log
```

- 확인 기준: `release/cleanup-03-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/cleanup-03-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/cleanup-03.log` 와 소요 시간을 체크리스트에 적는다.

### 8.4 스테이징 데이터 초기화

스테이징 데이터 초기화 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 7분이다.

```bash
make release/cleanup-04
make release/cleanup-04-verify | tee release/logs/$VERSION/release/cleanup-04.log
```

- 확인 기준: `release/cleanup-04-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/cleanup-04-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/cleanup-04.log` 와 소요 시간을 체크리스트에 적는다.

### 8.5 모니터링 임시 규칙 제거

모니터링 임시 규칙 제거 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 8분이다.

```bash
make release/cleanup-05
make release/cleanup-05-verify | tee release/logs/$VERSION/release/cleanup-05.log
```

- 확인 기준: `release/cleanup-05-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/cleanup-05-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/cleanup-05.log` 와 소요 시간을 체크리스트에 적는다.

### 8.6 이슈 마일스톤 닫기

이슈 마일스톤 닫기 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 9분이다.

```bash
make release/cleanup-06
make release/cleanup-06-verify | tee release/logs/$VERSION/release/cleanup-06.log
```

- 확인 기준: `release/cleanup-06-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/cleanup-06-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/cleanup-06.log` 와 소요 시간을 체크리스트에 적는다.

### 8.7 회고 일정 잡기

회고 일정 잡기 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 3분이다.

```bash
make release/cleanup-07
make release/cleanup-07-verify | tee release/logs/$VERSION/release/cleanup-07.log
```

- 확인 기준: `release/cleanup-07-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/cleanup-07-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/cleanup-07.log` 와 소요 시간을 체크리스트에 적는다.

### 8.8 다음 버전 준비

다음 버전 준비 절차다. 담당자는 릴리스 매니저이며 소요 시간은 약 4분이다.

```bash
make release/cleanup-08
make release/cleanup-08-verify | tee release/logs/$VERSION/release/cleanup-08.log
```

- 확인 기준: `release/cleanup-08-verify` 가 `OK` 를 출력하고 종료 코드가 0 이다.
- 실패 대응: 로그의 마지막 20줄을 릴리스 채널에 붙이고 `make release/cleanup-08-retry` 를 한 번만 재시도한다.
- 기록: `release/logs/$VERSION/release/cleanup-08.log` 와 소요 시간을 체크리스트에 적는다.

## 부록 A · 종료 코드

| 코드 | 의미 | 조치 |
|---|---|---|
| 0 | 성공 | 다음 절차로 |
| 1 | 확인 기준 미달 | 실패 대응 수행 후 재시도, 두 번째 실패는 중단 |
| 2 | 네트워크 오류 | 실패 대응 수행 후 재시도, 두 번째 실패는 중단 |
| 3 | 인증 만료 | 실패 대응 수행 후 재시도, 두 번째 실패는 중단 |
| 4 | 아티팩트 없음 | 실패 대응 수행 후 재시도, 두 번째 실패는 중단 |
| 5 | 체크섬 불일치 | 실패 대응 수행 후 재시도, 두 번째 실패는 중단 |
| 6 | 헬스 체크 실패 | 실패 대응 수행 후 재시도, 두 번째 실패는 중단 |
| 7 | 타임아웃 | 실패 대응 수행 후 재시도, 두 번째 실패는 중단 |
| 8 | 권한 부족 | 실패 대응 수행 후 재시도, 두 번째 실패는 중단 |
| 9 | 설정 누락 | 실패 대응 수행 후 재시도, 두 번째 실패는 중단 |
| 10 | 의존 서비스 다운 | 실패 대응 수행 후 재시도, 두 번째 실패는 중단 |
| 11 | 디스크 부족 | 실패 대응 수행 후 재시도, 두 번째 실패는 중단 |

## 부록 B · 릴리스 채널 보고 양식

```
[릴리스 v$VERSION] <단계 이름> 완료
- 소요: <분>
- 특이사항: <없음 | 내용>
- 다음 단계: <이름>
```
