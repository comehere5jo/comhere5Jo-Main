
const CustomerService = require("../../services/customer.service.js");
const request = require("supertest");
const express = require("express");
const bcrypt = require('bcrypt');

let mockCustomerService = {
    customerSignup: jest.fn(),
    customerSignin: jest.fn(),
    getCustomerPoint: jest.fn(),
}
let customerService = new CustomerService();
// postService의 Repository를 Mock Repository로 변경합니다.
customerService.customerRepository = mockCustomerService;

let mockError = new Error('mock Error');
describe('Customer Service Unit test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

  test('손님 회원가입 테스트(customerSignup)', async () => {

    const createCustomerParam = {
      loginId :'asdfasdf',
      encryptedPassword :12341234,
      name:'우태현',
    }

    const createCustomerValue = {
      loginId : createCustomerParam.loginId,
      encryptedPassword : createCustomerParam.encryptedPassword,
      name : createCustomerParam.name,
      createdAt: new Date('07 October 2011 15:50 UTC'),
      updatedAt: new Date('07 October 2011 15:50 UTC')
    }
    mockCustomerService.customerSignup = jest.fn(()=> {
      return createCustomerValue
    })

    const createCustomerData = await mockCustomerService.customerSignup(
      createCustomerParam.loginId,
      createCustomerParam.encryptedPassword,
      createCustomerParam.name
    )

    expect(createCustomerData).toEqual(createCustomerValue)
    expect(mockCustomerService.customerSignup).toHaveBeenCalledTimes(1);
    expect(mockCustomerService.customerSignup).toHaveBeenCalledWith(
      createCustomerParam.loginId,
      createCustomerParam.encryptedPassword,
      createCustomerParam.name
    )

  });



  test('손님 포인트 조회 테스트(getCustomerPoint)', async () => {
    const getCustomerPointReturnValue = [
      {
      id: 'testId',
      point: 1000000,
      },
    ]
    mockCustomerService.getCustomerPoint = jest.fn(() => {
      return getCustomerPointReturnValue;
    })

    const getPointData = await mockCustomerService.getCustomerPoint();
    expect(getPointData).toEqual(getCustomerPointReturnValue)
    expect(mockCustomerService.getCustomerPoint).toHaveBeenCalledTimes(1);

  });

  test('손님 로그인 테스트(customerSignin)', async() => {
    const signinValue = [
      {
        loginId : 'myId123456',
        loginPw : 'myPw123456',
      }
    ];
    mockCustomerService.customerSignin = jest.fn(() => {
      return signinValue
    });
    const SigninValueData = await mockCustomerService.customerSignin()
    expect(SigninValueData).toEqual(signinValue)
    expect(mockCustomerService.customerSignin).toHaveBeenCalledTimes(1)
  })



});