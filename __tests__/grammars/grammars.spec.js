// const ManagerController = require('../../controllers/manager.controller')

// let mockManagerService = {
//   getOrder : jest.fn(),
//   getOrderReview : jest.fn(),
//   getOrderReview : jest.fn(),
//   getMyPoint : jest.fn()
// };

// let mockRequest = {
//   body: jest.fn(),
// };

// let mockResponse = {
//   status: jest.fn(),
//   json: jest.fn(),
// };

// let managerController = new ManagerController();

// managerController.managerService = mockManagerService;

// describe('Layered Architecture Pattern Manager Controller Unit Test', () => {
//   beforeEach(() => {
//     jest.resetAllMocks(); 

//     mockResponse.status = jest.fn(() => {
//       return mockResponse;
//     });
//   });
//   test('Posts Controller getOrder Method by Success', async () => {
//     const managerReturnValue = [
//       {
//         address: '의정부',
//         clothType: '코트1',
//         phoneNumber: '010-8968-2052',
//         picture: '/url',
//         requests: '깨끗하게 해줘',
//         status: '0',
//         createdAt: new Date('07 October 2011 15:50 UTC'),
//         updatedAt: new Date('07 October 2011 15:50 UTC'),
//       },
//       {
//         address: '미국',
//         clothType: '코트1',
//         phoneNumber: '010-8968-2052',
//         picture: '/url',
//         requests: '깨끗하게 해줘',
//         status: '0',
//         createdAt: new Date('07 October 2011 15:50 UTC'),
//         updatedAt: new Date('07 October 2011 15:50 UTC'),
//       },
//     ];
//     mockManagerService.getOrder = jest.fn(() => managerReturnValue);
//     await managerController.getOrder(mockRequest, mockResponse);
//     expect(mockManagerService.getOrder).toHaveBeenCalledTimes(1);
//     expect(mockResponse.status).toHaveBeenCalledTimes(1);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       data: managerReturnValue,
//     });
//   });

//   test('Manager Controller getOrderReview Method by Success', async () => {
//     const managerReturnValue = [
//       {
//         orderId: '0',
//         createdAt: new Date('07 October 2011 15:50 UTC'),
//         comment: '깨끗하게 됐어요',
//         content: '진짜로요?',
//         rating: 0,
//         status: 4
//       },
//       {
//         orderId: '0',
//         createdAt: new Date('07 October 2011 15:50 UTC'),
//         comment: '아아아악',
//         content: '으아아악',
//         rating: 0,
//         status: 0,
//       },
//     ];
//     mockManagerService.getOrderReview = jest.fn(() => managerReturnValue);
//     await managerController.getOrderReview(mockRequest, mockResponse);
//     expect(mockManagerService.getOrderReview).toHaveBeenCalledTimes(1);
//     expect(mockResponse.status).toHaveBeenCalledTimes(1);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       data: managerReturnValue,
//     });
//   });

//   test('Manager Controller getOrderMyReview Method by Success', async () => {
//     const managerReturnValue = [
//       {
//         orderId: '0',
//         createdAt: new Date('07 October 2011 15:50 UTC'),
//         comment: '깨끗하게 됐어요',
//         content: '진짜로요?',
//         rating: 0,
//         status: 4
//       },
//       {
//         orderId: '0',
//         createdAt: new Date('07 October 2011 15:50 UTC'),
//         comment: '아아아악',
//         content: '으아아악',
//         rating: 0,
//         status: 2,
//       },
//     ];
//     mockManagerService.get = jest.fn(() => managerReturnValue);
//     await managerController.getOrderMyReview(mockRequest, mockResponse);
//     expect(mockManagerService.getOrderMyReview).toHaveBeenCalledTimes(1);
//     expect(mockResponse.status).toHaveBeenCalledTimes(1);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       data: managerReturnValue,
//     });
//   });

//   test('Manager Controller getMyPoint Method by Success', async () => {
//     const managerReturnValue = [
//       {
//         point: 0,
//       },
//       {
//         point: 1,
//       },
//     ];
//     mockManagerService.getMyPoint = jest.fn(() => managerReturnValue);
//     await managerController.getMyPoint(mockRequest, mockResponse);
//     expect(mockManagerService.getMyPoint).toHaveBeenCalledTimes(1);
//     expect(mockResponse.status).toHaveBeenCalledTimes(1);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       data: managerReturnValue,
//     });
//   });


// });