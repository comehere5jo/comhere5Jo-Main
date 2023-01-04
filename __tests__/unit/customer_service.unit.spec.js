const CustomerService = require("../../services/customer.service.js");
const request = require("supertest");
const express = require("express");
const app = express()


let mockCustomerRepository = {
    createCustomer: jest.fn(),
    findCustomerPoint: jest.fn(),
    findAllCustomer: jest.fn(),
    findCertainCustomer: jest.fn(),
    findOneCustomer: jest.fn(),
}

let customerService = new CustomerService();
// postService의 Repository를 Mock Repository로 변경합니다.
customerService.customerRepository = mockCustomerRepository;

describe('Customer Service Unit test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

  test('customerSignup 잘못된 id형식', async () => {
    await request(app)
    .post("/signup/customer")
    .send({loginId: "★★★☆",
    loginPw: "ddddd",
    confirmPw: "ddddd",
    name: "이름"})
  });

  test('customerSignup 잘못된 pw형식', async () => {
    await request(app)
    .post("/signup/customer")
    .send({loginId: "wth2052",
    loginPw: "d",
    confirmPw: "d",
    name: "이름"})
    .expect({message: "pw 형식 틀림"})
  });

  // test('customerSignup pw 불일치', async () => {
  //   await request(app)
  //   .post("/signup/customer")
  //   .send({  loginId: "wth2052",
  //   loginPw: "abcde",
  //   confirmPw: "edcba",
  //   name: "이름"})
  //   .expect(400)
  //   .expect({message: "pw 불일치"})
  // });

  // test('customerSignup loginId 비번 일치', async () => {
  //   await request(app)
  //   .post("/signup/customer")
  //   .send({  loginId: "wth2052",
  //   loginPw: "wth2052",
  //   confirmPw: "wth2052",
  //   name: "nickname"})
  //   .expect(400)
  //   .expect({message: "닉네임 비번 일치"})
  // });

  // test('customerSignup loginId 중복', async () => {
  //   await request(app)
  //   .post("/signup/customer")
  //   .send({  loginId: "wth2052",
  //   loginPw: "wth2052",
  //   confirmPw: "wth2052",
  //   name: "nickname"})
  //   .expect(400)
  //   .expect({message: "닉네임 비번 일치"})
  // });

  // test('customerSignup 성공, 회원가입', async () => {
  //   await request(app)
  //   .post("/signup/customer")
  //   .send({  loginId: "wth2053",
  //   loginPw: "",
  //   confirmPw: "wth2052",
  //   name: "nickname"})
  //   .expect(400)
  //   .expect({message: "닉네임 비번 일치"})
  // });

  // test('getCustomerPoint', async () => {
  //   // getCustomerPoint Method를 실행했을 때, Return 값 입니다.
  //   const getCustomerPointReturnValue = [
  //     {
  //       point:1000000
  //     },
  //   ]

  //   // Repository의 getCustomerPoint Method를 Mocking하고, getCustomerPointReturnValue를 Return 값으로 변경합니다.
  //   mockCustomerRepository.getCustomerPoint = jest.fn(() => {
  //     return getCustomerPointReturnValue;
  //   })

  //   // PostService의 getCustomerPoint Method를 실행합니다.
  //   const AllPoint = await customerService.getCustomerPoint();

  //   // 포인트 초기 100만 맞는지 검사
  //   expect(AllPoint).toEqual(
  //     getCustomerPointReturnValue === 1000000
  //   );

  //   // PostRepository의 getCustomerPoint Method는 1번 호출되었는지 검증합니다.
  //   expect(mockCustomerRepository.getCustomerPoint).toHaveBeenCalledTimes(1);
  // });

  
});