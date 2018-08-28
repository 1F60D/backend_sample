# 1F60D Back-end Sample 

##1. 백엔드 개발 환경 
  - Node.js v8.8.1(LTS) 
  - Express.js Web Framework 4.x 
  - MariaDB(MySQL) v10.1.20 
  
##2. 폴더 및 파일 설명 
  / - Root 폴더 
  /logs - 배포모드 시 서버 기록(로그)이 저장 
  /public - 파일 업로드시 저장소
  /src - App 메인 폴더 
  /src/config - 서버 및 데이터베이스 환경 설정 
      /config/index.js - 실행모드에 따라 환경(서버)정보를 리턴함 
      /config/development.js - 개발모드시 환경(서버)정보 
      /config/production.js - 배포모드시 환경(서버)정보
      
      /modules - 커스텀 모듈 전용 폴더 
      /modules/database - 데이터베이스 모듈 
      /modules/database/mysql - MariaDB(MySQL) 관련 모듈 
      /modules/database/mysql/index.js - MySQL 모듈 사용시 import 하는 항목 
      /modules/database/mysql/mysql.js - MySQL 모듈(일반쿼리실행, 트랜잭션 쿼리 실행) 
      
      /queries - RDBMS Query 저장소 
      /queries/mysql - MariaDB(MySQL) 쿼리를 모아두는 폴더 
      /queries/mysql/test - test Table에 대한 쿼리가 저장됨 
      /queries/mysql/index.js - 모듈 export 전용  
      
      /routes - Express 라우팅 설정
      /routes/db - MariaDB CRUD 관련 API 라우팅 
      /routes/file - 파일 전송 관련 API 라우팅
      /routes/home - 기본 페이지(서비스 실행시 실서비스로 Redirect 될 예정) 
      /routes/index.js - 라우팅 종합
      
      /app.js - APP 메인 실행 파일 
      
 ##3. 실행 방법 
 
    git clone https://github.com/1F60D/backend_sample.git
    cd backend_sample 
    npm install (or) yarn 실행(dependencies 설치) 
    
    1. 개발환경 실행시 스크립트 
    npm run dev (or) yarn dev (Linux / iOS 실행시) 
    npm run dev:win (or) yarn dev:win (Windows 실행시) 
    
    2. 배포환경 실행시 스크립트 
    npm run start (or) yarn start (Linux / iOS 실행시) 
    npm run start:win (or) yarn start:win (Windows 실행시) 
    

##4. Sample API URI 
  API 테스트 도구는 Postman을 사용하였습니다 : https://www.getpostman.com/apps 
  
  - DB(데이터베이스 정보는 /src/config/development.js, /src/config/production.js 항목의 databases > mysql 항목의 정보를 수정 후 
    실행해 주십시오. 
    
  - 샘플 스키마는 다음과 같습니다. 
    
    CREATE TABLE test (
      seq INT NOT NULL AUTO_INCREMENT, 
      content VARCHAR(100) NULL, 

        PRIMARY KEY(seq) 
    )ENGINE=InnoDB DEFAULT CHARSET=UTF8; 
    
   
  - DB URI List 
    post : http://localhost:3000/api/v1/db/insert
       option > BODY -> RAW -> JSON(application/json)
       example > {
                   "content" : "set param3s" 
                 }
    get : http://localhost:3000/api/v1/db/select
    get : http://localhost:3000/api/v1/db/select/:seq
    put : http://localhost:3000/api/v1/db/modify/:seq
    delete : http://localhost:3000/api/v1/db/delete/:seq 
  
  - File URI 
    post : http://localhost:3000/api/v1/file/upload 
       option > BODY -> form-data(multipart) 
       example > key : profile (type: file) 
                 values : 파일 첨부(2MB 이하) 
  
