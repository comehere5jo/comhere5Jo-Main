const supertest = require('supertest');
const app = require('../../app.js');
const { sequelize } = require('../../models/index');
beforeAll(async () => {
  sequelize.sync()
  });
    

  describe('POST signup/customer 통합 테스트', () => {
    test('POST /signup/customer 통합 테스트 성공', async () => {
      const createCustomerRequestBodyParams = {
          loginId: 'wth205211',
          loginPw: 'test001',
          confirmPw: 'test001',
          name: 'testnicknam1122'
      };
    
      const response = await supertest(app)
      .post(`/signup/customer`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send(createCustomerRequestBodyParams); 
      console.log("님아 제발",response.status)
      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject({
          message: "회원가입 완료!"

      })


    })

    test('POST /signup/customer 통합 테스트 실패', async () => {
      const createCustomerRequestBodyParams = {
          loginId: 'w',
          loginPw: 'test001',
          confirmPw: 'test001',
          name: 'testnicknam1122'
      };
    
      const response = await supertest(app)
      .post(`/signup/customer`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send(createCustomerRequestBodyParams); 
      console.log("님아 제발",response.status)
      expect(response.status).toEqual(412);


    })

    test('POST signin/customer 통합 테스트 성공',async () => {

      const createPostRequestBodyParamsByInvalidParamsError = {
        loginId: 'wth2052',
        loginPw: '123456',
      };
      const response = await supertest(app)
        .post(`/signin/customer`) 
        .query({}) 
        .send(createPostRequestBodyParamsByInvalidParamsError); // Request Body
      expect(response.status).toEqual(201);
    })


    test('POST signin/customer 통합 테스트 실패',async () => {
      // POST /api/posts API에서 에러를 발생시키기 위해 사용되는 body 데이터입니다.
      const createPostRequestBodyParamsByInvalidParamsError = {
        loginId: 'Nickname_InvalidParamsError',
        loginPw: '',
      };
      const response = await supertest(app)
        .post(`/signin/customer`) // API의 HTTP Method & URL
        .query({}) // Request Query String
        .send(createPostRequestBodyParamsByInvalidParamsError); // Request Body
      expect(response.status).toEqual(412);
      expect(response.body).toMatchObject({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
  
      
    })


  })
  
