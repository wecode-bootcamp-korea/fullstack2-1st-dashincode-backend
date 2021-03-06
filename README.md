# 다신샵 프로젝트 소개

<br/>
<br/>

## 다신코? 다 함께 신나게 코딩~ 의 줄임말 다신코 😸

<br/>

다이어트 사이트인 다신샵을 클론 코딩한 프로젝트입니다.

---

# 팀원 소개 🧑‍🤝‍🧑

> - 고원구 : Login / Sign Up API 구현
> - 안다빈 : List API 구현
> - 김재원 : comment API 구현
> - 김지현 : Cart API 구현
> - 신정호 : Product API 구현

<br/>

# 프로젝트 기간

📆 2021.10.04 ~ 2021.10.15 (12일)

---

<br/>

# 사용한 SKill 🛠️

- FRONTEND: React, React-Router, J.S, SASS, HTML

- BACKEND: Node.js, Express, Prisma, MySQL, PostMan, bcrypt, JWT(JSON WEB TOKEN)

<br/>

# DASINCO Frontend Repo

- https://github.com/wecode-bootcamp-korea/fullstack2-1st-dashincode-frontend

<br/>

# Modeling

<img width="976" alt="스크린샷 2021-10-17 오후 10 48 58" src="https://user-images.githubusercontent.com/88175861/137630165-3f0bde34-58f5-443d-9497-93fe3f1c7f4b.png">

- https://dbdiagram.io/d/61409491825b5b0146018bca

<br/>

# BackEnd 구현 기능 💻

<br/>

1.  ## 공통 구현 사항

    - layered pattern으로 코드 의 기능, 역할별 route,controller,service,model(Dao) 나눠서 코드 설계

    - util( Async Wrapper, Error Status, Error Message)

      - 비동기 오류처리를 위한 wrapper함수
      - error 상태, error 메세지 부여하는 함수

    - 토큰 인가 미들웨어

      - 토큰을 가진 유저만 장바구니에 물건을 담고 좋아요 등 API 실행전 토큰을 식변하는 토큰 인가 미들웨어 필요

    - Post Man을 이용한 API 유닛 테스트

    <br/>

2.  ## User API

    <br/>

    - 로그인 API

      - JWT을 활용해 유저 로그인시 토큰 발행
      - 회원가입한 유저와 같은 정보면 로그인 완료 아니면 에러메세지 출력
      - 이메일, 비밀번호가 빈칸일 경우 유효하지 않다는 메세지 출력

    - 회원가입 API
      - 회원가입에 필수인 이메일, 닉네임, 비밀번호, 비밀번호확인란에 입력
      - 위에 중 하나라도 비어있을 경우 유효하지 않다는 메세지 출력
      - 이미 가입한 유저 정보로 가입 시도시 오류메세지 출력

    <br/>

3.  ## List API

    <br/>

    - 검색된 상품 리스트 api

      - 검색창에 입력된 단어가 포함된 상품 리스트 정보 조회 가능 및 쿼리 스트링을 사용해 필터링 구현
      - Query Parameters(value) - 검색창에 입력된 string이 한글이면 encodeURI()로 인코딩해 정보 전달

    - 필터링된 상품 리스트 API

      - 메인페이지와 navbar의 카테고리를 제외한 나머지 리스트의 정보 전달

    - navbar 카테고리별 상품 리스트 API

    <br/>

4.  ## Product API

    <br/>

    - navbar 카테고리별 상품 리스트 API

      - navbar 카테고리별 상품 리스트 API

    - 메인페이지 최신 등록 상품 카운트다운 API

      - 가장 최근에 등록된 상품의 정보 조회 가능
      - 상품이 등록된 날에서 10일 후인 expire_date의 정보를 담고 있음

    - 상품 상세정보 API

      - 특정 상품의 id에 따른 상세 정보 조회가 가능

    - 상품 리뷰 조회 API

      - 특정 상품의 id에 따른 리뷰 조회가 가능

    <br/>

5.  ## Like API

    <br/>

    - 상품별 좋아요 조회 API

      - 특정 상품의 id에 따른 좋아요 조회가 가능
      - 로그인한 상태에서만 좋아요 기능 가능

    - 상품별 좋아요 추가/삭제 API

      - 특정 상품의 id에 따른 좋아요 추가/삭제가 가능
      - 로그인한 상태에서만 좋아요 추가/삭제 가능

    <br/>

6.  ## Cart API

    <br/>

    - 장바구니 추가 API

      - 로그인한 상태에서만 장바구니에 추가 가능
      - 상품의 id와 수량을 request의 BODY에 담아 보내야 함

    - 장바구니 조회 API

      - 로그인한 상태에서만 장바구니에 조회 가능

    - 장바구니 수정 API

      - 로그인한 상태에서만 장바구니에 수정 가능
      - 상품의 id와 수량을 request의 BODY에 담아 보내야 함

    - 장바구니 삭제 API

      - 로그인한 상태에서만 장바구니에 삭제 가능

    - 장바구니에 담긴 품목 개수 조회 API

      - 장바구니에 담긴 품목 개수 조회 API( 로그인 상태에서만 조회 가능)

<br/>

# API Documentation 📃

- https://documenter.getpostman.com/view/17536472/UV5WCck2
