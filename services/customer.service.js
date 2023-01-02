// 🧀 service
// 서비스 계층은 나머지 애플리케이션에서 모든 비즈니스 로직을 캡슐화하고 추상화합니다.

// ⭕ Service Layer Sould.

// 비즈니스 로직 포함
// 데이터 액세스 계층을 활용하여 데이터베이스와 상호 작용
// controller 계층에 전달할 데이터 리턴
// ❌ Service Layer Sould Not.

// req , res 활용
// 클라이언트에 대한 응답 처리
// 데이터베이스와 직접 상호 작용

const CustomerRepository = require('../repositories/customer.repository');

class CustomerService {
    customerRepository = new CustomerRepository();

    customerSignup = async (loginId, loginPw, name) => {
        const createCustomerData = await this.customerRepository.createCustomer(
            loginId,
            loginPw,
            name
        );

        return {
            id: createCustomerData.null,
            loginId: createCustomerData.loginId,
            loginPw: createCustomerData.loginPw,
            point: createCustomerData.point,
            name: createCustomerData.name,
            createdAt: createCustomerData.createdAt,
            updatedAt: createCustomerData.updatedAt
        };
    };
}


module.exports = CustomerService;