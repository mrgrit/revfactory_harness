# sample-app 보안 분석 보고서 (기준 보고서 — 정답지 기반, 강사 작성)

대상: `sample-app/app.py`, `sample-app/db.py` · 기준: OWASP Top 10 (2021) / CWE · 모드: 읽기 전용(코드 미수정)

## 요약

| 심각도 | 건수 |
|---|---|
| Critical | 1 |
| High | 4 |
| Medium | 1 |
| Low | 1 |

## 발견 사항

### [Critical] SQL Injection — 사용자 입력을 f-string 으로 쿼리에 결합
- 위치: `app.py:21-22` (login), `app.py:34-36` (register)
- OWASP A03:2021 Injection · CWE-89
- 설명: `request.args` 로 받은 `name`, `pw` 가 검증·바인딩 없이 SQL 문자열에 삽입된다.
  `?name=' OR '1'='1` 로 인증 우회, `'; DROP TABLE users; --` 류 파괴가 가능하다.
  (`app.py:54` 의 `get_user` 도 같은 패턴이나 라우트가 `<int:user_id>` 로 정수만 허용해 주입 가능성은 낮다. 아래 IDOR 항목 참고.)
- 권장 수정안: 파라미터 바인딩 사용 — `cur.execute("SELECT * FROM users WHERE name = ?", (name,))`.
  ORM 사용 시에도 raw SQL 문자열 결합 금지.

### [High] 하드코딩된 자격증명
- 위치: `app.py:10-12` (`SECRET_KEY`, `DB_PASSWORD`, `app.secret_key`)
- OWASP A05:2021 Security Misconfiguration / A07:2021 Identification and Authentication Failures · CWE-798
- 설명: 세션 서명 키와 DB 비밀번호가 소스에 평문으로 있다. 저장소 접근 = 세션 위조·DB 접근.
- 권장 수정안: 환경 변수 또는 비밀 관리자(Vault, AWS Secrets Manager)에서 로드 —
  `os.environ["SECRET_KEY"]`. 이미 커밋된 값은 유출로 간주하고 회전(rotate).

### [High] 약한 해시로 비밀번호 저장
- 위치: `app.py:32`
- OWASP A02:2021 Cryptographic Failures · CWE-328 (Weak Hash) / CWE-916 (Insufficient Computational Effort)
- 설명: MD5 는 충돌·고속 연산이 가능해 레인보우 테이블·GPU 브루트포스에 취약하며 솔트도 없다.
- 권장 수정안: `bcrypt` / `argon2-cffi` / `hashlib.scrypt` 등 느린 솔트 해시 사용 —
  `bcrypt.hashpw(pw.encode(), bcrypt.gensalt())`.

### [High] 반사형 XSS — 이스케이프 없는 HTML 렌더링
- 위치: `app.py:45-46`
- OWASP A03:2021 Injection · CWE-79
- 설명: `bio` 를 HTML 문자열에 직접 결합한 뒤 `render_template_string` 에 넘긴다.
  autoescape 는 템플릿 변수(`{{ }}`)에만 적용되므로 결합된 문자열은 그대로 출력된다.
  `?bio=<script>…</script>` 로 임의 스크립트 실행.
- 권장 수정안: 템플릿 변수로 전달 — `render_template_string("<p>{{ bio }}</p>", bio=bio)`,
  또는 `markupsafe.escape(bio)`. 파일 템플릿 + CSP 헤더 권장.

### [High] IDOR — 인가 검사 없는 사용자 정보 조회
- 위치: `app.py:49-55` (`/api/users/<int:user_id>`)
- OWASP A01:2021 Broken Access Control · CWE-639
- 설명: 로그인·본인 확인 없이 임의 `user_id` 로 다른 사용자 레코드(해시 포함)를 조회할 수 있다.
- 권장 수정안: 인증 필수화 후 `user_id == current_user.id` 또는 역할(admin) 검사.
  응답에서 `pw` 컬럼 제외.

### [Medium] 디버그 모드 · 전체 인터페이스 바인딩
- 위치: `app.py:60`
- OWASP A05:2021 Security Misconfiguration · CWE-489 (Active Debug Code)
- 설명: `debug=True` 는 예외 시 스택트레이스와 Werkzeug 디버거(코드 실행 콘솔)를 노출한다.
  `host="0.0.0.0"` 과 결합하면 네트워크 전체에 열린다.
- 권장 수정안: 운영에서는 `debug=False`, WSGI 서버(gunicorn) 뒤에서 실행, 바인딩은 리버스 프록시 뒤 로컬로 제한.

### [Low] 비밀번호를 인자로 전달하나 사용하지 않음
- 위치: `db.py:5-7`
- CWE-522 (Insufficiently Protected Credentials) 관련
- 설명: `get_connection(password)` 가 비밀번호를 받아 무시한다. 직접적 취약점은 아니지만
  평문 비밀번호가 호출 경계를 오가며 로그·트레이스에 남을 수 있다.
- 권장 수정안: 불필요한 인자 제거, 실제 인증이 필요하면 연결 문자열을 환경 변수에서 구성.

## 수정 여부
코드는 수정하지 않았다(읽기 전용). 위 권장안은 설명으로만 제공한다.
